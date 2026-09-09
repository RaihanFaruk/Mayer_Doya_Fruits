"use client";

import React from "react";
import { useCart } from "@/context/CartContext";

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    subtotal,
    deliveryCharge,
    totalAmount,
    totalItemsCount,
    setIsCheckoutOpen,
  } = useCart();

  if (!isCartOpen) return null;

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-inverse-surface/50 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-surface-container-lowest shadow-2xl flex flex-col pointer-events-auto">
          {/* Cart Header */}
          <div className="p-4 border-b border-outline-variant flex items-center justify-between bg-surface-container-low">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[22px]">shopping_basket</span>
              <h3 className="text-headline-sm font-headline-sm text-primary font-bold">আপনার ফলের কার্ট</h3>
              <span className="bg-secondary text-surface-container-lowest text-[11px] font-bold px-2 py-0.5 rounded-full">
                {totalItemsCount}টি আইটেম
              </span>
            </div>
            <button
              className="text-outline hover:text-primary p-1 rounded-lg transition-colors"
              onClick={() => setIsCartOpen(false)}
            >
              <span className="material-symbols-outlined text-[24px]">close</span>
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scroll">
            {cart.length === 0 ? (
              <div className="py-16 text-center">
                <span className="material-symbols-outlined text-[48px] text-outline opacity-50 mb-2">
                  shopping_cart
                </span>
                <p className="text-body-md text-on-surface-variant">আপনার কার্ট বর্তমানে খালি আছে।</p>
                <button
                  className="mt-4 inline-flex items-center gap-2 bg-primary text-surface-container-lowest px-4 py-2 rounded-xl text-label-md font-bold"
                  onClick={() => setIsCartOpen(false)}
                >
                  ফল বাছাই করুন
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-3 p-3 rounded-xl border border-outline-variant/70 bg-surface-container-lowest"
                >
                  <div className="w-16 h-16 rounded-lg bg-surface-container shrink-0 overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      alt={item.product.name}
                      src={item.product.image_url}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="text-label-md font-label-md font-bold text-primary">
                        {item.product.name}
                      </h4>
                      <button
                        type="button"
                        aria-label="Remove item"
                        className="text-outline hover:text-error text-[16px] transition-colors"
                        onClick={() => removeFromCart(item.product.id)}
                      >
                        <span className="material-symbols-outlined text-[16px]">delete</span>
                      </button>
                    </div>
                    <p className="text-body-sm text-on-surface-variant">
                      {item.product.unit} • পরিমাণ: {item.quantity}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-label-lg font-bold text-primary">
                        ৳ {item.product.price * item.quantity}
                      </span>
                      <span className="text-[11px] text-secondary font-medium">ইন স্টক</span>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* Special Assured Trust Box */}
            <div className="p-3 rounded-xl bg-surface-container border border-secondary-container flex items-center gap-2.5">
              <span className="material-symbols-outlined text-secondary text-[22px]">verified</span>
              <p className="text-body-sm text-on-surface font-medium leading-snug">
                পছন্দ না হলে সাথে সাথে রিটার্ন সুবিধা রয়েছে।
              </p>
            </div>
          </div>

          {/* Cart Footer & Checkout Action */}
          {cart.length > 0 && (
            <div className="p-4 border-t border-outline-variant bg-surface-container-low space-y-3">
              <div className="space-y-1.5 text-body-sm">
                <div className="flex justify-between text-on-surface-variant">
                  <span>সাবটোটাল</span>
                  <span className="font-medium text-on-surface">৳ {subtotal}</span>
                </div>
                <div className="flex justify-between text-on-surface-variant">
                  <span>হোম ডেলিভারি চার্জ</span>
                  <span className="text-secondary font-bold">
                    {deliveryCharge === 0 ? "ফ্রি (অফার)" : `৳ ${deliveryCharge}`}
                  </span>
                </div>
                <div className="flex justify-between text-headline-sm font-headline-sm font-bold text-primary pt-2 border-t border-outline-variant/60">
                  <span>সর্বমোট প্রদেয়</span>
                  <span>৳ {totalAmount}</span>
                </div>
              </div>

              <button
                type="button"
                className="w-full bg-primary hover:bg-primary-container text-surface-container-lowest py-3 rounded-xl font-label-lg text-label-lg font-bold transition-all shadow-md flex items-center justify-center gap-2 active:scale-95"
                onClick={handleProceedToCheckout}
              >
                <span>অর্ডার কনফার্ম করুন (ক্যাশ অন ডেলিভারি)</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
