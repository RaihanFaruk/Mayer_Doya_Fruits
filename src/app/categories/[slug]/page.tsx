import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CATEGORIES_DATA } from "@/lib/categories";
import { INITIAL_PRODUCTS } from "@/lib/initialData";
import { SITE_URL } from "@/lib/siteConfig";
import { ProductCard } from "@/components/ProductCard";
import { Header } from "@/components/Header";
import { TopUtilityBar } from "@/components/TopUtilityBar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { CheckoutModal } from "@/components/CheckoutModal";
import { OrderSuccessModal } from "@/components/OrderSuccessModal";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return CATEGORIES_DATA.map((cat) => ({
    slug: cat.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = CATEGORIES_DATA.find((c) => c.id === params.slug);

  if (!category) {
    return {
      title: "ক্যাটাগরি পাওয়া যায়নি | মায়ের দোয়া ফল",
      description: "অনলাইনে তাজা ও ফরমালিনমুক্ত ফল অর্ডার করুন মায়ের দোয়া ফল থেকে।",
    };
  }

  const title = `${category.name} | অনলাইন ফল অর্ডার - মায়ের দোয়া ফল`;
  const description = `${category.description} অনলাইনে অর্ডার করুন। ১০০% খাঁটি, মিষ্টি ও ফরমালিনমুক্ত ফল বাগান থেকে দ্রুত ক্যাশ অন ডেলিভারি।`;
  const pageUrl = `${SITE_URL}/categories/${category.id}`;

  return {
    title,
    description,
    keywords: [
      category.name,
      ...category.keywords,
      "অনলাইন ফল অর্ডার",
      "মায়ের দোয়া ফল",
      "তাজা ফল ঢাকা",
      "ক্যাশ অন ডেলিভারি ফল",
    ],
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: "মায়ের দোয়া ফল",
      type: "website",
      locale: "bn_BD",
      images: [
        {
          url: category.image,
          width: 800,
          height: 600,
          alt: `তাজা ${category.name} - মায়ের দোয়া ফল`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [category.image],
    },
  };
}

export default function CategoryPage({ params }: Props) {
  const category = CATEGORIES_DATA.find((c) => c.id === params.slug);

  if (!category) {
    notFound();
  }

  // Filter products matching this category
  const matchingProducts = INITIAL_PRODUCTS.filter((prod) =>
    category.filterMatch(prod.category, prod.name)
  );
  // Fallback to all products if none matched specifically so customer always sees options
  const displayProducts =
    matchingProducts.length > 0 ? matchingProducts : INITIAL_PRODUCTS.slice(0, 4);

  // Schema.org CollectionPage + ItemList JSON-LD
  const categoryJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `${category.name} - মায়ের দোয়া ফল`,
    "description": category.description,
    "url": `${SITE_URL}/categories/${category.id}`,
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": displayProducts.map((prod, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "url": `${SITE_URL}/products/${prod.id}`,
        "name": prod.name,
        "image": prod.image_url,
      })),
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "হোম",
        "item": SITE_URL,
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "ক্যাটাগরি",
        "item": `${SITE_URL}/#categories`,
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": category.name,
        "item": `${SITE_URL}/categories/${category.id}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(categoryJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <TopUtilityBar />
      <Header />

      <main className="flex-grow bg-surface py-6 sm:py-10">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          {/* Breadcrumbs */}
          <nav aria-label="ব্রেডক্রাম্ব" className="mb-6 flex items-center gap-2 text-label-md text-on-surface-variant flex-wrap">
            <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">home</span>
              হোম
            </Link>
            <span className="text-outline-variant">/</span>
            <Link href="/#categories" className="hover:text-primary transition-colors">
              ক্যাটাগরি
            </Link>
            <span className="text-outline-variant">/</span>
            <span className="text-primary font-bold">{category.name}</span>
          </nav>

          {/* Hero Category Banner */}
          <div className="bg-surface-container-lowest rounded-3xl p-6 sm:p-10 border border-outline-variant shadow-sm mb-12 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <div className="inline-block bg-primary-container text-primary text-label-sm font-bold px-3 py-1 rounded-full mb-3">
                {category.subtitle}
              </div>
              {/* Single H1 for this category page */}
              <h1 className="text-[26px] sm:text-headline-lg font-bold text-primary tracking-tight leading-tight mb-4">
                {category.name}
              </h1>
              <p className="text-body-lg text-on-surface-variant leading-relaxed max-w-2xl mb-6">
                {category.description}
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 text-label-sm font-semibold text-primary bg-surface-container px-3 py-1.5 rounded-xl">
                  <span className="material-symbols-outlined text-secondary text-[18px]">verified</span>
                  ১০০% ফরমালিনমুক্ত
                </span>
                <span className="inline-flex items-center gap-1.5 text-label-sm font-semibold text-primary bg-surface-container px-3 py-1.5 rounded-xl">
                  <span className="material-symbols-outlined text-secondary text-[18px]">local_shipping</span>
                  সরাসরি বাগান থেকে ডেলিভারি
                </span>
              </div>
            </div>

            <div className="w-full md:w-72 aspect-square rounded-2xl overflow-hidden bg-surface-container shrink-0 shadow-md">
              <img
                src={category.image}
                alt={`তাজা ${category.name} - মায়ের দোয়া ফল`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Products Grid */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-headline-md font-bold text-primary">
                  {category.name} - এর ফলসমূহ
                </h2>
                <p className="text-label-md text-on-surface-variant mt-1">
                  মোট {displayProducts.length}টি তাজা পণ্য প্রদর্শিত হচ্ছে
                </p>
              </div>
              <Link href="/#best-selling" className="text-secondary font-bold text-label-lg hover:underline flex items-center gap-1">
                সকল ফল দেখুন
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {displayProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>

          {/* Other Categories Links */}
          <section className="bg-surface-container-low rounded-3xl p-6 sm:p-8 border border-outline-variant">
            <h2 className="text-headline-sm font-bold text-primary mb-4">
              অন্যান্য ফলের ক্যাটাগরি ঘুরে দেখুন
            </h2>
            <div className="flex flex-wrap gap-2.5">
              {CATEGORIES_DATA.filter((c) => c.id !== category.id).map((other) => (
                <Link
                  key={other.id}
                  href={`/categories/${other.id}`}
                  className="bg-surface-container-lowest hover:bg-primary-container text-primary font-bold text-label-md px-4 py-2 rounded-xl border border-outline-variant/60 transition-colors"
                >
                  {other.name}
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>

      <CartDrawer />
      <CheckoutModal />
      <OrderSuccessModal />
      <FloatingWhatsApp />
      <Footer />
    </>
  );
}
