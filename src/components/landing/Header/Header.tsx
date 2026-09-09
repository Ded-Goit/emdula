"use client";

import { useState, useSyncExternalStore } from "react"; // 1. Імпортуємо useSyncExternalStore
import { useTranslation } from "react-i18next";
import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";

import styles from "./Header.module.css";

// Заглушки для підписки, які завжди кажуть клієнту "true", а серверу "false"
const emptySubscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;
// Компонент Logo залишається без змін, оскільки там статичний текст "Emdula"
function Logo() {
  return (
    <Link href="/" className={styles.logo} aria-label="Emdula">
      <svg
        className={styles.logoMark}
        viewBox="0 0 34 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M16.8 3.5C13.7 6.1 11.1 9.1 9.4 12.5C7.6 16 7.2 20.5 9.1 24.1C10.7 27.1 13.7 29.2 17 29.4C20.3 29.6 23.4 27.9 25.2 25.1C27.5 21.5 27 16.7 25.2 13.1C23.6 9.9 20.7 6.6 16.8 3.5Z"
          fill="currentColor"
        />
        <path
          d="M15.2 5.8C12.6 5.2 10.6 6.3 9.3 8.2C8.3 9.7 8.4 11.8 9.8 13"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <path
          d="M20 7.2C22.1 7.7 23.8 9 24.7 10.8"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <circle cx="14.2" cy="16.2" r="1.1" fill="white" />
        <circle cx="20.1" cy="16.2" r="1.1" fill="white" />
      </svg>

      <span>Emdula</span>
    </Link>
  );
}

export default function Header() {
  const { t, i18n } = useTranslation("common");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 2. Замість useEffect використовуємо вбудований механізм синхронізації React 19
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    getClientSnapshot,
    getServerSnapshot,
  );

  const currentLanguage = i18n.language?.startsWith("uk") ? "uk" : "en";

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    setIsMenuOpen(false);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // 4. Важливий крок: Якщо сервер рендерить сторінку, або клієнтський JS ще
  // не встиг запуститися, ми повертаємо порожню структуру (скелетон), яка
  // ідеально збігається на сервері та клієнті і не містить динамічного тексту t()
  if (!isMounted) {
    return (
      <header className={styles.header}>
        <div className={styles.container}>
          <Logo />
          {/* Повертаємо пустий контейнер навігації на секунду розрахунку мови */}
          <nav className={styles.desktopNav} aria-label="Main navigation" />
        </div>
      </header>
    );
  }

  // 5. Повний рендер інтерфейсу відбувається тільки після успішного монтування
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Logo />

        <nav className={styles.desktopNav} aria-label="Main navigation">
          <a href="#products">
            {t("navigation.products")}
            <ChevronDown aria-hidden="true" />
          </a>

          <a href="#solutions">
            {t("navigation.solutions")}
            <ChevronDown aria-hidden="true" />
          </a>

          <a href="#about">{t("navigation.aboutUs")}</a>

          <a href="#how-we-work">{t("navigation.howWeWork")}</a>
        </nav>

        <div className={styles.desktopActions}>
          <div className={styles.languageSwitcher}>
            <button
              type="button"
              className={styles.languageButton}
              aria-label={t("footer.language")}
            >
              <span>
                {currentLanguage === "uk"
                  ? t("common.ukrainian")
                  : t("common.english")}
              </span>
              <ChevronDown aria-hidden="true" />
            </button>

            <div className={styles.languageDropdown}>
              <button
                type="button"
                className={
                  currentLanguage === "en" ? styles.activeLanguage : ""
                }
                onClick={() => changeLanguage("en")}
              >
                English
              </button>

              <button
                type="button"
                className={
                  currentLanguage === "uk" ? styles.activeLanguage : ""
                }
                onClick={() => changeLanguage("uk")}
              >
                Українська
              </button>
            </div>
          </div>
        </div>

        <button
          type="button"
          className={styles.menuButton}
          onClick={() => setIsMenuOpen((previous) => !previous)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      <div
        className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuOpen : ""}`}
      >
        <nav className={styles.mobileNav} aria-label="Mobile navigation">
          <a href="#products" onClick={closeMenu}>
            {t("navigation.products")}
            <ChevronDown aria-hidden="true" />
          </a>
          <a href="#solutions" onClick={closeMenu}>
            {t("navigation.solutions")}
            <ChevronDown aria-hidden="true" />
          </a>
          <a href="#about" onClick={closeMenu}>
            {t("navigation.aboutUs")}
          </a>
          <a href="#how-we-work" onClick={closeMenu}>
            {t("navigation.howWeWork")}
          </a>
        </nav>
      </div>
    </header>
  );
}
