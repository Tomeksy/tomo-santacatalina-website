import { useRef } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { useRevealOnce } from '../hooks/useRevealOnce';
import { SectionHeader } from '../components/ui/SectionHeader';
import imgFounders from '../../assets/photos/tomo_founders.jpg';

/* About page — three editorial chapters: The Journey → The Founders → What's Next.
   Mirrors the Home surface rhythm (white → cream → white) and shared SectionHeader. */

export const About = () => {
  const { t } = useTranslation();
  const pageRef = useRef<HTMLDivElement | null>(null);
  useRevealOnce(pageRef);

  return (
    <div ref={pageRef} className="flex flex-col w-full">
      {/* The Journey — opens on white to hand off cleanly from the header */}
      <section className="relative pt-28 md:pt-36 pb-24 md:pb-32 bg-white overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeader
            eyebrow={t.about.journey.label}
            title={t.about.journey.title}
            className="mb-10"
          />
          <p
            data-reveal="fade"
            className="text-lg md:text-xl text-tomo-gray leading-relaxed whitespace-pre-line max-w-3xl mx-auto"
          >
            {t.about.journey.body}
          </p>
        </div>
      </section>

      {/* The Founders — cream editorial panel with feature image */}
      <section className="relative py-24 md:py-32 bg-tomo-cream overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(1000px 500px at 85% 0%, rgba(47,74,60,0.05), rgba(47,74,60,0) 60%), radial-gradient(800px 600px at 5% 100%, rgba(218,36,14,0.05), rgba(218,36,14,0) 60%)',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow={t.about.founders.label}
            title={t.about.founders.title}
            className="mb-16"
          />

          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
            <div className="w-full md:w-1/2">
              <div
                data-reveal="fade"
                className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/5"
              >
                <img
                  src={imgFounders}
                  alt="TOMO founders"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="w-full md:w-1/2">
              <p
                data-reveal="fade"
                className="text-lg text-tomo-gray leading-relaxed whitespace-pre-line"
              >
                {t.about.founders.body}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What's Next — closes back to white before the footer */}
      <section className="relative py-24 md:py-32 bg-white overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeader
            eyebrow={t.about.next.label}
            title={t.about.next.title}
            className="mb-10"
          />
          <p
            data-reveal="fade"
            className="text-lg md:text-xl text-tomo-gray leading-relaxed whitespace-pre-line max-w-3xl mx-auto"
          >
            {t.about.next.body}
          </p>
        </div>
      </section>
    </div>
  );
};
