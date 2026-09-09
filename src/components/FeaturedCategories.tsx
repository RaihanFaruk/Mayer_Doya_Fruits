import React from "react";

interface CategoryItem {
  id: string;
  name: string;
  subtitle: string;
  badge?: string;
  badgeType?: "secondary" | "tertiary";
  image: string;
  link: string;
}

const CATEGORIES: CategoryItem[] = [
  {
    id: "mangoes",
    name: "রাজশাহী ও চাঁপাইয়ের আম",
    subtitle: "হিমসাগর, ল্যাংড়া, আম্রপালি",
    badge: "মৌসুমি সেরা",
    badgeType: "secondary",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCdfmi8tCxb0TIAim00YrmFtxIjVmiVAqMQxqXlhaUWMzB3mnxxH-bWmzi4smK_V-1BltzDrW-9h2Vo15z6yGzLrEWvVNZp-3Nn4J-1u3GJfC4mTsbzdYIshhUhRJjPqAAZGp6qjkhxkDwFq4fZ63xRjOCUxU4fcL92G9c2ZnQf_vquhLAC4aTFXnHUQUK_uifP-AR_RQAv-rfBoxz_Ij18HlV_2tWQZllNljzHi7dWK-dCYCnpmk8i",
    link: "#best-selling",
  },
  {
    id: "litchi",
    name: "দিনাজপুরের রসালো লিচু",
    subtitle: "বেদানা, চায়না-৩, বোম্বাই",
    badge: "সীমিত সময়",
    badgeType: "tertiary",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCGiykJi9vlTAL3047wFOvCyUtQUS8kopPLXPfV1StxdUNReX0TtOwyJH84SLQntOPW42HY5uU5HLRBL0vRkOewxi0zSkPX-VRMpLq0MfYjwX1nElMZnpA8CXqPdOD651NvjZW4ofNiNIEwVuRmGD0js2LjOgfvop79IG7tsZRGzh_HtvpsN4jJhoB2je5n8Yd7IIZ4HJIJnWjWyDQV0bsqrQ7DXkGrxQPhTzh50JTeWtMIWc2n4SK8",
    link: "#best-selling",
  },
  {
    id: "citrus",
    name: "রসালো মিষ্টি মাল্টা ও কমলা",
    subtitle: "দেশি বাড়ি-১ মাল্টা, মিশরীয় কমলা",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCnybVpjFFP7Q0p61ppp9fc7psTUuK1mJ-i0tXUuT9OR8KY5Z3Nk0swpAAMPy5-j1jDKw38MoX4qzqH8ZFeG1YyUp_Zqs-IIiZIU8Fh_frdOhUuHkoNFhBjQPI7Vdl-NzAZYMUohq0GyF_meOHqD0Tv8kbpIt2sQeSb9A3NIuvsOYmFIgkzfxgrIzqa7WA4iuNwOvT0cGAwcsajtkwBioiQacf-hnPYmIHUjkV4-tjcP0mzHrR117ei",
    link: "#best-selling",
  },
  {
    id: "apples",
    name: "আমদানি করা ক্রিস্পি আপেল",
    subtitle: "রয়াল গালা, ফুজি, গ্রিন আপেল",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAsIMmNjygK5MUeVlzxHe6PbHkjc3N-hc_Dwa0nQQZed3ZfdVkiOm-ld9IzgrU27K4zVNddjmfxw1xpa1yXm5eZ8fW3qmYXiBs8EDNG0gISjB_-N6Bd7Lh4NL2CrsP6ubDY5TOXtwxEzGkep0mLFBcnk017pglXFs8ssO4Fh2_MOeb7-NGh2LhJGC5GbuAbWNSU8m7Mq6vqmT0RmPgvIiZlWrOP73EgKrMFrqsC6emSa9jw8Ffw_06u",
    link: "#best-selling",
  },
  {
    id: "banana-guava",
    name: "পাকা কলা ও পেয়ারা",
    subtitle: "নরসিংদীর সাগর কলা, থাই পেয়ারা",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBm2w2YgwY36hs9YKXLN7O5Yi0gLzLNNB_5p04lFOjQelOvUZGJQlAuucRdjRCTaAb9oKRG_iYq5DwCCA2O8C--gqHyA6O5OG8aSF1j7AT6wQF-zxagbz6ER8RI6GnB7PsXFN3_wofth71sc6AXYGGaVE-9a_kvAXWyeIhUMIgfXrbKqVeTek9zDifIyN2Zt2EGhosVUB0UZ5J1OMY6WTqulRjgxNF37WJ4lgrzLPAxhsG-HNWJ6b2t",
    link: "#best-selling",
  },
  {
    id: "pomegranate-grape",
    name: "মিষ্টি বেদানা ও লাল আঙুর",
    subtitle: "ইন্ডিয়ান বেদানা, বীজহীন আঙুর",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAHJwhjAlONY4qMMfVHCe_Q3GL5anz_KnNPVmW6PNSZHAaV-ZwrE6Wm-8XBKohyMf8Y1TssvzaT95wnBWCoUMRdyl2qrbvAq9Vi7OlQzioTc9cI00K5ACwFm-TxBjCibmayLkUXrlk9z5Ts5tMI75bEDrtH6MVuKIXFivwWfaBhctxYnzmL3p-b8ioIHdDRtOHAIQjJqzi-BTdhRDIQvlM3XwwkXVjR16f37MIDdABdpID17G_C1QXF",
    link: "#best-selling",
  },
  {
    id: "dragon",
    name: "থাই ড্রাগন ফল",
    subtitle: "লাল ও সাদা ড্রাগন",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBuXcst7z8TOXis3whdj0sD6YOtC4F4KPSFgaHj1rPSs_lXDcnJrPpeCCqOmDJmEdPXKasYevofthR_d7WBbgskDgm9AEUKZzFwMqRzxAA4vjUmZUd0onXVXESH90oLDwwL1XwuBYH0PYYcZv1Q9ANznVeRizXfOK0Qsf8NFkudcUxfHu8Jpxngqs4wFzXwQDqJQmLny8t1BNPLXk-xfRwVKbH_RpMzWJqRJnoUUAzwqP1Qjn2ma1yU",
    link: "#best-selling",
  },
  {
    id: "dates-nuts",
    name: "প্রিমিয়াম খেজুর ও নাটস",
    subtitle: "মরিয়ম, আজওয়া ও কাজুবাদাম",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC-QMCjpCj-zxkzTmrXKKFBT8QbWvD9GOuE8AXqMxWI_ri9M-Xeoc_66zFKnsUVkUizqbbZRbcpVsdujXnuArAfVXMr9L39U0C3yc6pK01xyaQkDq5txbvKhcsf6bZHZAuHpOOr0t8ow99O5u415WDyxa49kteniiYZb8J6rSGGGbINjQIAhKpxgot63y6rBKGtEJeCKX6IgYRnLy8dgd_WAREBwz1M_S_FMRQTEjUBmvdqnrdwT1cA",
    link: "#best-selling",
  },
];

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
              <span>পছন্দের বিভাগ</span>
            </div>
            <h2 className="text-headline-lg-mobile md:text-headline-lg font-headline-lg text-primary">
              ফলের ক্যাটাগরি সমূহ
            </h2>
            <p className="text-body-md font-body-md text-on-surface-variant mt-1">
              আপনার পরিবারের সুস্থতার জন্য প্রতিদিনের পুষ্টিকর ফল বাছাই করুন
            </p>
          </div>
          <a
            className="inline-flex items-center gap-1.5 text-primary hover:text-secondary font-label-lg text-label-lg transition-colors group"
            href="#best-selling"
            onClick={() => onSelectCategory?.("সকল ফল")}
          >
            <span>সব ক্যাটাগরি দেখুন</span>
            <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </a>
        </div>

        {/* Category Grid (8 Visual Cards) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 md:gap-6">
          {CATEGORIES.map((cat) => (
            <a
              key={cat.id}
              className="group bg-surface-container-lowest rounded-2xl p-3.5 md:p-4 border border-outline-variant hover:border-primary/40 shadow-sm hover:shadow-md transition-all flex flex-col"
              href={cat.link}
              onClick={() => onSelectCategory?.(cat.name)}
            >
              <div className="aspect-square rounded-xl overflow-hidden bg-surface-container mb-3 relative">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  alt={cat.name}
                  src={cat.image}
                />
                {cat.badge && (
                  <span
                    className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      cat.badgeType === "tertiary"
                        ? "bg-tertiary-container text-on-tertiary"
                        : "bg-secondary text-surface-container-lowest"
                    }`}
                  >
                    {cat.badge}
                  </span>
                )}
              </div>
              <h3 className="text-headline-sm font-headline-sm text-primary group-hover:text-secondary transition-colors mb-0.5">
                {cat.name}
              </h3>
              <p className="text-body-sm font-body-sm text-on-surface-variant">{cat.subtitle}</p>
              <div className="mt-3 flex items-center justify-between text-label-sm font-label-sm text-secondary font-bold">
                <span>দেখুন</span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                  east
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
