import { useEffect } from 'react';

// Met à jour le <title> et la meta description de la page,
// nécessaire car ce site est une SPA React (un seul title/meta
// statique dans public/index.html sinon, identique sur toutes les routes).
export default function usePageSEO(title, description) {
  useEffect(() => {
    if (title) {
      document.title = title;
    }

    if (description) {
      let tag = document.querySelector('meta[name="description"]');
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', 'description');
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', description);
    }
  }, [title, description]);
}
