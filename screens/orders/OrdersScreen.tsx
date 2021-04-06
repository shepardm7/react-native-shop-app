import React, { useLayoutEffect } from "react";
import { FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { OrdersStack } from "../../navigation/ShopNavigator";
import { OrderRoutes } from "../../navigation/Routes";
import { getNavOptionsWithDrawerMenu, navOptions } from "../../navigation/navigationUtils";
import { useOrderStoreOf } from "../../state/OrderStore";
import OrderItem from "../../components/orders/OrderItem";

const OrdersRootComponent: React.FC = () => {
  const navigation = useNavigation();
  useLayoutEffect(
    () =>
      navigation.setOptions(
        getNavOptionsWithDrawerMenu(navigation, {
          title: "Orders",
        })
      ),
    [navigation]
  );
  const { orders } = useOrderStoreOf("orders");

  return <FlatList data={orders} renderItem={({ item: order }) => <OrderItem order={order} />} />;
};

const OrdersScreen: React.FC = () => (
  <OrdersStack.Navigator screenOptions={navOptions} initialRouteName={OrderRoutes.Root}>
    <OrdersStack.Screen name={OrderRoutes.Root} component={OrdersRootComponent} />
  </OrdersStack.Navigator>
);

export default OrdersScreen;
