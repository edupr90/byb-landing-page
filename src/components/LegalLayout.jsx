import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useT } from '../i18n';

/*
 * ============================================================
 *  LEGAL PAGE LAYOUT
 *  Shared chrome for the Terms of Use and Privacy Policy pages:
 *  back link, EN/ES switch, and the prose wrapper.
 *
 *  The documents themselves exist in two languages only, so the
 *  switch stays EN/ES no matter what the site language is — but a
 *  Spanish-speaking visitor opens on the Spanish text rather than
 *  having to find the switch. Both documents keep the formal
 *  "usted" of legal register; only this chrome follows the site.
 * ============================================================
 */

const PROSE =
  'prose prose-slate dark:prose-invert prose-headings:font-bold ' +
  'prose-a:text-indigo-600 dark:prose-a:text-indigo-400 max-w-none ' +
  'prose-h1:text-3xl prose-h1:sm:text-4xl prose-h2:mt-12 prose-h2:text-xl ' +
  'prose-h3:text-lg prose-li:my-1';

const forSite = (siteLang) => (siteLang.startsWith('es') ? 'es' : 'en');

export default function LegalLayout({ en, es, updatedEn, updatedEs }) {
  const { t, lang: siteLang } = useT();
  const [lang, setLang] = useState(() => forSite(siteLang));
  // The document follows the site language until the reader picks a language
  // here — after that, this switch is theirs and nothing else moves it.
  const chosen = useRef(false);

  useEffect(() => {
    if (!chosen.current) setLang(forSite(siteLang));
  }, [siteLang]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="pt-24 sm:pt-32 pb-20"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back link + language switch */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 text-sm font-medium transition-colors"
          >
            <ArrowLeft size={16} />
            {t('common.backHome')}
          </Link>

          <div
            className="inline-flex rounded-xl border border-surface-200 dark:border-surface-700 p-0.5"
            role="group"
            aria-label={t('legal.docLanguage')}
          >
            {[
              { id: 'en', label: 'English' },
              { id: 'es', label: 'Español' },
            ].map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => {
                  chosen.current = true;
                  setLang(opt.id);
                }}
                aria-pressed={lang === opt.id}
                className={`px-3 py-1.5 rounded-[10px] text-xs font-semibold transition-colors duration-200 ${
                  lang === opt.id
                    ? 'bg-brand-600 text-white'
                    : 'text-surface-500 dark:text-surface-400 hover:text-surface-900 dark:hover:text-white'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <article className={PROSE}>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            <strong>{lang === 'en' ? 'Last updated:' : 'Última actualización:'}</strong>{' '}
            {lang === 'en' ? updatedEn : updatedEs}
          </p>
          {lang === 'en' ? en : es}
        </article>
      </div>
    </motion.div>
  );
}
