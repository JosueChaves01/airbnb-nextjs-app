import heroData from '@/app/lib/data/hero.json';

export function Hero() {
  return (
    <section className="hero hero--new" id="inicio" aria-label="Sección principal">
      <div className="hero__container">

        {/* ── Left Side: Content ── */}
        <div className="hero__content">
          <header className="hero__header hero-animate" data-delay="0">
            <div className="hero__brand">
              <span className="hero__logo-icon"><i className="fas fa-home"></i></span>
              <div>
                <p className="hero__logo-text">{heroData.brand.name}</p>
                <p className="hero__slogan">{heroData.brand.slogan.es}</p>
              </div>
            </div>
          </header>

          <main className="hero__main">
            <h1 className="hero__title hero-animate" data-delay="1">
              <span>{heroData.title.prefix.es}</span>
              <span className="hero__title--accent">{heroData.title.accent}</span>
              <br />
              <span>{heroData.title.suffix.es}</span>
            </h1>

            <div className="hero__divider hero-animate" data-delay="2"></div>

            <p className="hero__subtitle hero-animate" data-delay="3">
              {heroData.subtitle.es}
            </p>

            <ul className="hero__features hero-animate" data-delay="4">
              {heroData.features.map((feat: { es: string }, idx: number) => (
                <li key={idx}>
                  <i className="fas fa-check"></i>{' '}
                  <span>{feat.es}</span>
                </li>
              ))}
            </ul>

            <a
              href={heroData.cta.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hero__cta hero-animate"
              data-delay="5"
            >
              {heroData.cta.text.es}
            </a>
          </main>

          <footer className="hero__footer hero-animate" data-delay="6">
            <div className="hero__contact-grid">
              {/* Airbnb */}
              <a href={heroData.contactGrid[0].href} className="hero__contact-item">
                <span className="hero__contact-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="2" x2="22" y1="12" y2="12"></line>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                  </svg>
                </span>
                <span>{heroData.contactGrid[0].label as string}</span>
              </a>
              {/* Phone */}
              <a href={heroData.contactGrid[1].href} className="hero__contact-item">
                <span className="hero__contact-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </span>
                <span>{heroData.contactGrid[1].label as string}</span>
              </a>
              {/* Location */}
              <a href={heroData.contactGrid[2].href} target="_blank" rel="noopener noreferrer" className="hero__contact-item">
                <span className="hero__contact-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </span>
                <span>{typeof heroData.contactGrid[2].label === 'string' ? heroData.contactGrid[2].label : (heroData.contactGrid[2].label as {es:string}).es}</span>
              </a>
            </div>
          </footer>
        </div>

        {/* ── Right Side: Image ── */}
        <div className="hero__image-wrapper">
          <div className="hero__image" style={{ backgroundImage: `url('${heroData.image.src}')` }}></div>
        </div>
      </div>
    </section>
  );
}
