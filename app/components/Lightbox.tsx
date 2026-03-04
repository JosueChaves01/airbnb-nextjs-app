'use client';

import { useEffect, useRef, useCallback } from 'react';

interface LightboxImage {
  src: string;
  alt: string;
  caption?: string;
  menuUrl?: string;
}

interface LightboxProps {
  /** Single-image mode (legacy) */
  src?: string;
  alt?: string;
  menuUrl?: string;
  /** Multi-image mode */
  images?: LightboxImage[];
  currentIndex?: number;
  onPrev?: () => void;
  onNext?: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export function Lightbox({
  src,
  alt,
  menuUrl,
  images,
  currentIndex = 0,
  onPrev,
  onNext,
  isOpen,
  onClose,
}: LightboxProps) {
  const lastFocusedRef = useRef<HTMLElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const handleKeydown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
      if (e.key === 'ArrowRight' && onNext) onNext();
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    if (isOpen) {
      lastFocusedRef.current = document.activeElement as HTMLElement;
      closeBtnRef.current?.focus();
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeydown);
      return () => {
        document.removeEventListener('keydown', handleKeydown);
        document.body.style.overflow = '';
        lastFocusedRef.current?.focus();
      };
    }
  }, [isOpen, handleKeydown]);

  if (!isOpen) return null;

  // Resolve current image
  const activeSrc = images ? images[currentIndex]?.src : src;
  const activeAlt = images ? images[currentIndex]?.alt : alt;
  const activeCaption = images ? images[currentIndex]?.caption : undefined;
  const activeMenuUrl = images ? images[currentIndex]?.menuUrl : menuUrl;
  const isMulti = !!images && images.length > 1;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Imagen ampliada"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Close button */}
      <button
        ref={closeBtnRef}
        onClick={onClose}
        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 text-white text-xl flex items-center justify-center hover:bg-white/20 transition-colors z-10"
        aria-label="Cerrar"
      >
        <i className="fas fa-times"></i>
      </button>

      {/* Prev button */}
      {isMulti && onPrev && (
        <button
          onClick={onPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 text-white text-2xl flex items-center justify-center hover:bg-white/20 transition-colors z-10"
          aria-label="Foto anterior"
        >
          ‹
        </button>
      )}

      {/* Main content */}
      <div className="max-w-[90vw] max-h-[90vh] flex flex-col items-center">
        {activeSrc && (
          <img
            src={activeSrc}
            alt={activeAlt || ''}
            className="max-w-full max-h-[78vh] rounded-lg object-contain"
          />
        )}

        {/* Caption + counter */}
        <div className="mt-3 flex flex-col items-center gap-1">
          {activeCaption && (
            <p className="text-white/80 text-sm">{activeCaption}</p>
          )}
          {isMulti && (
            <p className="text-white/50 text-xs">
              {currentIndex + 1} / {images!.length}
            </p>
          )}
        </div>

        {/* Menu link (Discover section) */}
        {activeMenuUrl && (
          <a
            href={activeMenuUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#00B4B0] to-[#028A87] text-white font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all text-sm"
          >
            <span>Abrir menú</span>
            <i className="fas fa-external-link-alt text-xs"></i>
          </a>
        )}
      </div>

      {/* Next button */}
      {isMulti && onNext && (
        <button
          onClick={onNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 text-white text-2xl flex items-center justify-center hover:bg-white/20 transition-colors z-10"
          aria-label="Siguiente foto"
        >
          ›
        </button>
      )}
    </div>
  );
}
