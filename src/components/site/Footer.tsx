import { useTranslation } from "react-i18next";
import { Instagram, Facebook, MessageCircle, ChevronDown } from "lucide-react";
import logo from "@/assets/logo.png";
import { useState } from "react";
import { useCurrency, type Currency } from "@/stores/currency";
import { cn } from "@/lib/utils";

const CURRENCIES: { code: Currency; label: string }[] = [
  { code: "XOF", label: "FCFA" },
  { code: "EUR", label: "€ EUR" },
  { code: "USD", label: "$ USD" },
];

export function Footer() {
  const { t } = useTranslation();
  const { currency, setCurrency } = useCurrency();
  const [open, setOpen] = useState(false);

  return (
    <footer className="bg-foreground text-background pt-20 pb-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="col-span-2">
            <div className="mb-4 inline-block rounded-2xl bg-background/95 px-4 py-2.5">
              <img src={logo} alt="BestGiftHunt" width={200} height={56} className="h-12 w-auto" />
            </div>
            <p className="text-sm text-background/70 max-w-sm leading-relaxed">
              {t("footer.tagline")}
            </p>
            <div className="mt-6 flex items-center gap-2">
              {[Instagram, Facebook, MessageCircle].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid place-items-center w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-lg mb-4">{t("footer.categories")}</h4>
            <ul className="space-y-2.5 text-sm text-background/70">
              <li><a href="#categories" className="hover:text-background">{t("categories.intimate")}</a></li>
              <li><a href="#categories" className="hover:text-background">{t("categories.her")}</a></li>
              <li><a href="#categories" className="hover:text-background">{t("categories.him")}</a></li>
              <li><a href="#categories" className="hover:text-background">{t("categories.valentine")}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg mb-4">{t("footer.help")}</h4>
            <ul className="space-y-2.5 text-sm text-background/70">
              <li><a href="#" className="hover:text-background">{t("footer.faq")}</a></li>
              <li><a href="#" className="hover:text-background">{t("footer.shipping")}</a></li>
              <li><a href="#" className="hover:text-background">{t("footer.returns")}</a></li>
              <li><a href="#" className="hover:text-background">{t("footer.contact")}</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-background/60">
            © {new Date().getFullYear()} BestGiftHunt. {t("footer.rights")} · {t("footer.legal")}
          </p>

          <div className="flex items-center gap-4">
            <div className="relative">
              <button
                onClick={() => setOpen((v) => !v)}
                className="inline-flex items-center gap-2 rounded-full bg-white/5 hover:bg-white/10 px-4 py-2 text-xs font-semibold transition-colors"
              >
                <span className="opacity-70">{t("footer.currency")}:</span>
                <span>{CURRENCIES.find((c) => c.code === currency)?.label}</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {open && (
                <div className="absolute right-0 bottom-full mb-2 w-40 rounded-xl bg-card text-foreground shadow-warm border border-border overflow-hidden z-10 animate-scale-in">
                  {CURRENCIES.map((c) => (
                    <button
                      key={c.code}
                      onClick={() => { setCurrency(c.code); setOpen(false); }}
                      className={cn(
                        "w-full text-left px-4 py-2.5 text-xs font-medium hover:bg-muted transition-colors",
                        currency === c.code && "bg-muted text-primary"
                      )}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-background/50">
              <span className="px-2 py-1 bg-white/5 rounded">Mobile Money</span>
              <span className="px-2 py-1 bg-white/5 rounded">Visa</span>
              <span className="px-2 py-1 bg-white/5 rounded">Mastercard</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
