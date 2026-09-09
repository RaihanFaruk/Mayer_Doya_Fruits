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
                className={`px-4 py-1.5 rounded-full text-label-md font-label-md shrink-0 transition-colors ${
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

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
