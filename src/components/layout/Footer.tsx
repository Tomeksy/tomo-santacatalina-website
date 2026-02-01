import { useTranslation } from '../../hooks/useTranslation';

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-tomo-moss text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h3 className="font-display font-bold text-2xl text-white mb-2">TOMO</h3>
            <p className="text-white/70 text-sm max-w-xs">
              {t.footer.address}
            </p>
          </div>
          
          <div className="text-white/60 text-sm">
            &copy; {new Date().getFullYear()} TOMO Santa Catalina. {t.footer.rights}
          </div>
        </div>
      </div>
    </footer>
  );
};
