import shallow from "zustand/shallow";
import Product from "../models/product";
import { createStore, getStateOf, WithActions } from "./storeUtils";
import PRODUCTS from "../data/dummy-data";

/* TYPES */
export type ProductState = {
  availableProducts: Product[];
  userProducts: Product[];
};

export type ProductActions = {
  setAvailableProducts: (products: Product[]) => void;
  deleteProduct: (productId: string, doAfter?: () => void) => void;
  addProduct: (userId: string, values: { title: string; description: string; price: number; imageUrl: string }) => void;
  updateProduct: (id: string, userId: string, values: { title: string; description: string; imageUrl: string }) => void;
};

type ProductStateWithActions = WithActions<ProductState, ProductActions>;

/* STORE */
const initialState: ProductState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((prod) => prod.ownerId === "u1"),
};

export const useProductStore = createStore<ProductState, ProductStateWithActions>((set) => ({
  ...initialState,
  set: (fn) => set(fn),
  setAvailableProducts: (products) =>
    set((draft) => {
      draft.availableProducts = products;
    }),
  deleteProduct: (productId, doAfter) =>
    set((draft) => {
      draft.userProducts = draft.userProducts.filter((product) => product.id !== productId);
      draft.availableProducts = draft.availableProducts.filter((product) => product.id !== productId);
      doAfter?.();
    }),
  addProduct: (userId, values) =>
    set((draft) => {
      const product = new Product(
        new Date().getTime().toString(),
        userId,
        values.title,
        values.imageUrl,
        values.description,
        values.price
      );
      draft.userProducts.push(product);
      draft.availableProducts.push(product);
    }),
  updateProduct: (id, userId, values) =>
    set((draft) => {
      const index = draft.availableProducts.findIndex((product) => product.id === id && product.ownerId === userId);
      if (index < 0) return;

      const product = draft.availableProducts[index];
      draft.availableProducts[index] = new Product(
        product.id,
        product.ownerId,
        values.title,
        values.imageUrl,
        values.description,
        product.price
      );
      draft.userProducts = draft.availableProducts.filter((userProduct) => userProduct.ownerId === userId);
    }),
}));

export const useProductStoreOf = <T extends keyof ProductStateWithActions>(...keys: T[]) =>
  useProductStore(getStateOf(...keys), shallow);

/* SELECTORS */
const getAvailableProductFromId = (productId: string) => (state = useProductStore()) =>
  state.availableProducts.find((product) => product.id === productId);

export const productSelectors = {
  getAvailableProductFromId,
};
