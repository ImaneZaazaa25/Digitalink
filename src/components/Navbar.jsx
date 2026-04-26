// src/components/Navbar.jsx
// "Contact" dans la nav = scroll vers #contact sur la homepage
// Le lien /contact (pleine page) est réservé au footer

import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { label: 'Accueil',   href: '/',          type: 'route' },  // ← Ajout de l'accueil
  { label: 'Services',  href: '/#services', type: 'hash' },
  { label: 'Résultats', href: '/#results',  type: 'hash' },
  { label: 'À propos',  href: '/about',     type: 'route' },
  { label: 'Blog',      href: '/blog',      type: 'route' },
  { label: 'Contact',   href: '/#contact',  type: 'hash' },  // scroll sur homepage
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const location  = useLocation();
  const navigate  = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Fermer le menu au changement de route
  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  // Empêche le scroll body quand menu ouvert
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleNavClick = useCallback((e, link) => {
    if (link.type !== 'hash') return; // laisser <Link> gérer les routes normales

    e.preventDefault();
    setMenuOpen(false);

    const anchor = link.href.split('#')[1];

    if (location.pathname === '/') {
      // déjà sur la homepage — scroll direct
      const el = document.getElementById(anchor);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      // navigue vers / puis scroll après montage
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(anchor);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 400);
    }
  }, [location.pathname, navigate]);

  // Fonction pour vérifier si un lien est actif
  const isLinkActive = (link) => {
    if (link.type === 'hash') {
      // Pour les hash links, on vérifie seulement le pathname
      const path = link.href.split('#')[0];
      return location.pathname === path;
    }
    return location.pathname === link.href;
  };

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
        {/* Logo */}
        <Link to="/" className={styles.logo}>
          <span className={styles.logoText}>Digitalink</span>
        </Link>

        {/* Liens desktop */}
        <ul className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
          {NAV_LINKS.map(link => (
            <li key={link.label}>
              {link.type === 'hash' ? (
                <a
                  href={link.href}
                  className={`${styles.link} ${isLinkActive(link) ? styles.linkActive : ''}`}
                  onClick={(e) => handleNavClick(e, link)}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  to={link.href}
                  className={`${styles.link} ${location.pathname === link.href ? styles.linkActive : ''}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              )}
            </li>
          ))}
          <li>
            <a
              href="/#contact"
              className={styles.cta}
              onClick={(e) => handleNavClick(e, { href: '/#contact', type: 'hash' })}
            >
              Démarrer →
            </a>
          </li>
        </ul>

        {/* Burger */}
        <button
          className={styles.burger}
          onClick={() => setMenuOpen(o => !o)}
          aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={menuOpen}
        >
          <span className={menuOpen ? styles.barOpen : ''} />
          <span className={menuOpen ? styles.barHide : ''} />
          <span className={menuOpen ? styles.barOpen2 : ''} />
        </button>
      </nav>

      {/* Overlay mobile */}
      <div
        className={`${styles.overlay} ${menuOpen ? styles.overlayVisible : ''}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />
    </>
  );
}