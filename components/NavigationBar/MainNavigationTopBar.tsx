"use client";
import React, { use, useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import { Kanit, Quicksand, Mitr, Poppins } from "next/font/google";
import { sendGAEvent } from "@next/third-parties/google";
import i18nConfig from "@/i18nConfig";
import Link from "next/link";
import THFlag from "@/public/svgs/thFlag";
import ENFlag from "@/public/svgs/enFlag";
import styles from "./MainNavigationTopBar.module.scss";
import mainLoad from "@/public/json/mainload.json";
import initTranslations from "@/app/[locale]/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";
import SiteLogo from "@/public/svgs/siteLogo";

const i18nNamespaces = ["common"];
const popins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export type Props = {
  logo?: React.ReactNode;
  locale: string;
  fill?: boolean;
};

type MenuItem = {
  name: string;
  key: string;
  title: string;
  titleEx: string;
  description: string;
  shortKey: string;
  url: string;
  theme: string;
  type: string;
  header: string;
  show: boolean;
  // [key: string]: string;
};

const MainNavigationTopBar = ({
  logo = <SiteLogo width={45} height={45} />,
  locale = "en",
  fill = false,
  ...props
}: Props): JSX.Element => {
  const [resources, setResources] = useState<any>(null);
  const [t, setT] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const currentPathname = usePathname();
  const searchParamsString = useSearchParams().toString();
  const popCurrentPathname = currentPathname.split("/").slice(1) || [];
  const [isExpandMenu, setIsExpandMenu] = useState(false);
  const mainMenu: MenuItem[] = [
    {
      name: "Inno Design",
      key: "innovation",
      title: "Inno",
      titleEx: "Design",
      description: "Design your own innovation",
      shortKey: "inno",
      url: "/innovationandbusiness",
      theme: "ThemeBlue",
      header: "false",
      type: "randomTool",
      show: false,
    },
    {
      name: "Story Design",
      key: "story",
      title: "Story",
      titleEx: "Design",
      description: "Design your own story",
      shortKey: "story",
      url: "/storydesign",
      theme: "ThemePurple",
      header: "false",
      type: "randomTool",
      show: false,
    },
    {
      name: "Edu Design",
      key: "education",
      title: "Edu",
      titleEx: "Design",
      description: "Design your own material",
      shortKey: "edu",
      url: "/edudesign",
      theme: "ThemePink",
      header: "false",
      type: "randomTool",
      show: false,
    },
    {
      name: "Online Tools",
      key: "onlineTools",
      title: "OnlineTools",
      titleEx: "",
      description: "Design your own innovation",
      shortKey: "onlinetools",
      url: "/onlinetools",
      theme: "",
      header: "false",
      type: "page",
      show: true,
    },
    {
      name: "Template",
      key: "template",
      title: "Template",
      titleEx: "",
      description: "Download template",
      shortKey: "template",
      url: "/template",
      theme: "",
      header: "false",
      type: "page",
      show: true,
    },
  ];

  const findTheme = (pop: string[], mainMenu: MenuItem[]): string | null => {
    for (const menuItem of mainMenu) {
      for (const popItem of pop) {
        if (popItem && menuItem.url.includes(popItem)) {
          return menuItem.theme;
        }
      }
    }
    return null;
  };

  const findKey = (
    pop: string[],
    mainMenu: MenuItem[],
    key: keyof MenuItem
  ): string | null => {
    for (const menuItem of mainMenu) {
      for (const popItem of pop) {
        if (menuItem.url.includes(popItem)) {
          const value = menuItem[key];
          if (typeof value === "string") {
            return value;
          }
        }
      }
    }
    return null;
  };

  const currentTheme =
    currentPathname != "/"
      ? findTheme(popCurrentPathname, mainMenu) || "ThemeNone"
      : "ThemeNone";

  const handleExpandMenu = (value: boolean) => {
    setIsExpandMenu(value);
  };

  const handleChangeLanguage = async (lang: string) => {
    const newLocale = lang;

    // set cookie for next-i18n-router
    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${date.toUTCString()};path=/`;

    // redirect to the new locale path
    if (locale === i18nConfig.defaultLocale) {
      searchParamsString
        ? router.push(
            "/" + newLocale + currentPathname + "?" + searchParamsString
          )
        : router.push("/" + newLocale + currentPathname);
      // router.push('/' + newLocale + currentPathname+'?'+searchParamsString);
    } else {
      router.push(
        searchParamsString
          ? currentPathname.replace(`/${locale}`, `/${newLocale}`) +
              "?" +
              searchParamsString
          : currentPathname.replace(`/${locale}`, `/${newLocale}`)
        // currentPathname.replace(`/${locale}`, `/${newLocale}`)+'?'+searchParamsString
      );
    }
    router.refresh();
  };

  // useEffect(() => {
  //   console.log("currentPathname", currentPathname);
  //   console.log("x", currentPathname.split("/").slice(1));
  //   console.log("xx", currentPathname.split("/").slice(2));
  //   console.log("xxx", popCurrentPathname[popCurrentPathname.length - 1]);
  //   console.log("popCurrentPathname", findTheme(popCurrentPathname, mainMenu),popCurrentPathname.length);
  // }, []);

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
      resources={resources}
    >
      {/* Desktop Size */}
      <div
        className={`${styles.DesktopHeader} ${fill ? styles.FillColor : null}`}
      >
        <header className={`${styles.LayoutHeader} ${styles[currentTheme]}`}>
          <Link href="/" className={`${styles.textLink} ${`homeLink`}`}>
            <div className={styles.BrandContainer}>
              <div className={styles.LogoContainer}>{logo}</div>
              <p className={styles.BrandText}>ThinkTool</p>
            </div>
          </Link>
          <div className={styles.TopNavigation}>
          {mainMenu.filter(menu => menu.show).map((menu, index) => (
            <React.Fragment key={`menuItem${index}`}>
              {menu.type == "randomTool" ? (
                <Link
                  href={{
                    pathname: `${menu.url}/${menu.key}board`,
                    query: { info: `${menu.shortKey}design` },
                  }}
                  onClick={() =>
                    sendGAEvent({
                      event: "goTo",
                      value: `${menu.shortKey}design`,
                    })
                  }
                  className={`${styles.textLink} ${`${menu.key}Link`}`}
                >
                  <div
                    className={`${
                      popCurrentPathname.some(
                        (item) => item === menu.url.replace("/", "")
                      )
                        ? styles.MenuActive
                        : ""
                    } ${styles.TopNavigationMenu}`}
                  >
                    <p className={styles.MenuText}>{menu.name}</p>
                  </div>
                </Link>
              ) : menu.type == "page" ? (
                <Link
                  href={menu.url}
                  onClick={() =>
                    sendGAEvent({
                      event: "goTo",
                      value: `${menu.shortKey}`,
                    })
                  }
                  className={`${styles.textLink} ${`${menu.key}Link`}`}
                >
                  <div
                    className={`${
                      popCurrentPathname.some(
                        (item) => item === menu.url.replace("/", "")
                      )
                        ? styles.MenuActive
                        : ""
                    } ${styles.TopNavigationMenu}`}
                  >
                    <p className={styles.MenuText}>{menu.name}</p>
                  </div>
                </Link>
              ) : null}
              {index < mainMenu.length - 1 && (
                <div className={styles.MenuDivider}></div>
              )}
            </React.Fragment>
          ))}
            <div className={styles.ToolContainer}>
              <div
                onClick={() => handleChangeLanguage("en")}
                className={`${styles.FlagContainer} ${
                  locale == "en" ? styles.active : ""
                }`}
              >
                <ENFlag />
              </div>
              <div
                onClick={() => handleChangeLanguage("th")}
                className={`${styles.FlagContainer} ${
                  locale == "th" ? styles.active : ""
                }`}
              >
                <THFlag />
              </div>
            </div>
          </div>
        </header>
        <div
          className={`${styles.TopNavigationExpand} ${styles[currentTheme]}`}
        >
          <input
            className={styles.ExpandMenu}
            id="ExpandMenuDesktop"
            name="ExpandMenuDesktop"
            type="checkbox"
            checked={isExpandMenu}
            onChange={(e) => handleExpandMenu(e.target.checked)}
          />
          <label className={styles.ExpandMenuIcon} htmlFor="ExpandMenuDesktop">
            <div
              className={`${isExpandMenu ? styles.barActive : null} ${
                styles.bar
              } ${styles.bar1}`}
            ></div>
            <div
              className={`${isExpandMenu ? styles.barActive : null} ${
                styles.bar
              } ${styles.bar2}`}
            ></div>
            <div
              className={`${isExpandMenu ? styles.barActive : null} ${
                styles.bar
              } ${styles.bar3}`}
            ></div>
          </label>
        </div>
      </div>
      {/* Mobile Size */}
      <div
        className={`${
          popCurrentPathname.length <= 2 &&
          (popCurrentPathname[0] == "" ||
            popCurrentPathname[0] == "th" ||
            popCurrentPathname[popCurrentPathname.length - 1] == "template" ||
            popCurrentPathname[popCurrentPathname.length - 1] == "onlinetools")
            ? styles.SimpleMobileHeader
            : styles.SimpleMobileHeaderHide
        } ${fill ? styles.FillColor : null}`}
      >
        <header className={`${styles.LayoutHeader} ${styles[currentTheme]}`}>
          <div className={styles.HeaderTopContainer}>
            <Link href="/" className={`${styles.textLink} ${`homeMobileLink`}`}>
              <div className={styles.BrandContainer}>
                <div className={styles.LogoContainer}>{logo}</div>
              </div>
            </Link>
          </div>
        </header>
      </div>
      <div className={`${styles.TopNavigationExpand} ${styles[currentTheme]}`}>
        <input
          className={styles.ExpandMenu}
          id="ExpandMenuMobile"
          name="ExpandMenuMobile"
          type="checkbox"
          checked={isExpandMenu}
          onChange={(e) => handleExpandMenu(e.target.checked)}
        />
        <label className={styles.ExpandMenuIcon} htmlFor="ExpandMenuMobile">
          <div
            className={`${isExpandMenu ? styles.barActive : null} ${
              styles.bar
            } ${styles.bar1} ${fill ? styles.FillColor : null}`}
          ></div>
          <div
            className={`${isExpandMenu ? styles.barActive : null} ${
              styles.bar
            } ${styles.bar2} ${fill ? styles.FillColor : null}`}
          ></div>
          <div
            className={`${isExpandMenu ? styles.barActive : null} ${
              styles.bar
            } ${styles.bar3} ${fill ? styles.FillColor : null}`}
          ></div>
        </label>
      </div>
      {isExpandMenu && (
        <div className={styles.ExpandMenuContainer}>
          <div className={`${styles.ExpandMenuContent}`}>
            {mainMenu.filter(menu => menu.show).map((menu, index) => (
              menu.type == "randomTool" ? (
                <Link
                  key={index}
                  href={{
                    pathname: `${menu.url}/${menu.key}board`,
                    query: { info: `${menu.shortKey}design` },
                  }}
                  className={`${styles.textLink} ${`${menu.key}MobileLink`}`}
                  onClick={() => handleExpandMenu(false)}
                >
                  <div className={styles.ExpandMenuContentItem}>
                    <p
                      className={`${styles.MenuText} ${
                        popCurrentPathname.some(
                          (item) => item === menu.url.replace("/", "")
                        )
                          ? styles.MenuTextActive
                          : ""
                      }`}
                    >
                      {menu.name}
                    </p>
                  </div>
                </Link>
              ) : menu.type == "page" ? (
                <Link
                  key={index}
                  href={menu.url}
                  className={`${styles.textLink} ${`${menu.key}MobileLink`}`}
                  onClick={() => handleExpandMenu(false)}
                >
                  <div className={styles.ExpandMenuContentItem}>
                    <p
                      className={`${styles.MenuText} ${
                        popCurrentPathname.some(
                          (item) => item === menu.url.replace("/", "")
                        )
                          ? styles.MenuTextActive
                          : ""
                      }`}
                    >
                      {menu.name}
                    </p>
                  </div>
                </Link>
              ) : null
            ))}
            <div className={styles.ExpandMenuContentItem}>
              <p
                className={`${styles.MenuText} ${styles.MenuTextActive}`}
                onClick={() =>
                  handleChangeLanguage(locale == "en" ? "th" : "en")
                }
              >
                {t("component.mainNavigationTopBar.items.changeLanguage")} :{" "}
                <span
                  className={`${styles.spanButton} ${
                    locale == "th" ? styles.active : null
                  }`}
                >
                  {t(`texts.language.thai`)}
                </span>
                |
                <span
                  className={`${styles.spanButton} ${
                    locale == "en" ? styles.active : null
                  }`}
                >
                  {t(`texts.language.english`)}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </TranslationsProvider>
  );
};

export default MainNavigationTopBar;
