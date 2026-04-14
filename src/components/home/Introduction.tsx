import { useTranslation } from '../../hooks/useTranslation';
import { SectionHeader } from '../ui/SectionHeader';
import imgStorefront from '../../../assets/photos/tomo-storefront.png';
import imgDishCaviar from '../../../assets/photos/tomo-dish-caviar.jpeg';

export const Introduction = () => {
  const { t } = useTranslation();

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow={t.home.introduction.title}
          title={t.home.introduction.subtitle}
          className="mb-20"
        />

        <div className="flex flex-col gap-24">
          {/* Row 1: Image Left, Text Right */}
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-20">
            <div className="w-full md:w-1/2">
              <div
                data-reveal="fade"
                className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/5 group transition-all duration-700 hover:shadow-2xl hover:ring-tomo-red/40 hover:shadow-[0_25px_70px_-20px_rgba(218,36,14,0.35)]"
              >
                <img
                  src={imgStorefront}
                  alt="TOMO storefront in Santa Catalina"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-tomo-dark/10 group-hover:bg-transparent transition-colors duration-500"></div>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div data-reveal="fade" className="flex items-center gap-3 mb-4">
                <span aria-hidden="true" className="h-px w-8 bg-tomo-red/70" />
                <span className="text-tomo-red font-sans font-semibold tracking-[0.3em] uppercase text-xs">
                  {t.home.introduction.col1.title}
                </span>
              </div>
              <h3
                data-reveal="underline"
                className="text-3xl md:text-4xl font-display font-bold text-tomo-dark mb-6 leading-tight"
              >
                <span className="relative inline-block">
                  {t.home.introduction.col1.subtitle}
                  <svg
                    aria-hidden="true"
                    className="reveal-underline absolute left-0 -bottom-2 w-full h-3 text-tomo-red/80"
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
              </h3>
              <p className="text-tomo-gray text-lg leading-relaxed">
                {t.home.introduction.col1.body}
              </p>
            </div>
          </div>

          {/* Row 2: Image Right, Text Left */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-10 md:gap-20">
            <div className="w-full md:w-1/2">
              <div
                data-reveal="fade"
                className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/5 group transition-all duration-700 hover:shadow-2xl hover:ring-tomo-green/40 hover:shadow-[0_25px_70px_-20px_rgba(72,187,120,0.35)]"
              >
                <img
                  src={imgDishCaviar}
                  alt="TOMO signature dish"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-tomo-dark/10 group-hover:bg-transparent transition-colors duration-500"></div>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div data-reveal="fade" className="flex items-center gap-3 mb-4">
                <span aria-hidden="true" className="h-px w-8 bg-tomo-green/70" />
                <span className="text-tomo-green font-sans font-semibold tracking-[0.3em] uppercase text-xs">
                  {t.home.introduction.col2.title}
                </span>
              </div>
              <h3
                data-reveal="underline"
                className="text-3xl md:text-4xl font-display font-bold text-tomo-dark mb-6 leading-tight"
              >
                <span className="relative inline-block">
                  {t.home.introduction.col2.subtitle}
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
              </h3>
              <p className="text-tomo-gray text-lg leading-relaxed">
                {t.home.introduction.col2.body}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
