import { proxy, subscribe } from "./index.js";
import { REACTIVE_STORE_CHANGED, getSnapshot } from "./utils.js";

import type { Config } from "@redux-devtools/extension";
import type { DevtoolOptions } from "./index.js";

export type ExtensionActionType =
  | "START"
  | "ROLLBACK"
  | "RESET"
  | "COMMIT"
  | "JUMP_TO_ACTION"
  | "TOGGLE_ACTION";

export interface MessageType {
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
  send: (action: { type: string }, state: unknown) => void;
  subscribe: (handler: (message: MessageType) => void) => any;
  unsubscribe: (...args: any[]) => any;
  error: (...args: any[]) => any;
}

const ext = window.__REDUX_DEVTOOLS_EXTENSION__;

export function enableDevtool(
  state: ReturnType<typeof proxy>,
  options: DevtoolOptions,
  restore: () => void
) {
  if (!ext) {
    const infos = [
      "to enable redux devtool, make sure you've installed it 👉",
      "https://github.com/reduxjs/redux-devtools#redux-devtools",
    ];

    throw new Error(infos.join(" "));
  }

  const devtool = ext.connect(options as Config) as ConnectResponse;

  devtool.init(getSnapshot(state));

  devtool.subscribe((message) => {
    console.debug("message: ", message);

    if (message.type !== "DISPATCH") return;
    if (!message.payload) return;
    if (message.payload.type === "RESET") restore();

    if (message.payload.type === "COMMIT") {
      devtool.init(getSnapshot(state));
    }

    const actions: ExtensionActionType[] = ["ROLLBACK", "JUMP_TO_ACTION"];
    const isAction = actions.includes(message.payload.type);
    const hasState = message.state && message.state !== "{}";

    if (isAction && hasState) {
      try {
        Object.assign(state, JSON.parse(message.state));
      } catch (e) {
        devtool.error(e?.message || e?.toString() || JSON.stringify(e || ""));
      }
    }
  });

  const unsubscribe = subscribe(state, () => {
    devtool.send({ type: REACTIVE_STORE_CHANGED }, getSnapshot(state));
  });

  return () => {
    devtool.unsubscribe();
    unsubscribe();
  };
}
