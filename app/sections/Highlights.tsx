'use client';

import highlightsData from '@/app/lib/data/highlights.json';
import { useLanguage } from '@/app/context/LanguageContext';

export function Highlights() {
  const { t } = useLanguage();
  const { title, subtitle, cards, host } = highlightsData;

  return (
    <section className="highlights" id="destacados" aria-labelledby="highlights-title">
      <div className="container">
        <h2 className="section-title fade-in" id="highlights-title">
          {t(title)}
        </h2>
        <p className="section-subtitle fade-in">
          {t(subtitle)}
        </p>

        <div className="highlights__grid">
          {cards.map((card, idx) => (
            <article className="highlight-card fade-in" key={idx}>
              <div className="highlight-card__icon">
                <i className={`fas fa-${card.icon}`}></i>
              </div>
              <h3 className="highlight-card__title">{t(card.title)}</h3>
              <p className="highlight-card__desc">{t(card.desc)}</p>
            </article>
          ))}
        </div>

        <div className="scroll-dots" aria-hidden="true">
          <span></span><span></span><span></span>
        </div>

        <div className="host-bar fade-in">
          <div className="host-bar__avatar" aria-hidden="true">{host.avatar}</div>
          <div className="host-bar__meta">
            <p className="host-bar__title">{t(host.title)}</p>
            <p className="host-bar__subtitle">{t(host.subtitle)}</p>
          </div>
          <a href={host.ctaHref} className="btn btn--secondary">
            {t(host.cta)}
          </a>
        </div>
      </div>
    </section>
  );
}
