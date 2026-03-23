export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
};

export type CartItem = Product & {
  qty: number;
};
export type RootStackParamList = {
  Home: undefined;
  Product: { item: Product }; // ✅ must match exactly
  Cart: undefined;
  Profile: undefined;
};