import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Amiri, Reem_Kufi, Noto_Kufi_Arabic } from "next/font/google";
import "./globals.css";

const amiri = Amiri({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  variable: "--font-amiri",
  display: "swap",
});

const reemKufi = Reem_Kufi({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-reem-kufi",
  display: "swap",
});

const notoKufi = Noto_Kufi_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-noto-kufi",
  display: "swap",
});

export const metadata: Metadata = {
  title: "وائل & أريج | دعوة زفاف",
  description: "دعوة حفل زفاف وائل و أريج - 14 سبتمبر 2026",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={`${amiri.variable} ${reemKufi.variable} ${notoKufi.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
