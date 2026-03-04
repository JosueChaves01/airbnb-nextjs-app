'use client';

import { useState, useEffect } from 'react';
import galleryData from '@/app/lib/data/gallery.json';

interface GalleryImage {
  src: string;
  alt: string;
  caption: { es: string; en: string };
  modifier: string;
}

export function Gallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

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
          {galleryData.title.es}
        </h2>

        <div className="gallery__actions fade-in">
          <button
            className="btn btn--secondary"
            type="button"
            onClick={() => openLightbox(0)}
          >
            Mostrar todas las fotos
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
              aria-label={`Abrir foto: ${img.alt}`}
              onClick={() => openLightbox(idx)}
              onKeyDown={(e) => e.key === 'Enter' && openLightbox(idx)}
            >
              <img src={img.src} alt={img.alt} loading="lazy" />
              <figcaption>{img.caption.es}</figcaption>
            </figure>
          ))}
        </div>

        {/* Inline Lightbox — matches original .lightbox.active pattern */}
        <div
          className={`lightbox${lightboxOpen ? ' active' : ''}`}
          id="galleryLightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Imagen ampliada"
        >
          <button
            className="lightbox__close"
            type="button"
            aria-label="Cerrar"
            onClick={closeLightbox}
          >
            <i className="fas fa-times"></i>
          </button>
          <button
            className="lightbox__nav lightbox__prev"
            type="button"
            aria-label="Foto anterior"
            onClick={handlePrev}
          >
            ‹
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="lightbox__img" src={current?.src} alt={current?.alt ?? ''} />
          <div className="lightbox__caption">{current?.caption?.es}</div>
          <div className="lightbox__counter">{activeIndex + 1} / {images.length}</div>
          <button
            className="lightbox__nav lightbox__next"
            type="button"
            aria-label="Siguiente foto"
            onClick={handleNext}
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
