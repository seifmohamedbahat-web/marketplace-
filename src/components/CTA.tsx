import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export function CTA() {
  const { t } = useTranslation();

  return (
    <section className="relative bg-black py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="red-glow border border-brand bg-black px-6 py-16 md:py-20 text-center"
        >
          <h2 className="font-display font-normal uppercase text-4xl md:text-5xl leading-tight">
            {t("finalCta.heading")}
          </h2>
          <p className="mt-5 text-white/70 text-lg max-w-xl mx-auto">
            {t("finalCta.subline")}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/start"
              className="animate-pulse-red w-full sm:w-auto border border-brand bg-brand px-8 py-4 font-display text-sm uppercase tracking-widest text-white transition-transform hover:scale-105"
            >
              {t("finalCta.primary")}
            </Link>
            <Link
              to="/contact"
              className="w-full sm:w-auto border border-white px-8 py-4 font-display text-sm uppercase tracking-widest text-white transition-all hover:scale-105 hover:border-brand hover:text-accent-x"
            >
              {t("finalCta.secondary")}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
