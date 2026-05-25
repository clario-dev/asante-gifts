import { create } from "zustand";

export type Currency = "XOF";

interface CurrencyState {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  detectFromLocale: () => void;
}

// FCFA only — marché ciblé : Afrique de l'Ouest (Bénin, Sénégal, Côte d'Ivoire, Togo...)
export const useCurrency = create<CurrencyState>(() => ({
  currency: "XOF",
  setCurrency: () => {},
  detectFromLocale: () => {},
}));

export function convertFromXOF(amountXOF: number, _target: Currency): number {
  return amountXOF;
}

export function formatPrice(amountXOF: number, _currency: Currency, locale: string): string {
  const formatted = new Intl.NumberFormat(locale === "fr" ? "fr-FR" : "en-US", {
    maximumFractionDigits: 0,
  }).format(Math.round(amountXOF));
  return `${formatted} FCFA`;
}
