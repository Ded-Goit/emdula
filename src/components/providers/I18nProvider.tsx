"use client";

import { ReactNode, useEffect } from "react";
import { I18nextProvider } from "react-i18next";

import i18n from "@/i18n/index";

export default function I18nProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const savedLanguage = localStorage.getItem("i18nextLng");

    if (savedLanguage === "en" || savedLanguage === "uk") {
      if (i18n.language !== savedLanguage) {
        i18n.changeLanguage(savedLanguage);
      }

      return;
    }

    const browserLanguage = navigator.language.toLowerCase();

    const detectedLanguage = browserLanguage.startsWith("uk") ? "uk" : "en";

    i18n.changeLanguage(detectedLanguage);
    localStorage.setItem("i18nextLng", detectedLanguage);
  }, []);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
