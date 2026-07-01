import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import { Globe, ChevronDown } from "lucide-react";
import { applyLangToDocument } from "@/i18n";

const LANGS = [
  { code: "en", label: "EN", flag: "🇬🇧" },
  { code: "fr", label: "FR", flag: "🇫🇷" },
  { code: "ar", label: "AR", flag: "🇸🇦" },
] as const;

export function LanguageSwitcher({ inline = false }: { inline?: boolean }) {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const current = LANGS.find((l) => l.code === i18n.language) ?? LANGS[0];

  useEffect(() => {
    applyLangToDocument(i18n.language);
  }, [i18n.language]);

  const change = (code: string) => {
    i18n.changeLanguage(code);
    applyLangToDocument(code);
    setOpen(false);
  };

  if (inline) {
    return (
      <div className="flex gap-2">
        {LANGS.map((l) => (
          <button
            key={l.code}
            onClick={() => change(l.code)}
            className={`px-4 py-2 border-2 font-display tracking-wider transition-all ${
              l.code === current.code
                ? "bg-[#C41E1E] border-[#C41E1E] text-white"
                : "border-white/30 text-white hover:border-[#C41E1E]"
            }`}
          >
            {l.flag} {l.label}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 px-3 py-2 border border-white/30 hover:border-[#C41E1E] text-white transition-colors font-display tracking-wider"
      >
        <Globe size={16} />
        <span>{current.flag} {current.label}</span>
        <ChevronDown size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="absolute end-0 mt-2 w-36 bg-black border border-white/20 shadow-xl z-50"
          >
            {LANGS.map((l) => (
              <button
                key={l.code}
                onClick={() => change(l.code)}
                className={`block w-full text-start px-4 py-3 hover:bg-[#C41E1E] hover:text-white transition-colors font-display tracking-wider ${
                  l.code === current.code ? "text-[#C41E1E]" : "text-white"
                }`}
              >
                {l.flag} {l.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}