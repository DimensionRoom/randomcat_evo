import initTranslations from '../i18n';
import styles from "../../Styles/InnovationBoard/page.module.css";
import TranslationsProvider from '@/components/TranslationsProvider';
import LanguageChanger from '@/components/LanguageChanger';
const i18nNamespaces = ['innovationboard'];

export default async function InnovationBoard({ params: { locale } }: { params: { locale: string } }) {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);
  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}>
      <main className={styles.main}>
        <p>{t('about_header')}</p>
        <p>language: {locale}</p>
        <LanguageChanger />
      </main>
    </TranslationsProvider>
  );
}
