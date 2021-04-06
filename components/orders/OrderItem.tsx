import React, { useState } from "react";
import { Button, StyleSheet, View } from "react-native";
import AppText from "../AppText";
import Colors from "../../constants/Colors";
import { styleCard } from "../../constants/styles";
import { Fonts } from "../../constants/fonts";
import Order from "../../models/order";
import OrderCartItem from "./OrderCartItem";

interface OrderItemProps {
  order: Order;
}

const OrderItem: React.FC<OrderItemProps> = ({ order }) => {
  const [showDetails, setShowDetails] = useState(false);
  const handleOnShowDetailsPress = () => setShowDetails((prevState) => !prevState);
  return (
    <View style={styles.orderItem}>
      <View style={styles.summary}>
        <AppText style={styles.totalAmount} type={Fonts.Bold}>
          ${order.totalAmount}
        </AppText>
        <AppText style={styles.date}>{order.readableDate}</AppText>
      </View>
      <Button
        title={showDetails ? "Hide Details" : "Show Details"}
        onPress={handleOnShowDetailsPress}
        color={Colors.primary}
      />
      {showDetails && (
        <View style={styles.detailItems}>
          {order.items.map((item) => (
            <OrderCartItem cartItem={item} key={item.productId} />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  date: {
    color: "#888",
    fontSize: 16,
  },
  detailItems: {
    width: "100%",
  },
  orderItem: {
    ...styleCard,
    alignItems: "center",
    margin: 20,
    padding: 10,
  },
  summary: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    width: "100%",
  },
  totalAmount: {
    fontSize: 16,
  },
});

export default OrderItem;
