import React, { ReactNode } from 'react';
import type { Metadata } from "next";
import { Quicksand, Mitr } from "next/font/google";
import { dir } from 'i18next';
import MainNavigationTopBar from "@/components/NavigationBar/MainNavigationTopBar";
import SiteLogo from "@/public/svgs/siteLogo";
import i18nConfig from '@/i18nConfig';
import style from "../Styles/MovingBackground.module.css"
import "../Styles/globals.css";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"]
});

export const metadata: Metadata = {
  title: "Think Tool",
  description: "Generated innovative education ideas",
};

export function generateStaticParams() {
  return i18nConfig.locales.map(locale => ({ locale }));
}

interface RootLayoutProps {
  children: ReactNode;
  params: { locale: string };
}

export default function RootLayout({
  children,
  params: { locale }
}: Readonly<RootLayoutProps>) {
  return (
    <html lang={locale} dir={dir(locale)} style={{ scrollBehavior: 'smooth' }}>
      <body className={quicksand.className}>
        <MainNavigationTopBar
          locale={locale}
          logo={<SiteLogo width={45} height={45} />}
        />
        {children}
      </body>
    </html>
  );
}
