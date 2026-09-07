"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { translations, type Lang, type TranslationShape } from "@/lib/translations";

interface LanguageContextValue {
  lang: Lang;
  toggleLang: () => void;
  setLang: (lang: Lang) => void;
  t: TranslationShape;
  dir: "rtl" | "ltr";
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("ar");

  useEffect(() => {
    document.documentElement.lang = lang === "ar" ? "ar" : "en";
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      toggleLang: () => setLang((prev) => (prev === "ar" ? "en" : "ar")),
      setLang,
      t: translations[lang],
      dir: lang === "ar" ? "rtl" : "ltr",
    }),
    [lang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
