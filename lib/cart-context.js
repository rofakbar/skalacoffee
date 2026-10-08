"use client";

import { createContext, useContext, useState, useCallback } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [orderType, setOrderType] = useState("Dine in");

  const addItem = useCallback((product, size = "Small", qty = 1) => {
    setItems((prev) => {
      const existing = prev.find(
        (item) => item.id === product.id && item.size === size
      );
      if (existing) {
        return prev.map((item) =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          nama: product.nama,
          harga: product.harga,
          foto_url: product.foto_url,
          size,
          quantity: qty,
        },
      ];
    });
  }, []);

  const updateQuantity = useCallback((productId, size, delta) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.id === productId && item.size === size) {
            const newQty = item.quantity + delta;
            return newQty <= 0 ? null : { ...item, quantity: newQty };
          }
          return item;
        })
        .filter(Boolean)
    );
  }, []);

  const totalPrice = items.reduce(
    (sum, item) => sum + item.harga * item.quantity,
    0
  );
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        orderType,
        setOrderType,
        addItem,
        updateQuantity,
        totalPrice,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}

