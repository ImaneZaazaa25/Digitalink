import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Bloglist.module.css';
import { BLOG_POSTS } from '../../data/blogPosts';

const COLORS = {
  SEO: { bg: 'rgba(124,92,252,0.12)', color: '#a480ff', border: 'rgba(124,92,252,0.3)' },
  Publicite: { bg: 'rgba(56,210,255,0.1)', color: '#38d2ff', border: 'rgba(56,210,255,0.3)' },
  Conversion: { bg: 'rgba(224,64,251,0.1)', color: '#e040fb', border: 'rgba(224,64,251,0.3)' },
  Email: { bg: 'rgba(255,167,38,0.1)', color: '#ffa726', border: 'rgba(255,167,38,0.3)' },
};

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function BlogList() {
  const categories = useMemo(
    () => ['Tous', ...Array.from(new Set(BLOG_POSTS.map((post) => post.category)))],
    []
  );
  const [active, setActive] = useState('Tous');
  const filtered = active === 'Tous' ? BLOG_POSTS : BLOG_POSTS.filter((post) => post.category === active);

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>Blogs</span>
          <h1 className={styles.title}>Insights & Strategies</h1>
          <p className={styles.subtitle}>
            Ressources actionnables pour booster votre visibilite, vos conversions et votre croissance.
          </p>
        </div>

        <div className={styles.filters}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`${styles.filter} ${active === cat ? styles.filterActive : ''}`}
              onClick={() => setActive(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className={styles.grid}>
          {filtered.map((post, i) => {
            const c = COLORS[post.category] || COLORS.SEO;
            return (
              <Link to={`/blogs/${post.slug}`} key={post.slug} className={styles.card} style={{ animationDelay: `${i * 0.08}s` }}>
                {post.cover ? (
                  <img src={post.cover} alt={post.title} className={styles.coverImage} loading="lazy" />
                ) : (
                  <div className={styles.cover} style={{ background: `linear-gradient(135deg, ${c.bg.replace('0.12', '0.25')}, rgba(7,7,26,0.6))` }}>
                    <span className={styles.coverIcon}>✦</span>
                  </div>
                )}

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
