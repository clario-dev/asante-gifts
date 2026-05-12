import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import "@/i18n";
import { useCurrency } from "@/stores/currency";

export function I18nBoot({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation();
  const detectFromLocale = useCurrency((s) => s.detectFromLocale);

  useEffect(() => {
    detectFromLocale();
    document.documentElement.lang = i18n.language?.split("-")[0] ?? "fr";
  }, [i18n.language, detectFromLocale]);

  return <>{children}</>;
}
