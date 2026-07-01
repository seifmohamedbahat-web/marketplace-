import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { applyLangToDocument } from "@/i18n";

export function I18nBoot() {
  const { i18n } = useTranslation();
  useEffect(() => {
    applyLangToDocument(i18n.language);
  }, [i18n.language]);
  return null;
}