import React from "react";

interface CategoryNavProps {
  activeCategory?: string;
  onSelectCategory?: (category: string) => void;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  activeCategory = "হোম",
  onSelectCategory,
}) => {
  return (
    <nav className="bg-surface-container-low/70 border-t border-outline-variant/60 hidden md:block">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <ul className="flex items-center space-x-6 overflow-x-auto py-2.5 whitespace-nowrap text-label-md font-label-md custom-scroll">
          {/* Active Nav Item (হোম) */}
          <li>
            <a
              className={`pb-1 flex items-center gap-1 transition-colors ${
                activeCategory === "হোম"
                  ? "text-primary font-bold border-b-2 border-primary"
                  : "text-on-surface-variant hover:text-primary"
              }`}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onSelectCategory?.("হোম");
              }}
            >
              <span className="material-symbols-outlined text-[16px]">home</span>
              <span>হোম</span>
            </a>
          </li>
          <li>
            <a
              className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1"
              href="#best-selling"
              onClick={() => onSelectCategory?.("সব ফল")}
            >
              <span className="material-symbols-outlined text-[16px]">grid_view</span>
              <span>সব ফল</span>
            </a>
          </li>
          <li>
            <a
              className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1"
              href="#mangoes"
              onClick={() => onSelectCategory?.("আম ও মৌসুমি")}
            >
              <span className="inline-block w-2 h-2 rounded-full bg-secondary"></span>
              <span>আম ও মৌসুমি</span>
            </a>
          </li>
          <li>
            <a
              className="text-on-surface-variant hover:text-primary transition-colors"
              href="#categories"
              onClick={() => onSelectCategory?.("আপেল ও নাশপাতি")}
            >
              আপেল ও নাশপাতি
            </a>
          </li>
          <li>
            <a
              className="text-on-surface-variant hover:text-primary transition-colors"
              href="#categories"
              onClick={() => onSelectCategory?.("কমলা ও মাল্টা")}
            >
              কমলা ও মাল্টা
            </a>
          </li>
          <li>
            <a
              className="text-on-surface-variant hover:text-primary transition-colors"
              href="#categories"
              onClick={() => onSelectCategory?.("ডালিম ও আঙুর")}
            >
              ডালিম ও আঙুর
            </a>
          </li>
          <li>
            <a
              className="text-on-surface-variant hover:text-primary transition-colors"
              href="#categories"
              onClick={() => onSelectCategory?.("পেয়ারা ও ড্রাগন")}
            >
              পেয়ারা ও ড্রাগন
            </a>
          </li>
          <li>
            <a
              className="text-on-surface-variant hover:text-primary transition-colors"
              href="#categories"
              onClick={() => onSelectCategory?.("ড্রাইড ফ্রুটস ও খেজুর")}
            >
              ড্রাইড ফ্রুটস ও খেজুর
            </a>
          </li>
          <li>
            <a
              className="text-tertiary-container font-bold flex items-center gap-1 hover:underline"
              href="#offers"
            >
              <span className="material-symbols-outlined text-[16px]">local_fire_department</span>
              <span>বিশেষ অফার</span>
            </a>
          </li>
          <li>
            <a
              className="text-on-surface-variant hover:text-primary transition-colors"
              href="#about"
            >
              আমাদের কথা
            </a>
          </li>
          <li>
            <a
              className="text-on-surface-variant hover:text-primary transition-colors"
              href="#contact"
            >
              যোগাযোগ
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
