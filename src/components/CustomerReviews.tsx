import React from "react";

export const CustomerReviews: React.FC = () => {
  return (
    <section className="py-14 md:py-20 bg-surface-container-lowest border-y border-outline-variant/50">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-secondary font-bold text-label-md mb-1">
            <span className="material-symbols-outlined text-[18px]">rate_review</span>
            <span>বাস্তব মতামত</span>
          </div>
          <h2 className="text-headline-lg-mobile md:text-headline-lg font-headline-lg text-primary font-bold">
            আমাদের প্রিয় গ্রাহকদের সন্তুষ্টি
          </h2>
          <p className="text-body-md font-body-md text-on-surface-variant mt-1">
            মায়ের দোয়া ফলের সেবা নিয়ে সম্মানিত ক্রেতাদের সরাসরি অভিজ্ঞতা
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Review 1 */}
          <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/60 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
            <div>
              {/* Stars */}
              <div className="flex items-center text-tertiary-container mb-3">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className="material-symbols-outlined text-[18px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                ))}
              </div>
              <p className="text-body-md font-body-md text-on-surface mb-4 leading-relaxed">
                &quot;হিমসাগর আমগুলো অসাধারণ মিষ্টি ছিল। পরিবারের সবাই অনেক খুশি। কার্টন প্যাকেজিং খুবই ভালো ছিল, একটা আমও থেতলে যায়নি। নিয়মিত নেব।&quot;
              </p>
            </div>
            <div className="flex items-center gap-3 pt-3 border-t border-outline-variant/50">
              <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-label-md">
                তা
              </div>
              <div>
                <h5 className="text-label-md font-label-md font-bold text-primary">তানভীর আহমেদ</h5>
                <p className="text-[11px] text-on-surface-variant">
                  ধানমন্ডি, ঢাকা • <span className="text-secondary font-medium">ভেরিফাইড ক্রেতা</span>
                </p>
              </div>
            </div>
          </div>

          {/* Review 2 */}
          <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/60 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center text-tertiary-container mb-3">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className="material-symbols-outlined text-[18px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                ))}
              </div>
              <p className="text-body-md font-body-md text-on-surface mb-4 leading-relaxed">
                &quot;অনলাইনে ফল কিনতে প্রথমে বেশ দ্বিধায় ছিলাম। কিন্তু ফল হাতে পেয়ে পুরো মুগ্ধ! একদম গাছের তাজা ফলের আসল প্রাকৃতিক স্বাদ ও মিষ্টি গন্ধ পেয়েছি।&quot;
              </p>
            </div>
            <div className="flex items-center gap-3 pt-3 border-t border-outline-variant/50">
              <div className="w-10 h-10 rounded-full bg-primary-container text-primary-fixed flex items-center justify-center font-bold text-label-md">
                ফা
              </div>
              <div>
                <h5 className="text-label-md font-label-md font-bold text-primary">ফারহানা হক</h5>
                <p className="text-[11px] text-on-surface-variant">
                  উত্তরা, ঢাকা • <span className="text-secondary font-medium">ভেরিফাইড ক্রেতা</span>
                </p>
              </div>
            </div>
          </div>

          {/* Review 3 */}
          <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/60 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center text-tertiary-container mb-3">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className="material-symbols-outlined text-[18px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                ))}
              </div>
              <p className="text-body-md font-body-md text-on-surface mb-4 leading-relaxed">
                &quot;ডিজিটাল ওজন একদম সঠিক ছিল এবং কোনো পচা ফল পাইনি। ডেলিভারি ম্যানের সামনে দেখে ক্যাশ অন ডেলিভারি দেওয়া যায় বলেই মায়ের দোয়া ফল আমার ভরসার জায়গা।&quot;
              </p>
            </div>
            <div className="flex items-center gap-3 pt-3 border-t border-outline-variant/50">
              <div className="w-10 h-10 rounded-full bg-secondary text-surface-container-lowest flex items-center justify-center font-bold text-label-md">
                সা
              </div>
              <div>
                <h5 className="text-label-md font-label-md font-bold text-primary">সাইফুল ইসলাম</h5>
                <p className="text-[11px] text-on-surface-variant">
                  মিরপুর-১০, ঢাকা • <span className="text-secondary font-medium">ভেরিফাইড ক্রেতা</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
