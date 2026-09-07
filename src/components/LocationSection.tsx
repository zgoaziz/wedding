"use client";

import { useLanguage } from "@/context/LanguageContext";
import Reveal from "@/components/Reveal";

const MAPS_QUERY = "Kelibia, Nabeul, Tunisia";
const EMBED_SRC = `https://www.google.com/maps?q=${encodeURIComponent(MAPS_QUERY)}&z=15&output=embed`;
const DIRECTIONS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAPS_QUERY)}`;

export default function LocationSection() {
  const { t } = useLanguage();

  return (
    <Reveal className="mx-auto w-full max-w-md">
      <div className="rounded-[28px] border border-[var(--color-gold)]/25 bg-white/70 p-5 shadow-[0_10px_30px_rgba(120,90,40,0.12)] backdrop-blur-sm sm:p-6">
        <p className="text-center text-sm text-[var(--color-ink)]/70 sm:text-base">{t.timeAt}</p>
        <div className="ornate-divider my-2">
          <h3 className="whitespace-nowrap font-heading text-lg font-semibold text-[var(--color-gold-dark)] sm:text-xl">
            {t.venueName}
          </h3>
        </div>

        <div className="relative mt-4 overflow-hidden rounded-2xl border border-black/10 shadow-inner">
          <a
            href={DIRECTIONS_URL}
            target="_blank"
            rel="noreferrer"
            className="absolute left-3 top-3 z-10 flex items-center gap-1 rounded-md bg-white px-2.5 py-1 text-xs font-semibold text-blue-600 shadow-md transition-transform hover:scale-105"
          >
            {t.mapsLink}
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
              <path d="M7 17L17 7M9 7h8v8" />
            </svg>
          </a>
          <iframe
            title="wedding-venue-map"
            src={EMBED_SRC}
            width="100%"
            height="220"
            loading="lazy"
            className="grayscale-[15%]"
            style={{ border: 0 }}
          />
        </div>

        <div className="mt-4 text-center text-sm text-[var(--color-ink)]/75 sm:text-base">
          <p>{t.addressLine1}</p>
          <p>{t.addressLine2}</p>
        </div>

        <div className="mt-4 rounded-xl border border-[var(--color-gold)]/25 bg-[var(--color-paper)]/60 px-4 py-3 text-center text-xs text-[var(--color-ink)]/65 sm:text-sm">
          {t.weatherNote}
        </div>

        <a
          href={DIRECTIONS_URL}
          target="_blank"
          rel="noreferrer"
          className="group mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-[var(--color-gold)]/60 bg-transparent px-6 py-3 text-sm font-semibold text-[var(--color-gold-dark)] transition-all duration-300 hover:bg-[var(--color-gold)]/10 hover:tracking-wide sm:text-base"
        >
          <span>🗺️</span>
          {t.viewLocationBtn}
        </a>
      </div>
    </Reveal>
  );
}
