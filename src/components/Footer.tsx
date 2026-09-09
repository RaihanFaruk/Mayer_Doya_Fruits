import React from "react";
import Link from "next/link";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-surface-container-lowest border-t border-primary-container">
      <div className="w-full py-12 md:py-16 px-4 md:px-8 max-w-[1200px] mx-auto">
        {/* Top Grid: 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-12">
          {/* Col 1: Brand & Maternal Trust (5 cols) */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-surface-container-lowest text-primary flex items-center justify-center font-bold">
                <span className="material-symbols-outlined text-[24px]">nutrition</span>
              </div>
              <div>
                <span className="text-headline-md font-headline-md font-bold text-surface-container-lowest">
                  মায়ের দোয়া ফল
                </span>
                <p className="text-label-md font-label-md text-primary-fixed">প্রতিটি ফোঁটায় ভালোবাসা</p>
              </div>
            </div>
            <p className="text-body-md font-body-md text-on-primary-container max-w-md mb-6 leading-relaxed">
              বাংলাদেশের সেরা এবং সবচেয়ে বিশ্বস্ত অনলাইন তাজা ফল ডেলিভারি প্ল্যাটফর্ম। মায়ের যত্নের মতো আন্তরিকতা ও সততা নিয়ে আমরা সরাসরি বাগান থেকে ১০০% তাজা ও ফরমালিনমুক্ত মিষ্টি ফল পৌঁছে দিচ্ছি আপনার দোড়গোড়ায়।
            </p>
            <div className="flex items-center gap-3 text-label-md font-label-md text-primary-fixed flex-wrap">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-secondary-fixed">check_circle</span>
                <span>ফরমালিন মুক্ত</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-secondary-fixed">check_circle</span>
                <span>সঠিক ওজন</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-secondary-fixed">check_circle</span>
                <span>ক্যাশ অন ডেলিভারি</span>
              </span>
            </div>
          </div>

          {/* Col 2: গুরুত্বপূর্ণ লিংক (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-headline-sm font-headline-sm text-surface-container-lowest font-bold mb-4">
              গুরুত্বপূর্ণ লিংক
            </h4>
            <ul className="space-y-2.5 text-body-sm font-body-sm text-on-primary-container">
              <li>
                <a className="hover:text-primary-fixed transition-colors" href="#about">
                  আমাদের কথা
                </a>
              </li>
              <li>
                <a className="hover:text-primary-fixed transition-colors" href="#categories">
                  ফলের তালিকা
                </a>
              </li>
              <li>
                <a className="hover:text-primary-fixed transition-colors" href="#privacy">
                  গোপনীয়তা নীতি
                </a>
              </li>
              <li>
                <a className="hover:text-primary-fixed transition-colors" href="#refund">
                  রিটার্ন ও রিফান্ড নীতি
                </a>
              </li>
              <li>
                <a className="hover:text-primary-fixed transition-colors" href="#terms">
                  ক্যাশ অন ডেলিভারি নিয়মাবলী
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: গ্রাহক সেবা (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-headline-sm font-headline-sm text-surface-container-lowest font-bold mb-4">
              গ্রাহক সেবা
            </h4>
            <ul className="space-y-2.5 text-body-sm font-body-sm text-on-primary-container">
              <li>
                <a className="hover:text-primary-fixed transition-colors" href="#help">
                  অর্ডার করার নিয়ম
                </a>
              </li>
              <li>
                <a className="hover:text-primary-fixed transition-colors" href="#track">
                  অর্ডার ট্র্যাকিং
                </a>
              </li>
              <li>
                <a className="hover:text-primary-fixed transition-colors" href="#delivery">
                  ডেলিভারি চার্জ
                </a>
              </li>
              <li>
                <a className="hover:text-primary-fixed transition-colors" href="#faq">
                  সচরাচর জিজ্ঞাসা (FAQ)
                </a>
              </li>
              <li>
                <a className="hover:text-primary-fixed transition-colors" href="#contact">
                  যোগাযোগ ও সহায়তা
                </a>
              </li>
              <li>
                <Link className="hover:text-primary-fixed transition-colors text-secondary-fixed" href="/admin/login">
                  অ্যাডমিন প্যানেল
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: হটলাইন ও ঠিকানা (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-headline-sm font-headline-sm text-surface-container-lowest font-bold mb-4">
              যোগাযোগ ও হাব
            </h4>
            <div className="space-y-3 text-body-sm font-body-sm text-on-primary-container">
              <div className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-primary-fixed text-[18px] shrink-0 mt-0.5">
                  location_on
                </span>
                <span>প্রধান হাব: কাওরান বাজার আড়ত লেন, ঢাকা-১২১৫</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-primary-fixed text-[18px] shrink-0">call</span>
                <span className="font-bold text-surface-container-lowest">+৮৮০ ১৭১২-৩৪৫৬৭৮</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-primary-fixed text-[18px] shrink-0">mail</span>
                <span>support@mayerdoafruit.com</span>
              </div>
              {/* Payment Badges */}
              <div className="pt-2">
                <span className="text-label-sm font-label-sm text-primary-fixed block mb-1.5">
                  গ্রহণযোগ্য পেমেন্ট মাধ্যম:
                </span>
                <div className="flex items-center gap-2 flex-wrap text-label-sm">
                  <span className="bg-surface-container-lowest/15 px-2 py-1 rounded text-surface-container-lowest font-medium">
                    ক্যাশ অন ডেলিভারি
                  </span>
                  <span className="bg-surface-container-lowest/15 px-2 py-1 rounded text-surface-container-lowest font-medium">
                    বিকাশ
                  </span>
                  <span className="bg-surface-container-lowest/15 px-2 py-1 rounded text-surface-container-lowest font-medium">
                    নগদ
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Strip */}
        <div className="pt-8 border-t border-primary-container/80 flex flex-col md:flex-row justify-between items-center gap-4 text-body-sm font-body-sm text-on-primary-container">
          <div>স্বত্বাধিকার © ২০২৪ মায়ের দোয়া ফল - প্রতিটি ফোঁটায় ভালোবাসা। সর্বস্বত্ব সংরক্ষিত।</div>
          <div className="flex items-center gap-4 text-label-md font-label-md flex-wrap">
            <a className="hover:text-primary-fixed transition-colors" href="#about">
              আমাদের কথা
            </a>
            <span>•</span>
            <a className="hover:text-primary-fixed transition-colors" href="#privacy">
              গোপনীয়তা নীতি
            </a>
            <span>•</span>
            <a className="hover:text-primary-fixed transition-colors" href="#refund">
              রিটার্ন ও রিফান্ড নীতি
            </a>
            <span>•</span>
            <a className="hover:text-primary-fixed transition-colors" href="#terms">
              ক্যাশ অন ডেলিভারি নিয়মাবলী
            </a>
            <span>•</span>
            <a className="hover:text-primary-fixed transition-colors" href="#contact">
              যোগাযোগ ও সহায়তা
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
