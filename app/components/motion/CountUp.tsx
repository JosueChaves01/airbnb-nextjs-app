'use client';

import { useEffect, useRef } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';

interface CountUpProps {
  to: number;
  decimals?: number;
  duration?: number;
  delay?: number;
  className?: string;
}

/** Counts from 0 to `to` the first time it scrolls into view. */
export function CountUp({ to, decimals = 1, duration = 1.6, delay = 0, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' });
  const reduced = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || !inView) return;
    if (reduced) {
      node.textContent = to.toFixed(decimals);
      return;
    }
    const controls = animate(0, to, {
      duration,
      delay,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => { node.textContent = v.toFixed(decimals); },
    });
    return () => controls.stop();
  }, [inView, reduced, to, decimals, duration, delay]);

  return (
    <span ref={ref} className={className}>
      {(0).toFixed(decimals)}
    </span>
  );
}
