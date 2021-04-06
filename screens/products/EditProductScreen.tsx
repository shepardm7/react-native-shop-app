import React, { useCallback, useEffect, useLayoutEffect, useMemo, useState } from "react";
import { ScrollView, StyleSheet, TextInput, TextInputProps, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { Item } from "react-navigation-header-buttons";
import produce from "immer";
import AppText from "../../components/AppText";
import { AdminStackParamList } from "../../navigation/ShopNavigator";
import { AdminRoutes } from "../../navigation/Routes";
import { productSelectors, useProductStore, useProductStoreOf } from "../../state/ProductStore";
import NotFound from "../../components/NotFound";
import AppHeaderButtons from "../../components/AppHeaderButtons";

type EditProductScreenProps = StackScreenProps<AdminStackParamList, AdminRoutes.EditProduct>;

enum FormFields {
  title = "title",
  imageUrl = "imageUrl",
  price = "price",
  description = "description",
}

const notFoundMsg = "Product not found";

type FormInputProps<T extends string> = Omit<TextInputProps, "onChangeText" | "style"> & {
  label: string;
  name: T;
  onTextChange: (key: T, value: string) => void;
};
const FormInput = <T extends string>({ label, name, value, onTextChange, ...textInputProps }: FormInputProps<T>) => (
  <View style={styles.formControl}>
    <AppText style={styles.label}>{label}</AppText>
    <TextInput style={styles.input} value={value} onChangeText={(val) => onTextChange(name, val)} {...textInputProps} />
  </View>
);

const EditProductScreen: React.FC<EditProductScreenProps> = ({ navigation, route }) => {
  const { productId } = route.params;
  const userId = "u1";
  const product = useProductStore(productSelectors.getAvailableProductFromId(productId || ""));
  const { addProduct, updateProduct } = useProductStoreOf("addProduct", "updateProduct");
  const [inputValues, setInputValues] = useState({
    [FormFields.title]: "",
    [FormFields.imageUrl]: "",
    [FormFields.price]: "",
    [FormFields.description]: "",
  });
  const createMode = useMemo(() => !productId, [productId]);
  const title = useMemo(() => {
    if (createMode) return "Create Product";
    if (product) return product.title;
    return notFoundMsg;
  }, [createMode, product]);

  const handleOnSave = useCallback(() => {
    const { price, ...values } = inputValues;
    if (createMode) {
      addProduct(userId, { ...values, price: +price });
    } else if (productId) {
      updateProduct(productId, userId, values);
    }
    navigation.goBack();
  }, [addProduct, createMode, inputValues, navigation, productId, updateProduct]);

  useLayoutEffect(
    () =>
      navigation.setOptions({
        title,
        headerRight: () => (
          <AppHeaderButtons>
            <Item title="Save" iconName="save" onPress={handleOnSave} />
          </AppHeaderButtons>
        ),
      }),
    [handleOnSave, navigation, title]
  );

  useEffect(() => {
    if (product) {
      setInputValues({
        [FormFields.title]: product.title,
        [FormFields.imageUrl]: product.imageUrl,
        [FormFields.price]: product.price.toFixed(2),
        [FormFields.description]: product.description,
      });
    }
  }, [product]);

  if (!createMode && !product) return <NotFound message={notFoundMsg} />;

  const handleInputChange: FormInputProps<FormFields>["onTextChange"] = (name, value) => {
    setInputValues((prevState) =>
      produce(prevState, (draft) => {
        if (name === FormFields.price && !value.match(/^\d*\.?\d*$/)) return;
        draft[name] = value;
      })
    );
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <FormInput
          label="Title"
          name={FormFields.title}
          value={inputValues[FormFields.title]}
          onTextChange={handleInputChange}
        />
        <FormInput
          label="Image URL"
          name={FormFields.imageUrl}
          value={inputValues[FormFields.imageUrl]}
          onTextChange={handleInputChange}
        />
        {createMode && (
          <FormInput
            label="Price"
            name={FormFields.price}
            value={inputValues[FormFields.price]}
            onTextChange={handleInputChange}
            keyboardType="numeric"
          />
        )}
        <FormInput
          label="Description"
          name={FormFields.description}
          value={inputValues[FormFields.description]}
          onTextChange={handleInputChange}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  formControl: {
    width: "100%",
  },
  input: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingHorizontal: 2,
    paddingVertical: 5,
  },
  label: {
    marginVertical: 8,
  },
});

export default EditProductScreen;
