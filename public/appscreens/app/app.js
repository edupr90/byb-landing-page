/* BYB app, recreated in HTML for the store screenshots.
 *
 * The phone screens in the store images are live HTML, not simulator captures, so every word in them
 * is a string that switches with the language toggle and a pop-out can point at a real element.
 *
 * Files (loaded in this order by index.html and screens.html):
 *   app/app.js                runtime (this file): registry, strings, render + layout, formatting fallback
 *   app/kit.js, app/kit.css   design tokens (palettes, light/dark) and the shared components
 *   app/icons.js              Material + Cupertino icon codepoints (fonts/MaterialIcons, fonts/CupertinoIcons)
 *   app/l10n/locale.js        number / currency / date formatting per store language, matching the app
 *   app/l10n/arb/<lang>.js    GENERATED from lib/l10n/app_<arb>.arb by tools/strings.mjs — edit the ARB, not these
 *   app/l10n/demo/<lang>.js   the demo data's words (people, expense names…) — hand-edited, one file per language
 *   app/data.js               the demo data's numbers (language-neutral)
 *   app/screens/<id>.js/.css  one app screen each
 *
 * A screen
 *   BYBApp.screen({
 *     id: "budget", title: "Budget",
 *     states: { top: {}, ring: { scroll: "@where-it-goes", scrollOffset: -140 } },   // named presets of a spec
 *     captures: { top: "01_budget_top", ring: "01_budget_ring" },                   // raw/<lang>/<name>.png, for tools/shot.mjs --compare
 *     render(ctx) { return `<div class="app-scroll">…</div>`; },                      // markup inside the phone
 *   });
 *
 * A spec (what a slide, a pop-out or screens.html asks for)
 *   { app: "budget", state: "ring", mode: "light"|"dark", palette: "royal", scroll: 320 | "@pop-id",
 *     scrollOffset: 0, hide: ["pop-id"], remove: ["pop-id"], params: {…}, statusBar: true, data: "capture" }
 *   The state's preset is applied first, then the spec's own keys. Units are points (the phone is 440 × 956 pt,
 *   the captures 1320 × 2868 raw px, i.e. 3 raw px per pt).
 *   scroll moves `.app-scroll` up by that many pt, or brings `[data-pop="id"]` to the top of the viewport
 *   (plus scrollOffset). hide = visibility hidden (keeps the layout), remove = display none.
 *
 * ctx (what render gets)
 *   ctx.t(key, args)    app string from the ARB (missing keys are reported and shown as ⟦key⟧)
 *   ctx.d(key, args)    demo string (people, expense names)
 *   ctx.fmt             see app/l10n/locale.js: money(n, {digits, signed, intl, compact, locale}) · compact(n, {locale}) ·
 *                       number(n, digits, {locale}) · round(n) · fixed(n, d) · percent(n, digits, {signed, number}) ·
 *                       date(d, pattern, {case, locale}) · month(i, "long"|"short"|"narrow") · weekdayLabel(d) ·
 *                       upper/lower/sentence · symbol — strict: bad input throws; {locale} is a Dart locale or "app"
 *   ctx.data            BYBApp.langData[lang] (a language with its own currency, e.g. ja in yen) or BYBApp.data
 *                       (spec.data: "capture" → BYBApp.captureData[lang], the numbers raw/<lang> shows — for
 *                       comparing with captures only; store renders never set it)
 *   ctx.kit             BYBApp.kit (components)
 *   ctx.icon(name, cls) "Icons.add_rounded" | "CupertinoIcons.cloud" → <i class="ic …">
 *   ctx.esc(s)          HTML escape
 *   ctx.lang, ctx.mode, ctx.palette, ctx.state, ctx.params, ctx.spec
 *
 * Pop-out anchors: mark any element a slide may pop out with data-pop="some-id". BYBApp.layout(spec, lang)
 * returns its rect (pt, after scroll) and corner radius, so a pop-out follows the element in every language.
 */
(function () {
  "use strict";

  const A = (window.BYBApp = window.BYBApp || {});
  A.W = 440;
  A.H = 956;
  A.RAW = 3;
  A.screens = A.screens || {};
  A.arbTables = A.arbTables || {};
  A.demoTables = A.demoTables || {};
  A.locales = A.locales || {};
  A.data = A.data || {};
  A.kit = A.kit || {};
  A.icons = A.icons || {};

  A.screen = (def) => { A.screens[def.id] = def; };
  A.arb = (lang, table) => { A.arbTables[lang] = { ...(A.arbTables[lang] || {}), ...table }; };
  A.demo = (lang, table) => { A.demoTables[lang] = { ...(A.demoTables[lang] || {}), ...table }; };
  A.locale = (lang, cfg) => { A.locales[lang] = cfg; };

  const isObj = (v) => v && typeof v === "object" && !Array.isArray(v);
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  A.esc = esc;

  function merge(base, over) {
    if (!isObj(over)) return over === undefined ? base : over;
    const out = isObj(base) ? { ...base } : {};
    for (const [k, v] of Object.entries(over)) out[k] = isObj(v) && isObj(out[k]) ? merge(out[k], v) : v;
    return out;
  }

  // ------------------------------------------------------------ strings

  // ARB messages in this app are plain text with {placeholders} (no plural/select), and gen_l10n runs
  // without use-escaping, so apostrophes are literal.
  const fill = (msg, args) =>
    String(msg).replace(/\{(\w+)\}/g, (m, name) => (args && args[name] != null ? String(args[name]) : m));

  // Every string a render could not find, as "lang · kind · key" — the composer badges it and the
  // export refuses a language that has any.
  A.missing = new Set();

  // Every key a render asked for, as "kind:key" (translation inventories: which strings the images show).
  A.usedKeys = new Set();

  function lookup(tables, kind, lang, key, args, sink) {
    A.usedKeys.add(`${kind}:${key}`);
    const own = tables[lang] && tables[lang][key];
    if (own != null) return fill(own, args);
    const tag = `${lang} · ${kind} · ${key}`;
    A.missing.add(tag);
    if (sink) sink.add(tag);
    const en = tables.en && tables.en[key];
    return en != null && lang !== "en" ? fill(en, args) : `⟦${key}⟧`;
  }

  // ------------------------------------------------------------ formatting fallback
  // app/l10n/locale.js replaces this per language with the app's real patterns.

  function fallbackFmt(lang) {
    const nf2 = new Intl.NumberFormat("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return {
      money: (n) => `${n < 0 ? "-" : ""}$${nf2.format(Math.abs(n))}`,
      number: (n, digits = 0) => new Intl.NumberFormat("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits }).format(n),
      percent: (n, digits = 0) => `${new Intl.NumberFormat("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits }).format(n)}%`,
      date: (d, pattern) => new Date(d).toLocaleDateString(lang, { month: "short", day: "numeric", year: "numeric" }),
      month: (i, width = "long") => new Date(2026, i, 1).toLocaleDateString(lang, { month: width }),
    };
  }
  A.fmt = (lang) => {
    if (A.locales[lang] && A.locales[lang].fmt) return A.locales[lang].fmt;
    A.missing.add(`${lang} · fmt · locale not registered (app/l10n/locale.js STORE_LANGS)`);
    return fallbackFmt(lang);
  };

  // ------------------------------------------------------------ icons

  // "Icons.add_rounded" / "CupertinoIcons.cloud" → an icon-font glyph. app/icons.js fills A.icons
  // with { "Icons.add_rounded": [codepoint, "m"], "CupertinoIcons.cloud": [codepoint, "c"] }.
  A.icon = (name, cls = "") => {
    const hit = A.icons[name];
    if (!hit) return `<i class="ic ic-missing ${cls}" title="${esc(name)}">?</i>`;
    const [cp, font] = hit;
    return `<i class="ic ic-${font} ${cls}" aria-hidden="true">&#x${cp.toString(16)};</i>`;
  };

  // ------------------------------------------------------------ specs

  // A spec with its screen's named state applied underneath it.
  A.resolveSpec = (spec) => {
    const s = typeof spec === "string" ? { app: spec } : spec || {};
    const def = A.screens[s.app];
    const preset = def && def.states && s.state ? def.states[s.state] || {} : {};
    return merge(merge({ mode: "light", palette: "royal", params: {} }, preset), s);
  };
  A.isSpec = (v) => isObj(v) && typeof v.app === "string";

  // ------------------------------------------------------------ render

  // Builds the phone screen, detached. The scroll position comes from BYBApp.layout (measured once per
  // spec + language), so the element does not need to be in the document.
  // opts.isolate = "pop-id": only that element paints (everything else is visibility: hidden and the
  // page background is transparent) — how a pop-out lifts one card out of a screen.
  A.render = function (spec0, lang = "en", opts = {}) {
    const spec = A.resolveSpec(spec0);
    const root = build(spec, lang);
    if (spec.scroll != null || opts.noScroll) {
      const info = opts.noScroll ? null : A.layout(spec, lang, opts.scale);
      const scroller = root.querySelector(".app-scroll");
      if (scroller && info && info.scrollY) scroller.style.transform = `translateY(${-info.scrollY}px)`;
    }
    if (opts.isolate) {
      root.classList.add("isolate");
      root.querySelectorAll(`[data-pop="${cssEsc(opts.isolate)}"]`).forEach((e) => e.classList.add("isolate-keep"));
    }
    return root;
  };

  const cssEsc = (s) => (window.CSS && CSS.escape ? CSS.escape(s) : String(s).replace(/"/g, '\\"'));

  // Traditional Chinese: Skia's fake bold on PingFang TC, which Chrome will not synthesize. Flutter draws a Han run
  // that falls back to PingFang TC at w800 / w900 as the SEMIBOLD instance (the font's wght axis stops at 600)
  // EMBOLDENED: skparagraph fakes bold when the wanted weight is ≥ 600 and ≥ 200 above the typeface's own — 800 − 600
  // — which is also why w700 is plain Semibold and why "Inter AppFont" Latin is emboldened from 600 on. Measured
  // 2026-09-18 with a throwaway Flutter 3.41.4 macOS build (same skparagraph, same CoreText, and a PingFangUI.ttc
  // byte-identical to the iOS 26.5 runtime's), ink of 10 Han at 100 pt: w600 = w700 10,702,479 · w800 = w900
  // 12,821,560. Chrome refuses font-synthesis on a font with a wght axis (a Semibold face declared at 500 draws the
  // same ink at 500 and 800), so kit.css's 800 face alone would draw the lighter plain Semibold. This wraps each Han
  // run of a w800+ text (weight and size as the screens write them, inline — kit.text) in a span stroked by exactly
  // what Skia's embolden adds: SkScalerContext strokes the outline by textSize × lerp(1/24 at 9 pt → 1/32 at 36 pt).
  // A -webkit-text-stroke of that width IS Chrome's synthetic bold, measured on Inter at 100 px: 7,274,167 of ink
  // synthesized against 7,274,233 stroked. The Latin in the same text keeps Chrome's synthetic bold of "Inter AppFont",
  // as in every language. zh-Hant only; no other language's DOM is touched. The code points are kit.css's
  // "BYB PingFang TC" ranges (Ext B-F outside the BMP included).
  const CJK_RUN = /[⋯⺀-⿟　-〿㄀-ㄯ㇀-㇯㈀-㏿㐀-䶿一-鿿豈-﫿︐-︟︰-﹏＀-￯\u{20000}-\u{2FA1F}]+/gu;
  const skiaFakeBoldStroke = (size) => size * (size <= 9 ? 1 / 24 : size >= 36 ? 1 / 32 : 1 / 24 + ((1 / 32 - 1 / 24) * (size - 9)) / 27);
  function cjkFakeBold(root) {
    const inline = (el, prop) => {
      for (let e = el; e && e !== root.parentNode; e = e.parentElement) {
        const m = new RegExp(`(?:^|;)\\s*${prop}\\s*:\\s*([\\d.]+)`).exec(e.getAttribute("style") || "");
        if (m) return +m[1];
      }
      return null;
    };
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const hits = [];
    for (let n = walker.nextNode(); n; n = walker.nextNode()) {
      CJK_RUN.lastIndex = 0;
      if (CJK_RUN.test(n.nodeValue) && (inline(n.parentElement, "font-weight") || 0) >= 800) hits.push(n);
    }
    for (const n of hits) {
      const size = inline(n.parentElement, "font-size") || 14; // .byb-app's 14px when no text style sets one
      const w = Math.round(skiaFakeBoldStroke(size) * 1e4) / 1e4;
      const frag = document.createDocumentFragment();
      let last = 0;
      CJK_RUN.lastIndex = 0;
      for (let m = CJK_RUN.exec(n.nodeValue); m; m = CJK_RUN.exec(n.nodeValue)) {
        if (m.index > last) frag.appendChild(document.createTextNode(n.nodeValue.slice(last, m.index)));
        const span = document.createElement("span");
        span.className = "k-cjk-fakebold";
        span.style.webkitTextStrokeWidth = `${w}px`;
        span.textContent = m[0];
        frag.appendChild(span);
        last = m.index + m[0].length;
      }
      if (last < n.nodeValue.length) frag.appendChild(document.createTextNode(n.nodeValue.slice(last)));
      n.parentNode.replaceChild(frag, n);
    }
  }

  function build(spec, lang) {
    const def = A.screens[spec.app];
    const root = document.createElement("div");
    root.className = `byb-app mode-${spec.mode} pal-${spec.palette} scr-${spec.app}${spec.state ? ` state-${spec.state}` : ""}`;
    root.lang = lang;
    root.dataset.screen = spec.app;
    root.style.width = `${A.W}px`;
    root.style.height = `${spec.vh || A.H}px`;
    root._missing = new Set();
    if (!def) {
      root.innerHTML = `<div class="app-placeholder">screen “${esc(spec.app)}” is not built yet</div>`;
      return root;
    }
    const sink = root._missing;
    const ctx = {
      spec,
      lang,
      mode: spec.mode,
      palette: spec.palette,
      state: spec.state,
      params: spec.params || {},
      data: (spec.data === "capture" && A.captureData && A.captureData[lang]) || (A.langData && A.langData[lang]) || A.data,
      kit: A.kit,
      fmt: A.fmt(lang),
      esc,
      icon: A.icon,
      t: (key, args) => lookup(A.arbTables, "arb", lang, key, args, sink),
      d: (key, args) => lookup(A.demoTables, "demo", lang, key, args, sink),
    };
    let html;
    // the language being rendered, for kit.js's hidden measuring copy (FittedBox): a zh-Hant copy needs its fonts
    const outerLang = A.buildLang;
    A.buildLang = lang;
    try {
      html = def.render(ctx);
    } catch (err) {
      console.error(`[BYBApp] ${spec.app} render failed`, err);
      const tag = `${lang} · render · ${spec.app}: ${err.message}`;
      sink.add(tag);
      A.missing.add(tag);
      html = `<div class="app-placeholder">${esc(spec.app)}: ${esc(err.message)}</div>`;
    } finally {
      A.buildLang = outerLang; // the drawer renders a screen inside its own render
    }
    const statusBar = spec.statusBar !== false && def.statusBar !== false && A.kit.statusBar ? A.kit.statusBar(ctx) : "";
    root.innerHTML = html + statusBar;
    if (/^zh(-|$)/i.test(lang)) cjkFakeBold(root);
    for (const id of spec.hide || []) root.querySelectorAll(`[data-pop="${cssEsc(id)}"]`).forEach((e) => (e.style.visibility = "hidden"));
    for (const id of spec.remove || []) root.querySelectorAll(`[data-pop="${cssEsc(id)}"]`).forEach((e) => (e.style.display = "none"));
    return root;
  }

  // ------------------------------------------------------------ layout

  let host = null;
  const layoutCache = new Map();
  A.clearLayout = () => layoutCache.clear();

  // { scrollY, rects: { popId: { x, y, w, h, radius } } } in pt, after scroll, relative to the screen's
  // top-left. Measured on a hidden, unscaled copy; needs the fonts loaded (await BYBApp.ready()).
  // `scale` is the transform the screen will be drawn at (the composer passes slab k × 3, or × the callout's scale).
  // Layout is measured under that same transform because Chrome sizes Apple Color Emoji by the effective pixel size:
  // a line with emoji that just fits at one scale can wrap at another (es-419 Reports "🎯 💰 Ahorros tuvo…" did,
  // moving everything under it 18 pt in the callout's copy). Rects are returned in unscaled pt either way.
  A.layout = function (spec0, lang = "en", scale = 1) {
    const spec = A.resolveSpec(spec0);
    scale = Math.round((scale || 1) * 1e4) / 1e4;
    const key = `${lang}|${scale}|${JSON.stringify(spec)}`;
    if (layoutCache.has(key)) return layoutCache.get(key);
    if (!host) {
      host = document.createElement("div");
      host.setAttribute("aria-hidden", "true");
      host.style.cssText = "position:absolute;left:-30000px;top:0;visibility:hidden;pointer-events:none;contain:layout style;";
      document.body.appendChild(host);
    }
    const root = build(spec, lang);
    if (scale !== 1) {
      root.style.transformOrigin = "0 0";
      root.style.transform = `scale(${scale})`;
    }
    host.appendChild(root);
    const origin = () => root.getBoundingClientRect();
    const scroller = root.querySelector(".app-scroll");
    let scrollY = 0;
    if (typeof spec.scroll === "number") scrollY = spec.scroll;
    else if (typeof spec.scroll === "string" && spec.scroll.startsWith("@") && scroller) {
      const target = root.querySelector(`[data-pop="${cssEsc(spec.scroll.slice(1))}"]`);
      if (target) scrollY = (target.getBoundingClientRect().top - origin().top) / scale;
      else console.warn(`[BYBApp] ${spec.app}: no [data-pop="${spec.scroll.slice(1)}"] to scroll to`);
    }
    scrollY = Math.max(0, scrollY + (spec.scrollOffset || 0));
    // the app cannot scroll past the end of its list: cap at content height − the scroller's viewport
    let maxScroll = null;
    if (scroller && scroller.parentElement) {
      maxScroll = Math.max(0, scroller.offsetHeight - scroller.parentElement.clientHeight);
      if (scrollY > maxScroll + 0.01) {
        console.warn(`[BYBApp] ${spec.app}${spec.state ? `:${spec.state}` : ""}: scroll ${scrollY.toFixed(2)} is past the end, capped at ${maxScroll.toFixed(2)}`);
        scrollY = maxScroll;
      }
    }
    if (scroller && scrollY) scroller.style.transform = `translateY(${-scrollY}px)`;
    const o = origin();
    const rects = {};
    root.querySelectorAll("[data-pop]").forEach((e) => {
      const r = e.getBoundingClientRect();
      if (rects[e.dataset.pop]) return; // first one wins
      rects[e.dataset.pop] = {
        x: (r.left - o.left) / scale,
        y: (r.top - o.top) / scale,
        w: r.width / scale,
        h: r.height / scale,
        // the largest corner: a sheet rounded on one side only still gets a rounded callout
        radius: (() => {
          const cs = getComputedStyle(e);
          return Math.max(...["TopLeft", "TopRight", "BottomRight", "BottomLeft"].map((c) => parseFloat(cs[`border${c}Radius`]) || 0));
        })(),
      };
    });
    host.removeChild(root);
    const info = { scrollY, maxScroll, rects, missing: [...root._missing] };
    layoutCache.set(key, info);
    return info;
  };

  // Pop-out rect in raw capture px for an element: [x, y, w, h] grown by `pad` raw px on every side,
  // and the concentric corner radius (element radius + pad) in raw px.
  A.rawRect = function (spec, lang, popId, pad = 0, scale = 1) {
    const r = A.layout(spec, lang, scale).rects[popId];
    if (!r) return null;
    const R = A.RAW;
    return { rect: [r.x * R - pad, r.y * R - pad, r.w * R + pad * 2, r.h * R + pad * 2], radius: r.radius * R + pad };
  };

  // ------------------------------------------------------------ ready

  // Fonts (Inter, the icon fonts, emoji) must be loaded before any layout is measured.
  A.ready = async function () {
    const faces = [
      "400 20px Inter", "500 20px Inter", "600 20px Inter", "700 20px Inter", "800 20px Inter",
      "400 20px 'Inter AppFont'", "700 20px 'Inter AppFont'",
      "20px MaterialIcons", "20px CupertinoIcons",
    ];
    await Promise.all(faces.map((f) => document.fonts.load(f).catch(() => null)));
    await document.fonts.ready;
    A.clearLayout();
  };
})();
