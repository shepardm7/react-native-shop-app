import { DrawerActions, NavigationProp } from "@react-navigation/native";
import { StackNavigationOptions } from "@react-navigation/stack";
import { Item } from "react-navigation-header-buttons";
import React from "react";
import AppHeaderButtons from "../components/AppHeaderButtons";
import { Fonts } from "../constants/fonts";
import { isPlatformAndroid } from "../constants/platform";
import Colors from "../constants/Colors";

export const getNavOptionsWithDrawerMenu = (
  navigation: NavigationProp<any>,
  additionalOptions: StackNavigationOptions = {}
): StackNavigationOptions => ({
  headerLeft: () => (
    <AppHeaderButtons>
      <Item title="NavDrawer" onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} iconName="menu" />
    </AppHeaderButtons>
  ),
  ...additionalOptions,
});

export const navOptions: StackNavigationOptions = {
  headerTitleStyle: {
    fontFamily: Fonts.Bold,
  },
  headerStyle: {
    backgroundColor: isPlatformAndroid ? Colors.primary : "white",
  },
  headerTintColor: isPlatformAndroid ? "white" : Colors.primary,
};
