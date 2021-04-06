import "react-native-gesture-handler";
import React, { ComponentProps } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { Oxygen_300Light, Oxygen_400Regular, Oxygen_700Bold } from "@expo-google-fonts/oxygen";
import { MaterialIcons } from "@expo/vector-icons";
import { DrawerNavigationOptions } from "@react-navigation/drawer";
import { ShopDrawer } from "./navigation/ShopNavigator";
import { ShopRoutes } from "./navigation/Routes";
import { Fonts } from "./constants/fonts";
import ProductScreen from "./screens/products/ProductScreen";
import OrdersScreen from "./screens/orders/OrdersScreen";
import Colors from "./constants/Colors";
import UserProductsScreen from "./screens/products/UserProductsScreen";

const getDrawerIcon = (name: ComponentProps<typeof MaterialIcons>["name"]): DrawerNavigationOptions["drawerIcon"] => ({
  color,
}) => <MaterialIcons name={name} color={color} size={23} />;

export default function App() {
  const [fontsLoaded] = useFonts({
    [Fonts.Light]: Oxygen_300Light,
    [Fonts.Regular]: Oxygen_400Regular,
    [Fonts.Bold]: Oxygen_700Bold,
  });

  if (!fontsLoaded) return <AppLoading />;

  return (
    <NavigationContainer>
      {/* eslint-disable-next-line react/style-prop-object */}
      <StatusBar style="inverted" />
      <ShopDrawer.Navigator
        initialRouteName={ShopRoutes.Products}
        drawerContentOptions={{ activeTintColor: Colors.primary, labelStyle: { fontFamily: Fonts.Regular } }}
      >
        <ShopDrawer.Screen
          name={ShopRoutes.Products}
          component={ProductScreen}
          options={{ drawerIcon: getDrawerIcon("shopping-cart") }}
        />
        <ShopDrawer.Screen
          name={ShopRoutes.Orders}
          component={OrdersScreen}
          options={{ drawerIcon: getDrawerIcon("list") }}
        />
        <ShopDrawer.Screen
          name={ShopRoutes.Admin}
          component={UserProductsScreen}
          options={{ drawerIcon: getDrawerIcon("person") }}
        />
      </ShopDrawer.Navigator>
    </NavigationContainer>
  );
}
