import React from "react";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden pt-6 pb-12 md:py-14 hero-glow border-b border-outline-variant/40">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Hero Text Left (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Emotional Quality Stamp */}
            <div className="inline-flex items-center gap-2 bg-surface-container-lowest border border-secondary-container px-3.5 py-1.5 rounded-full shadow-sm mb-4">
              <span className="material-symbols-outlined text-secondary text-[18px]">verified</span>
              <span className="text-label-md font-label-md text-on-secondary-container font-semibold">
                মায়ের যত্নের মতো যত্ন নিয়ে বাছাই করা তাজা ফল
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-display-hero-mobile md:text-display-hero font-display-hero text-primary tracking-tight mb-4">
              তাজা ফল, <br className="hidden sm:inline" />
              <span className="text-secondary underline decoration-secondary/30">ভালোবাসার সাথে</span>
            </h1>

            <p className="text-body-lg font-body-lg text-on-surface-variant mb-6 max-w-xl">
              বাছাই করা ফরমালিনমুক্ত মিষ্টি তাজা ফল এখন সরাসরি বাগান থেকে আপনার ঘরে। রাজশাহী, চাঁপাইনবাবগঞ্জ ও দিনাজপুরের খাঁটি স্বাদ পৌঁছে দিচ্ছি সর্বোচ্চ আস্থায়।
            </p>

            {/* Dual CTA Cluster */}
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto mb-8">
              <a
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary-container hover:bg-primary text-surface-container-lowest font-label-lg text-label-lg px-6 py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
                href="#best-selling"
              >
                <span>এখনই ফল কিনুন</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </a>
              <a
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-surface-container-lowest border border-outline-variant hover:bg-surface-container text-primary font-label-lg text-label-lg px-6 py-3.5 rounded-xl transition-all"
                href="#categories"
              >
                <span className="material-symbols-outlined text-[18px]">menu_book</span>
                <span>জনপ্রিয় ফল দেখুন</span>
              </a>
            </div>

            {/* Mini Trust Stats */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-outline-variant/60 w-full max-w-lg">
              <div className="flex flex-col">
                <span className="text-headline-md font-headline-md text-primary font-bold">১৫,০০০+</span>
                <span className="text-label-md font-label-md text-on-surface-variant">সন্তুষ্ট পরিবার</span>
              </div>
              <div className="flex flex-col border-l border-outline-variant/60 pl-3">
                <span className="text-headline-md font-headline-md text-secondary font-bold">১০০%</span>
                <span className="text-label-md font-label-md text-on-surface-variant">খাঁটি গ্যারান্টি</span>
              </div>
              <div className="flex flex-col border-l border-outline-variant/60 pl-3">
                <span className="text-headline-md font-headline-md text-primary font-bold">২৪ ঘণ্টায়</span>
                <span className="text-label-md font-label-md text-on-surface-variant">হোম ডেলিভারি</span>
              </div>
            </div>
          </div>

          {/* Hero Visual Right (5 cols Bento Composition) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-surface-container-lowest bg-surface-container aspect-square md:aspect-[4/3] lg:aspect-[1/1] group">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                alt="মায়ের দোয়া ফল তাজা ফলের সমাহার"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA63yH6J7Es4zdfCoeQG_cJuDBPVIX1ViiM9iXEddD21lxL2ccgyW97aNxho24gYR3XnNyucPjGdu4axuniuaawBxdEqLel6jHb_49-2tr9ZILCLi5qEhGN9hg1zCvT-SMj_k4XoTlfENDibgtfz7yJ8kBOLJeTfR8BKvpP1l89KxYLgWwGNakae73M4KBeQbH_LYVe_IGFgbXggCGrYGnOf5GRxdIFxAodH9fFG67BsUzdF0uBLMI_"
              />

              {/* Floating Quality Guarantee Badge */}
              <div className="absolute bottom-4 left-4 right-4 bg-surface-container-lowest/95 backdrop-blur-md rounded-2xl p-3.5 border border-outline-variant/50 shadow-lg flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-secondary-container flex items-center justify-center text-on-secondary-container shrink-0">
                  <span className="material-symbols-outlined text-[24px]">workspace_premium</span>
                </div>
                <div>
                  <div className="text-label-md font-label-md font-bold text-primary">মায়ের যত্নের স্পর্শে পরীক্ষিত</div>
                  <div className="text-body-sm font-body-sm text-on-surface-variant">সরাসরি কৃষক থেকে স্বাস্থ্যসম্মত বাছাই</div>
                </div>
              </div>

              {/* Top floating discount tag */}
              <div className="absolute top-4 right-4 bg-tertiary-container text-on-tertiary font-bold text-label-md px-3 py-1.5 rounded-full shadow">
                আজকের অফার: ২০% পর্যন্ত ছাড়
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
