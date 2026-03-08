import { useEffect, useRef, useState, useCallback } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { useTouchSwipe } from '../../hooks/useTouchSwipe';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

import imgInteriorMoss from '../../../assets/photos/tomo-interior-moss.png';
import imgStorefront from '../../../assets/photos/tomo-storefront.png';
import imgDishCaviar from '../../../assets/photos/tomo-dish-caviar.jpeg';
import imgDishPesto from '../../../assets/photos/tomo-dish-pesto.jpeg';
import imgDishCaviarSetting from '../../../assets/photos/tomo-dish-caviar-setting.jpeg';
import imgDishesOverhead from '../../../assets/photos/tomo-dishes-overhead.jpeg';
import imgDishTartare from '../../../assets/photos/tomo-dish-tartare.jpeg';
import imgCheers from '../../../assets/photos/tomo-cheers.png';

const IMAGES = [
  imgInteriorMoss,
  imgStorefront,
  imgDishCaviar,
  imgDishPesto,
  imgDishCaviarSetting,
  imgDishesOverhead,
  imgDishTartare,
  imgCheers,
];

export const Gallery = () => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
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

  /* Lightbox navigation */
  const lightboxNext = useCallback(() => {
    setSelectedIndex((prev) => (prev !== null ? (prev + 1) % IMAGES.length : null));
  }, []);

  const lightboxPrev = useCallback(() => {
    setSelectedIndex((prev) => (prev !== null ? (prev - 1 + IMAGES.length) % IMAGES.length : null));
  }, []);

  /* Touch swipe for carousel */
  const carouselSwipe = useTouchSwipe({ onSwipeLeft: nextSlide, onSwipeRight: prevSlide });

  /* Touch swipe for lightbox */
  const lightboxSwipe = useTouchSwipe({ onSwipeLeft: lightboxNext, onSwipeRight: lightboxPrev });

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

  const getVisibleImages = () => {
    const secondIndex = (currentIndex + 1) % IMAGES.length;
    return [IMAGES[currentIndex], IMAGES[secondIndex]];
  };

  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 data-reveal="float" className="text-4xl md:text-5xl font-display font-bold text-tomo-dark">
            {t.home.gallery.title}
          </h2>
        </div>

        <div className="relative group" {...carouselSwipe}>
          {/* Carousel Container */}
          <div className="flex gap-4 md:gap-8 overflow-hidden">
            {/* Mobile: 1 image */}
            <button
              type="button"
              aria-label={`Open gallery image ${currentIndex + 1}`}
              className="md:hidden w-full aspect-[4/3] relative rounded-2xl overflow-hidden cursor-pointer bg-transparent border-0 p-0"
              onClick={() => setSelectedIndex(currentIndex)}
            >
              <img 
                src={IMAGES[currentIndex]} 
                alt="Gallery" 
                loading="lazy"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </button>

            {/* Desktop: 2 images */}
            <div className="hidden md:flex w-full gap-8">
              {getVisibleImages().map((img, idx) => {
                const imgIndex = (currentIndex + idx) % IMAGES.length;
                return (
                  <button
                    type="button"
                    key={`${currentIndex}-${idx}`} 
                    aria-label={`Open gallery image ${imgIndex + 1}`}
                    className="w-1/2 aspect-[16/9] relative rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-shadow bg-transparent border-0 p-0"
                    onClick={() => setSelectedIndex(imgIndex)}
                  >
                    <img 
                      src={img} 
                      alt={`Gallery ${imgIndex + 1}`} 
                      loading="lazy"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-tomo-dark p-3 rounded-full shadow-lg backdrop-blur-sm transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100 focus:opacity-100"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-tomo-dark p-3 rounded-full shadow-lg backdrop-blur-sm transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100 focus:opacity-100"
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Indicators */}
        <div className="flex justify-center mt-8 gap-2">
          {IMAGES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all ${
                idx === currentIndex ? 'bg-tomo-red w-6' : 'bg-tomo-gray/30 hover:bg-tomo-gray/50'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Lightbox Modal — now with prev/next navigation + swipe + keyboard arrows */}
      {selectedIndex !== null && (
        <div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-label="Gallery image preview"
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
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

          {/* Prev */}
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

          {/* Next */}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); lightboxNext(); }}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/60 hover:text-white bg-black/30 hover:bg-black/50 p-3 rounded-full transition-colors z-10"
            aria-label="Next image"
          >
            <ChevronRight size={28} />
          </button>

          {/* Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-sm font-medium">
            {selectedIndex + 1} / {IMAGES.length}
          </div>
        </div>
      )}
    </section>
  );
};
