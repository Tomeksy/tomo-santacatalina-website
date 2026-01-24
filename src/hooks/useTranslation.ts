import { useLanguage } from '../context/LanguageContext';

export const useTranslation = () => {
  const { translations, language, setLanguage } = useLanguage();
  return { t: translations, language, setLanguage };
};
