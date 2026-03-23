import React, { useContext } from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import { CartContext } from "../context/CartContex"; // ✅ fixed
import { Product } from "../types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

type Props = {
  item: Product;
  navigation: NativeStackNavigationProp<RootStackParamList, "Home">; // ✅ fixed
};

export default function ProductCard({ item, navigation }: Props) {
  const { addToCart, removeFromCart } = useContext(CartContext);
 
  return (
    <TouchableOpacity onPress={() => navigation.navigate("Product", { item })}>
      <View style={{ padding: 10, borderWidth: 1, margin: 10 }}>
        <Text>{item.name}</Text>
        <Text>₹{item.price}</Text>

        <Button title="+" onPress={() => addToCart(item)} />
        <Button title="-" onPress={() => removeFromCart(item)} />
      </View>
    </TouchableOpacity>
  );
}