"use client";

import { useLanguage } from "@/context/LanguageContext";
import Reveal from "@/components/Reveal";
import { WEDDING_DATE } from "@/components/Countdown";

function formatICSDate(date: Date) {
  return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

export default function AddToCalendar() {
  const { t, lang } = useLanguage();

  const start = WEDDING_DATE;
  const end = new Date(start.getTime() + 4 * 60 * 60 * 1000);

  const title = lang === "ar" ? "حفل زفاف وائل و أريج" : "Wael & Arij's Wedding";
  const location = lang === "ar" ? "قاعة الأفراح الأميرة، قليبية، تونس" : "El Amira Wedding Hall, Kelibia, Tunisia";
  const description =
    lang === "ar" ? "يسعدنا حضوركم لمشاركتنا فرحتنا" : "We would be delighted to have you celebrate with us";

  const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    title,
  )}&dates=${formatICSDate(start)}/${formatICSDate(end)}&details=${encodeURIComponent(
    description,
  )}&location=${encodeURIComponent(location)}`;

  const handleDownloadICS = () => {
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Wedding Invitation//AR//EN",
      "BEGIN:VEVENT",
      `UID:${Date.now()}@wedding-invitation`,
      `DTSTAMP:${formatICSDate(new Date())}`,
      `DTSTART:${formatICSDate(start)}`,
      `DTEND:${formatICSDate(end)}`,
      `SUMMARY:${title}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${location}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "wedding-invitation.ics";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleClick = () => {
    const isAppleOrSafari = /iPhone|iPad|Macintosh/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
    if (isAppleOrSafari) {
      handleDownloadICS();
    } else {
      window.open(googleUrl, "_blank");
    }
  };

  return (
    <Reveal className="mx-auto w-full max-w-md">
      <button
        type="button"
        onClick={handleClick}
        className="gold-gradient-bg shimmer-bg flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-base font-bold text-white shadow-[0_10px_24px_rgba(140,100,40,0.35)] transition-transform duration-300 hover:scale-[1.02] active:scale-95 sm:text-lg"
        style={{
          backgroundImage:
            "linear-gradient(90deg, #cfa856 0%, #e9c98a 25%, #b58a3f 50%, #e9c98a 75%, #cfa856 100%)",
        }}
      >
        <span>📅</span>
        {t.addToCalendar}
      </button>
    </Reveal>
  );
}
