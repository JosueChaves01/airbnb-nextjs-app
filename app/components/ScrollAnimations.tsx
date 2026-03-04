'use client';
import { useEffect } from 'react';

function easeOutQuart(t: number) {
  return 1 - Math.pow(1 - t, 4);
}

function animateCountUp(
  element: Element,
  target: number,
  decimals: number,
  duration: number
) {
  if (!isFinite(target)) { element.textContent = '0'; return; }
  let startTime: number | null = null;

  function step(timestamp: number) {
    if (!startTime) startTime = timestamp;
    const progress = (timestamp - startTime) / duration;
    if (progress < 1) {
      element.textContent = (target * easeOutQuart(progress)).toFixed(decimals);
      requestAnimationFrame(step);
    } else {
      element.textContent = target.toFixed(decimals);
    }
  }
  requestAnimationFrame(step);
}

export function ScrollAnimations() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ── 1. Fade-in observer ────────────────────────────────────────────────
    if (prefersReduced) {
      document.querySelectorAll('.fade-in').forEach(el => el.classList.add('visible'));
    } else {
      const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

      document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));
    }

    // ── 2. Reviews counter animation ──────────────────────────────────────
    const reviewsOverall = document.getElementById('reviewsOverall');
    if (!reviewsOverall) return;

    let hasAnimated = false;

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
          hasAnimated = true;
          counterObserver.disconnect();

          if (prefersReduced) {
            // Immediately set final values
            reviewsOverall.querySelectorAll('.animate-count').forEach(el => {
              const target = parseFloat(el.getAttribute('data-target') ?? '0');
              const decimals = parseInt(el.getAttribute('data-decimals') ?? '1');
              el.textContent = isFinite(target) ? target.toFixed(decimals) : '0';
            });
            reviewsOverall.querySelector('.animate-stars')?.classList.add('animate-stars--active');
            return;
          }

          // Staggered count-up for each numeric element
          reviewsOverall.querySelectorAll('.animate-count').forEach((el, idx) => {
            const target = parseFloat(el.getAttribute('data-target') ?? '0');
            const decimals = parseInt(el.getAttribute('data-decimals') ?? '1');
            const duration = 1500 + idx * 100;
            setTimeout(() => animateCountUp(el, target, decimals, duration), idx * 80);
          });

          // Stars animation
          setTimeout(() => {
            reviewsOverall.querySelector('.animate-stars')?.classList.add('animate-stars--active');
          }, 300);
        }
      });
    }, { threshold: 0.3, rootMargin: '0px 0px -50px 0px' });

    counterObserver.observe(reviewsOverall);
  }, []);

  return null;
}
