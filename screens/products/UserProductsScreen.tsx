import React, { useCallback, useLayoutEffect } from "react";
import { Alert, Button, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Item } from "react-navigation-header-buttons";
import { useProductStoreOf } from "../../state/ProductStore";
import ProductItem from "../../components/products/ProductItem";
import { AdminStack, AdminStackParamList } from "../../navigation/ShopNavigator";
import { getNavOptionsWithDrawerMenu, navOptions } from "../../navigation/navigationUtils";
import { AdminRoutes } from "../../navigation/Routes";
import Colors from "../../constants/Colors";
import { useCartStoreOf } from "../../state/CartStore";
import EditProductScreen from "./EditProductScreen";
import AppHeaderButtons from "../../components/AppHeaderButtons";

const UserProductsComponent: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<AdminStackParamList, AdminRoutes.Root>>();
  const { userProducts, deleteProduct } = useProductStoreOf("userProducts", "deleteProduct");
  const { deleteCartItem } = useCartStoreOf("deleteCartItem");

  const handleOnCreatePress = useCallback(() => {
    navigation.navigate(AdminRoutes.EditProduct, {});
  }, [navigation]);

  useLayoutEffect(
    () =>
      navigation.setOptions(
        getNavOptionsWithDrawerMenu(navigation, {
          title: "Your Products",
          headerRight: () => (
            <AppHeaderButtons>
              <Item title="Create Product" iconName="post-add" onPress={handleOnCreatePress} />
            </AppHeaderButtons>
          ),
        })
      ),
    [handleOnCreatePress, navigation]
  );

  const handleOnEdit = (productId: string) => {
    navigation.navigate(AdminRoutes.EditProduct, {
      productId,
    });
  };

  const handleDelete = (productId: string) => {
    Alert.alert("Delete product?", "Are you sure you want to delete this product?", [
      { text: "No", style: "default" },
      { text: "Yes", style: "destructive", onPress: () => deleteProduct(productId, () => deleteCartItem(productId)) },
    ]);
  };

  return (
    <FlatList
      data={userProducts}
      renderItem={({ item: product }) => (
        <ProductItem product={product} onPress={() => handleOnEdit(product.id)}>
          <Button title="Edit" onPress={() => handleOnEdit(product.id)} color={Colors.primary} />
          <Button title="Delete" onPress={() => handleDelete(product.id)} color={Colors.primary} />
        </ProductItem>
      )}
    />
  );
};

const UserProductsScreen: React.FC = () => (
  <AdminStack.Navigator initialRouteName={AdminRoutes.Root} screenOptions={navOptions}>
    <AdminStack.Screen name={AdminRoutes.Root} component={UserProductsComponent} />
    <AdminStack.Screen name={AdminRoutes.EditProduct} component={EditProductScreen} />
  </AdminStack.Navigator>
);

export default UserProductsScreen;
