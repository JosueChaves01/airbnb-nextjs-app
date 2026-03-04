'use client';

import reviewsData from '@/app/lib/data/reviews.json';
import { useLanguage } from '@/app/context/LanguageContext';

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
    <section className="reviews" id="resenas" aria-labelledby="reviews-title">
      <div className="container">
        <h2 className="section-title fade-in" id="reviews-title">
          {lang === 'es' ? 'Lo que dicen nuestros huéspedes' : 'What our guests say'}
        </h2>
        <p className="section-subtitle fade-in">
          {lang === 'es'
            ? 'Destacan la limpieza, la ubicación y la atención de Johnny.'
            : 'They highlight the cleanliness, location, and Johnny\'s hospitality.'}
        </p>

        {/* Overall rating block */}
        <div className="reviews__overall fade-in" id="reviewsOverall">
          <div className="reviews__score">
            <span
              className="reviews__score-number animate-count"
              data-target={overall.score}
              data-decimals="2"
            >
              0
            </span>
            <div
              className="reviews__score-stars animate-stars"
              aria-label={lang === 'es' ? '5 estrellas' : '5 stars'}
            >
              ★★★★★
            </div>
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
                  <div className="reviews__bar-fill" style={{ width: cat.barWidth }}></div>
                </div>
                <span
                  className="reviews__cat-score animate-count"
                  data-target={cat.score}
                  data-decimals="1"
                >
                  0
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Review cards */}
        <div className="reviews__grid">
          {reviews.map((review, idx) => (
            <article key={idx} className="review-card fade-in">
              <div className="review-card__header">
                <div className="review-card__avatar" aria-hidden="true">{review.avatar}</div>
                <div className="review-card__meta">
                  <strong className="review-card__name">{review.author}</strong>
                  <span className="review-card__location">{t(review.location)}</span>
                  <span className="review-card__badge">
                    {lang === 'es' ? 'Reserva verificada en Airbnb' : 'Verified Airbnb booking'}
                  </span>
                </div>
                <div className="review-card__date">{t(review.date)}</div>
              </div>
              <div
                className="review-card__stars"
                aria-label={`${review.rating} ${lang === 'es' ? 'estrellas' : 'stars'}`}
              >
                {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
              </div>
              <p className="review-card__text">{t(review.text)}</p>
            </article>
          ))}
        </div>

        <div className="reviews__cta fade-in">
          <a
            href={airbnbUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--secondary"
          >
            {lang === 'es' ? 'Ver todas las reseñas en Airbnb' : 'See all reviews on Airbnb'}
          </a>
        </div>

        <div className="scroll-dots" aria-hidden="true">
          <span></span><span></span><span></span>
        </div>
      </div>
    </section>
  );
}
