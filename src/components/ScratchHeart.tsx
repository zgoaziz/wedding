"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import { useLanguage } from "@/context/LanguageContext";

const HEART_CLIP =
  "50% 2%, 65% 0%, 80% 4%, 92% 14%, 98% 28%, 98% 43%, 90% 58%, 50% 98%, 10% 58%, 2% 43%, 2% 28%, 8% 14%, 20% 4%, 35% 0%";

export default function ScratchHeart() {
  const { t } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [revealed, setRevealed] = useState(false);
  const isDrawing = useRef(false);
  const lastCheck = useRef(0);

  const drawScratchLayer = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { width, height } = canvas;

    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "#f3d999");
    gradient.addColorStop(0.35, "#d9b25b");
    gradient.addColorStop(0.7, "#b58a3f");
    gradient.addColorStop(1, "#8d6a2c");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // decorative sparkles pattern
    ctx.fillStyle = "rgba(255,255,255,0.35)";
    const rand = (seed: number) => {
      const x = Math.sin(seed * 999) * 10000;
      return x - Math.floor(x);
    };
    for (let i = 0; i < 26; i++) {
      const x = rand(i + 1) * width;
      const y = rand(i + 50) * height;
      const r = 1 + rand(i + 100) * 2;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.font = `${Math.max(14, width * 0.09)}px serif`;
    ctx.textAlign = "center";
    ctx.fillText("✦", width * 0.28, height * 0.35);
    ctx.fillText("✦", width * 0.72, height * 0.62);
    ctx.fillText("✧", width * 0.5, height * 0.22);

    ctx.textAlign = "center";
    ctx.fillStyle = "rgba(255,255,255,0.55)";
    ctx.font = `${Math.max(11, width * 0.06)}px var(--font-body), sans-serif`;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      drawScratchLayer();
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [drawScratchLayer]);

  const checkProgress = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const now = Date.now();
    if (now - lastCheck.current < 200) return;
    lastCheck.current = now;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const sample = 24;
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let cleared = 0;
    let total = 0;
    const stepX = Math.max(1, Math.floor(canvas.width / sample));
    const stepY = Math.max(1, Math.floor(canvas.height / sample));
    for (let y = 0; y < canvas.height; y += stepY) {
      for (let x = 0; x < canvas.width; x += stepX) {
        const idx = (y * canvas.width + x) * 4 + 3;
        total++;
        if (data[idx] < 60) cleared++;
      }
    }
    if (total > 0 && cleared / total > 0.5) {
      revealAll();
    }
  }, []);

  const revealAll = () => {
    setRevealed((prev) => {
      if (prev) return prev;
      fireConfetti();
      return true;
    });
  };

  const fireConfetti = () => {
    const colors = ["#b58a3f", "#eecf8f", "#8d6a2c", "#f5e3bb"];
    confetti({
      particleCount: 90,
      spread: 80,
      startVelocity: 32,
      origin: { y: 0.55 },
      colors,
      scalar: 0.9,
    });
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 60,
      origin: { x: 0, y: 0.6 },
      colors,
    });
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 60,
      origin: { x: 1, y: 0.6 },
      colors,
    });
  };

  const scratchAt = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, Math.max(22, canvas.width * 0.12), 0, Math.PI * 2);
    ctx.fill();
    checkProgress();
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (revealed) return;
    isDrawing.current = true;
    scratchAt(e.clientX, e.clientY);
  };
  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current || revealed) return;
    scratchAt(e.clientX, e.clientY);
  };
  const stopDrawing = () => {
    isDrawing.current = false;
  };

  return (
    <div className="flex flex-col items-center gap-5">
      <div
        ref={wrapRef}
        className="relative aspect-[15/14] w-[220px] sm:w-[260px]"
        style={{ filter: "drop-shadow(0 18px 30px rgba(140,100,40,0.35))" }}
      >
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-white text-center"
          style={{ clipPath: `polygon(${HEART_CLIP})` }}
        >
          <span className="font-heading text-sm text-[var(--color-gold-dark)] sm:text-base">
            {t.revealedDay}
          </span>
          <span className="font-display text-5xl font-bold text-[var(--color-ink)] sm:text-6xl">
            {t.revealedDate}
          </span>
          <span className="text-sm text-[var(--color-brown)] sm:text-base">{t.revealedMonth}</span>
        </div>

        <canvas
          ref={canvasRef}
          className={`absolute inset-0 h-full w-full touch-none transition-opacity duration-700 ${
            revealed ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
          style={{ clipPath: `polygon(${HEART_CLIP})` }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={stopDrawing}
          onPointerLeave={stopDrawing}
        />

        <span className="absolute -bottom-2 -left-2 text-2xl select-none sm:text-3xl">✨</span>
      </div>

      <p className="text-sm text-[var(--color-brown)]/90 transition-all duration-500 sm:text-base">
        {revealed ? t.scratchRevealed : t.scratchHint}
      </p>
    </div>
  );
}
