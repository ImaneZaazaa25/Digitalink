// src/components/Footer.jsx
import React, { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Footer.module.css';
import {
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaWhatsapp,
} from 'react-icons/fa';

const LINKS = {
  Services: [
    { label: 'Google & Meta Ads', to: '/#services', type: 'hash' },
    { label: 'SEO & Referencement', to: '/#services', type: 'hash' },
    { label: 'Social Media', to: '/#services', type: 'hash' },
    { label: 'Branding', to: '/#services', type: 'hash' },
    { label: 'Sites Web', to: '/#services', type: 'hash' },
  ],
  Entreprise: [
    { label: 'Accueil', to: '/', type: 'route' },
    { label: 'A propos', to: '/about-us', type: 'route' },
    { label: 'Notre approche', to: '/about-us#approach', type: 'hash' },
    { label: 'Resultats', to: '/#results', type: 'hash' },
    { label: 'Contact', to: '/contact', type: 'route' },
    { label: 'Blogs', to: '/blogs', type: 'route' },
  ],
  Legal: [
    { label: 'Mentions legales', to: '/mentions-legales', type: 'route' },
    { label: 'Politique de confidentialite', to: '/confidentialite', type: 'route' },
    { label: 'CGU', to: '/cgu', type: 'route' },
  ],
  'Suivez-nous': [
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

    if (path === currentPath || (path === '/' && currentPath === '/')) {
      const element = document.getElementById(hash);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
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
        <a
          href={item.to}
          className={styles.footLink}
          onClick={(e) => {
            e.preventDefault();
            scrollToHash(item.to);
          }}
        >
          {item.label}
        </a>
      );
    }

    return (
      <Link to={item.to} className={styles.footLink}>
        {item.label}
      </Link>
    );
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.brand}>
          <Link to="/" className={styles.logo}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <defs>
                <linearGradient id="fg" x1="0" y1="0" x2="28" y2="28">
                  <stop stopColor="#7c5cfc" />
                  <stop offset="1" stopColor="#38d2ff" />
                </linearGradient>
              </defs>
            </svg>
            <span className={styles.logoText}>Digitalink</span>
          </Link>

          <p className={styles.tagline}>Growth. Performance. Results.</p>

          <p className={styles.desc}>
            Agence de Marketing Digital basee a Casablanca, specialisee dans l'acquisition
            de trafic qualifie et la croissance des performances en ligne.
          </p>

          <div className={styles.socials}>
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.social}
                title={social.label}
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        <div className={styles.linksGrid}>
          {Object.entries(LINKS).map(([cat, items]) => (
            <div key={cat} className={styles.linkCol}>
              <h4 className={styles.colTitle}>{cat}</h4>
              <ul>
                {items.map((item) => (
                  <li key={item.label}>{renderLink(item)}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.bottom}>
        <span className={styles.copy}>
          (c) {year} Digitalink - Digital Marketing Agency. Tous droits reserves.
        </span>
      </div>
    </footer>
  );
}
