'use client';
import React, { useState, useEffect } from 'react';
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import { usePathname } from 'next/navigation';
import initTranslations from '../i18n';
import Image from 'next/image'
import TranslationsProvider from '@/components/TranslationsProvider';
import mainLoad from './../../../public/json/mainload.json';
import PotionIcon from '@/public/svgs/home/potion';
import BookIcon from '@/public/svgs/home/book';
import GiftBoxIcon from '@/public/svgs/home/giftBox';
import CoupleIcon from '@/public/svgs/home/couple1';
import TargetArrowIcon from '@/public/svgs/home/targetArrow';
import GroupPplIcon from '@/public/svgs/home/groupPpl';
import JigsawIcon from '@/public/svgs/home/jigsaw';
import LetterIcon from '@/public/svgs/home/letter';
import FacebookIcon from '@/public/svgs/home/facebook';
import SiteLogo from "@/public/svgs/siteLogo";
import styles from "../../Styles/Home/page.module.css";

const i18nNamespaces = ['common'];
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
        <div className={styles.parallaxSection}>
          <div className={styles.textContainer}>
            <p className={styles.title}>THINK<span>TOOL</span></p>
            <p className={styles.subtitle}>"Creativity begins here."</p>
            <p className={styles.details}>Random | Brainstorm | Spark your ideas</p>
          </div>
          <div className={styles.cardsContainer}>
            <div className={`${styles.cardParallax} ${styles.cardColor} ${styles.cardRotate1}`}>
              <div className={styles.cardTopicContainer}>
                <p className={styles.cardTopic}>Story</p>
                <p className={styles.cardTopic}>Builder</p>
              </div>
              <p className={styles.cardDetail}>A versatile online tool and physical card deck that make learning more fun and challenging than before</p>
            </div>
            <div className={`${styles.cardParallax} ${styles.cardClear} ${styles.cardRotate2}`}>
              <div className={styles.cardTopicContainer}>
                <p className={styles.cardTopic}>Innovation</p>
                <p className={styles.cardTopic}>Design</p>
              </div>
              <p className={styles.cardDetail}>A versatile online tool and physical card deck that make learning more fun and challenging than before</p>
            </div>
          </div>
        </div>
        <div className={styles.gradientSection}>
          <div className={styles.textContainer}>
            <p className={styles.title}>A magical tool is designed for you</p>
            <p className={styles.subtitle}>How Think Tool develop your skills?</p>
          </div>
          <div className={styles.itemsContainer}>
            <div className={styles.item}>
              <div className={styles.itemIcon}>
                <PotionIcon />
              </div>
              <div className={styles.itemData}>
                <p className={styles.itemTitle}>Creative Thinking</p>
                <p className={styles.itemDetail}>With over 5,000+ combinations</p>
                <p className={styles.itemDetail}>that challenge you to think flexibly</p>
                <p className={styles.itemDetail}>and creatively, develop your skills</p>
                <p className={styles.itemDetail}>every day with this tool.</p>
              </div>
            </div>
            <div className={styles.item}>
              <div className={styles.itemIcon} style={{ transform: 'translate(-10%, -10%) rotate(50deg)' }}>
                <BookIcon />
              </div>
              <div className={styles.itemData}>
                <p className={styles.itemTitle}>Problem Solving</p>
                <p className={styles.itemDetail}>Occasionally, a random tool</p>
                <p className={styles.itemDetail}>might present you with unrelated</p>
                <p className={styles.itemDetail}>prompts to challenge you. Use</p>
                <p className={styles.itemDetail}>your skills to solve them wisely.</p>
              </div>

            </div>
            <div className={styles.item}>
              <div className={styles.itemIcon}>
                <GiftBoxIcon width={'80%'} height={'80%'} />
              </div>
              <div className={styles.itemData}>
                <p className={styles.itemTitle}>Analytical thinking</p>
                <p className={styles.itemDetail}>While you enjoy some bizarre</p>
                <p className={styles.itemDetail}>ideas, you still need something</p>
                <p className={styles.itemDetail}>concrete to make everything</p>
                <p className={styles.itemDetail}>make sense.</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.whiteSection}>
          <div className={styles.itemsContainer}>
            <div className={styles.itemIcon} style={{ transform: 'translate(0%, 0%) rotate(350deg)' }}>
              <CoupleIcon width={'80%'} height={'80%'} />
            </div>
            <div className={styles.itemData}>
              <p className={styles.itemTitle}>Think-throughs cards</p>
              <p className={styles.itemSubTitle}>How it works ?</p>
              <p className={styles.itemDetail}>
                "As a professor and speaker, teaching tools play a crucial role in making workshops enjoyable and memorable. However, sometimes we are limited by the availability and cost of physical tools, especially when we need to provide multiple sets.
              </p>
              <p className={styles.itemDetail}>
                The <b>ThinkTool</b> is designed for online accessibility by everyone. Utilizing a random mechanism, this versatile and engaging tool can generate more than 5,000 results. Below, we outline 3 steps to utilize it."
              </p>
            </div>
          </div>
        </div>
        <div className={styles.stepSection}>
          <div className={styles.itemsContainer}>
            <div className={styles.item}>
              <div className={styles.itemHeader}>
                <p className={styles.itemHeaderText}>Step 1</p>
                <p className={styles.itemHeaderDetail}>Choose categories &</p>
                <p className={styles.itemHeaderDetail}>click random bottom.</p>
              </div>
              <div className={styles.itemContent}>
                <Image className={styles.image} src="/image/step1.png" width={300} height={300} alt='' />
              </div>
            </div>
            <div className={styles.item}>
              <div className={styles.itemHeader}>
                <p className={styles.itemHeaderText}>Step 2</p>
                <p className={styles.itemHeaderDetail}>Get prompts and</p>
                <p className={styles.itemHeaderDetail}>brainstorm.</p>
              </div>
              <div className={styles.itemContent}>
                <Image className={styles.image} src="/image/step2.png" width={300} height={300} alt='' />
              </div>
            </div>
            <div className={styles.item}>
              <div className={styles.itemHeader}>
                <p className={styles.itemHeaderText}>Step 3</p>
                <p className={styles.itemHeaderDetail}>Create a prototype/story</p>
                <p className={styles.itemHeaderDetail} style={{ fontSize: '1.4em' }}>Rely on a theme related to cards.</p>
              </div>
              <div className={styles.itemContent}>
                <Image className={styles.image} src="/image/step3.png" width={300} height={300} alt='' />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.outcomeSection}>
          <div className={styles.itemsContainer}>
            <div className={styles.itemData}>
              <p className={styles.itemTitle}>Final Outcome</p>
              <p className={styles.itemSubTitle}>Customize the Noodle</p>
              <p className={styles.itemSubTitle}>Vendor machine.</p>
              <p className={styles.itemDetail}>
                "Customers have the option to select their desired ingredients and quantities, allowing them to estimate the price. Our meals are freshly prepared, with no use of frozen ingredients."
              </p>
            </div>
            <div className={styles.itemImage}>
              <div className={styles.itemFrame} style={{ transform: 'translate(0%, 0%) rotate(5deg)', width: 300 }}>
                <Image className={styles.image} src="/image/product1.jpg" width={200} height={200} alt='' />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.colorSection}>
          <div className={styles.itemsContainer}>
            <div className={styles.item}>
              <div className={styles.itemIcon}>
                <TargetArrowIcon width={65} height={65} />
              </div>
              <div className={styles.itemHeader}>
                <p className={styles.itemHeaderText}>Individual</p>
                <p className={styles.itemHeaderDetail}>"Stuck for ideas? Can't</p>
                <p className={styles.itemHeaderDetail}>think creatively? Try</p>
                <p className={styles.itemHeaderDetail}>these tools to discover</p>
                <p className={styles.itemHeaderDetail}>your new potential."</p>
              </div>
            </div>
            <div className={styles.item}>
              <div className={styles.itemIcon}>
                <GroupPplIcon width={65} height={65} />
              </div>
              <div className={styles.itemHeader}>
                <p className={styles.itemHeaderText}>Workshop</p>
                <p className={styles.itemHeaderDetail}>"Stuck for ideas? Can't</p>
                <p className={styles.itemHeaderDetail}>think creatively? Try</p>
                <p className={styles.itemHeaderDetail}>these tools to discover</p>
                <p className={styles.itemHeaderDetail}>your new potential."</p>
              </div>
            </div>
            <div className={styles.item}>
              <div className={styles.itemIcon}>
                <JigsawIcon width={65} height={65} />
              </div>
              <div className={styles.itemHeader}>
                <p className={styles.itemHeaderText}>Classroom</p>
                <p className={styles.itemHeaderDetail}>"Stuck for ideas? Can't</p>
                <p className={styles.itemHeaderDetail}>think creatively? Try</p>
                <p className={styles.itemHeaderDetail}>these tools to discover</p>
                <p className={styles.itemHeaderDetail}>your new potential."</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.toolsSection}>
          <div className={styles.textContainer}>
            <p className={styles.title}>A series of Think Tools</p>
            <p className={styles.subtitle}>Click the card to start.</p>
          </div>
          <div className={styles.itemsContainer}>
            <div className={styles.item}>
              <div className={styles.itemImage}>
                <Image className={styles.image} src="/image/innocard.png" width={300} height={300} alt='' />
              </div>
              <div className={styles.itemData}>
                <p className={styles.itemTitle}>Inno Design</p>
                <p className={styles.itemDetail}>"Explore your new</p>
                <p className={styles.itemDetail}>potential to deal with</p>
                <p className={styles.itemDetail}>unrelated prompts that</p>
                <p className={styles.itemDetail}>develop your creativity."</p>
              </div>
            </div>
            <div className={styles.item}>
              <div className={styles.itemImage}>
                <Image className={styles.image} src="/image/storycard.png" width={300} height={300} alt='' />
              </div>
              <div className={styles.itemData}>
                <p className={styles.itemTitle}>Story Design</p>
                <p className={styles.itemDetail}>"Inspire new ideas for</p>
                <p className={styles.itemDetail}>writing stories with six</p>
                <p className={styles.itemDetail}>combinations that you</p>
                <p className={styles.itemDetail}>can practice every day."</p>
              </div>
            </div>
            <div className={styles.item}>
              <div className={styles.itemImage}>
                <Image className={styles.image} src="/image/educard.png" width={300} height={300} alt='' />
              </div>
              <div className={styles.itemData}>
                <p className={styles.itemTitle}>Edu Design</p>
                <p className={styles.itemDetail}>"Ignite your idea of</p>
                <p className={styles.itemDetail}>designing teaching</p>
                <p className={styles.itemDetail}>materials by thinking</p>
                <p className={styles.itemDetail}>through this card set."</p>
              </div>
            </div>
          </div>
        </div>
        {/* <div className={styles.teamSection}>
          <div className={styles.textContainer}>
            <SiteLogo width={50} height={50} color={'#ffffff'} />
            <p className={styles.title}>Think throughs team</p>
          </div>
          <div className={styles.itemsContainer}>
            <div className={styles.item}>
              <div className={styles.itemImage}>
                <div className={styles.itemFrame} style={{ width: 300 }}>
                  <Image className={styles.image} src="/image/defaultimg.jpg" width={300} height={300} alt='' />
                </div>
              </div>
              <div className={styles.itemData}>
                <p className={styles.itemTitle}>Mr. Tada Samngamthong</p>
                <p className={styles.itemDetail}>A Front-End Developer with</p>
                <p className={styles.itemDetail}>10 years experiences.</p>
              </div>
            </div>
            <div className={styles.item}>
              <div className={styles.itemImage}>
                <div className={styles.itemFrame} style={{ width: 300 }}>
                  <Image className={styles.image} src="/image/defaultimg.jpg" width={300} height={300} alt='' />
                </div>
              </div>
              <div className={styles.itemData}>
                <p className={styles.itemTitle}>Miss Natchaya Nararat</p>
                <p className={styles.itemDetail}>A passionate educator who</p>
                <p className={styles.itemDetail}>designed a game mechanism</p>
                <p className={styles.itemDetail}>and a website interface.</p>
              </div>
            </div>
          </div>
        </div> */}
        <div className={styles.footerSection}>
          <div className={styles.itemsContainer}>
            <p className={styles.title}>Contact us</p>
            <div className={styles.contact}>
              <LetterIcon width={25} height={25} />
              <p className={styles.contactData}>Email: Upskillteachers@gmail.com</p>
            </div>
            <div className={styles.contact}>
              <FacebookIcon width={25} height={25} />
              <p className={styles.contactData}>Facebook: @KidandKru</p>
            </div>
          </div>
          <div className={styles.brandContainer}>
            <div className={styles.brand}>
              <p className={styles.brandName}>ThinkTool</p>
              <SiteLogo width={50} height={50} />
            </div>
          </div>
        </div>
      </main>
    </TranslationsProvider >
  );
}
