"use client";

import React from "react";
import { useCart } from "@/context/CartContext";

export const OfflineBanner: React.FC = () => {
  const { isOnline } = useCart();

  if (isOnline) return null;

  return (
    <div className="bg-amber-600 text-white px-4 py-2 text-center text-label-md font-medium flex items-center justify-center gap-2 shadow-md z-50 sticky top-0">
      <span className="material-symbols-outlined text-[18px]">wifi_off</span>
      <span>
        আপনি বর্তমানে অফলাইনে আছেন। ক্যাশড পণ্য ও কার্ট দেখতে পারবেন, তবে নতুন অর্ডার সম্পন্ন করতে ইন্টারনেট সংযোগ প্রয়োজন।
      </span>
    </div>
  );
};
