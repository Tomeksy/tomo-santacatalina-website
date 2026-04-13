import { useTranslation } from '../../hooks/useTranslation';

export const Concept = () => {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden bg-tomo-moss text-tomo-cream py-28 md:py-36">
      {/* Ambient lighting — warm spot + cool wash to avoid a flat panel */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(900px 520px at 20% 0%, rgba(255,248,240,0.10), rgba(255,248,240,0) 65%), radial-gradient(700px 600px at 85% 100%, rgba(218,36,14,0.14), rgba(218,36,14,0) 60%)',
        }}
      />
      {/* Fine noise for texture — keeps moss panel from looking plastic */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            'repeating-linear-gradient(120deg, rgba(255,255,255,0.5) 0 1px, rgba(255,255,255,0) 1px 3px), repeating-linear-gradient(60deg, rgba(0,0,0,0.4) 0 1px, rgba(0,0,0,0) 1px 4px)',
        }}
      />

      <div className="relative max-w-4xl mx-auto px-6 sm:px-8 text-center">
        {/* Eyebrow with accent rule */}
        <div data-reveal="fade" className="flex items-center justify-center gap-4 mb-10">
          <span aria-hidden="true" className="h-px w-10 bg-tomo-cream/40" />
          <span className="text-tomo-cream/80 font-sans font-semibold tracking-[0.3em] uppercase text-xs">
            {t.home.concept.header}
          </span>
          <span aria-hidden="true" className="h-px w-10 bg-tomo-cream/40" />
        </div>

        <h2
          data-reveal="float"
          className="text-4xl md:text-6xl font-display font-semibold text-tomo-cream leading-[1.05] mb-6"
        >
          {t.home.concept.title}
        </h2>

        <p
          data-reveal="fade"
          className="italic text-lg md:text-xl font-display text-tomo-cream/70 mb-14"
        >
          {t.home.concept.subtitle}
        </p>

        {/* Editorial pull quote — large serif, soft contrast, decorative quotation mark */}
        <div data-reveal="float" className="relative">
          <span
            aria-hidden="true"
            className="absolute -top-16 md:-top-20 left-1/2 -translate-x-1/2 font-display text-[10rem] md:text-[14rem] leading-none text-tomo-cream/10 select-none"
          >
            &ldquo;
          </span>
          <p className="relative text-lg md:text-2xl leading-relaxed md:leading-[1.7] font-light text-tomo-cream/90 whitespace-pre-line max-w-3xl mx-auto">
            {t.home.concept.body}
          </p>
        </div>

        {/* Signature */}
        <div data-reveal="fade" className="mt-16 flex items-center justify-center gap-6">
          <span aria-hidden="true" className="h-px w-16 bg-tomo-cream/30" />
          <span className="font-display font-bold text-tomo-cream tracking-[0.35em] text-sm">TOMO</span>
          <span aria-hidden="true" className="h-px w-16 bg-tomo-cream/30" />
        </div>
      </div>
    </section>
  );
};
