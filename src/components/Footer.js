// src/components/Footer.jsx
import React, { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Footer.module.css';
import { FaMapMarkerAlt } from 'react-icons/fa';
import {
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaWhatsapp,
} from 'react-icons/fa';

const LINKS = {
  Services: [
    { label: 'Google & Meta Ads', to: '/#services', type: 'hash' },
    { label: 'SEO & Référencement', to: '/#services', type: 'hash' },
    { label: 'Social Media', to: '/#services', type: 'hash' },
    { label: 'Branding', to: '/#services', type: 'hash' },
    { label: 'Sites Web', to: '/#services', type: 'hash' },
  ],
  Entreprise: [
    { label: 'Accueil', to: '/', type: 'route' },
    { label: 'À propos', to: '/about', type: 'route' },
    { label: 'Notre approche', to: '/about#approach', type: 'hash' },
    { label: 'Résultats', to: '/#results', type: 'hash' },
    { label: 'Contact', to: '/contact', type: 'route' },
  ],
  Légal: [
    { label: 'Mentions légales', to: '/mentions-legales', type: 'route' },
    { label: 'Politique de confidentialité', to: '/confidentialite', type: 'route' },
    { label: 'CGU', to: '/cgu', type: 'route' },
  ],
  "Suivez-nous": [
    { label: 'Instagram', to: 'https://www.instagram.com/digitalink.ma', type: 'external' },
    { label: 'Facebook', to: 'https://web.facebook.com/digitalink.ma', type: 'external' },
    { label: 'LinkedIn', to: 'https://www.linkedin.com/company/digitalnk/about/', type: 'external' },
    { label: 'WhatsApp', to: 'https://api.whatsapp.com/send/?phone=212660385276', type: 'external' },
  ],
};

export default function Footer() {
  const year = useMemo(() => new Date().getFullYear(), []);
  const location = useLocation();

  const socialLinks = [
    { icon: <FaInstagram />, label: 'Instagram', href: 'https://www.instagram.com/digitalink.ma' },
    { icon: <FaFacebook />, label: 'Facebook', href: 'https://web.facebook.com/digitalink.ma' },
    { icon: <FaLinkedin />, label: 'LinkedIn', href: 'https://www.linkedin.com/company/digitalnk/about/' },
    { icon: <FaWhatsapp />, label: 'WhatsApp', href: 'https://api.whatsapp.com/send/?phone=212660385276' },
  ];

  const scrollToHash = (to) => {
    const [path, hash] = to.split('#');
    const currentPath = location.pathname;
    
    if ((path === currentPath || (path === '/' && currentPath === '/'))) {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.location.href = to;
    }
  };

  const renderLink = (item) => {
    if (item.type === 'external') {
      return (
        <a href={item.to} className={styles.footLink} target="_blank" rel="noopener noreferrer">
          {item.label}
        </a>
      );
    }
    
    if (item.type === 'hash') {
      return (
        <a href={item.to} className={styles.footLink} onClick={(e) => {
          e.preventDefault();
          scrollToHash(item.to);
        }}>
          {item.label}
        </a>
      );
    }
    
    return <Link to={item.to} className={styles.footLink}>{item.label}</Link>;
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        
        {/* BRAND - Section gauche */}
        <div className={styles.brand}>
          <Link to="/" className={styles.logo}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="14" r="12" stroke="url(#fg)" strokeWidth="2"/>
              <path d="M9 14l3 3 7-7" stroke="url(#fg)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <defs>
                <linearGradient id="fg" x1="0" y1="0" x2="28" y2="28">
                  <stop stopColor="#7c5cfc"/>
                  <stop offset="1" stopColor="#38d2ff"/>
                </linearGradient>
              </defs>
            </svg>
            <span className={styles.logoText}>Digitalink</span>
          </Link>

          <p className={styles.tagline}>Growth. Performance. Results.</p>

          <p className={styles.desc}>
            Agence de Marketing Digital basée à Casablanca, spécialisée dans l'acquisition
            de trafic qualifié et la croissance des performances en ligne.
          </p>

          {/* SOCIAL ICONS */}
          <div className={styles.socials}>
            {socialLinks.map(s => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.social}
                title={s.label}
                aria-label={s.label}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* LINKS GRID - 4 colonnes côte à côte */}
        <div className={styles.linksGrid}>
          {Object.entries(LINKS).map(([cat, items]) => (
            <div key={cat} className={styles.linkCol}>
              <h4 className={styles.colTitle}>{cat}</h4>
              <ul>
                {items.map(item => (
                  <li key={item.label}>{renderLink(item)}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM */}
      <div className={styles.bottom}>
        <span className={styles.copy}>
          © {year} Digitalink — Digital Marketing Agency. Tous droits réservés.
        </span>
        
      </div>
    </footer>
  );
}