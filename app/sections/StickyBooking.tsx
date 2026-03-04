'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/app/context/LanguageContext';

export function StickyBooking() {
  const [isVisible, setIsVisible] = useState(false);
  const { lang } = useLanguage();

  useEffect(() => {
    const onScroll = () => {
      setIsVisible(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={`sticky-booking${isVisible ? ' is-visible' : ''}`}
      id="stickyBooking"
      aria-hidden={!isVisible}
    >
      <div className="sticky-booking__content">
        <div className="sticky-booking__meta">
          <span className="sticky-booking__title">
            {lang === 'es' ? 'Romántico con tina' : 'Romantic with bathtub'}
          </span>
          <span className="sticky-booking__rating">★ 4.94</span>
        </div>
        <a
          className="btn btn--primary sticky-booking__cta"
          href="https://www.airbnb.co.cr/rooms/683377270994372545"
          target="_blank"
          rel="noopener noreferrer"
        >
          {lang === 'es' ? 'Reservar' : 'Book now'}
        </a>
      </div>
    </div>
  );
}
