import { Link } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Logo } from "./Logo";

const CONTACT_EMAIL = "seifmohamedbahat@gmail.com";

export function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-16 grid grid-cols-1 sm:grid-cols-3 gap-12">
        <div>
          <Logo size="footer" />
          <p className="mt-4 font-display uppercase tracking-widest text-sm text-accent-x">
            {t("footer.tagline")}
          </p>
          <p className="mt-3 text-white/60 text-sm leading-relaxed max-w-xs">
            {t("footer.blurb")}
          </p>
        </div>

        <div>
          <h3 className="font-display uppercase tracking-widest text-sm text-white/50 mb-5">
            {t("footer.quickLinks")}
          </h3>
          <ul className="space-y-3">
            <li>
              <Link to="/" className="text-white/80 hover:text-accent-x transition-colors">
                {t("nav.home")}
              </Link>
            </li>
            <li>
              <Link to="/" hash="portfolio" className="text-white/80 hover:text-accent-x transition-colors">
                {t("nav.portfolio")}
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-white/80 hover:text-accent-x transition-colors">
                {t("nav.contact")}
              </Link>
            </li>
            <li>
              <Link to="/start" className="text-white/80 hover:text-accent-x transition-colors">
                {t("nav.startNow")}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display uppercase tracking-widest text-sm text-white/50 mb-5">
            {t("footer.contact")}
          </h3>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="flex items-center gap-3 text-white/80 hover:text-accent-x transition-colors break-all"
          >
            <Mail size={18} className="text-accent-x shrink-0" />
            {CONTACT_EMAIL}
          </a>
        </div>
      </div>

      <div className="border-t border-white/10 py-6">
        <p className="text-center text-xs text-white/40">
          © {year} Ave<span className="text-accent-x">x</span>a. {t("footer.rights")}
        </p>
      </div>
    </footer>
  );
}
