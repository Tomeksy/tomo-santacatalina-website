import { Link } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';
import imgFounderLuc from '../../../assets/photos/founder_luc_profile_image.jpg';
import imgFounderTom from '../../../assets/photos/founder_tom_profile_image.jpg';
import imgFounderAndreas from '../../../assets/photos/founder_andreas_profile_image.jpg';

export const Story = () => {
  const { t } = useTranslation();

  const founders = [
    { name: "Luc Urbany", role: "Co-Founder", image: imgFounderLuc },
    { name: "Tom Symantzyk", role: "Co-Founder", image: imgFounderTom },
    { name: "Andreas Hoffmann", role: "Co-Founder", image: imgFounderAndreas }
  ];

  return (
    <section className="py-24 bg-white text-tomo-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-tomo-red font-display font-bold tracking-widest uppercase mb-4 block">
            Est. 2025
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-tomo-dark mb-8">
            {t.home.story.title}
          </h2>
          <p className="text-xl md:text-2xl text-tomo-gray font-light leading-relaxed mb-16 max-w-3xl mx-auto">
            "{t.home.story.desc}"
          </p>
          
          {/* Founder cards intentionally stay image-first for quick recognition. */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
            {founders.map((founder, index) => (
              <div key={index} className="text-center group">
                <div className="w-24 h-24 md:w-32 md:h-32 bg-tomo-stone rounded-full mb-4 mx-auto border-2 border-transparent group-hover:border-tomo-red/30 transition-colors overflow-hidden">
                  <img
                    src={founder.image}
                    alt={`${founder.name} profile`}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="font-display font-bold text-base md:text-lg leading-tight mb-1">{founder.name}</p>
                <p className="text-xs md:text-sm text-tomo-gray uppercase tracking-wide">{founder.role}</p>
              </div>
            ))}
          </div>

          <div className="mt-16">
            <Link
              to="/about"
              className="text-tomo-red font-bold hover:text-red-700 transition-colors uppercase tracking-wider text-sm border-b-2 border-tomo-red pb-1"
            >
              {t.home.story.link}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
