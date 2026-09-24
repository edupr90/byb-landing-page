import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import en from './locales/en';

/*
 * ============================================================
 *  SITE LOCALISATION
 *
 *  The app ships 10 locales. The site starts with English; each
 *  further language is ONE file in ./locales plus one line in
 *  TRANSLATIONS below — nothing else changes. Languages without a
 *  file are listed in the picker as "Soon" and cannot be selected,
 *  so the menu always reflects what actually exists.
 *
 *  Codes match the app's own locale ids (store_screenshots/app/
 *  l10n), so a site language and its phone screens stay in step.
 * ============================================================
 */

export const LANGUAGES = [
  { code: 'en',      label: 'English',    flag: '🇺🇸' },
  { code: 'es-419',  label: 'Español',    flag: '🇲🇽' },
  { code: 'pt-BR',   label: 'Português',  flag: '🇧🇷' },
  { code: 'fr-FR',   label: 'Français',   flag: '🇫🇷' },
  { code: 'de-DE',   label: 'Deutsch',    flag: '🇩🇪' },
  { code: 'it-IT',   label: 'Italiano',   flag: '🇮🇹' },
  { code: 'tr-TR',   label: 'Türkçe',     flag: '🇹🇷' },
  { code: 'ja',      label: '日本語',      flag: '🇯🇵' },
  { code: 'ko',      label: '한국어',      flag: '🇰🇷' },
  { code: 'zh-Hant', label: '繁體中文',    flag: '🇹🇼' },
];

/** Add a locale here once ./locales/<code>.js exists. */
const TRANSLATIONS = { en };

/** Phone screens only carry fonts for the languages we shipped fonts for. */
const SCREEN_LANGS = new Set(['en', 'es-419', 'pt-BR', 'fr-FR', 'de-DE', 'it-IT', 'tr-TR']);

export const AVAILABLE = LANGUAGES.filter((l) => TRANSLATIONS[l.code]);

const DEFAULT = 'en';
const STORAGE_KEY = 'byb-lang';

const LangContext = createContext(null);

function detect() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && TRANSLATIONS[stored]) return stored;
  } catch (e) {
    /* private mode — fall through to the browser hint */
  }
  if (typeof navigator !== 'undefined') {
    for (const tag of navigator.languages || [navigator.language]) {
      if (!tag) continue;
      if (TRANSLATIONS[tag]) return tag;
      const base = tag.split('-')[0];
      const hit = Object.keys(TRANSLATIONS).find((c) => c.split('-')[0] === base);
      if (hit) return hit;
    }
  }
  return DEFAULT;
}

/** Resolve "a.b.c" against the active table, falling back to English. */
function lookup(table, path) {
  return path.split('.').reduce((acc, k) => (acc == null ? undefined : acc[k]), table);
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(detect);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      /* nothing to do — the choice just will not persist */
    }
  }, [lang]);

  const value = useMemo(() => {
    const table = TRANSLATIONS[lang] || en;
    const t = (path, vars) => {
      let out = lookup(table, path);
      if (out === undefined) out = lookup(en, path);
      if (out === undefined) return path; // visible in dev, harmless in prod
      if (typeof out === 'string' && vars) {
        out = out.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? String(vars[k]) : m));
      }
      return out;
    };
    return {
      lang,
      setLang: (code) => TRANSLATIONS[code] && setLangState(code),
      t,
      /** The language the phone screens should render in. */
      screenLang: SCREEN_LANGS.has(lang) ? lang : 'en',
    };
  }, [lang]);

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useT() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useT must be used inside <LanguageProvider>');
  return ctx;
}
