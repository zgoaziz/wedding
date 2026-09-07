"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SectionTitle({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const titleRef = useRef<HTMLDivElement | null>(null);
  const lineRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (!lineRef.current || !titleRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 88%",
          },
        },
      );
    }, titleRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={titleRef} className={`mb-6 text-center ${className}`}>
      <h2 className="font-heading text-2xl font-semibold text-[var(--color-gold-dark)] sm:text-3xl">
        {children}
      </h2>
      <span
        ref={lineRef}
        className="mx-auto mt-2 block h-[2px] w-12 origin-center bg-gradient-to-r from-transparent via-[var(--color-gold)] to-transparent"
      />
    </div>
  );
}
