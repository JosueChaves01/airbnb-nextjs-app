'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
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

  const lightboxRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

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

    if (lightboxOpen) {
      // save last focused element and move focus into lightbox
      lastFocusedRef.current = document.activeElement as HTMLElement;
      setTimeout(() => closeButtonRef.current?.focus(), 0);
      document.body.style.overflow = 'hidden';
    } else {
      // restore focus
      document.body.style.overflow = '';
      lastFocusedRef.current?.focus();
    }

    window.addEventListener('keydown', handleKey);
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
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
              <Image 
                src={img.src} 
                alt={img.alt} 
                width={img.modifier === 'wide' ? 800 : 400} 
                height={img.modifier === 'tall' ? 600 : 300}
                className="object-cover"
              />
              <figcaption>{t(img.caption)}</figcaption>
            </figure>
          ))}
        </div>

        {/* Inline Lightbox */}
        <div
          ref={lightboxRef}
          className={`lightbox${lightboxOpen ? ' active' : ''}`}
          id="galleryLightbox"
          role="dialog"
          aria-modal="true"
          aria-label={lang === 'es' ? 'Imagen ampliada' : 'Enlarged image'}
        >
          <button
            ref={closeButtonRef}
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
          <div className="lightbox__img-container">
            <Image 
              src={current?.src ?? ''} 
              alt={current?.alt ?? ''} 
              fill 
              className="lightbox__img" 
              style={{ objectFit: 'contain' }}
            />
          </div>
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
