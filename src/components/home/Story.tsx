import { useTranslation } from '../../hooks/useTranslation';

export const Story = () => {
  const { t } = useTranslation();

  return (
    <section className="py-24 bg-white text-tomo-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-tomo-red font-display font-bold tracking-widest uppercase mb-4 block">
            Est. 2025
          </span>
          <h2 data-reveal="underline" className="text-4xl md:text-5xl font-display font-bold text-tomo-dark mb-8">
            <span className="relative inline-block">
              {t.home.story.title}
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
          <p className="text-xl md:text-2xl text-tomo-gray font-light leading-relaxed mb-10">
            "{t.home.story.desc}"
          </p>
          
          <div className="flex justify-center gap-12 mt-12">
            {/* Founders */}
            <div className="text-center">
              <div data-reveal="float" className="w-24 h-24 bg-tomo-gray/10 rounded-full mb-3 mx-auto border-2 border-tomo-red/50 overflow-hidden">
                 {/* Placeholder for Luc */}
                 <div className="w-full h-full bg-gray-200"></div>
              </div>
              <p className="font-display font-bold text-lg">Luc Urbany</p>
              <p className="text-sm text-tomo-gray">Co-Founder</p>
            </div>
            <div className="text-center">
              <div data-reveal="float" className="w-24 h-24 bg-tomo-gray/10 rounded-full mb-3 mx-auto border-2 border-tomo-red/50 overflow-hidden">
                 {/* Placeholder for Tom */}
                 <div className="w-full h-full bg-gray-200"></div>
              </div>
              <p className="font-display font-bold text-lg">Tom Symantzyk</p>
              <p className="text-sm text-tomo-gray">Co-Founder</p>
            </div>
          </div>

          <div className="mt-12">
            <button className="text-tomo-red font-bold hover:text-red-700 transition-colors uppercase tracking-wider text-sm border-b-2 border-tomo-red pb-1">
              {t.home.story.link}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
