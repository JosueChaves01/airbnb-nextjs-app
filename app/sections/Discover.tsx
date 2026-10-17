'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { trackInstagramClick } from '@/app/lib/analytics';
import { useLanguage } from '@/app/context/LanguageContext';
import { Portal } from '@/app/components/Portal';
import { SectionHeading, CornerFrame } from '@/app/components/deco/Ornaments';
import { EASE_DECO } from '@/app/components/motion/Reveal';

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
  const [currentImage, setCurrentImage] = useState<DiscoverImage | null>(null);
  const { lang, t } = useLanguage();
  const timelineRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ['start 70%', 'end 60%'] });
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 28, mass: 0.4 });

  const openLightbox = (image: DiscoverImage) => {
    lastFocusedRef.current = document.activeElement as HTMLElement;
    setCurrentImage(image);
  };

  const closeLightbox = () => setCurrentImage(null);

  useEffect(() => {
    if (!currentImage) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setCurrentImage(null);
    document.body.style.overflow = 'hidden';
    setTimeout(() => closeRef.current?.focus(), 0);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      lastFocusedRef.current?.focus();
    };
  }, [currentImage]);

  return (
    <>
      <section className="section section--emerald discover" id="descubre" aria-labelledby="discover-title">
        <div className="container">
          <SectionHeading
            id="discover-title"
            numeral="VI"
            eyebrow={lang === 'es' ? 'Alrededores' : 'Surroundings'}
            title={lang === 'es' ? 'Descubre Pital' : 'Discover Pital'}
            subtitle={lang === 'es'
              ? 'Explora los tesoros naturales y gastronómicos que rodean tu alojamiento'
              : 'Explore the natural and gastronomic treasures surrounding your stay'}
          />

          <div className="discover__timeline" ref={timelineRef}>
            <div className="discover__track" aria-hidden="true">
              <motion.div className="discover__progress" style={{ scaleY: progress }} />
            </div>

            {items.map((item, idx) => (
              <motion.div
                key={item.number}
                className={`discover__item${idx % 2 === 1 ? ' discover__item--reverse' : ''}`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '0px 0px -120px 0px' }}
              >
                <motion.div
                  className="discover__marker"
                  aria-hidden="true"
                  variants={{ hidden: { scale: 0, rotate: -45 }, visible: { scale: 1, rotate: 45 } }}
                  transition={{ type: 'spring', stiffness: 220, damping: 16 }}
                >
                  <span>{item.number}</span>
                </motion.div>

                <motion.div
                  className="discover__content"
                  variants={{ hidden: { opacity: 0, x: idx % 2 === 1 ? 60 : -60 }, visible: { opacity: 1, x: 0 } }}
                  transition={{ duration: 0.9, ease: EASE_DECO }}
                >
                  <span className="discover__number" aria-hidden="true">{item.number}</span>
                  <h3>{t(item.title)}</h3>
                  <p>{t(item.description)}</p>
                </motion.div>

                <motion.div
                  className="discover__gallery"
                  variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } } }}
                >
                  {item.images.map((img, imgIdx) => (
                    <motion.div
                      key={imgIdx}
                      className="discover__image"
                      tabIndex={0}
                      role="button"
                      aria-label={lang === 'es' ? 'Ver imagen ampliada' : 'View enlarged image'}
                      onClick={() => openLightbox(img)}
                      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), openLightbox(img))}
                      variants={{ hidden: { opacity: 0, y: 40, clipPath: 'inset(0 0 100% 0)' }, visible: { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' } }}
                      transition={{ duration: 0.9, ease: EASE_DECO }}
                      whileHover={{ y: -6 }}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="(max-width: 768px) 50vw, 22vw"
                        className="object-cover"
                      />
                      <span className="discover__image-zoom" aria-hidden="true">
                        <i className="fas fa-expand"></i>
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Discover Lightbox */}
      <Portal>
      <AnimatePresence>
        {currentImage && (
          <motion.div
            className="lightbox discover-lightbox"
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
              ref={closeRef}
              className="lightbox__close"
              type="button"
              aria-label={lang === 'es' ? 'Cerrar' : 'Close'}
              onClick={closeLightbox}
            >
              <i className="fas fa-times" aria-hidden="true"></i>
            </button>

            <motion.div
              className="lightbox__stage"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.5, ease: EASE_DECO }}
            >
              <div className="lightbox__img-container">
                <Image
                  src={currentImage.src}
                  alt={currentImage.alt}
                  fill
                  sizes="90vw"
                  className="lightbox__img"
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <CornerFrame className="lightbox__corners" />
            </motion.div>

            {currentImage.menuUrl ? (
              <motion.a
                href={currentImage.menuUrl}
                className="btn btn--gold discover-lightbox__caption"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={lang === 'es' ? 'Ver restaurante en Instagram (enlace externo)' : 'View restaurant on Instagram (external link)'}
                onClick={() => trackInstagramClick('discover_distrito06')}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
              >
                <i className="fab fa-instagram" aria-hidden="true"></i>
                <span>{lang === 'es' ? 'Ver en Instagram' : 'View on Instagram'}</span>
              </motion.a>
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>
      </Portal>
    </>
  );
}
