/* Color Theme picker — lib/ui/views/color_theme_view.dart (ColorThemeView + _PaletteCard), palettes from
 * lib/core/models/app_color_palette.dart (kit.palettes, AppColorPalette.all order).
 *
 * Layout (pt): Scaffold(bg = page) → AppBar (62 safe + 56 toolbar, pinned, opaque) → Column:
 *   Padding(24, 8, 24, 20) → the 56-tall gradient banner (primary → secondary, topLeft → bottomRight, radius 20,
 *   primary @ 30% glow blur 16 y 4) with l10n.appTitle 18/w800 white;
 *   Expanded GridView (the only scrolling part — .app-scroll inside a clip that starts at y 202): padding 24 · 0 ·
 *   24 · 24 + 34, 3 columns, 12 apart both ways, childAspectRatio 0.88 → cells 122.67 × 139.39.
 *   Card: card fill, radius 20, 1px border (selected: 2.5px accent + accent @ 25% glow blur 12 y 4); centred column:
 *   two 28 dots (primary, secondary; 1.5 white @ 30% ring) 6 apart · 10 · name 13 w500 subText (selected w700
 *   accent) · selected: 4 · check_circle_rounded 16 accent. accent = palette.primary in both modes.
 *   AppBar: centred title l10n.settingsColorTheme 18/w800, leading _CircleCloseBtn, actions: TextButton
 *   l10n.commonReset (14/w600 primary) — only when the palette is not the default (royal), as in the app.
 *
 * States
 *   light-royal   06_theme_picker_light_royal (en, es-419)
 *   dark-sunset   06_theme_picker_dark_sunset (en, es-419)
 *   dark-royal    06_theme_picker_dark_royal (en only, reference)
 *   params.selected  palette id shown as selected (default: the spec's palette)
 *   Scrolling: only the grid scrolls, under a viewport that starts at y 202. The app's scroll range is 0 … 200.34
 *   (six rows of 139.39 + 5 × 12 + 58 bottom padding = 954.34 in a 754 viewport), and BYBApp.layout does NOT clamp
 *   to it, so stay inside it:
 *     scroll: "@palette-<id>", scrollOffset: -202  puts that card's row at the top of the grid — rows 1–2 only
 *                                                  (royal … midnight: scroll 0 / 151.39)
 *     scroll: 200.34                               the end of the list: rows 3–6, the Sage row at the bottom
 *   Rows 3–6 can never reach the top of the grid in the app (row 3 would need 302.79); the anchor recipe there
 *   renders the targeted row under the banner with bare page below it, a frame the app cannot show.
 *   Card names are nudged ⅓pt where Skia's baseline snapping and Chrome's box snapping round apart (snapNudge below);
 *   that needs the grid's scroll, known for scroll: <number> and "@palette-…" — any other scroll anchor skips it.
 *
 * data-pop anchors
 *   app-bar             the pinned app bar (close · title · reset), below the status bar
 *   close               the circular ✕
 *   title               the "Color Theme" title text
 *   reset               the Reset label (its text line, not the 64 × 56 TextButton slot, which runs to the phone's
 *                       right edge); only rendered when the palette is not royal, like the app
 *   banner              the gradient "Budget Your Budget" preview strip
 *   palette-grid        the 16 cards' bounding box, without the GridView's gutters and bottom padding:
 *                       x 24 … 416, y 202 … 1098.34 before scroll (scrolls with .app-scroll; it runs below the
 *                       phone's bottom edge — the grid's viewport clips it at y 956)
 *   palette-<id>        one palette card each: palette-royal, palette-teal, palette-ocean, palette-lavender,
 *                       palette-sunset, palette-midnight, palette-rose, palette-forest, palette-berry, palette-slate,
 *                       palette-candy, palette-mocha, palette-aurora, palette-indigo, palette-sky, palette-sage
 *                       (sage is the 6th row, below the fold unless scrolled)
 *   palette-selected    the selected card again: the grid cell that holds it (same rect, radius 20), so an
 *                       isolated pop-out keeps the card, its 2.5 accent ring and glow; only the selected cell has it
 *
 * Note: the Dark Mode segmented control is NOT on this screen — the "themes" slide cuts it from
 * 06_settings_dark_sunset; its anchor (mode-segment) lives on the settings screen.
 */
(function () {
  "use strict";

  const DEFAULT_PALETTE = "royal"; // AppColorPalette.defaultId

  // SliverGridDelegateWithFixedCrossAxisCount(3, spacing 12 / 12, aspect 0.88) over 440 − 48
  const GRID_W = 440 - 48;
  const CELL_W = (GRID_W - 2 * 12) / 3;
  const CELL_H = CELL_W / 0.88;

  // LinearGradient(topLeft → bottomRight) on a w × h box = CSS linear-gradient at 90° + atan(h / w) (same length)
  const gradientAngle = (w, h) => 90 + (Math.atan2(h, w) * 180) / Math.PI;

  // Device-pixel snapping of the card names. The rows sit at fractional points (stride 151.394), and at 3x Skia
  // snaps a text's BASELINE to the nearest raw px, while Chrome snaps the k-line BOX, whose top sits a whole number
  // of raw px + 0.1818 above the baseline (the k-line top offset for 13pt / height 1.5 is 14 − (10 + 13·4/11) =
  // −0.7273pt = −2.1818 raw). The two agree unless the baseline's raw fraction is in [0.5, 0.68): then Chrome draws
  // the name 1 raw px (⅓pt) higher. On the captures that is the 4th row (Slate · Candy · Mocha, fraction .64: Δ 2.1
  // → 0.55 once nudged; rows 1–3 and 5 are .09 / .27 / .45 / .82 and already agree).
  const GRID_TOP = 202; // 62 safe + 56 toolbar + 8 + 56 banner + 20
  const NAME_BASELINE = 14; // in its 20pt line (13 × 1.5 rounded): round(9.75 + 13 · 4/11)
  const CHROME_BOX_FRAC = 0.1818;
  const snapNudge = (baselinePt) => {
    const b = baselinePt * 3;
    return (Math.round(b) - Math.round(b - CHROME_BOX_FRAC)) / 3;
  };
  // the column is centred in the card's inner 137.39: dots 28 · 10 · name 20 (· 4 · check 16 when selected)
  const nameTop = (selected) => 1 + (CELL_H - 2 - (58 + (selected ? 20 : 0))) / 2 + 38;
  // the grid's scroll as BYBApp.layout will resolve it — known for a number and the grid's own anchors; null
  // (no nudging) for anything else
  const gridScroll = (spec, ids, selectedIndex) => {
    const off = spec.scrollOffset || 0;
    if (spec.scroll == null) return 0;
    if (typeof spec.scroll === "number") return Math.max(0, spec.scroll + off);
    const m = /^@palette-(.+)$/.exec(String(spec.scroll));
    const i = !m ? -1 : m[1] === "grid" ? 0 : m[1] === "selected" ? selectedIndex : ids.indexOf(m[1]);
    return i < 0 ? null : Math.max(0, GRID_TOP + Math.floor(i / 3) * (CELL_H + 12) + off);
  };

  BYBApp.screen({
    id: "theme-picker",
    title: "Color Theme",
    states: {
      "light-royal": { mode: "light", palette: "royal" },
      "dark-sunset": { mode: "dark", palette: "sunset" },
      "dark-royal": { mode: "dark", palette: "royal" },
    },
    captures: {
      "light-royal": "06_theme_picker_light_royal",
      "dark-sunset": "06_theme_picker_dark_sunset",
      "dark-royal": "06_theme_picker_dark_royal",
    },

    render(ctx) {
      const { kit, t, esc } = ctx;
      const current = kit.palette(ctx.palette);
      const selectedId = (ctx.params && ctx.params.selected) || current.id;

      // the TextButton's slot (min 64 × the toolbar's 56) keeps the layout; the anchor is the label inside it
      const reset = current.id !== DEFAULT_PALETTE
        ? `<div class="tp-reset"><div class="tp-reset-label" data-pop="reset">${kit.text(t("commonReset"), { size: 14, weight: 600, lh: 1.210227, ls: 0.3, color: "var(--primary)" })}</div></div>`
        : null;

      const bar =
        `<div class="tp-bar">` +
        kit.appBar({
          safe: true,
          pop: "app-bar",
          center: true,
          leading: kit.closeButton({ pop: "close" }),
          title: `<div data-pop="title" class="tp-title">${kit.text(t("settingsColorTheme"), { size: 18, weight: 800 })}</div>`,
          actions: reset,
        }) +
        `</div>`;

      const banner =
        `<div class="tp-banner" data-pop="banner" style="background:linear-gradient(${gradientAngle(GRID_W, 56).toFixed(4)}deg, var(--primary), var(--secondary))">` +
        kit.text(t("appTitle"), { size: 18, weight: 800, color: "#FFFFFF", lines: 1 }) +
        `</div>`;

      const ids = kit.palettes.map((p) => p.id);
      const scrollY = gridScroll(ctx.spec || {}, ids, Math.max(0, ids.indexOf(selectedId)));
      const cards = kit.palettes
        .map((p, i) => {
          const on = p.id === selectedId;
          const accent = p.primary; // isDark ? palette.accentDark : palette.primary — both are primary
          const dot = (c) => `<i class="tp-dot" style="background:${c}"></i>`;
          const style = on ? `--tp-glow:${accent}` : "";
          const baseline = GRID_TOP - (scrollY || 0) + Math.floor(i / 3) * (CELL_H + 12) + nameTop(on) + NAME_BASELINE;
          const nudge = scrollY == null ? 0 : snapNudge(baseline);
          return (
            `<div class="tp-cell"${on ? ` data-pop="palette-selected"` : ""}>` +
            `<div class="tp-card${on ? " tp-on" : ""}" data-pop="palette-${esc(p.id)}"${style ? ` style="${style}"` : ""}>` +
            `<div class="tp-dots">${dot(p.primary)}${dot(p.secondary)}</div>` +
            `<div class="tp-name"${nudge ? ` style="translate:0 ${nudge.toFixed(4)}px"` : ""}>${kit.text(t(p.nameKey), { size: 13, weight: on ? 700 : 500, color: on ? accent : "var(--ink-sub)", lines: 1 })}</div>` +
            (on ? `<div class="tp-check" style="color:${accent}">${ctx.icon("Icons.check_circle_rounded")}</div>` : "") +
            `</div></div>`
          );
        })
        .join("");

      return (
        bar +
        `<div class="tp-body">${banner}</div>` +
        `<div class="tp-clip"><div class="app-scroll"><div class="tp-grid-pad">` +
        `<div class="tp-grid" data-pop="palette-grid" style="grid-template-columns:repeat(3, ${CELL_W}px);grid-auto-rows:${CELL_H}px">${cards}</div>` +
        `</div></div></div>`
      );
    },
  });
})();
