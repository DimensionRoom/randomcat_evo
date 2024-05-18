'use client';
import React, { useState, useEffect } from 'react';
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import initTranslations from '../../i18n';
import styles from "../../../Styles/InnovationBoard/page.module.css";

import TranslationsProvider from '@/components/TranslationsProvider';
import IconBtn from '@/components/Button/IconBtn/IconBtn';
import ExpandCard from '@/components/Card/ExpandCard/ExpandCard';
import mainLoad from '../../../../public/json/mainload.json';
import TagFilter from '@/components/Filter/TagFilter/TagFilter';

import innodesisgnData from '../../../../public/json/innodesignCat.json';

export type SubCategoryProps = {
  name: string
  catItemId: string
}

type JSONData = {
  [key: string]: any;
};

interface Item {
  title: string;
  catItemId: string;
  topic: string;
  content: string;
}
interface Category {
  title: string;
  key: string;
  data: { th: string; en: string; content: string }[];
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

  const extractMainKeys = (jsonData: JSONData): string[] => {
    return Object.keys(jsonData);
  };
  const mainKeys = extractMainKeys(innodesisgnData);
  const cardData: { [key: string]: Category } = innodesisgnData;
  const [filterCategory, setFilterCategory] = useState<string[]>(mainKeys);
  const [defaultSelectedCategories, setDefaultSelectedCategories] = useState<string[]>(mainKeys)
  const [filteredCategories, setFilteredCategories] = useState<string[]>(mainKeys);
  const [randomItems, setRandomItems] = useState<Item[]>([]);
  const [lockContent, setLockContent] = useState<boolean>(false);
  const [lockItem, setLockItem] = useState<string[]>([]);
  const [cardItems, setCardItems] = useState([
    {
      title: 'What-Outcome',
      catItemId: 'What',
      topic: 'แฟชั่น',
      content: ''
    },
    {
      title: 'Who-User',
      catItemId: 'Who',
      topic: 'สำหรับคนจน',
      content: ''
    },
    {
      title: 'Why-Purpose',
      catItemId: 'Why',
      topic: 'ที่ทำให้รู้สึกปลอดภัย',
      content: ''
    },
    {
      title: 'When-Situation',
      catItemId: 'When',
      topic: 'เมื่อเหนื่อย',
      content: ''
    },
    {
      title: 'Where-Place',
      catItemId: 'Where',
      topic: 'ใช้ในอนาคต',
      content: ''
    },
    {
      title: 'How-Material',
      catItemId: 'How',
      topic: 'โดยใช้วัสดุที่เป็นกระดาษ',
      content: ''
    }
  ]);

  const handleLockContentChange = (catItemId: string,newLockContent: boolean) => {
    console.log('catItemId',catItemId)
    setLockContent(newLockContent);
    setLockItem([...lockItem, catItemId]);
  };

  const handleFilterChange = (selectedCategories: string[]) => {
    setFilteredCategories(selectedCategories);
    console.log('Selected Categories:', selectedCategories);
  };

  const getRandomItem = (category: any): Item => {
    const { title, key, data } = category;
    const randomIndex = Math.floor(Math.random() * data.length);
    const randomData = data[randomIndex];
    return {
      title: `${title}`,
      catItemId: key,
      topic: randomData[locale],
      content: randomData.content
    };
  };

  const generateRandomItems = () => {
    const items: Item[] = [];
    for (const key in cardData) {
      if (cardData.hasOwnProperty(key)) {
        const category = cardData[key];
        items.push(getRandomItem(category));
      }
    }
    const newRandomItems = items.map((item) => {
      if (lockItem.includes(item.catItemId)) {
        // If the item's catItemId is in lockItem array, return the original item
        const originalItem = randomItems.find((randomItem) => randomItem.catItemId === item.catItemId);
        return originalItem ? originalItem : item;
      } else {
        return item;
      }
    });
    setRandomItems(newRandomItems);
  };

  const generateRandomEachItem = (key:string) => {
    const category = cardData[key];
    const item = getRandomItem(category);
    const newRandomItems = randomItems.map((randomItem) => {
      if (randomItem.catItemId === key) {
        const newItem = lockItem.includes(key) ? randomItem : item;
        return newItem ? newItem : randomItem;
      }
      return randomItem;
    });
    setRandomItems(newRandomItems);
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

  useEffect(() => {
    const items: Item[] = [];
    for (const key in cardData) {
      if (cardData.hasOwnProperty(key)) {
        const category = cardData[key];
        items.push(getRandomItem(category));
      }
    }
    setRandomItems(items);
  }, []);



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
          <p className={styles.HeaderCatContainerText}>
            {subCategory.map((subCat, index) => (
              searchParamsInfo === subCat.catItemId ? subCat.name : ''
            ))}
          </p>
          <IconBtn onClick={()=>generateRandomItems()}/>
        </div>
        <TagFilter noneSelected={false} defaultSelectedCategories={defaultSelectedCategories} categories={filterCategory} onFilterChange={handleFilterChange} />
        <div className={styles.CardItemsContainer}>
          {randomItems
            .filter(cardItem => filteredCategories.includes(cardItem.catItemId))
            .map((cardItem, index) => (
              <ExpandCard
                key={index}
                itemKey={cardItem.catItemId}
                title={cardItem.title}
                headingContent={cardItem.topic}
                content={cardItem.content} 
                onClick={() => generateRandomEachItem(cardItem.catItemId)}
                lock={lockContent} // Pass lockContent as prop to ExpandCard
                onLockContentChange={handleLockContentChange} // Pass the function to update lockContent
                />
            ))}
        </div>
      </main>
    </TranslationsProvider>
  );
}
