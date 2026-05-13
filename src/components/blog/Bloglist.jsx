import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Bloglist.module.css';
import { BLOG_POSTS } from '../../data/blogPosts';

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function BlogList() {
  const [mainPost, ...recentPosts] = BLOG_POSTS;

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>Blog</span>
          <h1 className={styles.title}>SEA 2026 et Publicite Digitale</h1>
          <p className={styles.subtitle}>
            Article principal pour structurer une strategie publicitaire performante sur Google Ads,
            Meta Ads, TikTok Ads et Pinterest Ads.
          </p>
        </div>

        {mainPost && (
          <Link to={`/blogs/${mainPost.slug}`} className={styles.featuredCard}>
            <img src={mainPost.cover} alt={mainPost.title} className={styles.featuredImage} loading="eager" />
            <div className={styles.featuredBody}>
              <span className={styles.featuredBadge}>Article principal</span>
              <h2 className={styles.featuredTitle}>{mainPost.title}</h2>
              <p className={styles.featuredExcerpt}>{mainPost.excerpt}</p>
              <div className={styles.featuredMeta}>
                <span>{formatDate(mainPost.date)}</span>
                <span>•</span>
                <span>{mainPost.readTime} de lecture</span>
              </div>
            </div>
          </Link>
        )}

        <div className={styles.recentHeader}>
          <h3>Articles recents</h3>
        </div>

        <div className={styles.grid}>
          {[mainPost, ...recentPosts].filter(Boolean).map((post) => (
            <Link to={`/blogs/${post.slug}`} key={post.slug} className={styles.card}>
              <img src={post.cover} alt={post.title} className={styles.coverImage} loading="lazy" />
              <div className={styles.body}>
                <div className={styles.meta}>
                  <span className={styles.category}>{post.category}</span>
                  <span className={styles.read}>{post.readTime}</span>
                </div>
                <h4 className={styles.cardTitle}>{post.title}</h4>
                <p className={styles.excerpt}>{post.excerpt}</p>
                <span className={styles.more}>Lire l'article -&gt;</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
