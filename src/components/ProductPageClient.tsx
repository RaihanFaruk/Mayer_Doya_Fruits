"use client";

import React, { useState } from "react";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { getWhatsAppUrl } from "@/lib/whatsapp";

interface ProductPageClientProps {
  product: Product;
}

export const ProductPageClient: React.FC<ProductPageClientProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [addedMessage, setAddedMessage] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedMessage(true);
    setTimeout(() => setAddedMessage(false), 2500);
  };

  const handleWhatsAppOrder = () => {
    const singleProductCart = [{ product, quantity }];
    const url = getWhatsAppUrl({
      name: "সম্মানিত ক্রেতা",
      phone: "",
      address: "অনলাইন প্রোডাক্ট পেজ থেকে সরাসরি অর্ডার",
      items: singleProductCart,
      totalAmount: product.price * quantity,
    });
    window.open(url, "_blank");
  };

  return (
    <div className="space-y-4">
      {/* Quantity Selector */}
      <div className="flex items-center gap-4">
        <span className="text-body-md font-semibold text-primary">পরিমাণ:</span>
        <div className="flex items-center bg-surface-container rounded-xl border border-outline-variant p-1">
          <button
            type="button"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-surface-container-high text-primary font-bold text-lg"
            aria-label="পরিমাণ কমান"
          >
            -
          </button>
          <span className="w-12 text-center font-bold text-primary text-headline-sm">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity(quantity + 1)}
            className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-surface-container-high text-primary font-bold text-lg"
            aria-label="পরিমাণ বাড়ান"
          >
            +
          </button>
        </div>
        <span className="text-label-md text-on-surface-variant font-medium">
          (মোট ৳{product.price * quantity})
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <button
          type="button"
          onClick={handleAddToCart}
          className="flex-1 bg-secondary hover:bg-secondary/90 text-surface-container-lowest font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-[0.98]"
        >
          <span className="material-symbols-outlined text-[22px]">shopping_cart</span>
          <span>কার্টে যোগ করুন</span>
        </button>

        <button
          type="button"
          onClick={handleWhatsAppOrder}
          className="flex-1 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-[0.98]"
        >
          <span className="material-symbols-outlined text-[22px]">chat</span>
          <span>হোয়াটসঅ্যাপে অর্ডার</span>
        </button>
      </div>

      {addedMessage && (
        <div className="p-3 bg-secondary-container text-on-secondary-container rounded-xl text-center text-label-md font-semibold animate-in fade-in flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-[20px]">check_circle</span>
          সফলভাবে ফলের কার্টে যোগ করা হয়েছে!
        </div>
      )}
    </div>
  );
};
