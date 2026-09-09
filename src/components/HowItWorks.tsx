import React from "react";

export const HowItWorks: React.FC = () => {
  return (
    <section className="py-14 md:py-16 bg-surface-container-low/50">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-headline-lg-mobile md:text-headline-lg font-headline-lg text-primary font-bold">
            সহজ ৪ ধাপে ঘরে বসে ফল পান
          </h2>
          <p className="text-body-md font-body-md text-on-surface-variant mt-1">
            কোনো অগ্রিম পেমেন্ট ছাড়াই নিশ্চিন্তে অর্ডার করুন
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Step 1 */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant relative shadow-sm">
            <div className="w-9 h-9 rounded-full bg-primary text-surface-container-lowest font-bold text-label-md flex items-center justify-center mb-4">
              ১
            </div>
            <h4 className="text-headline-sm font-headline-sm text-primary mb-1 font-bold">ফল বাছাই করুন</h4>
            <p className="text-body-sm font-body-sm text-on-surface-variant">
              আমাদের ক্যাটাগরি বা সার্চ থেকে আপনার পরিবারের পছন্দের তাজা ফল বেছে নিন।
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant relative shadow-sm">
            <div className="w-9 h-9 rounded-full bg-primary text-surface-container-lowest font-bold text-label-md flex items-center justify-center mb-4">
              ২
            </div>
            <h4 className="text-headline-sm font-headline-sm text-primary mb-1 font-bold">কার্টে যোগ করুন</h4>
            <p className="text-body-sm font-body-sm text-on-surface-variant">
              প্রয়োজনীয় পরিমাণ (কেজি বা পিস) নির্ধারণ করে বাস্কেটে যুক্ত করুন।
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant relative shadow-sm">
            <div className="w-9 h-9 rounded-full bg-primary text-surface-container-lowest font-bold text-label-md flex items-center justify-center mb-4">
              ৩
            </div>
            <h4 className="text-headline-sm font-headline-sm text-primary mb-1 font-bold">নাম ও ঠিকানা দিন</h4>
            <p className="text-body-sm font-body-sm text-on-surface-variant">
              আপনার মোবাইল নম্বর এবং বাসার ঠিকানা লিখে এক ক্লিকে অর্ডার কনফার্ম করুন।
            </p>
          </div>

          {/* Step 4 */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant relative shadow-sm">
            <div className="w-9 h-9 rounded-full bg-secondary text-surface-container-lowest font-bold text-label-md flex items-center justify-center mb-4">
              ৪
            </div>
            <h4 className="text-headline-sm font-headline-sm text-primary mb-1 font-bold">দেখে মূল্য পরিশোধ</h4>
            <p className="text-body-sm font-body-sm text-on-surface-variant">
              ডেলিভারি ম্যানের থেকে ফল হাতে পেয়ে দেখে নিশ্চিন্তে ক্যাশ অন ডেলিভারি দিন।
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
