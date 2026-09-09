import React from "react";
import { WHATSAPP_PHONE } from "@/lib/whatsapp";

export const FloatingWhatsApp: React.FC = () => {
  return (
    <aside className="fixed bottom-6 right-6 z-30 flex flex-col gap-2">
      <a
        aria-label="হোয়াটসঅ্যাপে চ্যাট করুন"
        className="bg-secondary hover:bg-primary text-surface-container-lowest w-14 h-14 rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-all group active:scale-95"
        href={`https://wa.me/${WHATSAPP_PHONE}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="material-symbols-outlined text-[30px]">chat</span>
      </a>
    </aside>
  );
};
