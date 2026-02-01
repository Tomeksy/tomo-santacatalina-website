import { useTranslation } from '../../hooks/useTranslation';
import { Check } from 'lucide-react';

export const Experience = () => {
  const { t } = useTranslation();

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Image Grid */}
          <div className="w-full lg:w-1/2 grid grid-cols-2 gap-4">
            <div data-reveal="float">
              <img 
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1000&auto=format&fit=crop" 
                alt="Restaurant Detail" 
                className="w-full h-64 object-cover rounded-2xl translate-y-8"
              />
            </div>
            <img 
              src="https://images.unsplash.com/photo-1550966871-3ed3c47e2ce2?q=80&w=1000&auto=format&fit=crop" 
              alt="Art on Wall" 
              className="w-full h-64 object-cover rounded-2xl"
            />
          </div>

          {/* Content */}
          <div className="w-full lg:w-1/2">
            <h2 data-reveal="underline" className="text-4xl md:text-5xl font-display font-bold text-tomo-dark mb-6">
              <span className="relative inline-block">
                {t.home.experience.title}
                <svg
                  aria-hidden="true"
                  className="reveal-underline absolute left-0 -bottom-2 w-full h-3 text-tomo-green/80"
                  viewBox="0 0 100 10"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 8 C 25 2, 75 2, 98 8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    pathLength="1"
                  />
                </svg>
              </span>
            </h2>
            <p className="text-lg text-tomo-gray mb-8 leading-relaxed">
              {t.home.experience.desc}
            </p>

            <ul className="space-y-4">
              {[
                t.home.experience.feature1,
                t.home.experience.feature2,
                t.home.experience.feature3
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="bg-tomo-green/10 p-1 rounded-full">
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
