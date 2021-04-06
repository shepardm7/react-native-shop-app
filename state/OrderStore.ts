import shallow from "zustand/shallow";
import CartItem from "../models/cartItem";
import { createStore, getStateOf, WithActions } from "./storeUtils";
import Order from "../models/order";

/* TYPES */
export type OrderState = {
  orders: Order[];
};

export type OrderActions = {
  addOrder: (cartItems: CartItem[], totalAmount: number, performAfter?: () => void) => void;
};

type OrderStateWithActions = WithActions<OrderState, OrderActions>;

/* STORE */
const initialState: OrderState = {
  orders: [],
};

export const useOrderStore = createStore<OrderState, OrderStateWithActions>((set) => ({
  ...initialState,
  set,
  addOrder: (cartItems, totalAmount, performAfter) =>
    set((draft) => {
      draft.orders.push(
        new Order(new Date().getTime().toString(), cartItems, Number(totalAmount.toFixed(2)), new Date())
      );
      performAfter?.();
    }),
}));

export const useOrderStoreOf = <T extends keyof OrderStateWithActions>(...keys: T[]) =>
  useOrderStore(getStateOf(...keys), shallow);
