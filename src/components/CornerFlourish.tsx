export default function CornerFlourish({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 60 60"
      className={className}
      fill="none"
      stroke="var(--color-gold)"
      strokeWidth="1.2"
      aria-hidden="true"
    >
      <path d="M4 4 Q4 30 30 30 M4 4 Q30 4 30 30" strokeLinecap="round" />
      <path d="M4 14 Q4 4 14 4" strokeLinecap="round" opacity="0.7" />
      <circle cx="30" cy="30" r="2" fill="var(--color-gold)" stroke="none" opacity="0.8" />
    </svg>
  );
}
