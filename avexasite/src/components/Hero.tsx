import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Particles } from "./Particles";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.2 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-black pt-20">
      <Particles />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto max-w-5xl px-5 md:px-8 text-center"
      >
        <motion.h1
          variants={item}
          className="font-display font-black uppercase leading-[0.95] text-6xl md:text-8xl"
        >
          <span className="block text-white">{t("hero.line1")}</span>
          <span className="block text-accent-x">{t("hero.line2")}</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mx-auto mt-8 max-w-2xl text-lg md:text-xl text-white/70 leading-relaxed"
        >
          {t("hero.subline")}
        </motion.p>

        <motion.div variants={item} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/start"
            className="animate-pulse-red w-full sm:w-auto border border-brand bg-brand px-8 py-4 font-display text-sm uppercase tracking-widest text-white transition-transform hover:scale-105"
          >
            {t("hero.ctaPrimary")}
          </Link>
          <a
            href="#portfolio"
            className="w-full sm:w-auto border border-white px-8 py-4 font-display text-sm uppercase tracking-widest text-white transition-all hover:scale-105 hover:border-brand hover:text-accent-x"
          >
            {t("hero.ctaSecondary")}
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
