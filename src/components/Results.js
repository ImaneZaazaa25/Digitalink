import React, { useEffect, useRef, useMemo, useCallback } from 'react';
import styles from './Results.module.css';
import useInView from '../hooks/useInView';

function useCountUp(target, inView, duration = 2000) {
  const ref = useRef(null);
  const animRef = useRef(null);

  const startCount = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const start = performance.now();
    const update = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      el.textContent = current.toLocaleString();
      if (progress < 1) animRef.current = requestAnimationFrame(update);
      else el.textContent = target.toLocaleString();
    };
    animRef.current = requestAnimationFrame(update);
  }, [target, duration]);

  useEffect(() => {
    if (inView) startCount();
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [inView, startCount]);

  return ref;
}

const METRICS = [
  { value: 100, suffix: '+', label: 'Clients Satisfaits', desc: 'PMEs et grandes entreprises' },
  { value: 360, suffix: '°', label: 'Services Digitaux', desc: 'Approche holistique complète' },
  { value: 5, suffix: 'ans', label: 'D\'expertise', desc: 'Depuis 2020 au Maroc' },
  { value: 98, suffix: '%', label: 'Taux de Satisfaction', desc: 'Clients qui nous recommandent' },
];

function MetricCard({ metric, inView, index }) {
  const numRef = useCountUp(metric.value, inView);

  return (
    <div className={`${styles.metric} ${inView ? styles.metricVisible : ''}`}
      style={{ transitionDelay: `${index * 0.15}s` }}>
      <div className={styles.metricVal}>
        <span ref={numRef} className="grad-text">0</span>
        <span className={`${styles.suffix} grad-text`}>{metric.suffix}</span>
      </div>
      <div className={styles.metricLabel}>{metric.label}</div>
      <div className={styles.metricDesc}>{metric.desc}</div>
    </div>
  );
}

export default function Results() {
  const [ref, inView] = useInView();
  const [titleRef, titleInView] = useInView();
  const memoMetrics = useMemo(() => METRICS, []);

  const PROCESS = useMemo(() => [
    { n: '01', title: 'Analyse & Audit', desc: 'Étude complète de votre marché, concurrents et présence digitale actuelle.' },
    { n: '02', title: 'Stratégie sur Mesure', desc: 'Élaboration d\'une feuille de route digitale alignée avec vos objectifs business.' },
    { n: '03', title: 'Exécution & Lancement', desc: 'Mise en place et déploiement des actions marketing avec des équipes dédiées.' },
    { n: '04', title: 'Optimisation Continue', desc: 'Suivi des KPIs et optimisations data-driven pour maximiser votre ROI.' },
  ], []);

  return (
    <section className={styles.section} id="results">
      <div className={styles.inner}>
        <div ref={titleRef} className={`${styles.header} ${titleInView ? styles.headerVisible : ''}`}>
          <span className={styles.eyebrow}>Nos Résultats</span>
          <h2 className={styles.title}>
            Des chiffres qui<br /><span className="grad-text">parlent d'eux-mêmes</span>
          </h2>
        </div>

        <div ref={ref} className={styles.metricsGrid}>
          {memoMetrics.map((m, i) => (
            <MetricCard key={m.label} metric={m} inView={inView} index={i} />
          ))}
        </div>

        <div className={styles.process}>
          <h3 className={styles.processTitle}>Notre Processus</h3>
          <div className={styles.processGrid}>
            {PROCESS.map((step, i) => {
              const [stepRef, stepInView] = useInView();
              return (
                <div key={step.n} ref={stepRef}
                  className={`${styles.step} ${stepInView ? styles.stepVisible : ''}`}
                  style={{ transitionDelay: `${i * 0.12}s` }}>
                  <div className={styles.stepNum}>{step.n}</div>
                  <div className={styles.stepLine} />
                  <div className={styles.stepContent}>
                    <div className={styles.stepTitle}>{step.title}</div>
                    <div className={styles.stepDesc}>{step.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
