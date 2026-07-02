import { motion } from "framer-motion";
import { Globe, ChartColumn, Settings2, type LucideIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

const SERVICES: { icon: LucideIcon; key: "websites" | "dashboards" | "systems" }[] = [
  { icon: Globe, key: "websites" },
  { icon: ChartColumn, key: "dashboards" },
  { icon: Settings2, key: "systems" },
];

export function Services() {
  const { t } = useTranslation();

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
          <p className="font-heading uppercase tracking-[0.3em] text-accent-x text-sm mb-4">
            {t("services.eyebrow")}
          </p>
          <h2 className="font-heading font-black uppercase text-4xl md:text-5xl leading-tight">
            {t("services.heading")}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SERVICES.map(({ icon: Icon, key }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="red-glow-hover border border-white/15 bg-black p-8"
            >
              <div className="flex h-14 w-14 items-center justify-center border border-brand mb-6">
                <Icon className="text-accent-x" size={26} />
              </div>
              <h3 className="font-heading uppercase text-xl tracking-wide mb-3">
                {t(`services.${key}.title`)}
              </h3>
              <p className="text-white/65 leading-relaxed">{t(`services.${key}.desc`)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
