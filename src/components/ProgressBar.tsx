import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export function ProgressBar({ current, total }: { current: number; total: number }) {
  const { t } = useTranslation();
  const pct = Math.min(100, Math.round((current / total) * 100));

  return (
    <div className="w-full">
      <p className="font-heading uppercase tracking-widest text-xs text-white/50 mb-3">
        {t("wizard.progress", { current, total })}
      </p>
      <div className="h-1 w-full bg-white/10">
        <motion.div
          className="h-full bg-brand"
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
