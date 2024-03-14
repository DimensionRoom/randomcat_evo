import initTranslations from '../i18n';
import styles from "../../Styles/InnovationBoard/page.module.css";
import TranslationsProvider from '@/components/TranslationsProvider';
const i18nNamespaces = ['innovationboard'];

export default async function InnovationBoard({ params: { locale } }: { params: { locale: string } }) {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);
  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}>
      <main className={styles.main}>
        {/* <p>{t('about_header')}</p> */}
        <div className={styles.HeaderCatContainer}>
          <h1>Gamification card set</h1>
          <button className={styles.RandomAllBtn}>
            <span className={styles.RandomAllBtnText}>Random all</span>
            <div style={{ height: "2em",padding:7, backgroundColor: "#10092b", borderRadius: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg viewBox="0 0 256 256" height="100%">
              <path fill="#fff" d="M245.3,124.3l-2.1-3.2l-59-59c-3.8-3.8-10.1-3.8-13.9,0c-3.8,3.8-3.8,10.1,0,13.9l42.2,42.2H19.8c-5.4,0-9.8,4.4-9.8,9.8c0,5.4,4.4,9.8,9.8,9.8h192.6l-42.2,42.2c-3.8,3.8-3.8,10.1,0,13.9c3.8,3.8,10.1,3.8,13.9,0l59-59l2.1-3.2l0.7-3.7v0L245.3,124.3z"/>
              </svg>
            </div>
            {/* <svg className={styles.RandomAllBtnArrow} height="2em" viewBox="0 0 74 74" fill="#10092b">
              <circle cx="37" cy="37" r="35.5" stroke="#10092b" strokeWidth="3"></circle>
              <path d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z" fill="white"></path>
            </svg> */}
          </button>
        </div>
      </main>
    </TranslationsProvider>
  );
}
