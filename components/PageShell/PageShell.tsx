"use client";

import React, { ReactNode } from "react";
import LottieAnimation from "@/components/Loading/LottieAnimation";
import TranslationsProvider from "@/components/TranslationsProvider";
import mainLoad from "@/public/json/mainload.json";

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
        <LottieAnimation animationData={loaderAnimation} />
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
