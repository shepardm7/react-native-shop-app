import React from "react";
import { Button, FlatList, StyleSheet, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import shallow from "zustand/shallow";
import { RootStackParamList } from "../../navigation/ShopNavigator";
import { Routes } from "../../navigation/Routes";
import { cartSelectors, useCartStore } from "../../state/CartStore";
import AppText from "../../components/AppText";
import { styleShadow } from "../../constants/styles";
import { Fonts } from "../../constants/fonts";
import Colors from "../../constants/Colors";
import CartListItem from "../../components/cart/CartListItem";
import { useOrderStore } from "../../state/OrderStore";
import { getStateOf } from "../../state/storeUtils";

interface CartScreenProps extends StackScreenProps<RootStackParamList, Routes.Cart> {}

const CartScreen: React.FC<CartScreenProps> = () => {
  const { totalAmount, removeFromCart, addToCartWithId, clearCart } = useCartStore(
    getStateOf("totalAmount", "removeFromCart", "addToCartWithId", "clearCart"),
    shallow
  );
  const items = useCartStore(cartSelectors.getItemsArray());
  const { addOrder } = useOrderStore(getStateOf("addOrder"), shallow);

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <AppText style={styles.summaryText}>
          Total: <AppText style={styles.amount}>${totalAmount.toFixed(2)}</AppText>
        </AppText>
        <Button
          title="Order Now"
          onPress={() => addOrder(items, totalAmount, clearCart)}
          color={Colors.accent}
          disabled={!items.length}
        />
      </View>
      <AppText>CART ITEMS</AppText>
      <FlatList
        data={items}
        keyExtractor={(item) => item.productId}
        renderItem={({ item: cartItem }) => (
          <CartListItem
            cartItem={cartItem}
            onRemovePress={() => removeFromCart(cartItem.productId)}
            onAddPress={() => addToCartWithId(cartItem.productId)}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  amount: {
    color: Colors.primary,
  },
  screen: {
    margin: 20,
  },
  summary: {
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10,
    ...styleShadow,
  },
  summaryText: {
    fontFamily: Fonts.Bold,
    fontSize: 18,
  },
});

export default CartScreen;
