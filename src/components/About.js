import React from 'react';
import styles from './About.module.css';
import useInView from '../hooks/useInView';

import {
  FaChartLine,
  FaBolt,
  FaGlobeAfrica,
  FaBullseye
} from 'react-icons/fa';

// 🔥 Data propre et scalable
const PILLARS = [
  {
    title: 'Orientés Performance',
    desc: 'Chaque décision est guidée par les données et les résultats mesurables.',
    icon: <FaChartLine />
  },
  {
    title: 'Agence Agile',
    desc: 'Une équipe réactive et adaptable aux évolutions rapides du marché digital.',
    icon: <FaBolt />
  },
  {
    title: 'Expertise Locale',
    desc: 'Connaissance approfondie des marchés marocain et africain.',
    icon: <FaGlobeAfrica />
  },
  {
    title: 'Vision 360°',
    desc: 'Une approche intégrée couvrant tout le spectre de votre présence digitale.',
    icon: <FaBullseye />
  },
];

export default function About() {
  const [ref, inView] = useInView();
  const [pillarsRef, pillarsInView] = useInView();

  return (
    <section className={styles.section} id="about">
      <div className={styles.inner}>
        
        {/* LEFT CONTENT */}
        <div
          ref={ref}
          className={`${styles.left} ${inView ? styles.visible : ''}`}
        >
          <span className={styles.eyebrow}>À propos de nous</span>

          <h2 className={styles.title}>
            Votre partenaire <span className="grad-text">digital</span> à Casablanca
          </h2>

          <p className={styles.body}>
            Fondée en 2020, Digitalink est une agence de marketing digital basée à Casablanca,
            spécialisée dans l'acquisition de trafic qualifié et la croissance des performances en ligne.
          </p>

          <p className={styles.body}>
            Nous accompagnons les entreprises marocaines et internationales dans leur transformation
            digitale en combinant stratégie data-driven, créativité et expertise technique.
            Notre approche 360° garantit une cohérence parfaite entre tous vos canaux digitaux.
          </p>

          {/* CONTACT */}
          <div className={styles.contact}>
            <a href="tel:+212660385276" className={styles.contactItem}>
              <FaBolt />
              +212 660 385 276
            </a>
          </div>
        </div>

        {/* RIGHT PILLARS */}
        <div
          ref={pillarsRef}
          className={`${styles.right} ${pillarsInView ? styles.pillarsVisible : ''}`}
        >
          {PILLARS.map((p, i) => (
            <div
              key={p.title}
              className={styles.pillar}
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              <div className={styles.pillarIcon}>{p.icon}</div>

              <div>
                <div className={styles.pillarTitle}>{p.title}</div>
                <div className={styles.pillarDesc}>{p.desc}</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}