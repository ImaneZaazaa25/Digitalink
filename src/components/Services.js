import React, { useMemo } from 'react';
import styles from './Services.module.css';
import useInView from '../hooks/useInView';

import {
  FaBullseye,
  FaSearch,
  FaMobileAlt,
  FaBolt,
  FaPaintBrush,
  FaGlobe,
  FaHandshake,
  FaChartBar
} from 'react-icons/fa';

// 🔥 Data clean
const SERVICES = [
  {
    icon: <FaBullseye />,
    title: 'Google & Meta Ads',
    desc: 'Campagnes publicitaires ciblées et optimisées pour maximiser votre ROI et générer des leads qualifiés.',
    tags: ['Google Ads', 'Meta Ads', 'Retargeting'],
    color: '#7c5cfc',
  },
  {
    icon: <FaSearch />,
    title: 'SEO & Référencement',
    desc: 'Stratégies de référencement naturel pour positionner votre site en première page et attirer un trafic organique durable.',
    tags: ['SEO On-Page', 'Netlinking', 'Audit Technique'],
    color: '#38d2ff',
  },
  {
    icon: <FaMobileAlt />,
    title: 'Social Media Management',
    desc: 'Gestion complète de vos réseaux sociaux avec du contenu engageant pour développer votre communauté.',
    tags: ['Instagram', 'LinkedIn', 'TikTok'],
    color: '#e040fb',
  },
  {
    icon: <FaBolt />,
    title: 'Marketing Automation',
    desc: 'Automatisez vos séquences email et CRM pour convertir vos prospects en clients de façon scalable.',
    tags: ['Email Flows', 'CRM', 'Funnels'],
    color: '#ff6b6b',
  },
  {
    icon: <FaPaintBrush />,
    title: 'Branding & Identité',
    desc: "Création et développement de votre identité visuelle pour vous démarquer dans un marché compétitif.",
    tags: ['Logo', 'Charte Graphique', 'Brand Strategy'],
    color: '#ffd93d',
  },
  {
    icon: <FaGlobe />,
    title: 'Sites Web & E-commerce',
    desc: 'Conception de sites web et boutiques e-commerce modernes, rapides et optimisés pour la conversion.',
    tags: ['UX/UI', 'E-commerce', 'Landing Pages'],
    color: '#6bcb77',
  },
  {
    icon: <FaHandshake />,
    title: "Gestion d'Influenceurs",
    desc: 'Identification, gestion et suivi de partenariats avec des influenceurs alignés avec votre marque.',
    tags: ['Micro-Influenceurs', 'Partenariats', 'KPIs'],
    color: '#4d96ff',
  },
  {
    icon: <FaChartBar />,
    title: "Stratégie d'Acquisition",
    desc: 'Développement de stratégies multicanales pour maximiser votre acquisition client à coût maîtrisé.',
    tags: ['Analytics', 'Data-Driven', 'A/B Testing'],
    color: '#c084fc',
  },
];

function ServiceCard({ service, index }) {
  const [ref, inView] = useInView();

  return (
    <div
      ref={ref}
      className={`${styles.card} ${inView ? styles.visible : ''}`}
      style={{ transitionDelay: `${(index % 4) * 0.1}s` }}
    >
      {/* Glow effect */}
      <div
        className={styles.cardGlow}
        style={{ background: service.color }}
      />

      {/* Icon */}
      <div
        className={styles.icon}
        style={{ color: service.color }}
      >
        {service.icon}
      </div>

      {/* Title */}
      <h3 className={styles.cardTitle}>{service.title}</h3>

      {/* Description */}
      <p className={styles.cardDesc}>{service.desc}</p>

      {/* Tags */}
      <div className={styles.tags}>
        {service.tags.map(t => (
          <span
            key={t}
            className={styles.tag}
            style={{
              borderColor: service.color + '40',
              color: service.color
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Services() {
  const [titleRef, titleInView] = useInView();

  // 🔥 optimisation inutile mais OK
  const memoizedServices = useMemo(() => SERVICES, []);

  return (
    <section className={styles.section} id="services">
      <div className={styles.inner}>
        
        {/* HEADER */}
        <div
          ref={titleRef}
          className={`${styles.header} ${titleInView ? styles.headerVisible : ''}`}
        >
          <span className={styles.eyebrow}>Ce que nous faisons</span>

          <h2 className={styles.title}>
            Des services <span className="grad-text">360°</span><br />
            pour votre croissance
          </h2>

          <p className={styles.subtitle}>
            De la stratégie à l'exécution, nous couvrons l'ensemble du spectre digital
            pour transformer votre présence en ligne en moteur de croissance.
          </p>
        </div>

        {/* GRID */}
        <div className={styles.grid}>
          {memoizedServices.map((s, i) => (
            <ServiceCard
              key={s.title}
              service={s}
              index={i}
            />
          ))}
        </div>

      </div>
    </section>
  );
}