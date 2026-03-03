import { useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

export const Testimonials = () => {
  const { t, language } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);

  /* Testimonials data contract:
     - Source of truth: `home.testimonials.reviews` in i18n JSON files.
     - To add a new review, copy one review object, increment `id`, and keep the same `id`
       in `en.json`, `es.json`, and `de.json`.
     - Display order is driven by `id`, so new entries appear automatically.
     - `timeAgoLabel` now stores the review date as `YYYY-MM-DD`. The UI computes
       localized relative time automatically (for example: "1 day ago", "hace 1 día").
  */
  const reviews = [...t.home.testimonials.reviews].sort((a, b) => a.id - b.id);
  const DAY_MS = 24 * 60 * 60 * 1000;

  /* Parse date string + calculate "x days ago" in active language.
     Fallback contract: if date format is invalid, display raw value unchanged.
  */
  const getRelativeDateLabel = (dateValue: string) => {
    const trimmed = dateValue.trim();
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(trimmed);
    if (!match) return dateValue;

    const year = Number(match[1]);
    const month = Number(match[2]);
    const day = Number(match[3]);
    const reviewUtcTime = Date.UTC(year, month - 1, day);
    const reviewDate = new Date(reviewUtcTime);

    if (
      reviewDate.getUTCFullYear() !== year ||
      reviewDate.getUTCMonth() !== month - 1 ||
      reviewDate.getUTCDate() !== day
    ) {
      return dateValue;
    }

    const today = new Date();
    const todayUtcTime = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
    const diffDays = Math.floor((todayUtcTime - reviewUtcTime) / DAY_MS);

    const localeMap = {
      en: 'en-US',
      es: 'es-ES',
      de: 'de-DE',
    } as const;

    const formatter = new Intl.RelativeTimeFormat(localeMap[language], { numeric: 'auto' });
    return formatter.format(-diffDays, 'day');
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  // Logic: Always track one index, render 2 items starting from that index on desktop.
  const getVisibleReviews = () => {
    if (reviews.length <= 1) return [reviews[currentIndex]];
    const secondIndex = (currentIndex + 1) % reviews.length;
    return [reviews[currentIndex], reviews[secondIndex]];
  };

  // Helper to generate a consistent color for the avatar based on name.
  const getAvatarColor = (name: string) => {
    const colors = [
      'bg-purple-600', 'bg-blue-600', 'bg-green-600',
      'bg-yellow-600', 'bg-red-600', 'bg-indigo-600',
      'bg-pink-600', 'bg-orange-600'
    ];
    const index = name.length % colors.length;
    return colors[index];
  };

  const ReviewCard = ({ review }: { review: (typeof reviews)[number] }) => {
    const reviewerMeta = [review.badge, review.reviewsLabel, review.photosLabel].filter(Boolean).join(' • ');
    const visitMeta = [review.visitLabel, review.priceLabel].filter(Boolean).join(' | ');

    return (
      <div className="bg-white p-8 rounded-xl shadow-md h-full flex flex-col border border-gray-100">
        {/* Header: avatar, profile meta, Google mark. */}
        <div className="flex items-center gap-4 mb-4">
          <div className={`w-10 h-10 rounded-full ${getAvatarColor(review.author)} flex items-center justify-center text-white font-bold text-sm`}>
            {review.author.charAt(0)}
          </div>
          <div>
            <h4 className="font-bold text-gray-900 text-sm">{review.author}</h4>
            <span className="text-xs text-gray-500">{reviewerMeta}</span>
          </div>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
            alt="Google"
            className="w-5 h-5 ml-auto opacity-50"
          />
        </div>

        {/* Rating + recency line. */}
        <div className="flex gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          ))}
          <span className="text-xs text-gray-500 ml-2 mt-0.5">{getRelativeDateLabel(review.timeAgoLabel)}</span>
        </div>

        {/* Optional visit/price context for authenticity. */}
        {visitMeta ? (
          <p className="text-xs text-gray-500 mb-3">{visitMeta}</p>
        ) : null}

        {/* Main review text keeps line breaks from i18n content. */}
        <p className="text-gray-700 leading-relaxed text-sm whitespace-pre-line flex-grow">
          {review.text}
        </p>

        {/* Optional ratings summary pill (first review uses this). */}
        {review.ratingsLabel ? (
          <div className="mt-4 rounded-2xl bg-gray-100 px-4 py-3 text-sm font-semibold text-gray-700">
            {review.ratingsLabel}
          </div>
        ) : null}
      </div>
    );
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 data-reveal="float" className="text-4xl md:text-5xl font-display font-bold text-tomo-dark mb-4">
            {t.home.testimonials.title}
          </h2>
          <p className="text-xl text-tomo-gray max-w-2xl mx-auto">
            {t.home.testimonials.subtitle}
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Carousel Container */}
          <div className="overflow-hidden py-4">
            <div className="flex gap-8">
              {/* Mobile: Show 1 review */}
              <div className="md:hidden w-full flex-shrink-0">
                <ReviewCard review={reviews[currentIndex]} />
              </div>

              {/* Desktop: Show 2 reviews */}
              <div className="hidden md:flex w-full gap-8">
                {getVisibleReviews().map((review, idx) => (
                  <div key={review.id ?? `${currentIndex}-${idx}`} className="w-1/2 flex-shrink-0">
                    <ReviewCard review={review} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bugfix contract:
              Keep desktop arrows outside the cards and render separate mobile controls below cards
              so no button can overlap testimonial copy at narrow widths. */}
          {reviews.length > 1 ? (
            <>
              <button 
                onClick={prevSlide}
                className="hidden md:inline-flex absolute md:-left-16 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 text-gray-700 p-3 rounded-full shadow-lg transition-all border border-gray-100"
                aria-label="Previous review"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={nextSlide}
                className="hidden md:inline-flex absolute md:-right-16 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 text-gray-700 p-3 rounded-full shadow-lg transition-all border border-gray-100"
                aria-label="Next review"
              >
                <ChevronRight size={24} />
              </button>
            </>
          ) : null}
        </div>

        {reviews.length > 1 ? (
          <div className="mt-6 flex items-center justify-center gap-4 md:hidden">
            <button
              type="button"
              onClick={prevSlide}
              className="inline-flex items-center justify-center bg-white hover:bg-gray-100 text-gray-700 p-3 rounded-full shadow-lg transition-all border border-gray-100"
              aria-label="Previous review"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              className="inline-flex items-center justify-center bg-white hover:bg-gray-100 text-gray-700 p-3 rounded-full shadow-lg transition-all border border-gray-100"
              aria-label="Next review"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        ) : null}

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
