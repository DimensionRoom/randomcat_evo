'use client';
import React, { useState, useEffect } from 'react';
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import { usePathname } from 'next/navigation';
import { Quicksand, Mitr } from "next/font/google";
import initTranslations from '../i18n';
import styles from "../../Styles/InnovationAndBusiness/page.module.css";

import TranslationsProvider from '@/components/TranslationsProvider';
import GameficationIcon from '@/public/svgs/category/gamefication';
import InnovationIcon from '@/public/svgs/category/innobu';
import ComingSoonIcon from '@/public/svgs/category/comingsoon';
import mainLoad from './../../../public/json/mainload.json';
import Link from 'next/link'

const i18nNamespaces = ['subCategory'];
const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"]
});
const mitr = Mitr({
  subsets: ["thai"],
  weight: ["200", "300", "400", "500", "600", "700"]
});
export default function InnovationAndBusiness({ params: { locale } }: { params: { locale: string } }) {
  const [t, setT] = useState<any>(null);
  const [resources, setResources] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const currentPathname = usePathname();

  useEffect(() => {
    async function fetchTranslations() {
      const { t, resources } = await initTranslations(locale, i18nNamespaces);
      setT(() => t);
      setResources(resources);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
    fetchTranslations();
  }, [locale]);

  if (loading) {
    return <div style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Player
        autoplay
        loop
        src={mainLoad}
        style={{ width: '30vh' }}
      >
      </Player>
    </div>
      ;
  }

  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}>
      <main className={styles.main}>
        <div className={styles.MainContainer}>
          <div className={`flex row align-center justify-center`}>
            <div className={styles.PageHeaderTextContainer}>
              <p className={styles.PageHeaderText}>{t('screen.innovationAndBusiness.title')}</p>
            </div>
          </div>
          {/* <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '1rem', width: '100%' }}>
            <div style={{ backgroundColor: 'white',borderRadius:50 }}></div>
            <div style={{ backgroundColor: 'white',borderRadius:50 }}></div>
            <div style={{ backgroundColor: 'white',borderRadius:50 }}></div>
            <div style={{ backgroundColor: 'white',borderRadius:50 }}></div>
          </div> */}
          {/* <div style={{ display: 'flex',flex:1,flexWrap:'wrap',alignItems:'center',justifyContent:'center',gap:10 }}>
              <div style={{width:300,height:300,borderRadius:50,display:'flex',flexGrow:1,flexBasis:300,backgroundColor:'white'}}></div>
              <div style={{width:300,height:300,borderRadius:50,display:'flex',flexGrow:1,flexBasis:300,backgroundColor:'white'}}></div> 
          </div> */}
          <div className={`${styles.CategoryContainer}`}>
            <div className={`${styles.CategorySection}`}>
              <Link href={{ pathname: `${currentPathname}/innovationboard`, query: { info: 'innodesign' } }}>
                <div className={`${styles.CategoryItem}`}>
                  <InnovationIcon />
                </div>
              </Link>
              <div className={`${styles.CategoryDesc}`}>
                <p className={`${styles.CategoryDescTitle}`}>{t('screen.innovationAndBusiness.subCategory.innoDesign.title')}</p>
                <p className={`${styles.CategoryDescContent} ${locale == 'th' ? `${mitr.className} ${styles.thfontbold}` : null}`}>{t('screen.innovationAndBusiness.subCategory.innoDesign.content')}</p>
              </div>
            </div>
            <div className={`${styles.CategorySection}`}>
              <Link className={`${styles.LinkDisabled}`} href={{ pathname: `${currentPathname}/innovationboard`, query: { info: 'gamification' } }}>
                <div className={`${styles.CategoryItem} ${styles.disabled}`}>
                  <ComingSoonIcon width={'70%'} height={'70%'} />
                  {/* <GameficationIcon /> */}
                  {/* <div className={`${styles.comingsoon}`}>
                    <p>COMING SOON</p>
                  </div> */}
                </div>
              </Link>
              <div className={`${styles.CategoryDesc}`}>
                <p className={`${styles.CategoryDescTitle}`}>{t('screen.innovationAndBusiness.subCategory.gamificationBiz.title')}</p>
                <p className={`${styles.CategoryDescContent} ${locale == 'th' ? `${mitr.className} ${styles.thfontbold}` : null}`}>{t('screen.innovationAndBusiness.subCategory.gamificationBiz.content')}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </TranslationsProvider >
  );
}
