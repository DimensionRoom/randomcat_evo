import React from 'react';
import styles from './PageFooter.module.scss'; 
import LetterIcon from '@/public/svgs/home/letter';
import FacebookIcon from '@/public/svgs/home/facebook';
import InstagramIcon from '@/public/svgs/home/instagram';
import SiteLogo from "@/public/svgs/siteLogo";

export type Props = {
    locale: string;
  };

const PageFooter= ({
    locale = "en",
    ...props
  }: Props): JSX.Element => {
    return (
        <div className={styles.footerContainer}>
            <div className={styles.itemsContainer}>
                <p className={styles.title}>Contact us</p>
                <div className={styles.contact}>
                    <LetterIcon width={25} height={25} />
                    <p className={styles.contactData}>Email: Upskillteachers@gmail.com</p>
                </div>
                <div className={styles.contact}>
                    <FacebookIcon width={25} height={25} />
                    <a className={styles.textLink} href="https://www.facebook.com/KidandKru" target="_blank" rel="noreferrer">
                        <p className={styles.contactData}>Facebook: @KidandKru</p>
                    </a>
                </div>
                <div className={styles.contact}>
                    <InstagramIcon width={25} height={25} />
                    <a className={styles.textLink} href="https://www.instagram.com/thinktool_official" target="_blank" rel="noreferrer">
                        <p className={styles.contactData}>Instagram: thinktool_official</p>
                    </a>
                </div>
            </div>
            <div className={styles.brandContainer}>
                <div className={styles.brand}>
                    <p className={styles.brandName}>ThinkTool</p>
                    <SiteLogo className={styles.brandIcon} width={50} height={50} />
                </div>
            </div>
        </div>
    );
};

export default PageFooter;