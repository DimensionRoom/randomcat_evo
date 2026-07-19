"use client";
import React, { use, useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Controls } from "@lottiefiles/react-lottie-player";

import { sendGAEvent } from "@next/third-parties/google";
import i18nConfig from "@/i18nConfig";
import Link from "next/link";
import THFlag from "@/public/svgs/thFlag";
import ENFlag from "@/public/svgs/enFlag";
import AuthButton from "@/components/Auth/AuthButton";
import {
  Globe,
  GraduationCap,
  FileText,
  Star,
  ChevronRight,
  LogOut,
  LogIn,
  LayoutDashboard,
  X,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import ImageWithSkeleton from "@/components/Media/ImageWithSkeleton/ImageWithSkeleton";
import styles from "./MainNavigationTopBar.module.scss";

// Maps a menu key to its icon for the mobile card menu.
const mobileMenuIcons: Record<string, React.ComponentType<any>> = {
  onlineTools: Globe,
  onlineleaning: GraduationCap,
  templates: FileText,
  showcase: Star,
};
import mainLoad from "@/public/json/mainload.json";
import initTranslations from "@/app/[locale]/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";
import SiteLogo from "@/public/svgs/siteLogo";
import { kanit } from "@/lib/fonts";

const i18nNamespaces = ["common"];

export type Props = {
  logo?: React.ReactNode;
  locale: string;
  fill?: boolean;
  fixed?: boolean;
  absolute?: boolean;
  fillMode?: "normal" | "semiTransparent" | "transparent";
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
  fixed = false,
  fillMode = "normal",
  absolute = false,
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
  const { user, configured, isAdmin, signInWithGoogle, signOut } = useAuth();
  const mainMenu: MenuItem[] = [
    {
      name: "Inno Design",
      key: "innovation",
      title: "Inno",
      titleEx: "Design",
      description: "Design your own innovation",
      shortKey: "inno",
      url: "/innovationdesign",
      theme: "ThemePurple",
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
      url: "/educationdesign",
      theme: "ThemePurple",
      header: "false",
      type: "randomTool",
      show: false,
    },
    {
      name: "Content Design",
      key: "content",
      title: "Content",
      titleEx: "Design",
      description: "Design your own content",
      shortKey: "content",
      url: "/contentdesign",
      theme: "ThemePurple",
      header: "false",
      type: "randomTool",
      show: false,
    },
    {
      name: "Character Design",
      key: "character",
      title: "Character",
      titleEx: "Design",
      description: "Design your own character",
      shortKey: "character",
      url: "/characterdesign",
      theme: "ThemePurple",
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
      name: "Online Leaning",
      key: "onlineleaning",
      title: "Online Leaning",
      titleEx: "",
      description: "Online Leaning",
      shortKey: "onlineleaning",
      url: "/onlineleaning",
      theme: "",
      header: "false",
      type: "page",
      show: true,
    },
    {
      name: "Templates",
      key: "templates",
      title: "Templates",
      titleEx: "",
      description: "Download templates",
      shortKey: "templates",
      url: "/templates",
      theme: "",
      header: "false",
      type: "page",
      show: true,
    },
    {
      name: "Showcase",
      key: "showcase",
      title: "Showcase",
      titleEx: "",
      description: "Showcase of anyone",
      shortKey: "showcase",
      url: "/showcase",
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
        className={`
          ${styles.DesktopHeader} 
          ${fixed ? styles.fixed : null} 
          ${fill ? styles.FillColor : null} 
          ${styles[fillMode]}`}
      >
        <header
          className={`${styles.LayoutHeader} ${styles[currentTheme]} ${
            absolute && styles.absolute
          }`}
        >
          <Link href="/" className={`${styles.textLink} ${`homeLink`}`}>
            <div className={styles.BrandContainer}>
              <div className={styles.LogoContainer}>{logo}</div>
              <p className={styles.BrandText}>ThinkTool</p>
            </div>
          </Link>
          <div className={styles.TopNavigation}>
            {mainMenu
              .filter((menu) => menu.show)
              .map((menu, index) => (
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
              <AuthButton />
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
          <label
            className={`${styles.ExpandMenuIcon} ${
              isExpandMenu ? styles.HideToggle : ""
            }`}
            htmlFor="ExpandMenuDesktop"
          >
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
            popCurrentPathname[popCurrentPathname.length - 1] == "templates" ||
            popCurrentPathname[popCurrentPathname.length - 1] ==
              "onlineleaning" ||
            popCurrentPathname[popCurrentPathname.length - 1] == "showcase" ||
            popCurrentPathname[popCurrentPathname.length - 1] == "onlinetools")
            ? styles.SimpleMobileHeader
            : styles.SimpleMobileHeaderHide
        } ${fill ? styles.FillColor : null}  ${fixed ? styles.fixed : null}  ${styles[fillMode]}`}
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
        <label
          className={`${styles.ExpandMenuIcon} ${
            isExpandMenu ? styles.HideToggle : ""
          }`}
          htmlFor="ExpandMenuMobile"
        >
          <div
            className={`${isExpandMenu ? styles.barActive : null} ${
              styles.bar
            } ${styles.bar1} ${fill ? styles.FillColor : null} ${
              styles[fillMode]
            }`}
          ></div>
          <div
            className={`${isExpandMenu ? styles.barActive : null} ${
              styles.bar
            } ${styles.bar2} ${fill ? styles.FillColor : null} ${
              styles[fillMode]
            }`}
          ></div>
          <div
            className={`${isExpandMenu ? styles.barActive : null} ${
              styles.bar
            } ${styles.bar3} ${fill ? styles.FillColor : null} ${
              styles[fillMode]
            }`}
          ></div>
        </label>
      </div>
      {isExpandMenu && (
        <div className={styles.ExpandMenuContainer}>
          <div className={styles.MobileMenu}>
            <div className={styles.MobileMenuHeader}>
              <div className={styles.MobileBrand}>
                <SiteLogo width={40} height={40} />
                <span className={styles.MobileBrandName}>
                  THINK<span className={styles.MobileBrandNameAlt}>TOOL</span>
                </span>
              </div>
              <button
                type="button"
                className={styles.MobileClose}
                aria-label="Close menu"
                onClick={() => handleExpandMenu(false)}
              >
                <X size={28} />
              </button>
            </div>

            <p className={styles.MobileTagline}>
              &quot;{t("texts.slogan") || "Creativity begins here."}&quot;
            </p>
            <p className={styles.MobileSubtagline}>
              Random | Brainstorm | Spark your ideas
            </p>

            <div className={styles.MobileCards}>
              {mainMenu
                .filter((menu) => menu.show)
                .map((menu, index) => {
                  const Icon = mobileMenuIcons[menu.key] || Globe;
                  const href =
                    menu.type === "randomTool"
                      ? {
                          pathname: `${menu.url}/${menu.key}board`,
                          query: { info: `${menu.shortKey}design` },
                        }
                      : menu.url;
                  return (
                    <Link
                      key={index}
                      href={href}
                      className={styles.MobileCard}
                      onClick={() => handleExpandMenu(false)}
                    >
                      <span className={styles.MobileCardIcon}>
                        <Icon size={22} />
                      </span>
                      <span className={styles.MobileCardLabel}>{menu.name}</span>
                      <ChevronRight size={22} className={styles.MobileChevron} />
                    </Link>
                  );
                })}

              {isAdmin && (
                <Link
                  href={locale === "th" ? "/th/admin" : "/admin"}
                  className={styles.MobileCard}
                  onClick={() => handleExpandMenu(false)}
                >
                  <span className={styles.MobileCardIcon}>
                    <LayoutDashboard size={22} />
                  </span>
                  <span className={styles.MobileCardLabel}>Admin</span>
                  <ChevronRight size={22} className={styles.MobileChevron} />
                </Link>
              )}

              <div className={styles.MobileCard}>
                <span className={styles.MobileCardIcon}>
                  <Globe size={22} />
                </span>
                <span className={styles.MobileCardLabelGroup}>
                  <span className={styles.MobileCardSub}>
                    {t("component.mainNavigationTopBar.items.changeLanguage")}
                  </span>
                  <span className={styles.MobileLangRow}>
                    <button
                      type="button"
                      className={`${styles.MobileLangOpt} ${
                        locale == "th" ? styles.MobileLangActive : ""
                      }`}
                      onClick={() => handleChangeLanguage("th")}
                    >
                      {t(`texts.language.thai`)}
                    </button>
                    <span className={styles.MobileLangSep}>|</span>
                    <button
                      type="button"
                      className={`${styles.MobileLangOpt} ${
                        locale == "en" ? styles.MobileLangActive : ""
                      }`}
                      onClick={() => handleChangeLanguage("en")}
                    >
                      {t(`texts.language.english`)}
                    </button>
                  </span>
                </span>
              </div>

              {configured && user ? (
                <div className={styles.MobileAccountCard}>
                  <div className={styles.MobileAccountRow}>
                    <span className={styles.MobileAvatar}>
                      {user.user_metadata?.avatar_url ||
                      user.user_metadata?.picture ? (
                        <ImageWithSkeleton
                          raw
                          src={
                            (user.user_metadata?.avatar_url as string) ||
                            (user.user_metadata?.picture as string)
                          }
                          alt=""
                          fluid
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        (
                          (user.user_metadata?.full_name as string) ||
                          user.email ||
                          "U"
                        )
                          .charAt(0)
                          .toUpperCase()
                      )}
                    </span>
                    <span className={styles.MobileAccountInfo}>
                      <span className={styles.MobileAccountName}>
                        {(user.user_metadata?.full_name as string) || user.email}
                      </span>
                      {user.email && (
                        <span className={styles.MobileAccountEmail}>
                          {user.email}
                        </span>
                      )}
                    </span>
                  </div>
                  <button
                    type="button"
                    className={styles.MobileSignOut}
                    onClick={() => {
                      handleExpandMenu(false);
                      signOut();
                    }}
                  >
                    <LogOut size={20} />
                    <span>Sign out</span>
                  </button>
                </div>
              ) : configured ? (
                <button
                  type="button"
                  className={styles.MobileCard}
                  onClick={() => {
                    handleExpandMenu(false);
                    signInWithGoogle();
                  }}
                >
                  <span className={styles.MobileCardIcon}>
                    <LogIn size={22} />
                  </span>
                  <span className={styles.MobileCardLabel}>
                    Sign in with Google
                  </span>
                </button>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </TranslationsProvider>
  );
};

export default MainNavigationTopBar;
