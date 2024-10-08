'use client';
import React, { useState, useEffect,useRef } from 'react';
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import { usePathname } from 'next/navigation';
import { Quicksand, Mitr } from "next/font/google";
import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ReactPlayer from 'react-player';
import Link from 'next/link'
import initTranslations from './i18n';
import Image from 'next/image'
import TranslationsProvider from '@/components/TranslationsProvider';
import MainNavigationTopBar from '@/components/NavigationBar/MainNavigationTopBar';
import PageFooter from '@/components/Footer/PageFooter';
import mainLoad from '@/public/json/mainload.json';
import videoPlay from '@/public/json/videoPlay.json';
import teamwork from '@/public/json/teamwork.json';
import PotionIcon from '@/public/svgs/home/potion';
import BookIcon from '@/public/svgs/home/book';
import GiftBoxIcon from '@/public/svgs/home/giftBox';
import TargetArrowIcon from '@/public/svgs/home/targetArrow';
import GroupPplIcon from '@/public/svgs/home/groupPpl';
import JigsawIcon from '@/public/svgs/home/jigsaw';
import LetterIcon from '@/public/svgs/home/letter';
import FacebookIcon from '@/public/svgs/home/facebook';
import InstagramIcon from '@/public/svgs/home/instagram';
import SiteLogo from "@/public/svgs/siteLogo";
import styles from "./../Styles/Home/page.module.css";


const i18nNamespaces = ['homeScreen'];
const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"]
});
const mitr = Mitr({
  subsets: ["thai"],
  weight: ["200", "300", "400", "500", "600", "700"]
});

gsap.registerPlugin(ScrollTrigger);

export default function Home({ params: { locale } }: { params: { locale: string } }) {
  const [t, setT] = useState<any>(null);
  const [resources, setResources] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [scrollY, setScrollY] = useState(0);
  const [presentPlaying, setPresentPlaying] = useState(false);

  const presentPlayerRef = useRef(null);
  const titleRef = useRef(null);
  const cardRef = useRef(null);
  const card2Ref = useRef(null);
  
  const currentPathname = usePathname();

  const togglePlayPresentVideo = () => {
    setPresentPlaying(!presentPlaying);
  };

  const handleScroll = (e: Event) => {
    const target = e.target as HTMLDivElement;
    // console.log(target.scrollTop);
  }
  
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true, capture: true});
    return () => {
       window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  useEffect(() => {
    // Title animation
    gsap.from(titleRef.current, {
      duration: 1,
      y: -20,
      opacity: 0,
      ease: 'power3.out',
      markers: true,
    });
    // Card animation
    gsap.from(cardRef.current, {
      duration: 1,
      y: -20,
      opacity: 0,
      ease: 'power3.out',
      markers: true,
    });
    gsap.from(card2Ref.current, {
      duration: 1,
      y: 20,
      opacity: 0,
      ease: 'power3.out',
      markers: true,
    });
    
  }, [loading]);

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
  }

  

  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}>
      <MainNavigationTopBar locale={locale} />
      <main className={styles.main}>
        <section className={`${styles.section} ${styles.parallaxSection}`}>
          <div className={styles.textContainer}>
            <p className={styles.title}>THINK<span>TOOL</span></p>
            <p className={`${styles.subtitle} ${locale == 'th' ? `${mitr.className} ${styles.thfontbold}` : null}`}>{t('section.parallaxSection.subtitle')}</p>
            <p ref={titleRef} className={styles.details}>Random | Brainstorm | Spark your ideas</p>
          </div>
          <div className={styles.cardsContainer}>
            <div ref={cardRef} className={`${styles.cardParallax} ${styles.cardColor} ${styles.cardRotate1}`}>
              <div className={styles.cardTopicContainer}>
                <p className={styles.cardTopic}>Story</p>
                <p className={styles.cardTopic}>Builder</p>
              </div>
              <p className={styles.cardDetail}>A versatile online tool and physical card deck that make learning more fun and challenging than before</p>
            </div>
            <div ref={card2Ref} className={`${styles.cardParallax} ${styles.cardClear} ${styles.cardRotate2}`}>
              <div className={styles.cardTopicContainer}>
                <p className={styles.cardTopic}>Innovation</p>
                <p className={styles.cardTopic}>Design</p>
              </div>
              <p className={styles.cardDetail}>A versatile online tool and physical card deck that make learning more fun and challenging than before</p>
            </div>
          </div>
        </section>
        <section className={`${styles.section} ${styles.gradientSection}`}>
          <div className={styles.textContainer}>
            <p className={styles.title}>A magical tool is designed for you</p>
            <p className={`${styles.subtitle} ${locale == 'th' ? `${mitr.className}` : null}`}>{t('section.gradientSection.subtitle')}</p>
          </div>
          <div className={styles.itemsContainer}>
            <div className={styles.item}>
              <div className={styles.itemIcon}>
                <PotionIcon className={styles.icon} />
              </div>
              <div className={styles.itemData}>
                <p className={styles.itemTitle}>{t('section.gradientSection.item.item1.title')}</p>
                <p className={`${styles.itemDetail} ${locale == 'th' ? `${mitr.className} ${styles.thfontlight}` : null}`}>{t('section.gradientSection.item.item1.description1')}</p>
                <p className={`${styles.itemDetail} ${locale == 'th' ? `${mitr.className} ${styles.thfontlight}` : null}`}>{t('section.gradientSection.item.item1.description2')}</p>
                <p className={`${styles.itemDetail} ${locale == 'th' ? `${mitr.className} ${styles.thfontlight}` : null}`}>{t('section.gradientSection.item.item1.description3')}</p>
                <p className={`${styles.itemDetail} ${locale == 'th' ? `${mitr.className} ${styles.thfontlight}` : null}`}>{t('section.gradientSection.item.item1.description4')}</p>
              </div>
            </div>
            <div className={styles.item}>
              <div className={styles.itemIcon} style={{ transform: 'translate(-10%, -10%) rotate(50deg)' }}>
                <BookIcon className={styles.icon} />
              </div>
              <div className={styles.itemData}>
                <p className={styles.itemTitle}>{t('section.gradientSection.item.item2.title')}</p>
                <p className={`${styles.itemDetail} ${locale == 'th' ? `${mitr.className} ${styles.thfontlight}` : null}`}>{t('section.gradientSection.item.item2.description1')}</p>
                <p className={`${styles.itemDetail} ${locale == 'th' ? `${mitr.className} ${styles.thfontlight}` : null}`}>{t('section.gradientSection.item.item2.description2')}</p>
                <p className={`${styles.itemDetail} ${locale == 'th' ? `${mitr.className} ${styles.thfontlight}` : null}`}>{t('section.gradientSection.item.item2.description3')}</p>
                <p className={`${styles.itemDetail} ${locale == 'th' ? `${mitr.className} ${styles.thfontlight}` : null}`}>{t('section.gradientSection.item.item2.description4')}</p>
              </div>

            </div>
            <div className={styles.item}>
              <div className={styles.itemIcon}>
                <GiftBoxIcon className={styles.icon} width={'80%'} height={'80%'} />
              </div>
              <div className={styles.itemData}>
                <p className={styles.itemTitle}>{t('section.gradientSection.item.item3.title')}</p>
                <p className={`${styles.itemDetail} ${locale == 'th' ? `${mitr.className} ${styles.thfontlight}` : null}`}>{t('section.gradientSection.item.item3.description1')}</p>
                <p className={`${styles.itemDetail} ${locale == 'th' ? `${mitr.className} ${styles.thfontlight}` : null}`}>{t('section.gradientSection.item.item3.description2')}</p>
                <p className={`${styles.itemDetail} ${locale == 'th' ? `${mitr.className} ${styles.thfontlight}` : null}`}>{t('section.gradientSection.item.item3.description3')}</p>
                <p className={`${styles.itemDetail} ${locale == 'th' ? `${mitr.className} ${styles.thfontlight}` : null}`}>{t('section.gradientSection.item.item3.description4')}</p>
              </div>
            </div>
          </div>
        </section>
        <section className={`${styles.section} ${styles.whiteSection}`}>
          <div className={styles.itemsContainer}>
            {/* <div className={styles.itemIcon}>
              <Player
                autoplay
                loop
                src={teamwork}
              >
              </Player>
            </div> */}
            <div className={styles.videoContainer}>
              <div className={styles.videoBox}>
              <ReactPlayer
                ref={presentPlayerRef}
                url='https://thinktool.s3.ap-southeast-2.amazonaws.com/presentvid01.mp4'
                playing={presentPlaying}
                onPause={()=>setPresentPlaying(false)}
                controls={presentPlaying}
                width='100%'
                height='auto'
                style={{display: 'flex'}}
              />
              {!presentPlaying && (
                <div className={styles.customPlayButton} onClick={togglePlayPresentVideo}>
                   <Player
                    autoplay
                    loop
                    src={videoPlay}
                    style={{ width: '22vh' }}
                  >
                  </Player>
                </div>
              )}
              </div>
            </div>
            <div className={styles.itemData}>
              <p className={styles.itemTitle}>Think-throughs cards</p>
              <p className={`${styles.itemSubTitle} ${locale == 'th' ? `${mitr.className} ${styles.thfontlight}` : null}`}>{t('section.whiteSection.subtitle')}</p>

              {
                locale && locale == 'en' ? (<>
                  <p className={`${styles.itemDetail}`}>
                    {t('section.whiteSection.itemDetail1')}
                  </p>
                  <p className={`${styles.itemDetail}`}>
                    {t('section.whiteSection.specialText.the')} <b>{t('section.whiteSection.specialText.thinkTool')}</b> {t('section.whiteSection.itemDetail2')}
                  </p>
                </>) : (
                  <>
                    <p className={`${styles.itemDetail} ${mitr.className} ${styles.thfontlight}`}>
                      {t('section.whiteSection.specialText.the')} <b className={`${quicksand.className}`}>{t('section.whiteSection.specialText.thinkTool')}</b> {t('section.whiteSection.itemDetail1')}
                    </p>
                    <p className={`${styles.itemDetail} ${mitr.className} ${styles.thfontlight}`}>
                      {t('section.whiteSection.itemDetail2')}
                    </p>
                  </>
                )
              }
            </div>
          </div>
        </section>
        <section className={`${styles.section} ${styles.stepSection}`}>
          <div className={styles.itemsContainer}>
            <div className={styles.item}>
              <div className={styles.itemHeader}>
                <p className={styles.itemHeaderText}>{t('section.stepSection.step1.title')}</p>
                <p className={`${styles.itemHeaderDetail} ${locale == 'th' ? `${mitr.className} ${styles.thfontlight}` : null}`}>{t('section.stepSection.step1.description1')}</p>
                <p className={`${styles.itemHeaderDetail} ${locale == 'th' ? `${mitr.className} ${styles.thfontlight}` : null}`}>{t('section.stepSection.step1.description2')}</p>
              </div>
              <div className={styles.itemContent}>
                <Image className={styles.image} src={`/image/step1${locale}.png`} width={300} height={300} alt='' />
              </div>
            </div>
            <div className={styles.item}>
              <div className={styles.itemHeader}>
                <p className={styles.itemHeaderText}>{t('section.stepSection.step2.title')}</p>
                <p className={`${styles.itemHeaderDetail} ${locale == 'th' ? `${mitr.className} ${styles.thfontlight}` : null}`}>{t('section.stepSection.step2.description1')}</p>
                <p className={`${styles.itemHeaderDetail} ${locale == 'th' ? `${mitr.className} ${styles.thfontlight}` : null}`}>{t('section.stepSection.step2.description2')}</p>
              </div>
              <div className={styles.itemContent}>
                <Image className={styles.image} src={`/image/step2${locale}.png`} width={300} height={300} alt='' />
              </div>
            </div>
            <div className={styles.item}>
              <div className={styles.itemHeader}>
                <p className={styles.itemHeaderText}>{t('section.stepSection.step3.title')}</p>
                <p className={`${styles.itemHeaderDetail} ${locale == 'th' ? `${mitr.className} ${styles.thfontlight}` : null}`}>{t('section.stepSection.step3.description1')}</p>
                <p className={`${styles.itemHeaderDetailSm} ${locale == 'th' ? `${mitr.className} ${styles.thfontlight}` : null}`}>{t('section.stepSection.step3.description2')}</p>
              </div>
              <div className={styles.itemContent}>
                <Image className={styles.image} src={`/image/step3${locale}.png`} width={300} height={300} alt='' />
              </div>
            </div>
          </div>
        </section>
        <section className={`${styles.section} ${styles.outcomeSection}`}>
          <div className={styles.itemsContainer}>
            <div className={styles.itemData}>
              <p className={styles.itemTitle}>Final Outcome</p>
              <p className={`${styles.itemSubTitle} ${locale == 'th' ? `${mitr.className} ${styles.thfontbold}` : null}`}>{t('section.outcomeSection.subtitle')}</p>
              <p className={`${styles.itemSubTitle} ${locale == 'th' ? `${mitr.className} ${styles.thfontbold}` : null}`}>{t('section.outcomeSection.subtitle2')}</p>
              <p className={`${styles.itemDetail} ${locale == 'th' ? `${mitr.className} ${styles.thfontbold}` : null}`}>
                {t('section.outcomeSection.detail')}
              </p>
            </div>
            <div className={styles.itemImage}>
              <div className={styles.itemFrame} style={{ transform: 'translate(0%, 0%) rotate(5deg)' }}>
                <Image className={styles.image} src="/image/product1.jpg" width={200} height={200} alt='' />
              </div>
            </div>
          </div>
        </section>
        <section className={`${styles.section} ${styles.colorSection}`}>
          <div className={styles.itemsContainer}>
            <div className={styles.item}>
              <div className={styles.itemIcon}>
                <TargetArrowIcon width={65} height={65} />
              </div>
              <div className={styles.itemHeader}>
                <p className={`${styles.itemHeaderText} ${locale == 'th' ? `${mitr.className} ${styles.thfontbold}` : null}`}>{t('section.colorSection.item1.title')}</p>
                <p className={`${styles.itemHeaderDetail} ${locale == 'th' ? `${mitr.className}` : null}`}>{t('section.colorSection.item1.description1')}</p>
                <p className={`${styles.itemHeaderDetail} ${locale == 'th' ? `${mitr.className}` : null}`}>{t('section.colorSection.item1.description2')}</p>
                <p className={`${styles.itemHeaderDetail} ${locale == 'th' ? `${mitr.className}` : null}`}>{t('section.colorSection.item1.description3')}</p>
                <p className={`${styles.itemHeaderDetail} ${locale == 'th' ? `${mitr.className}` : null}`}>{t('section.colorSection.item1.description4')}</p>
              </div>
            </div>
            <div className={styles.item}>
              <div className={styles.itemIcon}>
                <GroupPplIcon width={65} height={65} />
              </div>
              <div className={styles.itemHeader}>
                <p className={`${styles.itemHeaderText} ${locale == 'th' ? `${mitr.className} ${styles.thfontbold}` : null}`}>{t('section.colorSection.item2.title')}</p>
                <p className={`${styles.itemHeaderDetail} ${locale == 'th' ? `${mitr.className}` : null}`}>{t('section.colorSection.item2.description1')}</p>
                <p className={`${styles.itemHeaderDetail} ${locale == 'th' ? `${mitr.className}` : null}`}>{t('section.colorSection.item2.description2')}</p>
                <p className={`${styles.itemHeaderDetail} ${locale == 'th' ? `${mitr.className}` : null}`}>{t('section.colorSection.item2.description3')}</p>
                <p className={`${styles.itemHeaderDetail} ${locale == 'th' ? `${mitr.className}` : null}`}>{t('section.colorSection.item2.description4')}</p>
              </div>
            </div>
            <div className={styles.item}>
              <div className={styles.itemIcon}>
                <JigsawIcon width={65} height={65} />
              </div>
              <div className={styles.itemHeader}>
                <p className={`${styles.itemHeaderText} ${locale == 'th' ? `${mitr.className} ${styles.thfontbold}` : null}`}>{t('section.colorSection.item3.title')}</p>
                <p className={`${styles.itemHeaderDetail} ${locale == 'th' ? `${mitr.className}` : null}`}>{t('section.colorSection.item3.description1')}</p>
                <p className={`${styles.itemHeaderDetail} ${locale == 'th' ? `${mitr.className}` : null}`}>{t('section.colorSection.item3.description2')}</p>
                <p className={`${styles.itemHeaderDetail} ${locale == 'th' ? `${mitr.className}` : null}`}>{t('section.colorSection.item3.description3')}</p>
                <p className={`${styles.itemHeaderDetail} ${locale == 'th' ? `${mitr.className}` : null}`}>{t('section.colorSection.item3.description4')}</p>
              </div>
            </div>
          </div>
        </section>
        <section className={`${styles.section} ${styles.toolsSection}`}>
          <div className={styles.textContainer}>
            <p className={styles.title}>A series of Think Tools</p>
            <p className={`${styles.subtitle} ${locale == 'th' ? `${mitr.className}` : null}`}>{t('section.toolsSection.subtitle')}</p>
          </div>
          <div className={styles.itemsContainer}>
            <div className={styles.item}>
              <Link
                href={{ pathname: `innovationandbusiness/innovationboard`, query: { info: 'innodesign' } }}
                className='toolsSectionInnoDesignLink'
              >
                <div className={styles.itemImage}>
                  <Image className={styles.image} src="/image/inno_card.png" width={300} height={300} alt='' />
                </div>
              </Link>

              <div className={styles.itemData}>
                <p className={styles.itemTitle}>{t('section.toolsSection.item.item1.title')}</p>
                <p className={`${styles.itemDetail} ${locale == 'th' ? `${mitr.className} ${styles.thfontbold}` : null}`}>{t('section.toolsSection.item.item1.description1')}</p>
                <p className={`${styles.itemDetail} ${locale == 'th' ? `${mitr.className} ${styles.thfontbold}` : null}`}>{t('section.toolsSection.item.item1.description2')}</p>
                <p className={`${styles.itemDetail} ${locale == 'th' ? `${mitr.className} ${styles.thfontbold}` : null}`}>{t('section.toolsSection.item.item1.description3')}</p>
                <p className={`${styles.itemDetail} ${locale == 'th' ? `${mitr.className} ${styles.thfontbold}` : null}`}>{t('section.toolsSection.item.item1.description4')}</p>
              </div>
            </div>
            <div className={styles.item}>
              <Link
                href={{ pathname: `storydesign/storyboard`, query: { info: 'storydesign' } }}
                className='toolsSectionStoryDesignLink'
              >
                <div className={styles.itemImage}>
                  <Image className={styles.image} src="/image/story_card.png" width={300} height={300} alt='' />
                </div>
              </Link>
              <div className={styles.itemData}>
                <p className={styles.itemTitle}>{t('section.toolsSection.item.item2.title')}</p>
                <p className={`${styles.itemDetail} ${locale == 'th' ? `${mitr.className} ${styles.thfontbold}` : null}`}>{t('section.toolsSection.item.item2.description1')}</p>
                <p className={`${styles.itemDetail} ${locale == 'th' ? `${mitr.className} ${styles.thfontbold}` : null}`}>{t('section.toolsSection.item.item2.description2')}</p>
                <p className={`${styles.itemDetail} ${locale == 'th' ? `${mitr.className} ${styles.thfontbold}` : null}`}>{t('section.toolsSection.item.item2.description3')}</p>
                <p className={`${styles.itemDetail} ${locale == 'th' ? `${mitr.className} ${styles.thfontbold}` : null}`}>{t('section.toolsSection.item.item2.description4')}</p>
              </div>
            </div>
            <div className={styles.item}>
              <Link
                href={{ pathname: `edudesign/educationboard`, query: { info: 'edudesign' } }}
                className='toolsSectionEduDesignLink'
              >
                <div className={styles.itemImage}>
                  <Image className={styles.image} src="/image/edu_card.png" width={300} height={300} alt='' />
                </div>
              </Link>
              <div className={styles.itemData}>
                <p className={styles.itemTitle}>{t('section.toolsSection.item.item3.title')}</p>
                <p className={`${styles.itemDetail} ${locale == 'th' ? `${mitr.className} ${styles.thfontbold}` : null}`}>{t('section.toolsSection.item.item3.description1')}</p>
                <p className={`${styles.itemDetail} ${locale == 'th' ? `${mitr.className} ${styles.thfontbold}` : null}`}>{t('section.toolsSection.item.item3.description2')}</p>
                <p className={`${styles.itemDetail} ${locale == 'th' ? `${mitr.className} ${styles.thfontbold}` : null}`}>{t('section.toolsSection.item.item3.description3')}</p>
                <p className={`${styles.itemDetail} ${locale == 'th' ? `${mitr.className} ${styles.thfontbold}` : null}`}>{t('section.toolsSection.item.item3.description4')}</p>
              </div>
            </div>
          </div>
        </section>
        <section className={`${styles.section} ${styles.teamSection}`}>
        <div className={styles.textContainer}>
            <SiteLogo width={50} height={50} color={'#ffffff'} />
            <p className={styles.title}>Think throughs team</p>
          </div>
          <div className={styles.itemsContainer}>
            <div className={styles.item}>
              <div className={styles.itemImage}>
                <div className={styles.itemFrame} style={{ width: 250 }}>
                  <Image className={styles.image} src="/image/team/natchaya.jpg" width={250} height={250} alt='' />
                </div>
              </div>
              <div className={styles.itemData}>
              <p className={`${styles.itemTitle} ${locale == 'th' ? `${mitr.className} ${styles.thfontbold}` : null}`}>{t('section.teamSection.item.item2.title')}</p>
                <p className={`${styles.itemDetail} ${locale == 'th' ? `${mitr.className} ${styles.thfontbold}` : null}`}>{t('section.teamSection.item.item2.description1')}</p>
                <p className={`${styles.itemDetail} ${locale == 'th' ? `${mitr.className} ${styles.thfontbold}` : null}`}>{t('section.teamSection.item.item2.description2')}</p>
                <p className={`${styles.itemDetail} ${locale == 'th' ? `${mitr.className} ${styles.thfontbold}` : null}`}>{t('section.teamSection.item.item2.description3')}</p>
              </div>
            </div>
            <div className={styles.item}>
              <div className={styles.itemImage}>
                <div className={styles.itemFrame} style={{ width: 250 }}>
                  <Image className={styles.image} src="/image/team/tada.jpg" width={250} height={250} alt='' />
                </div>
              </div>
              <div className={styles.itemData}>
                <p className={`${styles.itemTitle} ${locale == 'th' ? `${mitr.className} ${styles.thfontbold}` : null}`}>{t('section.teamSection.item.item1.title')}</p>
                <p className={`${styles.itemDetail} ${locale == 'th' ? `${mitr.className} ${styles.thfontbold}` : null}`}>{t('section.teamSection.item.item1.description1')}</p>
                <p className={`${styles.itemDetail} ${locale == 'th' ? `${mitr.className} ${styles.thfontbold}` : null}`}>{t('section.teamSection.item.item1.description2')}</p>
              </div>
            </div>
          </div>
        </section>
        <section className={`${styles.section} ${styles.footerSection}`}>
          <PageFooter locale={locale}/>  
        </section>
      </main>
    </TranslationsProvider >
  );
}
