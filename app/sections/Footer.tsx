'use client';

import contactData from '@/app/lib/data/contact.json';
import { useLanguage } from '@/app/context/LanguageContext';

export function Footer() {
  const { lang } = useLanguage();

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer__top">

          {/* Brand */}
          <div className="footer__brand">
            <span className="footer__logo" aria-hidden="true">
              <i className="fas fa-home"></i>
            </span>
            <h3>{lang === 'es' ? 'Romántico Apartamento con Tina' : 'Romantic Apartment with Bathtub'}</h3>
            <div className="footer__rating">
              <span className="footer__stars">★★★★★</span>
              <span>4.94</span>
              <span>{lang === 'es' ? '· Superanfitrión Johnny' : '· Superhost Johnny'}</span>
            </div>
          </div>

          {/* Contact */}
          <div className="footer__contact">
            <h4>{lang === 'es' ? 'Contacto' : 'Contact'}</h4>
            <div className="footer__contact-info">
              <a
                href={`tel:${contactData.contact.phone.replace(/\s/g, '')}`}
                className="footer__contact-item"
              >
                <i className="fas fa-phone"></i> {contactData.contact.phone}
              </a>
            </div>
          </div>

          {/* Quick rules */}
          <div className="footer__rules">
            <h4>{lang === 'es' ? 'Reglas rápidas' : 'Quick rules'}</h4>
            <ul>
              <li><i className="fas fa-key"></i> {lang === 'es' ? 'Check-in desde las 2:00 p.m.' : 'Check-in from 2:00 p.m.'}</li>
              <li><i className="fas fa-door-open"></i> {lang === 'es' ? 'Check-out antes de las 12:00 p.m.' : 'Check-out before 12:00 p.m.'}</li>
              <li><i className="fas fa-users"></i> {lang === 'es' ? 'Máximo 4 huéspedes' : 'Maximum 4 guests'}</li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p>
            © {new Date().getFullYear()} {lang === 'es' ? 'Romántico Apartamento con Tina' : 'Romantic Apartment with Bathtub'} · Pital, San Carlos,
            Costa Rica
          </p>
        </div>
      </div>
    </footer>
  );
}
