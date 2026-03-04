'use client';

import { useState } from 'react';
import contactData from '@/app/lib/data/contact.json';

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
        setSubmitted(true);
      } else {
        setError('Hubo un error al enviar. Por favor intenta de nuevo.');
      }
    } catch {
      setError('Error de conexión. Por favor intenta de nuevo.');
    } finally {
      setSubmitting(false);
    }
  };

  const host = contactData.host;

  return (
    <section className="contact" id="contacto" aria-labelledby="contact-title">
      <div className="container">
        <h2 className="section-title fade-in" id="contact-title">
          ¿Tienes preguntas sobre tu estancia?
        </h2>
        <p className="section-subtitle fade-in">
          Escríbenos tus dudas o planes de viaje. Para reservar y pagar de forma segura,
          usa el botón de Airbnb.
        </p>

        <div className="contact__layout">

          {/* ── Form wrapper ── */}
          <div className="contact__form-wrapper fade-in">
            <div className="contact__booking-note" role="note">
              <strong>Reserva oficial:</strong>
              <span> Airbnb (pago seguro y confirmación inmediata)</span>
            </div>

            {!submitted ? (
              <form
                className="contact-form"
                id="contactForm"
                onSubmit={handleSubmit}
                noValidate
              >
                <div className="form-group">
                  <label htmlFor="name">Nombre completo</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    autoComplete="name"
                    placeholder="Tu nombre completo"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  />
                  <span className="form-error" id="name-error"></span>
                </div>

                <div className="form-group">
                  <label htmlFor="email">Correo electrónico</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="email"
                    placeholder="tu@email.com"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  />
                  <span className="form-error" id="email-error"></span>
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Teléfono / WhatsApp</label>
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
                  <legend>Detalles de tu viaje (opcional)</legend>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="checkin">Fecha de llegada</label>
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
                      <label htmlFor="checkout">Fecha de salida</label>
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
                    <label htmlFor="guests">Número de huéspedes</label>
                    <select
                      id="guests"
                      name="guests"
                      value={formState.guests}
                      onChange={(e) => setFormState({ ...formState, guests: e.target.value })}
                    >
                      <option value="">Selecciona...</option>
                      <option value="1">1 huésped</option>
                      <option value="2">2 huéspedes</option>
                      <option value="3">3 huéspedes</option>
                      <option value="4">4 huéspedes (máximo)</option>
                    </select>
                    <span className="form-error" id="guests-error"></span>
                  </div>
                </fieldset>

                <div className="form-group">
                  <label htmlFor="message">Mensaje</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Cuéntanos sobre tu visita, preguntas especiales, etc."
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
                    <span>Acepto que mis datos sean usados para responder a mi consulta</span>
                  </label>
                  <span className="form-error" id="consent-error"></span>
                </div>

                {error && (
                  <span className="form-error" style={{ display: 'block', marginBottom: '1rem' }}>
                    {error}
                  </span>
                )}

                <button
                  type="submit"
                  className="btn btn--primary btn--full"
                  disabled={submitting}
                >
                  {submitting ? 'Enviando...' : 'Enviar consulta'}
                </button>
              </form>
            ) : (
              <div
                className="contact-success"
                id="contactSuccess"
                role="alert"
                aria-live="polite"
                style={{ display: 'flex' }}
              >
                <div className="contact-success__icon">
                  <i className="fas fa-check-circle"></i>
                </div>
                <h3>¡Mensaje enviado!</h3>
                <p>Gracias por contactarnos. Johnny te responderá muy pronto.</p>
                <a
                  href={contactData.social.airbnb}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--primary"
                >
                  Reservar ahora en Airbnb <i className="fas fa-home"></i>
                </a>
              </div>
            )}
          </div>

          {/* ── Sidebar ── */}
          <aside className="contact__sidebar fade-in">
            <div className="contact-card">
              <div className="contact-card__host">
                <div className="contact-card__avatar" aria-hidden="true">{host.avatar}</div>
                <div>
                  <strong>{host.name}</strong>
                  {host.isSuperhost && (
                    <span className="superhost-badge">Superanfitrión</span>
                  )}
                </div>
              </div>

              <div className="contact-card__stats">
                <div className="stat-item">
                  <span className="stat-item__value">★ {host.stats.rating}</span>
                  <span className="stat-item__label">Calificación</span>
                </div>
                <div className="stat-item">
                  <span className="stat-item__value">100%</span>
                  <span className="stat-item__label">Tasa de respuesta</span>
                </div>
                <div className="stat-item">
                  <span className="stat-item__value">{host.stats.years}</span>
                  <span className="stat-item__label">Años de experiencia</span>
                </div>
              </div>

              <p className="contact-card__coanfitriona">
                Co-anfitriona: {contactData.coHost.name}
              </p>
              <hr className="contact-card__divider" />
              <p className="contact-card__hint">
                Para reservar y pagar de forma segura, abre el anuncio en Airbnb.
              </p>
              <a
                href={contactData.social.airbnb}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--secondary btn--full"
              >
                Ver anuncio en Airbnb
              </a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
