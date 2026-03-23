import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { CartContext } from "../context/CartContex";

type Props = NativeStackScreenProps<RootStackParamList, "Product">;

export default function ProductScreen({ route }: Props) {
  const { item } = route.params;
  const { addToCart, removeFromCart, cart } = useContext(CartContext);

  const cartItem = cart.find((i) => i.id === item.id);
  const qty = cartItem?.qty || 0;

  const handleOrder = () => {
    Alert.alert("Success ✅", `${item.name} ordered successfully!`);
  };

  return (
    <ScrollView style={styles.container}>
      
      {/* 🖼 Product Image */}
      <Image source={{ uri: item.image }} style={styles.image} />

      {/* 📦 Info */}
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>₹{item.price}</Text>

        {/* ⭐ Rating */}
        <Text style={styles.rating}>⭐ 4.5 (120 reviews)</Text>

        {/* 📝 Description */}
        <Text style={styles.desc}>
          This is a high-quality {item.name}. Perfect for daily use with
          premium material and modern design. Best choice for your lifestyle.
        </Text>

        {/* ➕➖ Cart Controls */}
        <View style={styles.cartRow}>
          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => removeFromCart(item)}
          >
            <Text style={styles.qtyText}>-</Text>
          </TouchableOpacity>

          <Text style={styles.qty}>{qty}</Text>

          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => addToCart(item)}
          >
            <Text style={styles.qtyText}>+</Text>
          </TouchableOpacity>
        </View>

        {/* 🛒 Order Button */}
        <TouchableOpacity style={styles.orderBtn} onPress={handleOrder}>
          <Text style={styles.orderText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f6fa",
  },

  image: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
  },

  info: {
    padding: 16,
  },

  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
  },

  price: {
    fontSize: 20,
    color: "#00a650",
    fontWeight: "bold",
    marginBottom: 8,
  },

  rating: {
    fontSize: 14,
    color: "#ffaa00",
    marginBottom: 10,
  },

  desc: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
    marginBottom: 20,
  },

  cartRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  qtyBtn: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 8,
    width: 40,
    alignItems: "center",
  },

  qtyText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  qty: {
    marginHorizontal: 15,
    fontSize: 18,
    fontWeight: "bold",
  },

  orderBtn: {
    backgroundColor: "#ff6b00",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  orderText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});