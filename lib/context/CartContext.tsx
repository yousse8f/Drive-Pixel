"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://drivepixel.com/api";

type CartItem = {
  id: string; // Cart item ID
  productId: string;
  quantity: number;
  priceEach: number;
  name: string;
  description: string;
  imageUrl: string;
};

type CartContextType = {
  items: CartItem[];
  total: number;
  count: number;
  sessionId: string | null;
  loading: boolean;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  addItem: (productId: string, quantity?: number) => Promise<void>;
  updateItem: (itemId: string, quantity: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  checkout: (details: any) => Promise<any>;
  refreshCart: () => Promise<void>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // Initial load
  const [isOpen, setIsOpen] = useState(false); // For cart drawer/modal if needed
  const isBrowser = typeof window !== "undefined";
  const isMixedContent =
    isBrowser &&
    window.location.protocol === "https:" &&
    API_URL.startsWith("http://");

  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  // Initialize session and fetch cart
  useEffect(() => {
    const initCart = async () => {
      if (isMixedContent) {
        setLoading(false);
        return;
      }

      let storedSession = isBrowser
        ? localStorage.getItem("cart_session_id")
        : null;

      try {
        const headers: any = {};
        if (storedSession) {
          headers["x-session-id"] = storedSession;
        }

        const res = await fetch(`${API_URL}/cart`, { headers });
        const data = await res.json();

        if (data.success) {
          setItems(data.data.items);
          setTotal(data.data.total);
          // Update session if it's different or new
          if (data.data.sessionId && data.data.sessionId !== storedSession) {
            setSessionId(data.data.sessionId);
            localStorage.setItem("cart_session_id", data.data.sessionId);
          } else {
            setSessionId(storedSession);
          }
        }
      } catch (error) {
        console.error("Failed to fetch cart:", { error, API_URL });
      } finally {
        setLoading(false);
      }
    };

    initCart();
  }, []);

  const refreshCart = async () => {
    if (!sessionId) return;
    try {
      const res = await fetch(`${API_URL}/cart`, {
        headers: { "x-session-id": sessionId }
      });
      const data = await res.json();
      if (data.success) {
        setItems(data.data.items);
        setTotal(data.data.total);
      }
    } catch (error) {
      console.error("Error refreshing cart:", error);
    }
  };

  const addItem = async (productId: string, quantity = 1) => {
    try {
      const headers: any = { "Content-Type": "application/json" };
      if (sessionId) headers["x-session-id"] = sessionId;

      const res = await fetch(`${API_URL}/cart/add`, {
        method: "POST",
        headers,
        body: JSON.stringify({ productId, quantity }),
      });
      const data = await res.json();

      if (data.success) {
        setItems(data.data.items);
        setTotal(data.data.total);
        if (!sessionId && data.data.sessionId) {
          setSessionId(data.data.sessionId);
          localStorage.setItem("cart_session_id", data.data.sessionId);
        }
      } else {
        throw new Error(data.message || "Failed to add item");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      throw error;
    }
  };

  const updateItem = async (itemId: string, quantity: number) => {
    try {
      const headers: any = { "Content-Type": "application/json" };
      if (sessionId) headers["x-session-id"] = sessionId;

      const res = await fetch(`${API_URL}/cart/item/${itemId}`, {
        method: "PUT",
        headers,
        body: JSON.stringify({ quantity }),
      });
      const data = await res.json();

      if (data.success) {
        setItems(data.data.items);
        setTotal(data.data.total);
      }
    } catch (error) {
      console.error("Error updating cart item:", error);
    }
  };

  const removeItem = async (itemId: string) => {
    try {
      const headers: any = {};
      if (sessionId) headers["x-session-id"] = sessionId;

      const res = await fetch(`${API_URL}/cart/item/${itemId}`, {
        method: "DELETE",
        headers,
      });
      const data = await res.json();

      if (data.success) {
        setItems(data.data.items);
        setTotal(data.data.total);
      }
    } catch (error) {
      console.error("Error removing cart item:", error);
    }
  };

  const checkout = async (details: any) => {
    try {
      const headers: any = { "Content-Type": "application/json" };
      if (sessionId) headers["x-session-id"] = sessionId;

      const res = await fetch(`${API_URL}/cart/checkout`, {
        method: "POST",
        headers,
        body: JSON.stringify(details)
      });
      const data = await res.json();

      if (data.success) {
        // Clear cart or handle success
        setItems([]);
        setTotal(0);
        return data.data; // { orderId, ... }
      } else {
        throw new Error(data.message || "Checkout failed");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      throw error;
    }
  };

  return (
    <CartContext.Provider
      value={{
        items,
        total,
        count,
        sessionId,
        loading,
        isOpen,
        setIsOpen,
        addItem,
        updateItem,
        removeItem,
        checkout,
        refreshCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
