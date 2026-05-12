import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Heart, Search, ShoppingBag, User, Menu, X } from "lucide-react";
import { useCart } from "@/stores/cart";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.png";

const sections = [
  { key: "ideas", href: "#categories" },
  { key: "occasion", href: "#categories" },
  { key: "him", href: "#featured" },
  { key: "her", href: "#featured" },
  { key: "intimate", href: "#featured" },
  { key: "artisans", href: "#testimonials" },
] as const;

export function Navbar() {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const count = useCart((s) => s.items.reduce((a, i) => a + i.qty, 0));
  const lang = (i18n.language || "fr").split("-")[0];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleLang = (l: "fr" | "en") => {
    i18n.changeLanguage(l);
  };

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        scrolled ? "py-3" : "py-5"
      )}
    >
      <div
        className={cn(
          "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
          "glass rounded-2xl shadow-soft transition-all duration-500",
          scrolled ? "mt-2" : "mt-4"
        )}
      >
        <div className="flex items-center justify-between h-16">
          <a href="#top" className="flex items-center gap-2 group" aria-label="BestGiftHunt">
            <img src={logo} alt="BestGiftHunt" width={180} height={48} className="h-10 w-auto" />
          </a>

          <nav className="hidden lg:flex items-center gap-7">
            {sections.map((s) => (
              <a
                key={s.key}
                href={s.href}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors relative after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-primary after:transition-all hover:after:w-full"
              >
                {t(`nav.${s.key}`)}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-1.5">
            <div className="hidden sm:flex items-center gap-0.5 bg-muted/60 rounded-full p-0.5">
              {(["fr", "en"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => toggleLang(l)}
                  className={cn(
                    "px-2.5 py-1 text-xs font-semibold rounded-full transition-all",
                    lang === l
                      ? "bg-foreground text-background shadow-soft"
                      : "text-foreground/60 hover:text-foreground"
                  )}
                  aria-label={`Switch to ${l.toUpperCase()}`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
            <IconBtn label={t("nav.search")}><Search className="w-4.5 h-4.5" /></IconBtn>
            <IconBtn label={t("nav.favorites")}><Heart className="w-4.5 h-4.5" /></IconBtn>
            <IconBtn label={t("nav.cart")} badge={count}>
              <ShoppingBag className="w-4.5 h-4.5" />
            </IconBtn>
            <IconBtn label={t("nav.account")} className="hidden sm:inline-flex">
              <User className="w-4.5 h-4.5" />
            </IconBtn>
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden grid place-items-center w-10 h-10 rounded-full hover:bg-muted/70 transition-colors"
              aria-label="Menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="lg:hidden border-t border-border/60 py-4 animate-fade-in">
            <nav className="flex flex-col gap-1">
              {sections.map((s) => (
                <a
                  key={s.key}
                  href={s.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-muted/60"
                >
                  {t(`nav.${s.key}`)}
                </a>
              ))}
              <div className="flex items-center gap-2 pt-3 px-3">
                {(["fr", "en"] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => toggleLang(l)}
                    className={cn(
                      "px-3 py-1.5 text-xs font-semibold rounded-full",
                      lang === l ? "bg-foreground text-background" : "bg-muted"
                    )}
                  >
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

function IconBtn({
  children,
  label,
  badge,
  className,
}: {
  children: React.ReactNode;
  label: string;
  badge?: number;
  className?: string;
}) {
  return (
    <button
      aria-label={label}
      className={cn(
        "relative grid place-items-center w-10 h-10 rounded-full text-foreground/80 hover:text-foreground hover:bg-muted/70 transition-all",
        className
      )}
    >
      {children}
      {badge !== undefined && badge > 0 && (
        <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-primary text-[10px] font-bold text-primary-foreground grid place-items-center shadow-soft">
          {badge}
        </span>
      )}
    </button>
  );
}
