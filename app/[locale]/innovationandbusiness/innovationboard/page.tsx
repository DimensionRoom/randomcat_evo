'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { Kanit, Quicksand, Mitr, Poppins } from "next/font/google";
import initTranslations from '../../i18n';
import Link from 'next/link'
import styles from "../../../Styles/InnovationBoard/page.module.css";
import manivigationStyles from '../../../../components/NavigationBar/MainNavigationTopBar.module.css';

import TranslationsProvider from '@/components/TranslationsProvider';
import IconBtn from '@/components/Button/IconBtn/IconBtn';
import FlatBtn from '@/components/Button/FlatBtn/FlatBtn';
import PhysicalCard from '@/components/Card/PhysicalCard/PhysicalCard';
import HorizonCard from '@/components/Card/HorizonCard/HorizonCard';
import mainLoad from '../../../../public/json/mainload.json';
import TagFilter from '@/components/Filter/TagFilter/TagFilter';
import PointerIcon from '@/public/svgs/innovationboard/pointer';
import LightbulbIcon from '@/public/svgs/innovationboard/lightbulb';
import RocketIcon from '@/public/svgs/innovationboard/rocket';
import SiteLogo from "@/public/svgs/siteLogo";

import innodesisgnData from '../../../../public/json/innodesignCat.json';

export type SubCategoryProps = {
  name: string
  nameEx: string
  fullDescription: string
  catItemId: string
}

type JSONData = {
  [key: string]: any;
};

interface Item {
  title: string;
  subTitle: string;
  catItemId: string;
  topic: string;
  content: string;
}
interface Category {
  title: string;
  key: string;
  data: { th: string; en: string; content_th: string; content_en: string }[];
}

const i18nNamespaces = ['innovationboard'];
const kanit = Kanit({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
});
const popins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
});
const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"]
});
const mitr = Mitr({
  subsets: ["thai"],
  weight: ["200", "300", "400", "500", "600", "700"]
});
export default function InnovationBoard({ params: { locale } }: { params: { locale: string } }) {
  const [t, setT] = useState<any>(null);
  const searchParams = useSearchParams()
  const searchParamsInfo = searchParams.get('info')
  const [resources, setResources] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [subCategory, setSubCategory] = useState<SubCategoryProps[]>([
    {
      name: 'Innovation',
      nameEx: 'Design',
      fullDescription: '"Unleash your creativity with ThinkTool."',
      catItemId: 'innodesign'
    },
    {
      name: 'Gamification for biz',
      nameEx: 'for biz',
      fullDescription: 'Design your own gamification',
      catItemId: 'gamification'
    }
  ]);
  const fullCategoryName = subCategory.map((subCat) => {
    // searchParamsInfo === subCat.catItemId ? subCat.name : ''
    if (searchParamsInfo === subCat.catItemId) {
      return subCat.name + ' ' + subCat.nameEx
    }
  });
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const physicalRefs = useRef<(HTMLDivElement | null)[]>([]);

  const extractMainKeys = (jsonData: JSONData): string[] => {
    return Object.keys(jsonData);
  };
  const mainKeys = extractMainKeys(innodesisgnData);
  const cardData: { [key: string]: Category } = innodesisgnData;
  const [filterCategory, setFilterCategory] = useState<string[]>(mainKeys);
  const [defaultSelectedCategories, setDefaultSelectedCategories] = useState<string[]>(mainKeys)
  const [filteredCategories, setFilteredCategories] = useState<string[]>(mainKeys);
  const [randomItems, setRandomItems] = useState<Item[]>([]);
  const [lockItem, setLockItem] = useState<string[]>([]);
  const [flippedCards, setFlippedCards] = useState<number>(0);
  const [flippedPhysicalCards, setFlippedPhysicalCards] = useState<number>(0);


  const handleLockContentChange = (catItemId: string, newLockContent: boolean) => {
    if (newLockContent) {
      setLockItem([...lockItem, catItemId]);
    } else {
      setLockItem(lockItem.filter(item => item !== catItemId));
    }
  };

  const handleFilterChange = (selectedCategories: string[]) => {
    setFilteredCategories(selectedCategories);
    console.log('Selected Categories:', selectedCategories);
  };

  const getRandomItem = (category: any): Item => {
    const { title, subTitle, key, data } = category;
    const randomIndex = Math.floor(Math.random() * data.length);
    const randomData = data[randomIndex];
    return {
      title: `${title}`,
      subTitle: `${subTitle}`,
      catItemId: key,
      topic: randomData[locale],
      content: `${randomData[`content_${locale}`]}`
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
        const originalItem = randomItems.find((randomItem) => randomItem.catItemId === item.catItemId);
        return originalItem ? originalItem : item;
      } else {
        return item;
      }
    }).filter(item => item !== undefined) as Item[];
    setRandomItems(newRandomItems);
    if (flippedCards == 0 || flippedPhysicalCards == 0) {
      trigerCardClick();
    }
  };

  const trigerCardClick = () => {
    cardRefs.current.forEach((ref, index) => {
      setTimeout(() => {
        if (ref) {
          ref.click();
        }
      }, index * 150);
    });
    physicalRefs.current.forEach((ref, index) => {
      setTimeout(() => {
        if (ref) {
          ref.click();
        }
      }, index * 150);
    });
  }


  const generateRandomEachItem = (key: string) => {
    const category = cardData[key];
    const item = getRandomItem(category);
    const newRandomItems = randomItems.map((randomItem) => {
      if (randomItem.catItemId === key) {
        return lockItem.includes(key) ? randomItem : item;
      }
      return randomItem;
    });
    setRandomItems(newRandomItems);
  };



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
    return <div style={{ display: 'flex', flex: 1, height: 'calc(100vh - 80px)', justifyContent: 'center', alignItems: 'center' }}>
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
      <div className={`${manivigationStyles.MobileHeader}`}>
        <header className={`${manivigationStyles.LayoutHeader} ${manivigationStyles['ThemeBlue']}`}>
          <div className={manivigationStyles.HeaderTopContainer}>
            <Link href="/" className={styles.textLink}>
              <div className={manivigationStyles.BrandContainer}>
                <div className={manivigationStyles.LogoContainer}>
                  <SiteLogo />
                </div>
              </div>
            </Link>
          </div>
          <div className={manivigationStyles.HeaderMinorContainer}>
            <div className={manivigationStyles.HeaderDetailsContainer}>
              <p className={`${manivigationStyles.HeaderDetailsTitle} ${popins.className}`}>
                Inno
                <span className={manivigationStyles.HeaderDetailsTitleEx}>
                  Design
                </span>
              </p>
              <p className={manivigationStyles.HeaderDetailsDescription}>
                Design your own innovation
              </p>
            </div>
            <div className={manivigationStyles.HeaderActionContainer}>
              <FlatBtn className={`${styles.randomAllMobileBtn}`} text='Random' onClick={() => generateRandomItems()} />
            </div>
          </div>
        </header>
      </div>
      <main className={styles.main}>
        <div className={styles.HeaderSection}>
          <div className={styles.HeaderCatContainer}>
            <p className={`${styles.HeaderCatContainerText} ${popins.className}`}>
              {subCategory.map((subCat) => (
                searchParamsInfo === subCat.catItemId ? subCat.name.toUpperCase() : ''
              ))}
            </p>
            <p className={`${styles.HeaderCatContainerText} ${popins.className}`}>
              {subCategory.map((subCat) => (
                searchParamsInfo === subCat.catItemId ? subCat.nameEx.toUpperCase() : ''
              ))}
            </p>
          </div>
          <div className={styles.HeaderCatDescContainer}>
            <p className={`${styles.HeaderCatContainerDescText}`}>
              {subCategory.map((subCat) => (
                searchParamsInfo === subCat.catItemId ? subCat.fullDescription : ''
              ))}
            </p>
            <FlatBtn className={`${styles.randomAllBtn}`} text='Random' onClick={() => generateRandomItems()} />
          </div>
        </div>
        <div className={styles.randomSection}>
          <div className={styles.CardItemsContainer}>
            {randomItems
              .filter(cardItem => filteredCategories.includes(cardItem.catItemId))
              .map((cardItem, index) => (
                <PhysicalCard
                  key={index}
                  ref={(el) => physicalRefs.current[index] = el}
                  itemKey={cardItem.catItemId}
                  color={'ThemeBlue'}
                  locale={locale}
                  title={cardItem.title}
                  subTitle={cardItem.subTitle}
                  categoryName={fullCategoryName[0]}
                  headingContent={cardItem.topic}
                  content={cardItem.content}
                  setFlippedCards={setFlippedPhysicalCards}
                  onClick={() => generateRandomEachItem(cardItem.catItemId)}
                  lock={lockItem.includes(cardItem.catItemId)}
                  delay={index * 200}
                  onLockContentChange={(key, newLockContent) => handleLockContentChange(cardItem.catItemId, newLockContent)}
                />
              ))}
          </div>
          <div className={styles.CardHorizonContainer}>
            {randomItems
              .filter(cardItem => filteredCategories.includes(cardItem.catItemId))
              .map((cardItem, index) => (
                <HorizonCard
                  key={index}
                  ref={(el) => cardRefs.current[index] = el}
                  itemKey={cardItem.catItemId}
                  className={'ThemeBlue'}
                  locale={locale}
                  title={cardItem.title}
                  subTitle={cardItem.subTitle}
                  headingContent={cardItem.topic}
                  content={cardItem.content}
                  setFlippedCards={setFlippedCards}
                  onClick={() => generateRandomEachItem(cardItem.catItemId)}
                  lock={lockItem.includes(cardItem.catItemId)}
                  onLockContentChange={(key, newLockContent) => handleLockContentChange(cardItem.catItemId, newLockContent)}
                />
              ))}
          </div>
        </div>
        <div className={styles.stepSection}>
          <div className={styles.itemsContainer}>
            <div className={styles.item}>
              <div className={styles.itemIcon}>
                <PointerIcon width={65} height={65} />
              </div>
              <div className={styles.itemHeader}>
                <p className={`${styles.itemHeaderText}`}>{t('section.stepSection.item1.title')}</p>
                <p className={`${styles.itemHeaderDetail} ${locale == 'th' ? `${mitr.className}` : null}`}>{t('section.stepSection.item1.description1')}</p>
                <p className={`${styles.itemHeaderDetail} ${locale == 'th' ? `${mitr.className}` : null}`}>{t('section.stepSection.item1.description2')}</p>
              </div>
            </div>
            <div className={styles.item}>
              <div className={styles.itemIcon}>
                <LightbulbIcon width={65} height={65} />
              </div>
              <div className={styles.itemHeader}>
                <p className={`${styles.itemHeaderText}`}>{t('section.stepSection.item2.title')}</p>
                <p className={`${styles.itemHeaderDetail} ${locale == 'th' ? `${mitr.className}` : null}`}>{t('section.stepSection.item2.description1')}</p>
                <p className={`${styles.itemHeaderDetail} ${locale == 'th' ? `${mitr.className}` : null}`}>{t('section.stepSection.item2.description2')}</p>
              </div>
            </div>
            <div className={styles.item}>
              <div className={styles.itemIcon}>
                <RocketIcon width={65} height={65} />
              </div>
              <div className={styles.itemHeader}>
                <p className={`${styles.itemHeaderText}`}>{t('section.stepSection.item3.title')}</p>
                <p className={`${styles.itemHeaderDetail} ${locale == 'th' ? `${mitr.className}` : null}`}>{t('section.stepSection.item3.description1')}</p>
                <p className={`${styles.itemHeaderDetail} ${locale == 'th' ? `${mitr.className}` : null}`}>{t('section.stepSection.item3.description2')}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </TranslationsProvider>
  );
}
