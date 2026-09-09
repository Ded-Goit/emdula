import type { Metadata } from "next";
import { ReactNode } from "react";
import "./globals.css";

import I18nProvider from "@/components/providers/I18nProvider";

export const metadata: Metadata = {
  title: "Emdula",
  description: "Enterprise AI platform for connected operational systems.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
