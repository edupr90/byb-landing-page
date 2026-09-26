import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import en from './locales/en';
import es419 from './locales/es-419';
import ja from './locales/ja';
import ptBR from './locales/pt-BR';
import frFR from './locales/fr-FR';
import deDE from './locales/de-DE';
import itIT from './locales/it-IT';
import trTR from './locales/tr-TR';
import ko from './locales/ko';

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
const TRANSLATIONS = { en, 'es-419': es419, ja, 'pt-BR': ptBR, 'fr-FR': frFR, 'de-DE': deDE, 'it-IT': itIT, 'tr-TR': trTR, ko };

/*
 * Languages the phone screens can actually render. Each one costs a ~130 KB ARB
 * in the frame, so it is loaded per-frame rather than all at once — keep this
 * set and the SHIPPED list in public/appscreens/frame.html identical, or a
 * language will silently fall back to English screens on a translated page.
 */
const SCREEN_LANGS = new Set(['en', 'es-419', 'ja', 'pt-BR', 'fr-FR', 'de-DE', 'it-IT', 'tr-TR', 'ko']);

export const AVAILABLE = LANGUAGES.filter((l) => TRANSLATIONS[l.code]);

const DEFAULT = 'en';
const STORAGE_KEY = 'byb-lang';

/*
 * Inter and Plus Jakarta Sans carry no CJK, so a Japanese page would otherwise
 * be drawn in whatever the OS calls sans-serif. The Noto families are last in
 * both Tailwind stacks (tailwind.config.js), and a stylesheet is fetched only
 * when a CJK language is actually selected — Google serves them split by
 * unicode-range, so the page pulls only the few subsets its own text touches.
 *
 * THE FACE IS PER LANGUAGE, and this is not a nicety. Checked against the
 * unicode-range blocks Google actually serves: Noto Sans JP declares NO range
 * covering the Hangul syllables (U+AC00–D7A3), so loading it for Korean
 * supplies nothing and the page falls through to the OS default — the exact
 * failure this whole mechanism exists to prevent, one script over. Noto Sans KR
 * covers Hangul; Noto Sans TC covers the traditional Han that zh-Hant needs
 * (JP covers those codepoints too, but draws them with Japanese glyph shapes).
 */
const CJK = /^(ja|ko|zh)/;
const CJK_FONT = { ja: 'Noto+Sans+JP', ko: 'Noto+Sans+KR', zh: 'Noto+Sans+TC' };

/*
 * Japanese and Chinese are written with no space between words, so a hard-coded
 * one shows up as a gap in the middle of a 72px headline. KOREAN IS NOT LIKE
 * THEM — it is space-separated, and dropping the space runs the two halves of a
 * split headline together.
 */
const NO_WORD_SPACE = /^(ja|zh)/;

/*
 * ONE CJK FACE AT A TIME. The Tailwind stacks list all three Noto families, and
 * fallback picks the FIRST one that has the glyph — so if a visitor switches
 * ja → zh-Hant in the picker and both stylesheets are live, every Han glyph
 * draws from Noto Sans JP, in Japanese shapes, because JP covers those
 * codepoints and is listed first. (Korean never showed this: JP declares no
 * Hangul, so ko falls through to KR whatever the order.) Dropping the previous
 * sheet keeps exactly one CJK face loaded, which makes the stack order moot.
 */
function ensureCjkFont(lang) {
  if (typeof document === 'undefined') return;
  const family = CJK_FONT[lang.slice(0, 2)];
  if (!family) return;
  const id = `byb-cjk-font-${family}`;
  for (const link of document.querySelectorAll('link[id^="byb-cjk-font-"]')) {
    if (link.id !== id) link.remove();
  }
  if (document.getElementById(id)) return;
  const link = document.createElement('link');
  link.id = id;
  link.rel = 'stylesheet';
  link.href = `https://fonts.googleapis.com/css2?family=${family}:wght@400..800&display=swap`;
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
    if (CJK.test(lang)) ensureCjkFont(lang);
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
       * space, and so does Korean — only Japanese and Chinese drop it. See
       * NO_WORD_SPACE above.
       */
      wordSpace: NO_WORD_SPACE.test(lang) ? '' : ' ',
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
