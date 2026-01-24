import { useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

export const Testimonials = () => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const reviews = t.home.testimonials.reviews;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  // Logic: Always track one index, render 2 items starting from that index on desktop
  const getVisibleReviews = () => {
    const secondIndex = (currentIndex + 1) % reviews.length;
    return [reviews[currentIndex], reviews[secondIndex]];
  };

  // Helper to generate a consistent color for the avatar based on name
  const getAvatarColor = (name: string) => {
    const colors = [
      'bg-purple-600', 'bg-blue-600', 'bg-green-600', 
      'bg-yellow-600', 'bg-red-600', 'bg-indigo-600', 
      'bg-pink-600', 'bg-orange-600'
    ];
    const index = name.length % colors.length;
    return colors[index];
  };

  const ReviewCard = ({ review }: { review: typeof reviews[0] }) => (
    <div className="bg-white p-8 rounded-xl shadow-md h-full flex flex-col border border-gray-100">
      {/* Header: Avatar + Name + Time */}
      <div className="flex items-center gap-4 mb-4">
        <div className={`w-10 h-10 rounded-full ${getAvatarColor(review.author)} flex items-center justify-center text-white font-bold text-sm`}>
          {review.author.charAt(0)}
        </div>
        <div>
          <h4 className="font-bold text-gray-900 text-sm">{review.author}</h4>
          <span className="text-xs text-gray-500">Local Guide • 2 reviews</span>
        </div>
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" 
          alt="Google"
          className="w-5 h-5 ml-auto opacity-50"
        />
      </div>

      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        ))}
        <span className="text-xs text-gray-500 ml-2 mt-0.5">2 days ago</span>
      </div>

      {/* Review Text */}
      <p className="text-gray-700 leading-relaxed text-sm flex-grow">
        {review.text}
      </p>
    </div>
  );

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-tomo-dark mb-4">
            {t.home.testimonials.title}
          </h2>
          <p className="text-xl text-tomo-gray max-w-2xl mx-auto">
            {t.home.testimonials.subtitle}
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Carousel Container */}
          <div className="overflow-hidden py-4"> {/* Added py-4 to accommodate shadows */}
            <div className="flex gap-8">
              {/* Mobile: Show 1 review */}
              <div className="md:hidden w-full flex-shrink-0">
                <ReviewCard review={reviews[currentIndex]} />
              </div>

              {/* Desktop: Show 2 reviews */}
              <div className="hidden md:flex w-full gap-8">
                {getVisibleReviews().map((review, idx) => (
                  <div key={`${currentIndex}-${idx}`} className="w-1/2 flex-shrink-0">
                    <ReviewCard review={review} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation Buttons (Outside container on desktop) */}
          <button 
            onClick={prevSlide}
            className="absolute -left-4 md:-left-16 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 text-gray-700 p-3 rounded-full shadow-lg transition-all border border-gray-100"
            aria-label="Previous review"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute -right-4 md:-right-16 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 text-gray-700 p-3 rounded-full shadow-lg transition-all border border-gray-100"
            aria-label="Next review"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Indicators */}
        <div className="flex justify-center mt-12 gap-2">
          {reviews.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all ${
                idx === currentIndex ? 'bg-tomo-red w-6' : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to review ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
