import React from "react";

export const TrustFeatures: React.FC = () => {
  return (
    <section className="py-10 bg-surface-container-lowest border-b border-outline-variant/50">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {/* Feature 1 */}
          <div className="p-4 md:p-5 rounded-2xl bg-surface-container-low border border-outline-variant/60 flex items-start gap-3.5 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-primary-container text-primary-fixed flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[24px]">eco</span>
            </div>
            <div>
              <h4 className="text-headline-sm font-headline-sm text-primary mb-1">তাজা ও বাছাই করা ফল</h4>
              <p className="text-body-sm font-body-sm text-on-surface-variant">
                সরাসরি বাগান ও বিশ্বস্ত চাষীদের থেকে সযত্নে সংগৃহীত।
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="p-4 md:p-5 rounded-2xl bg-surface-container-low border border-outline-variant/60 flex items-start gap-3.5 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-secondary text-surface-container-lowest flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[24px]">payments</span>
            </div>
            <div>
              <h4 className="text-headline-sm font-headline-sm text-primary mb-1">ক্যাশ অন ডেলিভারি</h4>
              <p className="text-body-sm font-body-sm text-on-surface-variant">
                ফল দেখে ও পরখ করে পেমেন্ট করার শতভাগ স্বাধীনতা।
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="p-4 md:p-5 rounded-2xl bg-surface-container-low border border-outline-variant/60 flex items-start gap-3.5 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-primary-container text-primary-fixed flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[24px]">inventory</span>
            </div>
            <div>
              <h4 className="text-headline-sm font-headline-sm text-primary mb-1">সুরক্ষিত প্যাকিং</h4>
              <p className="text-body-sm font-body-sm text-on-surface-variant">
                ইকো-ফ্রেন্ডলি সুরক্ষিত ভেন্টিলেটেড ক্রাফট বক্সে ডেলিভারি।
              </p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="p-4 md:p-5 rounded-2xl bg-surface-container-low border border-outline-variant/60 flex items-start gap-3.5 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-secondary text-surface-container-lowest flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[24px]">scale</span>
            </div>
            <div>
              <h4 className="text-headline-sm font-headline-sm text-primary mb-1">সঠিক ওজন ও সততা</h4>
              <p className="text-body-sm font-body-sm text-on-surface-variant">
                ডিজিটাল স্কেলে নিখুঁত পরিমাপের শতভাগ নিশ্চয়তা।
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
