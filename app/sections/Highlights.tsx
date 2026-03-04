import highlightsData from '@/app/lib/data/highlights.json';

export function Highlights() {
  const { title, subtitle, cards, host } = highlightsData;

  return (
    <section className="highlights" id="destacados" aria-labelledby="highlights-title">
      <div className="container">
        <h2 className="section-title fade-in" id="highlights-title">
          {title.es}
        </h2>
        <p className="section-subtitle fade-in">
          {subtitle.es}
        </p>

        <div className="highlights__grid">
          {cards.map((card, idx) => (
            <article className="highlight-card fade-in" key={idx}>
              <div className="highlight-card__icon">
                <i className={`fas fa-${card.icon}`}></i>
              </div>
              <h3 className="highlight-card__title">{card.title.es}</h3>
              <p className="highlight-card__desc">{card.desc.es}</p>
            </article>
          ))}
        </div>

        <div className="scroll-dots" aria-hidden="true">
          <span></span><span></span><span></span>
        </div>

        <div className="host-bar fade-in">
          <div className="host-bar__avatar" aria-hidden="true">{host.avatar}</div>
          <div className="host-bar__meta">
            <p className="host-bar__title">{host.title.es}</p>
            <p className="host-bar__subtitle">{host.subtitle.es}</p>
          </div>
          <a href={host.ctaHref} className="btn btn--secondary">
            {host.cta.es}
          </a>
        </div>
      </div>
    </section>
  );
}
