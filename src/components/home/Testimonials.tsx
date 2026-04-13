import { useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { reviews } from '../../data/reviews';

// Max characters shown before the "Read more" toggle kicks in.
const TEXT_LIMIT = 180;

export const Testimonials = () => {
  const { t, language } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Reviews are sorted by id (lowest = newest).
  const sorted = [...reviews].sort((a, b) => a.id - b.id);
  const DAY_MS = 24 * 60 * 60 * 1000;

  /* Parse YYYY-MM-DD date string and return a localized relative label.
     Fallback: if format is invalid, return the raw value unchanged. */
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
    setCurrentIndex((prev) => (prev + 1) % sorted.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + sorted.length) % sorted.length);
  };

  // Desktop shows 2 reviews starting from currentIndex (wraps around).
  const getVisibleReviews = () => {
    if (sorted.length <= 1) return [sorted[currentIndex]];
    const secondIndex = (currentIndex + 1) % sorted.length;
    return [sorted[currentIndex], sorted[secondIndex]];
  };

  // Consistent avatar color derived from author name length.
  const getAvatarColor = (name: string) => {
    const colors = [
      'bg-purple-600', 'bg-blue-600', 'bg-green-600',
      'bg-yellow-600', 'bg-red-600', 'bg-indigo-600',
      'bg-pink-600', 'bg-orange-600',
    ];
    return colors[name.length % colors.length];
  };

  const ReviewCard = ({ review }: { review: (typeof sorted)[number] }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const reviewerMeta = [review.badge, review.reviewsLabel, review.photosLabel].filter(Boolean).join(' • ');
    const visitMeta = [review.visitLabel, review.priceLabel].filter(Boolean).join(' | ');
    const needsTruncation = review.text.length > TEXT_LIMIT;
    const displayText = needsTruncation && !isExpanded
      ? review.text.slice(0, TEXT_LIMIT).trimEnd() + '…'
      : review.text;

    return (
      <div className="bg-white p-8 rounded-xl shadow-md flex flex-col border border-gray-100">
        {/* Header: avatar, profile meta, Google mark. */}
        <div className="flex items-center gap-4 mb-4">
          <div className={`w-10 h-10 rounded-full ${getAvatarColor(review.author)} flex-shrink-0 flex items-center justify-center text-white font-bold text-sm`}>
            {review.author.charAt(0)}
          </div>
          <div className="min-w-0">
            <h4 className="font-bold text-gray-900 text-sm truncate">{review.author}</h4>
            <span className="text-xs text-gray-500">{reviewerMeta}</span>
          </div>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
            alt="Google"
            className="w-5 h-5 ml-auto flex-shrink-0 opacity-50"
          />
        </div>

        {/* Rating + recency. */}
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          ))}
          <span className="text-xs text-gray-500 ml-2">{getRelativeDateLabel(review.timeAgoLabel)}</span>
        </div>

        {/* Optional visit/price context. */}
        {visitMeta ? (
          <p className="text-xs text-gray-500 mb-3">{visitMeta}</p>
        ) : null}

        {/* Review text with truncation toggle. */}
        <div className="flex-grow">
          <p className="text-gray-700 leading-relaxed text-sm whitespace-pre-line">
            {displayText}
          </p>
          {needsTruncation ? (
            <button
              type="button"
              onClick={() => setIsExpanded((v) => !v)}
              className="mt-1 text-xs font-medium text-tomo-red hover:underline focus:outline-none"
            >
              {isExpanded ? 'Show less' : 'Read more'}
            </button>
          ) : null}
        </div>

        {/* Optional ratings summary pill. */}
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
          {/* Carousel container */}
          <div className="overflow-hidden py-4">
            <div className="flex gap-8">
              {/* Mobile: 1 review */}
              <div className="md:hidden w-full flex-shrink-0">
                <ReviewCard review={sorted[currentIndex]} />
              </div>

              {/* Desktop: 2 reviews */}
              <div className="hidden md:flex w-full gap-8">
                {getVisibleReviews().map((review, idx) => (
                  <div key={review.id ?? `${currentIndex}-${idx}`} className="w-1/2 flex-shrink-0">
                    <ReviewCard review={review} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop prev/next arrows — positioned outside the cards.
              Bugfix: kept outside the card area so they never overlap text. */}
          {sorted.length > 1 ? (
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

        {/* Mobile prev/next arrows */}
        {sorted.length > 1 ? (
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

        {/* Position counter — replaces dot indicators, scales to any review count. */}
        {sorted.length > 1 ? (
          <div className="flex justify-center mt-8">
            <span className="text-sm text-gray-400 font-medium tabular-nums">
              {currentIndex + 1} / {sorted.length}
            </span>
          </div>
        ) : null}
      </div>
    </section>
  );
};
