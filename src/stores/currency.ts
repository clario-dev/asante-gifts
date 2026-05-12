import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Currency = "XOF" | "EUR" | "USD";

// Approximate exchange rates from base XOF (CFA). In production, fetched from API daily.
// 1 XOF ~ 0.00152 EUR ~ 0.00165 USD
const RATES_FROM_XOF: Record<Currency, number> = {
  XOF: 1,
  EUR: 0.00152,
  USD: 0.00165,
};

interface CurrencyState {
  currency: Currency;
  autoDetected: boolean;
  setCurrency: (c: Currency) => void;
  detectFromLocale: () => void;
}

const detectCurrencyFromLocale = (): Currency => {
  if (typeof window === "undefined") return "XOF";
  // Heuristic via navigator language region. Real impl would use IP geolocation.
  const lang = navigator.language || "fr-FR";
  const region = lang.split("-")[1]?.toUpperCase() ?? "";
  const fcfa = ["CI", "SN", "CM", "BF", "ML", "TG", "BJ", "NE", "GA", "CG", "TD"];
  const eur = ["FR", "BE", "CH", "LU", "DE", "ES", "IT", "PT", "NL", "AT", "IE"];
  if (fcfa.includes(region)) return "XOF";
  if (eur.includes(region)) return "EUR";
  if (region === "US" || region === "CA" || region === "GB" || region === "AU") return "USD";
  // Default by language
  return lang.startsWith("fr") ? "XOF" : "USD";
};

export const useCurrency = create<CurrencyState>()(
  persist(
    (set) => ({
      currency: "XOF",
      autoDetected: false,
      setCurrency: (currency) => set({ currency, autoDetected: true }),
      detectFromLocale: () => {
        const detected = detectCurrencyFromLocale();
        set((s) => (s.autoDetected ? s : { currency: detected, autoDetected: true }));
      },
    }),
    { name: "bgh_currency" }
  )
);

export function convertFromXOF(amountXOF: number, target: Currency): number {
  return amountXOF * RATES_FROM_XOF[target];
}

export function formatPrice(amountXOF: number, currency: Currency, locale: string): string {
  const value = convertFromXOF(amountXOF, currency);
  if (currency === "XOF") {
    const formatted = new Intl.NumberFormat(locale === "fr" ? "fr-FR" : "en-US", {
      maximumFractionDigits: 0,
    }).format(Math.round(value));
    return `${formatted} FCFA`;
  }
  return new Intl.NumberFormat(locale === "fr" ? "fr-FR" : "en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(value);
}
