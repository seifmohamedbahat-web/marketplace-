import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { portfolioProjects, localize, type PortfolioProject } from "../data/portfolio";
import type { SupportedLanguage } from "../i18n";
import { useLanguage } from "../i18n/LanguageProvider";
import { Modal } from "./Modal";
import { StarRating } from "./StarRating";

function ProjectCard({
  project,
  lang,
  onOpen,
}: {
  project: PortfolioProject;
  lang: SupportedLanguage;
  onOpen: () => void;
}) {
  const { t } = useTranslation();

  return (
    <div className="group w-[320px] md:w-[380px] shrink-0 border border-white/10 bg-black text-start red-glow-hover transition-transform duration-300 hover:-translate-y-1.5">
      <button
        type="button"
        onClick={onOpen}
        aria-label={`${t("portfolio.viewProject")}: ${project.name}`}
        className="block aspect-video w-full overflow-hidden bg-white/5"
      >
        <img
          src={project.image}
          alt={project.name}
          loading="lazy"
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
      </button>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display font-bold uppercase text-lg tracking-wide">{project.name}</h3>
          <span className="shrink-0 rounded-full bg-brand px-3 py-1 text-xs font-display text-white">
            {localize(project.type, lang)}
          </span>
        </div>
        <div className="mt-2">
          <StarRating size={14} />
        </div>
        <p className="mt-2 text-sm text-white/60 line-clamp-2">
          {localize(project.description, lang)}
        </p>
        <button
          type="button"
          onClick={onOpen}
          className="mt-4 flex w-full items-center justify-center gap-2 border border-white/70 px-4 py-2.5 font-display text-sm text-white transition-all duration-300 hover:gap-3 hover:scale-105 hover:border-brand hover:bg-brand active:scale-95"
        >
          {t("portfolio.learnMore")}
          <ArrowRight size={14} className="rtl:rotate-180" />
        </button>
      </div>
    </div>
  );
}

export function Portfolio() {
  const { t } = useTranslation();
  const { language, dir } = useLanguage();
  const [active, setActive] = useState<PortfolioProject | null>(null);

  const track = [...portfolioProjects, ...portfolioProjects];
  const marqueeClass = dir === "rtl" ? "animate-marquee-rtl" : "animate-marquee";

  return (
    <section id="portfolio" className="relative bg-black py-24 md:py-32 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <p className="font-display uppercase tracking-[0.3em] text-accent-x text-sm mb-4">
            {t("portfolio.eyebrow")}
          </p>
          <h2 className="font-display font-bold uppercase text-4xl md:text-5xl leading-tight">
            {t("portfolio.heading")}
          </h2>
        </motion.div>
      </div>

      <div className="marquee-mask overflow-hidden">
        <div className={`marquee-track flex w-max gap-6 px-3 ${marqueeClass}`}>
          {track.map((project, i) => (
            <ProjectCard
              key={`${project.id}-${i}`}
              project={project}
              lang={language}
              onOpen={() => setActive(project)}
            />
          ))}
        </div>
      </div>

      <Modal open={!!active} onClose={() => setActive(null)}>
        {active && (
          <div>
            <div className="aspect-video w-full overflow-hidden bg-white/5">
              <img
                src={active.image}
                alt={active.name}
                className="h-full w-full object-cover object-top"
              />
            </div>
            <div className="p-6 md:p-8">
              <p className="font-display uppercase tracking-widest text-xs text-accent-x mb-2">
                {localize(active.type, language)}
              </p>
              <h3 className="font-display font-bold uppercase text-2xl md:text-3xl tracking-wide mb-4">
                {active.name}
              </h3>
              <div className="mb-4">
                <StarRating />
              </div>
              <p className="text-white/70 leading-relaxed mb-6">
                {localize(active.description, language)}
              </p>
              <p className="font-display uppercase tracking-widest text-xs text-white/50 mb-3">
                {t("portfolio.techStack")}
              </p>
              <div className="flex flex-wrap gap-2">
                {active.tech.map((tech) => (
                  <span
                    key={tech}
                    className="border border-white/20 px-3 py-1.5 text-sm text-white/80"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
