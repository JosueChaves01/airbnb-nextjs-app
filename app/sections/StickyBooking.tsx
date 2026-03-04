'use client';

import { useState, useEffect } from 'react';

export function StickyBooking() {
  const [isVisible, setIsVisible] = useState(false);

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
          <span className="sticky-booking__title">Romántico con tina</span>
          <span className="sticky-booking__rating">★ 4.94</span>
        </div>
        <a
          className="btn btn--primary sticky-booking__cta"
          href="https://www.airbnb.co.cr/rooms/683377270994372545"
          target="_blank"
          rel="noopener noreferrer"
        >
          Reservar
        </a>
      </div>
    </div>
  );
}
