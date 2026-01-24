import { useTranslation } from '../../hooks/useTranslation';

export const Concept = () => {
  const { t } = useTranslation();

  return (
    <section className="py-24 bg-gray-50 text-tomo-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-tomo-dark mb-4">
            {t.home.concept.title}
          </h2>
          <p className="text-xl text-tomo-gray max-w-2xl mx-auto">
            {t.home.concept.subtitle}
          </p>
        </div>

        <div className="flex flex-col items-center">
          {/* Animated Menu Card */}
          <div className="relative w-full max-w-2xl bg-white text-tomo-dark p-8 md:p-12 rounded-lg shadow-2xl transform transition-all duration-1000 animate-float-up">
            {/* Decorative 'tape' or element */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-6 bg-tomo-red/20 rotate-1"></div>
            
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
      
      {/* Background Elements */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-gray-200/60 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gray-300/40 rounded-full blur-3xl translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
    </section>
  );
};
