"use client";

import React, { useEffect, useRef, Suspense } from "react";
import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { FB_PIXEL_ID, pageview, fbEvent } from "@/lib/fpixel";

function FacebookPixelNavigationTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Initial PageView is tracked by inline script; track subsequent route changes
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (FB_PIXEL_ID) {
      pageview();
    }
  }, [pathname, searchParams]);

  return null;
}

export const FacebookPixel: React.FC = () => {
  if (!FB_PIXEL_ID) {
    return null;
  }

  return (
    <>
      <Script
        id="fb-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${FB_PIXEL_ID}');
            fbq('track', 'PageView');
          `,
        }}
      />
      <Suspense fallback={null}>
        <FacebookPixelNavigationTracker />
      </Suspense>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
};

export function TrackViewContent({
  id,
  name,
  price,
  category,
}: {
  id: string;
  name: string;
  price: number;
  category?: string;
}) {
  useEffect(() => {
    fbEvent("ViewContent", {
      content_name: name,
      content_ids: [id],
      content_type: "product",
      content_category: category || "তাজা ফল",
      value: price,
      currency: "BDT",
    });
  }, [id, name, price, category]);

  return null;
}
