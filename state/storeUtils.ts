import create, { State, StateCreator } from "zustand";
import produce, { Draft } from "immer";
import pick from "lodash.pick";

/* Middlewares */
const storeLogger = <T extends State>(config: StateCreator<T>): StateCreator<T> => (set, get, api) =>
  config(
    (args) => {
      // eslint-disable-next-line no-console
      console.log(" applying", args);
      set(args);
      // eslint-disable-next-line no-console
      console.log(" new state", get());
    },
    get,
    api
  );

const storeImmer = <T extends State>(
  config: StateCreator<T, (fn: (draft: Draft<T>) => void) => void>
): StateCreator<T> => (set, get, api) => config((fn) => set(produce<T>(fn)), get, api);

/* Store Creator */
export const createStore = <T extends State, WithActions extends T = T>(
  config: StateCreator<WithActions, (fn: (draft: Draft<T>) => void) => void>
) => create<WithActions>(storeLogger(storeImmer(config)));

/* Utility Types */
export type WithActions<T, CustomActions extends Record<string, (...arg: any) => any> = {}> = T & {
  set: (fn: (draft: Draft<T>) => void) => void; // generic setter for setting any state in type T
} & CustomActions;

/* Utility Functions */
export const getStateOf = <StateType extends State, Key extends keyof StateType>(...keys: Key[]) => (
  state: StateType
) => pick(state, keys);
