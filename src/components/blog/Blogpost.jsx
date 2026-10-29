import React, { useMemo, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { getPostBySlug } from '../../data/blogPosts';
import styles from './Blogpost.module.css';

const SITE_URL = 'https://digitalink.ma';

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

function setHeadTag(selector, createTag, attr, value) {
  let el = document.querySelector(selector);
  if (!el) {
    el = createTag();
    document.head.appendChild(el);
  }
  const previous = el.getAttribute(attr) || '';
  el.setAttribute(attr, value);
  return () => el.setAttribute(attr, previous);
}

const makeLink = (rel) => () => {
  const el = document.createElement('link');
  el.setAttribute('rel', rel);
  return el;
};

const makeMeta = (key, name) => () => {
  const el = document.createElement('meta');
  el.setAttribute(key, name);
  return el;
};

export default function BlogPost() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);

  useEffect(() => {
    if (!post) return undefined;

    const title = post.metaTitle || post.title;
    const description = post.metaDescription || post.excerpt || '';
    const url = `${SITE_URL}/blogs/${post.slug}`;

    const previousTitle = document.title;
    document.title = title;

    const restores = [
      setHeadTag('meta[name="description"]', makeMeta('name', 'description'), 'content', description),
      setHeadTag('link[rel="canonical"]', makeLink('canonical'), 'href', url),
      setHeadTag('meta[property="og:url"]', makeMeta('property', 'og:url'), 'content', url),
      setHeadTag('meta[property="og:title"]', makeMeta('property', 'og:title'), 'content', title),
      setHeadTag('meta[property="og:description"]', makeMeta('property', 'og:description'), 'content', description),
    ];

    return () => {
      document.title = previousTitle;
      restores.forEach((restore) => restore());
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
        <span className={styles.sep}>•</span>
        <Link to="/blogs" className={styles.breadLink}>Blogs</Link>
        <span className={styles.sep}>•</span>
        <span className={styles.breadCurrent}>{post.category}</span>
      </div>

      <header className={styles.hero}>
        <img src={post.cover} alt={post.coverAlt || post.title} className={styles.heroImage} loading="eager" />
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

      {post.faq?.length > 0 && (
        <section className={styles.sectionBlock} id="faq">
          <h2 className={styles.h2}>Questions frequentes</h2>
          {post.faq.map((item) => (
            <div key={item.question} style={{ marginBottom: '1.25rem' }}>
              <h3 style={{ marginBottom: '0.4rem' }}>{item.question}</h3>
              <p className={styles.p}>{item.answer}</p>
            </div>
          ))}
        </section>
      )}

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
        <Link to="/blogs" className={styles.backLink}>Retour aux blogs</Link>
      </div>

      <script type="application/ld+json" suppressHydrationWarning>
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          datePublished: post.date,
          dateModified: post.date,
          description: post.metaDescription,
          mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/blogs/${post.slug}` },
          ...(post.cover ? { image: [`${SITE_URL}${post.cover}`] } : {}),
          keywords: post.tags.join(', '),
        })}
      </script>

      {post.faq?.length > 0 && (
        <script type="application/ld+json" suppressHydrationWarning>
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: post.faq.map((item) => ({
              '@type': 'Question',
              name: item.question,
              acceptedAnswer: { '@type': 'Answer', text: item.answer },
            })),
          })}
        </script>
      )}
    </article>
  );
}
