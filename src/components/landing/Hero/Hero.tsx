"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import { useSyncExternalStore } from "react";

import styles from "./Hero.module.css";

const emptySubscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export default function Hero() {
  const { t } = useTranslation("common");

  const isMounted = useSyncExternalStore(
    emptySubscribe,
    getClientSnapshot,
    getServerSnapshot,
  );

  if (!isMounted) {
    return (
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.content}>
            <h1 className={styles.title}>
              <span className={styles.titlePlaceholder} />
              <span className={styles.titlePlaceholder} />
              <span
                className={`${styles.titlePlaceholder} ${styles.titlePlaceholderAccent}`}
              />
              <span className={styles.titlePlaceholder} />
            </h1>

            <div className={styles.descriptionPlaceholder} />

            <div className={styles.actions}>
              <span className={styles.buttonPlaceholder} />
              <span className={styles.buttonPlaceholderSecondary} />
            </div>
          </div>

          <div className={styles.visual} aria-hidden="true">
            <Image
              src="/Section.png"
              alt=""
              fill
              priority
              sizes="(min-width: 1280px) 820px, (min-width: 1024px) 760px, (min-width: 768px) 680px, 100vw"
              className={styles.visualImage}
            />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            <span>{t("hero.titleLine1")}</span>
            <span>{t("hero.titleLine2")}</span>
            <span className={styles.titleAccent}>{t("hero.titleLine3")}</span>
            <span>{t("hero.titleLine4")}</span>
          </h1>

          <p className={styles.description}>{t("hero.description")}</p>

          <div className={styles.actions}>
            <a href="#products" className={styles.primaryButton}>
              <span>{t("hero.exploreProducts")}</span>
              <ArrowRight aria-hidden="true" />
            </a>

            <a href="#contact" className={styles.secondaryButton}>
              {t("hero.contactUs")}
            </a>
          </div>
        </div>

        <div className={styles.visual} aria-hidden="true">
          <Image
            src="/Section.png"
            alt=""
            fill
            priority
            sizes="(min-width: 1280px) 820px, (min-width: 1024px) 760px, (min-width: 768px) 680px, 100vw"
            className={styles.visualImage}
          />
        </div>
      </div>
    </section>
  );
}
