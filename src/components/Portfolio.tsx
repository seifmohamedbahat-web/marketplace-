import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { portfolioProjects, localize, type PortfolioProject } from "../data/portfolio";
import type { SupportedLanguage } from "../i18n";
import { useLanguage } from "../i18n/LanguageProvider";
import { Modal } from "./Modal";

function ProjectCard({
  project,
  lang,
  onOpen,
}: {
  project: PortfolioProject;
  lang: SupportedLanguage;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group w-[320px] md:w-[380px] shrink-0 border border-white/10 bg-black text-start red-glow-hover"
    >
      <div className="aspect-video w-full overflow-hidden bg-white/5">
        <img
          src={project.image}
          alt={project.name}
          loading="lazy"
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <p className="font-heading uppercase tracking-widest text-xs text-accent-x mb-1">
          {localize(project.type, lang)}
        </p>
        <h3 className="font-heading uppercase text-lg tracking-wide">{project.name}</h3>
        <p className="mt-2 text-sm text-white/60 line-clamp-2">
          {localize(project.description, lang)}
        </p>
      </div>
    </button>
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
          <p className="font-heading uppercase tracking-[0.3em] text-accent-x text-sm mb-4">
            {t("portfolio.eyebrow")}
          </p>
          <h2 className="font-heading font-normal uppercase text-4xl md:text-5xl leading-tight">
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
              <p className="font-heading uppercase tracking-widest text-xs text-accent-x mb-2">
                {localize(active.type, language)}
              </p>
              <h3 className="font-heading uppercase text-2xl md:text-3xl tracking-wide mb-4">
                {active.name}
              </h3>
              <p className="text-white/70 leading-relaxed mb-6">
                {localize(active.description, language)}
              </p>
              <p className="font-heading uppercase tracking-widest text-xs text-white/50 mb-3">
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
