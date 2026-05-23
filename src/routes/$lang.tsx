import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";

const SUPPORTED = ["fr", "en"] as const;
type Lang = (typeof SUPPORTED)[number];

export const Route = createFileRoute("/$lang")({
  beforeLoad: ({ params }) => {
    if (!SUPPORTED.includes(params.lang as Lang)) {
      throw redirect({ to: "/$lang", params: { lang: "fr" } });
    }
  },
  component: LangLayout,
});

function LangLayout() {
  const { lang } = Route.useParams();
  const { i18n: i18nInstance } = useTranslation();

  useEffect(() => {
    if (i18nInstance.language?.split("-")[0] !== lang) {
      i18n.changeLanguage(lang);
    }
    try {
      localStorage.setItem("bgh_lang", lang);
    } catch {}
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [lang, i18nInstance]);

  return <Outlet />;
}
