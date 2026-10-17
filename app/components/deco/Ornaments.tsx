'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { EASE_DECO } from '@/app/components/motion/Reveal';

/* ───────────────────────────── Sunburst ───────────────────────────── */

interface SunburstProps {
  className?: string;
  rays?: number;
  spin?: boolean;
}

/** Radiating gold rays — the signature Art Deco motif. Purely decorative. */
export function Sunburst({ className = '', rays = 48, spin = true }: SunburstProps) {
  const lines = Array.from({ length: rays }, (_, i) => {
    const angle = (i / rays) * Math.PI * 2;
    const long = i % 2 === 0;
    const r1 = long ? 60 : 120;
    const r2 = 500;
    return {
      x1: 500 + Math.cos(angle) * r1,
      y1: 500 + Math.sin(angle) * r1,
      x2: 500 + Math.cos(angle) * r2,
      y2: 500 + Math.sin(angle) * r2,
      w: long ? 1.4 : 0.6,
    };
  });

  return (
    <motion.svg
      className={`deco-sunburst ${className}`}
      viewBox="0 0 1000 1000"
      aria-hidden="true"
      animate={spin ? { rotate: 360 } : undefined}
      transition={spin ? { duration: 240, repeat: Infinity, ease: 'linear' } : undefined}
    >
      <defs>
        <radialGradient id="sunburst-fade" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f3d98b" stopOpacity="0.9" />
          <stop offset="70%" stopColor="#c9a13b" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#c9a13b" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g stroke="url(#sunburst-fade)">
        {lines.map((l, i) => (
          <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} strokeWidth={l.w} />
        ))}
      </g>
      <circle cx="500" cy="500" r="40" fill="none" stroke="#d4af37" strokeOpacity="0.6" />
      <circle cx="500" cy="500" r="52" fill="none" stroke="#d4af37" strokeOpacity="0.3" />
    </motion.svg>
  );
}

/* ───────────────────────────── Divider ───────────────────────────── */

/** Line · diamond · fan · diamond · line. Draws itself in when scrolled into view. */
export function DecoDivider({ className = '' }: { className?: string }) {
  return (
    <motion.svg
      className={`deco-divider ${className}`}
      viewBox="0 0 320 32"
      aria-hidden="true"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.path
        d="M0 16 H118 M202 16 H320"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        variants={{ hidden: { pathLength: 0 }, visible: { pathLength: 1 } }}
        transition={{ duration: 1.2, ease: EASE_DECO }}
      />
      <motion.g
        variants={{ hidden: { opacity: 0, scale: 0.4 }, visible: { opacity: 1, scale: 1 } }}
        transition={{ duration: 0.7, delay: 0.4, ease: EASE_DECO }}
        style={{ transformOrigin: '160px 16px' }}
      >
        <path d="M126 16 l6 -6 l6 6 l-6 6 z" fill="currentColor" />
        <path d="M182 16 l6 -6 l6 6 l-6 6 z" fill="currentColor" />
        <path d="M160 2 L146 26 H174 Z" fill="none" stroke="currentColor" strokeWidth="1" />
        <path d="M160 2 L153 26 M160 2 L167 26 M160 2 V26" stroke="currentColor" strokeWidth="0.8" />
      </motion.g>
    </motion.svg>
  );
}

/* ───────────────────────────── Corner frame ───────────────────────────── */

/** Four stepped gold corners that frame their positioned parent. */
export function CornerFrame({ className = '' }: { className?: string }) {
  const corner = (
    <svg viewBox="0 0 40 40" aria-hidden="true">
      <path d="M1 39 V1 H39" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 39 V7 H39" fill="none" stroke="currentColor" strokeWidth="0.75" />
      <path d="M13 13 h6 v6 h-6 z" fill="currentColor" />
    </svg>
  );
  return (
    <span className={`deco-corners ${className}`} aria-hidden="true">
      <span className="deco-corners__c deco-corners__c--tl">{corner}</span>
      <span className="deco-corners__c deco-corners__c--tr">{corner}</span>
      <span className="deco-corners__c deco-corners__c--bl">{corner}</span>
      <span className="deco-corners__c deco-corners__c--br">{corner}</span>
    </span>
  );
}

/* ───────────────────────────── Monogram ───────────────────────────── */

export function Monogram({ className = '' }: { className?: string }) {
  return (
    <span className={`deco-monogram ${className}`} aria-hidden="true">
      <svg viewBox="0 0 48 48">
        <path d="M24 2 L46 24 L24 46 L2 24 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M24 8 L40 24 L24 40 L8 24 Z" fill="none" stroke="currentColor" strokeWidth="0.75" />
      </svg>
      <span className="deco-monogram__letters">RT</span>
    </span>
  );
}

/* ───────────────────────────── Section heading ───────────────────────────── */

interface SectionHeadingProps {
  id: string;
  numeral: string;
  eyebrow: string;
  title: ReactNode;
  subtitle?: ReactNode;
  tone?: 'dark' | 'light';
}

/** Numbered eyebrow, display title, optional subtitle and an animated divider. */
export function SectionHeading({ id, numeral, eyebrow, title, subtitle, tone = 'dark' }: SectionHeadingProps) {
  return (
    <motion.header
      className={`section-heading section-heading--${tone}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
    >
      <motion.p
        className="section-heading__eyebrow"
        variants={{ hidden: { opacity: 0, letterSpacing: '0.1em' }, visible: { opacity: 1, letterSpacing: '0.42em' } }}
        transition={{ duration: 1, ease: EASE_DECO }}
      >
        <span className="section-heading__numeral">{numeral}</span>
        <span>{eyebrow}</span>
      </motion.p>
      <motion.h2
        className="section-heading__title"
        id={id}
        variants={{ hidden: { opacity: 0, y: 30, clipPath: 'inset(0 0 100% 0)' }, visible: { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' } }}
        transition={{ duration: 0.9, ease: EASE_DECO }}
      >
        {title}
      </motion.h2>
      <DecoDivider />
      {subtitle && (
        <motion.p
          className="section-heading__subtitle"
          variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.8, ease: EASE_DECO }}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.header>
  );
}
