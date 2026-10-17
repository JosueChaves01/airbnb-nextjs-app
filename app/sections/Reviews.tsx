'use client';

import { motion } from 'framer-motion';
import reviewsData from '@/app/lib/data/reviews.json';
import { trackAirbnbClick } from '@/app/lib/analytics';
import { useLanguage } from '@/app/context/LanguageContext';
import { SectionHeading, Sunburst } from '@/app/components/deco/Ornaments';
import { Reveal, Stagger, StaggerItem, fadeUp, EASE_DECO } from '@/app/components/motion/Reveal';
import { CountUp } from '@/app/components/motion/CountUp';

interface ReviewCategory {
  name: { es: string; en: string };
  score: number;
  barWidth: string;
}

interface ReviewCard {
  author: string;
  avatar: string;
  location: { es: string; en: string };
  date: { es: string; en: string };
  rating: number;
  text: { es: string; en: string };
}

export function Reviews() {
  const { lang, t } = useLanguage();
  const { overall, categories, featured, airbnbUrl } = reviewsData;
  const cats: ReviewCategory[] = categories as ReviewCategory[];
  const reviews: ReviewCard[] = featured as ReviewCard[];

  return (
    <section className="section section--ivory reviews" id="resenas" aria-labelledby="reviews-title">
      <div className="container">
        <SectionHeading
          id="reviews-title"
          numeral="IV"
          eyebrow={lang === 'es' ? 'Testimonios' : 'Testimonials'}
          title={lang === 'es' ? 'Lo que dicen nuestros huéspedes' : 'What our guests say'}
          subtitle={lang === 'es'
            ? 'Destacan la limpieza, la ubicación y la atención de Johnny.'
            : 'They highlight the cleanliness, location, and Johnny\'s hospitality.'}
          tone="light"
        />

        {/* Overall rating block */}
        <Reveal className="reviews__overall">
          <div className="reviews__score">
            <Sunburst className="reviews__score-sun" rays={36} />
            <CountUp to={overall.score} decimals={2} className="reviews__score-number" />
            <motion.div
              className="reviews__score-stars"
              aria-label={lang === 'es' ? '5 estrellas' : '5 stars'}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.4 } } }}
            >
              {Array.from({ length: overall.stars }).map((_, i) => (
                <motion.span
                  key={i}
                  aria-hidden="true"
                  variants={{ hidden: { opacity: 0, scale: 0, rotate: -120 }, visible: { opacity: 1, scale: 1, rotate: 0 } }}
                  transition={{ type: 'spring', stiffness: 260, damping: 14 }}
                >
                  ★
                </motion.span>
              ))}
            </motion.div>
            <p className="reviews__score-label">
              {lang === 'es' ? `de ${overall.totalReviews} reseñas` : `from ${overall.totalReviews} reviews`}
            </p>
            <p className="reviews__verified">
              {lang === 'es' ? 'Reseñas verificadas a través de Airbnb' : 'Verified reviews through Airbnb'}
            </p>
          </div>

          <div className="reviews__categories">
            {cats.map((cat, idx) => (
              <div key={idx} className="reviews__category">
                <span className="reviews__cat-label">{t(cat.name)}</span>
                <div className="reviews__bar">
                  <motion.div
                    className="reviews__bar-fill"
                    initial={{ width: 0 }}
                    whileInView={{ width: cat.barWidth }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, delay: 0.2 + idx * 0.08, ease: EASE_DECO }}
                  />
                </div>
                <CountUp to={cat.score} decimals={1} delay={0.2 + idx * 0.08} className="reviews__cat-score" />
              </div>
            ))}
          </div>
        </Reveal>

        {/* Review cards */}
        <Stagger className="reviews__grid" stagger={0.12}>
          {reviews.map((review, idx) => (
            <StaggerItem key={idx} variants={fadeUp}>
              <motion.article
                className="review-card"
                whileHover={{ y: -8, rotate: idx % 2 === 0 ? -0.6 : 0.6 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              >
                <span className="review-card__quote" aria-hidden="true">&ldquo;</span>
                <div
                  className="review-card__stars"
                  aria-label={`${review.rating} ${lang === 'es' ? 'estrellas' : 'stars'}`}
                >
                  {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                </div>
                <p className="review-card__text">{t(review.text)}</p>
                <div className="review-card__header">
                  <div className="review-card__avatar" aria-hidden="true">{review.avatar}</div>
                  <div className="review-card__meta">
                    <strong className="review-card__name">{review.author}</strong>
                    <span className="review-card__location">{t(review.location)} · {t(review.date)}</span>
                    <span className="review-card__badge">
                      <i className="fas fa-check-circle" aria-hidden="true"></i>{' '}
                      {lang === 'es' ? 'Reserva verificada en Airbnb' : 'Verified Airbnb booking'}
                    </span>
                  </div>
                </div>
              </motion.article>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="reviews__cta">
          <motion.a
            href={airbnbUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--ink"
            onClick={() => trackAirbnbClick('reviews_cta')}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            {lang === 'es' ? 'Ver todas las reseñas en Airbnb' : 'See all reviews on Airbnb'}
            <i className="fas fa-arrow-right" aria-hidden="true"></i>
          </motion.a>
        </Reveal>
      </div>
    </section>
  );
}
