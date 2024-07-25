import React, { ReactNode } from 'react';
import type { Metadata } from "next";
import { Quicksand, Mitr } from "next/font/google";
import { dir } from 'i18next';
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'
import { GA_TRACKING_ID, GTM_TRACKING_ID } from '@/utils/gtag';
import { ToastProvider , useToast} from '@/contexts/ToastContext';
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
  title: "Think Tool - Generate Innovative Education Ideas",
  description: "Explore innovative education ideas from creative thinkers and educators at Think Tool. Find inspiration and unique solutions for your educational needs.",
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
        <ToastProvider>
        <MainNavigationTopBar
          locale={locale}
          logo={<SiteLogo width={45} height={45} />}
        />
        
        {children}
        </ToastProvider>
      </body>
      {/* <GoogleAnalytics gaId={GA_TRACKING_ID} /> */}
      <GoogleTagManager gtmId={GTM_TRACKING_ID} />
    </html>
  );
}
