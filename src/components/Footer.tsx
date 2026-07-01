import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Mail, Phone } from "lucide-react";
import { Logo } from "./Logo";
import { SocialIcons } from "./SocialIcons";

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8">
        <div>
          <Logo size="md" />
          <p className="mt-3 text-white/70 font-display tracking-wider">{t("footer.tagline")}</p>
        </div>
        <div>
          <h4 className="font-display tracking-widest text-white mb-3">{t("nav.portfolio")}</h4>
          <ul className="space-y-2 text-white/70">
            <li><Link to="/" className="hover:text-[#C41E1E]">{t("nav.home")}</Link></li>
            <li><a href="/#portfolio" className="hover:text-[#C41E1E]">{t("nav.portfolio")}</a></li>
            <li><Link to="/contact" className="hover:text-[#C41E1E]">{t("nav.contact")}</Link></li>
            <li><Link to="/start" className="hover:text-[#C41E1E]">{t("nav.startNow")}</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display tracking-widest text-white mb-3">{t("nav.contact")}</h4>
          <ul className="space-y-2 text-white/70 text-sm break-all">
            <li className="flex items-center gap-2"><Mail size={16} className="text-[#C41E1E] shrink-0" /> seifmohamedbahat@gmail.com</li>
            <li className="flex items-center gap-2"><Phone size={16} className="text-[#C41E1E] shrink-0" /> +20 101 264 8914</li>
          </ul>
        </div>
        <div>
          <h4 className="font-display tracking-widest text-white mb-3">Social</h4>
          <SocialIcons />
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-white/50 text-sm">
        {t("footer.rights")}
      </div>
    </footer>
  );
}