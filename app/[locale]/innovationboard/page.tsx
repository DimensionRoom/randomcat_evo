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
    
          </button>
        </div>
      </main>
    </TranslationsProvider>
  );
}
