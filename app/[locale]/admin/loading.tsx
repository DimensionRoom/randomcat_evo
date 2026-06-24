"use client";

import React from "react";
import dynamic from "next/dynamic";
import mainLoad from "@/public/json/mainload.json";

// Shown automatically by Next.js while the admin server component fetches its
// data, so navigating to /admin gives the same Lottie loader as the rest of
// the site (see components/PageShell/PageShell.tsx) instead of a blank pause.
//
// Loaded client-side only: @lottiefiles/react-lottie-player touches `document`
// at module load, which would break SSR of this loading fallback.
const LottiePlayer = dynamic(
  () => import("@/components/Loading/LottiePlayer"),
  { ssr: false }
);

export default function AdminLoading() {
  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        minHeight: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LottiePlayer autoplay loop src={mainLoad} style={{ width: "25vh" }} />
    </div>
  );
}
