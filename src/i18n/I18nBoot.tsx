import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";
import { useCurrency } from "@/stores/currency";

const STORAGE_KEY = "bgh_lang";

function detectLang(): "fr" | "en" {
  if (typeof window === "undefined") return "fr";
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "fr" || saved === "en") return saved;
  } catch {}
  const nav = (navigator.language || "fr").toLowerCase();
  return nav.startsWith("en") ? "en" : "fr";
}

export function I18nBoot({ children }: { children: React.ReactNode }) {
  const { i18n: i18nInstance } = useTranslation();
  const detectFromLocale = useCurrency((s) => s.detectFromLocale);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const lang = detectLang();
    if (i18nInstance.language !== lang) {
      i18n.changeLanguage(lang);
    }
    detectFromLocale();
    setMounted(true);
  }, [detectFromLocale, i18nInstance]);

  useEffect(() => {
    document.documentElement.lang = i18nInstance.language?.split("-")[0] ?? "fr";
    try {
      localStorage.setItem(STORAGE_KEY, i18nInstance.language?.split("-")[0] ?? "fr");
    } catch {}
  }, [i18nInstance.language, mounted]);

  return <>{children}</>;
}
