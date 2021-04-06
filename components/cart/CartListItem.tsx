import React from "react";
import { StyleSheet, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import AppText from "../AppText";
import CartItem from "../../models/cartItem";
import AppTouchable from "../AppTouchable";
import { Fonts } from "../../constants/fonts";
import Colors from "../../constants/Colors";

interface CartItemProps {
  cartItem: CartItem;
  onRemovePress: () => void;
  onAddPress: () => void;
}

const CartListItem: React.FC<CartItemProps> = ({ cartItem, onRemovePress, onAddPress }) => (
  <View style={styles.cartListItem}>
    <AppText style={styles.itemData} numberOfLines={2} ellipsizeMode="tail">
      <AppText style={styles.mainText} type={Fonts.Bold}>
        {cartItem.productTitle}
      </AppText>
    </AppText>
    <View style={styles.itemData}>
      <AppTouchable onPress={onRemovePress} style={styles.deleteButton}>
        <MaterialIcons name="remove" size={30} color={Colors.primary} />
      </AppTouchable>
      <AppText style={styles.mainText}>
        ${cartItem.productPrice.toFixed(2)} x {cartItem.quantity}
      </AppText>
      <AppTouchable onPress={onAddPress} style={styles.deleteButton}>
        <MaterialIcons name="add" size={30} color={Colors.primary} />
      </AppTouchable>
    </View>
  </View>
);

const styles = StyleSheet.create({
  cartListItem: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginVertical: 5,
    padding: 20,
  },
  deleteButton: {
    marginLeft: 20,
  },
  itemData: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    maxWidth: "60%",
  },
  mainText: {
    fontSize: 16,
  },
  quantity: {
    color: "#888",
    fontSize: 16,
  },
});

export default CartListItem;
