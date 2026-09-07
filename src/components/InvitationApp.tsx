"use client";

import { useEffect, useState } from "react";
import { LanguageProvider } from "@/context/LanguageContext";
import PageBackground from "@/components/PageBackground";
import TopBar from "@/components/TopBar";
import IntroGate from "@/components/IntroGate";
import InvitationCard from "@/components/InvitationCard";

export default function InvitationApp() {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    document.body.style.overflow = entered ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [entered]);

  return (
    <LanguageProvider>
      <PageBackground />
      <TopBar />
      <main className="relative z-10 min-h-screen w-full px-3 pb-16 pt-6 sm:px-6 sm:pt-10">
        <InvitationCard />
      </main>
      {!entered && <IntroGate onEnter={() => setEntered(true)} />}
    </LanguageProvider>
  );
}
