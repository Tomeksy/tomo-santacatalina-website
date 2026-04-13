import { Link } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';
import { SectionHeader } from '../ui/SectionHeader';
import imgFounderLuc from '../../../assets/photos/founder_luc_profile_image.jpg';
import imgFounderTom from '../../../assets/photos/founder_tom_profile_image.jpg';
import imgFounderAndreas from '../../../assets/photos/founder_andreas_profile_image.jpg';

export const Story = () => {
  const { t } = useTranslation();

  const founders = [
    { name: 'Luc Urbany', role: 'Co-Founder', image: imgFounderLuc },
    { name: 'Tom Symantzyk', role: 'Co-Founder', image: imgFounderTom },
    { name: 'Andreas Hoffmann', role: 'Co-Founder', image: imgFounderAndreas },
  ];

  return (
    <section className="py-24 md:py-32 bg-white text-tomo-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <SectionHeader
            eyebrow={t.home.story.eyebrow}
            title={t.home.story.title}
            className="mb-10"
          />

          {/* Editorial pull quote — keeps the desc prominent as a statement, not a subtitle */}
          <p
            data-reveal="fade"
            className="text-xl md:text-2xl font-display italic text-tomo-gray leading-relaxed mb-16 max-w-3xl mx-auto"
          >
            &ldquo;{t.home.story.desc}&rdquo;
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
            {founders.map((founder, index) => (
              <div
                key={index}
                data-reveal="float"
                style={{ animationDelay: `${index * 140}ms` }}
                className="text-center group"
              >
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full mb-4 mx-auto ring-2 ring-transparent group-hover:ring-tomo-red/40 group-hover:shadow-[0_10px_40px_-10px_rgba(218,36,14,0.35)] transition-all duration-500 overflow-hidden">
                  <img
                    src={founder.image}
                    alt={`${founder.name} profile`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <p className="font-display font-semibold italic text-base md:text-lg leading-tight mb-1">
                  {founder.name}
                </p>
                <p className="text-xs md:text-sm text-tomo-gray/80 uppercase tracking-[0.2em]">
                  {founder.role}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-tomo-red font-semibold uppercase tracking-[0.2em] text-xs border-b border-tomo-red pb-1 hover:gap-3 transition-all duration-300"
            >
              {t.home.story.link}
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
