import { Platform } from "react-native";

export const isPlatformAndroid = Platform.OS === "android";
export const isPlatformAndroid21 = Platform.OS === "android" && Platform.Version >= 21;
