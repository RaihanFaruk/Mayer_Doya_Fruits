"use client";

import React, { useState } from "react";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, quickBuy } = useCart();
  const [quantity, setQuantity] = useState<number>(1);

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col relative group">
      {/* Visual Box */}
      <div className="relative aspect-[4/3] bg-surface-container overflow-hidden">
        <img
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          alt={product.name}
          src={product.image_url}
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.badge && (
            <span className="bg-secondary text-surface-container-lowest text-label-sm font-label-sm px-2.5 py-1 rounded-full shadow-sm">
              {product.badge}
            </span>
          )}
          <span className="bg-surface-container-lowest/90 backdrop-blur text-primary text-[11px] font-bold px-2 py-0.5 rounded-full border border-secondary-container">
            ১০০% কেমিক্যাল মুক্ত
          </span>
        </div>

        {product.discountBadge && (
          <span className="absolute top-3 right-3 bg-tertiary-container text-on-tertiary text-label-sm font-label-sm px-2 py-0.5 rounded-full">
            {product.discountBadge}
          </span>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4 md:p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-body-sm font-body-sm text-secondary font-medium mb-1">
            <span>{product.origin || "বাগান থেকে বাছাই"}</span>
            <span className="text-on-secondary-container bg-surface-container px-2 py-0.5 rounded text-[11px]">
              {product.stock > 0 ? "ইন স্টক" : "স্টক আউট"}
            </span>
          </div>

          <h3 className="text-headline-sm font-headline-sm text-primary mb-1">
            {product.name}
          </h3>

          <p className="text-body-sm font-body-sm text-on-surface-variant line-clamp-1 mb-3">
            {product.description || "তাজা ও সেরা মানের রসালো ফল।"}
          </p>

          {/* Pricing Block */}
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-[24px] font-bold text-primary font-headline-md">
              ৳ {product.price}
            </span>
            {product.originalPrice && (
              <span className="text-body-sm text-outline line-through">
                ৳ {product.originalPrice}
              </span>
            )}
            <span className="text-label-md font-label-md text-on-surface-variant">
              / {product.unit}
            </span>
          </div>
        </div>

        {/* Quantity & CTA Cluster */}
        <div className="space-y-2.5 pt-2 border-t border-outline-variant/50">
          <div className="flex items-center justify-between gap-3">
            {/* Stepper */}
            <div className="flex items-center border border-outline-variant rounded-xl bg-surface-container-low px-2 py-1">
              <button
                type="button"
                className="w-7 h-7 flex items-center justify-center text-primary hover:bg-surface-container rounded-lg"
                onClick={handleDecrease}
              >
                -
              </button>
              <span className="w-8 text-center bg-transparent border-none p-0 text-label-md font-bold text-primary">
                {quantity}
              </span>
              <button
                type="button"
                className="w-7 h-7 flex items-center justify-center text-primary hover:bg-surface-container rounded-lg"
                onClick={handleIncrease}
              >
                +
              </button>
            </div>

            {/* Add to Cart */}
            <button
              type="button"
              className="flex-1 inline-flex items-center justify-center gap-1.5 bg-secondary hover:bg-primary text-surface-container-lowest py-2 px-3 rounded-xl text-label-md font-label-md transition-colors shadow-sm active:scale-95"
              onClick={() => addToCart(product, quantity)}
            >
              <span className="material-symbols-outlined text-[18px]">shopping_cart</span>
              <span>কার্টে যোগ করুন</span>
            </button>
          </div>

          {/* Instant Buy */}
          <button
            type="button"
            className="w-full bg-primary hover:bg-primary-container text-surface-container-lowest py-2 rounded-xl text-label-md font-label-md font-bold transition-all text-center"
            onClick={() => quickBuy(product, quantity)}
          >
            এখনই কিনুন (ক্যাশ অন ডেলিভারি)
          </button>
        </div>
      </div>
    </div>
  );
};
