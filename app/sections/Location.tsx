'use client';

import contactData from '@/app/lib/data/contact.json';
import { useLanguage } from '@/app/context/LanguageContext';
import { SectionHeading, CornerFrame } from '@/app/components/deco/Ornaments';
import { Reveal } from '@/app/components/motion/Reveal';

export function Location() {
  const { lang } = useLanguage();
  const { location } = contactData;

  return (
    <section className="section section--ink location" id="ubicacion" aria-labelledby="location-title">
      <div className="container">
        <SectionHeading
          id="location-title"
          numeral="V"
          eyebrow={lang === 'es' ? 'Ubicación' : 'Location'}
          title={lang === 'es' ? 'Dónde te alojarás' : 'Where you\'ll stay'}
        />

        <div className="location__layout">
          <Reveal className="location__info">
            <div className="location__address">
              <span className="location__pin">
                <i className="fas fa-map-marker-alt" aria-hidden="true"></i>
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
                  <i className="fas fa-key" aria-hidden="true"></i>
                </span>
                <div>
                  <strong>Check-in</strong>
                  <span>{lang === 'es' ? 'Desde las 2:00 p.m.' : 'From 2:00 p.m.'}</span>
                </div>
              </div>
              <div className="checkinout-item">
                <span className="checkinout-item__icon">
                  <i className="fas fa-door-open" aria-hidden="true"></i>
                </span>
                <div>
                  <strong>Check-out</strong>
                  <span>{lang === 'es' ? 'Hasta las 12:00 p.m.' : 'Until 12:00 p.m.'}</span>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal className="location__map" delay={0.15}>
            <CornerFrame className="location__corners" />
            <iframe
              title={lang === 'es' ? 'Mapa de ubicación — Pital, San Carlos' : 'Location map — Pital, San Carlos'}
              src={`https://www.google.com/maps?q=${location.coordinates.lat},${location.coordinates.lng}&z=15&output=embed`}
              width="100%"
              height="420"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
