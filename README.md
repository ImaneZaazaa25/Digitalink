# Digitalink – Site Web Officiel

Site React moderne pour l'agence **Digitalink** — Digital Marketing Agency, Casablanca.

## 🚀 Installation & Démarrage

```bash
# Installer les dépendances
npm install

# Lancer en développement
npm start

# Build de production
npm run build
```

## 📁 Structure du projet

```
src/
├── components/
│   ├── Navbar.js / .module.css      # Navigation fixe avec scroll effect
│   ├── Hero.js / .module.css        # Section principale avec canvas animé
│   ├── Ticker.js / .module.css      # Bandeau défilant services
│   ├── Services.js / .module.css    # Grille des 8 services
│   ├── About.js / .module.css       # Présentation de l'agence
│   ├── Results.js / .module.css     # Métriques + processus
│   ├── Contact.js / .module.css     # Formulaire de contact
│   └── Footer.js / .module.css      # Pied de page
├── hooks/
│   └── useInView.js                 # Hook IntersectionObserver
├── App.js                           # Root avec lazy loading
├── index.js
└── index.css                        # Variables CSS globales
```

## 🎨 Design System

- **Couleurs** : Violet (#7c5cfc), Cyan (#38d2ff), Magenta (#e040fb) sur fond sombre (#07071a)
- **Typographie** : Syne (display) + DM Sans (corps)
- **Animations** : Canvas WebGL orbes, particules flottantes, scroll-triggered reveals

## ⚡ Optimisations React

- `useMemo` — données statiques mémoïsées
- `useCallback` — handlers stables
- `React.lazy` + `Suspense` — lazy loading des sections
- `IntersectionObserver` — animations au scroll sans scroll listener global
- Passive event listeners pour scroll/resize

## 📞 Infos Digitalink

- **Téléphone** : +212 660 385 276
- **Site** : [linktr.ee/digitalink.ma](https://linktr.ee/digitalink.ma)
- **Instagram** : [@digitalink.ma](https://www.instagram.com/digitalink.ma)
- **Siège** : Casablanca, Maroc
