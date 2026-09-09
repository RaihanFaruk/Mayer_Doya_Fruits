import React from "react";

export const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-14 md:py-20 bg-surface-container-lowest border-t border-outline-variant/40" id="about">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-secondary font-bold text-label-md mb-2">
            <span className="material-symbols-outlined text-[18px]">verified_user</span>
            <span>আমাদের অঙ্গীকার ও সততা</span>
          </div>
          <h2 className="text-headline-lg-mobile md:text-headline-lg font-headline-lg text-primary font-bold">
            কেন মায়ের দোয়া ফল বেছে নেবেন?
          </h2>
          <p className="text-body-lg font-body-lg text-on-surface-variant mt-2 italic">
            &quot;মায়ের ভালোবাসার মতো পরম যত্নে আমরা প্রতিটি ফল আপনার পরিবারের জন্য বাছাই করি।&quot;
          </p>
        </div>

        {/* 5 Key Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5">
          {/* Pillar 1 */}
          <div className="bg-surface-container-low p-5 rounded-2xl border border-outline-variant/60 text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-primary-container text-primary-fixed flex items-center justify-center mb-3">
              <span className="material-symbols-outlined text-[24px]">science</span>
            </div>
            <h4 className="text-headline-sm font-headline-sm text-primary mb-1.5 font-bold">শতভাগ কেমিক্যালমুক্ত</h4>
            <p className="text-body-sm font-body-sm text-on-surface-variant">
              কোনো ক্ষতিকর কার্বাইড, ফরমালিন বা বিষাক্ত রাসায়নিকের ব্যবহার নেই।
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="bg-surface-container-low p-5 rounded-2xl border border-outline-variant/60 text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-secondary text-surface-container-lowest flex items-center justify-center mb-3">
              <span className="material-symbols-outlined text-[24px]">agriculture</span>
            </div>
            <h4 className="text-headline-sm font-headline-sm text-primary mb-1.5 font-bold">সরাসরি বাগান থেকে</h4>
            <p className="text-body-sm font-body-sm text-on-surface-variant">
              মধ্যস্বত্বভোগী ছাড়া সরাসরি বাগান মালিক ও কৃষকদের থেকে টাটকা সংগ্রহ।
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="bg-surface-container-low p-5 rounded-2xl border border-outline-variant/60 text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-primary-container text-primary-fixed flex items-center justify-center mb-3">
              <span className="material-symbols-outlined text-[24px]">balance</span>
            </div>
            <h4 className="text-headline-sm font-headline-sm text-primary mb-1.5 font-bold">নিখুঁত ডিজিটাল ওজন</h4>
            <p className="text-body-sm font-body-sm text-on-surface-variant">
              প্রমাণিত ডিজিটাল স্কেলে সঠিক মাপ নিশ্চিত করে ডেলিভারি করা হয়।
            </p>
          </div>

          {/* Pillar 4 */}
          <div className="bg-surface-container-low p-5 rounded-2xl border border-outline-variant/60 text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-secondary text-surface-container-lowest flex items-center justify-center mb-3">
              <span className="material-symbols-outlined text-[24px]">all_inbox</span>
            </div>
            <h4 className="text-headline-sm font-headline-sm text-primary mb-1.5 font-bold">ক্রাফট বক্স প্যাকিং</h4>
            <p className="text-body-sm font-body-sm text-on-surface-variant">
              ফল যেন আঘাত না পায় সেজন্য ভেন্টিলেটেড শক্ত ক্রাফট বক্সে প্যাকেট।
            </p>
          </div>

          {/* Pillar 5 */}
          <div className="bg-surface-container-low p-5 rounded-2xl border border-outline-variant/60 text-center flex flex-col items-center sm:col-span-2 lg:col-span-1">
            <div className="w-12 h-12 rounded-full bg-primary-container text-primary-fixed flex items-center justify-center mb-3">
              <span className="material-symbols-outlined text-[24px]">assignment_return</span>
            </div>
            <h4 className="text-headline-sm font-headline-sm text-primary mb-1.5 font-bold">তাৎক্ষণিক রিটার্ন</h4>
            <p className="text-body-sm font-body-sm text-on-surface-variant">
              ডেলিভারি ম্যানের সামনে দেখে ফল পছন্দ না হলে সাথে সাথে ফেরত দিন।
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
