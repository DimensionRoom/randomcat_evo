'use client';
import React, { useState, useEffect } from 'react';
import initTranslations from '../i18n';
import styles from "../../Styles/InnovationBoard/page.module.css";
import TranslationsProvider from '@/components/TranslationsProvider';
import IconBtn from '@/components/Botton/IconBtn/IconBtn';
import ExpandCard from '@/components/Card/ExpandCard/ExpandCard';
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import mainLoad from './../../../public/json/mainload.json';

const i18nNamespaces = ['innovationboard'];

export default function InnovationBoard({ params: { locale } }: { params: { locale: string } }) {
  const [t, setT] = useState<any>(null);
  const [resources, setResources] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchTranslations() {
      const { t, resources } = await initTranslations(locale, i18nNamespaces);
      setT(t);
      setResources(resources);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
    fetchTranslations();
  }, [locale]);

  const [cardItems, setCardItems] = useState([
    {
      title: 'Profession',
      headingContent: 'Museum owner',
      content: 'Card Content'
    },
    {
      title: 'Random tool',
      headingContent: 'Physical Reward',
      content: 'Card Content'
    },
    {
      title: 'Outcome/Situation',
      headingContent: 'Increase Customer Satisfaction',
      content: 'Card Content'
    }
  ]);

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
        <div className={styles.HeaderCatContainer}>
          <h1>Gamification card set</h1>
          <IconBtn />
        </div>
        <div className={styles.CardItemsContainer}>
          {cardItems.map((cardItem, index) => (
            <ExpandCard 
              key={index} 
              title={cardItem.title} 
              headingContent={cardItem.headingContent}
              content={cardItem.content} />
          ))}
        </div>
      </main>
    </TranslationsProvider>
  );
}
