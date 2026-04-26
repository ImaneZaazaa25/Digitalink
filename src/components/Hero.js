import React, { useEffect, useRef, useMemo } from 'react';
import styles from './Hero.module.css';

function Particle({ x, y, size, delay, duration }) {
  return (
    <div
      className={styles.particle}
      style={{
        left: `${x}%`, top: `${y}%`,
        width: size, height: size,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
      }}
    />
  );
}

export default function Hero() {
  const canvasRef = useRef(null);

  const particles = useMemo(() =>
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1 + 'px',
      delay: Math.random() * 6,
      duration: Math.random() * 6 + 6,
    })), []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width, h = canvas.height;

      // Orb 1
      const grd1 = ctx.createRadialGradient(
        w * 0.2 + Math.sin(time * 0.5) * 50, h * 0.3 + Math.cos(time * 0.4) * 30, 0,
        w * 0.2 + Math.sin(time * 0.5) * 50, h * 0.3 + Math.cos(time * 0.4) * 30, 350
      );
      grd1.addColorStop(0, 'rgba(124,92,252,0.25)');
      grd1.addColorStop(1, 'transparent');
      ctx.fillStyle = grd1;
      ctx.fillRect(0, 0, w, h);

      // Orb 2
      const grd2 = ctx.createRadialGradient(
        w * 0.8 + Math.cos(time * 0.3) * 60, h * 0.6 + Math.sin(time * 0.5) * 40, 0,
        w * 0.8 + Math.cos(time * 0.3) * 60, h * 0.6 + Math.sin(time * 0.5) * 40, 280
      );
      grd2.addColorStop(0, 'rgba(56,210,255,0.18)');
      grd2.addColorStop(1, 'transparent');
      ctx.fillStyle = grd2;
      ctx.fillRect(0, 0, w, h);

      // Orb 3
      const grd3 = ctx.createRadialGradient(
        w * 0.55, h * 0.1 + Math.sin(time * 0.6) * 40, 0,
        w * 0.55, h * 0.1 + Math.sin(time * 0.6) * 40, 200
      );
      grd3.addColorStop(0, 'rgba(224,64,251,0.15)');
      grd3.addColorStop(1, 'transparent');
      ctx.fillStyle = grd3;
      ctx.fillRect(0, 0, w, h);

      time += 0.01;
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <section className={styles.hero} id="hero">
      <canvas ref={canvasRef} className={styles.canvas} />
      <div className={styles.particlesContainer}>
        {particles.map(p => <Particle key={p.id} {...p} />)}
      </div>

      <div className={styles.content}>
        <div className={styles.badge}>
          <span className={styles.dot} />
          Agence de Marketing Digital · Casablanca
        </div>

        <h1 className={styles.headline}>
          <span className={styles.line1}>Growth.</span>
          <span className={styles.line2}>Performance.</span>
          <span className={`${styles.line3} grad-text`}>Results.</span>
        </h1>

        <p className={styles.sub}>
          Digitalink propulse votre marque avec des stratégies digitales data-driven —
          SEO, Ads, Social Media & Branding pour une croissance mesurable.
        </p>

        <div className={styles.actions}>
          <a href="#contact" className={styles.btnPrimary}>
            Demander un devis
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a href="#services" className={styles.btnGhost}>Nos services</a>
        </div>

        <div className={styles.stats}>
          {[
            { val: '2020', label: 'Fondée' },
            { val: '100+', label: 'Clients' },
            { val: '360°', label: 'Digital' },
          ].map(s => (
            <div key={s.label} className={styles.stat}>
              <span className={`${styles.statVal} grad-text`}>{s.val}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.scrollHint}>
        <div className={styles.scrollLine} />
        <span>Scroll</span>
      </div>
    </section>
  );
}
