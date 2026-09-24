/* App drawer — lib/ui/widgets/navigation/app_drawer.dart (AppDrawer), opened over the shell (lib/main.dart: the root
 * Scaffold's `drawer:`), signed in, BYB+ active, the Shared Budget simulation running.
 *
 * What the capture shows (raw/<lang>/05_drawer_signed_in): the drawer open from Tools & Settings — the "More" row is
 * the selected one, and the screen behind the scrim is ProfileView (app/screens/settings.js) at the top. The screen
 * behind is embedded from the runtime (BYBApp.render, status bar off), not redrawn: params.behind picks it.
 *
 * Layout (pt), every number from the Dart source and checked on the capture:
 *   Material 3 Drawer: 304 wide, full height, backgroundColor cardLight / cardDark (var(--card)), shape radius 16 on the
 *     end corners, elevation 1 with a transparent shadow (none). Scaffold scrim Colors.black54 over the screen behind.
 *   SafeArea: 62 top, 34 bottom. Column (cross-axis centre):
 *   _ProfileHeader: Padding(16, 16, 16, 0) · Row(centre): MemberAvatar 52 (tint 15% / 20%, the Memoji) · 12 ·
 *     Expanded Column(start, min): name AppFont 16/w700 ink, one line · 4 · _TierBadge (padding 8 × 2, radius 6,
 *     primary; AppFont 11/w700 white +0.3 — "BYB+" with Inter's case "+") · 8 · _SyncButton: 38 circle,
 *     backgroundLight / Dark fill, 0.5 border, icon 18 (idle: refresh_rounded, subText).
 *     → avatar 16,78 52 × 52; badge 80,107.5; sync 250,85 38 × 38.
 *   16 · _DrawerDivider: Divider(height 1, thickness 0.5, indent 16 / endIndent 16, border colour) → y 146.
 *   Expanded ListView(padding vertical 8): _DrawerItem × 8 — margin 8 × 2, padding 12, radius 12: Icon 22 (accent;
 *     white on the selected pill) · 14 · label AppFont 16/w600 ink (w700 white selected), one line + ellipsis.
 *     Each row is 52 (48 + margins): Expenses at 157, Budget 209, Shared budget 261, Debt 313, Insights 365,
 *     Reports 417, History 469, More 521 (the selected accent pill, 8…296 × 521…569).
 *   _DrawerDivider (776) · Edit profile (badge_outlined) · Sign out (logout_rounded, errorLight icon + label) ·
 *   Padding(vertical 12): "appTitle  ·  v2.0.0" AppFont 11/w500 ink @ 40%, centred.
 *
 * States
 *   signed-in   05_drawer_signed_in (en, es-419): signed in, BYB+, sync idle, Shared budget already seen (no NEW),
 *               behind = Tools & Settings at the top (More selected)
 *               The Spanish capture has Tools & Settings scrolled to its debug-only DEV TOOLS card behind the scrim;
 *               the state keeps Settings at the top in both languages (no Dev Tools in a store image), so the strip
 *               right of the drawer differs from that capture on purpose.
 * params
 *   behind      "settings" | "budget" | "expenses" | "insights" | "none" — the screen under the scrim, rendered in
 *               the spec's mode / palette / data. "none" leaves the page ground. Default "settings" for BYB+ and
 *               "expenses" when params.pro is false (settings.js only draws the BYB+ Active hero).
 *               With params.pro or params.signedIn false, the embedded Expenses gets authors: false (no shared
 *               budget without BYB+ and an account). "budget" and "insights" always draw the shared budget
 *               (the member cards / shared rows), so pair them with the default BYB+ signed-in drawer.
 *   behindScroll, behindScrollOffset   the embedded screen's own scroll / scrollOffset (a number of pt, or "@<that
 *               screen's data-pop id>"), e.g. { behindScroll: "@section-legal" } for Settings further down.
 *               spec.scroll on the drawer itself is a no-op: the drawer does not scroll.
 *   selected    the highlighted row id (default: the row of the screen behind; "more" for settings)
 *   signedIn    false: the Guest header (person_outline on accent 14% / 24%), no sync button, no Edit profile, "Sign in"
 *   pro         false: the grey "Free" badge, the Upgrade pill under the header, and the sync button's cloud_outlined
 *   syncState   "idle" (default) | "syncing" (refresh, accent) | "error" (cloud_off, error) | "awaitingSetup" (cloud_sync, amber)
 *   newBadge    true: the NEW label beside Shared budget (hasSeenSharedBudget false)
 *
 * data-pop anchors
 *   drawer-panel        the whole drawer sheet (304 × 956, radius 16 on the right corners only — BYBApp.layout reads the
 *                       top-left corner, so it reports radius 0; a pop-out of the whole sheet sets its own radius)
 *   drawer-scrim        the black54 scrim over the screen behind
 *   profile-row         the account row: avatar + name + BYB+ badge + sync button (16…288 × 78…130; the "sync" slide's pop-out)
 *   profile-avatar      the 52 MemberAvatar
 *   profile-name        the name text
 *   tier-badge          the BYB+ (or Free) badge
 *   upgrade-pill        the Upgrade pill (params.pro false only)
 *   sync-status         the 38 sync button (its icon shows the sync state)
 *   drawer-divider-top  the rule under the profile header · drawer-divider-bottom  the rule above Edit profile
 *   nav-list            the destinations list, tight: the ListView's 8 padding + the eight rows (0,147 304 × 432),
 *                       not the Expanded area below it
 *   nav-expenses · nav-budget · nav-shared-budget · nav-debt · nav-insights · nav-reports · nav-history · nav-more
 *                       each destination row (the 48-tall row inside its 8 × 2 margin; the selected one is the pill)
 *   new-badge           the NEW label (params.newBadge only)
 *   nav-edit-profile    Edit profile row · nav-sign-out  Sign out row (nav-sign-in when params.signedIn is false)
 *   app-version         the "Budget Your Budget  ·  v2.0.0" footer line
 *   (the embedded screen behind has its own anchors removed, so every id above is unique in the page)
 */
(function () {
  "use strict";

  const A = window.BYBApp;

  // Shell destinations in AppDrawer order; `screen` is the HTML screen that tab shows (for params.behind / selected).
  // The Shared Budget row sits right after Budget (_budgetTabIndex) and pushes a route, so it is never selected.
  const DESTINATIONS = [
    { id: "expenses", icon: "Icons.receipt_long_rounded", key: "navExpenses", screen: "expenses" },
    { id: "budget", icon: "Icons.calendar_month_rounded", key: "navBudget", screen: "budget" },
    { id: "shared-budget", icon: "Icons.groups_rounded", key: "sharedBudgetNavTitle", route: true },
    { id: "debt", icon: "Icons.trending_down_rounded", key: "navDebt" },
    { id: "insights", icon: "Icons.space_dashboard_rounded", key: "navDashboard", screen: "insights" },
    { id: "reports", icon: "Icons.assessment_rounded", key: "navReports" },
    { id: "history", icon: "Icons.history_rounded", key: "navHistory" },
    { id: "more", icon: "Icons.grid_view_rounded", key: "navMore", screen: "settings" },
  ];

  // The screen behind, as each HTML screen's own state names it (the tab at the top, as the shell keeps it).
  const BEHIND = {
    settings: { app: "settings" },
    budget: { app: "budget", state: "top" },
    expenses: { app: "expenses", state: "all" },
    insights: { app: "insights", state: "top" },
  };

  // _SyncButton: icon + colour by tier and SyncStatus.state
  const SYNC = {
    idle: ["Icons.refresh_rounded", "var(--ink-sub)"],
    syncing: ["Icons.refresh_rounded", "var(--primary)"],
    error: ["Icons.cloud_off_rounded", "var(--error)"],
    awaitingSetup: ["Icons.cloud_sync_rounded", "var(--amber)"],
  };

  // LOCAL FALLBACK (requestedChanges: kit.text — the same helper settings.js carries): Inter's contextual case form.
  // Skia shapes the app's Inter with calt, so a "+" after a capital letter is plus.case, raised to the capitals'
  // middle (the capture's "BYB+": the plus spans 115–120.33 pt, the capitals 113.33–122). The bundled static Inter
  // has no case glyphs. Returns trusted HTML for kit.text(…, { html: true }).
  const LOCAL_CASE_PLUS = (kit, str) =>
    kit.esc(kit.skiaText(str)).replace(/(\p{Lu})\+/gu, '$1<span class="dr-case">+</span>');

  // The embedded screen, detached from this page's anchors: its data-pop ids are dropped after it is laid out (the
  // layout's "first one wins" would otherwise answer for them), and whatever it missed is reported against this
  // screen too. Its .app-scroll keeps its class, so the screen's own `.scr-<id> .app-scroll` rules still apply
  // (Expenses' 118 top padding, Budget's width); the drawer puts an empty, hidden .app-scroll first in its markup, so
  // the runtime's scroll lookup (the first .app-scroll in the root) lands on that and never moves the screen behind.
  // `extra` is merged over the BEHIND preset: the embedded screen's params, scroll and scrollOffset.
  function behindHtml(ctx, which, extra) {
    const base = BEHIND[which];
    if (!base || !A.screens[base.app] || typeof document === "undefined") return "";
    const spec = Object.assign({}, base, extra, { mode: ctx.mode, palette: ctx.palette, statusBar: false });
    if (ctx.spec && ctx.spec.data) spec.data = ctx.spec.data;
    const root = A.render(spec, ctx.lang);
    root.querySelectorAll("[data-pop]").forEach((e) => e.removeAttribute("data-pop"));
    root.classList.add("dr-behind-app");
    // LOCAL FALLBACK (requestedChanges: app.js ctx.embed / a ctx.missing(tag) hook). ctx only reaches this render's
    // sink through t() and d(), which file everything as "arb" / "demo". ARB and demo misses keep their key; any other
    // kind (render errors, fmt) goes in under a key that names the kind and the embedded screen, so it does not read
    // like an untranslated string. BYBApp.missing already holds the child's tag with its real kind.
    for (const tag of root._missing || []) {
      const parts = tag.split(" · ");
      const kind = parts[1];
      const key = parts.slice(2).join(" · ");
      if (kind === "arb") ctx.t(key);
      else if (kind === "demo") ctx.d(key);
      else ctx.t(`[${kind} error in the screen behind the drawer (${base.app})] ${key}`);
    }
    return root.outerHTML;
  }

  A.screen({
    id: "drawer",
    title: "Drawer",
    states: {
      "signed-in": {},
    },
    captures: {
      "signed-in": "05_drawer_signed_in",
    },

    render(ctx) {
      const { kit, t, d, data } = ctx;
      const p = ctx.params || {};
      const signedIn = p.signedIn !== false;
      const pro = p.pro !== false;
      // A free drawer never sits over the BYB+ Active hero (Expenses by default), and a free or signed-out one never
      // over a shared budget (the embedded Expenses drops its author lines).
      const behind = p.behind || (pro ? "settings" : "expenses");
      const behindExtra = {};
      if (behind === "expenses" && (!pro || !signedIn)) behindExtra.params = { authors: false };
      if (p.behindScroll != null) behindExtra.scroll = p.behindScroll;
      if (p.behindScrollOffset != null) behindExtra.scrollOffset = p.behindScrollOffset;
      const behindDest = DESTINATIONS.find((x) => x.screen === (BEHIND[behind] || {}).app);
      const selected = p.selected || (behindDest ? behindDest.id : "more");
      const ink = "var(--ink)";

      // ---- _ProfileHeader
      const me = (data.member && data.member[data.signedIn || "owner"]) || (data.members || [])[0] || {};
      const avatar = signedIn
        ? kit.avatar({ size: 52, src: me.avatar, tint: kit.memberTint(me.paletteIndex || 0), pop: "profile-avatar" })
        : `<div class="dr-guest" data-pop="profile-avatar">${ctx.icon("Icons.person_outline_rounded")}</div>`;
      const name = signedIn ? d(me.name || "ownerName") : t("drawerGuest");
      const tier =
        `<div class="dr-tier${pro ? "" : " dr-free"}" data-pop="tier-badge">` +
        kit.text(LOCAL_CASE_PLUS(kit, pro ? t("drawerTierPremium") : t("drawerTierFree")), { size: 11, weight: 700, ls: 0.3, color: "#FFFFFF", html: true }) +
        `</div>`;
      const [syncIcon, syncColor] = pro ? SYNC[p.syncState] || SYNC.idle : ["Icons.cloud_outlined", "var(--ink-sub)"];
      const sync = signedIn
        ? `<div class="dr-sync${pro && p.syncState === "syncing" ? " dr-spin" : ""}" data-pop="sync-status" style="color:${syncColor}">${ctx.icon(syncIcon)}</div>`
        : "";
      const header =
        `<div class="dr-head">` +
        `<div class="dr-profile" data-pop="profile-row">` +
        avatar +
        `<div class="dr-id">${kit.text(name, { size: 16, weight: 700, color: ink, lines: 1, pop: "profile-name", cls: "dr-name" })}${tier}</div>` +
        sync +
        `</div></div>`;

      // ---- _UpgradePill (free users only): 10 below the header, 16 in; padding 11 × 6, radius 14, star 14 · 5 · 12/w800 +0.2
      const upgrade = pro
        ? ""
        : `<div class="dr-upgrade-wrap"><div class="dr-upgrade" data-pop="upgrade-pill">${ctx.icon("Icons.star_rounded")}` +
          kit.text(t("profileHeroFreeCta"), { size: 12, weight: 800, ls: 0.2, color: "#FFFFFF" }) +
          `</div></div>`;

      // ---- _DrawerItem
      const item = (o) => {
        const cls = ["dr-item", o.selected ? "dr-on" : "", o.danger ? "dr-danger" : ""].filter(Boolean).join(" ");
        return (
          `<div class="${cls}" data-pop="${o.pop}">` +
          `<div class="dr-icon">${ctx.icon(o.icon)}</div>` +
          `<div class="dr-label">${kit.text(o.label, { size: 16, weight: o.selected ? 700 : 600, lines: 1 })}</div>` +
          (o.trailing || "") +
          `</div>`
        );
      };
      const newBadge = `<div class="dr-new" data-pop="new-badge">${kit.text(t("commonNewBadge"), { size: 11, weight: 800, ls: 0.6 })}</div>`;
      const list = DESTINATIONS.map((x) =>
        item({
          pop: `nav-${x.id}`,
          icon: x.icon,
          label: t(x.key),
          selected: !x.route && x.id === selected,
          trailing: x.id === "shared-budget" && p.newBadge ? newBadge : "",
        }),
      ).join("");

      const divider = (pop) => `<div class="dr-divider" data-pop="${pop}"></div>`;
      const bottom = signedIn
        ? item({ pop: "nav-edit-profile", icon: "Icons.badge_outlined", label: t("editProfileNavTitle") }) +
          item({ pop: "nav-sign-out", icon: "Icons.logout_rounded", label: t("syncSignOut"), danger: true })
        : item({ pop: "nav-sign-in", icon: "Icons.login_rounded", label: t("drawerSignIn") });

      const app = data.app || { version: "2.0.0" };
      const footer =
        `<div class="dr-footer">` +
        kit.text(`${t("appTitle")}  ·  v${app.version}`, { size: 11, weight: 500, pop: "app-version", cls: "dr-footer-text" }) +
        `</div>`;

      const panel =
        `<div class="dr-panel" data-pop="drawer-panel">` +
        header +
        upgrade +
        `<div class="dr-gap"></div>` +
        divider("drawer-divider-top") +
        `<div class="dr-list"><div class="dr-rows" data-pop="nav-list">${list}</div></div>` +
        divider("drawer-divider-bottom") +
        bottom +
        footer +
        `</div>`;

      return (
        `<div class="app-scroll dr-scroll-stub"></div>` +
        `<div class="dr-behind" aria-hidden="true">${behind === "none" ? "" : behindHtml(ctx, behind, behindExtra)}</div>` +
        `<div class="dr-scrim" data-pop="drawer-scrim"></div>` +
        panel
      );
    },
  });
})();
