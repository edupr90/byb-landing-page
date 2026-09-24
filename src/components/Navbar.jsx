import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import LanguagePicker from './LanguagePicker';
import { useT } from '../i18n';
import { APP_STORE_URL, PLAY_STORE_URL } from '../constants';

const NAV_LINKS = [
  { key: 'features', href: '#features' },
  { key: 'shared', href: '/shared' },
  { key: 'faq', href: '#faq' },
];

export default function Navbar({ dark, setDark }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useT();
  const isHome = location.pathname === '/';
  // On inner pages the bar sits on a light ground from the start.
  const solid = scrolled || !isHome;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleNavClick = (href) => {
    setMobileOpen(false);
    if (href.startsWith('/')) {
      navigate(href);
      return;
    }
    if (!href.startsWith('#')) return;
    if (!isHome) {
      navigate('/' + href);
      return;
    }
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          solid
            ? 'bg-white/80 dark:bg-surface-950/80 backdrop-blur-2xl shadow-lg shadow-black/[0.04] dark:shadow-black/30 border-b border-surface-200/50 dark:border-surface-800/50'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-3">
            <Link to="/" className="flex items-center gap-2.5 group shrink-0" onClick={() => setMobileOpen(false)}>
              {/* The app icon is a white square, so it needs an edge of its own
                  to stay visible against the white scrolled bar. */}
              <img
                src="/byb-icon-128.png"
                alt=""
                width={36}
                height={36}
                className="w-9 h-9 rounded-[10px] ring-1 ring-surface-900/10 dark:ring-white/10 shadow-lg shadow-brand-600/20 group-hover:shadow-brand-600/40 transition-shadow duration-300"
              />
              <span
                className={`font-display font-bold text-lg tracking-tight transition-colors duration-300 ${
                  solid ? 'text-surface-900 dark:text-white' : 'text-white'
                }`}
              >
                BYB
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.key}
                  onClick={() => handleNavClick(link.href)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    solid
                      ? 'text-surface-500 hover:text-surface-900 hover:bg-surface-100 dark:text-surface-400 dark:hover:text-white dark:hover:bg-surface-800'
                      : 'text-white/75 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {t(`nav.${link.key}`)}
                </button>
              ))}
            </div>

            {/* Desktop actions */}
            <div className="hidden lg:flex items-center gap-2">
              <LanguagePicker onSurface={solid} />
              <button
                onClick={() => setDark(!dark)}
                className={`p-2.5 rounded-xl transition-all duration-200 ${
                  solid
                    ? 'text-surface-400 hover:text-surface-700 hover:bg-surface-100 dark:text-surface-500 dark:hover:text-surface-200 dark:hover:bg-surface-800'
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
                aria-label={t('nav.theme')}
              >
                {dark ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1 px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold transition-colors duration-200 shadow-lg shadow-brand-600/25"
              >
                {t('nav.getApp')}
              </a>
            </div>

            {/* Mobile actions */}
            <div className="flex lg:hidden items-center gap-1">
              <LanguagePicker onSurface={solid} />
              <button
                onClick={() => setDark(!dark)}
                className={`p-2 rounded-xl transition-colors ${
                  solid ? 'text-surface-500 dark:text-surface-400' : 'text-white/60'
                }`}
                aria-label={t('nav.theme')}
              >
                {dark ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={`p-2 rounded-xl transition-colors ${
                  solid ? 'text-surface-700 dark:text-surface-200' : 'text-white'
                }`}
                aria-label={t('nav.menu')}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-72 z-50 bg-white dark:bg-surface-900 shadow-2xl p-6 pt-20 lg:hidden border-l border-surface-200 dark:border-surface-800 overflow-y-auto"
          >
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.key}
                  onClick={() => handleNavClick(link.href)}
                  className="w-full text-left px-4 py-3 rounded-xl text-surface-700 dark:text-surface-200 font-medium hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
                >
                  {t(`nav.${link.key}`)}
                </button>
              ))}
              <hr className="my-4 border-surface-200 dark:border-surface-700" />
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:scale-[1.02] active:scale-[0.98] transition-transform"
              >
                <img src="/screenshots/appstore.png" alt={t('common.appStore')} className="h-10 w-auto" />
              </a>
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:scale-[1.02] active:scale-[0.98] transition-transform"
              >
                <img src="/screenshots/playstore.png" alt={t('common.googlePlay')} className="h-10 w-auto" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
