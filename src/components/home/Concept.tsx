import { useTranslation } from '../../hooks/useTranslation';

export const Concept = () => {
  const { t } = useTranslation();

  return (
    <section className="py-24 bg-gray-50 text-tomo-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 data-reveal="float" className="text-4xl md:text-5xl font-display font-bold text-tomo-dark mb-4">
            {t.home.concept.title}
          </h2>
          <p className="text-xl text-tomo-gray max-w-2xl mx-auto">
            {t.home.concept.subtitle}
          </p>
        </div>

        <div className="flex flex-col items-center">
          {/* Clipboard wrapper (dark wood) */}
          <div className="relative w-full max-w-3xl clipboard-wood rounded-3xl p-6 sm:p-8 shadow-[0_30px_90px_rgba(17,24,39,0.25)]">
            {/* Metal clip (decorative) */}
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-3 -translate-x-1/2 w-24 h-10 drop-shadow-md clipboard-clip-settle"
              viewBox="0 0 120 50"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <linearGradient id="clipMetal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#F3F4F6" />
                  <stop offset="0.35" stopColor="#D1D5DB" />
                  <stop offset="0.7" stopColor="#9CA3AF" />
                  <stop offset="1" stopColor="#E5E7EB" />
                </linearGradient>
                <linearGradient id="clipHighlight" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="rgba(255,255,255,0)" />
                  <stop offset="0.5" stopColor="rgba(255,255,255,0.65)" />
                  <stop offset="1" stopColor="rgba(255,255,255,0)" />
                </linearGradient>
              </defs>

              {/* Base */}
              <rect x="10" y="10" width="100" height="30" rx="10" fill="url(#clipMetal)" />
              {/* Inner groove */}
              <rect x="22" y="18" width="76" height="14" rx="7" fill="rgba(17,24,39,0.18)" />
              {/* Highlight sweep */}
              <rect x="18" y="12" width="84" height="6" rx="3" fill="url(#clipHighlight)" opacity="0.75" />
            </svg>

            {/* Paper/menu card */}
            <div className="relative w-full max-w-2xl mx-auto mt-10 bg-gradient-to-b from-white to-gray-50/30 text-tomo-dark p-8 md:p-12 rounded-2xl ring-1 ring-black/5 shadow-[0_25px_70px_rgba(17,24,39,0.14),0_10px_25px_rgba(17,24,39,0.08)] transform transition-all duration-1000 animate-float-up overflow-hidden">
              {/* Paper texture + subtle light sweep */}
              <div className="pointer-events-none absolute inset-0 menu-card-grain opacity-[0.06]" />
              <div className="pointer-events-none absolute inset-0 menu-card-sheen opacity-[0.10]" />
              
              <div className="text-center">
                <span className="text-tomo-red font-display font-bold tracking-widest uppercase text-sm mb-4 block">
                  {t.home.concept.header}
                </span>
                <p className="text-lg md:text-xl leading-relaxed font-light text-tomo-gray">
                  "{t.home.concept.body}"
                </p>
                
                {/* Signature/Footer of card */}
                <div className="mt-8 pt-8 border-t border-gray-100 flex justify-center">
                  <div className="font-display font-bold text-tomo-dark text-xl">TOMO</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background Elements */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-gray-200/60 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gray-300/40 rounded-full blur-3xl translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
    </section>
  );
};
