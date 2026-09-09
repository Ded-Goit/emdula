"use client";

import { useSyncExternalStore } from "react"; // 1. Імпортуємо useSyncExternalStore з React 19
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";

import styles from "./Hero.module.css";

// 2. Створюємо функції-заглушки для перевірки середовища
const emptySubscribe = () => () => {};
const getClientSnapshot = () => true; // У браузері поверне true
const getServerSnapshot = () => false; // На сервері поверне false

function HeroVisual() {
  return (
    <div className={styles.visual} aria-hidden="true">
      <div className={styles.visualGlow} />

      <div className={styles.dashboard}>
        <div className={styles.dashboardTop}>
          <div className={styles.chartCard}>
            <span>Business Intelligence</span>
            <div className={styles.lineChart}>
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
            </div>
            <div className={styles.chartLabels}>
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
            </div>
          </div>

          <div className={styles.donutCard}>
            <span>Performance by Function</span>
            <div className={styles.donut}>
              <div />
            </div>
          </div>
        </div>

        <div className={styles.dashboardMiddle}>
          <div className={styles.revenueCard}>
            <span>Revenue</span>
            <strong>$8.34M</strong>
            <div className={styles.barChart}>
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
            </div>
          </div>

          <div className={styles.aiCore}>
            <span>AI</span>
          </div>

          <div className={styles.automationCard}>
            <span>Workflow Automation</span>
            <div className={styles.workflowIcon}>
              <span>↕</span>
            </div>
            <small>Automate · Orchestrate · Optimize</small>
          </div>
        </div>

        <div className={styles.dashboardBottom}>
          <div className={styles.smallMetric}>
            <span>Operational Efficiency</span>
            <strong>92.1%</strong>
            <div className={styles.miniLine} />
          </div>

          <div className={styles.smallMetric}>
            <span>System Health</span>
            <strong>98%</strong>
            <div className={styles.healthRing}>
              <span />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.city}>
        <div className={`${styles.building} ${styles.buildingOne}`} />
        <div className={`${styles.building} ${styles.buildingTwo}`} />
        <div className={`${styles.building} ${styles.buildingThree}`} />
        <div className={`${styles.building} ${styles.buildingFour}`} />
        <div className={`${styles.building} ${styles.buildingFive}`} />
        <div className={styles.ground} />
      </div>

      <div className={`${styles.spark} ${styles.sparkOne}`} />
      <div className={`${styles.spark} ${styles.sparkTwo}`} />
      <div className={`${styles.spark} ${styles.sparkThree}`} />
      <div className={`${styles.spark} ${styles.sparkFour}`} />
    </div>
  );
}

export default function Hero() {
  const { t } = useTranslation("common");

  // 3. Безпечно дізнаємося, чи ми вже на клієнті
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    getClientSnapshot,
    getServerSnapshot,
  );

  // 4. Поки сервер рендерить сторінку, повертаємо скелетон без динамічного тексту t(),
  // щоб уникнути конфліктів гідратації
  if (!isMounted) {
    return (
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.content} />
          <HeroVisual />
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

        <HeroVisual />
      </div>
    </section>
  );
}
