// src/components/blog/BlogPost.jsx
import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { POSTS } from './Bloglist';
import styles from './Blogpost.module.css';

const CONTENT = {
  'strategie-seo-2025': `
## Pourquoi 2025 change tout

Le SEO évolue à une vitesse sans précédent. Les mises à jour d'algorithmes, l'IA générative et les nouvelles intentions de recherche redessinent les règles du jeu.

## Les 5 leviers incontournables

### 1. Le contenu sémantique en profondeur
Google récompense les pages qui traitent un sujet en profondeur. Oubliez les articles superficiels — misez sur des clusters thématiques et des pages piliers exhaustives.

### 2. Les Core Web Vitals
LCP, INP, CLS : ces métriques influencent directement votre positionnement. Un site lent perd des positions, quel que soit la qualité de son contenu.

### 3. L'autorité de domaine
Construire des backlinks de qualité reste un pilier du SEO. Privilégiez les partenariats éditoriaux et les citations dans des médias spécialisés.

### 4. L'optimisation mobile-first
Plus de 60 % des recherches se font sur mobile. Un site non optimisé pour le mobile est pénalisé dans les résultats.

### 5. L'IA comme outil, pas comme raccourci
L'IA peut accélérer la production de contenu, mais Google détecte et pénalise le contenu généré sans valeur ajoutée réelle.

## Conclusion

Le SEO en 2025 récompense la qualité, la profondeur et la technique. Combinez ces 5 leviers pour construire une visibilité organique durable.
  `,
};

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}

function renderMarkdown(text) {
  const lines = text.trim().split('\n');
  const elements = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i].trim();
    if (!line) { i++; continue; }
    if (line.startsWith('### ')) {
      elements.push(<h3 key={i} className={styles.h3}>{line.slice(4)}</h3>);
    } else if (line.startsWith('## ')) {
      elements.push(<h2 key={i} className={styles.h2}>{line.slice(3)}</h2>);
    } else {
      elements.push(<p key={i} className={styles.p}>{line}</p>);
    }
    i++;
  }
  return elements;
}

export default function BlogPost() {
  const { slug } = useParams();
  const post = POSTS.find(p => p.slug === slug);
  if (!post) return <Navigate to="/blog" replace />;

  const content = CONTENT[slug] || post.excerpt;
  const idx = POSTS.findIndex(p => p.slug === slug);
  const prev = POSTS[idx - 1] || null;
  const next = POSTS[idx + 1] || null;

  return (
    <article className={styles.article}>
      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <Link to="/" className={styles.breadLink}>Accueil</Link>
        <span className={styles.sep}>›</span>
        <Link to="/blog" className={styles.breadLink}>Blog</Link>
        <span className={styles.sep}>›</span>
        <span className={styles.breadCurrent}>{post.category}</span>
      </div>

      {/* Hero article */}
      <header className={styles.header}>
        <span className={styles.category}>{post.category}</span>
        <h1 className={styles.title}>{post.title}</h1>
        <div className={styles.meta}>
          <span>{formatDate(post.date)}</span>
          <span className={styles.dot}>·</span>
          <span>{post.readTime} de lecture</span>
        </div>
      </header>

      {/* Contenu */}
      <div className={styles.content}>
        {renderMarkdown(content)}
      </div>

      {/* Navigation prev / next */}
      <nav className={styles.nav}>
        {prev ? (
          <Link to={`/blog/${prev.slug}`} className={styles.navCard}>
            <span className={styles.navDir}>← Précédent</span>
            <span className={styles.navTitle}>{prev.title}</span>
          </Link>
        ) : <div />}
        {next ? (
          <Link to={`/blog/${next.slug}`} className={`${styles.navCard} ${styles.navRight}`}>
            <span className={styles.navDir}>Suivant →</span>
            <span className={styles.navTitle}>{next.title}</span>
          </Link>
        ) : <div />}
      </nav>

      {/* Retour liste */}
      <div className={styles.back}>
        <Link to="/blog" className={styles.backLink}>← Retour au blog</Link>
      </div>
    </article>
  );
}
