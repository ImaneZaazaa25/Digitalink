import React, { Suspense, lazy, useCallback, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Ticker from './components/Ticker';
import { trackEvent } from './utils/gtm';
import usePageSEO from './hooks/usePageSEO';

const Services  = lazy(() => import('./components/Services'));
const About     = lazy(() => import('./components/About'));
const Results   = lazy(() => import('./components/Results'));
const Contact   = lazy(() => import('./components/Contact'));
const Footer    = lazy(() => import('./components/Footer'));
const BlogList  = lazy(() => import('./components/blog/Bloglist'));
const BlogPost  = lazy(() => import('./components/blog/Blogpost'));

// ── Scroll to top on route change ────────────────────────────
function ScrollToTopOnNav() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

// ── Scroll-to-top FAB ──────────────────────────────────────
function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const scrollUp = useCallback(() => window.scrollTo({ top: 0, behavior: 'smooth' }), []);
  if (!visible) return null;
  return (
    <button
      onClick={scrollUp}
      style={{
        position: 'fixed', bottom: 32, right: 32, zIndex: 50,
        width: 46, height: 46, borderRadius: '50%',
        background: 'var(--grad)', color: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1.1rem', boxShadow: '0 8px 30px rgba(124,92,252,0.4)',
        border: 'none', cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
        fontFamily: 'inherit',
      }}
      onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
      aria-label="Retour en haut"
    >↑</button>
  );
}

// ── Page principale ───────────────────────────────────────────
// Le lien "Contact" du Navbar scrolle vers #contact sur cette page
function HomePage() {
  usePageSEO(
    'Agence de Communication Digitale à Casablanca | Digitalink',
    "Digitalink accompagne les entreprises marocaines en stratégie digitale, branding et communication. Devis gratuit.",
    '/'
  );
  return (
    <main>
      <Hero />
      <Ticker />
      <Suspense fallback={<div style={{ height: 200 }} />}>
        <Services />
        <Results />
        {/* id anchor : le Navbar scroll ici depuis "/" */}
        <section id="contact">
          <Contact />
        </section>
        <Footer />
      </Suspense>
    </main>
  );
}

// ── Page À propos ──────────────────────────────────────────
function AboutPage() {
  usePageSEO(
    'Qui sommes-nous ? Agence Digitalink Maroc',
    "Découvrez l'équipe et l'expertise de Digitalink, agence de conseil en stratégie digitale et communication basée à Casablanca.",
    '/about-us'
  );
  return (
    <main>
      <Suspense fallback={<div style={{ height: 200 }} />}>
        <About />
        <Footer />
      </Suspense>
    </main>
  );
}

// ── Page Contact (standalone, lien footer) ───────────────────
function ContactPage() {
  usePageSEO(
    'Contactez Digitalink | Agence Communication Digitale Casablanca',
    'Un projet de communication digitale ou de branding ? Contactez notre agence à Casablanca, réponse sous 24h.',
    '/contact'
  );
  return (
    <main>
      <Suspense fallback={<div style={{ height: 200 }} />}>
        <h1 style={{ textAlign: 'center', maxWidth: 800, margin: '2.5rem auto 0', fontSize: '2rem', fontWeight: 700 }}>
          Contactez Notre Agence de Communication Digitale à Casablanca
        </h1>
        <Contact />
        <Footer />
      </Suspense>
    </main>
  );
}

// ── Page Blog (liste des articles) ────────────────────────────
function BlogPage() {
  return (
    <main>
      <Suspense fallback={<div style={{ height: 200 }} />}>
        <BlogList />
        <Footer />
      </Suspense>
    </main>
  );
}

// ── Page article de blog ────────────────────────────────────────
function BlogPostPage() {
  return (
    <main>
      <Suspense fallback={<div style={{ height: 200 }} />}>
        <BlogPost />
        <Footer />
      </Suspense>
    </main>
  );
}

// ── Root ───────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    trackEvent('pageview', {
      page: pathname,
    });
  }, [pathname]);

  return (
    <>
      <ScrollToTopOnNav />
      <Navbar />
      <Routes>
        <Route path="/"              element={<HomePage />} />
        <Route path="/about-us"         element={<AboutPage />} />
        <Route path="/contact"       element={<ContactPage />} />
        <Route path="/blogs"          element={<BlogPage />} />
        <Route path="/blogs/:slug"    element={<BlogPostPage />} />
      </Routes>
      <ScrollToTop />
    </>
  );
}
