import type { Metadata } from "next";
import { Quicksand, Mitr } from "next/font/google";
import { dir } from 'i18next';
import { ChangeEvent } from 'react';
import MainNavigationTopBar from "@/components/NavigationBar/MainNavigationTopBar";
import SiteLogo from "@/public/svgs/siteLogo";
import i18nConfig from '@/i18nConfig';
import style from "../Styles/MovingBackground.module.css"
import "../Styles/globals.css";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"]
});

const mitr = Mitr({
  subsets: ["thai"],
  weight: [ "200", "300", "400", "500", "600", "700"]
});

export const metadata: Metadata = {
  title: "Think Tool",
  description: "Generated innovative education ideas",
};

export function generateStaticParams() {
  return i18nConfig.locales.map(locale => ({ locale }));
}

export default function RootLayout({
  children,
  params: { locale }
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  return (
    <html lang={locale} dir={dir(locale)}>
      <body className={quicksand.className}>
        {/* <div className={style.moveBackground}></div>
        <div className={style.wave}></div>
        <div className={style.wave}></div>
        <div className={style.wave}></div> */}
        <MainNavigationTopBar
          locale={locale}
          logo={<SiteLogo width={45} height={45} />}
        />
        {children}
        {/* <footer className="layout-footer">footer</footer> */}
      </body>
    </html>
  );
}
