"use client";

import { ReactNode } from "react"; // 1. Імпортуємо тип ReactNode
import { I18nextProvider } from "react-i18next";

import i18n from "@/i18n";

// 2. Вказуємо тип для children
export default function I18nProvider({ children }: { children: ReactNode }) {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
