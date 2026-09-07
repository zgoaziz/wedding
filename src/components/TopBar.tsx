"use client";

import { useState, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function TopBar() {
  const { lang, setLang } = useLanguage();
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().catch(() => {
        /* autoplay might be blocked; ignore */
      });
      setPlaying(true);
    }
  };

  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-40 flex items-center justify-start px-4 sm:top-6 sm:px-6">
      <audio ref={audioRef} loop preload="none" />
      <button
        type="button"
        onClick={toggleMusic}
        aria-label="toggle music"
        className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full bg-[#2a2825]/85 text-white shadow-lg backdrop-blur-md border border-[var(--color-gold)]/30 transition-transform duration-300 hover:scale-110 active:scale-95 sm:h-10 sm:w-10"
      >
        {playing ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="animate-pulse text-[var(--color-gold-light)]">
            <path d="M9 9h2v6H9zM13 9h2v6h-2z" />
            <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.4" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-white/90">
            <path d="M9 18V5l12-2v13" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="6" cy="18" r="3" fill="none" stroke="currentColor" strokeWidth="1.6" />
            <circle cx="18" cy="16" r="3" fill="none" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        )}
      </button>
    </div>
  );
}
