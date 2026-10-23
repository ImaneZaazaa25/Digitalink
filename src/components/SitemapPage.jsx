import React from 'react';
import { Link } from 'react-router-dom';
import { BLOG_POSTS } from '../data/blogPosts';

const MAIN_PAGES = [
  { label: 'Accueil', to: '/' },
  { label: 'À propos', to: '/about-us' },
  { label: 'Contact', to: '/contact' },
  { label: 'Blog', to: '/blogs' },
];

const normalizeCategory = (category) => (category === 'Publicite' ? 'Publicité' : category);

export default function SitemapPage() {
  const byCategory = BLOG_POSTS.reduce((acc, post) => {
    const key = normalizeCategory(post.category);
    if (!acc[key]) acc[key] = [];
    acc[key].push(post);
    return acc;
  }, {});

  const linkStyle = { color: 'inherit', textDecoration: 'underline' };

  return (
    <section style={{ padding: '8rem 1.5rem 4rem', maxWidth: 900, margin: '0 auto' }}>
      <h1 style={{ marginBottom: '0.75rem' }}>Plan du site</h1>
      <p style={{ opacity: 0.8, marginBottom: '2rem' }}>
        Retrouvez toutes les pages et tous les articles de Digitalink, agence de communication digitale à Casablanca.
      </p>

      <h2 style={{ margin: '2rem 0 0.75rem' }}>Pages principales</h2>
      <ul style={{ lineHeight: 1.9, paddingLeft: '1.25rem' }}>
        {MAIN_PAGES.map((page) => (
          <li key={page.to}>
            <Link to={page.to} style={linkStyle}>{page.label}</Link>
          </li>
        ))}
      </ul>

      <h2 style={{ margin: '2rem 0 0.75rem' }}>Articles du blog</h2>
      {Object.entries(byCategory).map(([category, posts]) => (
        <div key={category} style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ marginBottom: '0.5rem' }}>{category}</h3>
          <ul style={{ lineHeight: 1.9, paddingLeft: '1.25rem' }}>
            {posts.map((post) => (
              <li key={post.slug}>
                <Link to={`/blogs/${post.slug}`} style={linkStyle}>{post.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
