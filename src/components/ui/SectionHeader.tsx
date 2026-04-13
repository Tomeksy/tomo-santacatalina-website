/* Editorial section header — the signature pattern used across every major section.
   Eyebrow with accent rules, italic serif h2, optional subtitle.
   Variants swap the color ramp for light vs dark surfaces. */

type Variant = 'light' | 'dark';
type Align = 'center' | 'left';

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  variant?: Variant;
  align?: Align;
  className?: string;
}

const textForVariant = (variant: Variant) => {
  if (variant === 'dark') {
    return {
      eyebrow: 'text-tomo-cream/70',
      rule: 'bg-tomo-cream/30',
      title: 'text-tomo-cream',
      subtitle: 'text-tomo-cream/70',
    };
  }
  return {
    eyebrow: 'text-tomo-gray/80',
    rule: 'bg-tomo-dark/20',
    title: 'text-tomo-dark',
    subtitle: 'text-tomo-gray/80',
  };
};

export const SectionHeader = ({
  eyebrow,
  title,
  subtitle,
  variant = 'light',
  align = 'center',
  className = '',
}: SectionHeaderProps) => {
  const c = textForVariant(variant);
  const isCenter = align === 'center';

  return (
    <div className={`${isCenter ? 'text-center' : 'text-left'} ${className}`}>
      <div
        data-reveal="fade"
        className={`flex items-center gap-4 mb-5 ${isCenter ? 'justify-center' : 'justify-start'}`}
      >
        <span aria-hidden="true" className={`h-px w-10 ${c.rule}`} />
        <span className={`font-sans font-semibold tracking-[0.3em] uppercase text-xs ${c.eyebrow}`}>
          {eyebrow}
        </span>
        <span aria-hidden="true" className={`h-px w-10 ${c.rule}`} />
      </div>

      <h2
        data-reveal="float"
        className={`text-4xl md:text-5xl font-display font-semibold italic leading-[1.1] ${c.title}`}
      >
        {title}
      </h2>

      {subtitle ? (
        <p
          data-reveal="fade"
          className={`font-display italic text-lg md:text-xl mt-5 max-w-2xl ${
            isCenter ? 'mx-auto' : ''
          } ${c.subtitle}`}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
};
