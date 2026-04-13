import { useTranslation } from '../../hooks/useTranslation';
import { SectionHeader } from '../ui/SectionHeader';
import imgCheers from '../../../assets/photos/tomo-cheers.png';
import imgSign from '../../../assets/photos/tomo-sign-closeup.png';
import { Check } from 'lucide-react';

export const Experience = () => {
  const { t } = useTranslation();

  return (
    <section className="relative py-24 md:py-32 bg-tomo-cream overflow-hidden">
      {/* Ambient warm glow — keeps the cream surface from reading flat */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(900px 500px at 90% 0%, rgba(47,74,60,0.05), rgba(47,74,60,0) 60%), radial-gradient(800px 600px at 5% 100%, rgba(218,36,14,0.05), rgba(218,36,14,0) 60%)',
        }}
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow={t.home.experience.eyebrow}
          title={t.home.experience.title}
          className="mb-16"
        />

        <div className="flex flex-col lg:flex-row items-center gap-12 md:gap-20">
          {/* Image pair — staggered to feel editorial */}
          <div className="w-full lg:w-1/2 grid grid-cols-2 gap-4 md:gap-5">
            <div data-reveal="fade" className="aspect-[3/4] rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/5 translate-y-6">
              <img
                src={imgCheers}
                alt="Guests clinking wine glasses at TOMO"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            <div data-reveal="fade" className="aspect-[3/4] rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/5">
              <img
                src={imgSign}
                alt="Hola TOMO sign"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div className="w-full lg:w-1/2">
            <p data-reveal="fade" className="text-lg text-tomo-gray mb-8 leading-relaxed">
              {t.home.experience.desc}
            </p>

            <ul className="space-y-4">
              {[
                t.home.experience.feature1,
                t.home.experience.feature2,
                t.home.experience.feature3,
              ].map((feature, i) => (
                <li
                  key={i}
                  data-reveal="fade"
                  style={{ animationDelay: `${i * 120}ms` }}
                  className="flex items-center gap-3"
                >
                  <div className="bg-tomo-green/10 p-1.5 rounded-full">
                    <Check className="w-5 h-5 text-tomo-green" />
                  </div>
                  <span className="text-tomo-dark font-medium text-lg">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
