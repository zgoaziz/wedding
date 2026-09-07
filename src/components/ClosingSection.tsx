"use client";

import { useLanguage } from "@/context/LanguageContext";
import Reveal from "@/components/Reveal";

export default function ClosingSection() {
  const { t } = useLanguage();

  return (
    <Reveal className="mx-auto w-full max-w-md text-center">
      <div className="ornate-divider py-2">
        <span className="text-[var(--color-gold)]">✦</span>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-[var(--color-ink)]/80 sm:text-base">{t.closingText}</p>
      <p className="gold-gradient-text mt-3 font-display text-2xl font-bold sm:text-3xl">{t.signature}</p>
    </Reveal>
  );
}
