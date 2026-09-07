"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export const WEDDING_DATE = new Date("2026-09-14T21:00:00+01:00");

function getRemaining() {
  const now = new Date().getTime();
  const diff = Math.max(0, WEDDING_DATE.getTime() - now);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export default function Countdown() {
  const { t } = useLanguage();
  const [time, setTime] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(
    null,
  );

  useEffect(() => {
    setTime(getRemaining());
    const interval = setInterval(() => setTime(getRemaining()), 1000);
    return () => clearInterval(interval);
  }, []);

  const units = [
    { value: time?.seconds ?? 0, label: t.countdown.seconds },
    { value: time?.minutes ?? 0, label: t.countdown.minutes },
    { value: time?.hours ?? 0, label: t.countdown.hours },
    { value: time?.days ?? 0, label: t.countdown.days },
  ];

  return (
    <div className="relative mx-auto mt-4 w-full max-w-[360px]">
      <div className="arch-box border border-[var(--color-gold)]/35 bg-white/60 px-3 py-6 shadow-inner backdrop-blur-sm sm:px-5">
        <div className="flex items-stretch justify-center gap-1.5 sm:gap-3">
          {units.map((unit, i) => (
            <div key={unit.label} className="flex items-center gap-1.5 sm:gap-3">
              <div className="flex min-w-[52px] flex-col items-center gap-1 sm:min-w-[64px]">
                <span
                  key={unit.value}
                  className="font-display text-2xl font-bold text-[var(--color-ink)] tabular-nums animate-[fadeInUp_0.4s_ease]"
                >
                  {pad(unit.value)}
                </span>
                <span className="text-[10px] text-[var(--color-brown)]/80 sm:text-xs">{unit.label}</span>
              </div>
              {i < units.length - 1 && <span className="pb-4 text-[var(--color-gold)]">:</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
