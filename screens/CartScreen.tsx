import React, { useContext } from "react";
import {
  View,
  Text,
  Button,
  Alert,
  StyleSheet,
  FlatList,
  ListRenderItem
} from "react-native";
import { CartContext } from "../context/CartContex";


// 1️⃣ Define type for cart items
interface CartItem {
  id: number;
  name: string;
  qty: number;
}

export default function CartScreen() {
  const { cart } = useContext(CartContext);

  // 2️⃣ Type your renderItem
  const renderItem: ListRenderItem<CartItem> = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.qty}>Qty: {item.qty}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>🛒 Your Cart</Text>

      {cart.length === 0 ? (
        <Text style={styles.empty}>Your cart is empty</Text>
      ) : (
        <FlatList<CartItem>
          data={cart}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}

      {cart.length > 0 && (
        <View style={styles.buttonContainer}>
          <Button
            title="Place Order"
            onPress={() => Alert.alert("Success", "Order Placed 🎉")}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3, // Android shadow
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
  },
  qty: {
    marginTop: 5,
    color: "gray",
  },
  empty: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "gray",
  },
  buttonContainer: {
    marginTop: 10,
  },
});