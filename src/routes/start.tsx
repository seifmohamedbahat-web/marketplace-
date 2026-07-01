import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Globe, ChartColumn, Settings2, Check } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ParticlesBg } from "@/components/ParticlesBg";
import { PhoneInput } from "@/components/PhoneInput";
import { useTranslation } from "react-i18next";
import { sendForm } from "@/lib/sendForm";
import { COUNTRIES } from "@/lib/countries";

export const Route = createFileRoute("/start")({
  head: () => ({ meta: [{ title: "Start Your Project — Avexa" }, { name: "description", content: "Tell us about your project and we'll get back within 24 hours." }] }),
  component: StartPage,
});

type Answers = {
  name: string;
  email: string;
  phone: string;
  phoneCountry: string;
  company: string;
  services: string[];
  pages: string;
  description: string;
};

const EMPTY: Answers = { name: "", email: "", phone: "", phoneCountry: "EG", company: "", services: [], pages: "", description: "" };

function StartPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [a, setA] = useState<Answers>(EMPTY);
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const total = 8; // 7 questions + review
  const isRtl = i18n.language === "ar";

  const update = <K extends keyof Answers>(k: K) => (v: Answers[K]) => setA((p) => ({ ...p, [k]: v }));
  const toggleService = (v: string) =>
    setA((p) => ({ ...p, services: p.services.includes(v) ? p.services.filter((s) => s !== v) : [...p.services, v] }));

  const validateStep = (): boolean => {
    setError(null);
    switch (step) {
      case 0: if (!a.name.trim()) return setReq();
        break;
      case 1:
        if (!a.email.trim()) return setReq();
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(a.email)) { setError(t("validation.email")); return false; }
        break;
      case 2: break; // phone optional
      case 3: if (!a.company.trim()) return setReq();
        break;
      case 4: if (a.services.length === 0) return setReq();
        break;
      case 5: if (!a.pages) return setReq();
        break;
      case 6: if (!a.description.trim()) return setReq();
        break;
    }
    return true;
  };
  const setReq = () => { setError(t("validation.required")); return false; };

  const next = () => {
    if (!validateStep()) return;
    setDir(1);
    setStep((s) => Math.min(total - 1, s + 1));
  };
  const back = () => { setDir(-1); setError(null); setStep((s) => Math.max(0, s - 1)); };

  const submit = async () => {
    if (!consent || submitting) return;
    setSubmitting(true);
    const dial = COUNTRIES.find((c) => c.iso === a.phoneCountry)?.dial ?? "";
    const fullPhone = a.phone.trim() ? `+${dial} ${a.phone.trim()}` : "";
    const ok = await sendForm(`New Project Request from ${a.name}`, {
      Type: "Project Request",
      Language: i18n.language.toUpperCase(),
      Name: a.name,
      Email: a.email,
      Phone: fullPhone || "-",
      "Brand / Company": a.company,
      "Services Needed": a.services,
      "Number of Pages": a.pages,
      "Project Description": a.description,
    });
    setSubmitting(false);
    if (!ok) {
      setError(t("contact.form.error"));
      return;
    }
    navigate({ to: "/thank-you" });
  };

  const progress = ((step + 1) / total) * 100;

  const slideVariants = {
    enter: (d: number) => ({ x: d * (isRtl ? -120 : 120), opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d * (isRtl ? 120 : -120), opacity: 0 }),
  };

  const inputCls = "w-full bg-black border-2 border-white/30 px-5 py-4 text-xl text-white placeholder:text-white/40 focus:border-[#C41E1E] outline-none transition-colors";

  return (
    <>
      <Nav />
      <main className="relative min-h-screen pt-32 pb-20 px-6 overflow-hidden">
        <ParticlesBg count={25} />
        <div className="relative z-10 max-w-3xl mx-auto">
          {/* Progress */}
          <div className="mb-10">
            <div className="flex justify-between text-xs uppercase tracking-widest text-white/60 font-display mb-2">
              <span>{t("start.progress", { current: step + 1, total })}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-2 bg-white/10 overflow-hidden">
              <motion.div className="h-full bg-[#C41E1E]" initial={false} animate={{ width: `${progress}%` }} transition={{ type: "spring", stiffness: 80, damping: 20 }} />
            </div>
          </div>

          <div className="min-h-[400px] flex items-center justify-center">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={step}
                custom={dir}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="w-full"
              >
                {step === 0 && (
                  <Q label={t("start.q1.label")}>
                    <input autoFocus className={inputCls} placeholder={t("start.q1.placeholder")} value={a.name} onChange={(e) => update("name")(e.target.value)} />
                  </Q>
                )}
                {step === 1 && (
                  <Q label={t("start.q2.label")}>
                    <input autoFocus type="email" className={inputCls} placeholder={t("start.q2.placeholder")} value={a.email} onChange={(e) => update("email")(e.target.value)} />
                  </Q>
                )}
                {step === 2 && (
                  <Q label={`${t("start.q3.label")} ${t("start.q3.optional")}`}>
                    <PhoneInput
                      value={a.phone}
                      onChange={update("phone")}
                      countryIso={a.phoneCountry}
                      onCountryChange={update("phoneCountry")}
                      placeholder={t("start.q3.placeholder")}
                      inputClassName={inputCls}
                    />
                  </Q>
                )}
                {step === 3 && (
                  <Q label={t("start.q4.label")}>
                    <input autoFocus className={inputCls} placeholder={t("start.q4.placeholder")} value={a.company} onChange={(e) => update("company")(e.target.value)} />
                  </Q>
                )}
                {step === 4 && (
                  <Q label={t("start.q5.label")}>
                    <p className="text-center text-white/60 text-sm uppercase tracking-widest mb-5">{t("start.q5.hint")}</p>
                    <div className="grid sm:grid-cols-3 gap-4">
                      {[
                        { v: "Website", icon: Globe, label: t("start.q5.website") },
                        { v: "Dashboard", icon: ChartColumn, label: t("start.q5.dashboard") },
                        { v: "System", icon: Settings2, label: t("start.q5.system") },
                      ].map((opt) => {
                        const Icon = opt.icon;
                        const active = a.services.includes(opt.v);
                        return (
                          <button key={opt.v} type="button" onClick={() => toggleService(opt.v)}
                            className={`relative p-6 border-2 flex flex-col items-center gap-3 transition-all ${active ? "border-[#C41E1E] bg-[#C41E1E]/10 red-glow" : "border-white/30 hover:border-[#C41E1E]"}`}>
                            {active && (
                              <span className="absolute top-2 end-2 w-6 h-6 bg-[#C41E1E] text-white flex items-center justify-center">
                                <Check size={14} />
                              </span>
                            )}
                            <Icon size={36} className={active ? "text-[#C41E1E]" : "text-white"} />
                            <span className="font-display tracking-widest text-white">{opt.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </Q>
                )}
                {step === 5 && (
                  <Q label={t("start.q6.label")}>
                    <PillGroup options={["1-3", "4-7", "8-15", "15+"]} value={a.pages} onChange={update("pages")} />
                  </Q>
                )}
                {step === 6 && (
                  <Q label={t("start.q7.label")}>
                    <textarea autoFocus rows={6} className={inputCls + " resize-none text-base"} placeholder={t("start.q7.placeholder")} value={a.description} onChange={(e) => update("description")(e.target.value)} />
                  </Q>
                )}
                {step === 7 && (
                  <div>
                    <h2 className="text-3xl md:text-5xl font-black text-center mb-8">{t("start.review")}</h2>
                    <div className="bg-black border-2 border-white/20 p-6 space-y-3 text-white/90">
                      {[
                        ["name", a.name],
                        ["email", a.email],
                        ["phone", a.phone ? `+${COUNTRIES.find((c) => c.iso === a.phoneCountry)?.dial} ${a.phone}` : "-"],
                        ["company", a.company],
                        ["service", a.services.join(", ")],
                        ["pages", a.pages],
                        ["description", a.description],
                      ].map(([k, v]) => (
                        <div key={k} className="flex flex-col sm:flex-row sm:gap-4 border-b border-white/10 pb-2">
                          <span className="text-white/60 uppercase tracking-widest text-xs sm:w-40 shrink-0 font-display">{t(`start.labels.${k}`)}</span>
                          <span className="text-white break-words">{v}</span>
                        </div>
                      ))}
                    </div>
                    <label className="flex items-start gap-3 mt-6 text-white/80 cursor-pointer select-none">
                      <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1 w-5 h-5 accent-[#C41E1E]" />
                      <span>{t("start.consent")}</span>
                    </label>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {error && <p className="text-[#C41E1E] text-center mt-3">{error}</p>}

          <div className="mt-10 flex items-center justify-between gap-4">
            <button
              onClick={back}
              disabled={step === 0}
              className="px-5 py-3 border-2 border-white text-white font-display tracking-widest hover:bg-white hover:text-black disabled:opacity-30 disabled:cursor-not-allowed inline-flex items-center gap-2 transition-all"
            >
              <ArrowLeft size={16} /> {t("start.back")}
            </button>
            {step < total - 1 ? (
              <button onClick={next} className="px-8 py-4 bg-[#C41E1E] text-white font-display tracking-widest border-2 border-[#C41E1E] hover:scale-105 transition-transform red-glow inline-flex items-center gap-2">
                {t("start.next")} <ArrowRight size={18} />
              </button>
            ) : (
              <button onClick={submit} disabled={!consent || submitting} className="px-8 py-4 bg-[#C41E1E] text-white font-display tracking-widest border-2 border-[#C41E1E] hover:scale-105 transition-transform red-glow disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100">
                {submitting ? "..." : t("start.submit")}
              </button>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Q({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-2xl md:text-4xl font-black text-center mb-8 leading-tight">{label}</h2>
      {children}
    </div>
  );
}

function PillGroup({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {options.map((opt) => {
        const active = value === opt;
        return (
          <button key={opt} type="button" onClick={() => onChange(opt)}
            className={`px-6 py-3 border-2 font-display tracking-widest transition-all ${active ? "bg-[#C41E1E] border-[#C41E1E] text-white red-glow" : "border-white/30 text-white hover:border-[#C41E1E]"}`}>
            {opt}
          </button>
        );
      })}
    </div>
  );
}