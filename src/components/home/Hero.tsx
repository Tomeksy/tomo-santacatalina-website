import { useTranslation } from '../../hooks/useTranslation';
import { ArrowRight } from 'lucide-react';

export const Hero = () => {
  const { t } = useTranslation();
  const [titleLine1] = t.home.hero.title.split('\n');

  return (
    <section className="relative min-h-screen supports-[height:100svh]:min-h-[100svh] sm:min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=2574&auto=format&fit=crop" 
          alt="Tomo Interior Atmosphere" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-tomo-dark/40 backdrop-blur-[2px]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="mb-6 inline-block px-4 py-1.5 border border-white/30 rounded-full bg-white/10 backdrop-blur-md">
          <span className="text-white text-sm font-medium tracking-wider uppercase">
            {t.home.hero.opening}
          </span>
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-6 leading-tight">
          <span className="block">{titleLine1}</span>
          <span className="block relative h-[1.25em] overflow-hidden whitespace-nowrap text-5xl md:text-7xl lg:text-8xl">
            {/* Stable accessible label (final state) */}
            <span className="sr-only">To Live Well</span>

            {/* Visual-only rotating subline (runs once) */}
            <span aria-hidden="true" className="hero-rotate__phrase hero-rotate__phrase--a text-[clamp(2.4rem,10vw,3rem)] sm:text-5xl md:text-7xl lg:text-8xl">
  To be Healthy
</span>

<span aria-hidden="true" className="hero-rotate__phrase hero-rotate__phrase--b text-[clamp(2.4rem,10vw,3rem)] sm:text-5xl md:text-7xl lg:text-8xl">
  To be Energized
</span>
            <span aria-hidden="true" className="hero-rotate__phrase hero-rotate__phrase--final">
              To Live Well
            </span>
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-tomo-cream/90 font-light mb-10 max-w-2xl mx-auto">
          {t.home.hero.subtitle}
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a 
            href="tel:+34000000000" 
            className="group bg-tomo-red text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
          >
            {t.cta.reserve}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 sm:bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-white/50">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-white/50 rounded-full"></div>
        </div>
      </div>
    </section>
  );
};
