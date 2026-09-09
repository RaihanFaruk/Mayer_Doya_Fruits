import React from "react";

interface TopUtilityBarProps {}

const UtilityItems: React.FC = () => (
  <div className="flex items-center gap-6 shrink-0 px-6">
    {/* 1. Cash on delivery */}
    <span className="flex items-center gap-1.5 whitespace-nowrap">
      <span className="material-symbols-outlined text-[16px] text-primary-fixed">local_shipping</span>
      <span>সারা দেশে দ্রুত ক্যাশ অন ডেলিভারি (Cash on Delivery) সুবিধা</span>
    </span>

    <span className="text-primary-fixed-dim opacity-40">•</span>

    {/* 2. Formalin-free guarantee */}
    <span className="flex items-center gap-1.5 whitespace-nowrap">
      <span className="material-symbols-outlined text-[16px] text-primary-fixed">verified</span>
      <span>১০০% ফরমালিনমুক্ত ও প্রাকৃতিক তাজা ফলের নিশ্চয়তা</span>
    </span>

    <span className="text-primary-fixed-dim opacity-40">•</span>

    {/* 3. Hotline number */}
    <a
      className="flex items-center gap-1.5 hover:text-primary-fixed transition-colors font-medium whitespace-nowrap"
      href="tel:+8801712345678"
    >
      <span className="material-symbols-outlined text-[15px] text-secondary-container">phone_in_talk</span>
      <span className="font-bold">হটলাইন: +৮৮০ ১৭১২-৩৪৫৬৭৮</span>
    </a>

    <span className="opacity-30">|</span>

    {/* 4. Help link */}
    <a
      className="hover:text-primary-fixed transition-colors flex items-center gap-1 whitespace-nowrap"
      href="#help"
    >
      <span className="material-symbols-outlined text-[15px]">support_agent</span>
      <span>সাহায্য</span>
    </a>

    <span className="opacity-30">|</span>

    {/* 5. Language switcher */}
    <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-primary-container text-primary-fixed font-bold text-[11px] whitespace-nowrap">
      বাংলা
    </span>

    <span className="text-primary-fixed-dim opacity-40">•</span>
  </div>
);

export const TopUtilityBar: React.FC<TopUtilityBarProps> = () => {
  return (
    <div
      className="bg-primary text-surface-container-lowest text-body-sm font-body-sm py-2 border-b border-primary-container overflow-hidden"
      aria-label="অফার ও নোটিফিকেশন বার"
    >
      <div className="marquee-container" tabIndex={0} aria-live="polite">
        <div className="marquee-track">
          {/* Rendered twice in sequence for seamless, continuous looping */}
          <UtilityItems />
          <UtilityItems />
        </div>
      </div>
    </div>
  );
};
