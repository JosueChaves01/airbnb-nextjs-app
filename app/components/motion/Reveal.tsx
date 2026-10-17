'use client';

import { ReactNode } from 'react';
import { motion, type Variants } from 'framer-motion';

export const EASE_DECO = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_DECO } },
};

export const staggerContainer = (stagger = 0.12, delay = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

const VIEWPORT = { once: true, margin: '0px 0px -80px 0px' } as const;

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: 'div' | 'section' | 'article' | 'aside' | 'p' | 'li' | 'figure';
}

/** Fades and lifts its children into view once, the first time they scroll in. */
export function Reveal({ children, className, delay = 0, y = 36, as = 'div' }: RevealProps) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.8, delay, ease: EASE_DECO }}
    >
      {children}
    </Tag>
  );
}

interface StaggerProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  as?: 'div' | 'ul';
}

/** Parent that reveals its <StaggerItem> children one after another. */
export function Stagger({ children, className, stagger = 0.12, delay = 0, as = 'div' }: StaggerProps) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      variants={staggerContainer(stagger, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
    >
      {children}
    </Tag>
  );
}

export const StaggerItem = motion.div;
