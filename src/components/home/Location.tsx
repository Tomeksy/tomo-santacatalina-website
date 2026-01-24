import { useTranslation } from '../../hooks/useTranslation';
import { MapPin, Clock, Phone } from 'lucide-react';

export const Location = () => {
  const { t } = useTranslation();

  return (
    <section className="py-24 bg-tomo-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">
          {/* Info Side */}
          <div className="w-full md:w-1/2 p-12 flex flex-col justify-center">
            <h2 className="text-4xl font-display font-bold text-tomo-dark mb-10">
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
                  <a href="tel:+34000000000" className="text-tomo-gray hover:text-tomo-red transition-colors">
                    +34 000 000 000
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Map Side (Placeholder) */}
          <div className="w-full md:w-1/2 bg-gray-200 min-h-[400px] relative group">
            <img 
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1000&auto=format&fit=crop" 
              alt="Map Location Placeholder" 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-transparent transition-colors">
              <span className="bg-white px-6 py-3 rounded-full shadow-lg font-bold text-tomo-dark">
                View on Map
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
