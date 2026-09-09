"use client";

import React, { useEffect, useState } from "react";
import { WHATSAPP_PHONE } from "@/lib/whatsapp";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export const PwaPromo: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState<boolean>(false);

  useEffect(() => {
    // Check if the app is already running in standalone (installed) mode
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;

    if (isStandalone) {
      setInstalled(true);
    }

    // Capture the beforeinstallprompt event when the browser supports it
    const handleBeforeInstall = (e: Event) => {
      // Prevent the browser's default automated mini-infobar prompt
      e.preventDefault();
      // Store the event so it can be triggered by user interaction
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    // Handle when the PWA is successfully installed
    const handleAppInstalled = () => {
      setInstalled(true);
      // Clean up the stored event
      setDeferredPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    try {
      // Trigger the prompt on user gesture
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice && choice.outcome === "accepted") {
        setInstalled(true);
      }
    } catch (err) {
      console.error("Error invoking beforeinstallprompt:", err);
    } finally {
      // Clean up the stored event after prompting
      setDeferredPrompt(null);
    }
  };

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <div className="bg-surface-container rounded-3xl p-6 md:p-10 border border-outline-variant/60 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <span className="text-secondary text-label-md font-label-md font-bold flex items-center gap-1.5 mb-2">
              <span className="material-symbols-outlined text-[20px]">install_mobile</span>
              <span>মোবাইল শর্টকাট ও লাইভ ট্র্যাকিং</span>
            </span>
            <h3 className="text-headline-lg-mobile md:text-headline-lg font-headline-lg font-bold text-primary mb-3">
              মায়ের দোয়া ফল এখন আপনার ফোনেই
            </h3>
            <p className="text-body-lg font-body-lg text-on-surface-variant mb-6">
              সহজেই যেকোনো সময় অর্ডার করতে ওয়েবসাইটটি আপনার মোবাইলের হোম স্ক্রিনে সেভ করুন। উপভোগ করুন ১-ক্লিকে রি-অর্ডার ও লাইভ ডেলিভারি নোটিফিকেশন।
            </p>
            <div className="flex flex-wrap items-center gap-3">
              {/* Only render the install button when the browser actually supports the install prompt and has provided the event */}
              {deferredPrompt && !installed && (
                <button
                  type="button"
                  className="bg-primary hover:bg-primary-container text-surface-container-lowest font-label-lg text-label-lg px-6 py-3 rounded-xl transition-all shadow flex items-center gap-2 active:scale-95"
                  onClick={handleInstallClick}
                >
                  <span className="material-symbols-outlined text-[20px]">add_to_home_screen</span>
                  <span>অ্যাপ ইনস্টল করুন</span>
                </button>
              )}
              <a
                className="bg-surface-container-lowest border border-outline-variant hover:border-secondary text-primary font-label-lg text-label-lg px-5 py-3 rounded-xl transition-all flex items-center gap-2"
                href={`https://wa.me/${WHATSAPP_PHONE}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="material-symbols-outlined text-[20px] text-secondary">chat</span>
                <span>হোয়াটসঅ্যাপে অর্ডার</span>
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant shadow-md">
            <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center text-primary-fixed">
              <span className="material-symbols-outlined text-[32px]">local_shipping</span>
            </div>
            <div>
              <div className="text-headline-sm font-headline-sm text-primary font-bold">সরাসরি কল সেন্টার</div>
              <div className="text-body-md text-secondary font-bold">+৮৮০ ১৭১২-৩৪৫৬৭৮</div>
              <div className="text-[11px] text-on-surface-variant">সকাল ৮টা থেকে রাত ১১টা খোলা</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
