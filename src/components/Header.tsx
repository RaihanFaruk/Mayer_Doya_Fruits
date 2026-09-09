"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

interface HeaderProps {
  onSearch?: (query: string) => void;
  onCategoryFilter?: (cat: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearch, onCategoryFilter }) => {
  const { totalItemsCount, subtotal, setIsCartOpen } = useCart();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("সকল ক্যাটাগরি");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setSelectedCategory(val);
    if (onCategoryFilter) {
      onCategoryFilter(val);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-surface-container-lowest shadow-sm border-b border-outline-variant transition-all duration-200">
      <div className="w-full px-4 md:px-8 max-w-[1200px] mx-auto py-3 md:py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Left: Brand Logo & Tagline */}
          <Link className="flex items-center gap-3 shrink-0 group" href="/">
            <div className="w-11 h-11 rounded-xl bg-primary-container flex items-center justify-center text-primary-fixed shadow-sm group-hover:scale-105 transition-transform duration-200">
              <span className="material-symbols-outlined text-[26px]">nutrition</span>
            </div>
            <div>
              <div className="text-headline-md font-headline-md font-bold text-primary tracking-tight leading-tight flex items-center gap-1">
                <span>মায়ের দোয়া ফল</span>
                <span className="material-symbols-outlined text-secondary text-[18px]">energy_savings_leaf</span>
              </div>
              <p className="text-label-md font-label-md text-on-surface-variant font-medium">প্রতিটি ফোঁটায় ভালোবাসা</p>
            </div>
          </Link>

          {/* Center: Search Bar with Category Filter */}
          <div className="hidden lg:flex flex-1 max-w-xl mx-4 flex-col">
            <form
              onSubmit={handleSearchSubmit}
              className="relative flex items-center w-full border border-outline-variant focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 rounded-xl bg-surface-container-low transition-all overflow-hidden"
            >
              {/* Category dropdown */}
              <div className="relative border-r border-outline-variant/60 bg-surface-container/50">
                <select
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  className="appearance-none bg-transparent py-2.5 pl-3 pr-8 text-label-md font-label-md text-on-surface border-none focus:ring-0 cursor-pointer"
                >
                  <option value="সকল ক্যাটাগরি">সকল ক্যাটাগরি</option>
                  <option value="আম ও মৌসুমি">আম ও মৌসুমি</option>
                  <option value="আপেল ও আঙুর">আপেল ও আঙুর</option>
                  <option value="কমলা ও মাল্টা">কমলা ও মাল্টা</option>
                  <option value="ড্রাইড ফ্রুটস">ড্রাইড ফ্রুটস</option>
                </select>
                <span className="material-symbols-outlined absolute right-2 top-3 text-[16px] pointer-events-none text-outline">
                  expand_more
                </span>
              </div>

              {/* Search input */}
              <input
                className="w-full bg-transparent border-none py-2.5 px-3.5 text-body-md font-body-md text-on-surface placeholder:text-outline focus:ring-0"
                placeholder="আম, লিচু, কমলা কিংবা আপেল খুঁজুন..."
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  if (onSearch) onSearch(e.target.value);
                }}
              />

              {/* Submit button */}
              <button
                aria-label="Search"
                className="pr-3 pl-2 text-primary hover:text-secondary transition-colors"
                type="submit"
              >
                <span className="material-symbols-outlined text-[22px]">search</span>
              </button>
            </form>

            {/* Quick Trending Tags */}
            <div className="flex items-center gap-2 mt-1.5 text-label-md font-label-md text-on-surface-variant">
              <span className="text-outline text-[11px] font-medium">জনপ্রিয় সার্চ:</span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm("হিমসাগর আম");
                    if (onSearch) onSearch("হিমসাগর আম");
                  }}
                  className="hover:text-primary underline decoration-dotted text-[11px]"
                >
                  হিমসাগর আম
                </button>
                <span className="text-outline text-[10px]">•</span>
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm("বেদানা");
                    if (onSearch) onSearch("বেদানা");
                  }}
                  className="hover:text-primary underline decoration-dotted text-[11px]"
                >
                  বেদানা
                </button>
                <span className="text-outline text-[10px]">•</span>
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm("আপেল");
                    if (onSearch) onSearch("আপেল");
                  }}
                  className="hover:text-primary underline decoration-dotted text-[11px]"
                >
                  কাশ্মিরী আপেল
                </button>
                <span className="text-outline text-[10px]">•</span>
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm("মাল্টা");
                    if (onSearch) onSearch("মাল্টা");
                  }}
                  className="hover:text-primary underline decoration-dotted text-[11px]"
                >
                  মাল্টা
                </button>
              </div>
            </div>
          </div>

          {/* Right User Actions & Interactive Cart Button */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Order Track Link */}
            <a
              className="hidden md:flex items-center gap-1 px-3 py-2 rounded-lg text-label-md font-label-md text-on-surface hover:bg-surface-container transition-colors"
              href="#track"
            >
              <span className="material-symbols-outlined text-[18px] text-secondary">inventory_2</span>
              <span>অর্ডার ট্র্যাক</span>
            </a>

            {/* Account / Admin Login */}
            <Link
              className="flex items-center gap-1 px-3 py-2 rounded-lg text-label-md font-label-md text-on-surface hover:bg-surface-container transition-colors"
              href="/admin/login"
            >
              <span className="material-symbols-outlined text-[20px] text-outline">account_circle</span>
              <span className="hidden sm:inline">লগইন</span>
            </Link>

            {/* Cart Action Button with Preview */}
            <button
              aria-label="কার্ট দেখুন"
              className="relative flex items-center gap-2.5 bg-primary hover:bg-primary-container text-surface-container-lowest px-3.5 md:px-4 py-2 rounded-xl transition-all shadow-sm active:scale-[0.98]"
              id="cartDrawerBtn"
              onClick={() => setIsCartOpen(true)}
            >
              <div className="relative">
                <span className="material-symbols-outlined text-[22px]">shopping_basket</span>
                {totalItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-tertiary-container text-on-tertiary text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-surface-container-lowest">
                    {totalItemsCount}
                  </span>
                )}
              </div>
              <div className="hidden sm:flex flex-col text-left leading-none">
                <span className="text-label-sm font-label-sm text-primary-fixed opacity-90">কার্ট</span>
                <span className="text-label-md font-label-md font-bold mt-0.5">৳ {subtotal}</span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="mt-3 lg:hidden">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center w-full border border-outline-variant rounded-xl bg-surface-container-low">
            <input
              className="w-full bg-transparent border-none py-2 px-3 text-body-md font-body-md text-on-surface placeholder:text-outline focus:ring-0"
              placeholder="তাজা ফল খুঁজুন..."
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                if (onSearch) onSearch(e.target.value);
              }}
            />
            <button aria-label="Search" className="pr-3 pl-2 text-primary" type="submit">
              <span className="material-symbols-outlined text-[20px]">search</span>
            </button>
          </form>
        </div>
      </div>
    </header>
  );
};
