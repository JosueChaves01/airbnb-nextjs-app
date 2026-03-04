'use client';

import { useState, useEffect } from 'react';
import galleryData from '@/app/lib/data/gallery.json';
import { useLanguage } from '@/app/context/LanguageContext';

interface GalleryImage {
  src: string;
  alt: string;
  caption: { es: string; en: string };
  modifier: string;
}

export function Gallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const { lang, t } = useLanguage();

  const images: GalleryImage[] = galleryData.images;

  const openLightbox = (idx: number) => {
    setActiveIndex(idx);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const handlePrev = () =>
    setActiveIndex((i) => (i - 1 + images.length) % images.length);

  const handleNext = () =>
    setActiveIndex((i) => (i + 1) % images.length);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxOpen, activeIndex]);

  const current = images[activeIndex];

  return (
    <section className="gallery" id="galeria" aria-labelledby="gallery-title">
      <div className="container">
        <h2 className="section-title fade-in" id="gallery-title">
          {t(galleryData.title)}
        </h2>

        <div className="gallery__actions fade-in">
          <button
            className="btn btn--secondary"
            type="button"
            onClick={() => openLightbox(0)}
          >
            {lang === 'es' ? 'Mostrar todas las fotos' : 'Show all photos'}
          </button>
        </div>

        <div className="gallery__grid">
          {images.map((img, idx) => (
            <figure
              key={idx}
              className={[
                'gallery__item',
                img.modifier === 'wide' ? 'gallery__item--wide' : '',
                img.modifier === 'tall' ? 'gallery__item--tall' : '',
                'fade-in',
              ].filter(Boolean).join(' ')}
              tabIndex={0}
              role="button"
              aria-label={lang === 'es' ? `Abrir foto: ${img.alt}` : `Open photo: ${img.alt}`}
              onClick={() => openLightbox(idx)}
              onKeyDown={(e) => e.key === 'Enter' && openLightbox(idx)}
            >
              <img src={img.src} alt={img.alt} loading="lazy" />
              <figcaption>{t(img.caption)}</figcaption>
            </figure>
          ))}
        </div>

        {/* Inline Lightbox */}
        <div
          className={`lightbox${lightboxOpen ? ' active' : ''}`}
          id="galleryLightbox"
          role="dialog"
          aria-modal="true"
          aria-label={lang === 'es' ? 'Imagen ampliada' : 'Enlarged image'}
        >
          <button
            className="lightbox__close"
            type="button"
            aria-label={lang === 'es' ? 'Cerrar' : 'Close'}
            onClick={closeLightbox}
          >
            <i className="fas fa-times"></i>
          </button>
          <button
            className="lightbox__nav lightbox__prev"
            type="button"
            aria-label={lang === 'es' ? 'Foto anterior' : 'Previous photo'}
            onClick={handlePrev}
          >
            ‹
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="lightbox__img" src={current?.src} alt={current?.alt ?? ''} />
          <div className="lightbox__caption">{current ? t(current.caption) : ''}</div>
          <div className="lightbox__counter">{activeIndex + 1} / {images.length}</div>
          <button
            className="lightbox__nav lightbox__next"
            type="button"
            aria-label={lang === 'es' ? 'Siguiente foto' : 'Next photo'}
            onClick={handleNext}
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
