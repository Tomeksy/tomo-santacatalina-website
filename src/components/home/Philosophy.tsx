import { useTranslation } from '../../hooks/useTranslation';
import { Leaf, Heart, Utensils } from 'lucide-react';

export const Philosophy = () => {
  const { t } = useTranslation();

  const cards = [
    {
      icon: <Leaf className="w-8 h-8 text-tomo-green" />,
      title: t.home.philosophy.card1.title,
      desc: t.home.philosophy.card1.desc,
    },
    {
      icon: <Heart className="w-8 h-8 text-tomo-red" />,
      title: t.home.philosophy.card2.title,
      desc: t.home.philosophy.card2.desc,
    },
    {
      icon: <Utensils className="w-8 h-8 text-tomo-dark" />,
      title: t.home.philosophy.card3.title,
      desc: t.home.philosophy.card3.desc,
    },
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 data-reveal="float" className="text-4xl md:text-5xl font-display font-bold text-tomo-dark mb-4">
            {t.home.philosophy.title}
          </h2>
          <p className="text-xl text-tomo-gray max-w-2xl mx-auto">
            {t.home.philosophy.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {cards.map((card, index) => (
            <div 
              key={index} 
              data-reveal="float"
              data-reveal-dir={index === 1 ? 'right' : 'left'}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 flex flex-col items-center text-center"
            >
              <div className="bg-white p-4 rounded-full mb-6">
                {card.icon}
              </div>
              <h3 className="text-2xl font-display font-bold text-tomo-dark mb-3">
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
