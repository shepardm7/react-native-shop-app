import React from "react";
import { Image, StyleSheet, View } from "react-native";
import Product from "../../models/product";
import AppText from "../AppText";
import AppTouchable from "../AppTouchable";
import { Fonts } from "../../constants/fonts";
import { styleCard } from "../../constants/styles";

interface ProductItemProps {
  product: Product;
  onPress?: () => void;
}

const ProductItem: React.FC<ProductItemProps> = ({ product, onPress, children }) => (
  <AppTouchable onPress={onPress}>
    <View style={styles.productContainer}>
      <Image source={{ uri: product.imageUrl }} style={styles.image} />
      <View style={styles.details}>
        <AppText style={styles.title} type={Fonts.Bold}>
          {product.title}
        </AppText>
        <AppText style={styles.price}>${product.price.toFixed(2)}</AppText>
      </View>
      <View style={styles.actions}>{children}</View>
    </View>
  </AppTouchable>
);

const styles = StyleSheet.create({
  actions: {
    alignItems: "center",
    flexDirection: "row",
    height: "25%",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  details: {
    alignItems: "center",
    height: "15%",
    padding: 10,
  },
  image: {
    height: "60%",
    width: "100%",
  },
  price: {
    color: "#888",
    fontSize: 14,
  },
  productContainer: {
    height: 300,
    margin: 20,
    ...styleCard,
  },
  title: {
    fontSize: 18,
    marginVertical: 2,
  },
});

export default ProductItem;
