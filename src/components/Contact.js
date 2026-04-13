import React, { useState, useCallback } from 'react';
import styles from './Contact.module.css';
import useInView from '../hooks/useInView';

import {
  FaWhatsapp,
  FaInstagram,
  FaLinkedin,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook
} from 'react-icons/fa';

export default function Contact() {
  const [ref, inView] = useInView();

  const [form, setForm] = useState({
    name: '',
    email: '',
    service: '',
    message: ''
  });

  const [sent, setSent] = useState(false);

  // 🔥 Data dynamique (plus propre)
  const channels = [
    {
      icone: <FaEnvelope />,
      label: 'Email',
      value: 'contact@digitalink.ma',
  href: 'mailto:contact@digitalink.ma'
},
    {
      icone: <FaWhatsapp />,
      label: 'WhatsApp',
      value: '+212 660 385 276',
      href: 'https://api.whatsapp.com/send/?phone=212660385276&text&type=phone_number&app_absent=0'
    },
    {
      icone: <FaInstagram />,
      label: 'Instagram',
      value: '@digitalink.ma',
      href: 'https://www.instagram.com/digitalink.ma'
    },
    {
          icone: <FaFacebook />,
          label: 'Facebook',
          value: 'digitalnk',
          href: 'https://web.facebook.com/digitalink.ma?_rdc=1&_rdr#'
        },
    {
      icon: <FaLinkedin />,
      label: 'LinkedIn',
      value: 'digitalnk',
      href: 'https://www.linkedin.com/company/digitalnk/about/'
    },
    {
      icon: <FaMapMarkerAlt />,
      label: 'Siège Social',
      value: 'Casablanca, Maroc'
    }
  ];

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  }, []);

const handleSubmit = useCallback(async (e) => {
  e.preventDefault();

  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz7Ue8Qb0PLr3iYQuCGAuLjuGC3sildN3yCFH5dck_DDdIYubi7oaf3Sq6Lh_J_732uGQ/exec';

  try {
    // Utiliser FormData évite les problèmes CORS
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('email', form.email);
    formData.append('service', form.service);
    formData.append('message', form.message);

    await fetch(SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      body: formData
    });

    setSent(true);

  } catch (error) {
    console.error('Erreur:', error);
    alert('Erreur lors de l\'envoi, réessayez.');
  }
}, [form]);

  return (
    <section className={styles.section} id="contact">
      <div className={styles.bg} />

      <div className={styles.inner}>
        {/* LEFT CONTENT */}
        <div ref={ref} className={`${styles.content} ${inView ? styles.visible : ''}`}>
          <span className={styles.eyebrow}>Contactez-nous</span>

          <h2 className={styles.title}>
            Prêt à accélérer<br />
            votre <span className="grad-text">croissance ?</span>
          </h2>

          <p className={styles.sub}>
            Discutons de votre projet et construisons ensemble une stratégie digitale sur mesure pour votre entreprise.
          </p>

          {/* 🔥 Channels dynamiques */}
          <div className={styles.channels}>
            {channels.map((c, i) => {
              const content = (
                <>
                  <span className={styles.channelIcon}>{c.icon}</span>
                  <div>
                    <div className={styles.channelLabel}>{c.label}</div>
                    <div className={styles.channelVal}>{c.value}</div>
                  </div>
                </>
              );

              return c.href ? (
                <a
                  key={i}
                  href={c.href}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.channel}
                >
                  {content}
                </a>
              ) : (
                <div key={i} className={styles.channel}>
                  {content}
                </div>
              );
            })}
          </div>
        </div>

        {/* FORM */}
        <div className={`${styles.formWrap} ${inView ? styles.formVisible : ''}`}>
          {sent ? (
            <div className={styles.thanks}>
              <div className={styles.thanksIcon}>✅</div>
              <h3>Message envoyé !</h3>
              <p>Nous vous répondrons dans les plus brefs délais.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.form}>
              <h3 className={styles.formTitle}>Démarrer un projet</h3>

              <div className={styles.row}>
                <div className={styles.field}>
                  <label>Nom complet</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Votre nom"
                    required
                  />
                </div>

                <div className={styles.field}>
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="votre@email.com"
                    required
                  />
                </div>
              </div>

              <div className={styles.field}>
                <label>Service souhaité</label>
                <select
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  required
                >
                  <option value="">Choisir un service</option>
                  <option>Google & Meta Ads</option>
                  <option>SEO & Référencement</option>
                  <option>Social Media Management</option>
                  <option>Branding & Identité</option>
                  <option>Sites Web & E-commerce</option>
                  <option>Stratégie Complète</option>
                  <option>Autre</option>
                </select>
              </div>

              <div className={styles.field}>
                <label>Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Décrivez votre projet..."
                  rows={4}
                />
              </div>

              <button type="submit" className={styles.submit}>
                Envoyer ma demande
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}