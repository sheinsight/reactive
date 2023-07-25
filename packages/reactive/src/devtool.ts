import { proxy, subscribe } from "./index.js";
import { getSnapshot } from "./utils.js";

import type { CreateOptions } from "./index.js";

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
  options: CreateOptions,
  restore: () => void
) {
  if (!ext) {
    const infos = [
      "to enable it, make sure you've installed the redux devtool extension: ",
      "https://github.com/reduxjs/redux-devtools#redux-devtools",
    ];

    throw new Error(infos.join(""));
  }

  const name = options.devtool.name;
  const devtool = ext.connect({ ...options, name }) as ConnectResponse;

  devtool.init(getSnapshot(state));

  devtool.subscribe((message) => {
    console.debug("message: ", message);

    if (message.type !== "DISPATCH") {
      return;
    }

    if (message.payload && message.payload.type === "RESET") {
      restore();
    } else {
      if (!message.state) {
        return;
      }

      const actions = ["ROLLBACK", "COMMIT", "JUMP_TO_ACTION"];

      if (actions.includes(message.payload.type)) {
        Object.assign(state, JSON.parse(message.state || ""));
      }
    }
  });

  subscribe(state, () => {
    devtool.send({ type: "STORE_CHANGED" }, getSnapshot(state));
  });

  return () => devtool.unsubscribe();
}
