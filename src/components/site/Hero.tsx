import { useTranslation } from "react-i18next";
import { ArrowRight, Sparkles } from "lucide-react";
import heroImg from "@/assets/hero-couple.jpg";

export function Hero() {
  const { t } = useTranslation();
  return (
    <section id="top" className="relative min-h-[92vh] flex items-center overflow-hidden">
      <img
        src={heroImg}
        alt=""
        width={1920}
        height={1080}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{ background: "var(--gradient-hero-overlay)" }}
      />
      <div
        aria-hidden
        className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[140%] h-64 rounded-[100%] blur-3xl opacity-60"
        style={{ background: "var(--gradient-warm)" }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-32 pb-20 text-cream">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs sm:text-sm text-cream/95 animate-fade-in mb-7">
            <Sparkles className="w-3.5 h-3.5 text-[oklch(0.85_0.13_70)]" />
            <span>{t("hero.badge")}</span>
          </div>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[1.05] text-cream animate-fade-up">
            {t("hero.title_1")}
            <br />
            <span className="italic text-[oklch(0.85_0.13_70)]">
              {t("hero.title_2")}
            </span>
          </h1>

          <p
            className="mt-6 text-lg sm:text-xl text-cream/85 max-w-2xl animate-fade-up"
            style={{ animationDelay: "120ms" }}
          >
            {t("hero.subtitle")}
          </p>

          <div
            className="mt-10 flex flex-col sm:flex-row gap-3 animate-fade-up"
            style={{ animationDelay: "240ms" }}
          >
            <a
              href="#featured"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-earth px-7 py-4 text-sm font-semibold text-primary-foreground shadow-warm hover:shadow-glow hover:scale-[1.02] transition-all"
            >
              {t("hero.cta_primary")}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#categories"
              className="inline-flex items-center justify-center gap-2 rounded-full glass px-7 py-4 text-sm font-semibold text-cream hover:bg-white/15 transition-all"
            >
              {t("hero.cta_secondary")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

const cream = "var(--cream)";
