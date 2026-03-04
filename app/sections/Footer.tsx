import contactData from '@/app/lib/data/contact.json';

export function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer__top">

          {/* Brand */}
          <div className="footer__brand">
            <span className="footer__logo" aria-hidden="true">
              <i className="fas fa-home"></i>
            </span>
            <h3>Romántico Apartamento con Tina</h3>
            <div className="footer__rating">
              <span className="footer__stars">★★★★★</span>
              <span>4.94</span>
              <span>· Superanfitrión Johnny</span>
            </div>
          </div>

          {/* Contact */}
          <div className="footer__contact">
            <h4>Contacto</h4>
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
            <h4>Reglas rápidas</h4>
            <ul>
              <li><i className="fas fa-key"></i> Check-in desde las 2:00 p.m.</li>
              <li><i className="fas fa-door-open"></i> Check-out antes de las 12:00 p.m.</li>
              <li><i className="fas fa-users"></i> Máximo 4 huéspedes</li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p>
            © {new Date().getFullYear()} Romántico Apartamento con Tina · Pital, San Carlos,
            Costa Rica
          </p>
        </div>
      </div>
    </footer>
  );
}
