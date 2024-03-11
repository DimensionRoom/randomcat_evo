import type { Metadata } from "next";
import { Sarabun } from "next/font/google";
import i18nConfig from '@/i18nConfig';
import { dir } from 'i18next';
import Image from "next/image";
import Link from "next/link";
import "../Styles/globals.css";
import SiteLogo from "@/public/svgs/siteLogo";
import THFlag from "@/public/svgs/thFlag";
import ENFlag from "@/public/svgs/enFlag";

const sarabun = Sarabun({
  subsets: ["thai"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"]
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
      <body className={sarabun.className}>
        <header className="layout-header">
          <Link href="/">
            <div className="flex align-center brand-container">
              <div className="logo-container">
                <SiteLogo height={45} />
              </div>
              <p className="brand-text">Tool Kit</p>
            </div>
          </Link>
          <div className="flex align-center top-navigation">
            <Link href="/innovationboard">
              <div className="top-navigation-menu">Creativity</div>
            </Link>
            <div className="top-navigation-menu">Education Canvas</div>
            <div className="top-navigation-menu">Gamification</div>
            <div className="top-navigation-menu">Innovation</div>
            <div className="top-navigation-menu">Contact us</div>
            <div className="tool-container">
              <div className="flag-container">
                <THFlag />
              </div>
              <div className="flag-container">
                <ENFlag />
              </div>
            </div>
          </div>
        </header>
        {children}
        <footer className="layout-footer">footer</footer>
      </body>
    </html>
  );
}
