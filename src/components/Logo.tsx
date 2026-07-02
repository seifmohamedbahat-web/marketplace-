import { Link } from "@tanstack/react-router";

const SIZE_CLASSES = {
  nav: "text-2xl md:text-3xl",
  hero: "text-4xl md:text-6xl",
  footer: "text-3xl md:text-4xl",
} as const;

export function Logo({ size = "nav" }: { size?: keyof typeof SIZE_CLASSES }) {
  return (
    <Link
      to="/"
      aria-label="Avexa — home"
      className={`inline-block font-display font-black uppercase tracking-tight leading-none transition-transform duration-300 hover:scale-105 ${SIZE_CLASSES[size]}`}
    >
      <span className="text-white">Ave</span>
      <span className="text-accent-x">x</span>
      <span className="text-white">a</span>
    </Link>
  );
}
