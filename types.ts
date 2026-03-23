export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
};


export type RootStackParamList = {
  Home: undefined;
  Product: { item: Product }; // ✅ must match exactly
  Cart: undefined;
  Profile: undefined;
};
// types.ts
export interface CartItem {
  id: number;
  name: string;
  qty: number;
}