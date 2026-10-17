'use client';

import { motion } from 'framer-motion';
import highlightsData from '@/app/lib/data/highlights.json';
import { useLanguage } from '@/app/context/LanguageContext';
import { SectionHeading } from '@/app/components/deco/Ornaments';
import { Reveal, Stagger, StaggerItem, fadeUp } from '@/app/components/motion/Reveal';

const NUMERALS = ['I', 'II', 'III', 'IV', 'V', 'VI'];

export function Highlights() {
  const { lang, t } = useLanguage();
  const { title, subtitle, cards, host } = highlightsData;

  return (
    <section className="section section--ivory highlights" id="destacados" aria-labelledby="highlights-title">
      <div className="container">
        <SectionHeading
          id="highlights-title"
          numeral="I"
          eyebrow={lang === 'es' ? 'La experiencia' : 'The experience'}
          title={t(title)}
          subtitle={t(subtitle)}
          tone="light"
        />

        <Stagger className="highlights__grid" stagger={0.15}>
          {cards.map((card, idx) => (
            <StaggerItem key={idx} variants={fadeUp}>
              <motion.article
                className="highlight-card"
                whileHover={{ y: -10 }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              >
                <span className="highlight-card__numeral" aria-hidden="true">{NUMERALS[idx]}</span>
                <motion.div
                  className="highlight-card__icon"
                  whileHover={{ rotate: 90 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 14 }}
                >
                  <i className={`fas fa-${card.icon}`} aria-hidden="true"></i>
                </motion.div>
                <h3 className="highlight-card__title">{t(card.title)}</h3>
                <p className="highlight-card__desc">{t(card.desc)}</p>
                <span className="highlight-card__fan" aria-hidden="true" />
              </motion.article>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="host-bar" delay={0.1}>
          <div className="host-bar__avatar" aria-hidden="true">{host.avatar}</div>
          <div className="host-bar__meta">
            <p className="host-bar__title">{t(host.title)}</p>
            <p className="host-bar__subtitle">{t(host.subtitle)}</p>
          </div>
          <a href={host.ctaHref} className="btn btn--outline-gold">
            {t(host.cta)}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
