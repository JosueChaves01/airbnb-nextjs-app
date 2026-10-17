'use client';

import { useState } from 'react';
import contactData from '@/app/lib/data/contact.json';
import { trackAirbnbClick, trackContactFormSuccess } from '@/app/lib/analytics';
import { useLanguage } from '@/app/context/LanguageContext';
import { AnimatePresence, motion } from 'framer-motion';
import { SectionHeading, CornerFrame } from '@/app/components/deco/Ornaments';
import { Reveal, EASE_DECO } from '@/app/components/motion/Reveal';

interface FormState {
  name: string;
  email: string;
  phone: string;
  checkin: string;
  checkout: string;
  guests: string;
  message: string;
  consent: boolean;
}

export function Contact() {
  const { lang } = useLanguage();
  const [formState, setFormState] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    checkin: '',
    checkout: '',
    guests: '',
    message: '',
    consent: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const response = await fetch(contactData.form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          phone: formState.phone,
          checkin: formState.checkin,
          checkout: formState.checkout,
          guests: formState.guests,
          message: formState.message,
        }),
      });

      if (response.ok) {
        trackContactFormSuccess();
        setSubmitted(true);
      } else {
        setError(lang === 'es'
          ? 'Hubo un error al enviar. Por favor intenta de nuevo.'
          : 'There was an error sending. Please try again.');
      }
    } catch {
      setError(lang === 'es'
        ? 'Error de conexión. Por favor intenta de nuevo.'
        : 'Connection error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const host = contactData.host;

  return (
    <section className="section section--ivory contact" id="contacto" aria-labelledby="contact-title">
      <div className="container">
        <SectionHeading
          id="contact-title"
          numeral="VII"
          eyebrow={lang === 'es' ? 'Contacto' : 'Contact'}
          title={lang === 'es' ? '¿Tienes preguntas sobre tu estancia?' : 'Have questions about your stay?'}
          subtitle={lang === 'es'
            ? 'Escríbenos tus dudas o planes de viaje. Para reservar y pagar de forma segura, usa el botón de Airbnb.'
            : 'Send us your questions or travel plans. To book and pay securely, use the Airbnb button.'}
          tone="light"
        />

        <div className="contact__layout">

          {/* ── Form wrapper ── */}
          <Reveal className="contact__form-wrapper">
            <CornerFrame className="contact__corners" />
            <div className="contact__booking-note" role="note">
              <i className="fas fa-shield-alt" aria-hidden="true"></i>
              <span>
                <strong>{lang === 'es' ? 'Reserva oficial:' : 'Official booking:'}</strong>
                {' '}{lang === 'es' ? 'Airbnb (pago seguro y confirmación inmediata)' : 'Airbnb (secure payment and instant confirmation)'}
              </span>
            </div>

            <AnimatePresence mode="wait" initial={false}>
            {!submitted ? (
              <motion.form
                key="form"
                exit={{ opacity: 0, y: -20, transition: { duration: 0.35 } }}
                className="contact-form"
                id="contactForm"
                onSubmit={handleSubmit}
                noValidate
              >
                <div className="form-group">
                  <label htmlFor="name">{lang === 'es' ? 'Nombre completo' : 'Full name'}</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    autoComplete="name"
                    placeholder={lang === 'es' ? 'Tu nombre completo' : 'Your full name'}
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  />
                  <span className="form-error" id="name-error"></span>
                </div>

                <div className="form-group">
                  <label htmlFor="email">{lang === 'es' ? 'Correo electrónico' : 'Email'}</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="email"
                    placeholder={lang === 'es' ? 'tu@email.com' : 'your@email.com'}
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  />
                  <span className="form-error" id="email-error"></span>
                </div>

                <div className="form-group">
                  <label htmlFor="phone">{lang === 'es' ? 'Teléfono / WhatsApp' : 'Phone / WhatsApp'}</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    autoComplete="tel"
                    placeholder="+506 8888 8888"
                    value={formState.phone}
                    onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                  />
                  <span className="form-error" id="phone-error"></span>
                </div>

                <fieldset className="form-fieldset">
                  <legend>{lang === 'es' ? 'Detalles de tu viaje (opcional)' : 'Trip details (optional)'}</legend>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="checkin">{lang === 'es' ? 'Fecha de llegada' : 'Check-in date'}</label>
                      <input
                        type="date"
                        id="checkin"
                        name="checkin"
                        value={formState.checkin}
                        onChange={(e) => setFormState({ ...formState, checkin: e.target.value })}
                      />
                      <span className="form-error" id="checkin-error"></span>
                    </div>
                    <div className="form-group">
                      <label htmlFor="checkout">{lang === 'es' ? 'Fecha de salida' : 'Check-out date'}</label>
                      <input
                        type="date"
                        id="checkout"
                        name="checkout"
                        value={formState.checkout}
                        onChange={(e) => setFormState({ ...formState, checkout: e.target.value })}
                      />
                      <span className="form-error" id="checkout-error"></span>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="guests">{lang === 'es' ? 'Número de huéspedes' : 'Number of guests'}</label>
                    <select
                      id="guests"
                      name="guests"
                      value={formState.guests}
                      onChange={(e) => setFormState({ ...formState, guests: e.target.value })}
                    >
                      <option value="">{lang === 'es' ? 'Selecciona...' : 'Select...'}</option>
                      <option value="1">{lang === 'es' ? '1 huésped' : '1 guest'}</option>
                      <option value="2">{lang === 'es' ? '2 huéspedes' : '2 guests'}</option>
                      <option value="3">{lang === 'es' ? '3 huéspedes' : '3 guests'}</option>
                      <option value="4">{lang === 'es' ? '4 huéspedes (máximo)' : '4 guests (maximum)'}</option>
                    </select>
                    <span className="form-error" id="guests-error"></span>
                  </div>
                </fieldset>

                <div className="form-group">
                  <label htmlFor="message">{lang === 'es' ? 'Mensaje' : 'Message'}</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder={lang === 'es' ? 'Cuéntanos sobre tu visita, preguntas especiales, etc.' : 'Tell us about your visit, special requests, etc.'}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  />
                  <span className="form-error" id="message-error"></span>
                </div>

                <div className="form-group form-group--checkbox">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      id="consent"
                      name="consent"
                      required
                      checked={formState.consent}
                      onChange={(e) => setFormState({ ...formState, consent: e.target.checked })}
                    />
                    <span className="checkbox-custom"></span>
                    <span>{lang === 'es' ? 'Acepto que mis datos sean usados para responder a mi consulta' : 'I agree that my data may be used to respond to my inquiry'}</span>
                  </label>
                  <span className="form-error" id="consent-error"></span>
                </div>

                {error && (
                  <span className="form-error" style={{ display: 'block', marginBottom: '1rem' }}>
                    {error}
                  </span>
                )}

                <motion.button
                  type="submit"
                  className="btn btn--gold btn--full"
                  disabled={submitting}
                  whileHover={submitting ? undefined : { y: -2 }}
                  whileTap={submitting ? undefined : { scale: 0.98 }}
                >
                  {submitting
                    ? (lang === 'es' ? 'Enviando...' : 'Sending...')
                    : (lang === 'es' ? 'Enviar consulta' : 'Send inquiry')
                  }
                </motion.button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                className="contact-success"
                id="contactSuccess"
                role="alert"
                aria-live="polite"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE_DECO }}
              >
                <motion.div
                  className="contact-success__icon"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.2 }}
                >
                  <i className="fas fa-check" aria-hidden="true"></i>
                </motion.div>
                <h3>{lang === 'es' ? '¡Mensaje enviado!' : 'Message sent!'}</h3>
                <p>{lang === 'es' ? 'Gracias por contactarnos. Johnny te responderá muy pronto.' : 'Thank you for reaching out. Johnny will get back to you very soon.'}</p>
                <a
                  href={contactData.social.airbnb}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--gold"
                  onClick={() => trackAirbnbClick('contact_success')}
                >
                  {lang === 'es' ? 'Reservar ahora en Airbnb' : 'Book now on Airbnb'} <i className="fas fa-home" aria-hidden="true"></i>
                </a>
              </motion.div>
            )}
            </AnimatePresence>
          </Reveal>

          {/* ── Sidebar ── */}
          <Reveal as="aside" className="contact__sidebar" delay={0.15}>
            <div className="contact-card">
              <div className="contact-card__host">
                <div className="contact-card__avatar" aria-hidden="true">{host.avatar}</div>
                <div>
                  <strong>{host.name}</strong>
                  {host.isSuperhost && (
                    <span className="superhost-badge">{lang === 'es' ? 'Superanfitrión' : 'Superhost'}</span>
                  )}
                </div>
              </div>

              <div className="contact-card__stats">
                <div className="stat-item">
                  <span className="stat-item__value">★ {host.stats.rating}</span>
                  <span className="stat-item__label">{lang === 'es' ? 'Calificación' : 'Rating'}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-item__value">100%</span>
                  <span className="stat-item__label">{lang === 'es' ? 'Tasa de respuesta' : 'Response rate'}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-item__value">{host.stats.years}</span>
                  <span className="stat-item__label">{lang === 'es' ? 'Años de experiencia' : 'Years of experience'}</span>
                </div>
              </div>

              <p className="contact-card__coanfitriona">
                {lang === 'es' ? 'Co-anfitriona' : 'Co-host'}: {contactData.coHost.name}
              </p>
              <hr className="contact-card__divider" />
              <p className="contact-card__hint">
                {lang === 'es'
                  ? 'Para reservar y pagar de forma segura, abre el anuncio en Airbnb.'
                  : 'To book and pay securely, open the listing on Airbnb.'}
              </p>
              <a
                href={contactData.social.airbnb}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--outline-gold btn--full"
                onClick={() => trackAirbnbClick('contact_sidebar')}
              >
                {lang === 'es' ? 'Ver anuncio en Airbnb' : 'View listing on Airbnb'}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
