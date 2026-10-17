'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLanguage } from '@/app/context/LanguageContext';
import { trackAirbnbClick } from '@/app/lib/analytics';
import { EASE_DECO } from '@/app/components/motion/Reveal';

export function StickyBooking() {
  const [isVisible, setIsVisible] = useState(false);
  const { lang } = useLanguage();

  useEffect(() => {
    const onScroll = () => {
      setIsVisible(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="sticky-booking"
          id="stickyBooking"
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ duration: 0.6, ease: EASE_DECO }}
        >
          <div className="sticky-booking__content">
            <div className="sticky-booking__meta">
              <span className="sticky-booking__title">
                {lang === 'es' ? 'Romántico con tina' : 'Romantic with bathtub'}
              </span>
              <span className="sticky-booking__rating">★ 4.94</span>
            </div>
            <motion.a
              className="btn btn--gold sticky-booking__cta"
              href="https://www.airbnb.co.cr/rooms/683377270994372545"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={lang === 'es' ? 'Reservar alojamiento (se abre en una nueva pestaña)' : 'Book accommodation (opens in new tab)'}
              onClick={() => trackAirbnbClick('sticky_booking')}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              {lang === 'es' ? 'Reservar' : 'Book now'}
            </motion.a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
