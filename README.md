# Structure des fichiers

```
src/
├── App.jsx                        ← mis à jour (routes + pages)
├── components/
│   ├── Navbar.jsx                 ← mis à jour (scroll #contact vs /contact)
│   ├── Navbar.module.css
│   ├── Footer.jsx                 ← mis à jour (/contact pour footer)
│   ├── Footer.module.css
│   ├── Hero.jsx
│   ├── Ticker.jsx
│   ├── Services.jsx
│   ├── Results.jsx
│   ├── About.jsx
│   ├── Contact.jsx                ← inchangé, utilisé dans 2 contextes
│   └── blog/
│       ├── BlogList.jsx           ← liste des articles + filtre catégorie
│       ├── BlogList.module.css
│       ├── BlogPost.jsx           ← page article individuel + prev/next
│       └── BlogPost.module.css
```

## Logique de navigation Contact

| Lien cliqué              | Comportement                                      |
|--------------------------|---------------------------------------------------|
| "Contact" dans la Navbar | Scroll vers `#contact` sur la homepage (`/`)      |
| "Nous écrire" dans Footer | Navigue vers `/contact` (page standalone)         |
| Bouton CTA "Démarrer →"  | Scroll vers `#contact` sur la homepage            |

## Routes disponibles

| URL              | Page                        |
|------------------|-----------------------------|
| `/`              | Homepage (Hero + Services + Results + Contact) |
| `/about-us`         | Page À propos               |
| `/contact`       | Page Contact standalone     |
| `/blogs`          | Liste des articles          |
| `/blogs/:slug`    | Article individuel          |

## Ajouter un article de blog

Dans `BlogList.jsx`, ajoutez un objet dans le tableau `POSTS` :

```js
{
  slug: 'mon-article',          // URL : /blog/mon-article
  title: 'Titre de l\'article',
  excerpt: 'Résumé court...',
  category: 'SEO',              // SEO | Publicité | Conversion | Email
  date: '2025-05-01',
  readTime: '5 min',
  cover: null,                  // ou URL d'une image
}
```

Ajoutez le contenu dans `CONTENT` dans `BlogPost.jsx` (markdown simplifié : `##`, `###`, paragraphes).