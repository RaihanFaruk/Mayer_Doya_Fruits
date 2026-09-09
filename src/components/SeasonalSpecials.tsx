import React from "react";

export const SeasonalSpecials: React.FC = () => {
  return (
    <section className="py-12 md:py-16" id="mangoes">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <div className="bg-gradient-to-r from-primary-container to-primary rounded-3xl text-surface-container-lowest p-6 md:p-10 shadow-xl relative overflow-hidden">
          {/* Decorative leaf background pattern */}
          <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
            <span className="material-symbols-outlined text-[260px]">energy_savings_leaf</span>
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-1.5 bg-tertiary-container text-on-tertiary px-3 py-1 rounded-full text-label-sm font-label-sm font-bold mb-3">
                <span className="material-symbols-outlined text-[14px]">local_fire_department</span>
                <span>সীমিত সময়ের মৌসুমি অফার</span>
              </span>

              <h2 className="text-headline-lg-mobile md:text-headline-lg font-headline-lg font-bold text-surface-container-lowest mb-3">
                এই মৌসুমের সেরা তাজা আম্রপালি ও লিচু উৎসব
              </h2>

              <p className="text-body-lg font-body-lg text-primary-fixed mb-6 leading-relaxed">
                গাছে পাকা মিষ্টি আম্রপালি, দিনাজপুরের রসালো লিচু, মধুপুরী আনারস এবং মিষ্টি কাঁঠাল সরাসরি চাষীর বাগান থেকে সুরক্ষিত ট্রাকে ঢাকায় আমাদের হাব-এ পৌঁছাচ্ছে প্রতিদিন।
              </p>

              {/* Seasonal Fruit Mini Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                <div className="bg-surface-container-lowest/10 backdrop-blur rounded-xl p-2.5 border border-surface-container-lowest/15 text-center">
                  <span className="text-label-md font-bold block text-primary-fixed">আম্রপালি আম</span>
                  <span className="text-[11px] text-surface-container-lowest/80">গাছে পাকা মিষ্টি</span>
                </div>
                <div className="bg-surface-container-lowest/10 backdrop-blur rounded-xl p-2.5 border border-surface-container-lowest/15 text-center">
                  <span className="text-label-md font-bold block text-primary-fixed">বেদানা লিচু</span>
                  <span className="text-[11px] text-surface-container-lowest/80">রসালো সুবাস</span>
                </div>
                <div className="bg-surface-container-lowest/10 backdrop-blur rounded-xl p-2.5 border border-surface-container-lowest/15 text-center">
                  <span className="text-label-md font-bold block text-primary-fixed">মধুপুরী আনারস</span>
                  <span className="text-[11px] text-surface-container-lowest/80">মিষ্টি রসে ভরা</span>
                </div>
                <div className="bg-surface-container-lowest/10 backdrop-blur rounded-xl p-2.5 border border-surface-container-lowest/15 text-center">
                  <span className="text-label-md font-bold block text-primary-fixed">কাঁচা-মিঠা আম</span>
                  <span className="text-[11px] text-surface-container-lowest/80">টক-মিষ্টি স্বাদ</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  className="bg-surface-container-lowest text-primary hover:bg-primary-fixed font-label-lg text-label-lg px-6 py-3 rounded-xl transition-colors font-bold shadow"
                  href="#best-selling"
                >
                  মৌসুমি ফল সম্ভার দেখুন
                </a>
                <a
                  className="bg-transparent border border-surface-container-lowest/40 hover:bg-surface-container-lowest/10 text-surface-container-lowest font-label-lg text-label-lg px-5 py-3 rounded-xl transition-colors flex items-center gap-2"
                  href="tel:+8801712345678"
                >
                  <span className="material-symbols-outlined text-[18px]">call</span>
                  <span>সরাসরি ফোনে অর্ডার</span>
                </a>
              </div>
            </div>

            {/* Right Featured Image */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden shadow-2xl border-2 border-surface-container-lowest/20 aspect-video lg:aspect-square">
                <img
                  className="w-full h-full object-cover"
                  alt="এই মৌসুমের সেরা তাজা আম্রপালি ও লিচু উৎসব"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxe377vrdsbqFn3ssfMEsPF96aXOPkblZK0UahhH7hLN-oKfort02M0jD6jFgZS9a9m9G6YAb61xXz2H8XeIJ2Qv-xVHTrd8J7Oniu0apIEqhKXXNjTFmGjfsKgGLTVKSvsAuQzyt1A32l3ExYOvvbPfHgVhCcnK-FlQBwCK-ejs9WH5hVi77jTc-a8BoARbVJJeREry_ykwwC3di-xwdcCdujQjQuKfs0xs-G4SI7CMsQJxLl7aSm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
