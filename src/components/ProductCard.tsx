"use client";

import React, { useState } from "react";
import Link from "next/link";
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
    <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/70 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col relative group">
      {/* Visual Box with Link to Product Details */}
      <Link
        href={`/products/${product.id}`}
        className="block relative aspect-[4/3] bg-surface-container overflow-hidden"
        title={`তাজা ${product.name} বিস্তারিত দেখুন`}
      >
        <img
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          alt={`তাজা ${product.name} ${product.unit} - মায়ের দোয়া ফল`}
          src={product.image_url}
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex flex-col gap-1">
          {product.badge && (
            <span className="bg-secondary text-surface-container-lowest text-[10px] sm:text-label-sm font-label-sm px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow-sm">
              {product.badge}
            </span>
          )}
          <span className="bg-surface-container-lowest/90 backdrop-blur text-primary text-[9px] sm:text-[11px] font-bold px-1.5 py-0.5 sm:px-2 rounded-full border border-secondary-container">
            ১০০% ফ্রেশ
          </span>
        </div>

        {product.discountBadge && (
          <span className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-tertiary-container text-on-tertiary text-[10px] sm:text-label-sm font-label-sm px-2 py-0.5 rounded-full">
            {product.discountBadge}
          </span>
        )}
      </Link>

      {/* Card Content */}
      <div className="p-3 sm:p-4 md:p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-[11px] sm:text-body-sm font-body-sm text-secondary font-medium mb-1">
            <span className="truncate max-w-[90px] sm:max-w-none">{product.origin || "বাগান থেকে"}</span>
            <span className="text-on-secondary-container bg-surface-container px-1.5 sm:px-2 py-0.5 rounded text-[10px] sm:text-[11px] shrink-0">
              {product.stock > 0 ? "ইন স্টক" : "স্টক আউট"}
            </span>
          </div>

          <h3 className="text-headline-sm font-headline-sm text-primary mb-1 line-clamp-1">
            <Link
              href={`/products/${product.id}`}
              className="hover:text-secondary transition-colors"
            >
              {product.name}
            </Link>
          </h3>

          <p className="text-body-sm font-body-sm text-on-surface-variant line-clamp-1 mb-2 sm:mb-3 hidden sm:block">
            {product.description || "তাজা ও সেরা মানের রসালো ফল।"}
          </p>

          {/* Pricing Block */}
          <div className="flex items-baseline gap-1.5 sm:gap-2 mb-2 sm:mb-4 flex-wrap">
            <span className="text-[18px] sm:text-[24px] font-bold text-primary font-headline-md leading-none">
              ৳ {product.price}
            </span>
            {product.originalPrice && (
              <span className="text-[11px] sm:text-body-sm text-outline line-through">
                ৳ {product.originalPrice}
              </span>
            )}
            <span className="text-[11px] sm:text-label-md font-label-md text-on-surface-variant">
              / {product.unit}
            </span>
          </div>
        </div>

        {/* Quantity & CTA Cluster */}
        <div className="space-y-2 pt-2 border-t border-outline-variant/50">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
            {/* Stepper */}
            <div className="flex items-center justify-between border border-outline-variant rounded-xl bg-surface-container-low px-1 py-0.5 sm:px-2 sm:py-1">
              <button
                type="button"
                aria-label="পরিমাণ কমান"
                className="w-11 h-11 sm:w-7 sm:h-7 flex items-center justify-center text-primary font-bold text-[18px] sm:text-base hover:bg-surface-container rounded-lg active:scale-95 transition-transform"
                onClick={handleDecrease}
              >
                -
              </button>
              <span className="flex-1 sm:w-8 text-center bg-transparent border-none p-0 text-label-md font-bold text-primary">
                {quantity}
              </span>
              <button
                type="button"
                aria-label="পরিমাণ বাড়ান"
                className="w-11 h-11 sm:w-7 sm:h-7 flex items-center justify-center text-primary font-bold text-[18px] sm:text-base hover:bg-surface-container rounded-lg active:scale-95 transition-transform"
                onClick={handleIncrease}
              >
                +
              </button>
            </div>

            {/* Add to Cart */}
            <button
              type="button"
              className="flex-1 inline-flex items-center justify-center gap-1 bg-secondary hover:bg-primary text-surface-container-lowest min-h-[44px] sm:min-h-[36px] py-2 px-2 rounded-xl text-[12px] sm:text-label-md font-label-md font-bold transition-colors shadow-sm active:scale-95 whitespace-nowrap"
              onClick={() => addToCart(product, quantity)}
            >
              <span className="material-symbols-outlined text-[17px] sm:text-[18px]">shopping_cart</span>
              <span>কার্টে যোগ</span>
            </button>
          </div>

          {/* Instant Buy */}
          <button
            type="button"
            className="w-full bg-primary hover:bg-primary-container text-surface-container-lowest min-h-[44px] sm:min-h-[38px] py-2 px-2 rounded-xl text-[12px] sm:text-label-md font-label-md font-bold transition-all text-center flex items-center justify-center active:scale-95"
            onClick={() => quickBuy(product, quantity)}
          >
            এখনই কিনুন
          </button>
        </div>
      </div>
    </div>
  );
};
