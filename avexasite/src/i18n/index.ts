import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import fr from "./fr.json";
import ar from "./ar.json";

export const supportedLanguages = ["en", "fr", "ar"] as const;
export type SupportedLanguage = (typeof supportedLanguages)[number];

export const rtlLanguages: SupportedLanguage[] = ["ar"];

export const languageLabels: Record<SupportedLanguage, string> = {
  en: "English",
  fr: "Français",
  ar: "العربية",
};

export function isRtl(lang: string): boolean {
  return rtlLanguages.includes(lang as SupportedLanguage);
}

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources: {
      en: { translation: en },
      fr: { translation: fr },
      ar: { translation: ar },
    },
    lng: "en",
    fallbackLng: "en",
    supportedLngs: supportedLanguages as unknown as string[],
    interpolation: { escapeValue: false },
  });
}

export default i18n;
