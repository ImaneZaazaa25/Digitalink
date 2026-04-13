import React, { Suspense, lazy, useCallback, useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Ticker from './components/Ticker';

const Services = lazy(() => import('./components/Services'));
const About = lazy(() => import('./components/About'));
const Results = lazy(() => import('./components/Results'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

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
    <button onClick={scrollUp} style={{
      position: 'fixed', bottom: 32, right: 32, zIndex: 50,
      width: 46, height: 46, borderRadius: '50%',
      background: 'var(--grad)', color: '#fff',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: '1.1rem', boxShadow: '0 8px 30px rgba(124,92,252,0.4)',
      border: 'none', cursor: 'pointer',
      transition: 'transform 0.2s, box-shadow 0.2s',
      fontFamily: 'inherit',
    }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
       onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
       aria-label="Retour en haut"
    >↑</button>
  );
}

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Ticker />
        <Suspense fallback={<div style={{ height: 200 }} />}>
          <Services />
          <About />
          <Results />
          <Contact />
          <Footer />
        </Suspense>
      </main>
      <ScrollToTop />
    </>
  );
}
