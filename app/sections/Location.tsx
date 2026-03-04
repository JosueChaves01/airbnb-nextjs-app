import contactData from '@/app/lib/data/contact.json';

export function Location() {
  const { location } = contactData;

  return (
    <section className="location" id="ubicacion" aria-labelledby="location-title">
      <div className="container">
        <h2 className="section-title fade-in" id="location-title">
          Dónde te alojarás
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
              Ubicado en una zona tranquila de Pital, el apartamento está a pocos minutos de
              restaurantes locales, sodas típicas y comercios. El famoso campo de girasoles
              está a solo 1.5 km, convirtiéndolo en la base perfecta para explorar la
              naturaleza de San Carlos.
            </p>

            <div className="location__checkinout">
              <div className="checkinout-item">
                <span className="checkinout-item__icon">
                  <i className="fas fa-key"></i>
                </span>
                <div>
                  <strong>Check-in</strong>
                  <span>Desde las 2:00 p.m.</span>
                </div>
              </div>
              <div className="checkinout-item">
                <span className="checkinout-item__icon">
                  <i className="fas fa-door-open"></i>
                </span>
                <div>
                  <strong>Check-out</strong>
                  <span>Hasta las 12:00 p.m.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="location__map fade-in">
            <iframe
              title="Mapa de ubicación — Pital, San Carlos"
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
