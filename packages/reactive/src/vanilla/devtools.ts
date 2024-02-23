import { proxy } from "./proxy.js";
import { subscribe } from "./subscribe.js";
import { canProxy } from "../utils/index.js";
import { getSnapshot } from "./get-snapshot.js";

import type {} from "@redux-devtools/extension";
import type { DeepExpandType } from "../utils/index.js";

type Config = Parameters<
  (Window extends { __REDUX_DEVTOOLS_EXTENSION__?: infer T }
    ? T
    : { connect: (param: any) => any })["connect"]
>[0];

/** redux devtool options, if set, will enable redux devtool */
export type DevtoolsOptions = DeepExpandType<
  {
    /* name of the store, will be displayed as title in devtool switch panel */
    name: string;
    /** @default true */
    enable?: boolean;
  } & Config
>;

export type ExtensionActionType =
  | "SWEEP"
  | "ROLLBACK"
  | "RESET"
  | "COMMIT"
  | "TOGGLE_ACTION"
  | "JUMP_TO_ACTION"
  | "TOGGLE_ACTION";

export interface DevtoolsMessage {
  type: "DISPATCH" | "START";
  source: string | undefined;
  id: string | undefined;
  state: string | undefined;
  payload: {
    type: ExtensionActionType;
    timestamp: number;
    actionId?: string;
  };
}

interface ConnectResponse {
  init: (state: unknown) => void;
  send: (action: { type: string; [x: string]: unknown }, state: unknown) => void;
  subscribe: (handler: (message: DevtoolsMessage) => void) => any;
  unsubscribe: (...args: any[]) => any;
  error: (...args: any[]) => any;
}

export function devtools(
  { mutate: proxyState }: { mutate: ReturnType<typeof proxy> },
  options: DevtoolsOptions
): () => void {
  const ext = window.__REDUX_DEVTOOLS_EXTENSION__;
  const enable = options?.enable ?? true;

  // this variable is used to filter out the mutate operation by devtools itself
  let isMutatingStoreByDevtools = false;

  if (!enable) return () => {};

  if (!ext) {
    const infos = [
      "[Warning] to enable devtools, make sure you've installed Redux devtools extension 👉",
      "https://github.com/reduxjs/redux-devtools#redux-devtools",
    ];

    console.warn(infos.join(" "));

    return () => {};
  }

  const name = options.name ?? "untitled";
  const devtools = ext.connect(options as Config) as ConnectResponse;
  const initialState = getSnapshot(proxyState);

  devtools.init(initialState);

  devtools.subscribe((message) => {
    console.debug("[reactive] message from devtools: ", message);

    // if (message.type === "START") void 0;
    if (message.type !== "DISPATCH") return;

    if (!message.payload) return;

    // if (message.payload.type === "SWEEP") void 0;
    if (message.payload.type === "RESET") devtools.init(initialState);
    if (message.payload.type === "COMMIT") devtools.init(getSnapshot(proxyState));

    isMutatingStoreByDevtools = true;

    // if (message.payload.type === ""TOGGLE_ACTION"") void 0;
    const actions: ExtensionActionType[] = ["ROLLBACK", "JUMP_TO_ACTION"];

    const isAction = actions.includes(message.payload.type);
    const hasState = message.state && message.state !== "{}";

    if (isAction && hasState) {
      try {
        const newState = JSON.parse(message.state || "{}");
        Object.assign(proxyState, newState);
        console.debug("[reactive] mutate state by devtools: ", newState);
      } catch (e: any) {
        devtools.error(e?.message || e?.toString() || JSON.stringify(e || ""));
      }
    }

    isMutatingStoreByDevtools = false;
  });

  const unsubscribe = subscribe(
    proxyState,
    (changes, version) => {
      const { propsPath, previous, current, snapshot } = changes;

      if (isMutatingStoreByDevtools) return;

      const payload = {
        type: `[${canProxy(current) ? "replace" : "set"}] ${propsPath}`,
        payload: current,
        _previousValue: previous,
        _updatedAt: new Date().toLocaleString(),
        _innerVersion: version,
      };

      devtools.send(payload, snapshot);

      console.debug(`[reactive] [${name}] [${getActionType(current)}] ${propsPath}`, current);
    },
    true
  );

  console.debug(`[reactive] [${name}] devtools is enabled`);

  return () => {
    devtools.unsubscribe();
    unsubscribe();
    console.debug(`[reactive] [${name}] devtools is disabled`);
  };
}

function getActionType(state: any) {
  return canProxy(state) ? "replace" : "set";
}
