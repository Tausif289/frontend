import React, { useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { CartContext } from "../context/CartContex";
import { WishlistContext } from "../context/WishlistContext";
import { Product } from "../types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

type Props = {
  item: Product;
  navigation: NativeStackNavigationProp<RootStackParamList, "Home">;
};

export default function ProductCard({ item, navigation }: Props) {
  const { addToCart, removeFromCart, cart } = useContext(CartContext);
  const { wishlist, toggleWishlist } = useContext(WishlistContext);

  const isLiked = wishlist.some((i) => i.id === item.id);
  const cartItem = cart.find((i) => i.id === item.id);
  const qty = cartItem?.qty || 0;

  return (
    <View style={styles.card}>
      
      {/* ❤️ Wishlist */}
      <TouchableOpacity
        style={styles.heart}
        onPress={() => toggleWishlist(item)}
      >
        <Text style={{ fontSize: 18 }}>
          {isLiked ? "❤️" : "🤍"}
        </Text>
      </TouchableOpacity>

      {/* 🖼 Image */}
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => navigation.navigate("Product", { item })}
      >
        <Image source={{ uri: item.image }} style={styles.image} />
      </TouchableOpacity>

      {/* 📦 Info */}
      <View style={styles.info}>
        <Text numberOfLines={1} style={styles.name}>
          {item.name}
        </Text>

        <Text style={styles.price}>₹{item.price}</Text>

        {/* ⭐ Fake Rating */}
        <Text style={styles.rating}>⭐ 4.5 (120)</Text>
      </View>

      {/* ➕➖ Cart Controls */}
      <View style={styles.cartRow}>
        <TouchableOpacity
          style={[styles.btn, styles.minusBtn]}
          onPress={() => removeFromCart(item)}
        >
          <Text style={styles.btnText}>-</Text>
        </TouchableOpacity>

        <Text style={styles.qty}>{qty}</Text>

        <TouchableOpacity
          style={[styles.btn, styles.plusBtn]}
          onPress={() => addToCart(item)}
        >
          <Text style={styles.btnText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 12,

    // Shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },

  image: {
    width: "100%",
    height: 130,
  },

  info: {
    padding: 8,
  },

  name: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },

  price: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#00a650",
    marginTop: 2,
  },

  rating: {
    fontSize: 12,
    color: "#777",
    marginTop: 2,
  },

  cartRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 10,
  },

  btn: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 8,
  },

  plusBtn: {
    backgroundColor: "#007bff",
  },

  minusBtn: {
    backgroundColor: "#ccc",
  },

  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  qty: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: "bold",
  },

  heart: {
    position: "absolute",
    top: 8,
    right: 8,
    zIndex: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 6,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
});