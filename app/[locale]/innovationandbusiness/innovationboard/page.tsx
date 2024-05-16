'use client';
import React, { useState, useEffect, Suspense } from 'react';
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import initTranslations from '../../i18n';
import styles from "../../../Styles/InnovationBoard/page.module.css";

import TranslationsProvider from '@/components/TranslationsProvider';
import IconBtn from '@/components/Botton/IconBtn/IconBtn';
import ExpandCard from '@/components/Card/ExpandCard/ExpandCard';
import mainLoad from '../../../../public/json/mainload.json';
import TagFilter from '@/components/Filter/TagFilter/TagFilter';

export type SubCategoryProps = {
  name: string
  catItemId: string
}

const i18nNamespaces = ['innovationboard'];
export default function InnovationBoard({ params: { locale } }: { params: { locale: string } }) {
  const [t, setT] = useState<any>(null);
  const searchParams = useSearchParams()
  const searchParamsInfo = searchParams.get('info')
  const [resources, setResources] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [subCategory, setSubCategory] = useState<SubCategoryProps[]>([
    {
      name: 'Inno design',
      catItemId: 'innodesign'
    },
    {
      name: 'Gamification for biz',
      catItemId: 'gamification'
    }
  ]);
  const [filterCategory, setFilterCategory] = useState<string[]>(['What', 'Why', 'Who', 'How', 'When', 'Where']);
  const [defaultSelectedCategories, setDefaultSelectedCategories] = useState<string[]>(['What', 'Why', 'Who', 'How', 'When', 'Where'])
  const [filteredCategories, setFilteredCategories] = useState<string[]>([]);

  const [cardItems, setCardItems] = useState([
    {
      title: 'What - (Outcome)',
      catItemId: 'What',
      headingContent: 'แฟชั่น',
      content: ''
    },
    {
      title: 'Why - (Purpose)',
      catItemId: 'Why',
      headingContent: 'ที่ทำให้รู้สึกปลอดภัย',
      content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged., but also the leap into electronic typesetting, remaining essentially unchanged, but also the leap into electronic typesetting, remaining essentially unchanged, but also the leap into electronic typesetting, remaining essentially unchanged'
    },
    {
      title: 'Who - (User)',
      catItemId: 'Who',
      headingContent: 'สำหรับคนจน',
      content: ''
    },
    {
      title: 'How - (Material)',
      catItemId: 'How',
      headingContent: 'โดยใช้วัสดุที่เป็นกระดาษ',
      content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged., but also the leap into electronic typesetting, remaining essentially unchanged, but also the leap into electronic typesetting, remaining essentially unchanged, but also the leap into electronic typesetting, remaining essentially unchanged'
    },
    {
      title: 'When - (Situation)',
      catItemId: 'When',
      headingContent: 'เมื่อเหนื่อย',
      content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
    },
    {
      title: 'Where - (Place)',
      catItemId: 'Where',
      headingContent: 'ใช้ในอนาคต',
      content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
    }
  ]);

  const handleFilterChange = (selectedCategories: string[]) => {
    setFilteredCategories(selectedCategories);
    console.log('Selected Categories:', selectedCategories);
  };

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
    <Suspense>
      <TranslationsProvider
        namespaces={i18nNamespaces}
        locale={locale}
        resources={resources}>
        <main className={styles.main}>
          <div className={styles.HeaderCatContainer}>
            <p className={styles.HeaderCatContainerText}>
              {subCategory.map((subCat, index) => (
                searchParamsInfo === subCat.catItemId ? subCat.name : ''
              ))}
            </p>
            <IconBtn />
          </div>
          <TagFilter defaultSelectedCategories={defaultSelectedCategories} categories={filterCategory} onFilterChange={handleFilterChange} />
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
    </Suspense>
  );
}
