'use client';

import { useState } from 'react';

interface DiscoverImage {
  src: string;
  alt: string;
  menuUrl?: string;
}

interface DiscoverItem {
  number: string;
  title: string;
  description: string;
  images: DiscoverImage[];
  placeholders: number;
}

const items: DiscoverItem[] = [
  {
    number: '01',
    title: 'Gastronomía Local',
    description:
      'Sabores auténticos a 5 minutos caminando. Disfruta de la cocina tradicional costarricense con ingredientes frescos de la zona.',
    images: [
      {
        src: '/assets/Restaurante1.png',
        alt: 'Restaurante local 1',
        menuUrl: 'https://www.instagram.com/distrito06cr?igsh=MTRoNTVxZzhpZGx1aw%3D%3D&utm_source=qr',
      },
      {
        src: '/assets/Restaurante2.png',
        alt: 'Restaurante local 2',
        menuUrl: 'https://drive.google.com/file/d/1fGYPgTQr1CwtT2f79ydE86t7cCgZwRmH/view',
      },
    ],
    placeholders: 2,
  },
  {
    number: '02',
    title: 'Campo de Girasoles',
    description:
      'A solo 1.5 km de distancia, un paisaje dorado que enamora. Perfecto para fotografías inolvidables y momentos románticos.',
    images: [
      { src: '/assets/Girasoles.png', alt: 'Campo de girasoles 1' },
      { src: '/assets/Girasoles2.png', alt: 'Campo de girasoles 2' },
    ],
    placeholders: 0,
  },
  {
    number: '03',
    title: 'Naturaleza de San Carlos',
    description:
      'A 20 minutos, descubre ríos cristalinos, volcanes y una biodiversidad única. La aventura te espera en cada rincón.',
    images: [
      { src: '/assets/Volcan.png', alt: 'Volcán de la zona' },
      { src: '/assets/Laguna.jpg', alt: 'Laguna natural' },
    ],
    placeholders: 0,
  },
];

export function Discover() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<DiscoverImage | null>(null);

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
            Descubre Pital
          </h2>
          <p className="discover__subtitle fade-in">
            Explora los tesoros naturales y gastronómicos que rodean tu alojamiento
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
                <h3>{item.title}</h3>
                <p>{item.description}</p>

                <div className="discover__gallery">
                  {item.images.map((img, imgIdx) => (
                    <div
                      key={imgIdx}
                      className="discover__image"
                      tabIndex={0}
                      role="button"
                      aria-label="Ver imagen ampliada"
                      onClick={() => openLightbox(img)}
                      onKeyDown={(e) => e.key === 'Enter' && openLightbox(img)}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img.src} alt={img.alt} loading="lazy" />
                    </div>
                  ))}

                  {Array.from({ length: item.placeholders }).map((_, pIdx) => (
                    <div
                      key={`ph-${pIdx}`}
                      className="discover__image discover__image--placeholder"
                    >
                      <span>+</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Discover Lightbox — outside section, matches original structure */}
      <div
        className={`lightbox discover-lightbox${lightboxOpen ? ' active' : ''}`}
        id="discoverLightbox"
        role="dialog"
        aria-modal="true"
        aria-label="Imagen ampliada"
      >
        <button
          className="lightbox__close discover-lightbox__close"
          type="button"
          aria-label="Cerrar"
          onClick={closeLightbox}
        >
          <i className="fas fa-times"></i>
        </button>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        {currentImage && (
          <img
            className="discover-lightbox__img"
            src={currentImage.src}
            alt={currentImage.alt}
          />
        )}

        {currentImage?.menuUrl ? (
          <a
            href={currentImage.menuUrl}
            className="discover-lightbox__caption"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ver restaurante en Instagram (enlace externo)"
          >
            <i className="fab fa-instagram"></i>
            <span>Ver en Instagram</span>
          </a>
        ) : null}
      </div>
    </>
  );
}
