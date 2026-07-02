import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslation } from "react-i18next";

const STATS: { key: "projects" | "clients" | "years" | "satisfaction"; value: number; suffix: string }[] = [
  { key: "projects", value: 150, suffix: "+" },
  { key: "clients", value: 100, suffix: "+" },
  { key: "years", value: 3, suffix: "+" },
  { key: "satisfaction", value: 99, suffix: "%" },
];

function StatCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const start = performance.now();

    let frame: number;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * value));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

  return (
    <div ref={ref} className="text-center">
      <p className="font-display font-black text-5xl md:text-6xl text-accent-x">
        {count}
        {suffix}
      </p>
      <p className="mt-2 text-sm uppercase tracking-widest text-white/60">{label}</p>
    </div>
  );
}

export function About() {
  const { t } = useTranslation();

  return (
    <section className="relative bg-black py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-5 md:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display font-normal uppercase text-4xl md:text-5xl leading-tight"
        >
          {t("about.heading")}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 text-white/70 leading-relaxed text-lg"
        >
          {t("about.body")}
        </motion.p>
      </div>

      <div className="mx-auto max-w-5xl px-5 md:px-8 mt-16 grid grid-cols-2 md:grid-cols-4 gap-10">
        {STATS.map((stat) => (
          <StatCounter
            key={stat.key}
            value={stat.value}
            suffix={stat.suffix}
            label={t(`about.stats.${stat.key}`)}
          />
        ))}
      </div>
    </section>
  );
}
