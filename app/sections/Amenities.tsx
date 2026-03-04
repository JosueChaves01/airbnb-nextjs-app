'use client';

import { useState } from 'react';
import amenitiesData from '@/app/lib/data/amenities.json';
import { useLanguage } from '@/app/context/LanguageContext';

interface AmenityItem {
  icon: string;
  label: { es: string; en: string };
}

interface AmenityGroup {
  title: { es: string; en: string };
  items: AmenityItem[];
}

export function Amenities() {
  const [showExtra, setShowExtra] = useState(false);
  const { lang, t } = useLanguage();
  const groups: AmenityGroup[] = amenitiesData.groups;
  const extra: AmenityItem[] = amenitiesData.extra;

  return (
    <section className="amenities" id="amenidades" aria-labelledby="amenities-title">
      <div className="container">
        <h2 className="section-title fade-in" id="amenities-title">
          {lang === 'es' ? 'Todo lo que necesitas' : 'Everything you need'}
        </h2>

        <div className="amenities__groups fade-in" aria-label={lang === 'es' ? 'Amenidades clave' : 'Key amenities'}>
          {groups.map((group, gIdx) => (
            <article key={gIdx} className="amenities-group">
              <h3 className="amenities-group__title">{t(group.title)}</h3>
              <div className="amenities__grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                {group.items.map((item, iIdx) => (
                  <div key={iIdx} className="amenity-item">
                    <span className="amenity-item__icon">
                      <i className={`fas fa-${item.icon}`}></i>
                    </span>
                    <span className="amenity-item__label">{t(item.label)}</span>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div
          className="amenities__extra fade-in"
          id="amenities-extra"
          hidden={!showExtra}
          aria-hidden={!showExtra}
        >
          <div className="amenities__grid">
            {extra.map((item, idx) => (
              <div key={idx} className="amenity-item">
                <span className="amenity-item__icon">
                  <i className={`fas fa-${item.icon}`}></i>
                </span>
                <span className="amenity-item__label">{t(item.label)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="amenities__cta fade-in">
          <button
            type="button"
            className="btn btn--secondary"
            id="amenitiesToggle"
            aria-expanded={showExtra}
            aria-controls="amenities-extra"
            onClick={() => setShowExtra(!showExtra)}
          >
            {showExtra
              ? (lang === 'es' ? 'Ver menos' : 'Show less')
              : (lang === 'es' ? 'Ver todas las amenidades' : 'Show all amenities')
            }
          </button>
        </div>
      </div>
    </section>
  );
}
