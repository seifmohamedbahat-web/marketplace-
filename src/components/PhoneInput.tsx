import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { COUNTRIES, flagEmoji, type Country } from "@/lib/countries";

type Props = {
  value: string; // local number digits (without +dial)
  onChange: (v: string) => void;
  countryIso: string;
  onCountryChange: (iso: string) => void;
  placeholder?: string;
  inputClassName?: string;
};

export function PhoneInput({ value, onChange, countryIso, onCountryChange, placeholder, inputClassName }: Props) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const current = useMemo<Country>(
    () => COUNTRIES.find((c) => c.iso === countryIso) ?? COUNTRIES.find((c) => c.iso === "EG")!,
    [countryIso],
  );

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return COUNTRIES;
    return COUNTRIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.dial.includes(q.replace(/^\+/, "")) ||
        c.iso.toLowerCase().includes(q),
    );
  }, [search]);

  const base =
    inputClassName ??
    "w-full bg-black border-2 border-white/30 px-5 py-4 text-xl text-white placeholder:text-white/40 focus:border-[#C41E1E] outline-none transition-colors";

  return (
    <div ref={ref} className="relative flex items-stretch gap-2">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 bg-black border-2 border-white/30 px-3 hover:border-[#C41E1E] transition-colors"
        aria-label="Select country"
      >
        <span className="text-2xl leading-none">{flagEmoji(current.iso)}</span>
        <span className="text-white font-mono text-sm">+{current.dial}</span>
        <ChevronDown size={16} className="text-white/60" />
      </button>
      <input
        type="tel"
        inputMode="tel"
        className={base + " flex-1"}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value.replace(/[^\d\s\-()]/g, ""))}
      />
      {open && (
        <div className="absolute top-full start-0 mt-2 z-50 w-[320px] max-h-[320px] bg-black border-2 border-white/30 overflow-hidden flex flex-col">
          <div className="p-2 border-b border-white/20 flex items-center gap-2">
            <Search size={16} className="text-white/60 shrink-0" />
            <input
              autoFocus
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search country..."
              className="w-full bg-transparent text-white text-sm outline-none placeholder:text-white/40"
            />
          </div>
          <ul className="overflow-y-auto">
            {filtered.map((c) => (
              <li key={c.iso}>
                <button
                  type="button"
                  onClick={() => {
                    onCountryChange(c.iso);
                    setOpen(false);
                    setSearch("");
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-left text-sm hover:bg-[#C41E1E]/20 ${
                    c.iso === current.iso ? "bg-white/10" : ""
                  }`}
                >
                  <span className="text-xl leading-none">{flagEmoji(c.iso)}</span>
                  <span className="text-white flex-1 truncate">{c.name}</span>
                  <span className="text-white/60 font-mono">+{c.dial}</span>
                </button>
              </li>
            ))}
            {filtered.length === 0 && <li className="px-3 py-3 text-white/50 text-sm">No results</li>}
          </ul>
        </div>
      )}
    </div>
  );
}