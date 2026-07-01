import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Stars } from "./Stars";
import p1 from "@/assets/portfolio/project-1.jpg.asset.json";
import p2 from "@/assets/portfolio/project-2.jpg.asset.json";
import p3 from "@/assets/portfolio/project-3.jpg.asset.json";
import p4 from "@/assets/portfolio/project-4.jpg.asset.json";
import p5 from "@/assets/portfolio/project-5.jpg.asset.json";
import p6 from "@/assets/portfolio/project-6.jpg.asset.json";
import p7 from "@/assets/portfolio/project-7.jpg.asset.json";
import p8 from "@/assets/portfolio/project-8.jpg.asset.json";
import p9 from "@/assets/portfolio/project-9.jpg.asset.json";
import p10 from "@/assets/portfolio/project-10.jpg.asset.json";
import p11 from "@/assets/portfolio/project-11.jpg.asset.json";
import p12 from "@/assets/portfolio/project-12.jpg.asset.json";
import p13 from "@/assets/portfolio/project-13.jpg.asset.json";

type Project = { title: string; type: string; desc: string; img: string };

const PROJECTS: Project[] = [
  { title: "Apex Auto Repair", type: "Website", img: p1.url, desc: "A bold, dark-themed website for a premium auto repair shop. Offers expert diagnostics, maintenance, and repairs for all vehicle brands, with fast service, honest pricing, and guaranteed results." },
  { title: "Aqualuxe", type: "E-Commerce", img: p2.url, desc: "An elegant e-commerce site for luxury poolside loungers handcrafted in Bali and shipped to Australia. Features resort-inspired products made with marine-grade fabrics, sold direct-to-consumer." },
  { title: "SignalPro", type: "Platform", img: p3.url, desc: "A dark-themed financial platform that delivers real-time stock trading signals. Alerts users on the exact moment to buy or sell, showing entry price and target price for each stock." },
  { title: "Clinic Website", type: "Template", img: p4.url, desc: "A clean, minimal medical website template for a doctor's personal clinic. Highlights the physician's specialty and patient-first philosophy, with sections for services, reviews, and appointment booking." },
  { title: "LuxeHomes", type: "Real Estate", img: p5.url, desc: "A real estate platform for browsing luxury homes, apartments, and estates. Users can search by location or ZIP code — boasting 5,000+ properties, 2,000+ happy clients, and 500+ awards." },
  { title: "VELO", type: "E-Commerce", img: p6.url, desc: "A sleek, dark sportswear e-commerce store for the 2026 season. Specializes in high-performance athletic clothing engineered for movement and designed for style, with bestsellers and collections." },
  { title: "Creoa Studio", type: "Dashboard", img: p7.url, desc: "An analytics dashboard for a creative studio showing key metrics: unique visitors, pageviews, new leads, conversion rate, daily traffic trends, and top traffic sources like Google, Instagram, and LinkedIn." },
  { title: "Lumiere", type: "E-Commerce", img: p8.url, desc: "A minimalist fashion e-commerce website for women's clothing. Showcases a 2026 collection focused on timeless, sophisticated pieces that blend elegance with everyday comfort." },
  { title: "North/Star", type: "Website", img: p9.url, desc: "A performance marketing agency website for DTC brands. Specializes in paid social advertising with a results-driven approach — $3.4M tracked in the last 30 days with a +218% growth rate." },
  { title: "USA Plumbing", type: "Website", img: p10.url, desc: "A local plumbing services website for Myrtle Beach, SC. Highlights a 4.9-star Google rating, same-day service, 20+ years of local experience, and 24/7 availability with honest pricing." },
  { title: "MAOS — Marketing OS", type: "Dashboard", img: p11.url, desc: "A full-featured agency operating system dashboard. Tracks Monthly Recurring Revenue, active clients, client ROAS, pipeline leads, CRM contacts, upcoming deliverables, and project tasks — all in one dark-mode interface." },
  { title: "Dashify", type: "Dashboard", img: p12.url, desc: "A general-purpose SaaS admin dashboard for business analytics. Displays total revenue, active users, orders, conversion rate, a revenue vs. expenses chart, and weekly traffic data in a clean, modern layout." },
  { title: "Bella Cucina", type: "Website", img: p13.url, desc: "A warm, atmospheric restaurant website for an Italian trattoria established in 2008. Features handmade pasta, wood-fired pizzas, and Tuscan classics — with options to view the menu or book a table online." },
];

export function Portfolio() {
  const { t, i18n } = useTranslation();
  const [active, setActive] = useState<number | null>(null);
  const isRtl = i18n.language === "ar";
  const looped = [...PROJECTS, ...PROJECTS];

  return (
    <section id="portfolio" className="py-24 px-6 bg-black scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-black">
            {t("portfolio.heading1")} <span className="text-accent-x">{t("portfolio.heading2")}</span>
          </h2>
          <p className="mt-4 text-white/70 max-w-2xl mx-auto">{t("portfolio.subtitle")}</p>
        </motion.div>

      </div>

      <div className="relative overflow-hidden py-4">
        <div className="pointer-events-none absolute inset-y-0 start-0 w-32 z-10" style={{ background: "linear-gradient(to right, #000 0%, transparent 100%)" }} />
        <div className="pointer-events-none absolute inset-y-0 end-0 w-32 z-10" style={{ background: "linear-gradient(to left, #000 0%, transparent 100%)" }} />
        <div className={`flex gap-6 w-max ${isRtl ? "animate-marquee-rtl" : "animate-marquee"}`}>
          {looped.map((p, idx) => {
            const realIndex = idx % PROJECTS.length;
            return (
              <article
                key={idx}
                className="group w-[320px] md:w-[380px] shrink-0 bg-black border-2 border-white/20 red-glow-hover overflow-hidden"
              >
                <div className="relative h-52 bg-black border-b-2 border-white/10 overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    draggable={false}
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <h3 className="text-xl font-display tracking-wider text-white">{p.title}</h3>
                    <span className="text-xs font-bold px-2 py-1 bg-[#C41E1E] text-white whitespace-nowrap">{p.type}</span>
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed mb-4 line-clamp-3">{p.desc}</p>
                  <Stars />
                  <button
                    onClick={() => setActive(realIndex)}
                    className="mt-5 w-full py-2 border-2 border-white text-white hover:bg-[#C41E1E] hover:border-[#C41E1E] font-display tracking-widest text-sm transition-all"
                  >
                    {t("portfolio.learnMore")}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-black border-2 border-[#C41E1E] max-w-2xl w-full p-8 relative red-glow max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setActive(null)} aria-label={t("portfolio.close")} className="absolute top-4 end-4 text-white hover:text-[#C41E1E]"><X /></button>
              {(() => {
                const p = PROJECTS[active];
                return (
                  <>
                    <div className="bg-black border-2 border-white/20 mb-6 overflow-hidden">
                      <img src={p.img} alt={p.title} className="w-full h-auto block" />
                    </div>
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <h3 className="text-3xl font-display tracking-wider text-white">{p.title}</h3>
                      <span className="text-xs font-bold px-3 py-1 bg-[#C41E1E] text-white whitespace-nowrap">{p.type}</span>
                    </div>
                    <p className="text-white/80 leading-relaxed mb-5">{p.desc}</p>
                    <Stars />
                  </>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}