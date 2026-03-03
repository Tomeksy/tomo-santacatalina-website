import { useTranslation } from '../../hooks/useTranslation';
import imgGoogleMaps from '../../../assets/photos/google_maps_screenshot.png';
import { MapPin, Clock, Phone } from 'lucide-react';

const GOOGLE_MAPS_URL = 'https://maps.app.goo.gl/rSj9TtbXUx3RsKraA';

export const Location = () => {
  const { t } = useTranslation();

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">
          {/* Info Side */}
          <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-center">
            <h2 data-reveal="float" className="text-4xl font-display font-bold text-tomo-dark mb-10">
              {t.home.location.title}
            </h2>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="bg-tomo-red/10 p-3 rounded-full">
                  <MapPin className="w-6 h-6 text-tomo-red" />
                </div>
                <div>
                  <h3 className="font-bold text-tomo-dark mb-1">Address</h3>
                  <p className="text-tomo-gray whitespace-pre-line">
                    {t.home.location.address}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-tomo-green/10 p-3 rounded-full">
                  <Clock className="w-6 h-6 text-tomo-green" />
                </div>
                <div>
                  <h3 className="font-bold text-tomo-dark mb-1">Hours</h3>
                  <p className="text-tomo-gray whitespace-pre-line">
                    {t.home.location.hours}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-tomo-dark/10 p-3 rounded-full">
                  <Phone className="w-6 h-6 text-tomo-dark" />
                </div>
                <div>
                  <h3 className="font-bold text-tomo-dark mb-1">Contact</h3>
                  <a href="tel:+34608979100" className="text-tomo-gray hover:text-tomo-red transition-colors">
                    +34 608 979 100
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Map CTA contract: panel + button both open Google Maps in a new tab. */}
          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open TOMO location in Google Maps (new tab)"
            className="w-full md:w-1/2 bg-gray-200 min-h-[400px] relative group block"
          >
            <img 
              src={imgGoogleMaps}
              alt="Google Maps location of TOMO in Palma" 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-transparent transition-colors">
              <span className="bg-white px-6 py-3 rounded-full shadow-lg font-bold text-tomo-dark">
                View on Google Maps
              </span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};
