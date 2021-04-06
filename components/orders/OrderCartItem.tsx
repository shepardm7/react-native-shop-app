import React from "react";
import { StyleSheet, View } from "react-native";
import AppText from "../AppText";
import { Fonts } from "../../constants/fonts";
import CartItem from "../../models/cartItem";

interface OrderCartItemProps {
  cartItem: CartItem;
}

const OrderCartItem: React.FC<OrderCartItemProps> = ({ cartItem }) => (
  <View style={styles.orderCartItem}>
    <AppText style={styles.itemData} numberOfLines={2} ellipsizeMode="tail">
      <AppText style={styles.mainText} type={Fonts.Bold}>
        {cartItem.productTitle}
      </AppText>
    </AppText>
    <View style={styles.itemData}>
      <AppText style={styles.mainText}>
        ${cartItem.productPrice.toFixed(2)} x {cartItem.quantity}
      </AppText>
    </View>
  </View>
);

const styles = StyleSheet.create({
  itemData: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    maxWidth: "60%",
  },
  mainText: {
    fontSize: 16,
  },
  orderCartItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginVertical: 5,
    padding: 20,
  },
});

export default OrderCartItem;
