'use client';
import React from 'react'
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import i18nConfig from '@/i18nConfig';
import Link from 'next/link'
import THFlag from '@/public/svgs/thFlag'
import ENFlag from '@/public/svgs/enFlag'

export type Props = {
  logo?: React.ReactNode
  locale: string
}

const MainNavigationTopBar = ({
  logo,
  locale = 'en',
  ...props
}: Props): JSX.Element => {
  const router = useRouter();
  const currentPathname = usePathname();

  const handleChangeLanguage = async(lang:string) => {
    const newLocale = lang;

    // set cookie for next-i18n-router
    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${date.toUTCString()};path=/`;

    // redirect to the new locale path
    if (
      locale === i18nConfig.defaultLocale
    ) {
      router.push('/' + newLocale + currentPathname);
    } else {
      router.push(
        currentPathname.replace(`/${locale}`, `/${newLocale}`)
      );
    }

    router.refresh();
  };

  return (
    <header className="layout-header">
      <Link href="/">
        <div className="flex align-center brand-container">
          <div className="logo-container">
            {logo}
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
          <div onClick={()=>handleChangeLanguage('th')} className={`flag-container ${locale == 'th' ? 'active' : ''}`}>
            <THFlag />
          </div>
          <div onClick={()=>handleChangeLanguage('en')} className={`flag-container ${locale == 'en' ? 'active' : ''}`}>
            <ENFlag />
          </div>
        </div>
      </div>
    </header>
  )
}

export default MainNavigationTopBar
