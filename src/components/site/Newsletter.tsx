import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Mail, ArrowRight } from "lucide-react";
import { toast } from "sonner";

export function Newsletter() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-earth p-10 sm:p-16 text-primary-foreground shadow-warm">
          <div
            aria-hidden
            className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-white/10 blur-3xl"
          />
          <div className="relative max-w-2xl mx-auto text-center">
            <Mail className="mx-auto w-10 h-10 mb-4 opacity-90" />
            <h2 className="font-display text-3xl sm:text-4xl">{t("newsletter.title")}</h2>
            <p className="mt-3 text-primary-foreground/85">{t("newsletter.subtitle")}</p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!email) return;
                toast.success(t("newsletter.thanks"));
                setEmail("");
              }}
              className="mt-8 flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("newsletter.placeholder")}
                className="flex-1 rounded-full bg-white/95 text-foreground px-5 py-3.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-white/60"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground text-background px-6 py-3.5 text-sm font-semibold hover:scale-[1.02] transition-transform"
              >
                {t("newsletter.cta")}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <p className="mt-4 text-xs text-primary-foreground/75">{t("newsletter.note")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
