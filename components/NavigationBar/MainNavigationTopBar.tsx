'use client';
import React, { use, useState, useEffect } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import i18nConfig from '@/i18nConfig';
import Link from 'next/link'
import THFlag from '@/public/svgs/thFlag'
import ENFlag from '@/public/svgs/enFlag'
import styles from './MainNavigationTopBar.module.css';
import mainLoad from '@/public/json/mainload.json';
import initTranslations from '@/app/[locale]/i18n';
import TranslationsProvider from '@/components/TranslationsProvider';

const i18nNamespaces = ['common'];

export type Props = {
  logo?: React.ReactNode
  locale: string
}

type MenuItem = {
  name: string;
  key: string;
  url: string;
  theme: string;
};

const MainNavigationTopBar = ({
  logo,
  locale = 'en',
  ...props
}: Props): JSX.Element => {
  const [resources, setResources] = useState<any>(null);
  const [t, setT] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const currentPathname = usePathname();
  const searchParamsString = useSearchParams().toString()
  const popCurrentPathname = currentPathname.split('/').slice(1) || [];
  const [isExpandMenu, setIsExpandMenu] = useState(false);
  const mainMenu :MenuItem[] = [
    {
      name: 'Inno Design',
      key: 'innovation',
      url: '/innovationandbusiness',
      theme: 'ThemeBlue'
    },
    {
      name: 'Story Design',
      key: 'story',
      url: '/storydesign',
      theme: 'ThemeYellow'
    },
    {
      name: 'Edu Design',
      key: 'education',
      url: '/edudesign',
      theme: 'ThemeRed'
    }
  ];

  const findTheme = (pop: string[], mainMenu: MenuItem[]): string | null => {
    for (const menuItem of mainMenu) {
      for (const popItem of pop) {
        if (menuItem.url.includes(popItem)) {
          return menuItem.theme;
        }
      }
    }
    return null;
  };

  const currentTheme = findTheme(popCurrentPathname, mainMenu) || 'Blue';

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
      searchParamsString ? router.push('/' + newLocale + currentPathname + '?' + searchParamsString) : router.push('/' + newLocale + currentPathname);
      // router.push('/' + newLocale + currentPathname+'?'+searchParamsString);
    } else {
      router.push(
        searchParamsString ? currentPathname.replace(`/${locale}`, `/${newLocale}`) + '?' + searchParamsString : currentPathname.replace(`/${locale}`, `/${newLocale}`)
        // currentPathname.replace(`/${locale}`, `/${newLocale}`)+'?'+searchParamsString
      );
    }
    router.refresh();
  };

  // useEffect(() => {
  //   console.log('x',currentPathname.split('/').slice(1))
  //   console.log('xx',currentPathname.split('/').slice(2))
  //   console.log('popCurrentPathname',findTheme(popCurrentPathname,mainMenu))
  // }
  // , []);

  useEffect(() => {
    async function fetchTranslations() {
      const { t, resources } = await initTranslations(locale, i18nNamespaces);
      setT(() => t);
      setResources(resources);
    }
    fetchTranslations();
  }, [locale]);


  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}>
      <header className={`${styles.LayoutHeader} ${styles[currentTheme]}`}>
        <Link href="/" className={styles.textLink}>
          <div className={styles.BrandContainer}>
            <div className={styles.LogoContainer}>
              {logo}
            </div>
            <p className={styles.BrandText}>ThinkTool</p>
          </div>
        </Link>
        <div className={styles.TopNavigation}>
          {mainMenu.map((menu, index) => {
            return (
              <React.Fragment key={`menuItem${index}`}>
                <Link
                  // href={`${menu.url} `}
                  href={{ pathname: `${menu.url}/${menu.key}board`, query: { info: 'innodesign' } }}
                  className={styles.textLink}
                >
                  <div className={`${popCurrentPathname.some(item => item === menu.url.replace('/', '')) ? styles.MenuActive : ''} ${styles.TopNavigationMenu}`}>
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
            <div onClick={() => handleChangeLanguage('en')} className={`${styles.FlagContainer} ${locale == 'en' ? styles.active : ''}`}>
              <ENFlag />
            </div>
            <div onClick={() => handleChangeLanguage('th')} className={`${styles.FlagContainer} ${locale == 'th' ? styles.active : ''}`}>
              <THFlag />
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
      <div className={`${styles.TopNavigationExpand} ${styles[currentTheme]}`}>
        <input className={styles.ExpandMenu}
          id="ExpandMenu"
          name="ExpandMenu"
          type="checkbox"
          checked={isExpandMenu}
          onChange={(e) => handleExpandMenu(e.target.checked)}
        />
        <label className={styles.ExpandMenuIcon} htmlFor="ExpandMenu">
          <div className={`${isExpandMenu ? styles.barActive : null} ${styles.bar} ${styles.bar1}`}></div>
          <div className={`${isExpandMenu ? styles.barActive : null} ${styles.bar} ${styles.bar2}`}></div>
          <div className={`${isExpandMenu ? styles.barActive : null} ${styles.bar} ${styles.bar3}`}></div>
        </label>
      </div>
      {
        isExpandMenu && (
          <div className={styles.ExpandMenuContainer}>
            <div className={`${styles.ExpandMenuContent}`}>
              {mainMenu.map((menu, index) => {
                return (
                  <Link
                    key={index}
                    // href={menu.url}
                    href={{ pathname: `${menu.url}/innovationboard`, query: { info: 'innodesign' } }}
                    className={styles.textLink}
                    onClick={() => handleExpandMenu(false)}
                  >
                    <div className={styles.ExpandMenuContentItem}>
                      <p className={`${styles.MenuText} ${popCurrentPathname.some(item => item === menu.url.replace('/', '')) ? styles.MenuTextActive : ''}`}>
                        {menu.name}
                      </p>
                    </div>
                  </Link>
                );
              }
              )}
              <div className={styles.ExpandMenuContentItem}>
                <p className={`${styles.MenuText} ${styles.MenuTextActive}`} onClick={() => handleChangeLanguage(locale == 'en' ? 'th' : 'en')}>
                  {t('component.mainNavigationTopBar.items.changeLanguage')} : <span className={`${styles.spanButton} ${locale == 'th' ? styles.active : null}`}>{t(`texts.language.thai`)}</span>|<span className={`${styles.spanButton} ${locale == 'en' ? styles.active : null}`}>{t(`texts.language.english`)}</span>
                </p>
              </div>
            </div>
          </div>
        )
      }
    </TranslationsProvider >
  )
}

export default MainNavigationTopBar
