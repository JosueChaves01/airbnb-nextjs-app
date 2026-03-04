'use client';

import { useState, useEffect } from 'react';

const navLinks = [
  { href: '#inicio',     es: 'Inicio' },
  { href: '#galeria',    es: 'Galería' },
  { href: '#resenas',    es: 'Reseñas' },
  { href: '#amenidades', es: 'Amenidades' },
  { href: '#ubicacion',  es: 'Ubicación' },
  { href: '#contacto',   es: 'Contacto' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen]         = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => {
    setIsOpen(false);
    document.body.style.overflow = '';
  };

  const toggleMenu = () => {
    const next = !isOpen;
    setIsOpen(next);
    document.body.style.overflow = next ? 'hidden' : '';
  };

  return (
    <nav
      className={`navbar${isScrolled ? ' navbar--scrolled' : ''}`}
      id="navbar"
      role="navigation"
      aria-label="Navegación principal"
    >
      <div className="navbar__container">
        <a href="#inicio" className="navbar__logo">
          <span className="navbar__logo-icon"><i className="fas fa-home"></i></span>
          <span className="navbar__logo-text">Romance Tub</span>
        </a>

        <button
          className={`navbar__hamburger${isOpen ? ' open' : ''}`}
          id="hamburger"
          aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={isOpen}
          onClick={toggleMenu}
        >
          <span></span><span></span><span></span>
        </button>

        <div className={`navbar__menu${isOpen ? ' open' : ''}`} id="navMenu">
          <ul className="navbar__links">
            {navLinks.map(link => (
              <li key={link.href}>
                <a href={link.href} onClick={closeMenu}>{link.es}</a>
              </li>
            ))}
          </ul>
          <button className="lang-toggle" id="langToggle" aria-label="Cambiar idioma">
            <span className="lang-toggle__es">ES</span>
            <span className="lang-toggle__divider">|</span>
            <span className="lang-toggle__en">EN</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
