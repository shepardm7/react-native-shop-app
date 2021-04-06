import React from "react";
import { Stack } from "../../navigation/ShopNavigator";
import { Routes } from "../../navigation/Routes";
import ProductsOverviewScreen from "./ProductsOverviewScreen";
import ProductDetailsScreen from "./ProductDetailsScreen";
import CartScreen from "../cart/CartScreen";
import { navOptions } from "../../navigation/navigationUtils";

const ProductScreen: React.FC = () => (
  <Stack.Navigator initialRouteName={Routes.ProductsOverview} screenOptions={navOptions}>
    <Stack.Screen name={Routes.ProductsOverview} component={ProductsOverviewScreen} />
    <Stack.Screen name={Routes.ProductDetails} component={ProductDetailsScreen} />
    <Stack.Screen name={Routes.Cart} component={CartScreen} />
  </Stack.Navigator>
);

export default ProductScreen;
