export interface CategoryData {
  id: string;
  name: string;
  subtitle: string;
  badge?: string;
  badgeType?: "secondary" | "tertiary";
  image: string;
  description: string;
  keywords: string[];
  filterMatch: (catName: string | undefined, prodName: string) => boolean;
}

export const CATEGORIES_DATA: CategoryData[] = [
  {
    id: "mangoes",
    name: "রাজশাহী ও চাঁপাইয়ের আম",
    subtitle: "হিমসাগর, ল্যাংড়া, আম্রপালি",
    badge: "মৌসুমি সেরা",
    badgeType: "secondary",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCdfmi8tCxb0TIAim00YrmFtxIjVmiVAqMQxqXlhaUWMzB3mnxxH-bWmzi4smK_V-1BltzDrW-9h2Vo15z6yGzLrEWvVNZp-3Nn4J-1u3GJfC4mTsbzdYIshhUhRJjPqAAZGp6qjkhxkDwFq4fZ63xRjOCUxU4fcL92G9c2ZnQf_vquhLAC4aTFXnHUQUK_uifP-AR_RQAv-rfBoxz_Ij18HlV_2tWQZllNljzHi7dWK-dCYCnpmk8i",
    description:
      "সরাসরি রাজশাহী ও চাঁপাইনবাবগঞ্জের বাগান থেকে গাছপাকা, কার্বাইড ও ফরমালিনমুক্ত তাজা হিমসাগর, ল্যাংড়া, আম্রপালি আম অর্ডার করুন অনলাইনে।",
    keywords: [
      "রাজশাহীর আম",
      "চাঁপাইনবাবগঞ্জের আম",
      "হিমসাগর আম",
      "ল্যাংড়া আম",
      "আম্রপালি আম",
      "অনলাইন আম অর্ডার",
      "তাজা ফল রাজশাহী",
      "আমের দাম ২০২৬",
    ],
    filterMatch: (cat, prod) =>
      Boolean(cat?.includes("আম")) || prod.includes("আম") || prod.includes("হিমসাগর"),
  },
  {
    id: "litchi",
    name: "দিনাজপুরের রসালো লিচু",
    subtitle: "বেদানা, চায়না-৩, বোম্বাই",
    badge: "সীমিত সময়",
    badgeType: "tertiary",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCGiykJi9vlTAL3047wFOvCyUtQUS8kopPLXPfV1StxdUNReX0TtOwyJH84SLQntOPW42HY5uU5HLRBL0vRkOewxi0zSkPX-VRMpLq0MfYjwX1nElMZnpA8CXqPdOD651NvjZW4ofNiNIEwVuRmGD0js2LjOgfvop79IG7tsZRGzh_HtvpsN4jJhoB2je5n8Yd7IIZ4HJIJnWjWyDQV0bsqrQ7DXkGrxQPhTzh50JTeWtMIWc2n4SK8",
    description:
      "দিনাজপুরের বিখ্যাত রসালো বেদানা, চায়না-৩ ও বোম্বাই লিচু সরাসরি বাগান থেকে বাছাইকৃত। ছোট বিচি, মিষ্টি রসে টইটম্বুর ও ১০০% খাঁটি।",
    keywords: [
      "দিনাজপুরের লিচু",
      "বেদানা লিচু",
      "চায়না ৩ লিচু",
      "বোম্বাই লিচু",
      "অনলাইনে লিচু কিনুন",
      "তাজা লিচু ঢাকা",
      "লিচু অর্ডার বাংলাদেশ",
    ],
    filterMatch: (cat, prod) => prod.includes("লিচু") || Boolean(cat?.includes("লিচু")),
  },
  {
    id: "citrus",
    name: "রসালো মিষ্টি মাল্টা ও কমলা",
    subtitle: "দেশি বাড়ি-১ মাল্টা, মিশরীয় কমলা",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCnybVpjFFP7Q0p61ppp9fc7psTUuK1mJ-i0tXUuT9OR8KY5Z3Nk0swpAAMPy5-j1jDKw38MoX4qzqH8ZFeG1YyUp_Zqs-IIiZIU8Fh_frdOhUuHkoNFhBjQPI7Vdl-NzAZYMUohq0GyF_meOHqD0Tv8kbpIt2sQeSb9A3NIuvsOYmFIgkzfxgrIzqa7WA4iuNwOvT0cGAwcsajtkwBioiQacf-hnPYmIHUjkV4-tjcP0mzHrR117ei",
    description:
      "ভিটামিন-সি সমৃদ্ধ মিষ্টি রসালো মিশরীয় ভ্যালেন্সিয়া মাল্টা ও দেশি বাড়ি-১ রসালো কমলা কিনুন সবচেয়ে সুলভ মূল্যে। ফ্রি ডেলিভারি অফার।",
    keywords: [
      "মিশরীয় মাল্টা",
      "ভ্যালেন্সিয়া মাল্টা",
      "রসালো কমলা",
      "কমলালেবু দাম",
      "সাইট্রাস ফল",
      "ভিটামিন সি ফল",
      "অনলাইন ফল অর্ডার ঢাকা",
    ],
    filterMatch: (cat, prod) =>
      prod.includes("মাল্টা") || prod.includes("কমলা") || Boolean(cat?.includes("মাল্টা")),
  },
  {
    id: "apples",
    name: "আমদানি করা ক্রিস্পি আপেল",
    subtitle: "রয়াল গালা, ফুজি, গ্রিন আপেল",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAsIMmNjygK5MUeVlzxHe6PbHkjc3N-hc_Dwa0nQQZed3ZfdVkiOm-ld9IzgrU27K4zVNddjmfxw1xpa1yXm5eZ8fW3qmYXiBs8EDNG0gISjB_-N6Bd7Lh4NL2CrsP6ubDY5TOXtwxEzGkep0mLFBcnk017pglXFs8ssO4Fh2_MOeb7-NGh2LhJGC5GbuAbWNSU8m7Mq6vqmT0RmPgvIiZlWrOP73EgKrMFrqsC6emSa9jw8Ffw_06u",
    description:
      "নিউজিল্যান্ড ও ওয়াশিংটন থেকে আমদানিকৃত ১০০% মোম ও কেমিক্যাল মুক্ত মিষ্টি ও ক্রিস্পি রয়াল গালা ও ফুজি আপেল। দ্রুত হোম ডেলিভারি।",
    keywords: [
      "রয়াল গালা আপেল",
      "ফুজি আপেল",
      "আমদানি আপেল ঢাকা",
      "আপেলের কেজি দাম",
      "তাজা আপেল অর্ডার",
      "মিষ্টি লাল আপেল",
    ],
    filterMatch: (cat, prod) => prod.includes("আপেল") || Boolean(cat?.includes("আপেল")),
  },
  {
    id: "banana-guava",
    name: "পাকা কলা ও মিষ্টি পেয়ারা",
    subtitle: "নরসিংদীর সাগর কলা, স্বরূপকাঠির পেয়ারা",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBm2w2YgwY36hs9YKXLN7O5Yi0gLzLNNB_5p04lFOjQelOvUZGJQlAuucRdjRCTaAb9oKRG_iYq5DwCCA2O8C--gqHyA6O5OG8aSF1j7AT6wQF-zxagbz6ER8RI6GnB7PsXFN3_wofth71sc6AXYGGaVE-9a_kvAXWyeIhUMIgfXrbKqVeTek9zDifIyN2Zt2EGhosVUB0UZ5J1OMY6WTqulRjgxNF37WJ4lgrzLPAxhsG-HNWJ6b2t",
    description:
      "বরিশাল ও স্বরূপকাঠির মিষ্টি থাই পেয়ারা এবং নরসিংদীর পুষ্টিকর সাগর কলা। প্রাকৃতিকভাবে পাকা ও কেমিক্যালমুক্ত স্বাস্থ্যকর ফল।",
    keywords: [
      "থাই পেয়ারা",
      "স্বরূপকাঠির পেয়ারা",
      "সাগর কলা নরসিংদী",
      "পাকা কলা অর্ডার",
      "দেশি তাজা ফল",
      "অনলাইন ফ্রুট ডেলিভারি",
    ],
    filterMatch: (cat, prod) =>
      prod.includes("পেয়ারা") ||
      prod.includes("পেয়ারা") ||
      prod.includes("কলা"),
  },
  {
    id: "pomegranate-grape",
    name: "মিষ্টি বেদানা ও লাল আঙুর",
    subtitle: "ইন্ডিয়ান বেদানা, বীজহীন আঙুর",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAHJwhjAlONY4qMMfVHCe_Q3GL5anz_KnNPVmW6PNSZHAaV-ZwrE6Wm-8XBKohyMf8Y1TssvzaT95wnBWCoUMRdyl2qrbvAq9Vi7OlQzioTc9cI00K5ACwFm-TxBjCibmayLkUXrlk9z5Ts5tMI75bEDrtH6MVuKIXFivwWfaBhctxYnzmL3p-b8ioIHdDRtOHAIQjJqzi-BTdhRDIQvlM3XwwkXVjR16f37MIDdABdpID17G_C1QXF",
    description:
      "গাঢ় লাল মিষ্টি ইন্ডিয়ান ভগওয়া ডালিম/বেদানা ও রসালো বীজহীন আঙুর। রক্তস্বল্পতা দূর করতে ও পুষ্টিতে ভরপুর প্রিমিয়াম ফল।",
    keywords: [
      "ইন্ডিয়ান বেদানা",
      "ভগওয়া ডালিম",
      "বীজহীন আঙুর",
      "মিষ্টি লাল আঙুর",
      "ডালিম এর কেজি কত",
      "ফল অর্ডার ঢাকা",
    ],
    filterMatch: (cat, prod) =>
      prod.includes("ডালিম") ||
      prod.includes("বেদানা") ||
      prod.includes("আঙুর") ||
      Boolean(cat?.includes("বেদানা")),
  },
  {
    id: "dragon",
    name: "থাই ড্রাগন ফল",
    subtitle: "দেশি অর্গানিক লাল ও সাদা ড্রাগন",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBuXcst7z8TOXis3whdj0sD6YOtC4F4KPSFgaHj1rPSs_lXDcnJrPpeCCqOmDJmEdPXKasYevofthR_d7WBbgskDgm9AEUKZzFwMqRzxAA4vjUmZUd0onXVXESH90oLDwwL1XwuBYH0PYYcZv1Q9ANznVeRizXfOK0Qsf8NFkudcUxfHu8Jpxngqs4wFzXwQDqJQmLny8t1BNPLXk-xfRwVKbH_RpMzWJqRJnoUUAzwqP1Qjn2ma1yU",
    description:
      "নাটোর ও পাবনার বাগান থেকে তাজা সংগৃহীত লাল ও সাদা অর্গানিক ড্রাগন ফল। ডায়াবেটিস ও রোগ প্রতিরোধে দারুণ কার্যকরী।",
    keywords: [
      "ড্রাগন ফল",
      "লাল ড্রাগন ফল",
      "অর্গানিক ড্রাগন ফল",
      "ড্রাগন ফলের দাম",
      "ড্রাগন ফল চাষ নাটোর",
      "অনলাইন ফল শপ",
    ],
    filterMatch: (cat, prod) => prod.includes("ড্রাগন"),
  },
  {
    id: "dates-nuts",
    name: "প্রিমিয়াম খেজুর ও নাটস",
    subtitle: "মরিয়ম, আজওয়া ও কাজুবাদাম",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC-QMCjpCj-zxkzTmrXKKFBT8QbWvD9GOuE8AXqMxWI_ri9M-Xeoc_66zFKnsUVkUizqbbZRbcpVsdujXnuArAfVXMr9L39U0C3yc6pK01xyaQkDq5txbvKhcsf6bZHZAuHpOOr0t8ow99O5u415WDyxa49kteniiYZb8J6rSGGGbINjQIAhKpxgot63y6rBKGtEJeCKX6IgYRnLy8dgd_WAREBwz1M_S_FMRQTEjUBmvdqnrdwT1cA",
    description:
      "মদিনার খাঁটি মরিয়ম ও আজওয়া খেজুর, প্রিমিয়াম কাজুবাদাম ও ড্রাই ফ্রুটসের সমাহার। শক্তি ও সুস্বাস্থ্যের নির্ভরযোগ্য উৎস।",
    keywords: [
      "মরিয়ম খেজুর",
      "আজওয়া খেজুর",
      "কাজুবাদাম দাম",
      "ড্রাই ফ্রুটস বাংলাদেশ",
      "প্রিমিয়াম খেজুর ঢাকা",
    ],
    filterMatch: (cat, prod) =>
      prod.includes("খেজুর") || prod.includes("বাদাম") || prod.includes("নাটস"),
  },
];
