/* Reports → two report screens, recreated from the Flutter widgets:
 *
 *   reports-compare   Last vs Current Month      lib/ui/widgets/Reports/Views/compare_month_view.dart
 *                                                (+ Charts/compare_month_chart.dart, Lists/compare_month_total_list.dart)
 *   reports-month     Current Month Expenses     lib/ui/widgets/Reports/Views/current_month_view.dart
 *                                                (+ Data/current_month_data.dart)
 *   shared            ReportSectionCard, ReportInsightsSection, ExportButtonsRow   Components/report_components.dart
 *
 * Both are a Scaffold with buildModernAppBar (✕ + title, 62 + 56 pt) over a SingleChildScrollView (padding 16 × 12).
 * The body is clipped at the app bar's bottom (y 118), as the scroll view clips in Flutter; the app bar is opaque.
 *
 * States
 *   reports-compare · compare   top of the screen                              raw/<lang>/04_reports_compare
 *   reports-month   · top       top of the screen                              raw/en/04_reports_current_month
 *   reports-month   · export    scrolled to the end (Export Your Report)       raw/<lang>/04_reports_export
 *
 * data-pop anchors — reports-compare
 *   app-bar            the ✕ + "Last vs Current Month" toolbar (the 56pt bar under the status bar: 0,62,440,56)
 *   header-card        the whole header card (title, subtitle, month pills, summary)
 *   month-pills        the "Aug 2026 → Sep 2026" pill row (at its content width)
 *   summary-card       the green "📉 Great job! You spent … less than last month. −36.1%" badge
 *   kpi-cards          the row of the two month tiles
 *   month-prev         the "Aug 2026 · $3,709.84" tile
 *   month-current      the "Sep 2026 · $2,370.36" tile with the Current badge
 *   chart              the "Compare by category" section card
 *   chart-bars         the chart card inside it (bars, value badges, summary sentence)
 *   chart-summary      the "In Sep 2026, you spent …" sentence under the bars
 *   category-lists     the card with both "<month> by category" lists
 *   list-current       the current month's list (with the list's 34pt bottom inset, see totalsList)
 *   list-previous      the previous month's list (same)
 *   insights           the "💡 Insights" card
 *   insight-top-change the "📊/🎯 <category> saw the biggest increase/decrease" line
 *   insight-categories the "You spent in N more/fewer categories" line
 *   export-card        the "Export Your Comparison" card
 *   export-pdf         its Export PDF button
 *   export-excel       its Export Excel button
 *   empty-state        the centred "No expenses for these months." (only when both months are empty)
 *
 * data-pop anchors — reports-month
 *   app-bar            the ✕ + "September 2026 / Current Month Expenses" toolbar (0,62,440,56)
 *   month-header       the "This month you've spent $2,370.36" card
 *   month-total        the greeting, amount and month pill (at their content width, inside the Expanded column)
 *   days-ring          the "15 days" progress ring
 *   month-tip          the "💡 Nice! Your spending is down …" tip
 *   kpi-grid           the four metric tiles
 *   kpi-total-spent · kpi-daily-average · kpi-top-category · kpi-transactions   one tile each
 *   category-breakdown the "Category Breakdown" card
 *   category-donut     its donut chart (the 170 × 170 square of the pie)
 *   category-list      the rows under the donut
 *   category-<id>      one row (category-housing, category-utilities …; ids from app/data.js)
 *   insights           the "💡 Insights" card
 *   insight-top-category · insight-week · insight-projected · insight-tracking   one insight line each
 *   export-card        the "Export Your Report" card (title, subtitle, both buttons)
 *   export-pdf         its Export PDF button
 *   export-excel       its Export Excel button
 *   empty-state        ReportEmptyState "📊 No expenses yet…" (only when the month has no expense)
 *
 * LOCAL FALLBACKS (listed as requested changes, to move into the shared kit):
 *   caseForms()        Inter's calt .case glyphs: a "-" / "+" before a figure is raised in the app ("-36.1%")
 *   emojiLine()        the taller line + lower baseline of a Text whose first run is a colour emoji
 *   reports.css        per-size emoji offsets (.rp-emoji-ios, the 32pt emojiTextStyle, 17pt metric tiles) and
 *                      1 raw px text nudges (Current badge, ring labels, w800 app-bar titles)
 */
(function () {
  "use strict";

  const A = window.BYBApp;

  // ------------------------------------------------------------------ text helpers

  // A Text whose string starts with an emoji and a space ("📉 Great job!…", "💡 Insights"): the emoji gets iOS's
  // wider emoji box (kit.emoji), the rest is plain text.
  const LEAD_EMOJI = /^(\p{Extended_Pictographic}\uFE0F?(?:\u200D\p{Extended_Pictographic}\uFE0F?)*)(?=\s)/u;
  function text(ctx, str, o) {
    const K = ctx.kit;
    o = o || {};
    const m = LEAD_EMOJI.exec(String(str));
    if (!m) return K.text(str, o);
    const size = o.size || 14;
    // kit.emoji's box (+0.046em before, +0.245em after), refitted on these captures: the glyph 1 raw px left and
    // down, and the text after it per size (13: 04_reports_export insights, 14: the compare badge, 15: "💡 Insights")
    const after = { 13: -0.83, 14: 0, 15: -0.33 }[size] || 0;
    const box = `margin-left:calc(0.046em - 0.33px);margin-right:calc(0.245em + ${(0.33 + after).toFixed(2)}px);translate:0 0.33px`;
    const html = K.emoji(m[1], { style: box }) + K.esc(K.skiaText(String(str).slice(m[1].length)));
    const fix = emojiLine(size, o.lh || 1.5);
    const style = [o.style, fix.dh ? `padding-top:${fix.dh}px` : "", fix.db !== fix.dh ? `translate:0 ${fix.db - fix.dh}px` : ""]
      .filter(Boolean).join(";");
    return K.text(html, Object.assign({}, o, { html: true, style }));
  }

  // LOCAL (candidate for kit.js): the line an emoji sits on. SkParagraph takes each run's own metrics with the
  // height's leading split evenly: Inter (ascent 0.96875, descent 0.24148) and, for the emoji fallback run, CoreText's
  // Apple Color Emoji (ascent 1.25, descent 0.390625 — CTFontGetAscent / GetDescent). The line's ascent is the larger
  // of the two, its height round(ascent + descent), its baseline round(ascent). At 13/1.4 and 14/1.5 that line is 1pt
  // taller than an Inter-only line and its glyphs sit 1pt lower; at 15/1.5 only the glyphs move (fitted on
  // 04_reports_compare's summary badge and 04_reports_export's insights). { dh, db } in pt: extra height, baseline shift.
  function emojiLine(size, lh) {
    const L = size * lh;
    const ai = (L + size * (0.96875 - 0.241477)) / 2;
    const ae = (L + size * (1.25 - 0.390625)) / 2;
    const asc = Math.max(ai, ae);
    const desc = Math.max(L - ai, L - ae);
    return { dh: Math.round(asc + desc) - Math.round(L), db: Math.round(asc) - Math.round(ai) };
  }

  // LOCAL FALLBACK (requestedChanges: kit.text): Inter's contextual case forms. The app's Inter (GoogleFonts, downloaded
  // at runtime) shapes with calt, which swaps a "-" or "+" before a figure for its raised .case glyph; the bundled static
  // Inter has no case glyphs, so the raise is drawn here (class rp-case-minus / rp-case-plus in reports.css). Fitted on
  // 04_reports_compare's "-36.1%" (4 raw px at 24pt, en + es-419); the "+" raise is settings.css's st-case.
  // Returns trusted HTML for kit.text(…, { html: true }).
  const caseForms = (K, str) =>
    K.esc(K.skiaText(str)).replace(/([-+])(?=\d)/g, (c) => `<span class="rp-case-${c === "-" ? "minus" : "plus"}">${c}</span>`);

  const money = (ctx, n) => ctx.fmt.money(n, { intl: true }); // NumberFormat.simpleCurrency(USD, en_US)
  const monthDate = (ym) => `${ym}-01`;

  // ------------------------------------------------------------------ shared report components

  // ReportSectionCard: card fill, 1px border, radius 20, black 4% blur 8 (0, 2), 12 below; optional title 15/700
  // + 2 + subtitle 12/500 (padding 16 14 16 0), then the child in `pad` (16).
  function sectionCard(ctx, inner, o) {
    o = o || {};
    const head =
      o.title != null || o.subtitle != null
        ? `<div class="rp-sec-head">` +
          (o.title != null ? text(ctx, o.title, { size: 15, weight: 700, cls: "rp-ink" }) : "") +
          (o.subtitle != null ? `<div class="rp-gap2"></div>` + text(ctx, o.subtitle, { size: 12, weight: 500, cls: "rp-sub" }) : "") +
          `</div>`
        : "";
    return `<div class="rp-sec"${o.pop ? ` data-pop="${o.pop}"` : ""}>${head}` +
      `<div class="rp-sec-body"${o.pad ? ` style="padding:${o.pad}"` : ""}>${inner}</div></div>`;
  }

  // ReportInsightsSection: title + "Based on your spending patterns", padding 16 10 16 14; ReportInsight rows:
  // 4 above and below, lightbulb_outline_rounded 18 accent, 10, text 13/500 height 1.4
  function insightsCard(ctx, title, items) {
    if (!items.length) return "";
    const rows = items
      .map((it) =>
        `<div class="rp-insight" data-pop="${it.pop}">${ctx.icon("Icons.lightbulb_outline_rounded", "rp-insight-ic")}` +
        text(ctx, it.text, { size: 13, weight: 500, lh: 1.4, cls: "rp-ink rp-insight-text" }) +
        `</div>`)
      .join("");
    return sectionCard(ctx, rows, { title, subtitle: ctx.t("reportsCommonInsightsSubtitle"), pad: "10px 16px 14px", pop: "insights" });
  }

  // ExportButtonsRow: two _ExportButton 10 apart. Material(exportSurface, radius 14) + 1px exportBorder, padding
  // 14 × 16, centred Row: Text(emoji, fontSize 18) + 8 + label 14/700 accent
  function exportCard(ctx, title, subtitle) {
    const K = ctx.kit;
    const btn = (emoji, label, pop) =>
      `<div class="rp-export-btn" data-pop="${pop}">` +
      `<span class="rp-export-emoji">${K.emojiSpan(emoji, 18, 1.5)}</span>` +
      text(ctx, label, { size: 14, weight: 700, cls: "rp-accent rp-export-label", lines: 1 }) +
      `</div>`;
    const row = `<div class="rp-export-row">${btn("📄", ctx.t("reportsCommonExportPdf"), "export-pdf")}${btn("📊", ctx.t("reportsCommonExportExcel"), "export-excel")}</div>`;
    return sectionCard(ctx, row, { title, subtitle, pop: "export-card" });
  }

  // Scaffold: the opaque app bar over a body viewport clipped at y 118 (the app-bar anchor is on the 56pt toolbar
  // inside, via K.appBar's pop, as on the other screens)
  function frame(ctx, bar, body) {
    return `<div class="rp-bar">${bar}</div>` +
      `<div class="rp-viewport"><div class="app-scroll rp-scroll">${body}</div></div>`;
  }

  // A body with nothing to scroll: `inner` centred in the viewport (Center)
  function centered(ctx, bar, inner) {
    return `<div class="rp-bar">${bar}</div>` +
      `<div class="rp-viewport"><div class="app-scroll rp-center">${inner}</div></div>`;
  }

  // ReportEmptyState: Padding 32 × 48, emoji Text 48, 16, title 18/800 centred, 8, body 14/500 subText centred
  function emptyState(ctx, emoji, title, body) {
    const K = ctx.kit;
    return `<div class="rp-empty" data-pop="empty-state">` +
      `<div class="rp-empty-emoji">${K.emojiSpan(emoji, 48, 1.5)}</div>` +
      `<div class="rp-gap16"></div>` +
      K.text(title, { size: 18, weight: 800, align: "center", cls: "rp-ink" }) +
      `<div class="rp-gap8"></div>` +
      K.text(body, { size: 14, weight: 500, align: "center", cls: "rp-sub" }) +
      `</div>`;
  }

  // ================================================================== Last vs Current Month

  function compareModel(ctx) {
    const D = ctx.data;
    const c = D.compare;
    const totals = (ym) =>
      D.categories
        .map((cat) => ({ cat, amount: D.byMonth[ym].byCategory[cat.id] || 0 }))
        .filter((r) => r.amount > 0);
    const previous = totals(c.from);
    const current = totals(c.to);
    const sum = (rows) => rows.reduce((s, r) => s + r.amount, 0);
    const totalPrev = sum(previous);
    const totalCurr = sum(current);
    const label = (ym) => ctx.fmt.date(monthDate(ym), "yMMM");
    const sentence = (ym) => ctx.fmt.date(monthDate(ym), "yMMM", { case: "sentence" });
    return {
      previous, current, totalPrev, totalCurr,
      spentLess: totalCurr < totalPrev,
      spentMore: totalCurr > totalPrev,
      prevLabel: label(c.from), currLabel: label(c.to),
      prevPill: sentence(c.from), currPill: sentence(c.to),
    };
  }

  function compareHeader(ctx, m) {
    const K = ctx.kit;
    const diff = Math.abs(m.totalCurr - m.totalPrev);
    const pct = m.totalPrev > 0 ? ((m.totalCurr - m.totalPrev) / m.totalPrev) * 100 : 0;
    const tone = m.spentLess ? "good" : "bad";
    const insight = m.spentLess
      ? ctx.t("compareMonthsInsightSpentLess", { amount: money(ctx, diff) })
      : m.spentMore
        ? ctx.t("compareMonthsInsightSpentMore", { amount: money(ctx, diff) })
        : ctx.t("compareMonthsInsightSameSpending");
    const pill = (label, highlight) =>
      `<div class="rp-pill${highlight ? ` rp-pill-on rp-pill-${m.spentLess ? "good" : "accent"}` : ""}">` +
      K.text(label, { size: 12, weight: 700 }) + `</div>`;
    return sectionCard(ctx,
      `<div class="rp-hdr-title">${ctx.icon("Icons.compare_arrows_rounded", "rp-hdr-ic")}` +
      K.text(ctx.t("compareMonthsTitle"), { size: 18, weight: 800, cls: "rp-ink rp-flex1" }) + `</div>` +
      `<div class="rp-gap8"></div>` +
      K.text(ctx.t("compareMonthsSubtitle"), { size: 13, weight: 500, cls: "rp-sub" }) +
      `<div class="rp-gap16"></div>` +
      `<div class="rp-pills" data-pop="month-pills">${pill(m.prevPill, false)}${ctx.icon("Icons.arrow_forward_rounded", "rp-pill-arrow")}${pill(m.currPill, true)}</div>` +
      `<div class="rp-gap16"></div>` +
      `<div class="rp-status rp-tone-${tone}" data-pop="summary-card">` +
      `<div class="rp-status-dot">${ctx.icon(m.spentLess ? "Icons.trending_down_rounded" : "Icons.trending_up_rounded")}</div>` +
      `<div class="rp-status-col">` +
      text(ctx, insight, { size: 14, weight: 600 }) +
      (Math.abs(pct) > 0.1 ? `<div class="rp-gap4"></div>` + K.text(caseForms(K, ctx.fmt.percent(pct, 1, { signed: true })), { size: 24, weight: 900, html: true }) : "") +
      `</div>` +
      `<div class="rp-status-emoji">${K.emojiSpan(m.spentLess ? "📉" : "📈", 32, 1.1, true)}</div>` +
      `</div>`,
      { pop: "header-card" });
  }

  // _KPICard: padding 14, radius 16, 1px border, black 4% blur 8 (light); 34 icon square (8 padding, radius 10),
  // Current badge (8 × 4, 10/700 white); 12; label 12/600 subText one line; 4; value 18/900
  function kpiCard(ctx, o) {
    const K = ctx.kit;
    return `<div class="rp-kpi${o.highlighted ? " rp-kpi-on" : ""}" data-pop="${o.pop}" style="--rp-c:${o.color}">` +
      `<div class="rp-kpi-top"><div class="rp-kpi-ic">${ctx.icon(o.icon)}</div>` +
      (o.highlighted ? `<div class="rp-kpi-badge">${K.text(ctx.t("compareMonthsCurrentBadge"), { size: 10, weight: 700 })}</div>` : "") +
      `</div>` +
      `<div class="rp-gap12"></div>` +
      K.text(o.label, { size: 12, weight: 600, lines: 1, cls: "rp-sub" }) +
      `<div class="rp-gap4"></div>` +
      K.text(o.value, { size: 18, weight: 900, cls: "rp-kpi-value" }) +
      `</div>`;
  }

  // CompareMonthChart inside SizedBox(330): cardDecoration, padding 18; a 210-tall Stack (BarChart with a 44 left
  // axis and a 32 bottom axis, value badges on top), 8, the summary sentence.
  function compareChart(ctx, m) {
    const K = ctx.kit;
    const W = 336; // 440 − 16·2 (page) − 1·2 − 16·2 (section) − 1·2 − 18·2 (chart card)
    const H = 210;
    const leftW = 44, bottomH = 32;
    const pw = W - leftW, ph = H - bottomH;
    const maxVal = Math.max(m.totalPrev, m.totalCurr, 0);
    const safeMax = maxVal > 0 ? maxVal : 1;
    const yMax = safeMax * 1.18;
    const gridStep = safeMax <= 100 ? 20 : safeMax <= 500 ? 100 : safeMax <= 1000 ? 200 : safeMax <= 5000 ? 1000 : safeMax / 5;
    const y = (v) => ph - (v / yMax) * ph;
    const tone = m.spentLess ? "good" : m.spentMore ? "bad" : "equal";

    // bars: spaceEvenly, 28 wide, radius 12 (fl_chart keeps a rod at least 24 tall)
    const barW = 28;
    const each = (pw - barW * 2) / 3;
    const xs = [each + barW / 2, each * 2 + barW * 1.5];
    const rod = (i, v, grad) => {
      if (!(v > 0)) return "";
      const bottom = y(0);
      const top = Math.min(y(v), bottom - 24);
      return `<rect x="${leftW + xs[i] - barW / 2}" y="${top.toFixed(3)}" width="${barW}" height="${(bottom - top).toFixed(3)}" rx="12" ry="12" fill="url(#${grad})"/>`;
    };
    // dashed grid (6 on, 4 off, 1pt) at every step strictly inside 0…max
    let grid = "";
    for (let v = gridStep; v < yMax - gridStep / 100000; v += gridStep) {
      grid += `<line x1="${leftW}" x2="${W}" y1="${y(v).toFixed(3)}" y2="${y(v).toFixed(3)}"/>`;
    }
    const svg =
      `<svg class="rp-cmp-svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">` +
      `<defs>` +
      `<linearGradient id="rpPrev" x1="0" y1="0" x2="0" y2="1"><stop offset="0" class="rp-g-prev" stop-opacity=".85"/><stop offset="1" class="rp-g-prev" stop-opacity=".65"/></linearGradient>` +
      `<linearGradient id="rpCurr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" class="rp-g-${tone}" stop-opacity=".95"/><stop offset="1" class="rp-g-${tone}" stop-opacity=".75"/></linearGradient>` +
      `</defs>` +
      `<g class="rp-grid" stroke-width="1" stroke-dasharray="6 4">${grid}</g>` +
      rod(0, m.totalPrev, "rpPrev") + rod(1, m.totalCurr, "rpCurr") +
      `</svg>`;

    // left axis: efficient interval for 178 pt (40 pt per label), labels at every step from 0 plus the max,
    // each left-aligned in the 38-wide slot and centred on its value
    const allowed = Math.max(Math.floor(ph / 40), 1);
    const accurate = yMax / allowed;
    const interval = allowed <= 2 ? accurate : roundInterval(accurate);
    const values = [];
    for (let v = 0; v <= yMax + interval / 100000; v += interval) values.push(v);
    if (values[values.length - 1] !== yMax) values.push(yMax);
    const axis = values
      .map((v) => `<div class="rp-axis-y" style="top:${y(v).toFixed(3)}px">${K.text(ctx.fmt.compact(v), { size: 11, weight: 600 })}</div>`)
      .join("");
    const bottomLabels = [m.prevPill, m.currPill]
      .map((l, i) => `<div class="rp-axis-x" style="left:${(leftW + xs[i]).toFixed(3)}px;top:${ph + 6}px">${K.text(l, { size: 12.5, weight: 800 })}</div>`)
      .join("");
    const badges =
      `<div class="rp-badges">` +
      `<div class="rp-vbadge rp-vbadge-prev">${K.text(money(ctx, m.totalPrev), { size: 12.5, weight: 900 })}</div>` +
      `<div class="rp-vbadge rp-vbadge-${tone}">${K.text(money(ctx, m.totalCurr), { size: 12.5, weight: 900 })}</div>` +
      `</div>`;

    const delta = m.totalCurr - m.totalPrev;
    const args = { current: m.currLabel, amount: money(ctx, m.totalCurr), delta: money(ctx, Math.abs(delta)), previous: m.prevLabel };
    const sum = delta < 0
      ? { icon: "Icons.trending_down_rounded", cls: "less", str: ctx.t("reportsCompareSummaryLess", args) }
      : delta > 0
        ? { icon: "Icons.trending_up_rounded", cls: "more", str: ctx.t("reportsCompareSummaryMore", args) }
        : { icon: "Icons.remove_rounded", cls: "same", str: ctx.t("reportsCompareSummarySame", args) };
    const summary =
      `<div class="rp-cmp-sum rp-sum-${sum.cls}" data-pop="chart-summary">${ctx.icon(sum.icon, "rp-cmp-sum-ic")}` +
      K.text(sum.str, { size: 15.5, weight: 700, cls: "rp-cmp-sum-text" }) + `</div>`;

    const card = K.card(
      `<div class="rp-cmp-stack">${svg}${axis}${bottomLabels}${badges}</div><div class="rp-gap8"></div>${summary}`,
      { pad: "18px", pop: "chart-bars", cls: "rp-cmp-card" });
    return sectionCard(ctx, card, { title: ctx.t("compareMonthsCompareByCategory"), pop: "chart" });
  }

  // fl_chart Utils.roundInterval (≥ 1)
  function roundInterval(input) {
    if (input < 1) return input;
    const decimals = String(Math.trunc(input)).length - 1;
    let v = input / Math.pow(10, decimals);
    const scaled = v >= 10 ? Math.round(v) / 10 : v;
    const p = Math.pow(10, decimals);
    return scaled >= 7.6 ? 10 * p : scaled >= 2.6 ? 5 * p : scaled >= 1.6 ? 2 * p : p;
  }

  // CompareMonthTotalsList: title 16/800 one line + "Total: $…" chip (10 × 6, 12/700); 10; rows 10 above and below,
  // CircleAvatar r 18 in the category colour with the emoji 18, 12, name 15/600, amount 15/700 @ 90%; black12 dividers.
  // The rows are a ListView.separated(shrinkWrap) with padding null: BoxScrollView then pads with MediaQuery.padding,
  // and the Scaffold body (app bar, no bottomNavigationBar) keeps the 34pt home-indicator inset at the bottom, so each
  // list ends in 34pt of blank space (.rp-list padding-bottom). The empty branch is a plain Text, without it.
  function totalsList(ctx, title, rows, pop) {
    const K = ctx.kit;
    const sorted = [...rows].sort((a, b) => b.amount - a.amount);
    if (!sorted.length) {
      return `<div data-pop="${pop}">${K.text(`${title}\n${ctx.t("reportsCurrentMonthListEmpty")}`, { cls: "rp-list-empty" })}</div>`;
    }
    const total = sorted.reduce((s, r) => s + r.amount, 0);
    const items = sorted
      .map((r, i) =>
        (i ? `<div class="rp-list-div"></div>` : "") +
        `<div class="rp-list-row">` +
        K.emojiBadge(r.cat.emoji, r.cat.color, { size: 36, circle: true, emojiSize: 18, emojiHeight: 1.5, cls: "rp-emoji-ios" }) +
        K.text(ctx.t(r.cat.name), { size: 15, weight: 600, lines: 1, cls: "rp-list-name" }) +
        K.text(money(ctx, r.amount), { size: 15, weight: 700, cls: "rp-list-amount" }) +
        `</div>`)
      .join("");
    return `<div class="rp-list" data-pop="${pop}">` +
      `<div class="rp-list-head">${K.text(title, { size: 16, weight: 800, lines: 1, cls: "rp-list-title" })}` +
      `<div class="rp-list-chip">${K.text(`${ctx.t("reportsCurrentMonthListTotal")}: ${money(ctx, total)}`, { size: 12, weight: 700 })}</div></div>` +
      `<div class="rp-gap10"></div>${items}</div>`;
  }

  function compareInsights(ctx, m) {
    const items = [];
    let biggest = null, biggestDiff = 0, biggestUp = true;
    const prev = Object.fromEntries(m.previous.map((r) => [r.cat.id, r]));
    const curr = Object.fromEntries(m.current.map((r) => [r.cat.id, r]));
    const ids = [...new Set([...m.previous.map((r) => r.cat.id), ...m.current.map((r) => r.cat.id)])];
    for (const id of ids) {
      const p = prev[id] ? prev[id].amount : 0;
      const c = curr[id] ? curr[id].amount : 0;
      const d = Math.abs(c - p);
      if (d > biggestDiff) { biggestDiff = d; biggest = ctx.data.category[id]; biggestUp = c > p; }
    }
    if (biggest && biggestDiff > 0) {
      const args = { category: `${biggest.emoji} ${ctx.t(biggest.name)}`, amount: money(ctx, biggestDiff) };
      items.push({ pop: "insight-top-change", text: ctx.t(biggestUp ? "compareMonthsInsightTopIncrease" : "compareMonthsInsightTopDecrease", args) });
    }
    if (m.current.length > m.previous.length) items.push({ pop: "insight-categories", text: ctx.t("compareMonthsInsightMoreCategories", { count: String(m.current.length - m.previous.length) }) });
    else if (m.current.length < m.previous.length) items.push({ pop: "insight-categories", text: ctx.t("compareMonthsInsightFewerCategories", { count: String(m.previous.length - m.current.length) }) });
    return insightsCard(ctx, ctx.t("compareMonthsInsightsTitle"), items);
  }

  A.screen({
    id: "reports-compare",
    title: "Reports · Last vs Current Month",
    states: { compare: {} },
    captures: { compare: "04_reports_compare" },
    render(ctx) {
      const K = ctx.kit;
      const m = compareModel(ctx);
      const bar = K.appBar({ safe: true, pop: "app-bar", leading: K.closeButton(), titleText: ctx.t("compareMonthsTitle"), titleStyle: { size: 20, weight: 800 } });
      // both months empty: Center(Text(compareMonthsNoExpenses)) in the theme's 14
      if (!m.previous.length && !m.current.length) {
        return centered(ctx, bar, K.text(ctx.t("compareMonthsNoExpenses"), { cls: "rp-ink", pop: "empty-state" }));
      }
      const kpis =
        `<div class="rp-kpis" data-pop="kpi-cards">` +
        kpiCard(ctx, { pop: "month-prev", label: m.prevPill, value: money(ctx, m.totalPrev), icon: "Icons.calendar_month_rounded", color: "var(--fab)" }) +
        kpiCard(ctx, {
          pop: "month-current", label: m.currPill, value: money(ctx, m.totalCurr), highlighted: true,
          icon: m.spentLess ? "Icons.trending_down_rounded" : "Icons.trending_up_rounded",
          color: m.spentLess ? "var(--green)" : "var(--red)",
        }) +
        `</div>`;
      const lists = sectionCard(ctx,
        totalsList(ctx, ctx.t("reportsCurrentMonthListHeaderByCategory", { title: m.currLabel }), m.current, "list-current") +
        `<div class="rp-lists-div"></div>` +
        totalsList(ctx, ctx.t("reportsCurrentMonthListHeaderByCategory", { title: m.prevLabel }), m.previous, "list-previous"),
        { pop: "category-lists" });
      const insights = compareInsights(ctx, m);
      const body =
        compareHeader(ctx, m) + `<div class="rp-gap16"></div>` +
        kpis + `<div class="rp-gap16"></div>` +
        compareChart(ctx, m) + `<div class="rp-gap16"></div>` +
        lists + `<div class="rp-gap16"></div>` +
        (insights ? insights + `<div class="rp-gap16"></div>` : `<div class="rp-gap16"></div>`) +
        exportCard(ctx, ctx.t("compareMonthsExportTitle"), ctx.t("compareMonthsExportSubtitle")) +
        `<div class="rp-gap24"></div>`;
      return frame(ctx, bar, body);
    },
  });

  // ================================================================== Current Month Expenses

  function monthHeader(ctx, cm, monthLabel) {
    const K = ctx.kit;
    const progress = cm.daysInMonth > 0 ? Math.min(Math.max(cm.daysElapsed / cm.daysInMonth, 0), 1) : 0;
    // CircularProgressIndicator 65 × 65 in a 70 box: stroke 6 centred on r 32.5, track subText @ 15%, round cap
    const r = 32.5, c = 35, circ = 2 * Math.PI * r;
    const sweep = progress * (2 * Math.PI - 0.001);
    const arc = sweep > 0
      ? `<circle cx="${c}" cy="${c}" r="${r}" fill="none" class="rp-ring-arc" stroke-width="6" stroke-linecap="round" stroke-dasharray="${(sweep * r).toFixed(3)} ${circ.toFixed(3)}" transform="rotate(-90 ${c} ${c})"/>`
      : "";
    const ring =
      `<div class="rp-ring" data-pop="days-ring"><svg width="70" height="70" viewBox="0 0 70 70">` +
      `<circle cx="${c}" cy="${c}" r="${r}" fill="none" class="rp-ring-track" stroke-width="6"/>${arc}</svg>` +
      `<div class="rp-ring-hole">${K.text(String(cm.daysElapsed), { size: 18, weight: 900, cls: "rp-accent" })}` +
      K.text(ctx.t("reportsCurrentMonthDays"), { size: 10, weight: 600, cls: "rp-sub" }) + `</div></div>`;

    let tip;
    if (cm.count < 3) tip = ctx.t("reportsCurrentMonthSubtitleFewTransactions");
    else if (cm.weekOverWeek > 20) tip = ctx.t("reportsCurrentMonthSubtitleSpendingUp", { percent: ctx.fmt.percent(Math.abs(cm.weekOverWeek)) });
    else if (cm.weekOverWeek < -20) tip = ctx.t("reportsCurrentMonthSubtitleSpendingDown", { percent: ctx.fmt.percent(Math.abs(cm.weekOverWeek)) });
    else tip = ctx.t("reportsCurrentMonthSubtitleOnTrack");

    return sectionCard(ctx,
      `<div class="rp-mh-row"><div class="rp-mh-col"><div class="rp-mh-ink" data-pop="month-total">` +
      K.text(ctx.t("reportsCurrentMonthHeaderGreeting"), { size: 14, weight: 500, cls: "rp-sub" }) +
      `<div class="rp-gap4"></div>` +
      K.text(money(ctx, cm.total), { size: 32, weight: 900, cls: "rp-ink" }) +
      `<div class="rp-gap4"></div>` +
      `<div class="rp-mh-pill">${K.text(monthLabel, { size: 12, weight: 700 })}</div>` +
      `</div></div>${ring}</div>` +
      `<div class="rp-gap16"></div>` +
      `<div class="rp-tip" data-pop="month-tip"><div class="rp-tip-emoji">${K.emojiSpan("💡", 18, 1.1, true)}</div>` +
      K.text(tip, { size: 13, weight: 500, lh: 1.4, cls: "rp-ink rp-flex1" }) + `</div>`,
      { pop: "month-header" });
  }

  // ReportMetricTile: padding 14, radius 12, border, black 4% blur 8; 34 square (iconBackground, radius 8, emoji 17),
  // 10, label 12/500 subText one line; 8; value 20/800
  function metricTile(ctx, o) {
    const K = ctx.kit;
    return `<div class="rp-metric" data-pop="${o.pop}"><div class="rp-metric-top">` +
      K.emojiBadge(o.emoji, "var(--icon-bg)", { size: 34, radius: 8, emojiSize: 17, emojiHeight: 1.5, cls: "rp-emoji-ios" }) +
      K.text(o.label, { size: 12, weight: 500, lines: 1, cls: "rp-sub rp-metric-label" }) +
      `</div><div class="rp-gap8"></div>` +
      K.text(o.value, { size: 20, weight: 800, cls: "rp-ink" }) + `</div>`;
  }

  // PieChart: 180 tall, centre space 40, sections 45 thick from 3 o'clock clockwise, 2pt gaps cut on each side of
  // every boundary line (fl_chart createRectPathAroundLine: ±1 across, +0.5 past both ends). Drawn in the 374 × 180
  // chart's coordinates, but the SVG is only the pie's 170 × 170 square (viewBox cropped, centred in the box), so the
  // category-donut anchor hugs the pie.
  function donut(ctx, rows, total) {
    const W = 374, H = 180, cx = W / 2, cy = H / 2, r0 = 40, r1 = 85;
    const f = (n) => n.toFixed(3);
    const pt = (rad, a) => `${f(cx + rad * Math.cos(a))},${f(cy + rad * Math.sin(a))}`;
    let a = 0;
    let paths = "", cuts = "";
    const sum = rows.reduce((s, r) => s + r.amount, 0) || 1;
    for (const r of rows) {
      const deg = (360 * r.amount) / sum;
      if (deg >= 360) {
        paths += `<circle cx="${cx}" cy="${cy}" r="${(r0 + r1) / 2}" fill="none" stroke="${r.cat.color}" stroke-width="${r1 - r0}"/>`;
        break;
      }
      const s = (a * Math.PI) / 180, e = ((a + deg) * Math.PI) / 180;
      const large = deg > 180 ? 1 : 0;
      paths += `<path fill="${r.cat.color}" d="M${pt(r0, s)}L${pt(r1, s)}A${r1},${r1} 0 ${large} 1 ${pt(r1, e)}L${pt(r0, e)}A${r0},${r0} 0 ${large} 0 ${pt(r0, s)}Z"/>`;
      a += deg;
    }
    if (rows.length > 1) {
      let b = 0;
      for (const r of rows) {
        const th = (b * Math.PI) / 180;
        const dx = Math.cos(th), dy = Math.sin(th), nx = -dy, ny = dx;
        const p = (rad, side) => `${f(cx + dx * rad + nx * side)},${f(cy + dy * rad + ny * side)}`;
        cuts += `<path d="M${p(r0 - 0.5, -1)}L${p(r1 + 0.5, -1)}L${p(r1 + 0.5, 1)}L${p(r0 - 0.5, 1)}Z"/>`;
        b += (360 * r.amount) / sum;
      }
    }
    const side = 2 * r1;
    return `<svg class="rp-donut" data-pop="category-donut" width="${side}" height="${side}" viewBox="${cx - r1} ${cy - r1} ${side} ${side}">` +
      `<defs><mask id="rpDonutGaps" maskUnits="userSpaceOnUse" x="0" y="0" width="${W}" height="${H}">` +
      `<rect width="${W}" height="${H}" fill="#fff"/><g fill="#000">${cuts}</g></mask></defs>` +
      `<g mask="url(#rpDonutGaps)">${paths}</g></svg>`;
  }

  function categorySection(ctx, cm) {
    const K = ctx.kit;
    const rows = cm.byCategory.map((b) => ({ cat: ctx.data.category[b.category], amount: b.amount }));
    if (!rows.length) return "";
    const list = rows
      .map((r) => {
        const pct = ctx.fmt.percent(cm.total > 0 ? (r.amount / cm.total) * 100 : 0, 1);
        return `<div class="rp-cat-row" data-pop="category-${r.cat.id}">` +
          K.emojiBadge(r.cat.emoji, r.cat.color, { size: 36, radius: 8, emojiSize: 18, emojiHeight: 1.5, cls: "rp-emoji-ios" }) +
          `<div class="rp-cat-col">` +
          K.text(ctx.t(r.cat.name), { size: 14, weight: 600, lines: 1, cls: "rp-ink" }) +
          K.text(`${pct} ${ctx.t("reportsCurrentMonthOfTotal")}`, { size: 11, weight: 500, cls: "rp-sub" }) +
          `</div>` +
          K.text(money(ctx, r.amount), { size: 14, weight: 700, cls: "rp-ink rp-cat-amount" }) +
          `</div>`;
      })
      .join("");
    return sectionCard(ctx,
      `<div class="rp-donut-box">${donut(ctx, rows, cm.total)}</div>` +
      `<div class="rp-gap16"></div><div class="rp-cat-div"></div><div class="rp-gap12"></div>` +
      `<div class="rp-cat-list" data-pop="category-list">${list}</div>`,
      { title: ctx.t("reportsCurrentMonthCategoryTitle"), subtitle: ctx.t("reportsCurrentMonthCategorySubtitle"), pop: "category-breakdown" });
  }

  function monthInsights(ctx, cm) {
    const items = [];
    if (cm.count >= 3) {
      if (cm.top && cm.topPct >= 15) {
        const cat = ctx.data.category[cm.top];
        items.push({ pop: "insight-top-category", text: ctx.t("reportsCurrentMonthInsightTopCategory", { emoji: cat.emoji, category: ctx.t(cat.name), percent: ctx.fmt.percent(cm.topPct) }) });
      }
      if (cm.weekOverWeek > 20) items.push({ pop: "insight-week", text: ctx.t("reportsCurrentMonthInsightWeekUp", { percent: ctx.fmt.percent(cm.weekOverWeek) }) });
      else if (cm.weekOverWeek < -20) items.push({ pop: "insight-week", text: ctx.t("reportsCurrentMonthInsightWeekDown", { percent: ctx.fmt.percent(Math.abs(cm.weekOverWeek)) }) });
      if (cm.daysElapsed >= 7 && cm.projected > 0) items.push({ pop: "insight-projected", text: ctx.t("reportsCurrentMonthInsightProjected", { amount: money(ctx, cm.projected) }) });
      if (cm.count >= 20) items.push({ pop: "insight-tracking", text: ctx.t("reportsCurrentMonthInsightActiveTracking", { count: String(cm.count) }) });
    }
    return insightsCard(ctx, ctx.t("reportsCurrentMonthInsightsTitle"), items.slice(0, 4));
  }

  A.screen({
    id: "reports-month",
    title: "Reports · Current Month Expenses",
    states: {
      top: {},
      // scrolled to the end: the export card's top at y 728 (its bottom 80 above the screen's)
      export: { scroll: "@export-card", scrollOffset: -728 },
    },
    captures: { top: "04_reports_current_month", export: "04_reports_export" },
    render(ctx) {
      const K = ctx.kit;
      const cm = ctx.data.currentMonth;
      const monthLabel = ctx.fmt.date(ctx.data.now, "yMMMM");
      const title =
        `<div class="rp-month-title">` +
        K.text(monthLabel, { size: 13, weight: 600, lines: 1 }) +
        K.text(ctx.t("reportsCurrentMonthTitle"), { size: 18, weight: 800, lines: 1 }) +
        `</div>`;
      const bar = K.appBar({ safe: true, pop: "app-bar", leading: K.closeButton(), title, cls: "rp-bar-month" });
      // data.isEmpty (no expense this month): _buildEmptyState
      if (!cm.count) {
        return centered(ctx, bar, emptyState(ctx, "📊", ctx.t("reportsCurrentMonthEmptyTitle"), ctx.t("reportsCurrentMonthEmptyBody", { month: monthLabel })));
      }
      const kpis =
        `<div class="rp-metrics" data-pop="kpi-grid">` +
        `<div class="rp-metric-row">` +
        metricTile(ctx, { pop: "kpi-total-spent", label: ctx.t("reportsCurrentMonthKpiTotalSpent"), value: money(ctx, cm.total), emoji: "💰" }) +
        metricTile(ctx, { pop: "kpi-daily-average", label: ctx.t("reportsCurrentMonthKpiDailyAvg"), value: money(ctx, cm.dailyAverage), emoji: "📊" }) +
        `</div><div class="rp-gap12"></div><div class="rp-metric-row">` +
        metricTile(ctx, {
          pop: "kpi-top-category", label: ctx.t("reportsCurrentMonthKpiTopCategory"),
          value: cm.top ? ctx.t(ctx.data.category[cm.top].name) : "-",
          emoji: cm.top ? ctx.data.category[cm.top].emoji : "📦",
        }) +
        metricTile(ctx, { pop: "kpi-transactions", label: ctx.t("reportsCurrentMonthKpiTransactions"), value: String(cm.count), emoji: "🧾" }) +
        `</div></div>`;
      const body =
        monthHeader(ctx, cm, monthLabel) + `<div class="rp-gap16"></div>` +
        kpis + `<div class="rp-gap20"></div>` +
        categorySection(ctx, cm) + `<div class="rp-gap20"></div>` +
        monthInsights(ctx, cm) + `<div class="rp-gap20"></div>` +
        exportCard(ctx, ctx.t("reportsCurrentMonthExportTitle"), ctx.t("reportsCurrentMonthExportSubtitle")) +
        `<div class="rp-gap24"></div><div class="rp-gap32"></div>`;
      return frame(ctx, bar, body);
    },
  });
})();
