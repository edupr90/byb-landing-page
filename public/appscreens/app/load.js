// The HTML app's files, in load order. index.html and screens.html include only this script (it writes the
// tags while the page parses, so order is kept); tools/*.mjs read the same list. A new screen or language
// is one line here.
(function () {
  const ALL_LANGS = ["en", "es-419", "ja", "fr-FR", "it-IT", "de-DE", "pt-BR", "tr-TR", "ko", "zh-Hant"];
  // The website loads only the languages it actually ships (window.BYB_LANGS, set before this script).
  // Upstream in store_screenshots this is always the full list.
  const LANGS = (typeof window !== "undefined" && window.BYB_LANGS) || ALL_LANGS;
  const SCREENS = [
    "budget",
    "category-detail",
    "expenses",
    "expense-form",
    "insights",
    "reports",
    "drawer",
    "theme-picker",
    "settings",
  ];
  const FILES = [
    "app/app.css",
    "app/kit.css",
    "app/app.js",
    "app/icons.js",
    "app/kit.js",
    "app/l10n/locale.js",
    ...LANGS.map((l) => `app/l10n/arb/${l}.js`),
    ...LANGS.map((l) => `app/l10n/demo/${l}.js`),
    "app/data.js",
    ...SCREENS.flatMap((s) => [`app/screens/${s}.css`, `app/screens/${s}.js`]),
  ];
  if (typeof document === "undefined") {
    if (typeof module !== "undefined") module.exports = { FILES, LANGS: ALL_LANGS, SCREENS };
    return;
  }
  const base = document.currentScript.src.replace(/app\/load\.js(\?.*)?$/, "");
  for (const f of FILES) {
    document.write(f.endsWith(".css") ? `<link rel="stylesheet" href="${base}${f}">` : `<script src="${base}${f}"></script>`);
  }
})();
