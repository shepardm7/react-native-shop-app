import React from "react";
import { Text, TextProps } from "react-native";
import { Fonts } from "../constants/fonts";

interface AppTextProps extends TextProps {
  type?: Fonts;
}

const AppText: React.FC<AppTextProps> = ({ style, children, type = Fonts.Regular, ...props }) => (
  <Text style={[{ fontFamily: type }, style]} {...props}>
    {children}
  </Text>
);

export default AppText;
