import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Nav() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  const portfolioHref = pathname === "/" ? "#portfolio" : "/#portfolio";

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black border-b border-white/10" : "bg-black/70 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Mobile: hamburger on the LEFT */}
        <button
          className="md:hidden text-white order-first"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                <X size={28} />
              </motion.span>
            ) : (
              <motion.span key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                <Menu size={28} />
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        <Link to="/" className="flex items-center md:order-first">
          <Logo size="md" />
        </Link>

        <nav className="hidden md:flex items-center gap-8 font-display tracking-widest text-sm">
          <Link to="/" className="text-white hover:text-[#C41E1E] transition-colors">{t("nav.home")}</Link>
          <a href={portfolioHref} className="text-white hover:text-[#C41E1E] transition-colors">{t("nav.portfolio")}</a>
          <Link to="/contact" className="text-white hover:text-[#C41E1E] transition-colors">{t("nav.contact")}</Link>
          <LanguageSwitcher />
          <Link
            to="/start"
            className="px-5 py-2 bg-[#C41E1E] text-white border-2 border-[#C41E1E] hover:bg-black hover:text-[#C41E1E] transition-all red-glow-hover"
          >
            {t("nav.startNow")}
          </Link>
        </nav>

        {/* Spacer to keep logo centered on mobile */}
        <div className="md:hidden w-7" aria-hidden />
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-black border-t border-white/10 overflow-hidden"
          >
            <div className="flex flex-col items-start p-6 gap-5 font-display tracking-widest text-lg text-start">
              <Link to="/" className="text-white hover:text-[#C41E1E]">{t("nav.home")}</Link>
              <a href={portfolioHref} className="text-white hover:text-[#C41E1E]">{t("nav.portfolio")}</a>
              <Link to="/contact" className="text-white hover:text-[#C41E1E]">{t("nav.contact")}</Link>
              <LanguageSwitcher inline />
              <Link
                to="/start"
                className="px-5 py-3 bg-[#C41E1E] text-white text-center border-2 border-[#C41E1E] red-glow self-stretch"
              >
                {t("nav.startNow")}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}