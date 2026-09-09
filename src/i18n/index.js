"use client";

import i18n from "i18next";
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
  i18n.use(initReactI18next).init({
    resources,

    // IMPORTANT:
    // The initial language must be identical on server and client.
    lng: "en",
    fallbackLng: "en",

    supportedLngs: ["en", "uk"],

    defaultNS: "common",
    ns: ["common"],

    interpolation: {
      escapeValue: false,
    },

    react: {
      useSuspense: false,
    },
  });
}

export default i18n;
