'use client';

import contactData from '@/app/lib/data/contact.json';
import { useLanguage } from '@/app/context/LanguageContext';

export function Location() {
  const { lang } = useLanguage();
  const { location } = contactData;

  return (
    <section className="location" id="ubicacion" aria-labelledby="location-title">
      <div className="container">
        <h2 className="section-title fade-in" id="location-title">
          {lang === 'es' ? 'Dónde te alojarás' : 'Where you\'ll stay'}
        </h2>

        <div className="location__layout">
          <div className="location__info fade-in">
            <div className="location__address">
              <span className="location__pin">
                <i className="fas fa-map-marker-alt"></i>
              </span>
              <div>
                <h3>Pital, San Carlos</h3>
                <p>Alajuela, Costa Rica</p>
              </div>
            </div>

            <p className="location__desc">
              {lang === 'es'
                ? 'Ubicado en una zona tranquila de Pital, el apartamento está a pocos minutos de restaurantes locales, sodas típicas y comercios. El famoso campo de girasoles está a solo 1.5 km, convirtiéndolo en la base perfecta para explorar la naturaleza de San Carlos.'
                : 'Located in a quiet area of Pital, the apartment is just minutes from local restaurants, traditional sodas, and shops. The famous sunflower field is only 1.5 km away, making it the perfect base to explore the nature of San Carlos.'}
            </p>

            <div className="location__checkinout">
              <div className="checkinout-item">
                <span className="checkinout-item__icon">
                  <i className="fas fa-key"></i>
                </span>
                <div>
                  <strong>Check-in</strong>
                  <span>{lang === 'es' ? 'Desde las 2:00 p.m.' : 'From 2:00 p.m.'}</span>
                </div>
              </div>
              <div className="checkinout-item">
                <span className="checkinout-item__icon">
                  <i className="fas fa-door-open"></i>
                </span>
                <div>
                  <strong>Check-out</strong>
                  <span>{lang === 'es' ? 'Hasta las 12:00 p.m.' : 'Until 12:00 p.m.'}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="location__map fade-in">
            <iframe
              title={lang === 'es' ? 'Mapa de ubicación — Pital, San Carlos' : 'Location map — Pital, San Carlos'}
              src={`https://www.google.com/maps?q=${location.coordinates.lat},${location.coordinates.lng}&z=15&output=embed`}
              width="100%"
              height="420"
              style={{ border: 0, borderRadius: 'var(--radius-lg)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
