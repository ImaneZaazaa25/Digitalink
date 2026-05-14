export const BLOG_POSTS = [
  {
    slug: 'sea-guide-publicite-digitale-2026',
    title: 'SEA : Tout guide de la publicite digitale a connaitre en 2026',
    metaTitle: 'SEA 2026 : Guide complet Google Ads, Meta Ads, TikTok & Pinterest',
    metaDescription:
      'Guide complet du SEA en 2026 : decouvrez Google Ads, Meta Ads, TikTok Ads et Pinterest Ads pour booster vos campagnes publicitaires et conversions.',
    excerpt:
      'Le guide SEA 2026 pour structurer une strategie performante sur Google Ads, Meta Ads, TikTok Ads et Pinterest Ads.',
    category: 'Publicite',
    date: '2026-05-12',
    readTime: '9 min',
    tags: ['SEA', 'Google Ads', 'Meta Ads', 'TikTok Ads', 'Pinterest Ads', 'Marketing Digital', 'Publicite Digitale'],
    cover: '/images/blog/sea-guide-hero.jpeg',
    related: [
      { title: 'Check-list SEA : lancer une campagne rentable en 7 jours', href: '/contact' },
      { title: 'Demander un audit Google Ads et Meta Ads', href: '/contact' },
    ],
    sections: [
      {
        id: 'introduction',
        heading: 'SEA : Tout guide de la publicite digitale a connaitre en 2026',
        paragraphs: [
          "La publicite digitale est devenue un levier central pour accelerer l'acquisition, les ventes et la visibilite des entreprises.",
          "Le SEA permet aux marques d'apparaitre au bon moment devant la bonne audience, avec un message pertinent et mesurable.",
        ],
      },
      {
        id: 'plateformes',
        heading: 'Google Ads, Meta Ads, TikTok Ads et Pinterest Ads',
        paragraphs: [
          'En 2026, ces plateformes offrent des leviers complementaires pour la croissance des marques.',
        ],
        bullets: [
          'Google Ads pour la demande existante',
          'Meta Ads pour le ciblage social et le remarketing',
          'TikTok Ads pour les videos courtes performantes',
          'Pinterest Ads pour la phase de decouverte et inspiration',
        ],
        image: '/images/blog/sea-guide-section1.jpg',
      },
      {
        id: 'conclusion',
        heading: 'Conclusion',
        paragraphs: [
          'Une strategie SEA performante combine creativite, data, IA et optimisation continue.',
        ],
        image: '/images/blog/sea-guide-section2.jpg',
      },
    ],
  },
  {
    slug: 'strategie-seo-2025',
    title: 'Strategie SEO : les 5 leviers incontournables en 2025',
    metaTitle: 'Strategie SEO 2025 : 5 leviers incontournables',
    metaDescription: 'Les piliers SEO a activer pour gagner en visibilite organique et en trafic qualifie.',
    excerpt: 'Comment dominer les SERPs en combinant contenu semantique, technique et autorite.',
    category: 'SEO',
    date: '2025-04-10',
    readTime: '6 min',
    tags: ['SEO', 'Referencement naturel', 'Content marketing'],
    cover: null,
    related: [],
    sections: [
      {
        id: 'seo-leviers',
        heading: 'Les 5 leviers SEO prioritaires',
        paragraphs: ['Contenu semantique, Core Web Vitals, autorite, mobile-first et pilotage data.'],
      },
    ],
  },
  {
    slug: 'ads-google-roas',
    title: 'Google Ads : doubler son ROAS sans augmenter le budget',
    metaTitle: 'Google Ads : doubler le ROAS sans depenser plus',
    metaDescription: 'Optimisations Google Ads concretes pour augmenter la rentabilite publicitaire.',
    excerpt: 'Les optimisations concretes pour ameliorer votre retour sur investissement publicitaire.',
    category: 'Publicite',
    date: '2025-03-28',
    readTime: '8 min',
    tags: ['Google Ads', 'ROAS', 'SEA'],
    cover: null,
    related: [],
    sections: [
      {
        id: 'optimisations-roas',
        heading: 'Optimisations ROAS prioritaires',
        paragraphs: ['Structure de compte, requetes, creatives et enchere basee conversion.'],
      },
    ],
  },
  {
    slug: 'landing-page-conversion',
    title: 'Landing page : les 7 elements qui font exploser le taux de conversion',
    metaTitle: 'Landing page : 7 elements pour mieux convertir',
    metaDescription: 'UX, copywriting et preuve sociale pour des landing pages qui convertissent.',
    excerpt: 'UX, copywriting et preuve sociale : ce qui fait vraiment la difference sur une landing page.',
    category: 'Conversion',
    date: '2025-03-14',
    readTime: '5 min',
    tags: ['CRO', 'Landing page', 'Conversion'],
    cover: null,
    related: [],
    sections: [
      {
        id: 'conversion-elements',
        heading: 'Les 7 elements a prioriser',
        paragraphs: ['Promesse claire, structure visuelle, CTA fort, preuves et reduction des frictions.'],
      },
    ],
  },
  {
    slug: 'email-marketing-automation',
    title: 'Email marketing : construire une sequence automation qui vend',
    metaTitle: 'Email marketing automation : sequence qui vend',
    metaDescription: 'Guide pratique pour structurer une sequence email performante.',
    excerpt: 'De la bienvenue a la relance panier : les sequences qui generent du revenu.',
    category: 'Email',
    date: '2025-02-20',
    readTime: '7 min',
    tags: ['Email', 'Automation', 'CRM'],
    cover: null,
    related: [],
    sections: [
      {
        id: 'sequence-email',
        heading: 'Sequence automation efficace',
        paragraphs: ['Bienvenue, education, offre, relance et reactivation avec segmentation continue.'],
      },
    ],
  },
];

export const getPostBySlug = (slug) => BLOG_POSTS.find((post) => post.slug === slug);
