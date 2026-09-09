"use client";

import React, { useEffect, useState } from "react";
import { Product } from "@/types";
import { INITIAL_PRODUCTS } from "@/lib/initialData";
import { OfflineBanner } from "@/components/OfflineBanner";
import { TopUtilityBar } from "@/components/TopUtilityBar";
import { Header } from "@/components/Header";
import { CategoryNav } from "@/components/CategoryNav";
import { HeroSection } from "@/components/HeroSection";
import { TrustFeatures } from "@/components/TrustFeatures";
import { FeaturedCategories } from "@/components/FeaturedCategories";
import { BestSellingSection } from "@/components/BestSellingSection";
import { SeasonalSpecials } from "@/components/SeasonalSpecials";
import { MegaOfferBanner } from "@/components/MegaOfferBanner";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { HowItWorks } from "@/components/HowItWorks";
import { CustomerReviews } from "@/components/CustomerReviews";
import { PwaPromo } from "@/components/PwaPromo";
import { CartDrawer } from "@/components/CartDrawer";
import { CheckoutModal } from "@/components/CheckoutModal";
import { OrderSuccessModal } from "@/components/OrderSuccessModal";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Footer } from "@/components/Footer";

export default function StorefrontPage() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [activeFilter, setActiveFilter] = useState<string>("সকল ফল");

  useEffect(() => {
    // Attempt fetching live products from API/Supabase
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        if (res.ok) {
          const data = await res.json();
          if (data.products && data.products.length > 0) {
            setProducts(data.products);
          }
        }
      } catch (err) {
        console.warn("Using offline/initial product catalog:", err);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setProducts(INITIAL_PRODUCTS);
      return;
    }
    const q = query.toLowerCase();
    const filtered = INITIAL_PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.origin?.toLowerCase().includes(q)
    );
    setProducts(filtered);
  };

  const handleCategorySelect = (category: string) => {
    if (category === "সকল ক্যাটাগরি" || category === "সকল ফল" || category === "হোম") {
      setActiveFilter("সকল ফল");
      setProducts(INITIAL_PRODUCTS);
    } else if (category.includes("আম")) {
      setActiveFilter("আমের মৌসুম");
    } else if (category.includes("আপেল") || category.includes("মাল্টা") || category.includes("কমলা")) {
      setActiveFilter("আমদানি ফল");
    } else {
      setActiveFilter("সকল ফল");
    }
  };

  return (
    <>
      {/* Offline Status Warning Banner */}
      <OfflineBanner />

      {/* Top Utility & Notification Strip */}
      <TopUtilityBar />

      {/* Main Brand Header */}
      <Header
        onSearch={handleSearch}
        onCategoryFilter={handleCategorySelect}
      />

      {/* Category Navigation Strip */}
      <CategoryNav
        activeCategory={activeFilter === "সকল ফল" ? "হোম" : activeFilter}
        onSelectCategory={handleCategorySelect}
      />

      {/* Main Storefront Flow */}
      <main className="flex-grow">
        {/* Section 1: Hero Showcase */}
        <HeroSection />

        {/* Section 2: Trust Features */}
        <TrustFeatures />

        {/* Section 3: Featured Categories */}
        <FeaturedCategories onSelectCategory={handleCategorySelect} />

        {/* Section 4: Best Selling Fruits Grid */}
        <BestSellingSection
          products={products}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        {/* Section 5: Seasonal Specials */}
        <SeasonalSpecials />

        {/* Section 6: Special Promotional Mega Banner */}
        <MegaOfferBanner />

        {/* Section 7: Why Choose Us */}
        <WhyChooseUs />

        {/* Section 8: How It Works */}
        <HowItWorks />

        {/* Section 9: Customer Reviews */}
        <CustomerReviews />

        {/* Section 10: PWA / Mobile App Promotion */}
        <PwaPromo />
      </main>

      {/* Interactive Cart Drawer */}
      <CartDrawer />

      {/* Checkout Modal */}
      <CheckoutModal />

      {/* Order Success Confirmation Modal */}
      <OrderSuccessModal />

      {/* Floating Quick WhatsApp Button */}
      <FloatingWhatsApp />

      {/* Comprehensive Footer */}
      <Footer />
    </>
  );
}
