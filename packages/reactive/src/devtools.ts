import { proxy } from "./proxy.js";
import { subscribe } from "./subscribe.js";
import { getSnapshot } from "./snapshot.js";
import { REACTIVE_STORE_CHANGED, isProduction } from "./internal-utils.js";

import type { Config } from "@redux-devtools/extension";
import type { Config as ReduxDevtoolConfig } from "@redux-devtools/extension";
import type { DeepExpandType } from "./internal-utils.js";

/** redux devtool options, if set, will enable redux devtool */
export type DevtoolsOptions = DeepExpandType<
  {
    /* name of the store, will be displayed as title in devtool switch panel */
    name: string;
    /**
     * if set to true, will enable forever whenever production or not
     * @default false
     * */
    forceEnable?: boolean;
  } & ReduxDevtoolConfig
>;

export type ExtensionActionType =
  | "START"
  | "ROLLBACK"
  | "RESET"
  | "COMMIT"
  | "JUMP_TO_ACTION"
  | "TOGGLE_ACTION";

export interface DevtoolsMessage {
  type: "DISPATCH";
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

const ext = globalThis.__REDUX_DEVTOOLS_EXTENSION__;

export function enableDevtools(
  proxyState: ReturnType<typeof proxy>,
  options: DevtoolsOptions,
  restore: () => void
): () => void {
  if (!ext) {
    const infos = [
      "to enable redux devtools, make sure you've installed it 👉",
      "https://github.com/reduxjs/redux-devtools#redux-devtools",
    ];

    console.warn(infos.join(" "));

    return () => {};
  }

  const devtools = ext.connect(options as Config) as ConnectResponse;

  devtools.init(getSnapshot(proxyState));

  devtools.subscribe((message) => {
    console.debug("[reactive] message: ", message);

    if (message.type !== "DISPATCH") return;
    if (!message.payload) return;
    if (message.payload.type === "RESET") restore();

    if (message.payload.type === "COMMIT") {
      devtools.init(getSnapshot(proxyState));
    }

    const actions: ExtensionActionType[] = ["ROLLBACK", "JUMP_TO_ACTION"];
    const isAction = actions.includes(message.payload.type);
    const hasState = message.state && message.state !== "{}";

    if (isAction && hasState) {
      try {
        Object.assign(proxyState, JSON.parse(message.state));
      } catch (e) {
        devtools.error(e?.message || e?.toString() || JSON.stringify(e || ""));
      }
    }
  });

  const unsubscribe = subscribe(proxyState, () => {
    const state = getSnapshot(proxyState);
    devtools.send({ type: REACTIVE_STORE_CHANGED, payload: state }, state);
  });

  return () => {
    devtools.unsubscribe();
    unsubscribe();
  };
}

export function prepareDevtools(
  devtools: DevtoolsOptions,
  proxyState: object,
  restore: () => void
) {
  let disableDevtools: () => void = () => {};

  if (devtools) {
    if (!devtools.name) {
      throw new Error("devtools.name is required");
    }

    const isForceEnable = !!devtools?.forceEnable;

    if (!isProduction || isForceEnable) {
      disableDevtools = enableDevtools(proxyState, devtools, restore);
    }
  }

  return disableDevtools;
}
