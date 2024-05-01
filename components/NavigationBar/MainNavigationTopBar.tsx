'use client';
import React from 'react'
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import i18nConfig from '@/i18nConfig';
import Link from 'next/link'
import THFlag from '@/public/svgs/thFlag'
import ENFlag from '@/public/svgs/enFlag'
import styles from './MainNavigationTopBar.module.css';

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

  const handleChangeLanguage = async (lang: string) => {
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
    <header className={styles.LayoutHeader}>
      <Link href="/">
        <div className={`flex align-center ${styles.BrandContainer}`}>
          <div className={styles.LogoContainer}>
            {logo}
          </div>
          <p className={styles.BrandText}>Tool Kit</p>
        </div>
      </Link>
      <div className={`flex align-center ${styles.TopNavigationExpand}`}>
        <input className={`d-none ${styles.ExpandMenu}`} id="ExpandMenu" name="ExpandMenu" type="checkbox" />
        <label className={styles.ExpandMenuIcon} htmlFor="ExpandMenu">
          <div className={`${styles.bar} ${styles.bar1}`}></div>
          <div className={`${styles.bar} ${styles.bar2}`}></div>
          <div className={`${styles.bar} ${styles.bar3}`}></div>
        </label>
      </div>
      <div className={`flex align-center ${styles.TopNavigation}`}>
        <Link href="/innovationboard">
          <div className={styles.TopNavigationMenu}>Creativity</div>
        </Link>
        <Link href="/">
          <div className={styles.TopNavigationMenu}>Education Canvas</div>
        </Link>
        <Link href="/">
          <div className={styles.TopNavigationMenu}>Gamification</div>
        </Link>
        <Link href="/">
          <div className={styles.TopNavigationMenu}>Innovation</div>
        </Link>
        <Link href="/">
          <div className={styles.TopNavigationMenu}>Contact us</div>
        </Link>
        <div className={styles.ToolContainer}>
          <div onClick={() => handleChangeLanguage('th')} className={`${styles.FlagContainer} ${locale == 'th' ? styles.active : ''}`}>
            <THFlag />
          </div>
          <div onClick={() => handleChangeLanguage('en')} className={`${styles.FlagContainer} ${locale == 'en' ? styles.active : ''}`}>
            <ENFlag />
          </div>
        </div>
      </div>
    </header>
  )
}

export default MainNavigationTopBar
