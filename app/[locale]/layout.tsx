import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import { dir } from 'i18next';
import { ChangeEvent } from 'react';
import MainNavigationTopBar from "@/components/NavigationBar/MainNavigationTopBar";
import SiteLogo from "@/public/svgs/siteLogo";
import i18nConfig from '@/i18nConfig';
import "../Styles/globals.css";
import style from "../Styles/MovingBackground.module.css"

const promt = Prompt({
  subsets: ["thai"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
});

export const metadata: Metadata = {
  title: "Education Innovation Board",
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
      <body className={promt.className}>
        <div className={style.moveBackground}></div>
        <MainNavigationTopBar locale={locale} logo={<SiteLogo height={45}/>}/>
        {children}
        {/* <footer className="layout-footer">footer</footer> */}
      </body>
    </html>
  );
}
