"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function IntroGate({ onEnter }: { onEnter: () => void }) {
  const { t } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleStartOpen = () => {
    if (isPlaying) return;
    setIsPlaying(true);
    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      video.play().catch(() => {
        // Fallback if autoplay policy blocks
        onEnter();
      });
    }
  };

  const handleVideoEnded = () => {
    // Call immediately — no delay so there's no "stuck" freeze
    onEnter();
  };

  return (
    <AnimatePresence>
      <motion.div
        key="intro"
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0e0d0c]/95 backdrop-blur-md overflow-hidden px-3 py-4"
        exit={{ opacity: 0, scale: 1.04, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
      >
        <div className="relative flex flex-col items-center justify-center w-full">
          {/* Video — height-driven: fits in viewport without scrolling, width is derived from 9:16 ratio */}
          <div
            onClick={handleStartOpen}
            className="group relative cursor-pointer rounded-[24px] sm:rounded-[32px] border border-[var(--color-gold)]/40 shadow-[0_30px_90px_rgba(0,0,0,0.85)] transition-all duration-500 hover:border-[var(--color-gold)]/70 hover:shadow-[0_35px_100px_rgba(181,138,63,0.35)]"
            style={{
              /* Height = 80% of viewport (leaves room for skip button + padding) */
              height: "min(80vh, calc((100vw - 24px) * 1280 / 720))",
              /* Width follows automatically from aspect ratio */
              width: "auto",
              aspectRatio: "720 / 1280",
              maxWidth: "calc(100vw - 24px)",
            }}
          >
            <video
              ref={videoRef}
              src="/Wedding_invitation_envelope_opening_202609072147.mp4"
              playsInline
              preload="auto"
              onEnded={handleVideoEnded}
              className="h-full w-full object-contain block"
            />
          </div>

          {/* Skip button */}
          <button
            type="button"
            onClick={onEnter}
            className="mt-4 flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 text-xs text-white/85 shadow-md backdrop-blur-md border border-white/15 transition-all hover:bg-white/20 hover:text-white sm:text-sm"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M15 6l-6 6 6 6" />
            </svg>
            {t.skipToDetails}
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
