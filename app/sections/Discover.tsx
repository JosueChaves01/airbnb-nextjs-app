'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/app/context/LanguageContext';

interface DiscoverImage {
  src: string;
  alt: string;
  menuUrl?: string;
}

interface DiscoverItem {
  number: string;
  title: { es: string; en: string };
  description: { es: string; en: string };
  images: DiscoverImage[];
  placeholders: number;
}

const items: DiscoverItem[] = [
  {
    number: '01',
    title: { es: 'Gastronomía Local', en: 'Local Gastronomy' },
    description: {
      es: 'Sabores auténticos a 5 minutos caminando. Disfruta de la cocina tradicional costarricense con ingredientes frescos de la zona.',
      en: 'Authentic flavors just 5 minutes away on foot. Enjoy traditional Costa Rican cuisine with fresh local ingredients.',
    },
    images: [
      {
        src: '/assets/restaurante1.webp',
        alt: 'Restaurante local 1',
        menuUrl: 'https://www.instagram.com/distrito06cr?igsh=MTRoNTVxZzhpZGx1aw%3D%3D&utm_source=qr',
      },
      {
        src: '/assets/restaurante2.webp',
        alt: 'Restaurante local 2',
        menuUrl: 'https://drive.google.com/file/d/1fGYPgTQr1CwtT2f79ydE86t7cCgZwRmH/view',
      },
    ],
    placeholders: 2,
  },
  {
    number: '02',
    title: { es: 'Campo de Girasoles', en: 'Sunflower Fields' },
    description: {
      es: 'A solo 1.5 km de distancia, un paisaje dorado que enamora. Perfecto para fotografías inolvidables y momentos románticos.',
      en: 'Just 1.5 km away, a golden landscape that captivates. Perfect for unforgettable photos and romantic moments.',
    },
    images: [
      { src: '/assets/girasoles.webp', alt: 'Campo de girasoles 1' },
      { src: '/assets/girasoles2.webp', alt: 'Campo de girasoles 2' },
    ],
    placeholders: 0,
  },
  {
    number: '03',
    title: { es: 'Naturaleza de San Carlos', en: 'Nature of San Carlos' },
    description: {
      es: 'A 20 minutos, descubre ríos cristalinos, volcanes y una biodiversidad única. La aventura te espera en cada rincón.',
      en: 'Just 20 minutes away, discover crystal-clear rivers, volcanoes, and unique biodiversity. Adventure awaits around every corner.',
    },
    images: [
      { src: '/assets/volcan.webp', alt: 'Volcán de la zona' },
      { src: '/assets/laguna.webp', alt: 'Laguna natural' },
    ],
    placeholders: 0,
  },
];

export function Discover() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<DiscoverImage | null>(null);
  const { lang, t } = useLanguage();

  const openLightbox = (image: DiscoverImage) => {
    setCurrentImage(image);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setCurrentImage(null);
  };

  return (
    <>
      <section className="discover" id="descubre" aria-labelledby="discover-title">
        <div className="discover__header">
          <h2 className="section-title fade-in" id="discover-title">
            {lang === 'es' ? 'Descubre Pital' : 'Discover Pital'}
          </h2>
          <p className="discover__subtitle fade-in">
            {lang === 'es'
              ? 'Explora los tesoros naturales y gastronómicos que rodean tu alojamiento'
              : 'Explore the natural and gastronomic treasures surrounding your stay'}
          </p>
        </div>

        <div className="discover__timeline-container" id="discoverTimeline">
          <div className="discover__timeline-track"></div>
          <div className="discover__timeline-progress" id="timelineProgress"></div>

          {items.map((item) => (
            <div key={item.number} className="discover__item" data-timeline={item.number}>
              <div className="discover__item-marker">
                <div className="discover__item-dot"></div>
                <span className="discover__item-number">{item.number}</span>
              </div>

              <div className="discover__item-content">
                <h3>{t(item.title)}</h3>
                <p>{t(item.description)}</p>

                <div className="discover__gallery">
                  {item.images.map((img, imgIdx) => (
                    <div
                      key={imgIdx}
                      className="discover__image"
                      tabIndex={0}
                      role="button"
                      aria-label={lang === 'es' ? 'Ver imagen ampliada' : 'View enlarged image'}
                      onClick={() => openLightbox(img)}
                      onKeyDown={(e) => e.key === 'Enter' && openLightbox(img)}
                    >
                      <Image 
                        src={img.src} 
                        alt={img.alt} 
                        width={400} 
                        height={300} 
                        className="object-cover"
                      />
                    </div>
                  ))}

                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Discover Lightbox */}
      <div
        className={`lightbox discover-lightbox${lightboxOpen ? ' active' : ''}`}
        id="discoverLightbox"
        role="dialog"
        aria-modal="true"
        aria-label={lang === 'es' ? 'Imagen ampliada' : 'Enlarged image'}
      >
        <button
          className="lightbox__close discover-lightbox__close"
          type="button"
          aria-label={lang === 'es' ? 'Cerrar' : 'Close'}
          onClick={closeLightbox}
        >
          <i className="fas fa-times"></i>
        </button>

        {currentImage && (
          <div className="discover-lightbox__img-container">
            <Image
              src={currentImage.src}
              alt={currentImage.alt}
              fill
              className="discover-lightbox__img"
              style={{ objectFit: 'contain' }}
            />
          </div>
        )}

        {currentImage?.menuUrl ? (
          <a
            href={currentImage.menuUrl}
            className="discover-lightbox__caption"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={lang === 'es' ? 'Ver restaurante en Instagram (enlace externo)' : 'View restaurant on Instagram (external link)'}
          >
            <i className="fab fa-instagram"></i>
            <span>{lang === 'es' ? 'Ver en Instagram' : 'View on Instagram'}</span>
          </a>
        ) : null}
      </div>
    </>
  );
}
