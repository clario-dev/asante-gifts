import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

interface Item { quote: string; name: string; city: string; }

export function Testimonials() {
  const { t } = useTranslation();
  const items = t("testimonials.items", { returnObjects: true }) as Item[];
  const [i, setI] = useState(0);
  const next = () => setI((p) => (p + 1) % items.length);
  const prev = () => setI((p) => (p - 1 + items.length) % items.length);
  const item = items[i];

  return (
    <section id="testimonials" className="py-24 sm:py-32 bg-gradient-cream">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-display text-4xl sm:text-5xl mb-12">{t("testimonials.title")}</h2>

        <div className="relative bg-card rounded-3xl p-10 sm:p-14 shadow-soft border border-border/60">
          <Quote className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 p-2 rounded-full bg-gradient-earth text-primary-foreground shadow-warm" />
          <p
            key={i}
            className="font-display italic text-2xl sm:text-3xl leading-relaxed text-foreground/90 animate-fade-in"
          >
            “{item.quote}”
          </p>
          <div className="mt-8 flex flex-col items-center gap-1">
            <span className="font-semibold">{item.name}</span>
            <span className="text-sm text-muted-foreground">{item.city}</span>
          </div>

          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              onClick={prev}
              aria-label="prev"
              className="grid place-items-center w-10 h-10 rounded-full border border-border hover:bg-muted transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-1.5">
              {items.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setI(idx)}
                  aria-label={`slide ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all ${idx === i ? "w-8 bg-primary" : "w-1.5 bg-border"}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              aria-label="next"
              className="grid place-items-center w-10 h-10 rounded-full border border-border hover:bg-muted transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
