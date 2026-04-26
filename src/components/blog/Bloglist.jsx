// src/components/blog/BlogList.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Bloglist.module.css';

// ── Données mock — remplace par un fetch API / CMS ──────────
export const POSTS = [
  {
    slug: 'strategie-seo-2025',
    title: 'Stratégie SEO : les 5 leviers incontournables en 2025',
    excerpt: 'Découvrez comment dominer les SERPs en combinant contenu sémantique, Core Web Vitals et autorité de domaine.',
    category: 'SEO',
    date: '2025-04-10',
    readTime: '6 min',
    cover: null,
  },
  {
    slug: 'ads-google-roas',
    title: 'Google Ads : doubler son ROAS sans augmenter le budget',
    excerpt: 'Les optimisations concrètes pour améliorer votre retour sur investissement publicitaire dès cette semaine.',
    category: 'Publicité',
    date: '2025-03-28',
    readTime: '8 min',
    cover: null,
  },
  {
    slug: 'landing-page-conversion',
    title: 'Landing page : les 7 éléments qui font exploser le taux de conversion',
    excerpt: 'UX, copywriting, preuve sociale… ce qui fait vraiment la différence entre 1 % et 8 % de conversion.',
    category: 'Conversion',
    date: '2025-03-14',
    readTime: '5 min',
    cover: null,
  },
  {
    slug: 'email-marketing-automation',
    title: 'Email marketing : construire une séquence d\'automation qui vend',
    excerpt: 'De la bienvenue à la relance panier, les séquences qui génèrent des revenus en pilote automatique.',
    category: 'Email',
    date: '2025-02-20',
    readTime: '7 min',
    cover: null,
  },
];

const CATEGORIES = ['Tous', ...Array.from(new Set(POSTS.map(p => p.category)))];

const COLORS = {
  SEO:        { bg: 'rgba(124,92,252,0.12)', color: '#a480ff', border: 'rgba(124,92,252,0.3)' },
  Publicité:  { bg: 'rgba(56,210,255,0.1)',  color: '#38d2ff', border: 'rgba(56,210,255,0.3)' },
  Conversion: { bg: 'rgba(224,64,251,0.1)',  color: '#e040fb', border: 'rgba(224,64,251,0.3)' },
  Email:      { bg: 'rgba(255,167,38,0.1)',  color: '#ffa726', border: 'rgba(255,167,38,0.3)' },
};

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function BlogList() {
  const [active, setActive] = useState('Tous');
  const filtered = active === 'Tous' ? POSTS : POSTS.filter(p => p.category === active);

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.eyebrow}>Blog</span>
          <h1 className={styles.title}>Insights & Stratégies</h1>
          <p className={styles.subtitle}>
            Ressources actionnables pour booster votre visibilité, vos conversions et votre croissance.
          </p>
        </div>

        {/* Filtres */}
        <div className={styles.filters}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`${styles.filter} ${active === cat ? styles.filterActive : ''}`}
              onClick={() => setActive(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grille */}
        <div className={styles.grid}>
          {filtered.map((post, i) => {
            const c = COLORS[post.category] || COLORS.SEO;
            return (
              <Link to={`/blog/${post.slug}`} key={post.slug} className={styles.card} style={{ animationDelay: `${i * 0.08}s` }}>
                {/* Cover placeholder */}
                <div className={styles.cover} style={{ background: `linear-gradient(135deg, ${c.bg.replace('0.12', '0.25')}, rgba(7,7,26,0.6))` }}>
                  <span className={styles.coverIcon}>✦</span>
                </div>

                <div className={styles.body}>
                  <div className={styles.meta}>
                    <span className={styles.category} style={{ background: c.bg, color: c.color, borderColor: c.border }}>
                      {post.category}
                    </span>
                    <span className={styles.date}>{formatDate(post.date)}</span>
                    <span className={styles.read}>{post.readTime}</span>
                  </div>
                  <h2 className={styles.cardTitle}>{post.title}</h2>
                  <p className={styles.excerpt}>{post.excerpt}</p>
                  <span className={styles.more}>Lire l'article →</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
