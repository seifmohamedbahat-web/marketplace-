import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Loader2, Pencil } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ProgressBar } from "../components/ProgressBar";
import { PhonePicker, formatPhoneValue } from "../components/PhonePicker";
import { defaultCountryCode } from "../data/countries";
import { submitToWeb3Forms } from "../lib/web3forms";

export const Route = createFileRoute("/start")({ component: StartPage });

type ServiceKey = "website" | "dashboard" | "system";
type PageRange = "1-5" | "6-10" | "11-20" | "20+";

interface WizardState {
  name: string;
  email: string;
  countryCode: string;
  localNumber: string;
  company: string;
  services: ServiceKey[];
  pages: PageRange | "";
  message: string;
  consent: boolean;
}

const SERVICE_OPTIONS: ServiceKey[] = ["website", "dashboard", "system"];
const PAGE_OPTIONS: PageRange[] = ["1-5", "6-10", "11-20", "20+"];
const TOTAL_QUESTIONS = 7;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const variants = {
  enter: (direction: number) => ({ x: direction > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction > 0 ? -60 : 60, opacity: 0 }),
};

const fieldClass =
  "w-full border border-white/20 bg-transparent px-4 py-4 text-white placeholder:text-white/30 focus:border-brand focus:outline-none transition-colors";

function StartPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [form, setForm] = useState<WizardState>({
    name: "",
    email: "",
    countryCode: defaultCountryCode,
    localNumber: "",
    company: "",
    services: [],
    pages: "",
    message: "",
    consent: false,
  });

  const isReview = step === TOTAL_QUESTIONS;

  const stepValid = (() => {
    switch (step) {
      case 0:
        return form.name.trim().length > 0;
      case 1:
        return EMAIL_RE.test(form.email.trim());
      case 2:
        return form.localNumber.trim().length >= 4;
      case 3:
        return true;
      case 4:
        return form.services.length > 0;
      case 5:
        return form.pages !== "";
      case 6:
        return form.message.trim().length > 0;
      default:
        return true;
    }
  })();

  const goNext = () => {
    if (!stepValid) return;
    setDirection(1);
    setStep((s) => Math.min(s + 1, TOTAL_QUESTIONS));
  };

  const goBack = () => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 0));
  };

  const goToStep = (target: number) => {
    setDirection(target > step ? 1 : -1);
    setStep(target);
  };

  const toggleService = (service: ServiceKey) => {
    setForm((f) => ({
      ...f,
      services: f.services.includes(service)
        ? f.services.filter((s) => s !== service)
        : [...f.services, service],
    }));
  };

  const handleSubmit = async () => {
    if (!form.consent) return;
    setStatus("sending");

    const result = await submitToWeb3Forms({
      subject: `New project request from ${form.name}`,
      from_name: "Avexa Website — Start a Project",
      name: form.name,
      email: form.email,
      phone: formatPhoneValue(form.countryCode, form.localNumber),
      company: form.company,
      services: form.services.map((s) => t(`wizard.options.${s}`)).join(", "),
      pages: form.pages,
      message: form.message,
    });

    if (result.success) {
      navigate({ to: "/thank-you" });
    } else {
      setStatus("error");
    }
  };

  return (
    <section className="relative min-h-screen bg-black pt-32 pb-24 md:pt-40">
      <div className="mx-auto max-w-2xl px-5 md:px-8">
        {step === 0 && (
          <p className="mb-8 text-center font-display uppercase tracking-widest text-sm text-accent-x">
            {t("wizard.intro")}
          </p>
        )}

        {!isReview && (
          <div className="mb-12">
            <ProgressBar current={step + 1} total={TOTAL_QUESTIONS} />
          </div>
        )}

        <div className="relative min-h-[280px] overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            {!isReview ? (
              <motion.div
                key={step}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: "easeInOut" }}
              >
                <h1 className="font-display font-black uppercase text-3xl md:text-4xl leading-tight mb-8">
                  {t(`wizard.q${step + 1}`)}
                </h1>

                {step === 0 && (
                  <input
                    autoFocus
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    placeholder={t("wizard.placeholders.name")}
                    className={fieldClass}
                    onKeyDown={(e) => e.key === "Enter" && stepValid && goNext()}
                  />
                )}

                {step === 1 && (
                  <input
                    autoFocus
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    placeholder={t("wizard.placeholders.email")}
                    className={fieldClass}
                    onKeyDown={(e) => e.key === "Enter" && stepValid && goNext()}
                  />
                )}

                {step === 2 && (
                  <PhonePicker
                    required
                    countryCode={form.countryCode}
                    localNumber={form.localNumber}
                    onCountryChange={(code) => setForm((f) => ({ ...f, countryCode: code }))}
                    onNumberChange={(value) => setForm((f) => ({ ...f, localNumber: value }))}
                  />
                )}

                {step === 3 && (
                  <input
                    autoFocus
                    value={form.company}
                    onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                    placeholder={t("wizard.placeholders.company")}
                    className={fieldClass}
                    onKeyDown={(e) => e.key === "Enter" && goNext()}
                  />
                )}

                {step === 4 && (
                  <div className="flex flex-wrap gap-3">
                    {SERVICE_OPTIONS.map((service) => {
                      const selected = form.services.includes(service);
                      return (
                        <button
                          key={service}
                          type="button"
                          onClick={() => toggleService(service)}
                          className={`border px-6 py-3 font-display text-sm uppercase tracking-widest transition-colors ${
                            selected
                              ? "border-brand bg-brand text-white"
                              : "border-white/25 text-white/75 hover:border-white/60"
                          }`}
                        >
                          {t(`wizard.options.${service}`)}
                        </button>
                      );
                    })}
                  </div>
                )}

                {step === 5 && (
                  <div className="grid grid-cols-2 gap-3">
                    {PAGE_OPTIONS.map((range) => {
                      const selected = form.pages === range;
                      return (
                        <button
                          key={range}
                          type="button"
                          onClick={() => setForm((f) => ({ ...f, pages: range }))}
                          className={`border px-6 py-4 font-display text-sm uppercase tracking-widest transition-colors ${
                            selected
                              ? "border-brand bg-brand text-white"
                              : "border-white/25 text-white/75 hover:border-white/60"
                          }`}
                        >
                          {t(`wizard.pageOptions.${range}`)}
                        </button>
                      );
                    })}
                  </div>
                )}

                {step === 6 && (
                  <textarea
                    autoFocus
                    rows={6}
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    placeholder={t("wizard.placeholders.message")}
                    className={`${fieldClass} resize-none`}
                  />
                )}
              </motion.div>
            ) : (
              <motion.div
                key="review"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: "easeInOut" }}
              >
                <h1 className="font-display font-black uppercase text-3xl md:text-4xl leading-tight mb-8">
                  {t("wizard.reviewTitle")}
                </h1>

                <div className="space-y-4 border border-white/10 divide-y divide-white/10">
                  {(
                    [
                      { key: "name", value: form.name, step: 0 },
                      { key: "email", value: form.email, step: 1 },
                      { key: "phone", value: formatPhoneValue(form.countryCode, form.localNumber), step: 2 },
                      { key: "company", value: form.company || "—", step: 3 },
                      {
                        key: "services",
                        value: form.services.length
                          ? form.services.map((s) => t(`wizard.options.${s}`)).join(", ")
                          : "—",
                        step: 4,
                      },
                      { key: "pages", value: form.pages ? t(`wizard.pageOptions.${form.pages}`) : "—", step: 5 },
                      { key: "message", value: form.message, step: 6 },
                    ] as const
                  ).map((row) => (
                    <div key={row.key} className="flex items-start justify-between gap-4 px-5 py-4">
                      <div>
                        <p className="text-xs uppercase tracking-widest text-white/40 mb-1">
                          {t(`wizard.fields.${row.key}`)}
                        </p>
                        <p className="text-white/90 break-words">{row.value}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => goToStep(row.step)}
                        className="shrink-0 flex items-center gap-1.5 text-xs uppercase tracking-widest text-white/50 hover:text-accent-x transition-colors"
                      >
                        <Pencil size={12} />
                        {t("wizard.edit")}
                      </button>
                    </div>
                  ))}
                </div>

                <label className="mt-6 flex items-start gap-3 text-sm text-white/70 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.consent}
                    onChange={(e) => setForm((f) => ({ ...f, consent: e.target.checked }))}
                    className="mt-1 h-4 w-4 accent-brand shrink-0"
                  />
                  {t("wizard.consent")}
                </label>

                {status === "error" && (
                  <p className="mt-4 text-sm text-accent-x">{t("wizard.errors.submit")}</p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-10 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={goBack}
            disabled={step === 0}
            className="flex items-center gap-2 border border-white/25 px-6 py-3.5 font-display text-sm uppercase tracking-widest text-white/80 transition-colors hover:border-white disabled:opacity-30 disabled:pointer-events-none"
          >
            <ArrowLeft size={16} />
            {t("wizard.back")}
          </button>

          {!isReview ? (
            <button
              type="button"
              onClick={goNext}
              disabled={!stepValid}
              className="flex items-center gap-2 border border-brand bg-brand px-6 py-3.5 font-display text-sm uppercase tracking-widest text-white transition-transform hover:scale-105 disabled:opacity-40 disabled:pointer-events-none disabled:hover:scale-100"
            >
              {t("wizard.next")}
              <ArrowRight size={16} />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!form.consent || status === "sending"}
              className="animate-pulse-red flex items-center gap-2 border border-brand bg-brand px-6 py-3.5 font-display text-sm uppercase tracking-widest text-white transition-transform hover:scale-105 disabled:opacity-40 disabled:pointer-events-none disabled:hover:scale-100"
            >
              {status === "sending" ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Check size={16} />
              )}
              {status === "sending" ? t("wizard.sending") : t("wizard.submit")}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
