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

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    const SCRIPT_URL =
      'https://script.google.com/macros/s/AKfycbz7Ue8Qb0PLr3iYQuCGAuLjuGC3sildN3yCFH5dck_DDdIYubi7oaf3Sq6Lh_J_732uGQ/exec';

    try {
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
      alert("Erreur lors de l'envoi, réessayez.");
    }
  }, [form]);

  return (
    <section className={styles.section} id="contact">
      <div className={styles.bg} />

      <div className={styles.inner}>
        {/* FORM */}
        <div
          ref={ref}
          className={`${styles.formWrap} ${inView ? styles.formVisible : ''}`}
        >
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