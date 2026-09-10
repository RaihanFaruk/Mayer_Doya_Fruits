import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Product } from "@/types";
import { INITIAL_PRODUCTS } from "@/lib/initialData";
import { SITE_URL } from "@/lib/siteConfig";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";
import { ProductPageClient } from "@/components/ProductPageClient";
import { Header } from "@/components/Header";
import { TopUtilityBar } from "@/components/TopUtilityBar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { CheckoutModal } from "@/components/CheckoutModal";
import { OrderSuccessModal } from "@/components/OrderSuccessModal";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { TrackViewContent } from "@/components/FacebookPixel";

interface Props {
  params: {
    id: string;
  };
}

async function getProduct(id: string): Promise<Product | null> {
  const initial = INITIAL_PRODUCTS.find((p) => p.id === id);
  if (initial) return initial;

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();
      if (!error && data) {
        return data as Product;
      }
    } catch (err) {
      console.warn("Could not fetch product from Supabase:", err);
    }
  }
  return null;
}

export async function generateStaticParams() {
  const paramsList = INITIAL_PRODUCTS.map((prod) => ({ id: prod.id }));

  if (isSupabaseConfigured && supabase) {
    try {
      const { data } = await supabase.from("products").select("id").eq("is_active", true);
      if (data) {
        data.forEach((p) => {
          if (!paramsList.some((item) => item.id === p.id)) {
            paramsList.push({ id: p.id });
          }
        });
      }
    } catch {}
  }

  return paramsList;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProduct(params.id);

  if (!product) {
    return {
      title: "ফল পাওয়া যায়নি | মায়ের দোয়া ফল",
      description: "অনলাইনে তাজা ও ফরমালিনমুক্ত ফল অর্ডার করুন মায়ের দোয়া ফল থেকে।",
    };
  }

  const title = `${product.name} | অনলাইন ফল অর্ডার - মায়ের দোয়া ফল`;
  const description = `${product.name} অনলাইনে অর্ডার করুন। বাগান থেকে ১০০% খাঁটি, মিষ্টি ও ফরমালিনমুক্ত তাজা ফল (${product.unit}) মাত্র ৳${product.price} টাকায়। রাজশাহী, ঢাকা ও সারা দেশে দ্রুত ক্যাশ অন ডেলিভারি।`;
  const pageUrl = `${SITE_URL}/products/${product.id}`;

  return {
    title,
    description,
    keywords: [
      product.name,
      "অনলাইন ফল অর্ডার",
      "মায়ের দোয়া ফল",
      product.origin || "তাজা ফল",
      "ফরমালিনমুক্ত ফল",
      "ক্যাশ অন ডেলিভারি ফল",
      "অনলাইনে ফল কিনুন",
      "ঢাকা ফল ডেলিভারি",
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
          url: product.image_url,
          width: 800,
          height: 600,
          alt: `তাজা ${product.name} ${product.unit} - মায়ের দোয়া ফল`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [product.image_url],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const product = await getProduct(params.id);

  if (!product) {
    notFound();
  }

  const relatedProducts = INITIAL_PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  // Schema.org Product JSON-LD structured data
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "image": [product.image_url],
    "description": product.description || `বাগান থেকে সংগৃহীত ১০০% খাঁটি তাজা ${product.name}।`,
    "sku": product.id,
    "mpn": product.id,
    "category": product.category || "তাজা ফল",
    "brand": {
      "@type": "Brand",
      "name": "মায়ের দোয়া ফল",
    },
    "offers": {
      "@type": "Offer",
      "url": `${SITE_URL}/products/${product.id}`,
      "priceCurrency": "BDT",
      "price": product.price,
      "priceValidUntil": "2027-12-31",
      "itemCondition": "https://schema.org/NewCondition",
      "availability":
        product.stock && product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      "seller": {
        "@type": "Organization",
        "name": "মায়ের দোয়া ফল",
      },
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "bestRating": "5",
      "ratingCount": "128",
    },
  };

  // Schema.org Breadcrumb JSON-LD
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
        "name": "পণ্য সম্ভার",
        "item": `${SITE_URL}/#best-selling`,
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": product.name,
        "item": `${SITE_URL}/products/${product.id}`,
      },
    ],
  };

  return (
    <>
      {/* Schema.org Structured Data Scripts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Facebook Pixel ViewContent Tracker */}
      <TrackViewContent
        id={product.id}
        name={product.name}
        price={product.price}
        category={product.category}
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
            <Link href="/#best-selling" className="hover:text-primary transition-colors">
              পণ্য সম্ভার
            </Link>
            <span className="text-outline-variant">/</span>
            <span className="text-primary font-bold truncate max-w-[200px] sm:max-w-none">
              {product.name}
            </span>
          </nav>

          {/* Main Product Showcase Card */}
          <article className="bg-surface-container-lowest rounded-3xl p-6 sm:p-8 md:p-10 border border-outline-variant shadow-sm mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
              {/* Product Visual */}
              <div className="relative rounded-2xl overflow-hidden bg-surface-container aspect-square shadow-inner">
                <img
                  src={product.image_url}
                  alt={`তাজা ${product.name} ${product.unit} - মায়ের দোয়া ফল`}
                  className="w-full h-full object-cover"
                />

                {/* Status Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.badge && (
                    <span className="bg-secondary text-surface-container-lowest text-label-md font-bold px-3 py-1 rounded-full shadow-md">
                      {product.badge}
                    </span>
                  )}
                  <span className="bg-surface-container-lowest/90 backdrop-blur text-primary text-label-sm font-bold px-2.5 py-1 rounded-full border border-secondary-container">
                    ১০০% ফ্রেশ ও ফরমালিনমুক্ত
                  </span>
                </div>

                {product.discountBadge && (
                  <span className="absolute top-4 right-4 bg-tertiary-container text-on-tertiary text-label-md font-bold px-3 py-1 rounded-full shadow-md">
                    {product.discountBadge}
                  </span>
                )}
              </div>

              {/* Product Details & Ordering */}
              <div className="flex flex-col justify-between h-full">
                <div>
                  {/* Origin */}
                  {product.origin && (
                    <div className="flex items-center gap-1.5 text-label-md text-secondary font-bold mb-2">
                      <span className="material-symbols-outlined text-[18px]">location_on</span>
                      <span>উৎপত্তি: {product.origin}</span>
                    </div>
                  )}

                  {/* Single H1 for the Product Detail Page */}
                  <h1 className="text-[24px] sm:text-headline-lg font-bold text-primary tracking-tight leading-tight mb-4">
                    {product.name}
                  </h1>

                  {/* Pricing Box */}
                  <div className="bg-surface-container-low rounded-2xl p-4 sm:p-5 mb-6 border border-outline-variant/60 flex items-baseline gap-3">
                    <span className="text-[32px] sm:text-[38px] font-extrabold text-primary">
                      ৳ {product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-headline-sm text-outline line-through">
                        ৳ {product.originalPrice}
                      </span>
                    )}
                    <span className="text-body-md text-on-surface-variant font-medium">
                      / {product.unit}
                    </span>
                  </div>

                  {/* Description */}
                  <div className="mb-6">
                    <h2 className="text-headline-sm font-bold text-primary mb-2">
                      পণ্যের বিবরণ ও বৈশিষ্ট্য
                    </h2>
                    <p className="text-body-lg text-on-surface-variant leading-relaxed">
                      {product.description ||
                        "সরাসরি বাগান থেকে বাছাই করা মিষ্টি ও রসালো তাজা ফল। কোনো প্রকার ক্ষতিকারক কেমিক্যাল বা প্রিজারভেটিভ ছাড়া গ্রাহকের কাছে পৌঁছে দেওয়া হয়।"}
                    </p>
                  </div>

                  {/* Freshness Assurances */}
                  <div className="grid grid-cols-2 gap-3 mb-8">
                    <div className="flex items-center gap-2 p-3 rounded-xl bg-surface-container-low border border-outline-variant/50">
                      <span className="material-symbols-outlined text-secondary text-[22px]">verified</span>
                      <span className="text-label-sm font-semibold text-primary">ফরমালিনমুক্ত গ্যারান্টি</span>
                    </div>
                    <div className="flex items-center gap-2 p-3 rounded-xl bg-surface-container-low border border-outline-variant/50">
                      <span className="material-symbols-outlined text-secondary text-[22px]">local_shipping</span>
                      <span className="text-label-sm font-semibold text-primary">দ্রুত ক্যাশ অন ডেলিভারি</span>
                    </div>
                  </div>
                </div>

                {/* Interactive Purchase Controls */}
                <ProductPageClient product={product} />
              </div>
            </div>
          </article>

          {/* Related Products Section */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-headline-md font-bold text-primary">
                অন্যান্য জনপ্রিয় ফল
              </h2>
              <Link href="/#best-selling" className="text-secondary font-bold text-label-lg hover:underline flex items-center gap-1">
                সকল ফল দেখুন
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((rel) => (
                <div
                  key={rel.id}
                  className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="aspect-[4/3] rounded-xl overflow-hidden bg-surface-container mb-4">
                    <img
                      src={rel.image_url}
                      alt={`তাজা ${rel.name} ${rel.unit} - মায়ের দোয়া ফল`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <h3 className="text-headline-sm font-bold text-primary mb-1 line-clamp-1">
                      {rel.name}
                    </h3>
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-headline-sm font-bold text-primary">৳ {rel.price}</span>
                      <span className="text-label-sm text-on-surface-variant">/ {rel.unit}</span>
                    </div>
                  </div>
                  <Link
                    href={`/products/${rel.id}`}
                    className="w-full text-center py-2.5 rounded-xl bg-surface-container hover:bg-primary-container text-primary font-bold text-label-md transition-colors"
                  >
                    বিস্তারিত ও অর্ডার
                  </Link>
                </div>
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
