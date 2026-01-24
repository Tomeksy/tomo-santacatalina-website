import { useTranslation } from '../../hooks/useTranslation';

export const Story = () => {
  const { t } = useTranslation();

  return (
    <section className="py-24 bg-tomo-cream text-tomo-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-tomo-red font-display font-bold tracking-widest uppercase mb-4 block">
            Est. 2025
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-tomo-dark mb-8">
            {t.home.story.title}
          </h2>
          <p className="text-xl md:text-2xl text-tomo-gray font-light leading-relaxed mb-10">
            "{t.home.story.desc}"
          </p>
          
          <div className="flex justify-center gap-12 mt-12">
            {/* Founders */}
            <div className="text-center">
              <div className="w-24 h-24 bg-tomo-gray/10 rounded-full mb-3 mx-auto border-2 border-tomo-red/50 overflow-hidden">
                 {/* Placeholder for Luc */}
                 <div className="w-full h-full bg-gray-200"></div>
              </div>
              <p className="font-display font-bold text-lg">Luc Urbany</p>
              <p className="text-sm text-tomo-gray">Co-Founder</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-tomo-gray/10 rounded-full mb-3 mx-auto border-2 border-tomo-red/50 overflow-hidden">
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
