import { createFileRoute, redirect } from "@tanstack/react-router";

function detectLang(): "fr" | "en" {
  if (typeof window === "undefined") return "fr";
  try {
    const saved = localStorage.getItem("bgh_lang");
    if (saved === "fr" || saved === "en") return saved;
  } catch {}
  const nav = (navigator.language || "fr").toLowerCase();
  return nav.startsWith("en") ? "en" : "fr";
}

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({ to: "/$lang", params: { lang: detectLang() }, replace: true });
  },
});
