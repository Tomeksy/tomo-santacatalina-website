import { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';
import { Menu, X } from 'lucide-react';
import tomoLogo from '../../../assets/logo_and_brand/tomologofull_header_size.png';

export const Header = () => {
  const { t, language, setLanguage } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const toggleRef = useRef<HTMLButtonElement | null>(null);

  /* Scroll state: tightens the header and intensifies the glass when the user leaves the hero. */
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Close mobile menu on outside click */
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        menuRef.current && !menuRef.current.contains(target) &&
        toggleRef.current && !toggleRef.current.contains(target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isMenuOpen]);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `relative transition-colors font-medium tracking-wide ${
      isActive ? 'text-tomo-red' : 'text-tomo-dark hover:text-tomo-red'
    } after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-tomo-red after:transition-transform after:duration-300 ${
      isActive ? 'after:scale-x-100' : 'hover:after:scale-x-100'
    }`;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isScrolled
          ? 'bg-white/92 backdrop-blur-md shadow-[0_8px_30px_-10px_rgba(17,24,39,0.18)]'
          : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`relative flex justify-between items-center transition-all duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isScrolled ? 'h-20' : 'h-24'
          }`}
        >
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="inline-flex items-center" aria-label="TOMO home">
              <img
                src={tomoLogo}
                alt="TOMO"
                className={`w-auto transition-all duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isScrolled ? 'h-16' : 'h-20'
                }`}
                loading="eager"
              />
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-10">
            <NavLink to="/" end className={navLinkClass}>
              {t.nav.home}
            </NavLink>
            <span
              className="text-tomo-gray/40 cursor-not-allowed font-medium tracking-wide"
              title="Coming soon"
            >
              {t.nav.menu}
            </span>
            <NavLink to="/about" className={navLinkClass}>
              {t.nav.about}
            </NavLink>

            {/* Language switcher — rules separate it from nav and CTA */}
            <div className="flex items-center gap-3 pl-6 ml-2 border-l border-tomo-dark/10">
              {(['en', 'es', 'de'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`text-xs font-semibold tracking-[0.2em] transition-colors uppercase ${
                    language === lang ? 'text-tomo-red' : 'text-tomo-gray hover:text-tomo-dark'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            <a
              href="tel:+34608979100"
              className="group bg-tomo-red text-white px-6 py-2.5 rounded-full font-medium shadow-md hover:shadow-xl hover:shadow-tomo-red/25 hover:-translate-y-0.5 transition-all duration-300"
            >
              {t.cta.reserve}
            </a>
          </nav>

          {/* Mobile/tablet menu button */}
          <div className="lg:hidden flex items-center">
            <button
              ref={toggleRef}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-tomo-dark hover:text-tomo-red p-2 transition-colors"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Menu — fade + slide-down, tighter easing for a premium feel.
          Absolute positioning means the panel floats beneath the header without pushing layout. */}
      <div
        ref={menuRef}
        aria-hidden={!isMenuOpen}
        className={`lg:hidden absolute left-0 right-0 top-full bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-xl transition-all duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)] origin-top ${
          isMenuOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-3 pointer-events-none'
        }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-4">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `block px-3 py-2 text-lg font-medium ${isActive ? 'text-tomo-red' : 'text-tomo-dark hover:text-tomo-red'}`
            }
            onClick={() => setIsMenuOpen(false)}
          >
            {t.nav.home}
          </NavLink>
          <div className="px-3 py-2 text-lg font-medium text-tomo-gray/40">
            {t.nav.menu}
          </div>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `block px-3 py-2 text-lg font-medium ${isActive ? 'text-tomo-red' : 'text-tomo-dark hover:text-tomo-red'}`
            }
            onClick={() => setIsMenuOpen(false)}
          >
            {t.nav.about}
          </NavLink>

          <div className="flex space-x-6 px-3 py-4 border-t border-gray-100 mt-2">
            {(['en', 'es', 'de'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`text-xs font-semibold tracking-[0.2em] uppercase ${
                  language === lang ? 'text-tomo-red' : 'text-tomo-gray'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          <a
            href="tel:+34608979100"
            className="block w-full text-center bg-tomo-red text-white px-6 py-3 rounded-full font-medium hover:bg-red-700 transition-colors"
          >
            {t.cta.reserve}
          </a>
        </div>
      </div>
    </header>
  );
};
