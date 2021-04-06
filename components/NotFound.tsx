import React from "react";
import { StyleSheet, View } from "react-native";
import AppText from "./AppText";

interface NotFoundProps {
  message?: string;
}

const NotFound: React.FC<NotFoundProps> = ({ message = "Not Found" }) => (
  <View style={styles.wrapper}>
    <AppText style={styles.text}>{message}</AppText>
  </View>
);

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
  },
  wrapper: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});

export default NotFound;
