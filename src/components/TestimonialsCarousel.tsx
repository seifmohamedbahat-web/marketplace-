import { useTranslation } from "react-i18next";
import { Stars } from "./Stars";

type Item = { quote: string; name: string; role: string };

export function TestimonialsCarousel() {
  const { t, i18n } = useTranslation();
  const items = t("reviews.items", { returnObjects: true }) as Item[];
  const looped = [...items, ...items];
  const isRtl = i18n.language === "ar";

  return (
    <div className="relative overflow-hidden py-4">
      <div className="pointer-events-none absolute inset-y-0 start-0 w-32 z-10" style={{ background: "linear-gradient(to right, #000 0%, transparent 100%)" }} />
      <div className="pointer-events-none absolute inset-y-0 end-0 w-32 z-10" style={{ background: "linear-gradient(to left, #000 0%, transparent 100%)" }} />
      <div className={`flex gap-6 w-max ${isRtl ? "animate-marquee-rtl" : "animate-marquee"}`}>
        {looped.map((item, idx) => (
          <article
            key={idx}
            className="w-[320px] md:w-[400px] shrink-0 bg-black border-2 border-white/20 p-6 red-glow-hover"
          >
            <Stars />
            <p className="mt-4 italic text-white leading-relaxed">&ldquo;{item.quote}&rdquo;</p>
            <div className="mt-6">
              <p className="font-display tracking-wider text-white">{item.name}</p>
              <p className="text-white/60 text-sm">{item.role}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}