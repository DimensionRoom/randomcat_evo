'use client';
import React, { use, useState, useEffect } from 'react'
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
  const popCurrentPathname = currentPathname.split('/').slice(2) || [];
  const [isExpandMenu, setIsExpandMenu] = useState(false);
  const mainMenu = [
    {
      name: 'Innovation & Business',
      url: '/innovationandbusiness'
    },
    {
      name: 'Education',
      url: '/education'
    },
    {
      name: 'Music',
      url: '/music'
    },
    {
      name: 'Creativity & Problem solving',
      url: '/creactivityandproblemsolving'
    }
  ];

  const handleExpandMenu = (value: boolean) => {
    setIsExpandMenu(value);
  }

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
    <>
      <header className={styles.LayoutHeader}>
        <Link href="/">
          <div className={`flex align-center ${styles.BrandContainer}`}>
            <div className={styles.LogoContainer}>
              {logo}
            </div>
            <p className={styles.BrandText}>ThinkTool</p>
          </div>
        </Link>
        <div className={`flex align-center ${styles.TopNavigation}`}>
          {mainMenu.map((menu, index) => {
            return (
              <React.Fragment key={index}>
                <Link
                  href={menu.url}
                >
                  <div className={`${popCurrentPathname.some(item=> item === menu.url.replace('/','')) ? styles.MenuActive : ''} ${styles.TopNavigationMenu}`}>
                    <p className={styles.MenuText}>
                      {menu.name}
                    </p>
                  </div>
                </Link>
                {index < mainMenu.length - 1 && <div className={styles.MenuDivider}></div>}
              </React.Fragment>
            );
          }
          )}
          <div className={styles.ToolContainer}>
            <div onClick={() => handleChangeLanguage('th')} className={`${styles.FlagContainer} ${locale == 'th' ? styles.active : ''}`}>
              <THFlag />
            </div>
            <div onClick={() => handleChangeLanguage('en')} className={`${styles.FlagContainer} ${locale == 'en' ? styles.active : ''}`}>
              <ENFlag />
            </div>
          </div>
        </div>
        {/* <div className={`flex ${styles.TopNavigationExpand}`}>
          <input className={`d-none ${styles.ExpandMenu}`} 
            id="ExpandMenu" 
            name="ExpandMenu" 
            type="checkbox" 
            onChange={(e) => handleExpandMenu(e.target.checked)}
          />
          <label className={styles.ExpandMenuIcon} htmlFor="ExpandMenu">
            <div className={`${styles.bar} ${styles.bar1}`}></div>
            <div className={`${styles.bar} ${styles.bar2}`}></div>
            <div className={`${styles.bar} ${styles.bar3}`}></div>
          </label>
        </div> */}
      </header>
      <div className={`flex ${styles.TopNavigationExpand}`}>
        <input className={`d-none ${styles.ExpandMenu}`}
          id="ExpandMenu"
          name="ExpandMenu"
          type="checkbox"
          checked={isExpandMenu}
          onChange={(e) => handleExpandMenu(e.target.checked)}
        />
        <label className={styles.ExpandMenuIcon} htmlFor="ExpandMenu">
          <div className={`${styles.bar} ${styles.bar1}`}></div>
          <div className={`${styles.bar} ${styles.bar2}`}></div>
          <div className={`${styles.bar} ${styles.bar3}`}></div>
        </label>
      </div>
      {
        isExpandMenu && (
          <div className={`flex ${styles.ExpandMenuContainer}`}>
            <div className={`${styles.ExpandMenuContent}`}>
              {mainMenu.map((menu, index) => {
                return (
                  <Link
                    key={index}
                    href={menu.url}
                    onClick={() => handleExpandMenu(false)}
                  >
                    <div className={styles.ExpandMenuContentItem}>
                      <p className={styles.MenuText}>
                        {menu.name}
                      </p>
                    </div>
                  </Link>
                );
              }
              )}
            </div>
          </div>
        )
      }
    </>
  )
}

export default MainNavigationTopBar
