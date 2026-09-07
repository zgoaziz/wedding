"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import Reveal from "@/components/Reveal";

interface GalleryItem {
  src: string;
  title: string;
  titleEn: string;
  aspect: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    src: "/images/Salle-Des-Fetes-Amira4-1024x684.jpg",
    title: "قاعة الأفراح الأميرة",
    titleEn: "El Amira Grand Hall",
    aspect: "aspect-[1024/684]",
  },
  {
    src: "/images/images.jpg",
    title: "مدخل القاعة",
    titleEn: "Venue Entrance",
    aspect: "aspect-[1/1]",
  },
];

export default function Gallery() {
  const { lang, t } = useLanguage();
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  return (
    <Reveal className="mx-auto w-full max-w-md py-2">
      <p className="mb-5 text-center font-heading text-base font-semibold text-[var(--color-brown)] sm:text-lg">
        {t.galleryTitle}
      </p>

      {/* Gallery Polaroid Cards */}
      <div className="flex items-center justify-center gap-4 sm:gap-6">
        {GALLERY_ITEMS.map((item, idx) => (
          <motion.div
            key={item.src}
            whileHover={{ scale: 1.05, rotate: idx === 0 ? -2 : 2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedItem(item)}
            className={`cursor-pointer rounded-xl bg-white p-2.5 pb-4 shadow-[0_12px_28px_rgba(0,0,0,0.15)] border border-black/5 transition-shadow hover:shadow-[0_16px_35px_rgba(181,138,63,0.25)] ${
              idx === 0
                ? "w-[155px] sm:w-[185px] rotate-[-3deg]"
                : "w-[145px] sm:w-[175px] rotate-[3deg]"
            }`}
          >
            <div className={`relative w-full overflow-hidden rounded-lg bg-stone-100 ${item.aspect}`}>
              <Image
                src={item.src}
                alt={lang === "ar" ? item.title : item.titleEn}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 180px, 220px"
              />
              <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors flex items-center justify-center">
                <span className="opacity-0 hover:opacity-100 text-white text-xs bg-black/60 px-2 py-1 rounded-full backdrop-blur-xs">🔍</span>
              </div>
            </div>
            <p className="mt-2 text-center text-xs font-semibold text-[var(--color-brown)] sm:text-sm truncate">
              {lang === "ar" ? item.title : item.titleEn}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Full-Screen Lightbox Modal without shrinking */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 p-3 sm:p-6 backdrop-blur-md"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative flex flex-col items-center max-h-[92vh] max-w-[95vw] rounded-2xl bg-[#1c1a18] p-2 border border-[var(--color-gold)]/40 shadow-2xl overflow-hidden"
            >
              {/* Close button */}
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-white/90 hover:bg-black hover:text-white transition-colors"
                aria-label="Close modal"
              >
                ✕
              </button>

              {/* Full high-res image */}
              <div className="relative max-h-[80vh] max-w-[88vw] overflow-auto rounded-lg">
                <img
                  src={selectedItem.src}
                  alt={lang === "ar" ? selectedItem.title : selectedItem.titleEn}
                  className="max-h-[78vh] w-auto max-w-full object-contain rounded-md"
                />
              </div>

              <div className="mt-2 px-3 py-1 text-center font-heading text-xs text-[var(--color-gold-light)] sm:text-sm">
                {lang === "ar" ? selectedItem.title : selectedItem.titleEn}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Reveal>
  );
}

