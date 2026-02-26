import { useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
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
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % IMAGES.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + IMAGES.length) % IMAGES.length);
  };

  // Get visible images based on screen size (handled via CSS/Logic)
  // Logic: We always track one index, but render 2 items starting from that index on desktop
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

        <div className="relative group">
          {/* Carousel Container */}
          <div className="flex gap-4 md:gap-8 overflow-hidden">
            {/* Mobile: Show 1 image (just current) */}
            <div className="md:hidden w-full aspect-[4/3] relative rounded-2xl overflow-hidden cursor-pointer" onClick={() => setSelectedImage(IMAGES[currentIndex])}>
              <img 
                src={IMAGES[currentIndex]} 
                alt="Gallery" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Desktop: Show 2 images */}
            <div className="hidden md:flex w-full gap-8">
              {getVisibleImages().map((img, idx) => (
                <div 
                  key={`${currentIndex}-${idx}`} 
                  className="w-1/2 aspect-[16/9] relative rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-shadow"
                  onClick={() => setSelectedImage(img)}
                >
                  <img 
                    src={img} 
                    alt={`Gallery ${idx}`} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-tomo-dark p-3 rounded-full shadow-lg backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-tomo-dark p-3 rounded-full shadow-lg backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
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

      {/* Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
          <button 
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
          >
            <X size={40} />
          </button>
          <img 
            src={selectedImage} 
            alt="Full screen gallery" 
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
};
