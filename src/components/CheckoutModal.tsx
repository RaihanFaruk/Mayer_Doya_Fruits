"use client";

import React, { useEffect, useRef, useState } from "react";
import { useCart } from "@/context/CartContext";
import { getWhatsAppUrl, sanitizePhone } from "@/lib/whatsapp";
import { fbEvent } from "@/lib/fpixel";

export const CheckoutModal: React.FC = () => {
  const {
    cart,
    customer,
    saveCustomerProfile,
    isCheckoutOpen,
    setIsCheckoutOpen,
    setIsOrderSuccessOpen,
    setLastOrderId,
    setLastWhatsAppUrl,
    clearCart,
    totalAmount,
    deliveryCharge,
    subtotal,
    isOnline,
  } = useCart();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const isSubmittingRef = useRef(false);

  useEffect(() => {
    if (customer) {
      setName(customer.name || "");
      setPhone(customer.phone || "");
      setAddress(customer.address || "");
    }
  }, [customer, isCheckoutOpen]);

  if (!isCheckoutOpen) return null;

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prevent double submission from fast clicks or multiple events
    if (isSubmittingRef.current || isSubmitting) {
      return;
    }

    if (!isOnline || (typeof navigator !== "undefined" && !navigator.onLine)) {
      setErrorMessage("ইন্টারনেট সংযোগ নেই। দয়া করে ইন্টারনেট চালু করে পুনরায় চেষ্টা করুন।");
      return;
    }

    const cleanPhone = sanitizePhone(phone);
    if (!name.trim() || !cleanPhone || !address.trim()) {
      setErrorMessage("দয়া করে আপনার নাম, মোবাইল নম্বর এবং সম্পূর্ণ ঠিকানা পূরণ করুন।");
      return;
    }

    if (cleanPhone.length < 11) {
      setErrorMessage("দয়া করে সঠিক ১১ ডিজিটের মোবাইল নম্বর প্রদান করুন (যেমন: 01862092701)।");
      return;
    }

    isSubmittingRef.current = true;
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      // 1. Save profile to client state & localStorage
      saveCustomerProfile({
        name: name.trim(),
        phone: cleanPhone,
        address: address.trim(),
      });

      // 2. Submit order to API
      let orderId = `MDF-${Math.floor(10000 + Math.random() * 90000)}`;

      try {
        const res = await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name.trim(),
            phone: cleanPhone,
            address: address.trim(),
            items: cart,
            totalAmount,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          if (data.orderId) {
            orderId = data.orderId;
          }
        }
      } catch (apiErr) {
        console.warn("Order API call failed, continuing with WhatsApp checkout fallback:", apiErr);
      }

      // 3. Generate itemized WhatsApp order link
      const whatsappUrl = getWhatsAppUrl({
        orderId,
        name: name.trim(),
        phone: cleanPhone,
        address: address.trim(),
        items: cart,
        totalAmount,
      });

      setLastWhatsAppUrl(whatsappUrl);

      // Attempt to open WhatsApp tab (might be blocked by browser popup blocker)
      try {
        window.open(whatsappUrl, "_blank");
      } catch (popupErr) {
        console.warn("Popup blocked by browser, user can tap link in success modal:", popupErr);
      }

      // 4. Track Facebook Pixel Purchase event
      fbEvent("Purchase", {
        value: totalAmount,
        currency: "BDT",
        content_type: "product",
        content_ids: cart.map((item) => item.product.id),
        contents: cart.map((item) => ({
          id: item.product.id,
          name: item.product.name,
          quantity: item.quantity,
          item_price: item.product.price,
        })),
        num_items: cart.reduce((sum, item) => sum + item.quantity, 0),
      });

      // 5. Update state & transition to success modal
      setLastOrderId(orderId);
      clearCart();
      setIsCheckoutOpen(false);
      setIsOrderSuccessOpen(true);
    } catch (err: unknown) {
      console.error("Order submission process failed:", err);
      setErrorMessage("অর্ডার প্রক্রিয়া করতে সমস্যা হয়েছে। দয়া করে পুনরায় চেষ্টা করুন।");
    } finally {
      isSubmittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-inverse-surface/60 backdrop-blur-sm transition-opacity"
        onClick={() => !isSubmitting && setIsCheckoutOpen(false)}
      />

      <div className="relative bg-surface-container-lowest max-w-lg w-full rounded-2xl p-4 sm:p-6 shadow-2xl border border-outline-variant z-10 my-auto max-h-[92vh] overflow-y-auto custom-scroll">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-outline-variant">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[22px] sm:text-[24px]">local_shipping</span>
            <h3 className="text-[17px] sm:text-headline-sm font-headline-sm text-primary font-bold">
              ডেলিভারি তথ্য ও অর্ডার কনফার্মেশন
            </h3>
          </div>
          <button
            type="button"
            aria-label="বন্ধ করুন"
            className="text-outline hover:text-primary p-2 min-w-[44px] min-h-[44px] -mr-2 flex items-center justify-center rounded-lg"
            onClick={() => setIsCheckoutOpen(false)}
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>

        {/* Offline Warning Banner if disconnected */}
        {!isOnline && (
          <div className="mb-4 p-3 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-label-md flex items-center gap-2">
            <span className="material-symbols-outlined text-amber-700 text-[20px]">wifi_off</span>
            <div>
              <p className="font-bold">ইন্টারনেট সংযোগ নেই</p>
              <p className="text-[12px]">
                অর্ডার সম্পন্ন করতে ইন্টারনেট সংযোগ প্রয়োজন। সংযোগ ফিরে আসলে বাটনটি সক্রিয় হবে।
              </p>
            </div>
          </div>
        )}

        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-error-container text-on-error-container text-body-sm font-medium">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmitOrder} className="space-y-4">
          {/* Customer Name */}
          <div>
            <label className="block text-label-md font-bold text-on-surface mb-1">
              আপনার পুরো নাম <span className="text-error">*</span>
            </label>
            <input
              type="text"
              required
              className="w-full bg-surface-container-low border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary rounded-xl py-2.5 px-3.5 text-body-md text-on-surface placeholder:text-outline"
              placeholder="যেমন: মোঃ তানভীর আহমেদ"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Customer Phone */}
          <div>
            <label className="block text-label-md font-bold text-on-surface mb-1">
              মোবাইল নম্বর (ইউজার আইডি) <span className="text-error">*</span>
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-label-md text-on-surface-variant font-medium">
                +৮৮০
              </span>
              <input
                type="tel"
                required
                className="w-full bg-surface-container-low border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary rounded-xl py-2.5 pl-16 pr-3.5 text-body-md text-on-surface placeholder:text-outline"
                placeholder="01862092701"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <p className="text-[11px] text-on-surface-variant mt-1">
              কোনো পাসওয়ার্ড প্রয়োজন নেই। মোবাইল নম্বর দিয়েই আপনার অর্ডার সংরক্ষিত থাকবে।
            </p>
          </div>

          {/* Delivery Address */}
          <div>
            <label className="block text-label-md font-bold text-on-surface mb-1">
              পূর্ণাঙ্গ ঠিকানা (বাসা/রোড/এলাকা) <span className="text-error">*</span>
            </label>
            <textarea
              required
              rows={2}
              className="w-full bg-surface-container-low border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary rounded-xl py-2 px-3.5 text-body-md text-on-surface placeholder:text-outline"
              placeholder="যেমন: বাসা-১২, রোড-৪, ব্লক-বি, বনশ্রী, ঢাকা"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          {/* Order Summary Box */}
          <div className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/60 space-y-1.5 text-body-sm">
            <div className="flex justify-between text-on-surface-variant">
              <span>আইটেম মোট ({cart.length}টি)</span>
              <span className="font-medium text-on-surface">৳ {subtotal}</span>
            </div>
            <div className="flex justify-between text-on-surface-variant">
              <span>ডেলিভারি চার্জ</span>
              <span className="text-secondary font-bold">
                {deliveryCharge === 0 ? "ফ্রি (অফার)" : `৳ ${deliveryCharge}`}
              </span>
            </div>
            <div className="flex justify-between text-headline-sm font-headline-sm font-bold text-primary pt-2 border-t border-outline-variant/60">
              <span>সর্বমোট প্রদেয়</span>
              <span>৳ {totalAmount}</span>
            </div>
            <p className="text-[11px] text-secondary font-medium pt-1">
              ✓ ক্যাশ অন ডেলিভারি: ফল হাতে পেয়ে দেখে মূল্য পরিশোধ করুন।
            </p>
          </div>

          {/* Submit Button (Strictly disabled if offline) */}
          <button
            type="submit"
            disabled={!isOnline || isSubmitting || cart.length === 0}
            className={`w-full py-3.5 rounded-xl font-label-lg text-label-lg font-bold transition-all shadow-md flex items-center justify-center gap-2 ${
              !isOnline || isSubmitting || cart.length === 0
                ? "bg-outline-variant text-outline cursor-not-allowed opacity-60"
                : "bg-primary hover:bg-primary-container text-surface-container-lowest active:scale-98"
            }`}
          >
            {isSubmitting ? (
              <span>অর্ডার জমা হচ্ছে...</span>
            ) : !isOnline ? (
              <span>ইন্টারনেট সংযোগ প্রয়োজন (অফলাইন)</span>
            ) : (
              <>
                <span>অর্ডার কনফার্ম করুন (ক্যাশ অন ডেলিভারি)</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
