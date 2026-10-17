'use client';

import contactData from '@/app/lib/data/contact.json';
import { trackWhatsappPhoneClick } from '@/app/lib/analytics';
import { useLanguage } from '@/app/context/LanguageContext';
import { Monogram, Sunburst } from '@/app/components/deco/Ornaments';
import { Stagger, StaggerItem, fadeUp } from '@/app/components/motion/Reveal';

export function Footer() {
  const { lang } = useLanguage();

  return (
    <footer className="footer" role="contentinfo">
      <Sunburst className="footer__sun" rays={60} />
      <div className="footer__chevrons" aria-hidden="true" />
      <div className="container">
        <Stagger className="footer__top" stagger={0.12}>

          {/* Brand */}
          <StaggerItem variants={fadeUp} className="footer__brand">
            <Monogram className="footer__monogram" />
            <h3>{lang === 'es' ? 'Romántico Apartamento con Tina' : 'Romantic Apartment with Bathtub'}</h3>
            <div className="footer__rating">
              <span className="footer__stars" aria-hidden="true">★★★★★</span>
              <span>4.94</span>
              <span>{lang === 'es' ? '· Superanfitrión Johnny' : '· Superhost Johnny'}</span>
            </div>
          </StaggerItem>

          {/* Contact */}
          <StaggerItem variants={fadeUp} className="footer__contact">
            <h4>{lang === 'es' ? 'Contacto' : 'Contact'}</h4>
            <a
              href={`tel:${contactData.contact.phone.replace(/\s/g, '')}`}
              className="footer__contact-item"
              onClick={() => trackWhatsappPhoneClick('footer')}
            >
              <i className="fas fa-phone" aria-hidden="true"></i> {contactData.contact.phone}
            </a>
          </StaggerItem>

          {/* Quick rules */}
          <StaggerItem variants={fadeUp} className="footer__rules">
            <h4>{lang === 'es' ? 'Reglas rápidas' : 'Quick rules'}</h4>
            <ul>
              <li><i className="fas fa-key" aria-hidden="true"></i> {lang === 'es' ? 'Check-in desde las 2:00 p.m.' : 'Check-in from 2:00 p.m.'}</li>
              <li><i className="fas fa-door-open" aria-hidden="true"></i> {lang === 'es' ? 'Check-out antes de las 12:00 p.m.' : 'Check-out before 12:00 p.m.'}</li>
              <li><i className="fas fa-users" aria-hidden="true"></i> {lang === 'es' ? 'Máximo 4 huéspedes' : 'Maximum 4 guests'}</li>
            </ul>
          </StaggerItem>
        </Stagger>

        <div className="footer__bottom">
          <span className="footer__bottom-rule" aria-hidden="true" />
          <p>
            © {new Date().getFullYear()} {lang === 'es' ? 'Romántico Apartamento con Tina' : 'Romantic Apartment with Bathtub'} · Pital, San Carlos,
            Costa Rica
          </p>
        </div>
      </div>
    </footer>
  );
}
