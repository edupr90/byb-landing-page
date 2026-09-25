import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import Shared from './pages/Shared';
import { LanguageProvider, useT } from './i18n';

/*
 * The tab title and the meta description, in the active language. One owner for
 * both, so a route change and a language change cannot fight over them — which
 * is what happens the moment a page sets its own title in an effect of its own.
 */
function PageMeta() {
  const { pathname } = useLocation();
  const { t, lang } = useT();

  useEffect(() => {
    document.title = pathname.startsWith('/shared') ? t('sharedPage.metaTitle') : t('meta.title');
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', t('meta.description'));
  }, [pathname, t, lang]);

  return null;
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const location = useLocation();
  const [dark, setDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('byb-dark-mode');
      if (stored !== null) return stored === 'true';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('byb-dark-mode', dark);
  }, [dark]);

  return (
    <LanguageProvider>
    <div className="min-h-screen flex flex-col">
      <Navbar dark={dark} setDark={setDark} />
      <PageMeta />
      <ScrollToTop />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/privacypolicy" element={<PrivacyPolicy />} />
            <Route path="/privacypolicy/" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/terms/" element={<Terms />} />
            <Route path="/shared" element={<Shared />} />
            <Route path="/shared/" element={<Shared />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
    </LanguageProvider>
  );
}
