import { createFileRoute, redirect } from "@tanstack/react-router";

function detectLang(req?: Request): "fr" | "en" {
  // Server: try Accept-Language header
  if (req) {
    const al = req.headers.get("accept-language") || "";
    if (/^\s*en\b/i.test(al)) return "en";
    return "fr";
  }
  // Client: localStorage then navigator
  if (typeof window !== "undefined") {
    try {
      const saved = localStorage.getItem("bgh_lang");
      if (saved === "fr" || saved === "en") return saved;
    } catch {}
    const nav = (navigator.language || "fr").toLowerCase();
    return nav.startsWith("en") ? "en" : "fr";
  }
  return "fr";
}

export const Route = createFileRoute("/")({
  beforeLoad: ({ location }) => {
    const req =
      typeof window === "undefined"
        ? // @ts-ignore — request is available on the server during SSR
          (location as any)?.request
        : undefined;
    const lang = detectLang(req);
    throw redirect({ to: "/$lang", params: { lang }, replace: true });
  },
});
