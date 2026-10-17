'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

/** Thin gold bar across the top of the viewport that tracks page scroll. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />;
}
