'use client';

import { ReactNode } from 'react';
import { MotionConfig } from 'framer-motion';

/** Honors the visitor's "reduce motion" OS setting across every animation. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
