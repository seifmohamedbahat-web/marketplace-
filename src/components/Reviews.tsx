import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { reviews, type Review } from "../data/reviews";
import { useLanguage } from "../i18n/LanguageProvider";
import { StarRating } from "./StarRating";

function ReviewCard({ review }: { review: Review }) {
  const { language } = useLanguage();

  return (
    <div className="w-[320px] md:w-[400px] shrink-0 border border-white/10 bg-black p-6 red-glow-hover transition-transform duration-300 hover:-translate-y-1.5">
      <div className="mb-4">
        <StarRating />
      </div>
      <p className="italic text-white/80 leading-relaxed">
        "{review.quote[language] ?? review.quote.en}"
      </p>
      <div className="mt-5">
        <p className="font-display uppercase tracking-wide text-sm">{review.name}</p>
        <p className="text-xs text-white/50">{review.role[language] ?? review.role.en}</p>
      </div>
    </div>
  );
}

export function Reviews() {
  const { t } = useTranslation();
  const { dir } = useLanguage();

  const track = [...reviews, ...reviews];
  const marqueeClass = dir === "rtl" ? "animate-marquee" : "animate-marquee-rtl";

  return (
    <section className="relative bg-black py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <p className="font-display uppercase tracking-[0.3em] text-accent-x text-sm mb-4">
            {t("reviews.eyebrow")}
          </p>
          <h2 className="font-display font-bold uppercase text-4xl md:text-5xl leading-tight">
            {t("reviews.heading")}
          </h2>
        </motion.div>
      </div>

      <div className="marquee-mask overflow-hidden">
        <div className={`marquee-track flex w-max gap-6 px-3 ${marqueeClass}`}>
          {track.map((review, i) => (
            <ReviewCard key={`${review.id}-${i}`} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}
