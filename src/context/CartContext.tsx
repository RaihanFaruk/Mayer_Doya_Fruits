"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { CartItem, Customer, Product } from "@/types";
import { fbEvent } from "@/lib/fpixel";

interface CartContextType {
  cart: CartItem[];
  customer: Customer | null;
  isOnline: boolean;
  isCartOpen: boolean;
  isCheckoutOpen: boolean;
  isOrderSuccessOpen: boolean;
  lastOrderId: string | null;
  lastWhatsAppUrl: string | null;
  subtotal: number;
  deliveryCharge: number;
  totalAmount: number;
  totalItemsCount: number;
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  quickBuy: (product: Product, quantity?: number) => void;
  saveCustomerProfile: (profile: Omit<Customer, "id">) => void;
  setIsCartOpen: (open: boolean) => void;
  setIsCheckoutOpen: (open: boolean) => void;
  setIsOrderSuccessOpen: (open: boolean) => void;
  setLastOrderId: (id: string | null) => void;
  setLastWhatsAppUrl: (url: string | null) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isOrderSuccessOpen, setIsOrderSuccessOpen] = useState<boolean>(false);
  const [lastOrderId, setLastOrderId] = useState<string | null>(null);
  const [lastWhatsAppUrl, setLastWhatsAppUrl] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  // Initialize from localStorage and set up online/offline listeners
  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== "undefined") {
      setIsOnline(navigator.onLine);

      const handleOnline = () => setIsOnline(true);
      const handleOffline = () => setIsOnline(false);

      window.addEventListener("online", handleOnline);
      window.addEventListener("offline", handleOffline);

      try {
        const savedCart = localStorage.getItem("mayer_doa_cart");
        if (savedCart) {
          setCart(JSON.parse(savedCart));
        }
        const savedCustomer = localStorage.getItem("mayer_doa_customer");
        if (savedCustomer) {
          setCustomer(JSON.parse(savedCustomer));
        }
      } catch (e) {
        console.error("Failed to parse localStorage data", e);
      }

      return () => {
        window.removeEventListener("online", handleOnline);
        window.removeEventListener("offline", handleOffline);
      };
    }
  }, []);

  // Save cart changes to localStorage
  useEffect(() => {
    if (isMounted && typeof window !== "undefined") {
      try {
        localStorage.setItem("mayer_doa_cart", JSON.stringify(cart));
      } catch (e) {
        console.error("Failed to save cart to localStorage", e);
      }
    }
  }, [cart, isMounted]);

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prevCart) => {
      const existingIdx = prevCart.findIndex(
        (item) => item.product.id === product.id
      );
      if (existingIdx > -1) {
        const updated = [...prevCart];
        updated[existingIdx] = {
          ...updated[existingIdx],
          quantity: updated[existingIdx].quantity + quantity,
        };
        return updated;
      }
      return [...prevCart, { product, quantity }];
    });
    setIsCartOpen(true);

    // Track Facebook Pixel AddToCart event
    fbEvent("AddToCart", {
      content_name: product.name,
      content_ids: [product.id],
      content_type: "product",
      value: product.price * quantity,
      currency: "BDT",
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.product.id !== productId)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const quickBuy = (product: Product, quantity = 1) => {
    setCart((prevCart) => {
      const existingIdx = prevCart.findIndex(
        (item) => item.product.id === product.id
      );
      if (existingIdx > -1) {
        const updated = [...prevCart];
        updated[existingIdx] = {
          ...updated[existingIdx],
          quantity: updated[existingIdx].quantity + quantity,
        };
        return updated;
      }
      return [...prevCart, { product, quantity }];
    });
    setIsCheckoutOpen(true);

    // Track Facebook Pixel AddToCart event
    fbEvent("AddToCart", {
      content_name: product.name,
      content_ids: [product.id],
      content_type: "product",
      value: product.price * quantity,
      currency: "BDT",
    });
  };

  const saveCustomerProfile = (profile: Omit<Customer, "id">) => {
    const updated: Customer = {
      id: customer?.id || `cust-${Date.now()}`,
      ...profile,
    };
    setCustomer(updated);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("mayer_doa_customer", JSON.stringify(updated));
      } catch (e) {
        console.error("Failed to save customer profile", e);
      }
    }
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  // Free delivery as specified in code.html
  const deliveryCharge = 0;
  const totalAmount = subtotal + deliveryCharge;
  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        customer,
        isOnline,
        isCartOpen,
        isCheckoutOpen,
        isOrderSuccessOpen,
        lastOrderId,
        lastWhatsAppUrl,
        subtotal,
        deliveryCharge,
        totalAmount,
        totalItemsCount,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        quickBuy,
        saveCustomerProfile,
        setIsCartOpen,
        setIsCheckoutOpen,
        setIsOrderSuccessOpen,
        setLastOrderId,
        setLastWhatsAppUrl,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
