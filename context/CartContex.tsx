import React, { createContext, useState, ReactNode } from "react";
import { Product, CartItem } from "../types";

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: Product) => void;
  removeFromCart: (item: Product) => void;
};

export const CartContext = createContext<CartContextType>(
  {} as CartContextType
);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: Product) => {
    const exist = cart.find((x) => x.id === item.id);

    if (exist) {
      setCart(
        cart.map((x) =>
          x.id === item.id ? { ...x, qty: x.qty + 1 } : x
        )
      );
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }
  };

  const removeFromCart = (item: Product) => {
    const exist = cart.find((x) => x.id === item.id);
    if (!exist) return;

    if (exist.qty === 1) {
      setCart(cart.filter((x) => x.id !== item.id));
    } else {
      setCart(
        cart.map((x) =>
          x.id === item.id ? { ...x, qty: x.qty - 1 } : x
        )
      );
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};