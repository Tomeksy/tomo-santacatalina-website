/* ── ScrollToTop ──────────────────────────────────────────────
   Restores scroll position to top on every route change.
   Place once inside <BrowserRouter>.
   ──────────────────────────────────────────────────────────── */
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};
