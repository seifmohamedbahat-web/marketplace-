import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Send } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SocialIcons } from "@/components/SocialIcons";
import { PhoneInput } from "@/components/PhoneInput";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { sendForm } from "@/lib/sendForm";
import { COUNTRIES } from "@/lib/countries";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Avexa" },
      { name: "description", content: "Get in touch with Avexa to start your next web project." },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(1).max(40),
  subject: z.string().trim().min(1).max(150),
  message: z.string().trim().min(1).max(2000),
});

function ContactPage() {
  const { t, i18n } = useTranslation();
  const [form, setForm] = useState({ name: "", email: "", phone: "", phoneCountry: "EG", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [toast, setToast] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  const onChange = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = schema.safeParse(form);
    if (!res.success) {
      const errs: Record<string, string> = {};
      for (const issue of res.error.issues) errs[issue.path[0] as string] = issue.message;
      setErrors(errs);
      return;
    }
    setErrors({});
    setSending(true);
    const dial = COUNTRIES.find((c) => c.iso === form.phoneCountry)?.dial ?? "";
    const fullPhone = form.phone.trim() ? `+${dial} ${form.phone.trim()}` : "";
    const ok = await sendForm(`New Contact Message from ${form.name}`, {
      Type: "Contact Inquiry",
      Language: i18n.language.toUpperCase(),
      Name: form.name,
      Email: form.email,
      Phone: fullPhone || "-",
      Subject: form.subject,
      Message: form.message,
    });
    setSending(false);
    setToast(ok ? t("contact.form.success") : t("contact.form.error"));
    if (ok) setForm({ name: "", email: "", phone: "", phoneCountry: "EG", subject: "", message: "" });
    setTimeout(() => setToast(null), 5000);
  };

  const inputCls = "w-full bg-black border-2 border-white/20 px-4 py-3 text-white placeholder:text-white/40 focus:border-[#C41E1E] outline-none transition-colors";

  return (
    <>
      <Nav />
      <main className="pt-32 pb-20 px-6 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-7xl font-black text-center mb-4">
            {t("contact.heading1")} <span className="text-accent-x">{t("contact.heading2")}</span>
          </motion.h1>
          <p className="text-center text-white/70 max-w-2xl mx-auto mb-16">{t("contact.subtitle")}</p>

          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 border-2 border-[#C41E1E] flex items-center justify-center text-[#C41E1E] shrink-0"><Mail /></div>
                <div className="break-all"><div className="text-white/60 text-sm uppercase tracking-widest">Email</div><div className="text-white text-lg">seifmohamedbahat@gmail.com</div></div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 border-2 border-[#C41E1E] flex items-center justify-center text-[#C41E1E] shrink-0"><Phone /></div>
                <div><div className="text-white/60 text-sm uppercase tracking-widest">Phone</div><div className="text-white text-lg">+20 101 264 8914</div></div>
              </div>
              <div className="pt-4">
                <div className="text-white/60 text-sm uppercase tracking-widest mb-3">Social</div>
                <SocialIcons />
              </div>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              onSubmit={onSubmit}
              className="space-y-4 bg-black border-2 border-white/20 p-8"
            >
              <div>
                <input className={inputCls} placeholder={t("contact.form.name")} value={form.name} onChange={onChange("name")} />
                {errors.name && <p className="text-[#C41E1E] text-xs mt-1">{t("validation.required")}</p>}
              </div>
              <div>
                <input className={inputCls} type="email" placeholder={t("contact.form.email")} value={form.email} onChange={onChange("email")} />
                {errors.email && <p className="text-[#C41E1E] text-xs mt-1">{t("validation.email")}</p>}
              </div>
              <div>
              <PhoneInput
                value={form.phone}
                onChange={(v) => setForm((f) => ({ ...f, phone: v }))}
                countryIso={form.phoneCountry}
                onCountryChange={(v) => setForm((f) => ({ ...f, phoneCountry: v }))}
                placeholder={t("contact.form.phone")}
                inputClassName={inputCls}
              />
              {errors.phone && <p className="text-[#C41E1E] text-xs mt-1">{t("validation.required")}</p>}
              </div>
              <div>
                <input className={inputCls} placeholder={t("contact.form.subject")} value={form.subject} onChange={onChange("subject")} />
                {errors.subject && <p className="text-[#C41E1E] text-xs mt-1">{t("validation.required")}</p>}
              </div>
              <div>
                <textarea rows={5} className={inputCls + " resize-none"} placeholder={t("contact.form.message")} value={form.message} onChange={onChange("message")} />
                {errors.message && <p className="text-[#C41E1E] text-xs mt-1">{t("validation.required")}</p>}
              </div>
              <button type="submit" disabled={sending} className="w-full py-4 bg-[#C41E1E] text-white font-display tracking-widest border-2 border-[#C41E1E] hover:scale-[1.02] transition-transform inline-flex items-center justify-center gap-2 red-glow disabled:opacity-50 disabled:hover:scale-100">
                <Send size={18} /> {sending ? "..." : t("contact.form.send")}
              </button>
            </motion.form>
          </div>
        </div>

        {toast && (
          <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="fixed bottom-6 inset-x-6 md:inset-x-auto md:right-6 z-50 bg-black border-2 border-[#C41E1E] red-glow px-6 py-4 text-white">
            {toast}
          </motion.div>
        )}
      </main>
      <Footer />
    </>
  );
}