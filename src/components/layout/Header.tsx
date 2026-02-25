import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';
import { Menu, X } from 'lucide-react';
import tomoLogo from '../../../assets/logo_and_brand/tomologofull_header_size.png';

export const Header = () => {
  const { t, language, setLanguage } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm/50">
      {/* Gradient spans the full header width, not constrained to inner container */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-gray-400/55 via-gray-200/18 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex justify-between items-center h-24">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="inline-flex items-center">
              <img
                src={tomoLogo}
                alt="TOMO"
                className="h-20 w-auto"
                loading="eager"
              />
            </Link>
          </div>

          {/* Desktop Nav — visible at lg (1024px+), hamburger on tablet */}
          <nav className="hidden lg:flex space-x-8 items-center">
            <Link to="/" className="text-tomo-dark hover:text-tomo-red transition-colors font-medium">
              {t.nav.home}
            </Link>
            <span className="text-tomo-gray/40 cursor-not-allowed" title="Coming soon">{t.nav.menu}</span>
            <Link to="/about" className="text-tomo-dark hover:text-tomo-red transition-colors font-medium">
              {t.nav.about}
            </Link>
            
            {/* Language Switcher */}
            <div className="flex items-center space-x-3 ml-4 border-l border-tomo-gray/20 pl-6">
              {(['en', 'es', 'de'] as const).map((lang) => (
                <button 
                  key={lang}
                  onClick={() => setLanguage(lang)} 
                  className={`text-sm font-medium transition-colors uppercase ${
                    language === lang ? 'text-tomo-red' : 'text-tomo-gray hover:text-tomo-dark'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            <a 
              href="tel:+34000000000" 
              className="bg-tomo-red text-white px-6 py-2 rounded-full font-medium hover:bg-red-700 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5 duration-200"
            >
              {t.cta.reserve}
            </a>
          </nav>

          {/* Mobile/tablet menu button — visible below lg */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-tomo-dark hover:text-tomo-red p-2 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-4">
            <Link 
              to="/" 
              className="block px-3 py-2 text-lg font-medium text-tomo-dark hover:text-tomo-red"
              onClick={() => setIsMenuOpen(false)}
            >
              {t.nav.home}
            </Link>
            <div className="px-3 py-2 text-lg font-medium text-tomo-gray/40">
              {t.nav.menu}
            </div>
            <Link
              to="/about"
              className="block px-3 py-2 text-lg font-medium text-tomo-dark hover:text-tomo-red"
              onClick={() => setIsMenuOpen(false)}
            >
              {t.nav.about}
            </Link>
            
            <div className="flex space-x-6 px-3 py-4 border-t border-gray-100 mt-2">
              {(['en', 'es', 'de'] as const).map((lang) => (
                <button 
                  key={lang}
                  onClick={() => setLanguage(lang)} 
                  className={`text-base font-medium uppercase ${
                    language === lang ? 'text-tomo-red' : 'text-tomo-gray'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            <a 
              href="tel:+34000000000" 
              className="block w-full text-center bg-tomo-red text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
            >
              {t.cta.reserve}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
