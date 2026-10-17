'use client';

import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLanguage } from '@/app/context/LanguageContext';
import { Monogram, Sunburst } from '@/app/components/deco/Ornaments';
import { EASE_DECO } from '@/app/components/motion/Reveal';
import { Portal } from '@/app/components/Portal';

const navLinks = [
  { href: '#inicio',     es: 'Inicio',     en: 'Home' },
  { href: '#galeria',    es: 'Galería',    en: 'Gallery' },
  { href: '#resenas',    es: 'Reseñas',    en: 'Reviews' },
  { href: '#amenidades', es: 'Amenidades', en: 'Amenities' },
  { href: '#ubicacion',  es: 'Ubicación',  en: 'Location' },
  { href: '#contacto',   es: 'Contacto',   en: 'Contact' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen]         = useState(false);
  const [hovered, setHovered]       = useState<string | null>(null);
  const { lang, toggleLang } = useLanguage();

  const hamburgerRef = useRef<HTMLButtonElement | null>(null);
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile overlay if the viewport grows to desktop size.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 961px)');
    const onChange = () => mq.matches && setIsOpen(false);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    if (isOpen) setTimeout(() => firstLinkRef.current?.focus(), 50);
  }, [isOpen]);

  const closeMenu = () => {
    if (!isOpen) return;
    setIsOpen(false);
    hamburgerRef.current?.focus();
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        hamburgerRef.current?.focus();
      }
      if (e.key === 'Tab') {
        const focusable = [
          hamburgerRef.current,
          ...Array.from(menuRef.current?.querySelectorAll<HTMLElement>('a, button') ?? []),
        ].filter(Boolean) as HTMLElement[];
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen]);

  const renderLangToggle = (scope: string) => (
    <button
      className="lang-toggle"
      aria-label={lang === 'es' ? 'Switch to English' : 'Cambiar a Español'}
      onClick={toggleLang}
    >
      {(['es', 'en'] as const).map((code) => (
        <span key={code} className={`lang-toggle__opt${lang === code ? ' is-active' : ''}`}>
          {lang === code && (
            <motion.span layoutId={`lang-pill-${scope}`} className="lang-toggle__pill" transition={{ type: 'spring', stiffness: 420, damping: 32 }} />
          )}
          <span className="lang-toggle__label">{code.toUpperCase()}</span>
        </span>
      ))}
    </button>
  );

  return (
    <motion.nav
      className={`navbar${isScrolled ? ' navbar--scrolled' : ''}${isOpen ? ' navbar--open' : ''}`}
      id="navbar"
      role="navigation"
      aria-label={lang === 'es' ? 'Navegación principal' : 'Main navigation'}
      initial={{ y: -90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: EASE_DECO, delay: 0.2 }}
    >
      <div className="navbar__container">
        <a href="#inicio" className="navbar__logo" onClick={closeMenu}>
          <Monogram />
          <span className="navbar__logo-text">Romance Tub</span>
        </a>

        {/* Desktop links */}
        <div className="navbar__desktop">
          <ul className="navbar__links" onMouseLeave={() => setHovered(null)}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} onMouseEnter={() => setHovered(link.href)} onFocus={() => setHovered(link.href)}>
                  {link[lang]}
                  {hovered === link.href && (
                    <motion.span layoutId="nav-underline" className="navbar__underline" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />
                  )}
                </a>
              </li>
            ))}
          </ul>
          {renderLangToggle('desktop')}
        </div>

        <button
          ref={hamburgerRef}
          className={`navbar__hamburger${isOpen ? ' open' : ''}`}
          aria-label={isOpen ? (lang === 'es' ? 'Cerrar menú' : 'Close menu') : (lang === 'es' ? 'Abrir menú' : 'Open menu')}
          aria-expanded={isOpen}
          aria-controls="navMenu"
          onClick={() => setIsOpen((v) => !v)}
        >
          <span></span><span></span><span></span>
        </button>
      </div>

      {/* Mobile overlay — portaled so the nav's transform doesn't clip it */}
      <Portal>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            className="navbar__overlay"
            id="navMenu"
            initial={{ clipPath: 'circle(0% at 100% 0%)' }}
            animate={{ clipPath: 'circle(150% at 100% 0%)' }}
            exit={{ clipPath: 'circle(0% at 100% 0%)' }}
            transition={{ duration: 0.7, ease: EASE_DECO }}
          >
            <Sunburst className="navbar__overlay-sun" />
            <motion.ul
              className="navbar__overlay-links"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07, delayChildren: 0.25 } } }}
            >
              {navLinks.map((link, idx) => (
                <motion.li
                  key={link.href}
                  variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.6, ease: EASE_DECO }}
                >
                  <span className="navbar__overlay-num">{String(idx + 1).padStart(2, '0')}</span>
                  <a href={link.href} onClick={() => setIsOpen(false)} ref={idx === 0 ? firstLinkRef : undefined}>
                    {link[lang]}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.7 } }}
              exit={{ opacity: 0 }}
            >
              {renderLangToggle('mobile')}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      </Portal>
    </motion.nav>
  );
}
