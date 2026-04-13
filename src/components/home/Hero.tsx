import { useEffect, useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import heroImg from '../../../assets/photos/tomo-interior-moss.png';
import { ArrowRight } from 'lucide-react';

export const Hero = () => {
  const { t } = useTranslation();
  const [titleLine1] = t.home.hero.title.split('\n');
  const [parallaxY, setParallaxY] = useState(0);

  /* Subtle scroll-driven parallax on the hero image. Capped at 80px and
     bypassed entirely when the user prefers reduced motion. */
  useEffect(() => {
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    if (reduced) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const y = Math.min(window.scrollY * 0.25, 120);
        setParallaxY(y);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Desktop viewport contract: keep hero height to viewport minus header so the first fold remains fully hero.
  return (
    <section className="relative min-h-screen lg:min-h-[calc(100vh-6rem)] supports-[height:100svh]:lg:min-h-[calc(100svh-6rem)] flex items-center justify-center overflow-hidden">
      {/* Background with Overlay — slight over-scale to hide parallax edges */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImg}
          alt="TOMO interior with moss wall"
          className="w-full h-[115%] -top-[7.5%] absolute left-0 object-cover will-change-transform"
          style={{ transform: `translate3d(0, ${parallaxY}px, 0)` }}
        />
        <div className="absolute inset-0 bg-tomo-dark/45 backdrop-blur-[2px]"></div>
        {/* Top + bottom vignette for extra depth */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(1200px 600px at 50% 40%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.35) 100%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <div className="mb-6 inline-block px-4 py-1.5 border border-white/30 rounded-full bg-white/10 backdrop-blur-md">
          <span className="text-white text-sm font-medium tracking-wider uppercase">
            {t.home.hero.opening}
          </span>
        </div>
        
        <h1 className="text-[clamp(2.5rem,8vw,5.75rem)] font-display font-bold text-white mb-6 leading-[1.05]">
          <span className="block">{titleLine1}</span>
          {/* Rotation readability contract:
              Reserve vertical room and avoid clipping while phrases animate in place. */}
          <span className="block relative mt-2 min-h-[1.2em] overflow-visible whitespace-nowrap leading-[1.05]">
            <span className="sr-only">To Live Well</span>

            <span aria-hidden="true" className="hero-rotate__phrase hero-rotate__phrase--a">
              To be Healthy
            </span>
            <span aria-hidden="true" className="hero-rotate__phrase hero-rotate__phrase--b">
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
            href="tel:+34608979100" 
            className="group bg-tomo-red text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
          >
            {t.cta.reserve}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      {/* Desktop UX polish:
          Keep the indicator mobile-only so it does not compete with the primary desktop CTA. */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce text-white/50 lg:hidden">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-white/50 rounded-full"></div>
        </div>
      </div>
    </section>
  );
};
