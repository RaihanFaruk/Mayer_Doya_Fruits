"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import { WHATSAPP_PHONE } from "@/lib/whatsapp";

export const OrderSuccessModal: React.FC = () => {
  const { isOrderSuccessOpen, setIsOrderSuccessOpen, lastOrderId, lastWhatsAppUrl } = useCart();

  if (!isOrderSuccessOpen) return null;

  const targetWhatsAppUrl = lastWhatsAppUrl || `https://wa.me/${WHATSAPP_PHONE}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/60 backdrop-blur-sm">
      <div className="bg-surface-container-lowest max-w-md w-full rounded-2xl p-6 shadow-2xl border border-outline-variant text-center transform transition-all">
        {/* Success Icon */}
        <div className="w-16 h-16 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center mx-auto mb-4">
          <span className="material-symbols-outlined text-[36px]">check_circle</span>
        </div>

        <h3 className="text-headline-md font-headline-md font-bold text-primary mb-1">
          অর্ডার সফলভাবে গৃহীত হয়েছে!
        </h3>

        <p className="text-body-md font-body-md text-on-surface-variant mb-4">
          মায়ের দোয়া ফল বেছে নেওয়ার জন্য ধন্যবাদ। আমাদের প্রতিনিধি শীঘ্রই আপনাকে ফোন করে অর্ডারটি নিশ্চিত করবেন।
        </p>

        {/* Details Box */}
        <div className="bg-surface-container-low p-3.5 rounded-xl text-label-md font-label-md text-left mb-5 space-y-1 text-on-surface">
          <div>
            অর্ডার আইডি: <span className="font-bold font-mono text-primary">#{lastOrderId || "MDF-78291"}</span>
          </div>
          <div>
            পেমেন্ট পদ্ধতি: <span className="font-bold text-secondary">ক্যাশ অন ডেলিভারি</span>
          </div>
          <div>
            প্রত্যাশিত ডেলিভারি: <span className="font-medium">আগামীকাল সকালের মধ্যে</span>
          </div>
        </div>

        {/* WhatsApp Manual Trigger button if tab was blocked */}
        <div className="mb-3">
          <a
            href={targetWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 bg-secondary hover:bg-primary text-surface-container-lowest py-2.5 rounded-xl font-label-lg text-label-lg font-bold transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">chat</span>
            <span>হোয়াটসঅ্যাপে দেখতে ট্যাপ করুন</span>
          </a>
        </div>

        {/* Continue Shopping */}
        <button
          type="button"
          className="w-full bg-primary hover:bg-primary-container text-surface-container-lowest py-2.5 rounded-xl font-label-lg text-label-lg font-bold transition-all"
          onClick={() => setIsOrderSuccessOpen(false)}
        >
          কেনাকাটা চালিয়ে যান
        </button>
      </div>
    </div>
  );
};
