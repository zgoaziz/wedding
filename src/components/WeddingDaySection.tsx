"use client";

import { useLanguage } from "@/context/LanguageContext";
import SectionTitle from "@/components/SectionTitle";
import ScratchHeart from "@/components/ScratchHeart";
import Reveal from "@/components/Reveal";

export default function WeddingDaySection() {
  const { t } = useLanguage();

  return (
    <div className="mx-auto w-full max-w-md">
      <SectionTitle>{t.weddingDayTitle}</SectionTitle>
      <Reveal delay={0.1}>
        <ScratchHeart />
      </Reveal>
    </div>
  );
}
