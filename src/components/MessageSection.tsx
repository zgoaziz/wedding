"use client";

import { useLanguage } from "@/context/LanguageContext";
import Reveal from "@/components/Reveal";

export default function MessageSection() {
  const { t } = useLanguage();

  return (
    <Reveal className="mx-auto w-full max-w-md">
      <div className="rounded-2xl border border-[var(--color-gold)]/20 bg-white/70 px-5 py-6 text-center shadow-sm backdrop-blur-sm">
        <h3 className="mb-2 font-heading text-lg font-semibold text-[var(--color-gold-dark)] sm:text-xl">
          {t.loveWordTitle}
        </h3>
        <p className="text-sm leading-relaxed text-[var(--color-ink)]/80 sm:text-base">{t.loveWordText}</p>
      </div>
    </Reveal>
  );
}
