import { useEffect, useState } from "react";
import initTranslations from "@/app/[locale]/i18n";

export function useTranslations(locale: string, namespaces: string[]) {
  const [t, setT] = useState<any>(null);
  const [resources, setResources] = useState<any>(null);

  useEffect(() => {
    let active = true;
    initTranslations(locale, namespaces).then(({ t, resources }) => {
      if (!active) return;
      setT(() => t);
      setResources(resources);
    });
    return () => {
      active = false;
    };
    // namespaces is a stable module-level constant per page
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);

  return { t, resources, ready: !!t };
}
