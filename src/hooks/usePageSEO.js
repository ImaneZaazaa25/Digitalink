import { useEffect } from 'react';

const SITE_URL = 'https://digitalink.ma';

// Met à jour le title, la meta description, la balise canonical
// et les balises Open Graph selon la page (SPA React : un seul
// jeu de balises statique sinon, identique sur toutes les routes).
export default function usePageSEO(title, description, path = '/') {
  useEffect(() => {
    const canonicalUrl = `${SITE_URL}${path === '/' ? '' : path}`;

    if (title) {
      document.title = title;
    }

    const setMeta = (attr, key, content) => {
      let tag = document.querySelector(`meta[${attr}="${key}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attr, key);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    if (description) {
      setMeta('name', 'description', description);
      setMeta('property', 'og:description', description);
    }

    if (title) {
      setMeta('property', 'og:title', title);
    }

    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:url', canonicalUrl);

    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute('href', canonicalUrl);
  }, [title, description, path]);
}
