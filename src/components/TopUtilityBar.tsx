import React from "react";

export const TopUtilityBar: React.FC = () => {
  return (
    <div className="bg-primary text-surface-container-lowest text-body-sm font-body-sm py-2 px-4 border-b border-primary-container">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
        {/* Running Promo / Assurance */}
        <div className="flex items-center gap-4 overflow-x-auto whitespace-nowrap text-[12px] md:text-[13px] font-medium tracking-wide">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px] text-primary-fixed">local_shipping</span>
            <span>সারা দেশে দ্রুত ক্যাশ অন ডেলিভারি (Cash on Delivery) সুবিধা</span>
          </span>
          <span className="hidden lg:inline text-primary-fixed-dim opacity-40">•</span>
          <span className="hidden lg:flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px] text-primary-fixed">verified</span>
            <span>১০০% ফরমালিনমুক্ত ও প্রাকৃতিক তাজা ফলের নিশ্চয়তা</span>
          </span>
        </div>
        {/* Hotline & Support */}
        <div className="flex items-center gap-4 text-body-sm font-body-sm shrink-0">
          <a
            className="flex items-center gap-1.5 hover:text-primary-fixed transition-colors font-medium"
            href="tel:+8801712345678"
          >
            <span className="material-symbols-outlined text-[15px] text-secondary-container">phone_in_talk</span>
            <span className="font-bold">হটলাইন: +৮৮০ ১৭১২-৩৪৫৬৭৮</span>
          </a>
          <span className="opacity-30">|</span>
          <a
            className="hover:text-primary-fixed transition-colors flex items-center gap-1"
            href="#help"
          >
            <span className="material-symbols-outlined text-[15px]">support_agent</span>
            <span>সাহায্য</span>
          </a>
          <span className="opacity-30">|</span>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-primary-container text-primary-fixed font-bold text-[11px]">
            বাংলা
          </span>
        </div>
      </div>
    </div>
  );
};
