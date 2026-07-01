import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/thank-you")({
  head: () => ({ meta: [{ title: "Thank You — Avexa" }, { name: "description", content: "Your request has been received." }] }),
  component: ThankYou,
});

function ThankYou() {
  const { t } = useTranslation();

  useEffect(() => {
    const fire = (particleRatio: number, opts: confetti.Options) => {
      confetti({
        origin: { y: 0.6 },
        colors: ["#C41E1E", "#FFFFFF"],
        particleCount: Math.floor(220 * particleRatio),
        ...opts,
      });
    };
    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  }, []);

  return (
    <>
      <Nav />
      <main className="min-h-screen pt-32 pb-20 px-6 flex items-center justify-center">
        <div className="max-w-2xl text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 15 }} className="mx-auto w-28 h-28 border-4 border-[#C41E1E] rounded-full flex items-center justify-center mb-8 red-glow">
            <motion.svg viewBox="0 0 60 60" className="w-16 h-16" stroke="#C41E1E" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <motion.path d="M14 31 L26 43 L46 19" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }} />
            </motion.svg>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-5xl md:text-7xl font-black mb-4">
            {t("thanks.title")}
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-white/70 text-lg max-w-xl mx-auto mb-8">
            {t("thanks.subtitle")}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            <Link to="/" className="inline-block px-10 py-4 bg-[#C41E1E] text-white font-display tracking-widest border-2 border-[#C41E1E] hover:scale-105 transition-transform red-glow">
              {t("thanks.back")}
            </Link>
          </motion.div>
          <p className="mt-8 text-white/50 text-sm break-all">
            {t("thanks.questions")} <a href="mailto:seifmohamedbahat@gmail.com" className="text-[#C41E1E] hover:underline">seifmohamedbahat@gmail.com</a>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}