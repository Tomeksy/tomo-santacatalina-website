import { useTranslation } from '../../hooks/useTranslation';

export const Introduction = () => {
  const { t } = useTranslation();

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-tomo-dark mb-4">
            {t.home.introduction.title}
          </h2>
          <p className="text-xl text-tomo-gray max-w-2xl mx-auto">
            {t.home.introduction.subtitle}
          </p>
        </div>

        <div className="flex flex-col gap-20">
          {/* Row 1: Image Left, Text Right */}
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            <div className="w-full md:w-1/2">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg group">
                <img 
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop" 
                  alt="Restaurant Atmosphere" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-tomo-dark/10 group-hover:bg-transparent transition-colors duration-500"></div>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <span className="text-tomo-red font-display font-bold tracking-wider uppercase text-sm mb-2 block">
                {t.home.introduction.col1.title}
              </span>
              <h3 className="text-3xl font-display font-bold text-tomo-dark mb-6">
                {t.home.introduction.col1.subtitle}
              </h3>
              <p className="text-tomo-gray text-lg leading-relaxed">
                {t.home.introduction.col1.body}
              </p>
            </div>
          </div>

          {/* Row 2: Image Right, Text Left (Mobile: Image Top) */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-10 md:gap-16">
            <div className="w-full md:w-1/2">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg group">
                <img 
                  src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1000&auto=format&fit=crop" 
                  alt="Healthy Cuisine" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-tomo-dark/10 group-hover:bg-transparent transition-colors duration-500"></div>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <span className="text-tomo-green font-display font-bold tracking-wider uppercase text-sm mb-2 block">
                {t.home.introduction.col2.title}
              </span>
              <h3 className="text-3xl font-display font-bold text-tomo-dark mb-6">
                {t.home.introduction.col2.subtitle}
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
