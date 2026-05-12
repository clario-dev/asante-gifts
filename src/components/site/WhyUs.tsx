import { useTranslation } from "react-i18next";
import { Globe2, Truck, ShieldCheck, RefreshCw } from "lucide-react";

const items = [
  { key: "african", Icon: Globe2 },
  { key: "delivery", Icon: Truck },
  { key: "payment", Icon: ShieldCheck },
  { key: "satisfaction", Icon: RefreshCw },
] as const;

export function WhyUs() {
  const { t } = useTranslation();
  return (
    <section className="py-24 sm:py-28 bg-foreground text-background relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(60% 80% at 80% 0%, oklch(0.62 0.18 38 / 0.45) 0%, transparent 60%), radial-gradient(50% 70% at 0% 100%, oklch(0.38 0.06 155 / 0.5) 0%, transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-4xl sm:text-5xl">{t("why.title")}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map(({ key, Icon }) => (
            <div key={key} className="text-center group">
              <div className="mx-auto grid place-items-center w-16 h-16 rounded-2xl bg-gradient-earth shadow-warm group-hover:shadow-glow transition-all duration-500 group-hover:scale-110">
                <Icon className="w-7 h-7" strokeWidth={2} />
              </div>
              <h3 className="mt-5 font-display text-xl">{t(`why.items.${key}.title`)}</h3>
              <p className="mt-2 text-sm text-background/70 leading-relaxed">
                {t(`why.items.${key}.desc`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
