"use client";

import { useLanguage } from "@/context/LanguageContext";
import Reveal from "@/components/Reveal";

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <div className="flex h-full w-full flex-col items-center justify-between text-center px-4 py-2 sm:px-6">
      {/* Top Bismillah Calligraphy */}
      <Reveal>
        <h1 className="font-display text-2xl font-bold leading-relaxed text-[var(--color-ink)] sm:text-3xl md:text-[32px] drop-shadow-sm">
          {t.bismillah}
        </h1>
      </Reveal>

      {/* Quranic Ayah */}
      <Reveal delay={0.08}>
        <div className="max-w-[340px] sm:max-w-[380px]">
          <p className="font-heading text-xs font-medium leading-relaxed text-[var(--color-maroon)] sm:text-sm">
            {t.ayah}
          </p>
          <p className="mt-1 font-display text-[11px] text-[var(--color-ink)]/55 sm:text-xs">
            {t.ayahRef}
          </p>
        </div>
      </Reveal>

      {/* Families Invitation Text */}
      <Reveal delay={0.15}>
        <p className="max-w-[320px] text-xs leading-relaxed text-[var(--color-ink)]/85 sm:max-w-[360px] sm:text-sm">
          {t.introText}
        </p>
      </Reveal>

      {/* Groom & Bride Names */}
      <Reveal delay={0.22}>
        <div className="my-3 flex items-center justify-center gap-3 sm:gap-4">
          <span className="font-display text-3xl font-bold tracking-tight text-[var(--color-ink)] sm:text-4xl md:text-5xl drop-shadow-sm">
            {t.groomName}
          </span>
          <span className="font-display text-2xl font-bold text-[var(--color-gold-dark)] sm:text-3xl md:text-4xl">
            &
          </span>
          <span className="font-display text-3xl font-bold tracking-tight text-[var(--color-ink)] sm:text-4xl md:text-5xl drop-shadow-sm">
            {t.brideName}
          </span>
        </div>
      </Reveal>

      {/* Date & Day Text */}
      <Reveal delay={0.3}>
        <div className="max-w-[320px] rounded-xl border border-[var(--color-gold)]/30 bg-white/40 px-3.5 py-2 backdrop-blur-[2px] shadow-sm sm:max-w-[360px]">
          <p className="font-heading text-xs font-semibold leading-relaxed text-[var(--color-ink)] sm:text-sm">
            {t.dateText}
          </p>
        </div>
      </Reveal>

      {/* Venue Announcement */}
      <Reveal delay={0.38}>
        <div className="flex flex-col items-center">
          <span className="font-heading text-xs text-[var(--color-ink)]/70 sm:text-sm">{t.atLabel}</span>
          <span className="font-heading text-sm font-bold text-[var(--color-gold-dark)] sm:text-base">
            {t.venueName}
          </span>
          <span className="text-[11px] text-[var(--color-ink)]/60 sm:text-xs">{t.addressLine2}</span>
        </div>
      </Reveal>
    </div>
  );
}

