/* BYB design kit — palettes, categories, the iOS status bar and the components that recur across the app's
 * screens. Styles live in app/kit.css (tokens as CSS custom properties on .byb-app, switched by .mode-light /
 * .mode-dark and .pal-<id>). Every size, radius, weight and colour comes from the named Dart widget; units are
 * points (1 CSS px = 1 pt). Everything returns an HTML string; nothing touches the DOM at load time (this file
 * also runs in node's vm).
 *
 * ═══ TYPOGRAPHY — read this before writing any text (details in the kit.css header) ════════════════════════════
 *   · Text inherits the theme's bodyMedium: line-height 1.5 and letter-spacing 0.25pt, EVEN leading (= CSS).
 *     .byb-app sets both; a Dart `height:` / `letterSpacing:` overrides them.
 *   · AppFont.style(…) is ONE face (Inter Regular): w500 looks Regular, w600+ is synthetic bold. That is the
 *     .byb-app default family, so write the Dart weight and Chrome synthesises the same bold.
 *   · GoogleFonts.inter(fontWeight: w) loads the real face → add class "k-gf". AppTextStyles.monoAmount (w700)
 *     `.copyWith(fontWeight: w800)` stays Bold 700 (the budget hero, stat tiles).
 *   · Skia rounds each line box and baseline to a whole point, and starts glyphs letterSpacing/2 right of CSS →
 *     class "k-line", with --lh = the Dart height and --ls = the Dart letterSpacing (set --ls, never
 *     letter-spacing, on k-line text). kit.text() does all of it:
 *                 kit.text("Eduardo", { size: 13, weight: 700 })
 *                 kit.text("$2,370.36", { size: 44, weight: 700, lh: 1, ls: -1, gf: true, tnum: true })
 *     or by hand: <div class="k-line k-gf" style="font-size:16px;font-weight:600;--lh:1.15;--ls:-0.1px">
 *   · Keep each Text in its own block (or flex item). An inline span inside a block sits in the block's 1.5 strut.
 *   · A DefaultTextStyle that REPLACES the theme's style changes the defaults under it: the AppBar title slot
 *     (headlineMedium: 1.35, −0.2, proportional leading — kit.appBar sets it; pass size / weight only) and
 *     AnimatedDefaultTextStyle (no height → --lh: 1.210227, no tracking → --ls: 0px). Proportional leading is
 *     --k-prop: 1 on a k-line.
 *   · The family is part of a style: kit.text writes k-af (AppFont.style) unless o.gf (GoogleFonts) or o.inherit.
 *   · Emoji: a Text(emoji) centred in a badge → kit.emojiBadge; an emoji before a label → kit.emoji() (iOS gives
 *     it a wider box than Chrome). Emoji Inter has a glyph for (☀ ❤ ⚠ ▶ …) are MONOCHROME Inter glyphs in any
 *     Text in the app's family, U+FE0F or not: the kit's text helpers drop that U+FE0F so Chrome draws Inter's
 *     glyph too; run hand-written text through kit.skiaText(str).
 *   Utility classes (kit.css): k-line (+ --lh, --ls, --k-prop) · k-af · k-gf · k-tnum · k-upper · k-block ·
 *   k-ellipsis (clips with a 0.5em margin, so descenders and accents survive a small height) · k-clamp2 (two lines;
 *   never paints a third) · k-emoji-ios
 *   Shadows: a Dart BoxShadow blurRadius r is CSS blur 1.1547·r + 1 (σ = 0.57735·r + 0.5 vs CSS's b / 2).
 *   Fonts: kit.js wraps BYBApp.ready() so it also loads "Inter AppFont" (kit.css's one-face AppFont family).
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════
 *
 * Verified (scratch scenes rendered at 3x through app.js and diffed against raw/ captures, mean |Δ| / 255):
 *   status bar 0.16–0.37 on ten captures × en / es-419 · menu + add bar 0.3 · revamp form bar 0.4, tab bar 0.3 ·
 *   primary button 0.2 · section labels 0.4–1.0 · member + category ring cards 1.1–1.6 · day header 0.2 ·
 *   chips 0.8 · group rows 0.8 · expense tile 1.2 · compare badge 2.1 · card shadow halo 0.4–0.5 · segmented
 *   2.6 / 2.8 (en / es-419) · app bar title: Settings 24/700 0.4 / 0.6 exact, Compare 20/800 and Color Theme
 *   18/800 2–3 (0.5–0.7 shifted: the capture's glyphs sit 1 raw px, 0.33pt, lower). Known residue: a centred
 *   24pt emoji sits 0.67pt left of the capture; ±1 raw px vertical on some text.
 *
 * Colours are CSS values, so pass tokens where the app uses tokens: "var(--green)", "var(--spend-mid)", or a
 * category's hex from kit.categories.
 *
 * Options every component accepts (last argument, `o`):
 *   o.pop    data-pop id (a slide can pop the element out; BYBApp.layout measures it)
 *   o.cls    extra class names
 *   o.style  extra inline CSS
 *
 * ─── data ──────────────────────────────────────────────────────────────────────────────────────────────────
 * kit.W = 440, kit.H = 956, kit.SAFE_TOP = 62, kit.SAFE_BOTTOM = 34        iPhone 17 Pro Max, pt
 * kit.palettes     [{ id, nameKey, name, primary, primaryLight, primaryDark, secondary, secondaryLight,
 *                     secondaryDark, onPrimary }] in AppColorPalette.all order (the theme picker's). nameKey is
 *                     the ARB key (ctx.t(p.nameKey) → "Royal" / "Zafiro"). The picker's two dots are primary +
 *                     secondary. onPrimary: the label colour estimateBrightnessForColor picks on a primary fill
 *                     ("#FFFFFF", or "rgba(0,0,0,0.87)" on aurora) — the CSS token is var(--on-primary).
 * kit.palette(id)  one of them (royal when unknown)
 * kit.categories   { groceries: { key, type, nameKey, emoji, color }, … } from category_data.dart. key is the
 *                     snake_case l10n key ("shopping_entertainment"), type the canonical English DB name,
 *                     nameKey the ARB key ("categoriesShoppingEntertainment").
 * kit.category(k)  by key, by type ("Shopping & Entertainment") or by nameKey; null when unknown
 * kit.categoryOrder, kit.categoryFallbackColor ("#607D8B"), kit.customCategoryColors
 *
 * ─── helpers ───────────────────────────────────────────────────────────────────────────────────────────────
 * kit.text(str, o)            one Flutter Text as a block: o.size (14), o.weight (400), o.lh (Dart height;
 *                             default inherited — the theme's 1.5), o.ls (letterSpacing pt; default inherited —
 *                             the theme's 0.25), o.color, o.gf (GoogleFonts real weight; otherwise AppFont,
 *                             class k-af), o.inherit (no family of its own: a TextStyle without fontFamily),
 *                             o.prop (proportional leading), o.tnum (tabular figures), o.upper, o.align,
 *                             o.lines (1 = one line + ellipsis, 2 = clamp), o.inline (a span), o.html (str is
 *                             trusted HTML, not escaped or skiaText'd). Keep text in its own element: an
 *                             inline span inside a block inherits the block's 1.5 strut and grows the line.
 * kit.fitText(str, o)         FittedBox(fit: BoxFit.scaleDown) around kit.text(str, o) (o.size required), in a
 *                             .k-fit the caller lets fill its box: unchanged when it fits, shrunk as a whole when not
 * kit.skiaText(str)           str with U+FE0F dropped after the emoji Inter has a glyph for (see TYPOGRAPHY)
 * kit.spendLevel(spent, ceiling)         "low" | "mid" | "high" | "max" (spendLevelForMoney)
 * kit.spendColor(spent, ceiling)         → "var(--spend-low|mid|high|max)"
 * kit.categoryRingColor(spent, ceiling)  categoryRingColor: at the ceiling stays high; only OVER is max
 * kit.memberTint(index)       MemberAvatar.paletteFor: 0 fab (primary), 1 secondary, 2 green, 3 #FFC107, 4 red
 * kit.esc(s)                  HTML escape
 *
 * ─── chrome ────────────────────────────────────────────────────────────────────────────────────────────────
 * kit.statusBar(ctx, o)       the iOS status bar as captured: 9:41, Dynamic Island, cellular / wifi / battery.
 *                             Absolute, top 0, 440 × 62, z-index 60. app.js appends it to every screen; a screen
 *                             that needs options sets `statusBar: false` on its def and renders it itself, or a
 *                             spec passes `statusBar: { … }` (read here from ctx.spec.statusBar).
 *     o.content  "dark" (black glyphs) | "light" (white glyphs); default by ctx.mode (light → dark). The drawer
 *                capture keeps black glyphs over its scrim.
 *     o.bg       a background for the 62pt strip (default none — the screen shows through)
 *     o.time     default "9:41" (glyph-fitted to the capture; any other string is set as plain text)
 *     o.island   false hides the Dynamic Island
 * kit.appBar(o)               buildModernAppBar / AppBar: transparent, toolbar 56 (o.safe adds the 62pt safe
 *                             area above). The title slot carries the AppBar's title style (headlineMedium:
 *                             GoogleFonts SemiBold 18, height 1.35, −0.2, proportional leading); what goes in
 *                             merges over it.
 *     o.leading  HTML centred in the 56-wide leading slot (kit.menuButton() / kit.closeButton())
 *     o.titleText  the title string, one line + ellipsis; o.titleStyle { size, weight, color, gf } is the Text's
 *                own style (AppFont unless gf) — e.g. Settings / Reports: { size: 24, weight: 700 | 800 },
 *                Color Theme: { size: AppColors.fontLG, weight: 800 }. Without titleStyle the title is the bare
 *                headlineMedium.
 *     o.title    HTML instead of titleText — build it with kit.text(str, { size, weight }) and NO lh / ls, so
 *                the slot's 1.35 / −0.2 / proportional leading carry through
 *     o.center   centres the title (centerTitle), otherwise it starts 16 after the slot (x 72)
 *     o.actions  HTML flush right; o.actionsPad right padding (the budget / expenses "+" use 16)
 * kit.revampBar(o)            RevampScaffold / RevampTabScaffold bar: 52 tall including its 1px hairline,
 *                             8 side padding, 44-wide slots, page ground
 *     o.kind     "form" (default: ✕ + centred 15/600 −0.15 title) | "tab" (hamburger + 4 + left 22/600 −0.4)
 *     o.title    text; o.leading HTML replacing the default ✕ / hamburger ("" keeps the slot empty)
 *     o.trailing HTML in the right slot; o.safe adds the 62pt safe area above (on the page ground)
 * kit.menuButton(o)           HamburgerMenuButton: 40 circle, card fill, 0.5 border, menu_rounded 22
 * kit.addButton(o)            RevealAddButton: 44 circle, fab (primary), add_rounded 26 white   (o.size, o.icon)
 * kit.closeButton(o)          _CircleCloseBtn: 38 circle, #111 @ 7% (white @ 10%), close_rounded 20
 * kit.infoButton(o)           the "Where it goes" info: 30 circle, 4% / 6%, info_outline_rounded 16 subText
 *
 * ─── text ──────────────────────────────────────────────────────────────────────────────────────────────────
 * kit.sectionLabel(text, o)   uppercase section label, one line box of the theme height
 *     o.variant  "revamp"  RevampSectionLabel 11/600/+1.1 secondary (THIS MONTH, DETAILS)   default
 *                "planner" PlannerPage._sectionLabel 13/700/+1.4 subText (WHERE IT GOES, BUDGET BY CATEGORY)
 *                "members" MemberSharesSection 12/700/+0.8 subText (WHO'S SPENDING WHAT)
 *                "month"   the hero's 13/700/+1.6 subText (SEPTEMBER 2026)
 * kit.money(text, size, o)    RevampTokens.moneyStyle(size): real ExtraBold, height 1, tracking −size/44,
 *                             tabular (member / category cards, form amounts). A block (its own line box —
 *                             an inline span would sit in its parent's 1.5 strut); o.inline for a span.
 *                             o.color (default inherits)
 *
 * ─── surfaces ──────────────────────────────────────────────────────────────────────────────────────────────
 * kit.card(inner, o)          AppColors.cardDecoration: card fill, 1px border, radius 20, light-mode shadow
 *     o.radius (the budget stat tiles use 16), o.pad (the Dart padding as CSS — the 1px border sits outside
 *     it, as in Flutter), o.shadow false, o.border false
 * kit.tile(inner, o)          Material(color: card, borderRadius 16): no border, no shadow   (o.radius, o.pad)
 * kit.group(rows, o)          RevampGroup: o.label (8 below), a group surface (radius 12, 1px hairline) of rows
 *                             (array of HTML) with 16-inset dividers, o.helper under it, 22 below
 * kit.row(o)                  RevampRow / RevampValueRow: min 48, padding 16 × 14
 *     o.label, o.subtitle (12 secondary, height 1.35, 2 below the label)
 *     o.value       text → 14.5/600 right-aligned (o.tabular, o.muted, o.placeholder shown when value is "")
 *     o.trailing    HTML instead of a value (o.fixed: label expands, trailing keeps its width — switches)
 *     o.leading     HTML before the value, 8 apart (kit.identityTile(…))
 *     o.chevron     chevron_right_rounded 19 in the placeholder colour, 8 after
 *     o.action      the label is an action (accent text, 600)
 * kit.toggle(on, o)           _RevampSwitch: 44 × 27, knob 21, accent fill / trackOff
 * kit.toggleRow(o)            RevampToggleRow: kit.row({ label, subtitle, fixed, trailing: kit.toggle(o.on) })
 * kit.primaryButton(label, o) RevampPrimaryButton: 52 tall, radius 12, accent fill, 16/600 −0.15 white
 * kit.textButton(label, o)    RevampTextButton: 44 tall, 15/600 danger (o.accent: accent text)
 * kit.divider(o)              1px line: o.color (default var(--r-divider)), o.inset left margin
 *
 * ─── badges, bars, rings ───────────────────────────────────────────────────────────────────────────────────
 * kit.emojiBadge(emoji, color, o)  a SOLID colour square / disc with the emoji centred (flat-solid rule)
 *     o.size 44, o.radius 12 (o.circle: a disc), o.emojiSize (size / 2), o.emojiHeight 1 (the Dart height),
 *     o.emojiProportional (an inherit:false emojiTextStyle; identityTile sets it)
 *     Expense tile 44/12/22 · category ring disc 52 circle/24 · Reports list 40/12 (check the widget)
 * kit.emoji(emoji, o)        an emoji inside running text or a Row before a label — iOS gives the emoji a wider
 *                             box than Chrome (+0.046em before, +0.245em after, measured at 13–14pt):
 *                             `${kit.emoji("🏠")} Housing is your top spending category…` (keep the space)
 * kit.categoryBadge(cat, o)   emojiBadge with the category's emoji + colour (cat: key, type or object)
 * kit.identityTile(emoji, color, o)  RevampIdentityTile: 24 square, radius 7, emoji 0.55 × size, height 1.1
 *     (the 38 preview tile: o.size 38, o.radius 10)
 * kit.progressBar(value, o)   pill bar, value 0..1: o.height 7, o.color (var(--green)), o.track
 *                             (var(--chart-track)), o.width (CSS, default 100%) — the budget hero's bar
 * kit.ring(value, inner, o)   ProgressRing: o.size 76, o.stroke 6, o.color, o.track (black 8% / white 10%);
 *                             arc from 12 o'clock, round caps, clamped 0..1; inner HTML centred in the hole
 * kit.avatar(o)               MemberAvatar: disc tinted with o.tint (default var(--fab)) at 15% (dark 20%),
 *                             o.src picture on top (cover) or o.initials (w800, 0.46 × size; 0.38 for two
 *                             letters). o.size 20. The captures' faces are Memoji PNGs with transparent
 *                             backgrounds (Eduardo tint 0 = primary, Laura tint 1 = secondary).
 * kit.ringCard(o)             _MemberShareDonut / CategoryRingCard: card, radius 16, padding 14 · 12, ring 76/6,
 *                             10 → title 13/700 → amount (moneyStyle 16) → lines 3 apart
 *     o.kind     "category" (default: 52 solid disc with o.emoji on o.color; title height 1.2, up to two
 *                lines; 4 above the amount; the amount and every line are FittedBox(scaleDown) — a line wider
 *                than the column shrinks whole, measured in the browser, see kit.css .k-fit) | "member"
 *                (o.avatar HTML in the hole — kit.avatar({ size: 52 }); title one line at the theme height;
 *                3 above the amount; the amount is one line + ellipsis, the lines wrap to two, centred, ellipsis)
 *                The card is a width container for its fitted lines: give it a width (kit.pair, a block).
 *     o.value, o.ringColor   the ring;  o.inner replaces the hole entirely
 *     o.title, o.amount (text), o.amountColor
 *     o.lines    [{ text, color, emphasis }]: 11/400 subText (emphasis 12/600)
 *     o.recurrent  the autorenew badge on the disc (category)
 * kit.pair(cards, o)          two equal cards 10 apart, stretched to the taller (IntrinsicHeight); an odd card
 *                             keeps half the width. Side padding (16) is the caller's.
 *
 * ─── lists, chips, misc ────────────────────────────────────────────────────────────────────────────────────
 * kit.expenseTile(o)          _ExpenseTileModern: card, radius 16, 0.5 border @ 60%, padding 16 × 10, margin 0 4
 *     o.emoji, o.color (solid 44 badge, radius 12, emoji 22), o.title (the expense name, GoogleFonts 16/600
 *     −0.1, height 1.15), o.category + o.date ("Restaurants  ·  Sep 8", 12 subText, height 1.4),
 *     o.recurrent (autorenew 12 first), o.author { name, avatar: kit.avatar({ size: 16, … }) } on its own line,
 *     o.amount (GoogleFonts 16/700 #00A878 tabular, height 1)
 * kit.dayHeader(label, total, o)  _ProfileStyleDayHeader: padding 16 12 8, GoogleFonts 11/600 +0.4 height 1.2,
 *                             black 54% (white 68%); the total right, tabular, no tracking
 * kit.chips(html, o)          CategoryFilterStrip: a 36-tall clipping strip; inside, a row with 16 side padding,
 *                             chips 8 apart (o.offset scrolls the row left; the strip still clips at its edges)
 * kit.chip(label, o)          _Chip: pill, 1px border, 14 × 6, 13/500 ink 75% (height 1.2), stretched to the strip's 36;
 *                             o.selected fills with o.color (a hex: the label is white or black87 by
 *                             estimateBrightnessForColor; o.onFill forces it). Without o.color — "All" — the fill is
 *                             var(--primary) and the label var(--on-primary) (black87 on aurora).
 * kit.compareBadge(text, o)   _comparisonBadge: 34 circle (10% / 16% fill, 1.5 ring @ 45%, 18 arrow) + 8 +
 *                             12/600 label (height 1.2, two lines max), max 140 wide
 *     o.tone     "up" (amber #B8860B / #E0B84C, arrow_upward) | "down" (green, arrow_downward) |
 *                "same" (subText, trending_flat)
 * kit.segmented(segments, o)  _SlidingSegmentedControl: segments [{ label, emoji }], o.selected index. Track
 *                             4% / 6% with a 1px border, 3 padding; selected = fab pill with a 35% glow;
 *                             13 w700 white / w600 black54 (white70), Inter's own line height, no tracking;
 *                             emoji 14 on Inter's metrics, ×1.15 when selected. Pass the app's strings as they
 *                             are ("☀️" renders as Inter's monochrome ☀, as on iOS).
 */
(function () {
  "use strict";

  const A = (window.BYBApp = window.BYBApp || {});
  const K = (A.kit = A.kit || {});

  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const icon = (name, cls) => (A.icon ? A.icon(name, cls || "") : `<i class="ic ic-missing ${cls || ""}">?</i>`);
  const num = (n, d = 3) => String(Math.round(n * 10 ** d) / 10 ** d);
  // class list + data-pop + style
  const attrs = (base, o, style) => {
    o = o || {};
    const cls = [base, o.cls].filter(Boolean).join(" ");
    const st = [style, o.style].filter(Boolean).join(";");
    return `class="${cls}"${o.pop ? ` data-pop="${esc(o.pop)}"` : ""}${st ? ` style="${st}"` : ""}`;
  };

  // Emoji code points Inter-Regular has a glyph for (its cmap ∩ the emoji list). In a Text in the app's family,
  // HarfBuzz finds the base in Inter and treats a following U+FE0F as ignorable, so Skia draws Inter's
  // monochrome glyph (the Settings "Light" ☀️ segment). Chrome honours the selector and falls back to Apple Color
  // Emoji — dropping the U+FE0F (not before a ZWJ) gives Inter's glyph there too.
  const INTER_EMOJI = new Set([0xa9, 0xae, 0x203c, 0x2049, 0x2122, 0x2194, 0x2195, 0x2196, 0x2197, 0x2198, 0x2199,
    0x21a9, 0x21aa, 0x23cf, 0x24c2, 0x25aa, 0x25b6, 0x25c0, 0x2600, 0x2665, 0x26a0, 0x2764, 0x2b06, 0x2b1c]);
  const skiaText = (s) => String(s == null ? "" : s).replace(/([©® -⯿])️(?!‍)/g, (m, c) => (INTER_EMOJI.has(c.codePointAt(0)) ? c : m));
  // text content: Skia's emoji rule, then HTML-escaped
  const txt = (s) => esc(skiaText(s));
  // one emoji that Inter draws as an ordinary monochrome glyph (no iOS emoji box around it)
  const interGlyph = (s) => { const t = skiaText(s); return [...t].length === 1 && INTER_EMOJI.has(t.codePointAt(0)); };

  K.esc = esc;
  K.skiaText = skiaText;
  K.W = 440;
  K.H = 956;
  K.SAFE_TOP = 62;
  K.SAFE_BOTTOM = 34;

  // "Inter AppFont" is the kit's own family (kit.css). BYBApp.ready() loads the faces a layout measures with;
  // make it load this one too, or the first layout (and the FittedBox measurements below) can run on a fallback.
  // Harmless when app.js lists the face itself.
  if (typeof A.ready === "function" && !A.ready.kitFonts) {
    const ready = A.ready;
    A.ready = async function () {
      if (typeof document !== "undefined" && document.fonts)
        await Promise.all(["400 20px 'Inter AppFont'", "700 20px 'Inter AppFont'"].map((f) => document.fonts.load(f).catch(() => null)));
      return ready.apply(this, arguments);
    };
    A.ready.kitFonts = true;
  }

  // ThemeData.estimateBrightnessForColor: relative luminance, (L + 0.05)² > 0.15 → light
  const isLightFill = (hex) => {
    const m = /^#?([0-9a-f]{6})$/i.exec(String(hex || "").trim());
    if (!m) return false;
    const n = parseInt(m[1], 16);
    const lin = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
    const L = 0.2126 * lin((n >> 16) & 255) + 0.7152 * lin((n >> 8) & 255) + 0.0722 * lin(n & 255);
    return (L + 0.05) * (L + 0.05) > 0.15;
  };
  const BLACK87 = "rgba(0,0,0,0.87)";

  // ------------------------------------------------------------------ palettes (AppColorPalette.all)

  const P = (id, primary, primaryLight, primaryDark, secondary, secondaryLight, secondaryDark) => ({
    id,
    name: id[0].toUpperCase() + id.slice(1),
    nameKey: `palette${id[0].toUpperCase()}${id.slice(1)}`,
    primary, primaryLight, primaryDark, secondary, secondaryLight, secondaryDark,
    onPrimary: isLightFill(primary) ? BLACK87 : "#FFFFFF",
  });
  K.palettes = [
    P("royal", "#2F5BBD", "#5C86E0", "#23458F", "#D97706", "#F59E0B", "#B45309"),
    P("teal", "#00A878", "#00C896", "#007A58", "#1A1A2E", "#F0F0F5", "#0F0F1A"),
    P("ocean", "#0891B2", "#22D3EE", "#155E75", "#F97316", "#FB923C", "#C2410C"),
    P("lavender", "#8B5CF6", "#A78BFA", "#6D28D9", "#F43F5E", "#FB7185", "#BE123C"),
    P("sunset", "#EA580C", "#FB923C", "#C2410C", "#DC2626", "#EF4444", "#B91C1C"),
    P("midnight", "#2563EB", "#60A5FA", "#1D4ED8", "#06B6D4", "#22D3EE", "#0E7490"),
    P("rose", "#E11D48", "#FB7185", "#BE123C", "#14B8A6", "#2DD4BF", "#0F766E"),
    P("forest", "#15803D", "#22C55E", "#14532D", "#EAB308", "#FACC15", "#A16207"),
    P("berry", "#BE185D", "#EC4899", "#9D174D", "#84CC16", "#A3E635", "#4D7C0F"),
    P("slate", "#475569", "#64748B", "#334155", "#EA580C", "#FB923C", "#C2410C"),
    P("candy", "#EC4899", "#F472B6", "#DB2777", "#14B8A6", "#2DD4BF", "#0F766E"),
    P("mocha", "#92400E", "#D97706", "#78350F", "#F59E0B", "#FBBF24", "#B45309"),
    P("aurora", "#06B6D4", "#67E8F9", "#0E7490", "#A855F7", "#C084FC", "#7E22CE"),
    P("indigo", "#4F46E5", "#818CF8", "#3730A3", "#F59E0B", "#FBBF24", "#D97706"),
    P("sky", "#0284C7", "#38BDF8", "#075985", "#F97316", "#FB923C", "#EA580C"),
    P("sage", "#65A30D", "#84CC16", "#4D7C0F", "#A855F7", "#C084FC", "#7E22CE"),
  ];
  K.palette = (id) => K.palettes.find((p) => p.id === id) || K.palettes[0];

  // ------------------------------------------------------------------ categories (category_data.dart)

  const C = (type, key, emoji, color) => ({
    key,
    type,
    nameKey: "categories" + key.split("_").map((w) => w[0].toUpperCase() + w.slice(1)).join(""),
    emoji,
    color,
  });
  const cats = [
    C("Groceries", "groceries", "🛒", "#22C55E"),
    C("Car Payments", "car_payments", "🚗", "#3B82F6"),
    C("Gas & Transportation", "gas_transportation", "🛞", "#F97316"),
    C("Car Maintenance", "car_maintenance", "🔧", "#64748B"),
    C("Housing", "housing", "🏠", "#6366F1"),
    C("Utilities", "utilities", "💡", "#EAB308"),
    C("Healthcare", "healthcare", "🩺", "#14B8A6"),
    C("Debt Payments", "debt_payments", "💳", "#A855F7"),
    C("Savings", "savings", "💰", "#84CC16"),
    C("Shopping & Entertainment", "shopping_entertainment", "🛍️", "#EC4899"),
    C("Gifts & Donations", "gifts_donations", "🎁", "#F59E0B"),
    C("Pets", "pets", "🐾", "#8B5CF6"),
    C("Travel", "travel", "✈️", "#06B6D4"),
    C("Emergency Fund", "emergency_fund", "🚨", "#EF4444"),
    C("Subscriptions", "subscriptions", "📦", "#D97706"),
    C("Restaurants", "restaurants", "🍽️", "#C2410C"),
    C("Other", "other", "❓", "#94A3B8"),
  ];
  K.categories = {};
  for (const c of cats) K.categories[c.key] = c;
  K.categoryOrder = cats.map((c) => c.key);
  K.category = (k) => {
    if (k && typeof k === "object") return k;
    return K.categories[k] || cats.find((c) => c.type === k || c.nameKey === k) || null;
  };
  K.categoryFallbackColor = "#607D8B"; // AppColors.defaultCategoryHex
  K.customCategoryColors = ["#EF4444", "#EC4899", "#A855F7", "#8B5CF6", "#6366F1", "#3B82F6", "#06B6D4", "#14B8A6", "#2DD4BF", "#22C55E", "#84CC16", "#A3E635", "#EAB308", "#D97706", "#F59E0B", "#F97316", "#C2410C", "#94A3B8", "#64748B", "#B45309"];

  // ------------------------------------------------------------------ spend levels (spend_level.dart)

  const EPS = 0.005; // kMoneyEpsilon
  const level = (spent, ceiling) => {
    if (ceiling <= 0) return spent > 0 ? "max" : "low";
    if (spent >= ceiling * 1.0 - EPS) return "max";
    if (spent >= ceiling * 0.8 - EPS) return "high";
    if (spent >= ceiling * 0.5 - EPS) return "mid";
    return "low";
  };
  K.spendLevel = level;
  K.spendColor = (spent, ceiling) => `var(--spend-${level(spent, ceiling)})`;
  K.categoryRingColor = (spent, ceiling) => {
    const l = level(spent, ceiling);
    return `var(--spend-${l === "max" && !(spent - ceiling > EPS) ? "high" : l})`;
  };
  K.memberTint = (i) => ["var(--fab)", "var(--secondary)", "var(--green)", "#FFC107", "var(--red)"][((i % 5) + 5) % 5];

  // ------------------------------------------------------------------ text

  K.text = (str, o) => {
    o = o || {};
    const st = [
      o.size != null ? `font-size:${o.size}px` : "",
      o.weight != null ? `font-weight:${o.weight}` : "",
      o.lh != null ? `--lh:${o.lh}` : "",
      o.ls != null ? `--ls:${o.ls}px` : "",
      o.prop != null ? `--k-prop:${o.prop ? 1 : 0}` : "",
      o.color ? `color:${o.color}` : "",
      o.align ? `text-align:${o.align}` : "",
    ].filter(Boolean).join(";");
    const cls = [
      "k-line",
      o.gf ? "k-gf" : o.inherit ? "" : "k-af",
      o.tnum ? "k-tnum" : "",
      o.upper ? "k-upper" : "",
      o.lines === 1 ? "k-ellipsis" : o.lines === 2 ? "k-clamp2" : "",
      o.inline ? "" : "k-block",
    ].filter(Boolean).join(" ");
    const tag = o.inline ? "span" : "div";
    return `<${tag} ${attrs(cls, o, st)}>${o.html ? str : txt(str)}</${tag}>`;
  };

  K.sectionLabel = (text, o) => {
    o = o || {};
    const v = ["revamp", "planner", "members", "month"].includes(o.variant) ? o.variant : "revamp";
    return `<div ${attrs(`k-label k-label-${v} k-line`, o)}>${txt(text)}</div>`;
  };

  K.money = (text, size, o) => {
    o = o || {};
    const tag = o.inline ? "span" : "div";
    return `<${tag} ${attrs(`k-money k-line${o.inline ? "" : " k-block"}`, o, `font-size:${size}px${o.color ? `;color:${o.color}` : ""}`)}>${txt(text)}</${tag}>`;
  };

  // FittedBox(fit: BoxFit.scaleDown) around a one-line Text. CSS cannot read a text's own width, so the natural
  // width W0 is measured here once, on a hidden copy with the same classes (browser only — in node's vm there is
  // no document and the line is left unscaled), and the column's width picks the scale in CSS:
  // font-size min(S, 100cqi · S / W0) and the rounded line box likewise, inside a .k-fit width container.
  // Tracking must be in em (it scales with the font); `lineBox` is the unscaled rounded line height in px.
  let measureHost = null;
  const naturalWidth = (html) => {
    if (typeof document === "undefined" || !document.body) return 0;
    if (!measureHost) {
      measureHost = document.createElement("div");
      measureHost.className = "byb-app";
      measureHost.setAttribute("aria-hidden", "true");
      measureHost.style.cssText = "position:absolute;left:-40000px;top:0;width:4000px;height:auto;visibility:hidden;pointer-events:none;contain:layout style;background:none";
    }
    if (!measureHost.isConnected) document.body.appendChild(measureHost);
    // A zh-Hant phone draws its Han in PingFang TC under .byb-app:lang(zh-Hant) (kit.css), so its copy must be measured
    // under that lang too: without it the copy takes the Hiragino faces, whose Han are narrower (生鮮雜貨 at 14 pt:
    // 57.00 against 58.13) and whose punctuation is far narrower (「週」，（月）。 93.00 against 116.25). Only a zh phone
    // (app.js build sets A.buildLang while a screen renders) changes the host; every other language measures on the
    // lang-less host it always has.
    if (/^zh(-|$)/i.test(A.buildLang || "")) measureHost.lang = A.buildLang;
    else measureHost.removeAttribute("lang");
    measureHost.innerHTML = html;
    const el = measureHost.firstElementChild;
    el.style.display = "inline-block";
    el.style.whiteSpace = "nowrap";
    const w = el.getBoundingClientRect().width;
    measureHost.innerHTML = "";
    return w;
  };
  const fitted = (cls, style, content, size, lineBox, boxStyle) => {
    const w0 = naturalWidth(`<div class="${cls}" style="${style}">${content}</div>`);
    const fit = w0 > 0
      ? `;font-size:min(${size}px, calc(100cqi * ${num(size / w0, 6)}));--k-lhr:min(${lineBox}px, calc(100cqi * ${num(lineBox / w0, 6)}))`
      : "";
    return `<div class="k-fit"${boxStyle ? ` style="${boxStyle}"` : ""}><div class="${cls}" style="${style}${fit}">${content}</div></div>`;
  };

  // FittedBox(fit: BoxFit.scaleDown, alignment: centerLeft) around a kit.text line — `fitted` above for a screen's own
  // Text: kit.text(str, o) inside a .k-fit that the caller lets fill its box (Expanded → FittedBox → Text). o.size is
  // required. The font-size, the rounded line box and o.ls (pt, as kit.text takes it) are each capped at
  // min / max(value, 100cqi · value / W0): a line that fits keeps EXACTLY kit.text's values (the tracking too, which
  // is why it is not converted to em), and only a wider one shrinks, all three by the same factor. Added 2026-09-18
  // for the Budget hero (planner_view.dart:816), where the ×30 New Taiwan dollar "NT$71,110.80" ran under the
  // vs-last-month badge; app/screens/budget.js HERO_FITTED_LANGS says which languages use it there and why not all.
  K.fitText = (str, o) => {
    o = o || {};
    const size = o.size;
    const plain = K.text(str, o);
    const w0 = naturalWidth(plain);
    if (!(w0 > 0) || !(size > 0)) return `<div class="k-fit">${plain}</div>`;
    const lineBox = Math.round(size * (o.lh != null ? o.lh : 1.5));
    const cap = (v, unit) => `${v < 0 ? "max" : "min"}(${v}${unit}, calc(100cqi * ${num(v / w0, 8)}))`;
    const fit = [`font-size:${cap(size, "px")}`, `--k-lhr:${cap(lineBox, "px")}`, o.ls != null ? `--ls:${cap(o.ls, "px")}` : ""].filter(Boolean).join(";");
    return `<div class="k-fit">${K.text(str, { ...o, style: [o.style, fit].filter(Boolean).join(";") })}</div>`;
  };

  // ------------------------------------------------------------------ status bar

  // Geometry measured on raw/en/01_budget_top.png and 06_budget_top_dark_royal.png (identical), in raw capture
  // px (viewBox 1320 × 186 = 440 × 62 pt), then fitted glyph by glyph against the captures.
  const SB_TIME_941 = [["9", 193.5, 116.5], [":", 229.75, 110.5], ["4", 243.5, 116.5], ["1", 278, 116.5]];
  const sbWifi = (() => {
    const cx = 1053.5, cy = 117.4, d = 2, ang = Math.PI / 4;
    const r = (n) => Math.round(n * 100) / 100;
    const pt = (rad, th) => `${r(cx + rad * Math.sin(th))},${r(cy - rad * Math.cos(th))}`;
    const band = (ri, ro) => {
      const Ro = ro - d, Ri = ri + d, to = ang - d / Ro, ti = ang - d / Ri;
      return `M${pt(Ri, -ti)}L${pt(Ro, -to)}A${r(Ro)},${r(Ro)} 0 0 1 ${pt(Ro, to)}L${pt(Ri, ti)}A${r(Ri)},${r(Ri)} 0 0 0 ${pt(Ri, -ti)}Z`;
    };
    const wedge = (R) => {
      const Rr = R - d, t = ang - Math.asin(d / Rr);
      return `M${cx},${r(cy - d * Math.SQRT2)}L${pt(Rr, -t)}A${r(Rr)},${r(Rr)} 0 0 1 ${pt(Rr, t)}Z`;
    };
    return `<g stroke="currentColor" stroke-width="${d * 2}" stroke-linejoin="round"><path d="${band(33.4, 41.9)}"/><path d="${band(19.13, 27.62)}"/><path d="${wedge(13.4)}"/></g>`;
  })();

  K.statusBar = function (ctx, o) {
    ctx = ctx || {};
    const spec = ctx.spec || {};
    o = Object.assign({}, spec.statusBar && typeof spec.statusBar === "object" ? spec.statusBar : null, o || {});
    const content = o.content || (ctx.mode === "dark" ? "light" : "dark");
    const time = o.time == null ? "9:41" : String(o.time);
    const timeSvg = time === "9:41"
      ? SB_TIME_941.map(([c, x, y]) => `<text x="${x}" y="${y}">${c}</text>`).join("")
      : `<text x="196" y="116.5">${esc(time)}</text>`;
    const bars = [101, 94, 85, 76].map((t, k) => `<rect x="${937 + 18 * k}" y="${t}" width="11" height="${117 - t}" rx="4"/>`).join("");
    return `<div ${attrs(`k-statusbar k-sb-${content}`, o, o.bg ? `background:${o.bg}` : "")} aria-hidden="true">` +
      `<svg viewBox="0 0 1320 186" width="440" height="62" fill="currentColor">` +
      (o.island === false ? "" : `<rect x="471.75" y="41.75" width="376.5" height="110.5" rx="55.25" fill="#000"/>`) +
      `<g font-size="54">${timeSvg}</g>${bars}${sbWifi}` +
      `<rect x="1106.75" y="76.75" width="80.5" height="39.5" rx="12.5" fill="none" stroke="currentColor" stroke-width="3.5" opacity=".4"/>` +
      `<rect x="1112" y="82" width="71" height="29" rx="9.5"/>` +
      `<path d="M1193,89.5A5,7 0 0 1 1193,103.5Z" opacity=".5"/>` +
      `</svg></div>`;
  };

  // ------------------------------------------------------------------ round buttons

  K.menuButton = (o) => `<div ${attrs("k-menu", o)}>${icon("Icons.menu_rounded")}</div>`;
  K.addButton = (o) => {
    o = o || {};
    const size = o.size || 44;
    return `<div ${attrs("k-add", o, size !== 44 ? `width:${size}px;height:${size}px` : "")}>${icon(o.icon || "Icons.add_rounded")}</div>`;
  };
  K.closeButton = (o) => `<div ${attrs("k-close", o)}>${icon("Icons.close_rounded")}</div>`;
  K.infoButton = (o) => `<div ${attrs("k-info", o)}>${icon("Icons.info_outline_rounded")}</div>`;

  // ------------------------------------------------------------------ bars

  K.appBar = (o) => {
    o = o || {};
    const lead = o.leading != null ? `<div class="k-lead">${o.leading}</div>` : "";
    const titleHtml = o.title != null ? o.title
      : o.titleText != null ? K.text(o.titleText, Object.assign({}, o.titleStyle || {}, { lines: 1, inherit: !o.titleStyle }))
      : null;
    const title = titleHtml != null ? `<div class="k-title${o.center ? " k-center" : ""}">${titleHtml}</div>` : "";
    const actions = o.actions != null ? `<div class="k-actions"${o.actionsPad ? ` style="padding-right:${o.actionsPad}px"` : ""}>${o.actions}</div>` : "";
    const bar = `<div ${attrs("k-appbar", o)}>${lead}${title}${actions}</div>`;
    return o.safe ? `<div class="k-appbar-safe">${bar}</div>` : bar;
  };

  K.revampBar = (o) => {
    o = o || {};
    const kind = o.kind === "tab" ? "tab" : "form";
    const lead = o.leading !== undefined ? o.leading || "" : kind === "tab" ? K.menuButton() : K.closeButton();
    const bar =
      `<div ${attrs(`k-rbar k-rbar-${kind}`, o)}>` +
      `<div class="k-slot">${lead}</div>` +
      `<div class="k-rtitle k-line">${txt(o.title || "")}</div>` +
      `<div class="k-slot">${o.trailing || ""}</div></div>`;
    return o.safe ? `<div style="padding-top:62px;background:var(--r-page)">${bar}</div>` : bar;
  };

  // ------------------------------------------------------------------ surfaces

  K.card = (inner, o) => {
    o = o || {};
    const st = [
      o.radius != null ? `border-radius:${o.radius}px` : "",
      o.pad != null ? `padding:${o.pad}` : "",
      o.shadow === false ? "box-shadow:none" : "",
      o.border === false ? "border-color:transparent" : "",
    ].filter(Boolean).join(";");
    return `<div ${attrs("k-card", o, st)}>${inner || ""}</div>`;
  };

  K.tile = (inner, o) => {
    o = o || {};
    const st = [o.radius != null ? `border-radius:${o.radius}px` : "", o.pad != null ? `padding:${o.pad}` : ""].filter(Boolean).join(";");
    return `<div ${attrs("k-tile", o, st)}>${inner || ""}</div>`;
  };

  K.divider = (o) => {
    o = o || {};
    return `<div ${attrs("k-divider", o, `height:1px;background:${o.color || "var(--r-divider)"}${o.inset ? `;margin-left:${o.inset}px` : ""}`)}></div>`;
  };

  K.group = (rows, o) => {
    o = o || {};
    const body = (rows || []).map((r, i) => (i ? `<div class="k-divider"></div>` : "") + r).join("");
    return `<div ${attrs("k-group", o)}>` +
      (o.label != null ? K.sectionLabel(o.label) : "") +
      `<div class="k-group-body">${body}</div>` +
      (o.helper != null ? `<div class="k-group-helper k-line">${txt(o.helper)}</div>` : "") +
      `</div>`;
  };

  K.row = (o) => {
    o = o || {};
    const label =
      `<div class="k-row-label"><div class="k-t k-line k-clamp2${o.action ? " k-action" : ""}">${txt(o.label)}</div>` +
      (o.subtitle != null ? `<div class="k-s k-line">${txt(o.subtitle)}</div>` : "") +
      `</div>`;
    let trail = "";
    if (o.trailing != null) trail = o.trailing;
    else if (o.value != null) {
      const empty = String(o.value).trim() === "";
      const cls = ["k-row-value k-line", empty ? "k-empty" : o.muted ? "k-muted" : "", o.tabular ? "k-tnum" : ""].filter(Boolean).join(" ");
      trail = `<span class="${cls}">${txt(empty ? o.placeholder || "" : o.value)}</span>`;
    }
    if (o.leading) trail = `<span class="k-row-lead">${o.leading}</span>${trail}`;
    const chevron = o.chevron ? icon("Icons.chevron_right_rounded", "k-chevron") : "";
    return `<div ${attrs(`k-row${o.fixed ? " k-fixed" : ""}`, o)}>${label}<div class="k-row-gap"></div>` +
      `<div class="k-row-trail">${trail}</div>${chevron}</div>`;
  };

  K.toggle = (on, o) => `<div ${attrs(`k-switch${on ? " k-on" : ""}`, o)}></div>`;
  K.toggleRow = (o) => K.row(Object.assign({}, o, { fixed: true, trailing: K.toggle(!!(o && o.on)) }));

  K.primaryButton = (label, o) => `<div ${attrs("k-primary", o)}><span class="k-line k-block">${txt(label)}</span></div>`;
  K.textButton = (label, o) => {
    o = o || {};
    return `<div ${attrs(`k-textbtn${o.accent ? " k-accent" : ""}`, o)}>${txt(label)}</div>`;
  };

  // ------------------------------------------------------------------ badges

  // An emoji Text. Most are `TextStyle(fontSize: s, height: 1)`: they inherit the theme's family (Inter) and EVEN
  // leading, and Skia lays the line out on Inter's metrics while the glyph falls back to Apple Color Emoji — so
  // Inter goes first here too (class k-emoji-inter) and CSS half-leading lands the baseline in the same place.
  // emojiTextStyle is inherit: false with Apple Color Emoji as the family → PROPORTIONAL leading over its
  // ascent 1 / descent 0.3125: the glyph sits (0.2619·h − 0.34375)em from where CSS puts it, and no tracking.
  const emojiSpan = (emoji, size, h, proportional) => {
    const extra = proportional ? `;position:relative;top:${num(0.2619 * h - 0.34375, 4)}em;letter-spacing:0` : "";
    // the Inter-first span follows Skia's emoji rule (skiaText); emojiTextStyle's family is the emoji face
    return `<span class="k-emoji${proportional ? "" : " k-emoji-inter"}" style="font-size:${size}px;line-height:${h}${extra}">${proportional ? esc(emoji) : txt(emoji)}</span>`;
  };
  K.emojiSpan = emojiSpan;
  // An emoji inside running text ("🏠 Housing is your top…"): an inline span with iOS's wider emoji box.
  K.emoji = (emoji, o) => `<span ${attrs(`k-emoji-ios${interGlyph(emoji) ? " k-emoji-text" : ""}`, o)}>${txt(emoji)}</span>`;

  K.emojiBadge = (emoji, color, o) => {
    o = o || {};
    const size = o.size || 44;
    const radius = o.circle ? "50%" : `${o.radius != null ? o.radius : 12}px`;
    const es = o.emojiSize || size / 2;
    return `<div ${attrs("k-badge", o, `width:${size}px;height:${size}px;border-radius:${radius};background:${color}`)}>${emojiSpan(emoji, es, o.emojiHeight || 1, !!o.emojiProportional)}</div>`;
  };

  K.categoryBadge = (cat, o) => {
    const c = K.category(cat) || { emoji: "❓", color: K.categoryFallbackColor };
    return K.emojiBadge(c.emoji, c.color, o);
  };

  K.identityTile = (emoji, color, o) => {
    o = o || {};
    const size = o.size || 24;
    return K.emojiBadge(emoji, color, Object.assign({}, o, { size, radius: o.radius != null ? o.radius : 7, emojiSize: size * 0.55, emojiHeight: 1.1, emojiProportional: true }));
  };

  // ------------------------------------------------------------------ progress

  K.progressBar = (value, o) => {
    o = o || {};
    const v = Math.max(0, Math.min(1, +value || 0));
    const h = o.height || 7;
    const st = `height:${h}px;width:${o.width || "100%"}${o.track ? `;background:${o.track}` : ""}`;
    return `<div ${attrs("k-bar", o, st)}><i style="width:${num(v * 100, 4)}%;background:${o.color || "var(--green)"}"></i></div>`;
  };

  K.ring = (value, inner, o) => {
    o = o || {};
    const size = o.size || 76;
    const stroke = o.stroke || 6;
    const v = Math.max(0, Math.min(1, +value || 0));
    const c = size / 2;
    const r = (size - stroke) / 2;
    const circ = 2 * Math.PI * r;
    const track = o.track || "var(--progress-track)";
    const color = o.color || "var(--spend-low)";
    let arc = "";
    if (v >= 1) arc = `<circle cx="${c}" cy="${c}" r="${num(r)}" fill="none" stroke="${color}" stroke-width="${stroke}"/>`;
    else if (v > 0)
      arc = `<circle cx="${c}" cy="${c}" r="${num(r)}" fill="none" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" ` +
        `stroke-dasharray="${num(circ * v)} ${num(circ)}" transform="rotate(-90 ${c} ${c})"/>`;
    return `<div ${attrs("k-ring", o, `width:${size}px;height:${size}px`)}>` +
      `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"><circle cx="${c}" cy="${c}" r="${num(r)}" fill="none" stroke="${track}" stroke-width="${stroke}"/>${arc}</svg>` +
      `<div class="k-hole">${inner || ""}</div></div>`;
  };

  K.avatar = (o) => {
    o = o || {};
    const size = o.size || 20;
    const tint = o.tint || "var(--fab)";
    const bg = `color-mix(in srgb, ${tint} var(--avatar-alpha), transparent)`;
    let inner = "";
    if (o.src) inner = `<img src="${esc(o.src)}" alt="">`;
    else if (o.initials) {
      const t = String(o.initials);
      inner = `<b style="font-size:${num(size * (t.length > 1 ? 0.38 : 0.46))}px;color:${tint}">${txt(t)}</b>`;
    }
    return `<div ${attrs("k-avatar", o, `width:${size}px;height:${size}px;background:${bg}`)}>${inner}</div>`;
  };

  // ------------------------------------------------------------------ ring cards

  K.ringCard = (o) => {
    o = o || {};
    const member = o.kind === "member";
    let hole = o.inner;
    if (hole == null) {
      if (member) hole = o.avatar || "";
      else
        hole = `<div style="position:relative;width:52px;height:52px">` +
          `<div class="k-badge" style="width:52px;height:52px;border-radius:50%;background:${o.color || K.categoryFallbackColor}">${emojiSpan(o.emoji || "", 24, 1)}</div>` +
          (o.recurrent ? `<div class="k-recurrent">${icon("Icons.autorenew_rounded")}</div>` : "") +
          `</div>`;
    }
    const ring = K.ring(o.value, hole, { size: 76, stroke: 6, color: o.ringColor });
    const title = member
      ? `<div class="k-rc-title k-line k-ellipsis">${txt(o.title)}</div>`
      : `<div class="k-rc-title k-rc-cat k-line k-clamp2">${txt(o.title)}</div>`;
    const amountText = txt(o.amount == null ? "" : o.amount);
    const amountColor = o.amountColor ? `;color:${o.amountColor}` : "";
    let amount, lines;
    if (member) {
      // Text(maxLines: 1, ellipsis) · Text(maxLines: 2, centred, ellipsis)
      amount = `<div class="k-money k-line k-block k-rc-amount k-ellipsis" style="margin-top:3px;font-size:16px${amountColor}">${amountText}</div>`;
      lines = (o.lines || [])
        .map((l) => `<div class="k-rc-line k-rc-wrap k-line k-clamp2${l.emphasis ? " k-em" : ""}" style="margin-top:3px${l.color ? `;color:${l.color}` : ""}">${txt(l.text)}</div>`)
        .join("");
    } else {
      // FittedBox(scaleDown) around each: tracking in em so it shrinks with the text (0.25pt at the unscaled size)
      amount = fitted("k-money k-line k-block k-rc-amount", `font-size:16px${amountColor}`, amountText, 16, 16, "margin-top:4px");
      lines = (o.lines || [])
        .map((l) => {
          const s = l.emphasis ? 12 : 11;
          return fitted(`k-rc-line k-line k-block${l.emphasis ? " k-em" : ""}`, `--ls:${num(0.25 / s, 6)}em${l.color ? `;color:${l.color}` : ""}`,
            txt(l.text), s, Math.round(s * 1.5), "margin-top:3px");
        })
        .join("");
    }
    return `<div ${attrs("k-ringcard", o)}>${ring}${title}${amount}${lines}</div>`;
  };

  K.pair = (cards, o) => {
    const list = (cards || []).slice(0, 2);
    if (list.length === 1) list.push("<div></div>");
    return `<div ${attrs("k-pair", o)}>${list.join("")}</div>`;
  };

  // ------------------------------------------------------------------ expense list

  K.expenseTile = (o) => {
    o = o || {};
    const badge = K.emojiBadge(o.emoji || "", o.color || K.categoryFallbackColor, { size: 44, radius: 12, emojiSize: 22 });
    const cap =
      `<div class="k-x-cap">` +
      (o.recurrent ? icon("Icons.autorenew_rounded") : "") +
      `<span class="k-line k-ellipsis">${txt(o.category)}</span><span class="k-line k-x-dot">  ·  </span><span class="k-line">${txt(o.date)}</span></div>`;
    const author = o.author
      ? `<div class="k-x-author">${o.author.avatar || ""}<span class="k-line k-ellipsis">${txt(o.author.name)}</span></div>`
      : "";
    return `<div ${attrs("k-xtile", o)}>${badge}<div class="k-x-body">` +
      `<div class="k-x-title k-line k-ellipsis">${txt(o.title)}</div>${cap}${author}</div>` +
      `<div class="k-x-amount k-line">${txt(o.amount)}</div></div>`;
  };

  K.dayHeader = (label, total, o) =>
    `<div ${attrs("k-dayhead", o)}><span class="k-d-label k-line">${txt(label)}</span>` +
    (total != null ? `<span class="k-d-total k-line">${txt(total)}</span>` : "") +
    `</div>`;

  // ------------------------------------------------------------------ chips, compare badge, segmented

  K.chips = (html, o) => {
    o = o || {};
    // the strip clips; the row inside it scrolls
    return `<div ${attrs("k-chips", o)}><div class="k-chips-row"${o.offset ? ` style="transform:translateX(${-o.offset}px)"` : ""}>${html || ""}</div></div>`;
  };

  K.chip = (label, o) => {
    o = o || {};
    const on = !!o.selected;
    const primary = !o.color || /^var\(--primary\)$/.test(String(o.color).trim());
    const color = primary ? "var(--primary)" : o.color;
    // estimateBrightnessForColor needs the colour's value: the palette's primary is a token (var(--on-primary));
    // any other non-hex colour gets white unless o.onFill says otherwise
    const onFill = o.onFill || (primary ? "var(--on-primary)" : isLightFill(color) ? BLACK87 : "#FFFFFF");
    const st = on ? `background:${color};color:${onFill}` : "";
    return `<div ${attrs(`k-chip${on ? " k-on" : ""}`, o, st)}><span class="k-line k-block">${txt(label)}</span></div>`;
  };

  K.compareBadge = (text, o) => {
    o = o || {};
    const tone = ["up", "down", "same"].includes(o.tone) ? o.tone : "up";
    const ic = { up: "Icons.arrow_upward_rounded", down: "Icons.arrow_downward_rounded", same: "Icons.trending_flat_rounded" }[tone];
    return `<div ${attrs("k-compare", o, `--cmp:var(--compare-${tone})`)}>` +
      `<div class="k-cmp-dot">${icon(ic)}</div>` +
      `<div class="k-cmp-text k-line k-clamp2">${txt(text)}</div></div>`;
  };

  K.segmented = (segments, o) => {
    o = o || {};
    const sel = o.selected || 0;
    const items = (segments || [])
      .map((s, i) =>
        `<div class="k-seg-item${i === sel ? " k-on" : ""}">` +
        (s.emoji ? `<span class="k-emoji k-emoji-inter k-line${interGlyph(s.emoji) ? " k-emoji-text" : ""}">${txt(s.emoji)}</span>` : "") +
        `<span class="k-seg-label k-line k-ellipsis">${txt(s.label)}</span></div>`)
      .join("");
    return `<div ${attrs("k-seg", o)}>${items}</div>`;
  };
})();
