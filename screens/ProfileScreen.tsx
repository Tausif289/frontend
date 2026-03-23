import React, { useContext } from "react";
import { View, Text } from "react-native";

import { CartContext } from "../context/CartContex";

export default function ProfileScreen() {
  const { cart } = useContext(CartContext);

  return (
    <View>
      <Text>My Items:</Text>
      {cart.map((item) => (
        <Text key={item.id}>
          {item.name} x {item.qty}
        </Text>
      ))}
    </View>
  );
}