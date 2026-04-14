import { useEffect, useRef, useState, useCallback } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { useTouchSwipe } from '../../hooks/useTouchSwipe';
import { SectionHeader } from '../ui/SectionHeader';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

import imgInteriorMoss from '../../../assets/photos/tomo-interior-moss.png';
import imgStorefront from '../../../assets/photos/tomo-storefront.png';
import imgDishCaviar from '../../../assets/photos/tomo-dish-caviar.jpeg';
import imgDishPesto from '../../../assets/photos/tomo-dish-pesto.jpeg';
import imgDishCaviarSetting from '../../../assets/photos/tomo-dish-caviar-setting.jpeg';
import imgDishesOverhead from '../../../assets/photos/tomo-dishes-overhead.jpeg';
import imgDishTartare from '../../../assets/photos/tomo-dish-tartare.jpeg';
import imgDishMural from '../../../assets/photos/tomo-dish-mural.jpeg';
import imgFoodTasting from '../../../assets/photos/tomo-food-tasting.png';
import imgCheers from '../../../assets/photos/tomo-cheers.png';

const IMAGES = [
  imgInteriorMoss,
  imgStorefront,
  imgDishCaviar,
  imgDishMural,
  imgDishPesto,
  imgDishCaviarSetting,
  imgDishesOverhead,
  imgDishTartare,
  imgFoodTasting,
  imgCheers,
];

const AUTO_ADVANCE_MS = 5000;

export const Gallery = () => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % IMAGES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + IMAGES.length) % IMAGES.length);
  }, []);

  const lightboxNext = useCallback(() => {
    setSelectedIndex((prev) => (prev !== null ? (prev + 1) % IMAGES.length : null));
  }, []);

  const lightboxPrev = useCallback(() => {
    setSelectedIndex((prev) => (prev !== null ? (prev - 1 + IMAGES.length) % IMAGES.length : null));
  }, []);

  const carouselSwipe = useTouchSwipe({ onSwipeLeft: nextSlide, onSwipeRight: prevSlide });
  const lightboxSwipe = useTouchSwipe({ onSwipeLeft: lightboxNext, onSwipeRight: lightboxPrev });

  /* Auto-advance slides. Pauses on hover/focus, during touch interaction,
     when the lightbox is open, and when prefers-reduced-motion is set. */
  useEffect(() => {
    if (isPaused || selectedIndex !== null) return;
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    if (reduced) return;

    const id = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % IMAGES.length);
    }, AUTO_ADVANCE_MS);
    return () => window.clearInterval(id);
  }, [isPaused, selectedIndex]);

  /* Accessibility: modal keyboard navigation (Escape, Tab trap, arrow keys for prev/next) */
  useEffect(() => {
    if (selectedIndex === null) return;

    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    closeButtonRef.current?.focus();

    const getFocusableElements = () => {
      if (!modalRef.current) return [];
      const selector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
      return Array.from(modalRef.current.querySelectorAll<HTMLElement>(selector)).filter(
        (el) => !el.hasAttribute('disabled') && el.getAttribute('aria-hidden') !== 'true'
      );
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setSelectedIndex(null); return; }
      if (event.key === 'ArrowRight') { lightboxNext(); return; }
      if (event.key === 'ArrowLeft') { lightboxPrev(); return; }

      if (event.key === 'Tab') {
        const focusable = getFocusableElements();
        if (focusable.length === 0) { event.preventDefault(); return; }

        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault(); last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault(); first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [selectedIndex, lightboxNext, lightboxPrev]);

  /* A crossfading slot: renders every image stacked absolutely,
     fades the one at `activeIndex` to full opacity while the rest fade out.
     Plain helper (not a component) so React does not remount on every render
     and kill in-flight opacity transitions. */
  const renderSlot = (activeIndex: number, aspectClass: string) => (
    <div className={`relative w-full ${aspectClass} rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/5`}>
      {IMAGES.map((img, i) => {
        const isActive = i === activeIndex;
        return (
          <button
            key={i}
            type="button"
            aria-label={`Open gallery image ${i + 1}`}
            aria-hidden={!isActive}
            tabIndex={isActive ? 0 : -1}
            onClick={() => isActive && setSelectedIndex(i)}
            className={`absolute inset-0 bg-transparent border-0 p-0 transition-opacity duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <img
              src={img}
              alt={`Gallery ${i + 1}`}
              loading="lazy"
              className="w-full h-full object-cover"
            />
            {/* Subtle gradient lift on the image to unify with the dark section */}
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
          </button>
        );
      })}
    </div>
  );

  const secondIndex = (currentIndex + 1) % IMAGES.length;

  return (
    <section
      className="relative overflow-hidden py-28 md:py-36 bg-tomo-moss text-tomo-cream"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Ambient wash: warm spot + cool edge */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(1100px 520px at 50% -5%, rgba(255,248,240,0.10), rgba(255,248,240,0) 60%), radial-gradient(800px 600px at 15% 100%, rgba(47,74,60,0.55), rgba(47,74,60,0) 65%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          variant="dark"
          eyebrow={t.home.gallery.title}
          title={t.home.gallery.subtitle}
          className="mb-14"
        />

        <div
          className="relative group"
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={() => setIsPaused(false)}
          {...carouselSwipe}
        >
          {/* Mobile: 1 slot */}
          <div className="md:hidden">
            {renderSlot(currentIndex, 'aspect-[4/3]')}
          </div>

          {/* Desktop: 2 slots side-by-side */}
          <div className="hidden md:grid md:grid-cols-2 md:gap-8">
            {renderSlot(currentIndex, 'aspect-[16/9]')}
            {renderSlot(secondIndex, 'aspect-[16/9]')}
          </div>

          {/* Navigation */}
          <button
            onClick={prevSlide}
            className="absolute -left-2 md:-left-6 top-1/2 -translate-y-1/2 z-20 bg-white/95 hover:bg-white text-tomo-dark p-3 rounded-full shadow-xl backdrop-blur transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100 focus:opacity-100"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute -right-2 md:-right-6 top-1/2 -translate-y-1/2 z-20 bg-white/95 hover:bg-white text-tomo-dark p-3 rounded-full shadow-xl backdrop-blur transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100 focus:opacity-100"
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Indicators */}
        <div className="flex justify-center mt-10 gap-2">
          {IMAGES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                idx === currentIndex ? 'bg-tomo-red w-8' : 'bg-tomo-cream/25 hover:bg-tomo-cream/50 w-2'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-label="Gallery image preview"
          className="fixed inset-0 z-[100] bg-black/92 backdrop-blur-sm flex items-center justify-center p-4 animate-[reveal-fade-in_250ms_ease-out]"
          onClick={() => setSelectedIndex(null)}
          {...lightboxSwipe}
        >
          <button
            ref={closeButtonRef}
            type="button"
            onClick={(e) => { e.stopPropagation(); setSelectedIndex(null); }}
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-10"
            aria-label="Close image preview"
          >
            <X size={40} />
          </button>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); lightboxPrev(); }}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/60 hover:text-white bg-black/30 hover:bg-black/50 p-3 rounded-full transition-colors z-10"
            aria-label="Previous image"
          >
            <ChevronLeft size={28} />
          </button>

          <img
            src={IMAGES[selectedIndex]}
            alt={`Gallery image ${selectedIndex + 1}`}
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); lightboxNext(); }}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/60 hover:text-white bg-black/30 hover:bg-black/50 p-3 rounded-full transition-colors z-10"
            aria-label="Next image"
          >
            <ChevronRight size={28} />
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-sm font-medium">
            {selectedIndex + 1} / {IMAGES.length}
          </div>
        </div>
      )}
    </section>
  );
};
