import FeatherCanvas from "@/components/FeatherCanvas";

export default function PageBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#161616]">
      {/* Dark luxury atmospheric glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#2a241e] via-[#1a1815] to-[#100f0e] opacity-95" />
      
      {/* Subtle warm golden accent lights */}
      <div className="absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-[var(--color-gold)]/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-[var(--color-gold)]/10 blur-3xl pointer-events-none" />

      {/* Floating golden particles / feathers */}
      <FeatherCanvas />
    </div>
  );
}
