/* ── 404 Not Found ────────────────────────────────────────────
   Catch-all page for unmatched routes.
   Keeps the same layout/design tokens as the rest of the site.
   ──────────────────────────────────────────────────────────── */
import { Link } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';

export const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <span className="text-tomo-red font-display font-bold tracking-widest uppercase text-sm mb-4 block">
        404
      </span>
      <h1 className="text-5xl md:text-7xl font-display font-bold text-tomo-dark mb-6">
        Page Not Found
      </h1>
      <p className="text-lg text-tomo-gray max-w-md mx-auto mb-10">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="bg-tomo-red text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-red-700 transition-colors shadow-lg hover:shadow-xl"
      >
        {t.nav.home}
      </Link>
    </div>
  );
};
