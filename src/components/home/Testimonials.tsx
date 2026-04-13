import { useState, useCallback } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { useTouchSwipe } from '../../hooks/useTouchSwipe';
import { SectionHeader } from '../ui/SectionHeader';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { reviews } from '../../data/reviews';

// Max characters shown before the "Read more" toggle kicks in.
const TEXT_LIMIT = 180;

/* Inline Google "G" SVG — avoids external dependency on Wikipedia CDN. */
const GoogleLogo = () => (
  <svg className="w-5 h-5 ml-auto opacity-50" viewBox="0 0 24 24" aria-label="Google">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A11.96 11.96 0 0 0 1 12c0 1.94.46 3.77 1.18 5.07l3.66-2.98z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const FADE_MS = 320;

export const Testimonials = () => {
  const { t, language } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

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

  /* Crossfade transition: fade current cards out, then swap the index, then fade in.
     The total feel is ~640ms (320 out + 320 in) which keeps motion responsive (HIG micro-interaction band). */
  const goTo = useCallback(
    (direction: 1 | -1) => {
      setIsFading(true);
      window.setTimeout(() => {
        setCurrentIndex((prev) => (prev + direction + sorted.length) % sorted.length);
        setIsFading(false);
      }, FADE_MS);
    },
    [sorted.length]
  );

  const nextSlide = useCallback(() => goTo(1), [goTo]);
  const prevSlide = useCallback(() => goTo(-1), [goTo]);

  const swipeHandlers = useTouchSwipe({ onSwipeLeft: nextSlide, onSwipeRight: prevSlide });

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
      <div className="relative bg-white p-8 md:p-9 rounded-2xl shadow-xl shadow-tomo-dark/5 flex flex-col border border-tomo-cream ring-1 ring-black/[0.03] overflow-hidden">
        {/* Decorative serif quotation mark */}
        <Quote
          aria-hidden="true"
          className="absolute -top-2 -right-2 w-24 h-24 text-tomo-red/5 rotate-180"
          strokeWidth={1}
        />

        {/* Header: avatar, profile meta, Google mark. */}
        <div className="relative flex items-center gap-4 mb-4">
          <div className={`w-10 h-10 rounded-full ${getAvatarColor(review.author)} flex-shrink-0 flex items-center justify-center text-white font-bold text-sm ring-2 ring-white`}>
            {review.author.charAt(0)}
          </div>
          <div className="min-w-0">
            <h4 className="font-bold text-tomo-dark text-sm truncate">{review.author}</h4>
            <span className="text-xs text-tomo-gray/70">{reviewerMeta}</span>
          </div>
          <GoogleLogo />
        </div>

        {/* Rating + recency. */}
        <div className="relative flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          ))}
          <span className="text-xs text-tomo-gray/70 ml-2">{getRelativeDateLabel(review.timeAgoLabel)}</span>
        </div>

        {/* Optional visit/price context. */}
        {visitMeta ? (
          <p className="relative text-xs text-tomo-gray/70 mb-3">{visitMeta}</p>
        ) : null}

        {/* Review text with truncation toggle. */}
        <div className="relative flex-grow">
          <p className="text-tomo-gray leading-relaxed text-sm whitespace-pre-line">
            {displayText}
          </p>
          {needsTruncation ? (
            <button
              type="button"
              onClick={() => setIsExpanded((v) => !v)}
              className="mt-1 text-xs font-semibold tracking-wide uppercase text-tomo-red hover:underline focus:outline-none"
            >
              {isExpanded ? 'Show less' : 'Read more'}
            </button>
          ) : null}
        </div>

        {/* Optional ratings summary pill. */}
        {review.ratingsLabel ? (
          <div className="relative mt-4 rounded-xl bg-tomo-cream px-4 py-3 text-sm font-semibold text-tomo-gray border border-tomo-cream">
            {review.ratingsLabel}
          </div>
        ) : null}
      </div>
    );
  };

  return (
    <section className="py-24 md:py-32 bg-tomo-cream relative overflow-hidden">
      {/* Ambient warm glow — keeps the cream surface from reading flat */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(1000px 500px at 80% 0%, rgba(218,36,14,0.06), rgba(218,36,14,0) 60%), radial-gradient(900px 600px at 10% 100%, rgba(47,74,60,0.05), rgba(47,74,60,0) 60%)',
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          eyebrow={t.home.testimonials.eyebrow}
          title={t.home.testimonials.title}
          subtitle={t.home.testimonials.subtitle}
          className="mb-16"
        />

        <div className="relative max-w-5xl mx-auto">
          <div className="overflow-hidden py-4" {...swipeHandlers}>
            <div
              className="flex gap-8 transition-opacity ease-out"
              style={{ transitionDuration: `${FADE_MS}ms`, opacity: isFading ? 0 : 1 }}
            >
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
