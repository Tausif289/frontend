import React, { createContext, useState } from "react";
import { Product } from "../types";

type WishlistContextType = {
  wishlist: Product[];
  toggleWishlist: (item: Product) => void;
};

export const WishlistContext = createContext({} as WishlistContextType);

export const WishlistProvider = ({ children }: any) => {
  const [wishlist, setWishlist] = useState<Product[]>([]);

  const toggleWishlist = (item: Product) => {
    const exists = wishlist.find((i) => i.id === item.id);

    if (exists) {
      setWishlist(wishlist.filter((i) => i.id !== item.id));
    } else {
      setWishlist([...wishlist, item]);
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};