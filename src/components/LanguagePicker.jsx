import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronDown, Globe } from 'lucide-react';
import { LANGUAGES, AVAILABLE, useT } from '../i18n';

/*
 * Language dropdown. Every locale the app ships is listed; the ones the site
 * does not have copy for yet are shown disabled with a "Soon" tag, so the menu
 * is an honest picture of what exists rather than a set of dead options.
 */

export default function LanguagePicker({ onSurface = false, className = '' }) {
  const { lang, setLang, t } = useT();
  const [open, setOpen] = useState(false);
  const boxRef = useRef(null);

  const current = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0];
  const availableCodes = new Set(AVAILABLE.map((l) => l.code));

  useEffect(() => {
    if (!open) return undefined;
    const onDown = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const trigger = onSurface
    ? 'text-surface-500 hover:text-surface-900 hover:bg-surface-100 dark:text-surface-400 dark:hover:text-white dark:hover:bg-surface-800'
    : 'text-white/75 hover:text-white hover:bg-white/10';

  return (
    <div ref={boxRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t('nav.language')}
        className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${trigger}`}
      >
        <Globe size={16} className="shrink-0" />
        <span className="hidden sm:inline">{current.label}</span>
        <span className="sm:hidden">{current.code.split('-')[0].toUpperCase()}</span>
        <ChevronDown
          size={14}
          className={`shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            role="listbox"
            aria-label={t('nav.language')}
            className="absolute right-0 mt-2 w-56 max-h-[70vh] overflow-y-auto rounded-2xl bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-700 shadow-xl shadow-black/10 dark:shadow-black/50 p-1.5 z-50"
          >
            {LANGUAGES.map((l) => {
              const enabled = availableCodes.has(l.code);
              const active = l.code === lang;
              return (
                <li key={l.code}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={active}
                    disabled={!enabled}
                    onClick={() => {
                      if (!enabled) return;
                      setLang(l.code);
                      setOpen(false);
                    }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-left transition-colors duration-150 ${
                      enabled
                        ? 'text-surface-700 dark:text-surface-200 hover:bg-surface-100 dark:hover:bg-surface-800 cursor-pointer'
                        : 'text-surface-400 dark:text-surface-600 cursor-not-allowed'
                    }`}
                  >
                    <span className="text-base leading-none">{l.flag}</span>
                    <span className={`flex-1 ${active ? 'font-semibold text-brand-600 dark:text-brand-400' : ''}`}>
                      {l.label}
                    </span>
                    {active && <Check size={15} className="text-brand-600 dark:text-brand-400 shrink-0" />}
                    {!enabled && (
                      <span className="text-[10px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded-md bg-surface-100 dark:bg-surface-800 text-surface-400 dark:text-surface-500">
                        {t('nav.soon')}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
