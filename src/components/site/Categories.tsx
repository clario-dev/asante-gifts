import { useTranslation } from "react-i18next";
import { Heart, Flower2, Star, Cake, HeartHandshake, Gift } from "lucide-react";

const items = [
  { key: "intimate", Icon: Heart, tint: "oklch(0.62 0.18 22)" },
  { key: "her", Icon: Flower2, tint: "oklch(0.42 0.07 155)" },
  { key: "him", Icon: Star, tint: "oklch(0.35 0.08 250)" },
  { key: "anniversary", Icon: Cake, tint: "oklch(0.68 0.13 75)" },
  { key: "valentine", Icon: HeartHandshake, tint: "oklch(0.50 0.18 25)" },
  { key: "just_because", Icon: Gift, tint: "oklch(0.58 0.14 38)" },
] as const;

export function Categories() {
  const { t } = useTranslation();
  return (
    <section id="categories" className="py-24 sm:py-32 bg-gradient-cream">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-xs uppercase tracking-[0.2em] font-semibold text-primary mb-3">
            BestGiftHunt
          </span>
          <h2 className="font-display text-4xl sm:text-5xl">{t("categories.title")}</h2>
          <p className="mt-4 text-muted-foreground">{t("categories.subtitle")}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {items.map(({ key, Icon, tint }, i) => (
            <a
              key={key}
              href="#featured"
              className="group relative overflow-hidden rounded-3xl bg-card p-6 sm:p-8 shadow-soft hover:shadow-warm transition-all duration-500 hover:-translate-y-1 border border-border/60"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div
                aria-hidden
                className="absolute -right-10 -top-10 w-40 h-40 rounded-full opacity-15 blur-2xl transition-all duration-700 group-hover:scale-150 group-hover:opacity-25"
                style={{ backgroundColor: tint }}
              />
              <div
                className="relative grid place-items-center w-14 h-14 rounded-2xl mb-5 text-primary-foreground transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
                style={{ backgroundColor: tint }}
              >
                <Icon className="w-6 h-6" strokeWidth={2} />
              </div>
              <h3 className="font-display text-xl sm:text-2xl">{t(`categories.${key}`)}</h3>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
