import { useEffect, useState } from "react";
import initTranslations from "@/app/[locale]/i18n";

// Safe placeholder used before translations resolve, so page JSX that calls
// t(...) (built eagerly as PageShell children) never crashes with
// "t is not a function". Returns [] for returnObjects, "" otherwise.
const PLACEHOLDER_T = (_key: string, options?: any) =>
  options && options.returnObjects ? [] : "";

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

  return { t: t ?? PLACEHOLDER_T, resources, ready: !!t };
}
