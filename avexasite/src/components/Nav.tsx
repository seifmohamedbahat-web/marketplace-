import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ChevronDown, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Logo } from "./Logo";
import { useLanguage } from "../i18n/LanguageProvider";
import { languageLabels, supportedLanguages, type SupportedLanguage } from "../i18n";

export function Nav() {
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setLangOpen(false);
  }, [language]);

  const navLinks = [
    { key: "home", to: "/", hash: undefined, label: t("nav.home") },
    { key: "portfolio", to: "/", hash: "portfolio", label: t("nav.portfolio") },
    { key: "contact", to: "/contact", hash: undefined, label: t("nav.contact") },
  ] as const;

  const selectLanguage = (lang: SupportedLanguage) => {
    setLanguage(lang);
    setLangOpen(false);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-black/95 backdrop-blur border-b border-white/10" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-8">
        {/* Mobile: hamburger far start */}
        <button
          type="button"
          className="md:hidden text-white p-2 -ms-2"
          aria-label="Menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <AnimatePresence mode="wait" initial={false}>
            {mobileOpen ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="block"
              >
                <X size={26} />
              </motion.span>
            ) : (
              <motion.span
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="block"
              >
                <Menu size={26} />
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        <div className="md:flex-1">
          <Logo size="nav" />
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.key}
              to={link.to}
              hash={link.hash}
              className="group relative font-display text-sm uppercase tracking-widest text-white/80 hover:text-white transition-colors [&.active]:text-white"
            >
              {link.label}
              <span className="absolute -bottom-1 start-0 h-px w-0 bg-brand transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-5">
          <div className="relative">
            <button
              type="button"
              onClick={() => setLangOpen((v) => !v)}
              className="flex items-center gap-1.5 text-sm text-white/80 transition-all duration-300 hover:scale-105 hover:text-white"
              aria-haspopup="listbox"
              aria-expanded={langOpen}
              aria-label="Select language"
            >
              <Globe size={16} />
              {language.toUpperCase()}
              <ChevronDown size={14} className={`transition-transform ${langOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute end-0 mt-3 w-36 border border-white/15 bg-black py-1"
                  role="listbox"
                >
                  {supportedLanguages.map((lang) => (
                    <li key={lang}>
                      <button
                        type="button"
                        onClick={() => selectLanguage(lang)}
                        className={`block w-full px-4 py-2 text-start text-sm transition-all duration-200 hover:translate-x-1 hover:bg-white/10 hover:text-accent-x ${
                          lang === language ? "text-accent-x" : "text-white/80"
                        }`}
                      >
                        {languageLabels[lang]}
                      </button>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          <Link
            to="/start"
            className="animate-pulse-red border border-brand bg-brand px-6 py-2.5 font-display text-sm uppercase tracking-widest text-white transition-transform hover:scale-105"
          >
            {t("nav.startNow")}
          </Link>
        </div>

        {/* Mobile: spacer to balance hamburger */}
        <div className="md:hidden w-[26px]" />
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden border-t border-white/10 bg-black"
          >
            <nav className="flex flex-col px-5 py-6 gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.key}
                  to={link.to}
                  hash={link.hash}
                  onClick={() => setMobileOpen(false)}
                  className="font-display py-3 text-lg uppercase tracking-widest text-white/85 transition-all duration-300 hover:translate-x-2 hover:text-accent-x"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/start"
                onClick={() => setMobileOpen(false)}
                className="mt-4 bg-brand px-6 py-3 text-center font-display text-sm uppercase tracking-widest text-white"
              >
                {t("nav.startNow")}
              </Link>
              <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
                {supportedLanguages.map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => selectLanguage(lang)}
                    className={`border px-4 py-1.5 text-sm font-display uppercase tracking-widest transition-all duration-300 hover:scale-105 ${
                      lang === language
                        ? "border-brand text-accent-x"
                        : "border-white/20 text-white/70 hover:border-white/50"
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
