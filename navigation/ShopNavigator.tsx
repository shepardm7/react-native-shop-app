import { enableScreens } from "react-native-screens";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { AdminRoutes, Routes, ShopRoutes } from "./Routes";

enableScreens(true);

export type RootStackParamList = {
  [Routes.ProductsOverview]: { test: string };
  [Routes.ProductDetails]: { productId: string };
  [Routes.Cart]: {};
};

export type ShopDrawerParamList = {
  [ShopRoutes.Products]: RootStackParamList;
  [ShopRoutes.Orders]: {};
  [ShopRoutes.Admin]: {};
};

export type AdminStackParamList = {
  [AdminRoutes.Root]: {};
  [AdminRoutes.EditProduct]: { productId?: string };
};

export const Stack = createStackNavigator<RootStackParamList>();
export const OrdersStack = createStackNavigator();
export const AdminStack = createStackNavigator<AdminStackParamList>();
export const ShopDrawer = createDrawerNavigator<ShopDrawerParamList>();
