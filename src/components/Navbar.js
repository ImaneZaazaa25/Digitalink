import React, { useState, useEffect, useCallback } from 'react';
import styles from './Navbar.module.css';
import logo from '../assets/logo.png';
const NAV_LINKS = [
  { label: 'Accueil', href: '#hero' },
  { label: 'Services', href: '#services' },
  { label: 'À propos', href: '#about' },
  { label: 'Résultats', href: '#results' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 60);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <a href="#hero" className={styles.logo}>
        <span className={styles.logoIcon}>
          <img src={logo} alt="Digitalink Logo" width="36" height="36" style={{ objectFit: 'contain' }} />
        </span>
        <span className={styles.logoText}>Digitalink</span>
      </a>

      <ul className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
        {NAV_LINKS.map(l => (
          <li key={l.href}>
            <a href={l.href} className={styles.link} onClick={closeMenu}>{l.label}</a>
          </li>
        ))}
        <li>
          <a href="#contact" className={styles.cta} onClick={closeMenu}>Demander un devis</a>
        </li>
      </ul>

      <button className={styles.burger} onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu">
        <span className={menuOpen ? styles.barOpen : ''}/>
        <span className={menuOpen ? styles.barHide : ''}/>
        <span className={menuOpen ? styles.barOpen2 : ''}/>
      </button>
    </nav>
  );
}
