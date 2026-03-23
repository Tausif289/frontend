import React from "react";
import { View, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

type Props = NativeStackScreenProps<RootStackParamList, "Product">;

export default function ProductScreen({ route }: Props) {
  const { item } = route.params;

  return (
    <View>
      <Text>{item.name}</Text>
      <Text>₹{item.price}</Text>
    </View>
  );
}