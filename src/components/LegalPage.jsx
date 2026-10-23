import React from 'react';
import { Link } from 'react-router-dom';

const TO_FILL = '[À compléter]';
const UPDATED = 'Dernière mise à jour : octobre 2026';

const PAGES = {
  mentions: {
    title: 'Mentions légales',
    sections: [
      {
        heading: 'Éditeur du site',
        paragraphs: [
          'Le site digitalink.ma est édité par Digitalink.',
          `Forme juridique : ${TO_FILL}`,
          `ICE / RC : ${TO_FILL}`,
          `Adresse du siège : ${TO_FILL}`,
          'Téléphone : +212 660 385 276',
          `E-mail : ${TO_FILL}`,
          `Directeur de la publication : ${TO_FILL}`,
        ],
      },
      {
        heading: 'Hébergement',
        paragraphs: [
          'Le site est hébergé par Netlify, Inc. (États-Unis) – www.netlify.com.',
        ],
      },
      {
        heading: 'Propriété intellectuelle',
        paragraphs: [
          "L'ensemble des contenus présents sur ce site (textes, images, logos, graphismes, vidéos) est protégé par le droit de la propriété intellectuelle. Toute reproduction, représentation ou diffusion, totale ou partielle, sans autorisation écrite préalable de l'éditeur est interdite.",
        ],
      },
      {
        heading: 'Responsabilité',
        paragraphs: [
          "L'éditeur s'efforce de fournir des informations exactes et à jour, mais ne peut garantir l'absence d'erreurs ou d'omissions. L'utilisation des informations du site se fait sous la seule responsabilité de l'utilisateur.",
          "Le site peut contenir des liens vers des sites tiers. L'éditeur n'exerce aucun contrôle sur leur contenu et décline toute responsabilité à leur égard.",
        ],
      },
      {
        heading: 'Données personnelles',
        paragraphs: [
          "Le traitement des données personnelles est décrit dans notre politique de confidentialité.",
        ],
      },
      {
        heading: 'Droit applicable',
        paragraphs: [
          "Les présentes mentions légales sont soumises au droit marocain. En cas de litige, les tribunaux marocains compétents seront seuls compétents.",
        ],
      },
    ],
  },
  confidentialite: {
    title: 'Politique de confidentialité',
    sections: [
      {
        heading: 'Responsable du traitement',
        paragraphs: [
          `Le responsable du traitement des données collectées sur digitalink.ma est Digitalink. Contact : +212 660 385 276 – ${TO_FILL}`,
        ],
      },
      {
        heading: 'Données collectées',
        paragraphs: [
          "Nous collectons les informations que vous nous transmettez volontairement, par exemple via le formulaire de contact (nom, adresse e-mail, numéro de téléphone, message).",
          "Des données de navigation (pages visitées, durée de visite, type d'appareil) sont également collectées de manière statistique à l'aide d'outils de mesure d'audience.",
        ],
      },
      {
        heading: 'Finalités',
        paragraphs: [
          "Vos données sont utilisées pour répondre à vos demandes, assurer le suivi de la relation commerciale, améliorer le site et mesurer son audience.",
        ],
      },
      {
        heading: 'Base légale',
        paragraphs: [
          "Le traitement de vos données repose sur votre consentement et, le cas échéant, sur notre intérêt légitime à gérer notre relation avec vous, conformément à la loi n° 09-08 relative à la protection des personnes physiques à l'égard du traitement des données à caractère personnel.",
        ],
      },
      {
        heading: 'Durée de conservation',
        paragraphs: [
          "Vos données sont conservées pendant la durée nécessaire aux finalités pour lesquelles elles ont été collectées, puis supprimées ou anonymisées.",
        ],
      },
      {
        heading: 'Destinataires et transferts',
        paragraphs: [
          "Vos données ne sont pas vendues. Elles peuvent être traitées par des prestataires techniques (hébergement, outils de mesure d'audience), éventuellement situés en dehors du Maroc.",
        ],
      },
      {
        heading: 'Cookies et mesure d’audience',
        paragraphs: [
          "Ce site utilise des cookies et traceurs de mesure d'audience (par exemple Google Analytics via Google Tag Manager) afin de comprendre comment le site est utilisé. Vous pouvez configurer votre navigateur pour refuser ou supprimer les cookies.",
        ],
      },
      {
        heading: 'Vos droits',
        paragraphs: [
          "Conformément à la loi n° 09-08, vous disposez d'un droit d'accès, de rectification et d'opposition concernant vos données personnelles. Pour exercer ces droits, contactez-nous aux coordonnées indiquées ci-dessus.",
        ],
      },
      {
        heading: 'Modification de la politique',
        paragraphs: [
          "Cette politique peut être mise à jour à tout moment. La date de dernière mise à jour figure en bas de page.",
        ],
      },
    ],
  },
  cgu: {
    title: "Conditions générales d'utilisation",
    sections: [
      {
        heading: 'Objet',
        paragraphs: [
          "Les présentes conditions générales d'utilisation (CGU) encadrent l'accès et l'utilisation du site digitalink.ma. En naviguant sur le site, vous acceptez ces conditions.",
        ],
      },
      {
        heading: 'Accès au site',
        paragraphs: [
          "Le site est accessible gratuitement à tout utilisateur disposant d'un accès à Internet. L'éditeur peut interrompre ou modifier le site à tout moment, notamment pour des raisons de maintenance, sans préavis.",
        ],
      },
      {
        heading: 'Utilisation du site',
        paragraphs: [
          "L'utilisateur s'engage à utiliser le site de manière conforme à la loi et aux présentes CGU, et à ne pas porter atteinte à son fonctionnement ou à sa sécurité.",
        ],
      },
      {
        heading: 'Propriété intellectuelle',
        paragraphs: [
          "Les contenus du site sont protégés. Toute reproduction ou réutilisation sans autorisation écrite préalable est interdite.",
        ],
      },
      {
        heading: 'Responsabilité',
        paragraphs: [
          "Les informations publiées sont fournies à titre indicatif. L'éditeur ne saurait être tenu responsable des dommages résultant de l'utilisation du site ou de l'impossibilité d'y accéder.",
        ],
      },
      {
        heading: 'Données personnelles',
        paragraphs: [
          "Les conditions de traitement de vos données sont décrites dans la politique de confidentialité.",
        ],
      },
      {
        heading: 'Modification des CGU',
        paragraphs: [
          "L'éditeur peut modifier les présentes CGU à tout moment. Les utilisateurs sont invités à les consulter régulièrement.",
        ],
      },
      {
        heading: 'Droit applicable',
        paragraphs: [
          "Les présentes CGU sont soumises au droit marocain. Tout litige relève de la compétence des tribunaux marocains compétents.",
        ],
      },
    ],
  },
};

export default function LegalPage({ pageKey }) {
  const page = PAGES[pageKey];
  if (!page) return null;

  return (
    <section style={{ padding: '8rem 1.5rem 4rem', maxWidth: 860, margin: '0 auto' }}>
      <h1 style={{ marginBottom: '1.5rem' }}>{page.title}</h1>
      {page.sections.map((section) => (
        <div key={section.heading} style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{section.heading}</h2>
          {section.paragraphs.map((text) => (
            <p key={text} style={{ opacity: 0.85, lineHeight: 1.7, marginBottom: '0.5rem' }}>{text}</p>
          ))}
        </div>
      ))}
      <p style={{ opacity: 0.6, marginTop: '2rem', fontSize: '0.9rem' }}>{UPDATED}</p>
      <p style={{ marginTop: '1rem' }}>
        <Link to="/" style={{ color: 'inherit', textDecoration: 'underline' }}>Retour à l'accueil</Link>
      </p>
    </section>
  );
}
