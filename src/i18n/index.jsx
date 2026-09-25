import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import en from './locales/en';
import es419 from './locales/es-419';
import ja from './locales/ja';
import ptBR from './locales/pt-BR';

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
  { code: 'es-419',  label: 'Español',    flag: '🇵🇷' },
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
const TRANSLATIONS = { en, 'es-419': es419, ja, 'pt-BR': ptBR };

/*
 * Languages the phone screens can actually render. Each one costs a ~130 KB ARB
 * in the frame, so it is loaded per-frame rather than all at once — keep this
 * set and the SHIPPED list in public/appscreens/frame.html identical, or a
 * language will silently fall back to English screens on a translated page.
 */
const SCREEN_LANGS = new Set(['en', 'es-419', 'ja', 'pt-BR']);

export const AVAILABLE = LANGUAGES.filter((l) => TRANSLATIONS[l.code]);

const DEFAULT = 'en';
const STORAGE_KEY = 'byb-lang';

/*
 * Inter and Plus Jakarta Sans carry no CJK, so a Japanese page would otherwise
 * be drawn in whatever the OS calls sans-serif. Noto Sans JP is last in both
 * Tailwind stacks (tailwind.config.js), and its stylesheet is fetched only when
 * a CJK language is actually selected — Google serves it split by unicode-range,
 * so the page pulls only the few subsets its own text touches.
 */
const CJK = /^(ja|ko|zh)/;
const CJK_FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400..800&display=swap';

function ensureCjkFont() {
  if (typeof document === 'undefined') return;
  if (document.getElementById('byb-cjk-font')) return;
  const link = document.createElement('link');
  link.id = 'byb-cjk-font';
  link.rel = 'stylesheet';
  link.href = CJK_FONT_HREF;
  document.head.appendChild(link);
}

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
    if (CJK.test(lang)) ensureCjkFont();
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
      /*
       * The separator between two halves of a split headline (hero.titleA /
       * titleB / titleAccent, howItWorks.titleA / titleAccent). Latin needs the
       * space; Japanese writes no space between words, and a hard-coded one
       * shows up as a gap in the middle of a 72px headline.
       */
      wordSpace: CJK.test(lang) ? '' : ' ',
      /** True for a language written without a Latin case distinction. */
      isCjk: CJK.test(lang),
    };
  }, [lang]);

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useT() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useT must be used inside <LanguageProvider>');
  return ctx;
}
