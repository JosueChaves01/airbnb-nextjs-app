'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import amenitiesData from '@/app/lib/data/amenities.json';
import { useLanguage } from '@/app/context/LanguageContext';
import { SectionHeading } from '@/app/components/deco/Ornaments';
import { Reveal, Stagger, StaggerItem, fadeUp, EASE_DECO } from '@/app/components/motion/Reveal';

interface AmenityItem {
  icon: string;
  label: { es: string; en: string };
}

interface AmenityGroup {
  title: { es: string; en: string };
  items: AmenityItem[];
}

function Amenity({ item, label }: { item: AmenityItem; label: string }) {
  return (
    <motion.div className="amenity-item" whileHover={{ x: 6 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
      <span className="amenity-item__icon">
        <i className={`fas fa-${item.icon}`} aria-hidden="true"></i>
      </span>
      <span className="amenity-item__label">{label}</span>
    </motion.div>
  );
}

export function Amenities() {
  const [showExtra, setShowExtra] = useState(false);
  const { lang, t } = useLanguage();
  const groups: AmenityGroup[] = amenitiesData.groups;
  const extra: AmenityItem[] = amenitiesData.extra;

  return (
    <section className="section section--emerald amenities" id="amenidades" aria-labelledby="amenities-title">
      <div className="container">
        <SectionHeading
          id="amenities-title"
          numeral="III"
          eyebrow={lang === 'es' ? 'Comodidades' : 'Comforts'}
          title={lang === 'es' ? 'Todo lo que necesitas' : 'Everything you need'}
        />

        <Stagger className="amenities__groups" stagger={0.15}>
          {groups.map((group, gIdx) => (
            <StaggerItem key={gIdx} variants={fadeUp} className="amenities-group">
              <h3 className="amenities-group__title">
                <span className="amenities-group__index" aria-hidden="true">0{gIdx + 1}</span>
                {t(group.title)}
              </h3>
              <div className="amenities-group__list">
                {group.items.map((item, iIdx) => (
                  <Amenity key={iIdx} item={item} label={t(item.label)} />
                ))}
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <AnimatePresence initial={false}>
          {showExtra && (
            <motion.div
              className="amenities__extra"
              id="amenities-extra"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.6, ease: EASE_DECO }}
            >
              <motion.div
                className="amenities__extra-grid"
                initial="hidden"
                animate="visible"
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05, delayChildren: 0.15 } } }}
              >
                {extra.map((item, idx) => (
                  <motion.div key={idx} variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}>
                    <Amenity item={item} label={t(item.label)} />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <Reveal className="amenities__cta">
          <motion.button
            type="button"
            className="btn btn--outline-gold"
            aria-expanded={showExtra}
            aria-controls="amenities-extra"
            onClick={() => setShowExtra(!showExtra)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            {showExtra
              ? (lang === 'es' ? 'Ver menos' : 'Show less')
              : (lang === 'es' ? 'Ver todas las amenidades' : 'Show all amenities')
            }
            <motion.i
              className="fas fa-chevron-down"
              aria-hidden="true"
              animate={{ rotate: showExtra ? 180 : 0 }}
              transition={{ duration: 0.4, ease: EASE_DECO }}
            />
          </motion.button>
        </Reveal>
      </div>
    </section>
  );
}
