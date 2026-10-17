'use client';

import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

/** Renders children at the end of <body>, outside any section's stacking context. */
export function Portal({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted ? createPortal(children, document.body) : null;
}
