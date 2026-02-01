import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import en from '../i18n/en.json';
import es from '../i18n/es.json';
import de from '../i18n/de.json';

type Language = 'en' | 'es' | 'de';
type Translations = typeof en;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  translations: Translations;
}

const translationsMap: Record<Language, Translations> = {
  en,
  es,
  de,
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const savedLang = localStorage.getItem('tomo-lang') as Language;
    if (savedLang && ['en', 'es', 'de'].includes(savedLang)) {
      setLanguageState(savedLang);
    } else {
      const browserLang = navigator.language.split('-')[0] as Language;
      if (['en', 'es', 'de'].includes(browserLang)) {
        setLanguageState(browserLang);
      }
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('tomo-lang', lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations: translationsMap[language] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
