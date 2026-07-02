import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Mail, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PhonePicker, formatPhoneValue } from "../components/PhonePicker";
import { defaultCountryCode } from "../data/countries";
import { submitToWeb3Forms } from "../lib/web3forms";

export const Route = createFileRoute("/contact")({ component: ContactPage });

const CONTACT_EMAIL = "seifmohamedbahat@gmail.com";

function ContactPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState(defaultCountryCode);
  const [localNumber, setLocalNumber] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    const result = await submitToWeb3Forms({
      subject: `New contact form message: ${subject}`,
      from_name: "Avexa Website — Contact Form",
      name,
      email,
      phone: formatPhoneValue(countryCode, localNumber),
      topic: subject,
      message,
    });

    if (result.success) {
      navigate({ to: "/thank-you" });
    } else {
      setStatus("error");
    }
  };

  return (
    <section className="relative bg-black pt-36 pb-24 md:pt-44 md:pb-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-16"
        >
          <h1 className="font-display font-black uppercase text-5xl md:text-6xl leading-none">
            {t("contact.heading")}
          </h1>
          <p className="mt-5 text-white/70 text-lg">{t("contact.subline")}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <motion.form
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="lg:col-span-2 space-y-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="block text-sm text-white/60 mb-2">
                  {t("contact.name")}
                </label>
                <input
                  id="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-white/20 bg-transparent px-4 py-4 text-white focus:border-brand focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm text-white/60 mb-2">
                  {t("contact.email")}
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-white/20 bg-transparent px-4 py-4 text-white focus:border-brand focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm text-white/60 mb-2">
                {t("contact.phone")}
              </label>
              <PhonePicker
                id="phone"
                required
                countryCode={countryCode}
                localNumber={localNumber}
                onCountryChange={setCountryCode}
                onNumberChange={setLocalNumber}
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm text-white/60 mb-2">
                {t("contact.subject")}
              </label>
              <input
                id="subject"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full border border-white/20 bg-transparent px-4 py-4 text-white focus:border-brand focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm text-white/60 mb-2">
                {t("contact.message")}
              </label>
              <textarea
                id="message"
                required
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full border border-white/20 bg-transparent px-4 py-4 text-white focus:border-brand focus:outline-none transition-colors resize-none"
              />
            </div>

            {status === "error" && (
              <p className="text-sm text-accent-x">{t("contact.error")}</p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="animate-pulse-red flex items-center justify-center gap-2 border border-brand bg-brand px-8 py-4 font-display text-sm uppercase tracking-widest text-white transition-transform hover:scale-105 disabled:opacity-60 disabled:hover:scale-100"
            >
              {status === "sending" && <Loader2 size={16} className="animate-spin" />}
              {status === "sending" ? t("contact.sending") : t("contact.send")}
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="border border-white/10 p-8 h-fit"
          >
            <h2 className="font-display uppercase tracking-widest text-sm text-white/50 mb-4">
              {t("contact.infoHeading")}
            </h2>
            <p className="text-white/60 text-sm leading-relaxed mb-6">{t("contact.infoBlurb")}</p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="flex items-center gap-3 text-white/85 transition-all duration-300 hover:translate-x-1 hover:text-accent-x break-all"
            >
              <Mail size={18} className="text-accent-x shrink-0" />
              {CONTACT_EMAIL}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
