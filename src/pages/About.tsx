import { useRef, useEffect } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { useRevealOnce } from '../hooks/useRevealOnce';
import imgFounders from '../../assets/photos/founder_luc_600x400.jpg';

/* ── About page ──────────────────────────────────────────────
   Three sections: The Journey → The Founders → What's Next.
   Follows the same design tokens and reveal animations as Home.
   ──────────────────────────────────────────────────────────── */

export const About = () => {
  const { t } = useTranslation();
  const pageRef = useRef<HTMLDivElement | null>(null);
  useRevealOnce(pageRef);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div ref={pageRef} className="flex flex-col w-full">

      {/* ── The Journey ────────────────────────────────────── */}
      <section className="pt-32 pb-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-tomo-red font-display font-bold tracking-widest uppercase text-sm mb-4 block">
            {t.about.journey.label}
          </span>
          <h1
            data-reveal="float"
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-tomo-dark mb-8"
          >
            {t.about.journey.title}
          </h1>
          <p className="text-lg md:text-xl text-tomo-gray leading-relaxed whitespace-pre-line max-w-3xl mx-auto">
            {t.about.journey.body}
          </p>
        </div>
      </section>

      {/* ── The Founders ───────────────────────────────────── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
            <div className="w-full md:w-1/2">
              <div
                data-reveal="fade"
                className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg"
              >
                <img
                  src={imgFounders}
                  alt="TOMO founders"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="w-full md:w-1/2">
              <span className="text-tomo-green font-display font-bold tracking-widest uppercase text-sm mb-2 block">
                {t.about.founders.label}
              </span>
              <h2
                data-reveal="underline"
                className="text-3xl md:text-4xl font-display font-bold text-tomo-dark mb-6"
              >
                <span className="relative inline-block">
                  {t.about.founders.title}
                  <svg
                    aria-hidden="true"
                    className="reveal-underline absolute left-0 -bottom-2 w-full h-3 text-tomo-green/80"
                    viewBox="0 0 100 10"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M2 8 C 25 2, 75 2, 98 8"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      pathLength="1"
                    />
                  </svg>
                </span>
              </h2>
              <p className="text-lg text-tomo-gray leading-relaxed whitespace-pre-line">
                {t.about.founders.body}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── What's Next ────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-tomo-red font-display font-bold tracking-widest uppercase text-sm mb-4 block">
            {t.about.next.label}
          </span>
          <h2
            data-reveal="float"
            className="text-3xl md:text-4xl font-display font-bold text-tomo-dark mb-8"
          >
            {t.about.next.title}
          </h2>
          <p className="text-lg md:text-xl text-tomo-gray leading-relaxed whitespace-pre-line max-w-3xl mx-auto">
            {t.about.next.body}
          </p>
        </div>
      </section>
    </div>
  );
};
