import React, { ReactNode } from 'react';
import type { Metadata } from "next";

import { dir } from 'i18next';
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'
import { GA_TRACKING_ID, GTM_TRACKING_ID } from '@/utils/gtag';
import { ToastProvider , useToast} from '@/contexts/ToastContext';
import { AuthProvider } from '@/contexts/AuthContext';
import PageTracker from "@/components/Analytics/PageTracker";
import MainNavigationTopBar from "@/components/NavigationBar/MainNavigationTopBar";
import SiteLogo from "@/public/svgs/siteLogo";
import i18nConfig from '@/i18nConfig';
import "../Styles/globals.css";
import { quicksand } from "@/lib/fonts";
import { SITE_URL, HOME_META, altLanguages, absoluteUrl, type Locale } from "@/lib/seo";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const home = HOME_META[(locale as Locale)] ?? HOME_META.en;
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: home.title,
      template: "%s | Think Tool",
    },
    description: home.description,
    applicationName: "Think Tool",
    alternates: {
      canonical: absoluteUrl("", locale),
      languages: altLanguages(""),
    },
    openGraph: {
      type: "website",
      siteName: "Think Tool",
      locale: locale === "th" ? "th_TH" : "en_US",
      url: absoluteUrl("", locale),
      title: home.title,
      description: home.description,
    },
    twitter: {
      card: "summary_large_image",
      title: home.title,
      description: home.description,
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
  };
}

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
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "Think Tool",
        url: SITE_URL,
        logo: `${SITE_URL}/favicon.ico`,
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: "Think Tool",
        url: SITE_URL,
        inLanguage: locale === "th" ? "th-TH" : "en-US",
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
    ],
  };

  return (
    <html lang={locale} dir={dir(locale)} style={{ scrollBehavior: 'smooth' }}>
      <body className={quicksand.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ToastProvider>
        {/* <MainNavigationTopBar
          locale={locale}
          logo={<SiteLogo width={45} height={45} />}
        /> */}
          <AuthProvider>
            <PageTracker />
            {children}
          </AuthProvider>
        </ToastProvider>
      </body>
      {/* <GoogleAnalytics gaId={GA_TRACKING_ID} /> */}
      <GoogleTagManager gtmId={GTM_TRACKING_ID} />
    </html>
  );
}
