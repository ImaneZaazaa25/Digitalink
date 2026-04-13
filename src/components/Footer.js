import React, { useMemo } from 'react';
import styles from './Footer.module.css';
import { FaMapMarkerAlt } from 'react-icons/fa';

import {
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaWhatsapp,
  FaBullhorn,
  FaSearch,
  FaMobileAlt,
  FaPaintBrush,
  FaGlobe
} from 'react-icons/fa';

const LINKS = {
  Services: [
    'Google & Meta Ads',
    'SEO & Référencement',
    'Social Media',
    'Branding',
    'Sites Web'
  ],
  Entreprise: ['À propos', 'Notre approche', 'Résultats', 'Contact'],
  "Suivez-nous": ['Instagram', 'Facebook', 'LinkedIn', 'WhatsApp'],
};

export default function Footer() {
  const year = useMemo(() => new Date().getFullYear(), []);

  const socialLinks = [
    {
      icon: <FaInstagram />,
      label: 'Instagram',
      href: 'https://www.instagram.com/digitalink.ma'
    },
    {
      icon: <FaFacebook />,
      label: 'Facebook',
      href: 'https://web.facebook.com/digitalink.ma?_rdc=1&_rdr#'
    },
    {
      icon: <FaLinkedin />,
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/company/digitalnk/about/'
    },
    {
      icon: <FaWhatsapp />,
      label: 'WhatsApp',
      href: 'https://api.whatsapp.com/send/?phone=212660385276&text&type=phone_number&app_absent=0'
    }
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        
        {/* BRAND */}
        <div className={styles.brand}>
          <div className={styles.logo}>
            <svg width="28" height="28" viewBox="0 0 100 100" fill="none">
              <defs>
                <linearGradient id="flg" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#38d2ff" />
                  <stop offset="50%" stopColor="#7c5cfc" />
                  <stop offset="100%" stopColor="#e040fb" />
                </linearGradient>
              </defs>

              <rect x="8" y="20" width="12" height="60" rx="4" fill="url(#flg)" />
              <path
                d="M20 20 Q80 20 80 50 Q80 80 20 80"
                stroke="url(#flg)"
                strokeWidth="12"
                fill="none"
                strokeLinecap="round"
              />
            </svg>

            <span className={styles.logoText}>Digitalink</span>
          </div>

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
                rel="noreferrer"
                className={styles.social}
                title={s.label}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* LINKS */}
        <div className={styles.linksGrid}>
          {Object.entries(LINKS).map(([cat, items]) => (
            <div key={cat} className={styles.linkCol}>
              <div className={styles.colTitle}>{cat}</div>
              <ul>
                {items.map(item => (
                  <li key={item}>
                    <a href="#contact" className={styles.footLink}>
                      {item}
                    </a>
                  </li>
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

        <span className={styles.location}>
          <FaMapMarkerAlt className={styles.icon} />
            Casablanca, Maroc
        </span>
      </div>
    </footer>
  );
}