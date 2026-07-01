import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { Globe, ChartColumn, Settings2, ArrowRight } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ParticlesBg } from "@/components/ParticlesBg";
import { Portfolio } from "@/components/Portfolio";
import { TestimonialsCarousel } from "@/components/TestimonialsCarousel";
import { CountUp } from "@/components/CountUp";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Avexa — We Build, You Earn" },
      { name: "description", content: "Avexa designs & develops stunning websites, dashboards, and systems that drive real results." },
    ],
  }),
  component: Index,
});

const fade = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } };

function Index() {
  const { t } = useTranslation();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash === "#portfolio") {
      setTimeout(() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" }), 50);
    }
  }, []);

  const services = [
    { key: "websites", Icon: Globe },
    { key: "dashboards", Icon: ChartColumn },
    { key: "systems", Icon: Settings2 },
  ] as const;

  return (
    <>
      <Nav />

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
        <ParticlesBg count={40} />
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7 }}
            className="text-6xl md:text-8xl font-black leading-[0.95]"
          >
            <span className="block">{t("hero.title1")}</span>
            <span className="block text-accent-x">{t("hero.title2")}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.7 }}
            className="mt-6 text-lg md:text-xl text-white/70 max-w-2xl mx-auto"
          >
            {t("hero.subtitle")}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.7 }}
            className="mt-10 flex flex-wrap gap-4 justify-center"
          >
            <Link
              to="/start"
              className="px-8 py-4 bg-[#C41E1E] text-white font-display tracking-widest border-2 border-[#C41E1E] red-glow animate-pulse-red hover:scale-105 transition-transform inline-flex items-center gap-2"
            >
              {t("hero.ctaPrimary")} <ArrowRight size={18} />
            </Link>
            <a
              href="#portfolio"
              className="px-8 py-4 border-2 border-white text-white font-display tracking-widest hover:bg-[#C41E1E] hover:border-[#C41E1E] transition-all"
            >
              {t("hero.ctaSecondary")}
            </a>
          </motion.div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2 variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center text-5xl md:text-7xl font-black mb-16">
            {t("services.heading1")} <span className="text-accent-x">{t("services.heading2")}</span>
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-6">
            {services.map((s, i) => {
              const Icon = s.Icon;
              return (
                <motion.div
                  key={s.key}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-black border-2 border-white/20 p-8 red-glow-hover"
                >
                  <div className="w-14 h-14 border-2 border-[#C41E1E] flex items-center justify-center text-[#C41E1E] mb-5">
                    <Icon size={28} />
                  </div>
                  <h3 className="text-2xl font-display tracking-wider text-white mb-3">{t(`services.${s.key}.title`)}</h3>
                  <p className="text-white/70 leading-relaxed">{t(`services.${s.key}.desc`)}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <Portfolio />

      {/* ABOUT */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2 variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center text-5xl md:text-7xl font-black mb-16">
            {t("about.heading1")} <span className="text-accent-x">{t("about.heading2")}</span>
          </motion.h2>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="w-full text-center">
            <h3 className="text-3xl md:text-5xl font-display tracking-wider text-white leading-tight max-w-5xl mx-auto">
              {t("about.title")}
            </h3>
            <p className="mt-8 text-white/70 leading-relaxed text-lg max-w-5xl mx-auto">
              {t("about.body")}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto"
          >
            {[
              { v: 150, s: "+", k: "projects" },
              { v: 100, s: "+", k: "clients" },
              { v: 3, s: "+", k: "years" },
              { v: 99, s: "%", k: "satisfaction" },
            ].map((stat) => (
              <div key={stat.k} className="text-center border-2 border-white/20 py-6 px-4 red-glow-hover">
                <div className="text-4xl md:text-5xl font-display font-black text-[#C41E1E]">
                  <CountUp to={stat.v} suffix={stat.s} />
                </div>
                <div className="text-white/70 text-xs md:text-sm tracking-widest uppercase mt-2">{t(`about.stats.${stat.k}`)}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2 variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center text-5xl md:text-7xl font-black mb-12">
            {t("reviews.heading1")} <span className="text-accent-x">{t("reviews.heading2")}</span> {t("reviews.heading3")}
          </motion.h2>
        </div>
        <TestimonialsCarousel />
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto bg-black border-2 border-[#C41E1E] red-glow p-12 md:p-16 text-center"
        >
          <h2 className="text-4xl md:text-6xl font-black">{t("cta.heading")}</h2>
          <p className="mt-4 text-white/70 max-w-2xl mx-auto">{t("cta.subtext")}</p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link
              to="/start"
              className="px-10 py-4 bg-[#C41E1E] text-white font-display tracking-widest border-2 border-[#C41E1E] animate-pulse-red hover:scale-105 transition-transform"
            >
              {t("cta.button")}
            </Link>
            <Link to="/contact" className="px-10 py-4 border-2 border-white text-white font-display tracking-widest hover:bg-[#C41E1E] hover:border-[#C41E1E] transition-all">
              {t("cta.or")}
            </Link>
          </div>
        </motion.div>
      </section>

      <Footer />
    </>
  );
}
