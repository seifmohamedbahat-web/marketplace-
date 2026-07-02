import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Particles } from "../components/Particles";

export const Route = createFileRoute("/thank-you")({ component: ThankYouPage });

function ThankYouPage() {
  const { t } = useTranslation();

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-black pt-20">
      <Particles />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 mx-auto max-w-2xl px-5 md:px-8 text-center"
      >
        <h1 className="font-heading font-black uppercase text-6xl md:text-8xl leading-none text-white">
          {t("thankYou.heading")}
        </h1>
        <p className="mt-8 text-lg md:text-xl text-white/70 leading-relaxed">
          {t("thankYou.subtitle")}
        </p>
        <Link
          to="/"
          className="mt-10 inline-block animate-pulse-red border border-brand bg-brand px-8 py-4 font-heading text-sm uppercase tracking-widest text-white transition-transform hover:scale-105"
        >
          {t("thankYou.back")}
        </Link>
        <p className="mt-8 text-sm text-white/40">{t("thankYou.fallback")}</p>
      </motion.div>
    </section>
  );
}
