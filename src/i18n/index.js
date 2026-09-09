"use client";

import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import en from "./locales/en/common.json";
import uk from "./locales/uk/common.json";

const resources = {
  en: {
    common: en,
  },
  uk: {
    common: uk,
  },
};

if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,

      fallbackLng: "en",

      supportedLngs: ["en", "uk"],

      defaultNS: "common",

      ns: ["common"],

      interpolation: {
        escapeValue: false,
      },

      detection: {
        order: ["localStorage", "navigator"],
        caches: ["localStorage"],
      },
    });
}

export default i18n;
