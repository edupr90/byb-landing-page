/* Tools & Settings — lib/ui/views/profile_view.dart (ProfileView, l10n.profileTitle), signed-in BYB+ owner.
 *
 * Layout (pt): buildModernAppBar (62 safe + 56, pinned, page ground): HamburgerMenuButton · title AppFont 24/bold
 * left-aligned at x 72. ListView (the only scrolling part — .app-scroll in a clip that starts at y 118), padding
 * 16 · 12 · 16 · 24 + 34 + 48:
 *   _PremiumHeroCard (isPro): padding 20, radius 20, 1px accent @ 35% border, gradient accent @ 18% → 8% (light
 *     12% → 5%) topLeft → bottomRight, accentGlow(accent, 0.12) = blur 14 y 4. Row: AnimatedEmoji gemStone 48 ·
 *     16 · Column(title 18/w800 ink · 4 · subtitle 14/w500 subText) · Icons.verified_rounded 28 accent.
 *     accent = fabLight / fabDark = palette primary.
 *   20 · _SectionHeader (13/w700 +0.4 subText, 8 below) · _SettingsCard (cardDecoration: card, radius 20, 1px border,
 *     light shadow) — rows separated by _TileDivider (1px, 14 insets, theme dividerColor = border @ 20%) — · 16 · …
 *   _SegmentedSettingTile: padding 14 × 10: Row(_EmojiBadge 36 · 12 · title 16/w600) · 10 · _SlidingSegmentedControl
 *     (kit.segmented: 🌓 System · ☀️ Light · 🌙 Dark).
 *   _NavTile: padding 16: _EmojiBadge 36 (solid disc, emoji 18 height 1) · 12 · title 16/w600 (Expanded) ·
 *     trailing (8 left, 24 right when there is no chevron) · Icons.chevron_right 24 ink @ 50%.
 *     Language / Currency trailing: flag Text 16 · 6 · text AppFont 16/w500 white / black.
 *   _PinLockToggleTile: padding 16 × 6: 38 tile (teal @ 12% / 18%, radius 10, 🛡️ 18) · 12 · Column(PIN Lock
 *     16/w600 · 2 · description 12.5/w500 subText) · Switch.adaptive — on iOS a Material switch in the Cupertino
 *     look: a 60 × 48 box (switchWidth 52 + 4 padding each side; 40 + 8 for the padded tap target) with the 51 × 31
 *     track centred and a 28 thumb, so the row is 60 tall.
 *   With params.pinLock, Change PIN / View Recovery PIN are _NavTiles and Face ID is _BiometricToggleTile (the
 *   _PinLockToggleTile layout with a blueAccent @ 12% / 18% tile holding FaceIdIcon 22).
 *   Below Security (release build — the kDebugMode DEV TOOLS card is left out), as profile_view.dart builds it for a
 *   signed-in BYB+ owner on iOS:
 *   Manage: 🪪 Edit profile · 👥 Shared budget · 🏷️ Manage Custom Categories (_NavTiles) · ♻️ Recurring Categories ·
 *     🔁 Recurring Expenses (_GatedNavTile, unlocked: padding 14, title 16/w700, chevron_right 22 subText in 28).
 *   Cloud Sync: _SyncAccountTile (padding 16: 👤 badge · 12 · email 16/w600 one line · 2 · "Last synced {MMMd jm}"
 *     12.5/w500 subText · 8 · SyncStatusIndicator 18 = cloud_done_rounded successGreen) · 🔄 Sync now · 🚪 Sign out ·
 *     🗑️ Delete account (error colour) — the last three without a chevron. The time is ctx.data.now.
 *   More: ✨ Daily Financial Affirmations · ☁️ Backup & Import · 🔔 Notifications. Legal: 📜 Privacy Policy · ⚖️ Terms.
 *   24 · _VersionAndLock: "v2.0.0" 13 subText centred; with params.pinLock 10 · IOSPrimaryButton "Lock App" (8 side
 *   inset, radius 30, fab, padding 13 × 24, lock_outline 20 · 8 · 16/w700 +0.2 white).
 *
 * The gem is the animated_emoji package's Noto "gemStone" Lottie (lottie/gemStone.json, 1024 × 1024 in a 48 × 48
 * box, BoxFit.contain) evaluated at frame 74 of 80 — the frame all three captures show (fitted: mean |Δ| 1.0 on
 * light royal, 3.3 on dark sunset en / es-419, no offset) — as static SVG.
 *
 * States
 *   dark-sunset   06_settings_dark_sunset (en, es-419)
 *   light-royal   06_settings_light_royal (en only, reference)
 *   params.themeMode  "system" | "light" | "dark": the selected Dark Mode segment (default: the spec's mode)
 *   params.pinLock    true: the PIN Lock switch on, and the rows the app adds with it: Change PIN (🔒 orange), View
 *                     Recovery PIN (🔑 purple) and the iOS Face ID toggle (FaceIdIcon on blueAccent) — default off
 *   params.faceId     true: the Face ID switch on (only with pinLock)
 *   Scrolling: the list scrolls under a viewport that starts at y 118 — scroll: "@section-support" with
 *   scrollOffset: -118 puts that header at the top of the list. The whole list is built, so any scroll the app can
 *   reach renders; BYBApp.layout does not clamp, so a scroll past the list's end shows page ground the app never would.
 *   Only the frames down to the Security header are checked against captures.
 *
 * data-pop anchors (section-* anchors are the header's text line, not the full-width padding strip)
 *   app-bar                 the pinned app bar (hamburger · title), below the status bar
 *   title                   the "Tools & Settings" title text
 *   settings-hero           the BYB+ Active card
 *   hero-gem                the gem emoji in it
 *   hero-verified           the verified badge in it
 *   section-personalize     the "Personalize" header text · group-personalize  its card
 *   row-dark-mode           the Dark Mode tile (badge, title and the segmented control)
 *   mode-segment            the System / Light / Dark segmented control itself (the "themes" slide's callout)
 *   row-language            Language row (flag + endonym) · row-currency  Currency row (flag + code)
 *   row-color-theme         Color Theme row
 *   section-support         the "Support" header text · group-support  its card
 *   row-manage-subscription · row-restore-purchases · row-rate-app · row-send-feedback   the Support rows
 *   section-security        the "Security" header text · group-security  its card
 *   row-pin-lock            the PIN Lock toggle row
 *   row-change-pin · row-recovery-pin · row-face-id   the rows params.pinLock adds under it
 *   section-manage          the "Manage" header text · group-manage  its card
 *   row-edit-profile · row-shared-budget · row-custom-categories · row-recurring-categories · row-recurring-expenses
 *   section-cloud-sync      the "Cloud Sync" header text · group-cloud-sync  its card
 *   row-sync-account        the account row (email + last synced) · sync-status  its cloud-done indicator
 *   row-sync-now · row-sign-out · row-delete-account
 *   section-more            the "More" header text · group-more  its card
 *   row-affirmations · row-backup · row-notifications
 *   section-legal           the "Legal" header text · group-legal  its card
 *   row-privacy-policy · row-terms-of-use
 *   version                 the "v2.0.0" line
 *   lock-app                the Lock App button (only with params.pinLock)
 */
(function () {
  "use strict";

  // Flutter's Material colours used as badge fills (Colors.blue / purple / … the [500] shades; pinkAccent and
  // indigoAccent are the A200 shades)
  const M = {
    blue: "#2196F3", purple: "#9C27B0", teal: "#009688", indigo: "#3F51B5", cyan: "#00BCD4", orange: "#FF9800",
    green: "#4CAF50", red: "#F44336", blueGrey: "#607D8B", pinkAccent: "#FF4081", indigoAccent: "#536DFE",
  };

  // lib/ui/widgets/common/face_id_icon.dart at size 22 (stroke s·0.08, corner radius s·0.18, bracket s·0.28, round
  // caps and joins), colour Colors.blueAccent (= its shade200, so the same in both modes). Each arcToPoint keeps the
  // painter's own `clockwise` as the SVG sweep flag (default true), so the brackets bend exactly as the app draws them.
  const FACE_ID = (() => {
    const s = 22, r = s * 0.18, c = s * 0.28, f = (n) => +n.toFixed(3);
    const arc = (x, y, cw) => `A${f(r)} ${f(r)} 0 0 ${cw ? 1 : 0} ${f(x)} ${f(y)}`;
    const d = [
      `M${f(c)} 0L${f(r)} 0${arc(0, r, true)}L0 ${f(c)}`,
      `M${f(s - c)} 0L${f(s - r)} 0${arc(s, r, true)}L${s} ${f(c)}`,
      `M0 ${f(s - c)}L0 ${f(s - r)}${arc(r, s, true)}L${f(c)} ${s}`,
      `M${s} ${f(s - c)}L${s} ${f(s - r)}${arc(s - r, s, false)}L${f(s - c)} ${s}`,
      `M${f(s * 0.5)} ${f(s * 0.42)}L${f(s * 0.5)} ${f(s * 0.56)}`,
      `M${f(s * 0.34)} ${f(s * 0.64)}Q${f(s * 0.5)} ${f(s * 0.76)} ${f(s * 0.66)} ${f(s * 0.64)}`,
    ].join("");
    return (
      `<svg class="st-faceid" width="${s}" height="${s}" viewBox="0 0 ${s} ${s}" aria-hidden="true">` +
      `<path d="${d}" fill="none" stroke="#448AFF" stroke-width="${f(s * 0.08)}" stroke-linecap="round" stroke-linejoin="round"/>` +
      `<circle cx="${f(s * 0.36)}" cy="${f(s * 0.36)}" r="${f(s * 0.045)}" fill="#448AFF"/>` +
      `<circle cx="${f(s * 0.64)}" cy="${f(s * 0.36)}" r="${f(s * 0.045)}" fill="#448AFF"/></svg>`
    );
  })();

  // animated_emoji 3.0.0 lottie/gemStone.json at frame 74 (see header). The mask id is unique per render: a document
  // can hold several copies of this screen (the composer's slab + callouts, a hidden slab under display:none), and
  // url(#id) resolves to the FIRST element with that id — inside a display:none copy the mask does not apply.
  let seq = 0;
  const gem = (mid) =>
    `<svg class="st-gem" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="48" height="48" aria-hidden="true"><defs><mask id="${mid}" maskUnits="userSpaceOnUse" x="0" y="0" width="1024" height="1024" style="mask-type:alpha"><path d="M198.23 158.26L393.87 80.48L705.77 94.52L835.03 190.23L708.3 302.83L477.02 337.7L263.72 275.57Z" fill="#fff"/></mask></defs>` +
    `<path d="M391.5 77.83L187.67 156.17L160.49 188.72L29 369.83L266.5 645.5L418.71 822.82L513 937.5L957.06 409.53L927.83 282.67L848.27 191.3L717.33 92.83Z" fill="#ddf3fd"/>` +
    `<path d="M512.38 937.11L925.87 281.66L957.21 409.13Z" fill="#0388d2"/><path d="M957.21 409.13L925.87 281.66L846.65 189Z" fill="#b1ebf2"/>` +
    `<path d="M925.87 281.66L712.75 91.85L846.65 189Z" fill="#81d4fa"/><path d="M28.48 369.36L186.42 156.11L254.8 276.67Z" fill="#e1f5fe"/>` +
    `<path d="M511.5 932.32L28.48 369.36L297.42 525.41Z" fill="#1e88e5"/><path d="M297.42 525.41L28.48 369.36L254.8 276.67Z" fill="#81d4fa"/>` +
    `<path d="M297.92 524.96L254.78 275.62L475.76 338.69Z" fill="#66b7f6"/><path d="M627.18 550.19L297.92 524.96L475.76 338.69Z" fill="#b7ecf3"/>` +
    `<path d="M512.38 937.11L297.92 524.96L627.18 550.19Z" fill="#e1f5fe"/><path d="M715.36 303.29L475.76 338.69L627.18 550.19Z" fill="#dbf2fd"/>` +
    `<path d="M957.21 409.13L512.38 937.11L627.18 550.19Z" fill="#aadffb"/><path d="M957.21 409.13L715.36 303.29L627.18 550.19Z" fill="#82d4fa"/>` +
    `<path d="M715.36 303.29L846.65 189L957.21 409.13Z" fill="#0589d2"/>` +
    `<path d="M186.93 156.55L389.61 77.61L712.75 91.85L846.65 189L715.36 303.29L475.76 338.69L254.78 275.62Z" fill="#b3e5fc"/>` +
    `<g mask="url(#${mid})"><path d="M878 -84L946 548L1242 534.38L1244 -78.55Z" fill="#e1f5fe"/></g></svg>`;

  // LOCAL FALLBACK (requestedChanges: data.js) — Currencies.all (lib/core/data/currency_data.dart) code → flag, for a
  // settings.currency other than data.currency; Currencies.flagFor falls back to "❓"
  const LOCAL_CURRENCY_FLAGS = {
    USD: "🇺🇸", EUR: "🇪🇺", GBP: "🇬🇧", JPY: "🇯🇵", CNY: "🇨🇳", INR: "🇮🇳", CHF: "🇨🇭", AUD: "🇦🇺", NZD: "🇳🇿", CAD: "🇨🇦",
    SGD: "🇸🇬", HKD: "🇭🇰", KRW: "🇰🇷", ZAR: "🇿🇦", AED: "🇦🇪", SAR: "🇸🇦", TRY: "🇹🇷", RUB: "🇷🇺", EGP: "🇪🇬", THB: "🇹🇭",
    MYR: "🇲🇾", IDR: "🇮🇩", PHP: "🇵🇭", PKR: "🇵🇰", BDT: "🇧🇩", ILS: "🇮🇱", NGN: "🇳🇬", KES: "🇰🇪", MXN: "🇲🇽", COP: "🇨🇴",
    ARS: "🇦🇷", BRL: "🇧🇷", CLP: "🇨🇱", PEN: "🇵🇪", DOP: "🇩🇴", CRC: "🇨🇷", GTQ: "🇬🇹", HNL: "🇭🇳", NIO: "🇳🇮", PAB: "🇵🇦",
    UYU: "🇺🇾", VES: "🇻🇪", PLN: "🇵🇱", CZK: "🇨🇿", HUF: "🇭🇺", RON: "🇷🇴", SEK: "🇸🇪", NOK: "🇳🇴", DKK: "🇩🇰", TWD: "🇹🇼",
    VND: "🇻🇳",
  };

  // Where the capture draws a trailing flag glyph relative to Chrome's k-emoji-ios box, in pt. Fitted per flag with a
  // ±6 raw px search: 🇺🇸 (Language en, Currency en + es-419, both themes) ⅓ right and 1⅓ lower; 🇵🇷 (Language
  // es-419) 1⅓ lower only — with the ⅓ it sat 1 raw px right (mean |Δ| 3.8 → 0.00). Other flags: 1⅓ lower.
  const FLAG_NUDGE = { "🇺🇸": [0.3333, 1.3333], "🇵🇷": [0, 1.3333] };
  const flagNudge = (flag) => FLAG_NUDGE[flag] || [0, 1.3333];

  // LOCAL FALLBACK (requestedChanges: l10n/demo/*.js ownerEmail) — the signed-in owner's account email on the Cloud
  // Sync card (user.email). A reserved example.com address with the localized owner name.

  // profile_view.dart _VersionAndLock: a literal, not an l10n string
  const APP_VERSION = "v2.0.0";

  // LOCAL FALLBACK (requestedChanges: kit.text): Inter's contextual case form — a "+" after a capital letter is drawn
  // raised in the app (Skia shapes the app's Inter with calt → plus.case); the bundled static Inter has no case glyphs.
  // Returns trusted HTML for kit.text(…, { html: true }).
  const LOCAL_CASE_PLUS = (kit, str) =>
    kit.esc(kit.skiaText(str)).replace(/(\p{Lu})\+/gu, '$1<span class="st-case">+</span>');

  BYBApp.screen({
    id: "settings",
    title: "Tools & Settings",
    states: {
      "dark-sunset": { mode: "dark", palette: "sunset" },
      "light-royal": { mode: "light", palette: "royal" },
    },
    captures: {
      "dark-sunset": "06_settings_dark_sunset",
      "light-royal": "06_settings_light_royal",
    },

    render(ctx) {
      const { kit, t, d } = ctx;
      const params = ctx.params || {};
      const demo = d;

      const badge = (emoji, color) => kit.emojiBadge(emoji, color, { size: 36, circle: true, emojiSize: 18, cls: "st-badge" });
      const title = (text, o) => kit.text(text, Object.assign({ size: 16, weight: 600, color: "var(--ink)" }, o));
      const divider = `<div class="st-divider"></div>`;
      // _SectionHeader: the anchor is the text line itself; the 8 below stays on the padding box
      const section = (text, pop) =>
        `<div class="st-section"><div class="st-section-text" data-pop="${pop}">${kit.text(text, { size: 13, weight: 700, ls: 0.4, color: "var(--ink-sub)" })}</div></div>`;
      const card = (rows, pop) => kit.card(rows.join(divider), { pop, cls: "st-card" });

      // _NavTile: o.chevron false = showChevron false; o.color the title colour (Delete account: error)
      const navTile = (o) =>
        `<div class="st-nav" data-pop="${o.pop}">` +
        badge(o.emoji, o.color) +
        `<div class="st-nav-title">${title(o.title, o.titleColor ? { color: o.titleColor } : null)}</div>` +
        (o.trailing != null ? `<div class="st-trail${o.chevron === false ? " st-nochev" : ""}">${o.trailing}</div>` : "") +
        (o.chevron === false ? "" : `<div class="st-chev">${ctx.icon("Icons.chevron_right")}</div>`) +
        `</div>`;
      // _GatedNavTile (requiresPro, unlocked for the BYB+ owner): padding 14, title 16/w700, chevron_right 22 subText
      // in a 28 box, no "Included with BYB+" caption and no lock
      const gatedTile = (o) =>
        `<div class="st-gated" data-pop="${o.pop}">` +
        badge(o.emoji, o.color) +
        `<div class="st-nav-title">${title(o.title, { weight: 700 })}</div>` +
        `<div class="st-gated-chev">${ctx.icon("Icons.chevron_right")}</div>` +
        `</div>`;
      // _LanguageInlineTrailing / _CurrencyInlineTrailing
      const inline = (flag, text) => {
        const [nx, ny] = flagNudge(flag);
        return (
          `<div class="st-flag k-line">${kit.emoji(flag, { style: `translate:${nx}px ${ny}px` })}</div>` +
          kit.text(text, { size: 16, weight: 500, color: "var(--st-inline-ink)" })
        );
      };

      // ---- app bar
      const bar = `<div class="st-bar">${kit.appBar({
        safe: true,
        pop: "app-bar",
        leading: kit.menuButton(),
        title: `<div class="st-title" data-pop="title">${kit.text(t("profileTitle"), { size: 24, weight: 700, lines: 1 })}</div>`,
      })}</div>`;

      // ---- BYB+ hero (isPro)
      const hero =
        `<div class="st-hero" data-pop="settings-hero">` +
        `<div class="st-hero-gem" data-pop="hero-gem">${gem(`st-gem-m${++seq}`)}</div>` +
        `<div class="st-hero-text">` +
        kit.text(LOCAL_CASE_PLUS(kit, t("profileHeroPremiumTitle")), { size: 18, weight: 800, color: "var(--ink)", cls: "st-hero-title", html: true }) +
        kit.text(t("profileHeroPremiumSubtitle"), { size: 14, weight: 500, color: "var(--ink-sub)", cls: "st-hero-sub" }) +
        `</div>` +
        `<div class="st-verified" data-pop="hero-verified">${ctx.icon("Icons.verified_rounded")}</div>` +
        `</div>`;

      // ---- Personalize
      const modes = ["system", "light", "dark"];
      const modeSel = Math.max(0, modes.indexOf(params.themeMode || ctx.mode));
      const darkMode =
        `<div class="st-seg-tile" data-pop="row-dark-mode">` +
        `<div class="st-seg-head">${badge("🌙", M.blue)}<div class="st-seg-title">${title(t("settingsDarkMode"))}</div></div>` +
        kit.segmented(
          [
            { emoji: "🌓", label: t("settingsThemeSystem") },
            { emoji: "☀️", label: t("settingsThemeLight") },
            { emoji: "🌙", label: t("settingsThemeDark") },
          ],
          { selected: modeSel, pop: "mode-segment", cls: "st-seg" },
        ) +
        `</div>`;

      const settings = ctx.data.settings || {};
      const lang = settings.language || { name: "languageName", flag: "languageFlag" };
      // settings.currency is a code today; a { code, flag } object is read too (requestedChanges: data.js)
      const cur = settings.currency;
      const currencyCode = (cur && typeof cur === "object" ? cur.code : cur) || (ctx.data.currency && ctx.data.currency.code) || "USD";
      const currencyFlag =
        (cur && typeof cur === "object" && cur.flag) ||
        (ctx.data.currency && ctx.data.currency.code === currencyCode && ctx.data.currency.flag) ||
        LOCAL_CURRENCY_FLAGS[currencyCode] ||
        "❓"; // Currencies.flagFor

      const personalize = card(
        [
          darkMode,
          navTile({ pop: "row-language", emoji: "🌐", color: M.purple, title: t("settingsLanguageTitle"), trailing: inline(d(lang.flag), d(lang.name)), chevron: false }),
          navTile({ pop: "row-currency", emoji: "💱", color: M.teal, title: t("settingsCurrency"), trailing: inline(currencyFlag, currencyCode), chevron: false }),
          navTile({ pop: "row-color-theme", emoji: "🎨", color: "var(--primary)", title: t("settingsColorTheme") }),
        ],
        "group-personalize",
      );

      // ---- Support
      const support = card(
        [
          navTile({ pop: "row-manage-subscription", emoji: "🧾", color: M.indigo, title: t("supportManageSubscription") }),
          navTile({ pop: "row-restore-purchases", emoji: "🔄", color: M.purple, title: t("supportRestorePurchases") }),
          navTile({ pop: "row-rate-app", emoji: "⭐️", color: M.blue, title: t("supportRateApp") }),
          navTile({ pop: "row-send-feedback", emoji: "✉️", color: M.cyan, title: t("supportSendFeedback") }),
        ],
        "group-support",
      );

      // ---- Security: _PinLockToggleTile; with the PIN on, Change PIN · View Recovery PIN · _BiometricToggleTile (iOS)
      const pinOn = !!params.pinLock;
      // _PinLockToggleTile / _BiometricToggleTile: padding 16 × 6 · 38 tile (radius 10) · 12 · title 16/w600 · 2 ·
      // description 12.5/w500 subText · Switch.adaptive
      const toggleTile = (o) =>
        `<div class="st-pin" data-pop="${o.pop}">` +
        `<div class="st-pin-tile${o.tileCls ? ` ${o.tileCls}` : ""}">${o.tile}</div>` +
        `<div class="st-pin-text">` +
        title(o.title) +
        kit.text(o.desc, { size: 12.5, weight: 500, color: "var(--ink-sub)", cls: "st-pin-desc" }) +
        `</div>` +
        `<div class="st-cswitch${o.on ? " st-on" : ""}"><i></i></div>` +
        `</div>`;
      const securityRows = [
        toggleTile({
          pop: "row-pin-lock",
          tile: kit.emojiSpan("🛡️", 18, 1.5, false), // Text('🛡️', TextStyle(fontSize: 18)): the theme's height 1.5
          title: t("securityPinLock"),
          desc: t("securityPinLockDesc"),
          on: pinOn,
        }),
      ];
      if (pinOn) {
        securityRows.push(
          navTile({ pop: "row-change-pin", emoji: "🔒", color: M.orange, title: t("securityChangePin") }),
          navTile({ pop: "row-recovery-pin", emoji: "🔑", color: M.purple, title: t("securityViewRecoveryPin") }),
          toggleTile({
            pop: "row-face-id",
            tile: FACE_ID,
            tileCls: "st-faceid-tile",
            title: t("securityFaceId"),
            desc: t("securityUnlockBiometrics"),
            on: !!params.faceId,
          }),
        );
      }
      const security = card(securityRows, "group-security");

      // ---- Manage (signed in: Edit profile first; the two recurring rows are _GatedNavTiles, unlocked for BYB+)
      const manage = card(
        [
          navTile({ pop: "row-edit-profile", emoji: "🪪", color: M.indigo, title: t("editProfileNavTitle") }),
          navTile({ pop: "row-shared-budget", emoji: "👥", color: M.teal, title: t("sharedBudgetNavTitle") }),
          navTile({ pop: "row-custom-categories", emoji: "🏷️", color: M.pinkAccent, title: t("customManageCustomCategories") }),
          gatedTile({ pop: "row-recurring-categories", emoji: "♻️", color: M.green, title: t("recurringCategories") }),
          gatedTile({ pop: "row-recurring-expenses", emoji: "🔁", color: M.indigo, title: t("recurringExpenses") }),
        ],
        "group-manage",
      );

      // ---- Cloud Sync (_CloudSyncSection, signed in + BYB+): account · Sync now · Sign out · Delete account
      const syncTime = ctx.fmt.date(ctx.data.now, "MMMd") + " " + ctx.fmt.date(ctx.data.now, "jm"); // DateFormat.MMMd(locale).add_jm()
      const account =
        `<div class="st-account" data-pop="row-sync-account">` +
        badge("👤", M.blueGrey) +
        `<div class="st-account-text">` +
        kit.text(demo("ownerEmail"), { size: 16, weight: 600, color: "var(--ink)", lines: 1 }) +
        kit.text(t("syncLastSynced", { time: syncTime }), { size: 12.5, weight: 500, color: "var(--ink-sub)", cls: "st-account-sub" }) +
        `</div>` +
        // SyncStatusIndicator(size: 18), idle: cloud_done_rounded in successGreen
        `<div class="st-sync-ind" data-pop="sync-status">${ctx.icon("Icons.cloud_done_rounded")}</div>` +
        `</div>`;
      const cloudSync = card(
        [
          account,
          navTile({ pop: "row-sync-now", emoji: "🔄", color: M.teal, title: t("syncSyncNow"), chevron: false }),
          navTile({ pop: "row-sign-out", emoji: "🚪", color: M.orange, title: t("syncSignOut"), chevron: false }),
          navTile({ pop: "row-delete-account", emoji: "🗑️", color: M.red, title: t("syncDeleteAccount"), titleColor: "var(--error)", chevron: false }),
        ],
        "group-cloud-sync",
      );

      // ---- More
      const more = card(
        [
          navTile({ pop: "row-affirmations", emoji: "✨", color: M.indigoAccent, title: t("affirmationsDailyFinancialAffirmations") }),
          navTile({ pop: "row-backup", emoji: "☁️", color: M.green, title: t("backupTitle") }),
          navTile({ pop: "row-notifications", emoji: "🔔", color: M.orange, title: t("sectionsNotifications") }),
        ],
        "group-more",
      );

      // ---- Legal (Terms of Use is iOS-only; the captures are iOS)
      const legal = card(
        [
          navTile({ pop: "row-privacy-policy", emoji: "📜", color: M.blueGrey, title: t("legalPrivacyPolicy") }),
          navTile({ pop: "row-terms-of-use", emoji: "⚖️", color: M.blueGrey, title: t("legalTermsOfUse") }),
        ],
        "group-legal",
      );

      // ---- _VersionAndLock: v2.0.0 (13 subText) · with the PIN on, 10 · Padding(h 8) IOSPrimaryButton Lock App
      const footer =
        `<div class="st-footer">` +
        `<div class="st-version" data-pop="version">${kit.text(APP_VERSION, { size: 13, color: "var(--ink-sub)" })}</div>` +
        (pinOn
          ? `<div class="st-lock" data-pop="lock-app">${ctx.icon("Icons.lock_outline")}` +
            `<div class="st-lock-label">${kit.text(t("commonLockApp"), { size: 16, weight: 700, ls: 0.2, color: "#FFFFFF", lines: 1 })}</div></div>`
          : "") +
        `</div>`;

      return (
        bar +
        `<div class="st-clip"><div class="app-scroll"><div class="st-list">` +
        hero +
        section(t("sectionsPersonalize"), "section-personalize") +
        personalize +
        section(t("sectionsSupport"), "section-support") +
        support +
        section(t("sectionsSecurity"), "section-security") +
        security +
        section(t("sectionsManage"), "section-manage") +
        manage +
        section(t("syncSectionTitle"), "section-cloud-sync") +
        cloudSync +
        section(t("sectionsMore"), "section-more") +
        more +
        section(t("sectionsLegal"), "section-legal") +
        legal +
        footer +
        `</div></div></div>`
      );
    },
  });
})();
