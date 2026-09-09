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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const handleSelectNavCategory = (cat: string) => {
    setSelectedCategory(cat);
    if (onCategoryFilter) {
      onCategoryFilter(cat);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-surface-container-lowest shadow-sm border-b border-outline-variant transition-all duration-200">
      <div className="w-full px-3 sm:px-4 md:px-8 max-w-[1200px] mx-auto py-2.5 sm:py-3 md:py-4">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Left: Hamburger Menu (mobile only) & Brand Logo */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              aria-label="মেনু খুলুন"
              className="lg:hidden p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-primary hover:bg-surface-container rounded-xl transition-colors active:scale-95"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <span className="material-symbols-outlined text-[26px]">menu</span>
            </button>

            <Link className="flex items-center gap-2 sm:gap-3 shrink-0 group" href="/">
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-primary-container flex items-center justify-center text-primary-fixed shadow-sm group-hover:scale-105 transition-transform duration-200">
                <span className="material-symbols-outlined text-[22px] sm:text-[26px]">nutrition</span>
              </div>
              <div>
                <div className="text-[17px] sm:text-headline-md font-bold text-primary tracking-tight leading-tight flex items-center gap-1">
                  <span>মায়ের দোয়া ফল</span>
                  <span className="material-symbols-outlined text-secondary text-[16px] sm:text-[18px]">energy_savings_leaf</span>
                </div>
                <p className="text-[10px] sm:text-label-md text-on-surface-variant font-medium hidden xs:block">
                  প্রতিটি ফোঁটায় ভালোবাসা
                </p>
              </div>
            </Link>
          </div>

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
          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* Order Track Link */}
            <a
              className="hidden md:flex items-center gap-1 px-3 py-2 rounded-lg text-label-md font-label-md text-on-surface hover:bg-surface-container transition-colors min-h-[44px]"
              href="#track"
            >
              <span className="material-symbols-outlined text-[18px] text-secondary">inventory_2</span>
              <span>অর্ডার ট্র্যাক</span>
            </a>

            {/* Account / Admin Login */}
            <Link
              className="flex items-center justify-center gap-1 p-2 sm:px-3 sm:py-2 rounded-lg text-label-md font-label-md text-on-surface hover:bg-surface-container transition-colors min-h-[44px] min-w-[44px]"
              href="/admin/login"
              aria-label="অ্যাডমিন লগইন"
            >
              <span className="material-symbols-outlined text-[22px] sm:text-[20px] text-outline">account_circle</span>
              <span className="hidden sm:inline">লগইন</span>
            </Link>

            {/* Cart Action Button with Preview */}
            <button
              aria-label="কার্ট দেখুন"
              className="relative flex items-center justify-center gap-2 bg-primary hover:bg-primary-container text-surface-container-lowest px-3 sm:px-4 py-2 rounded-xl transition-all shadow-sm active:scale-[0.98] min-h-[44px] min-w-[44px]"
              id="cartDrawerBtn"
              onClick={() => setIsCartOpen(true)}
            >
              <div className="relative flex items-center justify-center">
                <span className="material-symbols-outlined text-[22px]">shopping_basket</span>
                {totalItemsCount > 0 && (
                  <span className="absolute -top-2.5 -right-2.5 bg-tertiary-container text-on-tertiary text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-surface-container-lowest">
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
        <div className="mt-2.5 lg:hidden">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center w-full border border-outline-variant focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 rounded-xl bg-surface-container-low transition-all">
            <input
              className="w-full bg-transparent border-none py-2.5 px-3.5 text-body-md font-body-md text-on-surface placeholder:text-outline focus:ring-0"
              placeholder="তাজা ফল খুঁজুন..."
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                if (onSearch) onSearch(e.target.value);
              }}
            />
            <button aria-label="অনুসন্ধান করুন" className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-primary" type="submit">
              <span className="material-symbols-outlined text-[22px]">search</span>
            </button>
          </form>
        </div>
      </div>

      {/* Mobile Slide-out Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden overflow-hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-inverse-surface/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer Sheet */}
          <div className="fixed inset-y-0 left-0 w-[290px] sm:w-[320px] max-w-[85vw] bg-surface-container-lowest shadow-2xl flex flex-col z-50 animate-in slide-in-from-left duration-200">
            {/* Drawer Header */}
            <div className="p-4 border-b border-outline-variant flex items-center justify-between bg-surface-container-low">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-primary-container flex items-center justify-center text-primary-fixed">
                  <span className="material-symbols-outlined text-[20px]">nutrition</span>
                </div>
                <div>
                  <span className="block font-bold text-primary text-headline-sm leading-tight">মায়ের দোয়া ফল</span>
                  <span className="text-[11px] text-on-surface-variant">মেনু ও ক্যাটাগরি</span>
                </div>
              </div>
              <button
                type="button"
                aria-label="মেনু বন্ধ করুন"
                className="text-outline hover:text-primary p-2 min-w-[44px] min-h-[44px] -mr-2 flex items-center justify-center rounded-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="material-symbols-outlined text-[24px]">close</span>
              </button>
            </div>

            {/* Navigation Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scroll">
              {/* Categories Section */}
              <div>
                <span className="text-label-sm font-bold text-secondary uppercase tracking-wider block mb-2 px-2">
                  ফলের ক্যাটাগরি সমূহ
                </span>
                <div className="space-y-1">
                  {[
                    { label: "সকল ফল", icon: "grid_view", filter: "সকল ফল" },
                    { label: "আম ও মৌসুমি ফল", icon: "energy_savings_leaf", filter: "আমের মৌসুম" },
                    { label: "আপেল ও নাশপাতি", icon: "nutrition", filter: "আমদানি ফল" },
                    { label: "কমলা ও মাল্টা", icon: "local_florist", filter: "আমদানি ফল" },
                    { label: "ডালিম ও লাল আঙুর", icon: "spa", filter: "আমদানি ফল" },
                    { label: "ড্রাইড ফ্রুটস ও বাদাম", icon: "grain", filter: "সকল ফল" },
                  ].map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-body-md font-medium text-on-surface hover:bg-surface-container hover:text-primary transition-colors min-h-[44px]"
                      onClick={() => handleSelectNavCategory(item.filter)}
                    >
                      <span className="material-symbols-outlined text-[20px] text-secondary">
                        {item.icon}
                      </span>
                      <span>{item.label}</span>
                    </button>
                  ))}
                  <a
                    href="#offers"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-body-md font-bold text-tertiary-container hover:bg-surface-container transition-colors min-h-[44px]"
                  >
                    <span className="material-symbols-outlined text-[20px]">local_fire_department</span>
                    <span>বিশেষ মেগা অফার</span>
                  </a>
                </div>
              </div>

              {/* Helpful Links */}
              <div className="border-t border-outline-variant/60 pt-4">
                <span className="text-label-sm font-bold text-on-surface-variant uppercase tracking-wider block mb-2 px-2">
                  গ্রাহক সেবা ও লিংক
                </span>
                <div className="space-y-1">
                  <a
                    href="#track"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-body-md text-on-surface hover:bg-surface-container transition-colors min-h-[44px]"
                  >
                    <span className="material-symbols-outlined text-[20px] text-secondary">inventory_2</span>
                    <span>অর্ডার ট্র্যাক</span>
                  </a>
                  <a
                    href="#help"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-body-md text-on-surface hover:bg-surface-container transition-colors min-h-[44px]"
                  >
                    <span className="material-symbols-outlined text-[20px] text-secondary">help</span>
                    <span>সাহায্য ও অর্ডার নিয়ম</span>
                  </a>
                  <a
                    href="#about"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-body-md text-on-surface hover:bg-surface-container transition-colors min-h-[44px]"
                  >
                    <span className="material-symbols-outlined text-[20px] text-secondary">info</span>
                    <span>আমাদের কথা</span>
                  </a>
                  <Link
                    href="/admin/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-body-md text-on-surface hover:bg-surface-container transition-colors min-h-[44px]"
                  >
                    <span className="material-symbols-outlined text-[20px] text-outline">admin_panel_settings</span>
                    <span>অ্যাডমিন লগইন</span>
                  </Link>
                </div>
              </div>

              {/* Call Hotline CTA */}
              <div className="pt-2">
                <a
                  href="tel:+8801712345678"
                  className="w-full flex items-center justify-center gap-2 bg-secondary text-surface-container-lowest py-3 px-4 rounded-xl font-bold text-label-md transition-all shadow min-h-[44px]"
                >
                  <span className="material-symbols-outlined text-[18px]">phone_in_talk</span>
                  <span>হটলাইন: +৮৮০ ১৭১২-৩৪৫৬৭৮</span>
                </a>
              </div>
            </div>

            {/* Drawer Footer Trust Banner */}
            <div className="p-3 bg-surface-container-low border-t border-outline-variant text-center">
              <span className="text-[11px] text-on-surface-variant font-medium flex items-center justify-center gap-1">
                <span className="material-symbols-outlined text-[14px] text-secondary">verified</span>
                <span>১০০% ফরমালিনমুক্ত ফলের নিশ্চয়তা</span>
              </span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
