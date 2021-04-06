import { ViewStyle } from "react-native";

export const styleShadow: ViewStyle = {
  shadowColor: "black",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.3,
  shadowRadius: 8,
  elevation: 5,
};

export const styleCard: ViewStyle = {
  ...styleShadow,
  backgroundColor: "white",
  borderRadius: 10,
  overflow: "hidden",
};
