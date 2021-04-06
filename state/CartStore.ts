import shallow from "zustand/shallow";
import Product from "../models/product";
import { createStore, getStateOf, WithActions } from "./storeUtils";
import CartItem from "../models/cartItem";

/* TYPES */
export type CartState = {
  items: Record<string, CartItem>;
  totalAmount: number;
};

export type CartActions = {
  addToCart: (product: Product) => void;
  addToCartWithId: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  deleteCartItem: (productId: string) => void;
  clearCart: () => void;
};

type CartStateWithActions = WithActions<CartState, CartActions>;

/* STORE */
const initialState: CartState = {
  items: {},
  totalAmount: 0,
};

export const useCartStore = createStore<CartState, CartStateWithActions>((set) => ({
  ...initialState,
  set,
  addToCart: (product) =>
    set((draft) => {
      if (draft.items[product.id]) {
        draft.items[product.id].quantity += 1;
        draft.items[product.id].sum += product.price;
      } else {
        draft.items[product.id] = new CartItem(1, product.id, product.price, product.title, product.price);
      }
      draft.totalAmount += product.price;
    }),
  addToCartWithId: (productId) =>
    set((draft) => {
      if (!draft.items[productId]) return;
      draft.items[productId].quantity += 1;
      draft.items[productId].sum += draft.items[productId].productPrice;
      draft.totalAmount += draft.items[productId].productPrice;
    }),
  removeFromCart: (productId) =>
    set((draft) => {
      if (!draft.items[productId]) return;
      draft.totalAmount -= draft.items[productId].productPrice;
      draft.items[productId].sum -= draft.items[productId].productPrice;
      draft.items[productId].quantity -= 1;
      if (draft.items[productId].quantity < 1) delete draft.items[productId];
      if (draft.totalAmount < 0) draft.totalAmount = 0;
    }),
  deleteCartItem: (productId) =>
    set((draft) => {
      if (!draft.items[productId]) return;
      draft.totalAmount -= draft.items[productId].sum;
      delete draft.items[productId];
      if (draft.totalAmount < 0) draft.totalAmount = 0;
    }),
  clearCart: () =>
    set((draft) => {
      draft.items = initialState.items;
      draft.totalAmount = initialState.totalAmount;
    }),
}));

export const useCartStoreOf = <T extends keyof CartStateWithActions>(...keys: T[]) =>
  useCartStore(getStateOf(...keys), shallow);

/* SELECTORS */
const getItemsArray = () => (state = useCartStore()) => Object.values(state.items);

export const cartSelectors = {
  getItemsArray,
};
