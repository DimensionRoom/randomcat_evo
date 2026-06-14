"use client";

import React, { ReactNode } from "react";
import dynamic from "next/dynamic";
import TranslationsProvider from "@/components/TranslationsProvider";
import mainLoad from "@/public/json/mainload.json";

// Load the Lottie loader client-side only: @lottiefiles/react-lottie-player
// touches `document` at module load, which would break SSR prerendering for
// every page that uses PageShell.
const LottiePlayer = dynamic(() => import("@/components/Loading/LottiePlayer"), {
  ssr: false,
});

export default function PageShell({
  locale,
  namespaces,
  resources,
  ready,
  loaderAnimation = mainLoad,
  children,
}: {
  locale: string;
  namespaces: string[];
  resources: any;
  ready: boolean;
  loaderAnimation?: any;
  children: ReactNode;
}) {
  if (!ready) {
    return (
      <div
        style={{
          display: "flex",
          flex: 1,
          minHeight: "60vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LottiePlayer
          autoplay
          loop
          src={loaderAnimation}
          style={{ width: "25vh" }}
        />
      </div>
    );
  }

  return (
    <TranslationsProvider
      namespaces={namespaces}
      locale={locale}
      resources={resources}
    >
      {children}
    </TranslationsProvider>
  );
}
