'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import heroData from '@/app/lib/data/hero.json';
import { trackAirbnbClick, trackWhatsappPhoneClick } from '@/app/lib/analytics';
import { useLanguage } from '@/app/context/LanguageContext';
import { Sunburst, CornerFrame } from '@/app/components/deco/Ornaments';
import { EASE_DECO } from '@/app/components/motion/Reveal';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.45 } },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE_DECO } },
};

const contactIcons = {
  airbnb: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="2" x2="22" y1="12" y2="12"></line>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
    </svg>
  ),
  phone: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
    </svg>
  ),
  location: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
      <circle cx="12" cy="10" r="3"></circle>
    </svg>
  ),
};

export function Hero() {
  const { lang, t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '8%']);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  const [airbnb, phone, location] = heroData.contactGrid;
  const locationLabel = typeof location.label === 'string'
    ? location.label
    : t(location.label as { es: string; en: string });

  return (
    <section
      ref={sectionRef}
      className="hero"
      id="inicio"
      aria-label={lang === 'es' ? 'Sección principal' : 'Main section'}
    >
      {/* Decorative backdrop — a single, static sunburst kept very faint */}
      <div className="hero__backdrop" aria-hidden="true">
        <Sunburst className="hero__sunburst" rays={48} spin={false} />
      </div>

      <div className="hero__container">
        {/* ── Left: content ── */}
        <motion.div className="hero__content" variants={container} initial="hidden" animate="visible">
          <motion.p className="hero__slogan" variants={item}>
            <span className="hero__slogan-mark" aria-hidden="true" />
            {t(heroData.brand.slogan)}
            <span className="hero__slogan-mark" aria-hidden="true" />
          </motion.p>

          <motion.h1 className="hero__title" variants={item}>
            <span className="hero__title-prefix">{t(heroData.title.prefix)}</span>
            <span className="hero__title-accent">{heroData.title.accent}</span>
            <span className="hero__title-suffix">{t(heroData.title.suffix)}</span>
          </motion.h1>

          <motion.div
            className="hero__rule"
            aria-hidden="true"
            variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: 1.1, ease: EASE_DECO } } }}
          >
            <span className="hero__rule-diamond" />
          </motion.div>

          <motion.p className="hero__subtitle" variants={item}>
            {t(heroData.subtitle)}
          </motion.p>

          <motion.ul className="hero__features" variants={container}>
            {heroData.features.map((feat: { es: string; en: string }, idx: number) => (
              <motion.li key={idx} variants={item}>
                <span className="hero__feature-mark" aria-hidden="true" />
                <span>{t(feat)}</span>
              </motion.li>
            ))}
          </motion.ul>

          <motion.div variants={item} className="hero__actions">
            <motion.a
              href={heroData.cta.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--gold btn--lg"
              onClick={() => trackAirbnbClick('hero_cta')}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
            >
              <span>{t(heroData.cta.text)}</span>
            </motion.a>
            <div className="hero__rating" aria-label={`${heroData.rating.score} · ${heroData.rating.reviews} ${lang === 'es' ? 'reseñas' : 'reviews'}`}>
              <span className="hero__rating-stars" aria-hidden="true">{'★'.repeat(heroData.rating.stars)}</span>
              <span className="hero__rating-text">
                {heroData.rating.score} · {heroData.rating.reviews} {lang === 'es' ? 'reseñas' : 'reviews'}
              </span>
            </div>
          </motion.div>

          <motion.div className="hero__contact-grid" variants={item}>
            <a
              href={airbnb.href}
              className="hero__contact-item"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackAirbnbClick('hero_grid')}
            >
              <span className="hero__contact-icon">{contactIcons.airbnb}</span>
              <span>{airbnb.label as string}</span>
            </a>
            <a
              href={phone.href}
              className="hero__contact-item"
              onClick={() => trackWhatsappPhoneClick('hero')}
            >
              <span className="hero__contact-icon">{contactIcons.phone}</span>
              <span>{phone.label as string}</span>
            </a>
            <a href={location.href} target="_blank" rel="noopener noreferrer" className="hero__contact-item">
              <span className="hero__contact-icon">{contactIcons.location}</span>
              <span>{locationLabel}</span>
            </a>
          </motion.div>
        </motion.div>

        {/* ── Right: arched image ── */}
        <div className="hero__visual">
          <motion.div
            className="hero__arch-outline"
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, delay: 0.6, ease: EASE_DECO }}
          />
          <motion.div
            className="hero__arch"
            initial={{ clipPath: 'inset(100% 0 0 0)' }}
            animate={{ clipPath: 'inset(0% 0 0 0)' }}
            transition={{ duration: 1.5, delay: 0.3, ease: EASE_DECO }}
          >
            <motion.div className="hero__arch-img" style={{ y: imageY, scale: imageScale }}>
              <Image
                src={heroData.image.src}
                alt={heroData.image.alt}
                fill
                sizes="(max-width: 960px) 90vw, 45vw"
                priority
                className="object-cover"
              />
            </motion.div>
            <CornerFrame className="hero__arch-corners" />
          </motion.div>

          <motion.div
            className="hero__seal"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.1, ease: EASE_DECO }}
            aria-hidden="true"
          >
            <span className="hero__seal-score">{heroData.rating.score}</span>
            <span className="hero__seal-label">{lang === 'es' ? 'Superanfitrión' : 'Superhost'}</span>
          </motion.div>
        </div>
      </div>

      <motion.a
        href="#destacados"
        className="hero__scroll"
        aria-label={lang === 'es' ? 'Desplazarse hacia abajo' : 'Scroll down'}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.span
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <i className="fas fa-chevron-down" aria-hidden="true"></i>
        </motion.span>
      </motion.a>
    </section>
  );
}
