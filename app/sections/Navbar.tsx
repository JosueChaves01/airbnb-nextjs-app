'use client';

import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/app/context/LanguageContext';

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

  const closeMenu = () => {
    setIsOpen(false);
    document.body.style.overflow = '';
    // restore focus to hamburger
    hamburgerRef.current?.focus();
  };

  const toggleMenu = () => {
    const next = !isOpen;
    setIsOpen(next);
    document.body.style.overflow = next ? 'hidden' : '';

    if (next) {
      // move focus into menu
      setTimeout(() => firstLinkRef.current?.focus(), 0);
    } else {
      hamburgerRef.current?.focus();
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMenu();
      }
      if (e.key === 'Tab') {
        const focusable = menuRef.current?.querySelectorAll<HTMLElement>('a, button') ?? [];
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

  return (
    <nav
      className={`navbar${isScrolled ? ' navbar--scrolled' : ''}`}
      id="navbar"
      role="navigation"
      aria-label={lang === 'es' ? 'Navegación principal' : 'Main navigation'}
    >
      <div className="navbar__container">
        <a href="#inicio" className="navbar__logo">
          <span className="navbar__logo-icon"><i className="fas fa-home"></i></span>
          <span className="navbar__logo-text">Romance Tub</span>
        </a>

        <button
          ref={hamburgerRef}
          className={`navbar__hamburger${isOpen ? ' open' : ''}`}
          id="hamburger"
          aria-label={isOpen ? (lang === 'es' ? 'Cerrar menú' : 'Close menu') : (lang === 'es' ? 'Abrir menú' : 'Open menu')}
          aria-expanded={isOpen}
          onClick={toggleMenu}
        >
          <span></span><span></span><span></span>
        </button>

        <div ref={menuRef} className={`navbar__menu${isOpen ? ' open' : ''}`} id="navMenu">
          <ul className="navbar__links">
            {navLinks.map((link, idx) => (
              <li key={link.href}>
                <a href={link.href} onClick={closeMenu} ref={idx === 0 ? firstLinkRef : undefined}>{link[lang]}</a>
              </li>
            ))}
          </ul>
          <button
            className="lang-toggle"
            id="langToggle"
            aria-label={lang === 'es' ? 'Switch to English' : 'Cambiar a Español'}
            onClick={toggleLang}
          >
            <span className="lang-toggle__es">ES</span>
            <span className="lang-toggle__divider">|</span>
            <span className="lang-toggle__en">EN</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
