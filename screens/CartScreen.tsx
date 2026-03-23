import React, { useContext } from "react";
import { View, Text, Button ,Alert} from "react-native";
import { CartContext } from "../context/CartContex";

export default function CartScreen() {
  const { cart } = useContext(CartContext);

  return (
    <View>
      {cart.map((item) => (
        <Text key={item.id}>
          {item.name} x {item.qty}
        </Text>
      ))}

      <Button title="Place Order" onPress={() => Alert.alert("Order Placed")} />
    </View>
  );
}