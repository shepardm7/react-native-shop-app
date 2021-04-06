import React, { useLayoutEffect } from "react";
import { Button, Image, ScrollView, StyleSheet, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import shallow from "zustand/shallow";
import { RootStackParamList } from "../../navigation/ShopNavigator";
import { Routes } from "../../navigation/Routes";
import { productSelectors, useProductStore } from "../../state/ProductStore";
import NotFound from "../../components/NotFound";
import AppText from "../../components/AppText";
import Colors from "../../constants/Colors";
import { useCartStore } from "../../state/CartStore";
import { getStateOf } from "../../state/storeUtils";

interface ProductDetailsScreenProps extends StackScreenProps<RootStackParamList, Routes.ProductDetails> {}

const notFoundMsg = "Product not found";

const ProductDetailsScreen: React.FC<ProductDetailsScreenProps> = ({ route, navigation }) => {
  const product = useProductStore(productSelectors.getAvailableProductFromId(route.params.productId));
  const { addToCart } = useCartStore(getStateOf("addToCart"), shallow);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: product?.title || notFoundMsg,
    });
  }, [navigation, product?.title]);

  if (!product) return <NotFound message={notFoundMsg} />;

  return (
    <ScrollView>
      <View>
        <Image source={{ uri: product.imageUrl }} style={styles.image} />
        <View style={styles.actions}>
          <Button title="Add to Cart" onPress={() => addToCart(product)} color={Colors.primary} />
        </View>
        <AppText style={styles.price}>${product.price.toFixed(2)}</AppText>
        <AppText style={styles.description}>{product.description}</AppText>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  actions: {
    alignItems: "center",
    marginVertical: 10,
  },
  description: {
    fontSize: 14,
    paddingHorizontal: 20,
    textAlign: "center",
  },
  image: {
    height: 300,
    width: "100%",
  },
  price: {
    color: "#888",
    fontSize: 20,
    marginVertical: 20,
    textAlign: "center",
  },
});

export default ProductDetailsScreen;
