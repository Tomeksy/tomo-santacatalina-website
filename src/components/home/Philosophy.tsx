import { useTranslation } from '../../hooks/useTranslation';
import { SectionHeader } from '../ui/SectionHeader';
import { Leaf, Heart, Utensils } from 'lucide-react';

export const Philosophy = () => {
  const { t } = useTranslation();

  const cards = [
    {
      icon: <Leaf className="w-8 h-8 text-tomo-green" />,
      iconBg: 'bg-tomo-green/10',
      title: t.home.philosophy.card1.title,
      desc: t.home.philosophy.card1.desc,
    },
    {
      icon: <Heart className="w-8 h-8 text-tomo-red" />,
      iconBg: 'bg-tomo-red/10',
      title: t.home.philosophy.card2.title,
      desc: t.home.philosophy.card2.desc,
    },
    {
      icon: <Utensils className="w-8 h-8 text-tomo-dark" />,
      iconBg: 'bg-tomo-dark/10',
      title: t.home.philosophy.card3.title,
      desc: t.home.philosophy.card3.desc,
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow={t.home.philosophy.eyebrow}
          title={t.home.philosophy.title}
          subtitle={t.home.philosophy.subtitle}
          className="mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {cards.map((card, index) => (
            <div
              key={index}
              data-reveal="float"
              style={{ animationDelay: `${index * 120}ms` }}
              className="group bg-tomo-cream/60 p-8 md:p-10 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 ease-out border border-tomo-cream ring-1 ring-black/[0.03] flex flex-col items-center text-center"
            >
              <div className={`${card.iconBg} p-4 rounded-full mb-6 transition-transform duration-500 ease-out group-hover:scale-110`}>
                {card.icon}
              </div>
              <h3 className="text-2xl font-display font-semibold italic text-tomo-dark mb-3">
                {card.title}
              </h3>
              <p className="text-tomo-gray leading-relaxed">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
