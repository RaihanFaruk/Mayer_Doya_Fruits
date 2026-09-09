"use client";

import React, { useState } from "react";
import { Product } from "@/types";
import { ProductCard } from "./ProductCard";

interface BestSellingSectionProps {
  products: Product[];
  activeFilter?: string;
  onFilterChange?: (filter: string) => void;
}

export const BestSellingSection: React.FC<BestSellingSectionProps> = ({
  products,
  activeFilter: propFilter,
  onFilterChange,
}) => {
  const [internalFilter, setInternalFilter] = useState<string>("সকল ফল");
  const currentFilter = propFilter || internalFilter;

  const handleFilterClick = (filter: string) => {
    setInternalFilter(filter);
    if (onFilterChange) onFilterChange(filter);
  };

  const filteredProducts = products.filter((p) => {
    if (currentFilter === "সকল ফল") return true;
    if (currentFilter === "আমের মৌসুম") {
      return (
        p.category?.includes("আম") ||
        p.name.includes("আম") ||
        p.name.includes("লিচু")
      );
    }
    if (currentFilter === "আমদানি ফল") {
      return (
        p.category?.includes("আমদানি") ||
        p.name.includes("আপেল") ||
        p.name.includes("মাল্টা") ||
        p.name.includes("ডালিম")
      );
    }
    return true;
  });

  return (
    <section
      className="py-12 md:py-16 bg-surface-container-low/40 border-y border-outline-variant/40"
      id="best-selling"
    >
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 text-secondary font-bold text-label-md mb-1">
              <span className="material-symbols-outlined text-[18px]">trending_up</span>
              <span>প্রতিদিনের প্রিয় পছন্দ</span>
            </div>
            <h2 className="text-headline-lg-mobile md:text-headline-lg font-headline-lg text-primary">
              সবচেয়ে জনপ্রিয় ফল
            </h2>
            <p className="text-body-md font-body-md text-on-surface-variant mt-1">
              আমাদের হাজারো পরিবারের বিশ্বাস অর্জন করা সেরা ও খাঁটি সংগ্রহ
            </p>
          </div>

          {/* Quick Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
            {["সকল ফল", "আমের মৌসুম", "আমদানি ফল"].map((pill) => (
              <button
                key={pill}
                type="button"
                className={`px-4 py-2 sm:py-1.5 rounded-full text-label-md font-label-md shrink-0 transition-colors min-h-[44px] sm:min-h-[36px] flex items-center justify-center ${
                  currentFilter === pill
                    ? "bg-primary text-surface-container-lowest"
                    : "bg-surface-container-lowest border border-outline-variant text-on-surface-variant hover:border-primary"
                }`}
                onClick={() => handleFilterClick(pill)}
              >
                {pill}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid: 2 columns on mobile, 3 columns on tablet, 4 columns on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {products.length === 0 ? (
            /* Skeleton Loading State */
            Array.from({ length: 8 }).map((_, idx) => (
              <div
                key={idx}
                className="bg-surface-container-lowest rounded-2xl border border-outline-variant/60 overflow-hidden flex flex-col shadow-sm"
              >
                <div className="aspect-[4/3] bg-surface-container skeleton-shimmer" />
                <div className="p-3 sm:p-4 space-y-2">
                  <div className="h-3 bg-surface-container rounded w-1/2 skeleton-shimmer" />
                  <div className="h-4 bg-surface-container rounded w-3/4 skeleton-shimmer" />
                  <div className="h-5 bg-surface-container rounded w-1/3 skeleton-shimmer" />
                  <div className="h-10 bg-surface-container rounded-xl skeleton-shimmer mt-2" />
                </div>
              </div>
            ))
          ) : filteredProducts.length === 0 ? (
            /* Empty Filter Search State */
            <div className="col-span-full py-12 text-center bg-surface-container-lowest rounded-2xl border border-outline-variant/60 p-6">
              <span className="material-symbols-outlined text-[48px] text-outline opacity-40 mb-2">
                search_off
              </span>
              <h3 className="text-headline-sm font-bold text-primary mb-1">কোনো ফল পাওয়া যায়নি</h3>
              <p className="text-body-sm text-on-surface-variant mb-4">
                ফিল্টার পরিবর্তন করুন অথবা অন্য কোনো নাম দিয়ে অনুসন্ধান করুন।
              </p>
              <button
                type="button"
                onClick={() => handleFilterClick("সকল ফল")}
                className="inline-flex items-center gap-1.5 bg-primary text-surface-container-lowest px-4 py-2 rounded-xl text-label-md font-bold transition-all shadow"
              >
                <span>সব ফল দেখুন</span>
              </button>
            </div>
          ) : (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};
