import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Heart, Star, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { useCurrency, formatPrice } from "@/stores/currency";
import { useCart } from "@/stores/cart";
import { cn } from "@/lib/utils";
import necklace from "@/assets/product-necklace.jpg";
import perfume from "@/assets/product-perfume.jpg";
import blanket from "@/assets/product-blanket.jpg";
import sculpture from "@/assets/product-sculpture.jpg";
import camelCurves from "@/assets/product-camel-curves.jpg";
import camelRelief from "@/assets/product-camel-relief.jpg";
import camelDuo from "@/assets/product-camel-duo.jpg";

type Cat = "intimate" | "her" | "him" | "all";
type Tier = "under" | "mid" | "over";

interface Product {
  id: string;
  nameKey: string;
  image: string;
  priceXOF: number;
  rating: number;
  reviews: number;
  badge?: "new" | "best" | "limited";
  cat: Exclude<Cat, "all">[];
}

const PRODUCTS: Product[] = [
  { id: "necklace", nameKey: "necklace", image: necklace, priceXOF: 25000, rating: 4.9, reviews: 128, badge: "best", cat: ["her"] },
  { id: "perfume", nameKey: "perfume", image: perfume, priceXOF: 38000, rating: 4.8, reviews: 86, badge: "new", cat: ["her", "intimate"] },
  { id: "camel_curves", nameKey: "camel_curves", image: camelCurves, priceXOF: 10000, rating: 4.9, reviews: 214, badge: "best", cat: ["her", "intimate"] },
  { id: "camel_relief", nameKey: "camel_relief", image: camelRelief, priceXOF: 10000, rating: 4.8, reviews: 156, cat: ["her", "him"] },
  { id: "camel_duo", nameKey: "camel_duo", image: camelDuo, priceXOF: 18500, rating: 5.0, reviews: 98, badge: "limited", cat: ["intimate", "her", "him"] },
  { id: "blanket", nameKey: "blanket", image: blanket, priceXOF: 65000, rating: 5.0, reviews: 42, badge: "limited", cat: ["intimate"] },
  { id: "sculpture", nameKey: "sculpture", image: sculpture, priceXOF: 89000, rating: 4.9, reviews: 31, badge: "limited", cat: ["him", "intimate"] },
  { id: "necklace2", nameKey: "necklace", image: necklace, priceXOF: 18000, rating: 4.7, reviews: 64, cat: ["her"] },
  { id: "perfume2", nameKey: "perfume", image: perfume, priceXOF: 42000, rating: 4.6, reviews: 53, badge: "new", cat: ["her"] },
  { id: "blanket2", nameKey: "blanket", image: blanket, priceXOF: 55000, rating: 4.8, reviews: 22, cat: ["intimate", "him"] },
  { id: "sculpture2", nameKey: "sculpture", image: sculpture, priceXOF: 120000, rating: 5.0, reviews: 19, badge: "best", cat: ["him"] },
];

const CAT_FILTERS: Cat[] = ["all", "intimate", "her", "him"];
const TIER_FILTERS: { key: Tier; min: number; max: number }[] = [
  { key: "under", min: 0, max: 25000 },
  { key: "mid", min: 25000, max: 50000 },
  { key: "over", min: 50000, max: Infinity },
];

export function FeaturedProducts() {
  const { t, i18n } = useTranslation();
  const currency = useCurrency((s) => s.currency);
  const add = useCart((s) => s.add);
  const [cat, setCat] = useState<Cat>("all");
  const [tier, setTier] = useState<Tier | null>(null);
  const lang = (i18n.language || "fr").split("-")[0];

  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) => {
      if (cat !== "all" && !p.cat.includes(cat as Exclude<Cat, "all">)) return false;
      if (tier) {
        const f = TIER_FILTERS.find((x) => x.key === tier)!;
        if (p.priceXOF < f.min || p.priceXOF >= f.max) return false;
      }
      return true;
    });
  }, [cat, tier]);

  const handleAdd = (p: Product) => {
    add({ id: p.id, nameKey: `featured.products.${p.nameKey}`, priceXOF: p.priceXOF, image: p.image });
    toast.success(t("featured.added"), {
      description: t(`featured.products.${p.nameKey}`),
    });
  };

  return (
    <section id="featured" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <span className="inline-block text-xs uppercase tracking-[0.2em] font-semibold text-primary mb-3">
              {t("featured.subtitle")}
            </span>
            <h2 className="font-display text-4xl sm:text-5xl max-w-xl">{t("featured.title")}</h2>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-10">
          {CAT_FILTERS.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium border transition-all",
                cat === c
                  ? "bg-foreground text-background border-foreground shadow-soft"
                  : "bg-card border-border hover:border-foreground/40"
              )}
            >
              {t(`featured.filters.${c}`)}
            </button>
          ))}
          <span className="w-px bg-border mx-2 hidden sm:block" />
          {TIER_FILTERS.map(({ key }) => (
            <button
              key={key}
              onClick={() => setTier(tier === key ? null : key)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium border transition-all",
                tier === key
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card border-border hover:border-primary/50"
              )}
            >
              {t(`featured.filters.${key}`)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((p) => (
            <article
              key={p.id}
              className="group relative bg-card rounded-3xl overflow-hidden border border-border/60 shadow-soft hover:shadow-warm transition-all duration-500 hover:-translate-y-1 animate-scale-in"
            >
              <div className="relative aspect-square overflow-hidden bg-muted">
                <img
                  src={p.image}
                  alt={t(`featured.products.${p.nameKey}`)}
                  loading="lazy"
                  width={800}
                  height={800}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {p.badge && (
                  <span
                    className={cn(
                      "absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-soft",
                      p.badge === "new" && "bg-secondary text-secondary-foreground",
                      p.badge === "best" && "bg-accent text-accent-foreground",
                      p.badge === "limited" && "bg-foreground text-background"
                    )}
                  >
                    {t(`featured.badges.${p.badge}`)}
                  </span>
                )}
                <button
                  aria-label="favorite"
                  className="absolute top-3 right-3 grid place-items-center w-9 h-9 rounded-full glass hover:bg-white/85 transition-all"
                >
                  <Heart className="w-4 h-4 text-foreground" />
                </button>
                <button
                  onClick={() => handleAdd(p)}
                  className="absolute inset-x-3 bottom-3 inline-flex items-center justify-center gap-2 rounded-full bg-foreground text-background py-3 text-sm font-semibold opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-primary"
                >
                  <ShoppingBag className="w-4 h-4" />
                  {t("featured.add_to_cart")}
                </button>
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg leading-snug line-clamp-2 min-h-[3.4rem]">
                  {t(`featured.products.${p.nameKey}`)}
                </h3>
                <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Star className="w-3.5 h-3.5 fill-accent text-accent" />
                  <span className="font-semibold text-foreground">{p.rating.toFixed(1)}</span>
                  <span>· {p.reviews}</span>
                </div>
                <div className="mt-3 flex items-baseline justify-between">
                  <span className="font-display text-xl text-primary">
                    {formatPrice(p.priceXOF, currency, lang)}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
