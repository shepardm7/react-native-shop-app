import React from "react";
import { HeaderButton, HeaderButtonProps, HeaderButtons, HeaderButtonsProps } from "react-navigation-header-buttons";
import { MaterialIcons } from "@expo/vector-icons";
import { isPlatformAndroid } from "../constants/platform";
import Colors from "../constants/Colors";

const AppHeaderButton: React.FC<HeaderButtonProps> = (props) => (
  <HeaderButton
    IconComponent={MaterialIcons}
    iconSize={23}
    color={isPlatformAndroid ? "white" : Colors.primary}
    {...props}
  />
);

const AppHeaderButtons: React.FC<HeaderButtonsProps> = ({ children, ...props }) => (
  <HeaderButtons HeaderButtonComponent={AppHeaderButton} {...props}>
    {children}
  </HeaderButtons>
);

export default AppHeaderButtons;
