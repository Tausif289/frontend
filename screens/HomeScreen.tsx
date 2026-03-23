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

// const DATA: Product[] = [
//   {
//     id: "1",
//     name: "Shoes",
//     price: 2000,
//     image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
//   },
//   {
//     id: "2",
//     name: "Shirt",
//     price: 1000,
//     image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
//   },
//   {
//     id: "3",
//     name: "Watch",
//     price: 3000,
//     image: "https://images.unsplash.com/photo-1511385348-a52b4a160dc2",
//   },
//   {
//     id: "4",
//     name: "Bag",
//     price: 1500,
//     image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3",
//   },
//   {
//     id: "5",
//     name: "Laptop",
//     price: 50000,
//     image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
//   },
//   {
//     id: "6",
//     name: "Headphones",
//     price: 2500,
//     image: "https://images.unsplash.com/photo-1518449039790-1a5f4b1c7b59",
//   },
// ];

export default function HomeScreen({ navigation }: Props) {
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const { addToCart, removeFromCart } = useContext(CartContext);
  const filtered = DATA.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  return (
    <View style={styles.container}>
      
      {/* 🔥 Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>ShopEasy 🛒</Text>

        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Text style={styles.profile}>👤</Text>
        </TouchableOpacity>
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
    color: "#fff",
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