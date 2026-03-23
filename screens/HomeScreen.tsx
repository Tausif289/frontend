import React, { useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  StyleSheet,
  Text,
  RefreshControl,
  TouchableOpacity,
  Image
} from "react-native";
//import ProductCard from "../components/ProductCard";
//import { Product } from "../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { useContext } from "react";
import { CartContext } from "../context/CartContex";
import {DATA} from "../data/data";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const { addToCart, removeFromCart,cart } = useContext(CartContext);
  const filtered = DATA.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  return (
    <View style={styles.container}>
      
      {/* 🔥 Header */}
      <View style={styles.header}>
  <Text style={styles.logo}>ShopEasy 🛒</Text>

  <View style={{ flexDirection: "row", alignItems: "center" }}>
    
    {/* 🛒 Cart */}
    <TouchableOpacity
      onPress={() => navigation.navigate("Cart")}
      style={{ marginRight: 15 }}
    >
      <Text style={{ fontSize: 22 }}>🛒</Text>

      {totalQty > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{totalQty}</Text>
        </View>
      )}
    </TouchableOpacity>

    {/* 👤 Profile */}
    <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
      <Text style={styles.profile}>👤</Text>
    </TouchableOpacity>

  </View>
</View>
      {/* 🔍 Search Bar */}
      <TextInput
        placeholder="Search for products..."
        value={search}
        onChangeText={setSearch}
        style={styles.search}
        placeholderTextColor="#666"
      />

      {/* 🛍 Product List */}
     <FlatList
  data={filtered}
  keyExtractor={(item) => item.id}
  numColumns={2}
  showsVerticalScrollIndicator={false}
  contentContainerStyle={styles.listContainer}
  columnWrapperStyle={styles.row}
  refreshControl={
    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
  }
  ListEmptyComponent={
    <Text style={styles.empty}>No products found 😢</Text>
  }
 renderItem={({ item }) => (
  <TouchableOpacity
    activeOpacity={0.8}
    onPress={() => navigation.navigate("Product", { item })}
    style={[styles.cardWrapper, styles.shadow]}
  >
    <Image source={{ uri: item.image }} style={styles.image} />

    <Text style={styles.name}>{item.name}</Text>
    <Text style={styles.price}>₹{item.price}</Text>

    {/* ➕ ➖ Cart Buttons */}
    <View style={styles.cartRow}>
      <TouchableOpacity
        style={styles.cartBtn}
        onPress={() => addToCart(item)}
      >
        <Text style={styles.btnText}>+</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.cartBtn, { backgroundColor: "#ccc" }]}
        onPress={() => removeFromCart(item)}
      >
        <Text style={styles.btnText}>-</Text>
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
)}
/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eef2f5",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#007bff",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  badge: {
  position: "absolute",
  top: -5,
  right: -10,
  backgroundColor: "red",
  borderRadius: 10,
  paddingHorizontal: 6,
},

badgeText: {
  color: "#fff",
  fontSize: 10,
  fontWeight: "bold",
},
  logo: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
 listContainer: {
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 30,
  },

  row: {
    justifyContent: "space-between",
  },

  cardWrapper: {
    flex: 1,
    margin: 6,
    borderRadius: 15,
    overflow: "hidden",
  },

  empty: {
    textAlign: "center",
    marginTop: 80,
    fontSize: 18,
    color: "#999",
    fontWeight: "500",
  },

  // 🔥 Optional enhancements

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 12,
    marginBottom: 5,
    color: "#333",
  },

  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginHorizontal: 12,
    marginBottom: 10,
  },
  cartRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  margin: 8,
},

cartBtn: {
  backgroundColor: "#007bff",
  padding: 6,
  borderRadius: 6,
  width: 40,
  alignItems: "center",
},

  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4, // Android shadow
  },
  profile: {
    fontSize: 24,
    color: "#f9bcbc",
  },

  search: {
    margin: 15,
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 25,
    elevation: 4,
    fontSize: 15,
    paddingHorizontal: 20,
  },
  image: {
  width: "100%",
  height: 120,
  borderTopLeftRadius: 15,
  borderTopRightRadius: 15,
},

name: {
  fontSize: 14,
  fontWeight: "600",
  paddingHorizontal: 8,
  marginTop: 5,
},

price: {
  color: "#00a650",
  fontWeight: "bold",
  paddingHorizontal: 8,
  marginBottom: 5,
},

btn: {
  backgroundColor: "#007bff",
  margin: 8,
  padding: 6,
  borderRadius: 6,
},

btnText: {
  color: "#fff",
  textAlign: "center",
},
});