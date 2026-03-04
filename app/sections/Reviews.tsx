import reviewsData from '@/app/lib/data/reviews.json';

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
  const { overall, categories, featured, airbnbUrl } = reviewsData;
  const cats: ReviewCategory[] = categories as ReviewCategory[];
  const reviews: ReviewCard[] = featured as ReviewCard[];

  return (
    <section className="reviews" id="resenas" aria-labelledby="reviews-title">
      <div className="container">
        <h2 className="section-title fade-in" id="reviews-title">
          Lo que dicen nuestros huéspedes
        </h2>
        <p className="section-subtitle fade-in">
          Destacan la limpieza, la ubicación y la atención de Johnny.
        </p>

        {/* Overall rating block */}
        <div className="reviews__overall fade-in" id="reviewsOverall">
          <div className="reviews__score">
            {/* animate-count picks up data-target & data-decimals for the JS counter animation */}
            <span
              className="reviews__score-number animate-count"
              data-target={overall.score}
              data-decimals="2"
            >
              0
            </span>
            <div
              className="reviews__score-stars animate-stars"
              aria-label="5 estrellas"
            >
              ★★★★★
            </div>
            <p className="reviews__score-label">de {overall.totalReviews} reseñas</p>
            <p className="reviews__verified">Reseñas verificadas a través de Airbnb</p>
          </div>
          <div className="reviews__categories">
            {cats.map((cat, idx) => (
              <div key={idx} className="reviews__category">
                <span className="reviews__cat-label">{cat.name.es}</span>
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
                  <span className="review-card__location">{review.location.es}</span>
                  <span className="review-card__badge">Reserva verificada en Airbnb</span>
                </div>
                <div className="review-card__date">{review.date.es}</div>
              </div>
              <div
                className="review-card__stars"
                aria-label={`${review.rating} estrellas`}
              >
                {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
              </div>
              <p className="review-card__text">{review.text.es}</p>
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
            Ver todas las reseñas en Airbnb
          </a>
        </div>

        <div className="scroll-dots" aria-hidden="true">
          <span></span><span></span><span></span>
        </div>
      </div>
    </section>
  );
}
