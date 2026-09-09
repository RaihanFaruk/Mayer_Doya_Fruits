import React from "react";
import Link from "next/link";
import { CATEGORIES_DATA } from "@/lib/categories";

interface FeaturedCategoriesProps {
  onSelectCategory?: (category: string) => void;
}

export const FeaturedCategories: React.FC<FeaturedCategoriesProps> = ({
  onSelectCategory,
}) => {
  return (
    <section className="py-12 md:py-16" id="categories">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        {/* Section Title & Subtitle */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-secondary font-bold text-label-md mb-1">
              <span className="material-symbols-outlined text-[18px]">category</span>
              <span>কালেকশন ও সমাহার</span>
            </div>
            <h2 className="text-headline-lg-mobile md:text-headline-lg font-headline-lg text-primary">
              জনপ্রিয় ফলের ক্যাটাগরি
            </h2>
            <p className="text-body-md font-body-md text-on-surface-variant mt-1">
              ঋতুভিত্তিক বাছাইকৃত তাজা ফল ও প্রিমিয়াম ড্রাই ফ্রুটস কালেকশন
            </p>
          </div>

          <a
            className="text-secondary font-bold hover:underline flex items-center gap-1 text-label-md font-label-md"
            href="#best-selling"
          >
            <span>সব ফল এক্সপ্লোর করুন</span>
            <span className="material-symbols-outlined text-[16px]">
              arrow_forward
            </span>
          </a>
        </div>

        {/* Category Grid (8 Visual Cards linking to Category Pages) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6">
          {CATEGORIES_DATA.map((cat) => (
            <Link
              key={cat.id}
              className="group bg-surface-container-lowest rounded-2xl p-2.5 sm:p-4 border border-outline-variant hover:border-primary/40 shadow-sm hover:shadow-md transition-all flex flex-col"
              href={`/categories/${cat.id}`}
              onClick={() => onSelectCategory?.(cat.name)}
              title={`তাজা ${cat.name} ক্যাটাগরি দেখুন`}
            >
              <div className="aspect-square rounded-xl overflow-hidden bg-surface-container mb-2 sm:mb-3 relative">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  alt={`তাজা ${cat.name} - মায়ের দোয়া ফল`}
                  src={cat.image}
                  loading="lazy"
                />
                {cat.badge && (
                  <span
                    className={`absolute top-1.5 left-1.5 sm:top-2 sm:left-2 text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full ${
                      cat.badgeType === "tertiary"
                        ? "bg-tertiary-container text-on-tertiary"
                        : "bg-secondary text-surface-container-lowest"
                    }`}
                  >
                    {cat.badge}
                  </span>
                )}
              </div>
              <h3 className="text-[13px] sm:text-headline-sm font-headline-sm font-bold text-primary group-hover:text-secondary transition-colors mb-0.5 line-clamp-1">
                {cat.name}
              </h3>
              <p className="text-[11px] sm:text-body-sm font-body-sm text-on-surface-variant line-clamp-1">{cat.subtitle}</p>
              <div className="mt-2 sm:mt-3 flex items-center justify-between text-[11px] sm:text-label-sm font-label-sm text-secondary font-bold">
                <span>দেখুন</span>
                <span className="material-symbols-outlined text-[15px] sm:text-[16px] group-hover:translate-x-1 transition-transform">
                  east
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
