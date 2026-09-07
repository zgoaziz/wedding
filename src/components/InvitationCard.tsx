"use client";

import HeroSection from "@/components/HeroSection";
import WeddingDaySection from "@/components/WeddingDaySection";
import LocationSection from "@/components/LocationSection";
import Gallery from "@/components/Gallery";
import AddToCalendar from "@/components/AddToCalendar";
import MessageSection from "@/components/MessageSection";
import ClosingSection from "@/components/ClosingSection";
import ShareSection from "@/components/ShareSection";
import CornerFlourish from "@/components/CornerFlourish";
import Countdown from "@/components/Countdown";
import { useLanguage } from "@/context/LanguageContext";
import Reveal from "@/components/Reveal";

function Divider() {
  return (
    <div className="mx-auto my-10 flex w-full max-w-sm items-center justify-center gap-3 opacity-75">
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[var(--color-gold)]/60" />
      <span className="text-xs text-[var(--color-gold)]">✦</span>
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[var(--color-gold)]/60" />
    </div>
  );
}

export default function InvitationCard() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="relative z-10 mx-auto w-full max-w-[520px]">
      {/* ONE SINGLE CONTINUOUS LUXURY INVITATION CARD */}
      <div className="relative overflow-hidden rounded-[36px] sm:rounded-[48px] bg-[#f7f3ec] border border-[var(--color-gold)]/50 shadow-[0_30px_90px_rgba(0,0,0,0.75)] transition-all duration-500">
        
        {/* 1. TOP Embossed Floral Garland - Pinned to the top of the single card */}
        <div
          className="pointer-events-none absolute top-0 inset-x-0 h-[360px] sm:h-[420px] z-0 overflow-hidden"
          style={{
            backgroundImage: "url('/images/1788805904169-image.png')",
            backgroundPosition: "top center",
            backgroundSize: "100% auto",
            backgroundRepeat: "no-repeat",
            maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)",
          }}
        />

        {/* 2. BOTTOM Embossed Floral Garland - Pinned to the bottom of the single card */}
        <div
          className="pointer-events-none absolute bottom-0 inset-x-0 h-[380px] sm:h-[440px] z-0 overflow-hidden"
          style={{
            backgroundImage: "url('/images/1788805904169-image.png')",
            backgroundPosition: "bottom center",
            backgroundSize: "100% auto",
            backgroundRepeat: "no-repeat",
            maskImage: "linear-gradient(to top, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)",
            WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)",
          }}
        />

        {/* 3. Four Corner Flourishes on the overall card */}
        <CornerFlourish className="corner-flourish left-3 top-3 z-10" />
        <CornerFlourish className="corner-flourish right-3 top-3 -scale-x-100 z-10" />
        <CornerFlourish className="corner-flourish bottom-3 left-3 -scale-y-100 z-10" />
        <CornerFlourish className="corner-flourish bottom-3 right-3 -scale-x-100 -scale-y-100 z-10" />

        {/* Language Switcher: EN | عربي (replaces 🔍) */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-1 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-[var(--color-ink)] shadow-md border border-[var(--color-gold)]/40 backdrop-blur-md">
          <button
            type="button"
            onClick={() => setLang("en")}
            className={`rounded-full px-1.5 py-0.5 transition-colors duration-200 ${
              lang === "en" ? "font-bold text-[var(--color-gold-dark)]" : "text-[var(--color-ink)]/60 hover:text-[var(--color-ink)]"
            }`}
          >
            EN
          </button>
          <span className="text-[var(--color-gold)]/50">|</span>
          <button
            type="button"
            onClick={() => setLang("ar")}
            className={`rounded-full px-1.5 py-0.5 font-heading transition-colors duration-200 ${
              lang === "ar" ? "font-bold text-[var(--color-gold-dark)]" : "text-[var(--color-ink)]/60 hover:text-[var(--color-ink)]"
            }`}
          >
            عربي
          </button>
        </div>

        {/* 4. Continuous Content Flow inside the single unbroken parchment */}
        <div className="relative z-10 px-5 pt-20 pb-16 sm:px-8 sm:pt-24 sm:pb-20">
          {/* Main Hero: Bismillah, Ayah, Family Invitation, Names Wael & Arij, Date, Venue */}
          <HeroSection />

          <Divider />

          {/* Countdown to wedding */}
          <Reveal className="w-full text-center">
            <div className="mb-2 flex items-center justify-center gap-2">
              <span className="text-xs text-[var(--color-gold)]">⏳</span>
              <span className="font-heading text-xs font-semibold tracking-wider text-[var(--color-gold-dark)] uppercase sm:text-sm">
                {lang === "ar" ? "العد التنازلي لموعد الفرح" : "Countdown to the Wedding"}
              </span>
              <span className="text-xs text-[var(--color-gold)]">⏳</span>
            </div>
            <Countdown />
          </Reveal>

          <Divider />

          {/* Scratch Card to reveal the date */}
          <WeddingDaySection />

          <Divider />

          {/* Venue & Location Map */}
          <LocationSection />

          <Divider />

          {/* Venue Photos & Story Gallery */}
          <Gallery />

          <Divider />

          {/* Add to Calendar */}
          <AddToCalendar />

          <Divider />

          {/* Word of Love / Message */}
          <MessageSection />

          <Divider />

          {/* Closing Blessing & Signature */}
          <ClosingSection />

          <Divider />

          {/* Share Invitation & QR Code */}
          <ShareSection />
        </div>
      </div>
    </div>
  );
}

