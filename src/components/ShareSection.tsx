"use client";

import { useState } from "react";
import QRCode from "qrcode";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import Reveal from "@/components/Reveal";

export default function ShareSection() {
  const { t, lang } = useLanguage();
  const [qrUrl, setQrUrl] = useState<string | null>(null);
  const [showQr, setShowQr] = useState(false);
  const [copied, setCopied] = useState(false);

  const getPageUrl = () => {
    return typeof window !== "undefined" ? window.location.href : "https://ghassenlarnaout.com";
  };

  const handleCopyLink = async () => {
    const url = getPageUrl();
    let success = false;

    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(url);
        success = true;
      } catch {
        success = false;
      }
    }

    // Fallback using textarea
    if (!success) {
      try {
        const textArea = document.createElement("textarea");
        textArea.value = url;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        textArea.style.top = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        success = true;
      } catch {
        success = false;
      }
    }

    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleToggleQR = async () => {
    if (!qrUrl) {
      const url = getPageUrl();
      const dataUrl = await QRCode.toDataURL(url, {
        margin: 2,
        width: 280,
        color: {
          dark: "#2b2621",
          light: "#ffffff",
        },
      });
      setQrUrl(dataUrl);
    }
    setShowQr((prev) => !prev);
  };

  const handleDownloadQR = () => {
    if (!qrUrl) return;
    const a = document.createElement("a");
    a.href = qrUrl;
    a.download = "wael-arij-invitation-qr.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <Reveal className="mx-auto w-full max-w-md pb-2 text-center">
      {/* Title */}
      <p className="mb-4 font-heading text-sm font-semibold tracking-wide text-[var(--color-brown)] sm:text-base">
        {t.shareInvite}
      </p>

      {/* Action Buttons: Copy Link & QR Code */}
      <div className="grid grid-cols-2 gap-3">
        {/* Copy Link */}
        <button
          type="button"
          onClick={handleCopyLink}
          className={`flex items-center justify-center gap-1.5 rounded-full border px-4 py-3.5 text-xs font-semibold shadow-sm transition-all duration-300 hover:scale-[1.02] active:scale-95 sm:text-sm ${
            copied
              ? "border-emerald-500 bg-emerald-50 text-emerald-700"
              : "border-[var(--color-gold)]/45 bg-white/75 text-[var(--color-ink)] hover:bg-white"
          }`}
        >
          <span>{copied ? "✓" : "🔗"}</span>
          <span className="truncate">{copied ? t.linkCopied : t.copyLink}</span>
        </button>

        {/* Show / Hide QR Code */}
        <button
          type="button"
          onClick={handleToggleQR}
          className="flex items-center justify-center gap-1.5 rounded-full border border-[var(--color-gold)]/45 bg-white/75 px-4 py-3.5 text-xs font-semibold text-[var(--color-ink)] shadow-sm transition-all duration-300 hover:bg-white hover:scale-[1.02] active:scale-95 sm:text-sm"
        >
          <span>▦</span>
          <span className="truncate">{t.shareQR}</span>
        </button>
      </div>

      {/* QR Code Animated Card */}
      <AnimatePresence>
        {showQr && qrUrl && (
          <motion.div
            initial={{ opacity: 0, height: 0, scale: 0.92 }}
            animate={{ opacity: 1, height: "auto", scale: 1 }}
            exit={{ opacity: 0, height: 0, scale: 0.92 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="mx-auto mt-4 overflow-hidden"
          >
            <div className="flex flex-col items-center rounded-2xl border border-[var(--color-gold)]/40 bg-white p-5 shadow-[0_12px_30px_rgba(0,0,0,0.12)]">
              <p className="mb-3 font-heading text-xs font-medium text-[var(--color-brown)]">
                {lang === "ar" ? "امسح الرمز لفتح الدعوة مباشرة" : "Scan to open invitation directly"}
              </p>
              
              <div className="rounded-xl border border-stone-200 p-2 bg-white shadow-inner">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={qrUrl} alt="Wedding Invitation QR Code" width={190} height={190} className="block rounded-lg" />
              </div>

              <button
                type="button"
                onClick={handleDownloadQR}
                className="mt-4 flex items-center gap-1.5 rounded-full border border-[var(--color-gold)]/50 bg-[var(--color-paper)]/50 px-4 py-1.5 text-xs font-semibold text-[var(--color-gold-dark)] hover:bg-[var(--color-gold)]/15 transition-colors"
              >
                <span>💾</span>
                {t.downloadQR}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Reveal>
  );
}

