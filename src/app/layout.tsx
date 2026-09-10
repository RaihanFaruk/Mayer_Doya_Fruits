import type { Metadata, Viewport } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { SITE_URL } from "@/lib/siteConfig";
import { FacebookPixel } from "@/components/FacebookPixel";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "মায়ের দোয়া ফল | অনলাইন তাজা ও ফরমালিনমুক্ত ফল অর্ডার - ঢাকা ও সারা দেশে ডেলিভারি",
    template: "%s | মায়ের দোয়া ফল",
  },
  description:
    "অনলাইনে অর্ডার করুন ১০০% ফরমালিনমুক্ত মিষ্টি তাজা ফল। সরাসরি রাজশাহীর হিমসাগর আম, দিনাজপুরের বেদানা লিচু, মিষ্টি আপেল, মাল্টা ও প্রিমিয়াম ফল বাগান থেকে আপনার ঘরে। দ্রুত ক্যাশ অন ডেলিভারি সুবিধা।",
  keywords: [
    "অনলাইন ফল অর্ডার",
    "মায়ের দোয়া ফল",
    "তাজা ফল ঢাকা",
    "ফরমালিনমুক্ত ফল",
    "রাজশাহীর আম",
    "হিমসাগর আম",
    "দিনাজপুরের লিচু",
    "বেদানা লিচু",
    "মিষ্টি আপেল",
    "মাল্টা",
    "ক্যাশ অন ডেলিভারি ফল",
    "অর্গানিক ফল বাংলাদেশ",
    "অনলাইনে ফল কিনুন",
    "Mayer Doya Fruit",
    "Mayer Doya Fol",
  ],
  authors: [{ name: "মায়ের দোয়া ফল টিম", url: SITE_URL }],
  creator: "মায়ের দোয়া ফল",
  publisher: "মায়ের দোয়া ফল",
  alternates: {
    canonical: SITE_URL,
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/icons/icon.svg",
    apple: "/icons/icon-192x192.png",
  },
  openGraph: {
    title: "মায়ের দোয়া ফল | অনলাইন তাজা ও ফরমালিনমুক্ত ফল অর্ডার",
    description:
      "বাগান থেকে সরাসরি বাছাই করা ১০০% খাঁটি ও মিষ্টি ফল। রাজশাহীর আম, দিনাজপুরের লিচু ও সেরা বিদেশি ফল। ঢাকা ও সারা দেশে দ্রুত ক্যাশ অন ডেলিভারি।",
    url: SITE_URL,
    siteName: "মায়ের দোয়া ফল",
    locale: "bn_BD",
    type: "website",
    images: [
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuA63yH6J7Es4zdfCoeQG_cJuDBPVIX1ViiM9iXEddD21lxL2ccgyW97aNxho24gYR3XnNyucPjGdu4axuniuaawBxdEqLel6jHb_49-2tr9ZILCLi5qEhGN9hg1zCvT-SMj_k4XoTlfENDibgtfz7yJ8kBOLJeTfR8BKvpP1l89KxYLgWwGNakae73M4KBeQbH_LYVe_IGFgbXggCGrYGnOf5GRxdIFxAodH9fFG67BsUzdF0uBLMI_",
        width: 1200,
        height: 630,
        alt: "মায়ের দোয়া ফল - অনলাইন তাজা ও ফরমালিনমুক্ত ফলের সমাহার",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "মায়ের দোয়া ফল | অনলাইন তাজা ও ফরমালিনমুক্ত ফল অর্ডার",
    description:
      "বাগান থেকে সরাসরি ১০০% খাঁটি মিষ্টি ফল। ঢাকা ও সারা দেশে দ্রুত ক্যাশ অন ডেলিভারি।",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA63yH6J7Es4zdfCoeQG_cJuDBPVIX1ViiM9iXEddD21lxL2ccgyW97aNxho24gYR3XnNyucPjGdu4axuniuaawBxdEqLel6jHb_49-2tr9ZILCLi5qEhGN9hg1zCvT-SMj_k4XoTlfENDibgtfz7yJ8kBOLJeTfR8BKvpP1l89KxYLgWwGNakae73M4KBeQbH_LYVe_IGFgbXggCGrYGnOf5GRxdIFxAodH9fFG67BsUzdF0uBLMI_",
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "YOUR_GOOGLE_SITE_VERIFICATION_CODE", // গুগল সার্চ কনসোল থেকে প্রাপ্ত ভেরিফিকেশন কোডটি এখানে বসান
  },
};

export const viewport: Viewport = {
  themeColor: "#00351b",
  width: "device-width",
  initialScale: 1,
};

const jsonLdData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "GroceryStore",
      "@id": `${SITE_URL}/#store`,
      "name": "মায়ের দোয়া ফল",
      "alternateName": ["Mayer Doya Fol", "Mayer Doa Fruit"],
      "url": SITE_URL,
      "logo": `${SITE_URL}/icons/icon.svg`,
      "image":
        "https://lh3.googleusercontent.com/aida-public/AB6AXuA63yH6J7Es4zdfCoeQG_cJuDBPVIX1ViiM9iXEddD21lxL2ccgyW97aNxho24gYR3XnNyucPjGdu4axuniuaawBxdEqLel6jHb_49-2tr9ZILCLi5qEhGN9hg1zCvT-SMj_k4XoTlfENDibgtfz7yJ8kBOLJeTfR8BKvpP1l89KxYLgWwGNakae73M4KBeQbH_LYVe_IGFgbXggCGrYGnOf5GRxdIFxAodH9fFG67BsUzdF0uBLMI_",
      "description":
        "অনলাইনে তাজা ও ১০০% ফরমালিনমুক্ত ফল অর্ডার করুন। রাজশাহী, চাঁপাইনবাবগঞ্জ ও দিনাজপুরের মিষ্টি তাজা আম, বেদানা লিচু, আপেল, মাল্টা সরাসরি বাগান থেকে সারা দেশে দ্রুত ক্যাশ অন ডেলিভারি।",
      "telephone": "+8801712345678",
      "priceRange": "৳১০০ - ৳২০০০",
      "paymentAccepted": "Cash on Delivery, bKash, Nagad",
      "currenciesAccepted": "BDT",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "কাওরান বাজার আড়ত লেন",
        "addressLocality": "ঢাকা",
        "postalCode": "1215",
        "addressCountry": "BD",
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 23.7516,
        "longitude": 90.3943,
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        "opens": "08:00",
        "closes": "23:00",
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "bestRating": "5",
        "ratingCount": "350",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      "url": SITE_URL,
      "name": "মায়ের দোয়া ফল",
      "description": "অনলাইন তাজা ও ফরমালিনমুক্ত ফল শপ",
      "publisher": {
        "@id": `${SITE_URL}/#store`,
      },
      "inLanguage": "bn-BD",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" className="scroll-smooth">
      <head>
        {/* Google Fonts: Hind Siliguri, Noto Sans Bengali, Inter */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=Noto+Sans+Bengali:wght@400;500;600;700;800&family=Noto+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        {/* Material Symbols Outlined */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        {/* Global JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </head>
      <body className="bg-background text-on-surface antialiased relative min-h-screen flex flex-col selection:bg-secondary-container selection:text-on-secondary-container overflow-x-hidden">
        <FacebookPixel />
        <CartProvider>{children}</CartProvider>

        {/* Register PWA service worker */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(
                    function(reg) {
                      console.log('ServiceWorker registration successful:', reg.scope);
                    },
                    function(err) {
                      console.log('ServiceWorker registration failed:', err);
                    }
                  );
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
