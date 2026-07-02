import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import { countries, flagEmoji, defaultCountryCode, type Country } from "../data/countries";

interface PhonePickerProps {
  countryCode: string;
  localNumber: string;
  onCountryChange: (code: string) => void;
  onNumberChange: (value: string) => void;
  id?: string;
  required?: boolean;
}

export function formatPhoneValue(countryCode: string, localNumber: string): string {
  const country = countries.find((c) => c.code === countryCode);
  const dial = country?.dial ?? "";
  return localNumber ? `${dial} ${localNumber}`.trim() : "";
}

export function PhonePicker({
  countryCode,
  localNumber,
  onCountryChange,
  onNumberChange,
  id,
  required,
}: PhonePickerProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const selected: Country =
    countries.find((c) => c.code === countryCode) ??
    countries.find((c) => c.code === defaultCountryCode)!;

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return countries;
    return countries.filter(
      (c) => c.name.toLowerCase().includes(q) || c.dial.includes(q) || c.code.toLowerCase() === q
    );
  }, [search]);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  return (
    <div ref={containerRef} className="relative flex border border-white/20 focus-within:border-brand transition-colors">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex shrink-0 items-center gap-2 border-e border-white/20 px-4 py-4 text-white/90 hover:bg-white/5 transition-colors"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Select country code"
      >
        <span className="text-lg leading-none">{flagEmoji(selected.code)}</span>
        <span className="text-sm">{selected.dial}</span>
        <ChevronDown size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      <input
        id={id}
        type="tel"
        inputMode="tel"
        required={required}
        value={localNumber}
        onChange={(e) => onNumberChange(e.target.value.replace(/[^\d\s()-]/g, ""))}
        className="w-full bg-transparent px-4 py-4 text-white placeholder:text-white/30 focus:outline-none"
        placeholder="555 123 4567"
      />

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute start-0 top-full z-20 mt-2 w-full max-w-sm border border-white/15 bg-black shadow-xl"
          >
            <div className="flex items-center gap-2 border-b border-white/15 px-3 py-2.5">
              <Search size={15} className="text-white/40 shrink-0" />
              <input
                autoFocus
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t("phone.search")}
                className="w-full bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
              />
            </div>
            <ul role="listbox" className="max-h-64 overflow-y-auto py-1">
              {filtered.map((c) => (
                <li key={c.code}>
                  <button
                    type="button"
                    onClick={() => {
                      onCountryChange(c.code);
                      setOpen(false);
                      setSearch("");
                    }}
                    className={`flex w-full items-center gap-3 px-4 py-2 text-start text-sm hover:bg-white/10 transition-colors ${
                      c.code === selected.code ? "text-accent-x" : "text-white/85"
                    }`}
                  >
                    <span className="text-lg leading-none">{flagEmoji(c.code)}</span>
                    <span className="flex-1 truncate">{c.name}</span>
                    <span className="text-white/50">{c.dial}</span>
                  </button>
                </li>
              ))}
              {filtered.length === 0 && (
                <li className="px-4 py-3 text-sm text-white/40">No matches</li>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
