import { Link } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';
import { MapPin, Clock, Phone } from 'lucide-react';

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="relative overflow-hidden bg-tomo-moss text-tomo-cream">
      {/* Ambient wash + noise — matches the Concept section for visual rhyme */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(900px 520px at 20% 0%, rgba(255,248,240,0.10), rgba(255,248,240,0) 65%), radial-gradient(700px 500px at 85% 100%, rgba(218,36,14,0.12), rgba(218,36,14,0) 60%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage:
            'repeating-linear-gradient(120deg, rgba(255,255,255,0.5) 0 1px, rgba(255,255,255,0) 1px 3px), repeating-linear-gradient(60deg, rgba(0,0,0,0.4) 0 1px, rgba(0,0,0,0) 1px 4px)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10">
        {/* Top row: wordmark + 3 info columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-10">
          {/* Wordmark block */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-4 mb-5">
              <span aria-hidden="true" className="h-px w-10 bg-tomo-cream/30" />
              <span className="font-sans font-semibold tracking-[0.3em] uppercase text-xs text-tomo-cream/70">
                Santa Catalina · Palma
              </span>
            </div>
            <h3 className="font-display font-bold italic text-5xl tracking-tight text-tomo-cream mb-4">
              TOMO
            </h3>
            <p className="text-tomo-cream/70 font-display italic text-lg max-w-xs leading-snug">
              {t.home.concept.subtitle}
            </p>
          </div>

          {/* Visit */}
          <div className="md:col-span-3">
            <h4 className="font-sans font-semibold tracking-[0.3em] uppercase text-xs text-tomo-cream/60 mb-5">
              {t.home.location.addressLabel}
            </h4>
            <div className="flex items-start gap-3 text-tomo-cream/90">
              <MapPin className="w-4 h-4 mt-1 text-tomo-red/90 flex-shrink-0" />
              <p className="whitespace-pre-line text-sm leading-relaxed">
                {t.home.location.address}
              </p>
            </div>
          </div>

          {/* Hours */}
          <div className="md:col-span-3">
            <h4 className="font-sans font-semibold tracking-[0.3em] uppercase text-xs text-tomo-cream/60 mb-5">
              {t.home.location.hoursLabel}
            </h4>
            <div className="flex items-start gap-3 text-tomo-cream/90">
              <Clock className="w-4 h-4 mt-1 text-tomo-green/90 flex-shrink-0" />
              <p className="whitespace-pre-line text-sm leading-relaxed">
                {t.home.location.hours}
              </p>
            </div>
          </div>

          {/* Navigate */}
          <div className="md:col-span-2">
            <h4 className="font-sans font-semibold tracking-[0.3em] uppercase text-xs text-tomo-cream/60 mb-5">
              {t.home.location.contactLabel}
            </h4>
            <a
              href="tel:+34608979100"
              className="flex items-start gap-3 text-tomo-cream/90 hover:text-tomo-cream transition-colors mb-6"
            >
              <Phone className="w-4 h-4 mt-1 text-tomo-cream/70 flex-shrink-0" />
              <span className="text-sm">+34 608 979 100</span>
            </a>
            <nav className="flex flex-col gap-3 text-sm">
              <Link
                to="/"
                className="group inline-flex items-center gap-2 text-tomo-cream/80 hover:text-tomo-cream transition-colors"
              >
                <span className="h-px w-3 bg-tomo-cream/40 transition-all duration-300 group-hover:w-6 group-hover:bg-tomo-red" />
                {t.nav.home}
              </Link>
              <Link
                to="/about"
                className="group inline-flex items-center gap-2 text-tomo-cream/80 hover:text-tomo-cream transition-colors"
              >
                <span className="h-px w-3 bg-tomo-cream/40 transition-all duration-300 group-hover:w-6 group-hover:bg-tomo-red" />
                {t.nav.about}
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-6 border-t border-tomo-cream/10 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-tomo-cream/50 text-xs tracking-wider uppercase">
            <span aria-hidden="true" className="h-px w-8 bg-tomo-cream/20" />
            <span>&copy; {new Date().getFullYear()} TOMO Santa Catalina</span>
          </div>
          <div className="text-tomo-cream/50 text-xs tracking-wider uppercase">
            {t.footer.rights}
          </div>
        </div>
      </div>
    </footer>
  );
};
