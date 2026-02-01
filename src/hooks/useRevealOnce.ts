import { useEffect } from 'react';
import type { RefObject } from 'react';

export function useRevealOnce(scopeRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const scopeEl = scopeRef.current;
    if (!scopeEl) return;

    const targets = Array.from(
      scopeEl.querySelectorAll<HTMLElement>('[data-reveal]')
    ).filter((el) => {
      const t = el.getAttribute('data-reveal');
      return t === 'float' || t === 'fade' || t === 'underline';
    });

    if (targets.length === 0) return;

    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;
    if (reducedMotion) {
      targets.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          el.classList.add('is-visible');
          io.unobserve(el);
        }
      },
      {
        threshold: 0.35,
        rootMargin: '0px 0px -20% 0px',
      }
    );

    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [scopeRef]);
}

