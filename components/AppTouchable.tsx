import React from "react";
import {
  TouchableNativeFeedback,
  TouchableNativeFeedbackProps,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { isPlatformAndroid21 } from "../constants/platform";

const AppTouchable: React.FC<TouchableNativeFeedbackProps | TouchableOpacityProps> = ({ children, ...props }) =>
  isPlatformAndroid21 ? (
    <TouchableNativeFeedback useForeground {...props}>
      {children}
    </TouchableNativeFeedback>
  ) : (
    <TouchableOpacity {...props}>{children}</TouchableOpacity>
  );

export default AppTouchable;
