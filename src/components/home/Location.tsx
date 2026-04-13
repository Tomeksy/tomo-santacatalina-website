import { useTranslation } from '../../hooks/useTranslation';
import { SectionHeader } from '../ui/SectionHeader';
import imgGoogleMaps from '../../../assets/photos/google_maps_screenshot.png';
import { MapPin, Clock, Phone } from 'lucide-react';

const GOOGLE_MAPS_URL = 'https://maps.app.goo.gl/rSj9TtbXUx3RsKraA';

export const Location = () => {
  const { t } = useTranslation();

  return (
    <section className="relative py-24 md:py-32 bg-tomo-cream overflow-hidden">
      {/* Ambient warm glow — ties Location to the rest of the cream rhythm */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(1000px 500px at 80% 0%, rgba(218,36,14,0.05), rgba(218,36,14,0) 60%), radial-gradient(900px 600px at 10% 100%, rgba(47,74,60,0.05), rgba(47,74,60,0) 60%)',
        }}
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow={t.home.location.eyebrow}
          title={t.home.location.title}
          className="mb-16"
        />

        <div className="bg-white rounded-3xl shadow-xl shadow-tomo-dark/5 overflow-hidden flex flex-col md:flex-row border border-tomo-cream ring-1 ring-black/[0.03]">
          {/* Info Side */}
          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="bg-tomo-red/10 p-3 rounded-full">
                  <MapPin className="w-6 h-6 text-tomo-red" />
                </div>
                <div>
                  <h3 className="font-sans font-semibold tracking-[0.2em] uppercase text-xs text-tomo-gray/80 mb-2">
                    {t.home.location.addressLabel}
                  </h3>
                  <p className="text-tomo-dark whitespace-pre-line leading-relaxed">
                    {t.home.location.address}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-tomo-green/10 p-3 rounded-full">
                  <Clock className="w-6 h-6 text-tomo-green" />
                </div>
                <div>
                  <h3 className="font-sans font-semibold tracking-[0.2em] uppercase text-xs text-tomo-gray/80 mb-2">
                    {t.home.location.hoursLabel}
                  </h3>
                  <p className="text-tomo-dark whitespace-pre-line leading-relaxed">
                    {t.home.location.hours}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-tomo-dark/10 p-3 rounded-full">
                  <Phone className="w-6 h-6 text-tomo-dark" />
                </div>
                <div>
                  <h3 className="font-sans font-semibold tracking-[0.2em] uppercase text-xs text-tomo-gray/80 mb-2">
                    {t.home.location.contactLabel}
                  </h3>
                  <a href="tel:+34608979100" className="text-tomo-dark hover:text-tomo-red transition-colors">
                    +34 608 979 100
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Map CTA contract: panel + button both open Google Maps in a new tab.
             Mobile needs an explicit height — h-full inside a stacked flex child does not resolve. */}
          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open TOMO location in Google Maps (new tab)"
            className="w-full md:w-1/2 h-72 sm:h-80 md:h-auto md:min-h-[460px] bg-gray-200 relative group block overflow-hidden"
          >
            <img
              src={imgGoogleMaps}
              alt="Google Maps location of TOMO in Palma"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/0 transition-colors">
              <span className="bg-white px-6 py-3 rounded-full shadow-lg font-semibold text-tomo-dark tracking-wide transition-transform duration-300 group-hover:-translate-y-0.5">
                {t.home.location.mapCta}
              </span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};
