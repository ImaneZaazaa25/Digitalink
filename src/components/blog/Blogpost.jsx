import React, { useMemo, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { getPostBySlug } from '../../data/blogPosts';
import styles from './Blogpost.module.css';

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

export default function BlogPost() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);

  useEffect(() => {
    if (!post) return;

    const previousTitle = document.title;
    const title = post.metaTitle || post.title;
    document.title = title;

    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }

    const previousDescription = metaDescription.getAttribute('content') || '';
    metaDescription.setAttribute('content', post.metaDescription || post.excerpt || '');

    return () => {
      document.title = previousTitle;
      metaDescription.setAttribute('content', previousDescription);
    };
  }, [post]);

  const toc = useMemo(() => {
    if (!post) return [];
    return post.sections.map((section) => ({
      id: section.id || slugify(section.heading),
      label: section.heading,
    }));
  }, [post]);

  if (!post) return <Navigate to="/blogs" replace />;

  return (
    <article className={styles.article}>
      <div className={styles.breadcrumb}>
        <Link to="/" className={styles.breadLink}>Accueil</Link>
        <span className={styles.sep}>›</span>
        <Link to="/blogs" className={styles.breadLink}>Blog</Link>
        <span className={styles.sep}>›</span>
        <span className={styles.breadCurrent}>{post.category}</span>
      </div>

      <header className={styles.hero}>
        <img src={post.cover} alt={post.title} className={styles.heroImage} loading="eager" />
        <div className={styles.heroContent}>
          <span className={styles.category}>{post.category}</span>
          <h1 className={styles.title}>{post.title}</h1>
          <p className={styles.description}>{post.metaDescription}</p>
          <div className={styles.meta}>
            <span>{formatDate(post.date)}</span>
            <span>•</span>
            <span>{post.readTime} de lecture</span>
            <span>•</span>
            <span>{toc.length} sections</span>
          </div>
          <div className={styles.tags}>
            {post.tags.map((tag) => (
              <span key={tag} className={styles.tag}>{tag}</span>
            ))}
          </div>
        </div>
      </header>

      <section className={styles.tocSection}>
        <h2 className={styles.tocTitle}>Table des matieres</h2>
        <ul className={styles.tocList}>
          {toc.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} className={styles.tocLink}>{item.label}</a>
            </li>
          ))}
        </ul>
      </section>

      <div className={styles.content}>
        {post.sections.map((section) => {
          const sectionId = section.id || slugify(section.heading);
          return (
            <section id={sectionId} key={sectionId} className={styles.sectionBlock}>
              <h2 className={styles.h2}>{section.heading}</h2>

              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph} className={styles.p}>{paragraph}</p>
              ))}

              {section.image && (
                <figure className={styles.figure}>
                  <img src={section.image} alt={section.heading} className={styles.inlineImage} loading="lazy" />
                </figure>
              )}

              {section.bullets?.length > 0 && (
                <ul className={styles.list}>
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              )}

              {section.table && (
                <div className={styles.tableWrap}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        {section.table.columns.map((column) => (
                          <th key={column}>{column}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {section.table.rows.map((row) => (
                        <tr key={row.join('-')}>
                          {row.map((cell) => (
                            <td key={cell}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          );
        })}
      </div>

      <section className={styles.cta}>
        <h3>Vous voulez lancer une strategie SEA performante ?</h3>
        <p>Notre equipe vous aide a structurer vos campagnes Google Ads, Meta Ads, TikTok Ads et Pinterest Ads.</p>
        <Link to="/contact" className={styles.ctaButton}>Demander un audit SEA</Link>
      </section>

      <section className={styles.related}>
        <h3>Articles similaires</h3>
        <div className={styles.relatedGrid}>
          {post.related.map((item) => (
            <Link key={item.title} to={item.href} className={styles.relatedCard}>
              <span className={styles.relatedLabel}>Ressource</span>
              <span className={styles.relatedTitle}>{item.title}</span>
            </Link>
          ))}
        </div>
      </section>

      <div className={styles.back}>
        <Link to="/blogs" className={styles.backLink}>Retour au blog</Link>
      </div>

      <script type="application/ld+json" suppressHydrationWarning>
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          datePublished: post.date,
          dateModified: post.date,
          description: post.metaDescription,
          mainEntityOfPage: { '@type': 'WebPage', '@id': `/blogs/${post.slug}` },
          image: [post.cover],
          keywords: post.tags.join(', '),
        })}
      </script>
    </article>
  );
}
