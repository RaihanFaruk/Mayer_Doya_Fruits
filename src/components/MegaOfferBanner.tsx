"use client";

import React from "react";
import { useCart } from "@/context/CartContext";

export const MegaOfferBanner: React.FC = () => {
  const { addToCart } = useCart();

  const handleClaimOffer = () => {
    addToCart({
      id: "bundle-family-basket",
      name: "ফ্যামিলি ফ্রুট বাস্কেট (৫ কেজি স্পেশাল মিক্সড ফ্রুট বক্স)",
      price: 950,
      originalPrice: 1200,
      unit: "৫ কেজি বক্স",
      image_url:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuA63yH6J7Es4zdfCoeQG_cJuDBPVIX1ViiM9iXEddD21lxL2ccgyW97aNxho24gYR3XnNyucPjGdu4axuniuaawBxdEqLel6jHb_49-2tr9ZILCLi5qEhGN9hg1zCvT-SMj_k4XoTlfENDibgtfz7yJ8kBOLJeTfR8BKvpP1l89KxYLgWwGNakae73M4KBeQbH_LYVe_IGFgbXggCGrYGnOf5GRxdIFxAodH9fFG67BsUzdF0uBLMI_",
      stock: 50,
      is_active: true,
      description: "হিমসাগর আম ২ কেজি + মাল্টা ১ কেজি + বেদানা ১ কেজি + মিষ্টি আপেল ১ কেজি।",
    });
  };

  return (
    <section className="py-6" id="offers">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <div className="bg-surface-container-low rounded-2xl border-2 border-dashed border-secondary p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-secondary text-surface-container-lowest flex items-center justify-center shrink-0 shadow-md">
              <span className="material-symbols-outlined text-[36px]">featured_seasonal_and_gifts</span>
            </div>
            <div>
              <div className="inline-block bg-tertiary-container text-on-tertiary text-label-sm font-label-sm px-2 py-0.5 rounded font-bold mb-1">
                আজকের ফলের বিশেষ মেগা অফার
              </div>
              <h3 className="text-headline-md font-headline-md text-primary font-bold">
                ফ্যামিলি ফ্রুট বাস্কেট (৫ কেজি স্পেশাল মিক্সড ফ্রুট বক্স)
              </h3>
              <p className="text-body-md font-body-md text-on-surface-variant">
                হিমসাগর আম ২ কেজি + মাল্টা ১ কেজি + বেদানা ১ কেজি + মিষ্টি আপেল ১ কেজি।
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full md:w-auto">
            <div className="text-center md:text-right">
              <div className="flex items-baseline justify-center md:justify-end gap-2">
                <span className="text-headline-lg font-headline-lg text-primary font-bold">৳ ৯৫০</span>
                <span className="text-body-md text-outline line-through">৳ ১২০০</span>
              </div>
              <div className="text-label-sm font-label-sm text-secondary font-bold">
                ফ্রি হোম ডেলিভারি কোড:{" "}
                <span className="bg-surface-container-highest px-1.5 py-0.5 rounded font-mono text-primary">
                  MAYERDOA
                </span>
              </div>
            </div>
            <button
              type="button"
              className="w-full sm:w-auto bg-secondary hover:bg-primary text-surface-container-lowest font-label-lg text-label-lg px-6 py-3 rounded-xl transition-all shadow active:scale-95 whitespace-nowrap font-bold"
              onClick={handleClaimOffer}
            >
              অফারটি গ্রহণ করুন
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
