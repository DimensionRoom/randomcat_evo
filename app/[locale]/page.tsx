'use client';
import React, { useState, useEffect,useRef } from 'react';
import { Controls } from '@lottiefiles/react-lottie-player';
import LottiePlayer from "@/components/Loading/LottiePlayer";
import { usePathname } from 'next/navigation';

import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ReactPlayer from 'react-player';
import Link from 'next/link'
import initTranslations from './i18n';
import ImageWithSkeleton from '@/components/Media/ImageWithSkeleton/ImageWithSkeleton'
import TranslationsProvider from '@/components/TranslationsProvider';
import MainNavigationTopBar from '@/components/NavigationBar/MainNavigationTopBar';
import PageFooter from '@/components/Footer/PageFooter';
import mainLoad from '@/public/json/mainload.json';
import { useTranslations } from "@/hooks/useTranslations";
import AwardsMarquee from "@/components/Home/AwardsMarquee/AwardsMarquee";
import PageShell from "@/components/PageShell/PageShell";
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
import BackToTopBtn from '@/components/Button/BackToTopBtn/BackToTopBtn'
import PageLogger from '@/components/Logger/PageLogger/PageLogger';
import styles from "./../Styles/Home/page.module.css";
import { quicksand, mitr } from "@/lib/fonts";

const i18nNamespaces = ['homeScreen'];

export default function Home({ params: { locale } }: { params: { locale: string } }) {
  const { t, resources, ready } = useTranslations(locale, i18nNamespaces);
  const [presentPlaying, setPresentPlaying] = useState(false);
  const mainRef = useRef<HTMLElement>(null);
  const presentPlayerRef = useRef(null);
  const titleRef = useRef(null);
  const cardRef = useRef(null);
  const card2Ref = useRef(null);
  
  const currentPathname = usePathname();

  const togglePlayPresentVideo = () => {
    setPresentPlaying(!presentPlaying);
  };

  // const handleScroll = (e: Event) => {
  //   const target = e.target as HTMLDivElement;
  //   const tolerance = 5; 
    
  //   if (target.scrollTop + target.clientHeight >= target.scrollHeight - tolerance) {
  //     console.log('Reached the end of scroll with tolerance');
  //   }
  // };

  /**
   * Fades each section in the first time it scrolls into view.
   *
   * Kept deliberately cheap. This used to run on every scroll event: it
   * re-queried the DOM, measured every section (a forced layout each time), set
   * React state that nothing read, and started a fresh GSAP tween on sections
   * that were already revealed. That churn showed up as stutter in the
   * continuously animating awards band. Now it reads layout at most once per
   * frame, tweens each section exactly once, and unsubscribes for good once
   * they have all been revealed.
   */
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const revealed = new Set<Element>();
    let queued = false;

    const revealVisibleSections = () => {
      queued = false;
      const mainElement = mainRef.current;
      if (!mainElement) return;

      const sections = mainElement.querySelectorAll('section');
      const mainRect = mainElement.getBoundingClientRect();

      sections.forEach((section) => {
        // Skipping first means no layout is read for a section already shown.
        if (revealed.has(section)) return;

        // The section's top relative to the main element.
        const sectionTop = section.getBoundingClientRect().top - mainRect.top;

        if (sectionTop >= 0 && sectionTop <= mainElement.clientHeight) {
          revealed.add(section);
          gsap.to(section, { opacity: 1, y: 0, duration: 0.2, ease: 'power4.out' });
        }
      });

      if (sections.length > 0 && revealed.size === sections.length) {
        window.removeEventListener('scroll', handleScroll, { capture: true });
      }
    };

    // A declaration, not a const: revealVisibleSections refers to it above.
    function handleScroll() {
      if (queued) return;
      queued = true;
      requestAnimationFrame(revealVisibleSections);
    }

    // Catch anything already on screen before the first scroll.
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true, capture: true });
    return () => window.removeEventListener('scroll', handleScroll, { capture: true });
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
    
  }, [ready]);

  return (
    <PageShell
      locale={locale}
      namespaces={i18nNamespaces}
      resources={resources}
      ready={ready}
      loaderAnimation={mainLoad}
    >
      <MainNavigationTopBar locale={locale} fixed/>
      <PageLogger showVisits />
      <main ref={mainRef} className={styles.main}>
        <section id='parallaxSection' className={`${styles.section} ${styles.parallaxSection}`}>
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

        <AwardsMarquee
          locale={locale}
          title={t('section.awards.title')}
          subtitle={t('section.awards.subtitle')}
        />

        <section id='gradientSection' className={`${styles.section} ${styles.gradientSection}`}>
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
        <section id='whiteSection' className={`${styles.section} ${styles.animationSection} ${styles.whiteSection}`}>
          <div className={styles.itemsContainer}>
            {/* <div className={styles.itemIcon}>
              <LottiePlayer
                autoplay
                loop
                src={teamwork}
              >
              </LottiePlayer>
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
                   <LottiePlayer
                    autoplay
                    loop
                    src={videoPlay}
                    style={{ width: '22vh' }}
                  >
                  </LottiePlayer>
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
        <section id='stepSection' className={`${styles.section} ${styles.animationSection} ${styles.stepSection}`}>
          <div className={styles.itemsContainer}>
            <div className={styles.item}>
              <div className={styles.itemHeader}>
                <p className={styles.itemHeaderText}>{t('section.stepSection.step1.title')}</p>
                <p className={`${styles.itemHeaderDetail} ${locale == 'th' ? `${mitr.className} ${styles.thfontlight}` : null}`}>{t('section.stepSection.step1.description1')}</p>
                <p className={`${styles.itemHeaderDetail} ${locale == 'th' ? `${mitr.className} ${styles.thfontlight}` : null}`}>{t('section.stepSection.step1.description2')}</p>
              </div>
              <div className={styles.itemContent}>
                <ImageWithSkeleton responsive className={styles.image} src={`/image/step1${locale}.png`} width={300} height={300} alt='' />
              </div>
            </div>
            <div className={styles.item}>
              <div className={styles.itemHeader}>
                <p className={styles.itemHeaderText}>{t('section.stepSection.step2.title')}</p>
                <p className={`${styles.itemHeaderDetail} ${locale == 'th' ? `${mitr.className} ${styles.thfontlight}` : null}`}>{t('section.stepSection.step2.description1')}</p>
                <p className={`${styles.itemHeaderDetail} ${locale == 'th' ? `${mitr.className} ${styles.thfontlight}` : null}`}>{t('section.stepSection.step2.description2')}</p>
              </div>
              <div className={styles.itemContent}>
                <ImageWithSkeleton responsive className={styles.image} src={`/image/step2${locale}.png`} width={300} height={300} alt='' />
              </div>
            </div>
            <div className={styles.item}>
              <div className={styles.itemHeader}>
                <p className={styles.itemHeaderText}>{t('section.stepSection.step3.title')}</p>
                <p className={`${styles.itemHeaderDetail} ${locale == 'th' ? `${mitr.className} ${styles.thfontlight}` : null}`}>{t('section.stepSection.step3.description1')}</p>
                <p className={`${styles.itemHeaderDetailSm} ${locale == 'th' ? `${mitr.className} ${styles.thfontlight}` : null}`}>{t('section.stepSection.step3.description2')}</p>
              </div>
              <div className={styles.itemContent}>
                <ImageWithSkeleton responsive className={styles.image} src={`/image/step3${locale}.png`} width={300} height={300} alt='' />
              </div>
            </div>
          </div>
        </section>
        <section id='outcomeSection' className={`${styles.section} ${styles.animationSection} ${styles.outcomeSection}`}>
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
                <ImageWithSkeleton responsive className={styles.image} src="/image/product1.jpg" width={200} height={200} alt='' />
              </div>
            </div>
          </div>
        </section>
        <section id='colorSection' className={`${styles.section} ${styles.animationSection} ${styles.colorSection}`}>
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
        <section id='toolsSection' className={`${styles.section} ${styles.animationSection} ${styles.toolsSection}`}>
          <div className={styles.textContainer}>
            <p className={styles.title}>A series of Think Tools</p>
            <p className={`${styles.subtitle} ${locale == 'th' ? `${mitr.className}` : null}`}>{t('section.toolsSection.subtitle')}</p>
          </div>
          <div className={styles.itemsContainer}>
            <div className={styles.item}>
              {/* <Link
                href={{ pathname: `innovationandbusiness/innovationboard`, query: { info: 'innodesign' } }}
                className='toolsSectionInnoDesignLink'
              > */}
              <Link
                href={{ pathname: `onlinetools/creativityandbrainskills/innovationdesign`}}
                className='toolsSectionInnoDesignLink'
              >
                <div className={styles.itemImage}>
                  <ImageWithSkeleton responsive className={styles.image} src="/image/inno_card.png" width={300} height={300} alt='' />
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
                href={{ pathname: `onlinetools/creativityandbrainskills/storydesign`}}
                className='toolsSectionStoryDesignLink'
              >
                <div className={styles.itemImage}>
                  <ImageWithSkeleton responsive className={styles.image} src="/image/story_card.png" width={300} height={300} alt='' />
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
                href={{ pathname: `onlinetools/educationandparent/educationdesign`}}
                className='toolsSectionEduDesignLink'
              >
                <div className={styles.itemImage}>
                  <ImageWithSkeleton responsive className={styles.image} src="/image/edu_card.png" width={300} height={300} alt='' />
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
        {/* <section id='teamSection' className={`${styles.section} ${styles.animationSection} ${styles.teamSection}`}>
        <div className={styles.textContainer}>
            <SiteLogo width={50} height={50} color={'#ffffff'} />
            <p className={styles.title}>Think throughs team</p>
          </div>
          <div className={styles.itemsContainer}>
            <div className={styles.item}>
              <div className={styles.itemImage}>
                <div className={styles.itemFrame} style={{ width: 250 }}>
                  <ImageWithSkeleton responsive className={styles.image} src="/image/team/natchaya.jpg" width={250} height={250} alt='' />
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
                  <ImageWithSkeleton responsive className={styles.image} src="/image/team/tada.jpg" width={250} height={250} alt='' />
                </div>
              </div>
              <div className={styles.itemData}>
                <p className={`${styles.itemTitle} ${locale == 'th' ? `${mitr.className} ${styles.thfontbold}` : null}`}>{t('section.teamSection.item.item1.title')}</p>
                <p className={`${styles.itemDetail} ${locale == 'th' ? `${mitr.className} ${styles.thfontbold}` : null}`}>{t('section.teamSection.item.item1.description1')}</p>
                <p className={`${styles.itemDetail} ${locale == 'th' ? `${mitr.className} ${styles.thfontbold}` : null}`}>{t('section.teamSection.item.item1.description2')}</p>
              </div>
            </div>
          </div>
        </section> */}
        <section id='footerSection' className={`${styles.section} ${styles.animationSection} ${styles.footerSection}`}>
          <PageFooter locale={locale}/>  
        </section>
         <BackToTopBtn text="↑" />
      </main>
    </PageShell>
  );
}
