'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import galleryData from '@/app/lib/data/gallery.json';
import { useLanguage } from '@/app/context/LanguageContext';
import { Portal } from '@/app/components/Portal';
import { SectionHeading, CornerFrame } from '@/app/components/deco/Ornaments';
import { Reveal, Stagger, StaggerItem, EASE_DECO } from '@/app/components/motion/Reveal';

interface GalleryImage {
  src: string;
  alt: string;
  caption: { es: string; en: string };
  modifier: string;
}

const slide = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 120, scale: 0.96 }),
  center: { opacity: 1, x: 0, scale: 1 },
  exit: (dir: number) => ({ opacity: 0, x: dir * -120, scale: 0.96 }),
};

export function Gallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [[activeIndex, direction], setActive] = useState<[number, number]>([0, 0]);
  const { lang, t } = useLanguage();

  const lightboxRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  const images: GalleryImage[] = galleryData.images;

  const openLightbox = (idx: number) => {
    lastFocusedRef.current = document.activeElement as HTMLElement;
    setActive([idx, 0]);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const handlePrev = () =>
    setActive(([i]) => [(i - 1 + images.length) % images.length, -1]);

  const handleNext = () =>
    setActive(([i]) => [(i + 1) % images.length, 1]);

  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();

      // Trap focus inside lightbox
      if (e.key === 'Tab' && lightboxRef.current) {
        const focusable = lightboxRef.current.querySelectorAll<HTMLElement>("button, [href], input, textarea, select, [tabindex]:not([tabindex='-1'])");
        if (focusable.length === 0) { e.preventDefault(); return; }
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };

    setTimeout(() => closeButtonRef.current?.focus(), 0);
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
      lastFocusedRef.current?.focus();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxOpen]);

  const current = images[activeIndex];

  return (
    <section className="section section--ink gallery" id="galeria" aria-labelledby="gallery-title">
      <div className="container">
        <SectionHeading
          id="gallery-title"
          numeral="II"
          eyebrow={lang === 'es' ? 'El refugio' : 'The retreat'}
          title={t(galleryData.title)}
        />

        <Stagger className="gallery__grid" stagger={0.1}>
          {images.map((img, idx) => (
            <StaggerItem
              key={idx}
              className={[
                'gallery__cell',
                img.modifier === 'wide' ? 'gallery__cell--wide' : '',
                img.modifier === 'tall' ? 'gallery__cell--tall' : '',
              ].filter(Boolean).join(' ')}
              variants={{
                hidden: { opacity: 0, clipPath: 'inset(12% 12% 12% 12%)' },
                visible: { opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 1, ease: EASE_DECO } },
              }}
            >
              <motion.figure
                className="gallery__item"
                tabIndex={0}
                role="button"
                aria-label={lang === 'es' ? `Abrir foto: ${img.alt}` : `Open photo: ${img.alt}`}
                onClick={() => openLightbox(idx)}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), openLightbox(idx))}
                initial="rest"
                whileHover="hover"
                whileFocus="hover"
                animate="rest"
              >
                <motion.div
                  className="gallery__img"
                  variants={{ rest: { scale: 1 }, hover: { scale: 1.08 } }}
                  transition={{ duration: 0.9, ease: EASE_DECO }}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes={img.modifier === 'wide' ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 100vw, 33vw'}
                    className="object-cover"
                  />
                </motion.div>
                <motion.span
                  className="gallery__veil"
                  aria-hidden="true"
                  variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
                />
                <CornerFrame className="gallery__corners" />
                <figcaption className="gallery__caption">
                  <span className="gallery__caption-num" aria-hidden="true">{String(idx + 1).padStart(2, '0')}</span>
                  <motion.span
                    variants={{ rest: { y: 6, opacity: 0.85 }, hover: { y: 0, opacity: 1 } }}
                    transition={{ duration: 0.5, ease: EASE_DECO }}
                  >
                    {t(img.caption)}
                  </motion.span>
                </figcaption>
              </motion.figure>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="gallery__actions">
          <motion.button
            className="btn btn--outline-gold"
            type="button"
            onClick={() => openLightbox(0)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <i className="fas fa-images" aria-hidden="true"></i>
            {lang === 'es' ? 'Mostrar todas las fotos' : 'Show all photos'}
          </motion.button>
        </Reveal>
      </div>

      <Portal>
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            ref={lightboxRef}
            className="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={lang === 'es' ? 'Imagen ampliada' : 'Enlarged image'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={(e) => e.target === e.currentTarget && closeLightbox()}
          >
            <button
              ref={closeButtonRef}
              className="lightbox__close"
              type="button"
              aria-label={lang === 'es' ? 'Cerrar' : 'Close'}
              onClick={closeLightbox}
            >
              <i className="fas fa-times" aria-hidden="true"></i>
            </button>
            <button
              className="lightbox__nav lightbox__prev"
              type="button"
              aria-label={lang === 'es' ? 'Foto anterior' : 'Previous photo'}
              onClick={handlePrev}
            >
              <i className="fas fa-chevron-left" aria-hidden="true"></i>
            </button>

            <div className="lightbox__stage">
              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div
                  key={activeIndex}
                  className="lightbox__img-container"
                  custom={direction}
                  variants={slide}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.55, ease: EASE_DECO }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.4}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -80) handleNext();
                    else if (info.offset.x > 80) handlePrev();
                  }}
                >
                  <Image
                    src={current.src}
                    alt={current.alt}
                    fill
                    sizes="90vw"
                    className="lightbox__img"
                    style={{ objectFit: 'contain' }}
                    draggable={false}
                  />
                </motion.div>
              </AnimatePresence>
              <CornerFrame className="lightbox__corners" />
            </div>

            <div className="lightbox__meta">
              <span className="lightbox__caption">{t(current.caption)}</span>
              <span className="lightbox__counter">
                {String(activeIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
              </span>
            </div>

            <button
              className="lightbox__nav lightbox__next"
              type="button"
              aria-label={lang === 'es' ? 'Siguiente foto' : 'Next photo'}
              onClick={handleNext}
            >
              <i className="fas fa-chevron-right" aria-hidden="true"></i>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      </Portal>
    </section>
  );
}
