import React, { useCallback, useLayoutEffect } from "react";
import { Button, FlatList } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { Item } from "react-navigation-header-buttons";
import { useProductStoreOf } from "../../state/ProductStore";
import { RootStackParamList } from "../../navigation/ShopNavigator";
import { Routes } from "../../navigation/Routes";
import ProductItem from "../../components/products/ProductItem";
import { useCartStoreOf } from "../../state/CartStore";
import AppHeaderButtons from "../../components/AppHeaderButtons";
import { getNavOptionsWithDrawerMenu } from "../../navigation/navigationUtils";
import Colors from "../../constants/Colors";

export type ProductsOverviewScreenProps = StackScreenProps<RootStackParamList, Routes.ProductsOverview>;

const ProductsOverviewScreen: React.FC<ProductsOverviewScreenProps> = ({ navigation }) => {
  // const navigation = useNavigation<StackNavigationProp<RootStackParamList, Routes.ProductsOverview>>();
  // const route = useRoute<RouteProp<RootStackParamList, Routes.ProductsOverview>>();
  const handleCartClick = useCallback(() => {
    navigation.navigate(Routes.Cart, {});
  }, [navigation]);

  useLayoutEffect(
    () =>
      navigation.setOptions(
        getNavOptionsWithDrawerMenu(navigation, {
          title: "Products",
          headerRight: () => (
            <AppHeaderButtons>
              <Item title="Cart" iconName="shopping-cart" onPress={handleCartClick} />
            </AppHeaderButtons>
          ),
        })
      ),
    [handleCartClick, navigation]
  );

  const { availableProducts } = useProductStoreOf("availableProducts");
  const { addToCart } = useCartStoreOf("addToCart");
  // const setter = useProductStore((state) => state.set);

  const handleOnViewDetailsPress = (productId: string) => {
    navigation.navigate(Routes.ProductDetails, {
      productId,
    });
  };

  return (
    <FlatList
      data={availableProducts}
      renderItem={({ item: product }) => (
        <ProductItem product={product} onPress={() => handleOnViewDetailsPress(product.id)}>
          <Button title="View Details" onPress={() => handleOnViewDetailsPress(product.id)} color={Colors.primary} />
          <Button title="To Cart" onPress={() => addToCart(product)} color={Colors.primary} />
        </ProductItem>
      )}
    />
  );
};

export default ProductsOverviewScreen;
