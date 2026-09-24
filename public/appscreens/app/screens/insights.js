/* Insights — lib/ui/views/dashboard.dart (DashboardView, drawer "Insights", title navDashboard) on
 * RevampTabScaffold (lib/ui/widgets/common/revamp_tab_scaffold.dart), with its groups from
 * lib/ui/widgets/Insights/: spending_income.dart (THIS MONTH, TREND), spending_breakdown.dart (BREAKDOWN),
 * frequent_spend.dart (FREQUENT), largest_spend.dart (LARGEST), insights_shared.dart (rows, meter, money).
 *
 * Layout (pt): the 52pt bar (hamburger + 22/600 title, 1px hairline inside) sits under the 62pt safe area and is
 * pinned — the feed scrolls in a viewport clipped below it (y 114). The feed is the TOTAL SPEND header block
 * (edge to edge, 20 padding, bottom hairline), then the groups inside 12 · 20 padding, each a RevampGroup:
 * 11/600 label, 8, a white card (radius 12, 1px hairline) of rows with 16-inset dividers, 22 below.
 *
 * States
 *   top        the screen as it opens                                     raw/<lang>/03_insights_top
 *   breakdown  scrolled 513.5pt: the BREAKDOWN label's top at y 261.5     raw/<lang>/03_insights_breakdown
 *              (measured on the en capture's hairlines; the es-419 capture is scrolled 0.9pt further, 514.4pt —
 *              compare it with --spec '{"app":"insights","state":"breakdown","scrollOffset":-260.6,"data":"capture"}'
 *              --capture raw/es-419/03_insights_breakdown.png)
 *   The es-419 capture's own scroll matters only for the plain capture comparison: store renders put both languages at
 *   the en position, so slide pop-outs anchored on these data-pops need no per-language rect overrides.
 * Scroll limit
 *   The feed is 1694pt tall in a 842pt viewport, so the device can scroll at most 852pt (LARGEST card bottom at 888).
 *   The runtime does not cap scroll / scrollOffset yet: a spec past 852 shows empty page under the LARGEST card, a
 *   position the app cannot reach. Keep bottom-of-feed specs at scroll ≤ 852.
 * Params
 *   expanded: true      the breakdown shows every category and "Show fewer" (two more rows: the scroll limit becomes
 *                       984pt)
 *   trendMonth: "YYYY-MM"  the selected month on the trend strip (default: this month). Pick one of the 5 visible
 *                       months: the strip does not scroll, so an older month's tint would be off the card.
 *
 * Checked against the captures (tools/shot.mjs --compare, mean |Δ| / 255 over the feed below the app bar): en top 0.22,
 * breakdown 0.25; es-419 top 0.23, breakdown 0.27 at its own scroll (4.1 at the state’s, a uniform 0.9pt offset). Every
 * edge and glyph lands on the capture's raw pixel — with the LOCAL FIXes at the top of insights.css (Inter's
 * contextual "+", vertical glyph snapping at 14.5pt and at the breakdown state's half-pixel scroll). Residue is
 * anti-aliasing only: Chrome's synthetic bold on the 600-weight AppFont text is a shade heavier, the square end of each
 * meter fill, the tops of the rounded income bars, and the app bar title (kit.revampBar).
 *
 * data-pop anchors
 *   app-bar                   the pinned 52pt bar (hamburger + title), without the safe area
 *   total-spend               TOTAL SPEND header block (label, amount, month line), edge to edge with its hairline
 *   total-spend-amount        the 44pt figure alone
 *   total-spend-line          "September · $4,529.64 left of $6,900.00"
 *   this-month                THIS MONTH section (label + card)
 *   this-month-card           its card
 *   this-month-income         Income row
 *   this-month-spend          Total spend row (with its red meter)
 *   this-month-left           Left to spend row (with its green meter)
 *   this-month-net            Net row
 *   trend                     TREND section (label + card)
 *   trend-card                its card
 *   trend-bars                the month strip (bars + month labels)
 *   trend-month-<YYYY-MM>     one month's column (bars + label; the selected one carries the tint), e.g. trend-month-2026-09.
 *                             Only the 5 columns fully inside the strip carry it (the demo's 2026-05 … 2026-09); the
 *                             older months run off the card's left edge (April is a 12pt sliver) and have no anchor.
 *   trend-legend              the legend row (Income / Total spend and the selected month's figures)
 *   breakdown                 BREAKDOWN section (label + card)
 *   breakdown-card            its card
 *   breakdown-<categoryId>    one category row (tile, name, share, amount, chevron, meter), e.g. breakdown-housing
 *   show-all                  "Show all 8 categories" (or "Show fewer" with params.expanded)
 *   frequent                  FREQUENT section (label + card)
 *   frequent-card             its card
 *   frequent-<categoryId>     one row (tile, name, "4 transactions", amount), e.g. frequent-groceries
 *   largest                   LARGEST section (label + card)
 *   largest-card              its card
 *   largest-<n>               the n-th biggest purchase row, 1-based (largest-1 … largest-3)
 *   see-more                  "See more" row
 */
(function () {
  "use strict";

  const COLLAPSED_ROWS = 6; // spending_breakdown.dart _kCollapsedRows
  const BAR_CEILING = 68; // spending_income.dart _kBarCeiling
  const STRIP_PAD_V = 12;
  const CARD_PAD_V = 6;
  const LABEL_GAP = 8;
  const LABEL_SIZE = 11;
  const SCREEN_W = 440;
  // The trend strip: a reversed horizontal ListView at rest (the current month at the right edge), inside the card's
  // 398pt (440 − 20·2 feed padding − 1·2 hairlines). Columns are 64 wide, 10 apart, after 16 of leading padding on
  // the right. Only the months whose whole column is inside the strip get a data-pop: 16 + 64n + 10(n − 1) ≤ 398 → 5
  // (the demo's May–September; April shows a 12pt sliver, January–March are off the card).
  const STRIP_W = SCREEN_W - 2 * 20 - 2;
  const MONTH_W = 64;
  const MONTH_GAP = 10;
  const ROW_PAD_H = 16; // RevampTokens.rowPadH
  const VISIBLE_MONTHS = Math.floor((STRIP_W - ROW_PAD_H + MONTH_GAP) / (MONTH_W + MONTH_GAP));

  BYBApp.screen({
    id: "insights",
    title: "Insights",
    states: {
      top: {},
      breakdown: { scroll: "@breakdown", scrollOffset: -261.5 },
    },
    captures: { top: "03_insights_top", breakdown: "03_insights_breakdown" },

    render(ctx) {
      const { t, d, fmt, kit, data, esc, icon } = ctx;
      const ins = data.insights;
      const params = ctx.params || {};
      const money = (n) => fmt.money(n);

      // ---- shared pieces (insights_shared.dart)

      const chevron = () => icon("Icons.chevron_right_rounded", "ins-chev");
      // RevampIdentityTile 24 / 7 (class ins-tile: LOCAL FIX, see insights.css — the kit draws the emoji 1pt right of and 0.2pt above the device’s)
      const tile = (cat) => kit.identityTile(cat.emoji, cat.color, { cls: "ins-tile" });
      // insightsAmountStyle: GoogleFonts Inter 14.5 w600 tabular, RevampTokens.text. Every 14.5pt (RevampTokens.rowSize)
      // Text here carries ins-rt: LOCAL FIX in insights.css (its baseline is not rounded to a whole point).
      const amount = (text, o = {}) =>
        kit.text(text, { size: 14.5, weight: 600, gf: true, tnum: true, lines: 1, color: o.color || "var(--r-text)", cls: ["ins-rt ins-amount", o.cls].filter(Boolean).join(" ") });
      // InsightsMeter: ClipRRect(999) · track divider · a square-ended fill. One background (a hard-stop gradient), not a
      // fill box over a track box: at a half-point scroll the stacked boxes' anti-aliased edges let the track bleed
      // through, and the device's don't.
      const meter = (value, color, h, cls) => {
        const v = Number.isFinite(value) ? Math.max(0, Math.min(1, value)) : 0;
        const at = `${+(v * 100).toFixed(4)}%`;
        return `<div class="ins-meter ${cls || ""}" style="height:${h}px;background:linear-gradient(90deg, ${color} ${at}, var(--r-divider) ${at})"></div>`;
      };
      // RevampGroup's label is a RevampSectionLabel (revamp_form.dart:622) → localizedUpper, so the JS does the
      // casing: k-label's CSS text-transform would uppercase with the DOCUMENT's language and spell a Turkish
      // "i" as "I" (kit.css:347).
      const group = (id, label, rows) =>
        `<div class="k-group ins-group" data-pop="${esc(id)}">` +
        kit.sectionLabel(fmt.upperLocalized(label)) +
        `<div class="k-group-body" data-pop="${esc(id)}-card">${rows.join(`<div class="k-divider"></div>`)}</div>` +
        `</div>`;

      // InsightsListRow: tile · 10 · name over subtitle · 10 · amount (≤ 45% of the width) · 4 · chevron
      const listRow = (o) =>
        `<div class="ins-row ins-list-row" data-pop="${esc(o.pop)}">` +
        tile(o.cat) +
        `<div class="ins-list-text">` +
        kit.text(o.title, { size: 14.5, weight: 400, color: "var(--r-row-label)", lines: 1, cls: "ins-rt" }) +
        (o.subtitle != null ? kit.text(o.subtitle, { size: 12, weight: 400, lh: 1.35, color: "var(--r-secondary)", lines: 1, cls: "ins-sub" }) : "") +
        `</div>` +
        `<div class="ins-cap" style="max-width:${+(SCREEN_W * 0.45).toFixed(2)}px">${amount(o.amount, { color: o.amountColor })}</div>` +
        chevron() +
        `</div>`;

      // ---- app bar (RevampTabScaffold: SafeArea → 52 bar, hamburger 44 slot, 4, title 22/600 −0.4)

      const bar = `<div class="ins-bar">${kit.revampBar({ kind: "tab", title: t("navDashboard"), pop: "app-bar" })}</div>`;

      // ---- TOTAL SPEND (dashboard.dart _TotalSpentHeader on RevampHeaderBlock)

      const monthDate = `${data.month}-01`;
      const monthName = fmt.date(monthDate, "MMMM", { case: "sentence" });
      const left = Math.max(0, ins.income - ins.total); // InsightsData.monthLeft
      const secondary = ins.income > 0
        ? `${monthName} · ${t("insightsLeftOfIncome", { left: money(left), income: money(ins.income) })}`
        : monthName;
      const header =
        `<div class="ins-header" data-pop="total-spend">` +
        kit.sectionLabel(fmt.upperLocalized(t("insightsTotalSpend"))) + // RevampHeaderBlock → RevampSectionLabel
        kit.money(money(ins.total), 44, { pop: "total-spend-amount", cls: "ins-hero", color: "var(--r-text)" }) +
        kit.text(secondary, { size: 12, weight: 400, lh: 1.5, tnum: true, color: "var(--r-secondary)", pop: "total-spend-line", cls: "ins-hero-line" }) +
        `</div>`;

      // ---- THIS MONTH (spending_income.dart InsightsThisMonthGroup / _StatRow on RevampRow)

      const hasIncome = ins.income > 0;
      const spent = ins.total;
      const net = ins.income - spent;
      const statRow = (pop, label, value, o = {}) =>
        kit.row({
          pop,
          label,
          trailing:
            `<div class="ins-stat">${amount(value, { color: o.valueColor })}` +
            (o.meter != null ? meter(o.meter, o.meterColor, 3, "ins-stat-meter") : "") +
            `</div>`,
        });
      const thisMonth = group("this-month", t("insightsGroupThisMonth"), [
        statRow("this-month-income", t("insightsIncome"), money(ins.income)),
        statRow("this-month-spend", t("insightsTotalSpend"), money(spent), {
          meter: hasIncome ? spent / (ins.income > spent ? ins.income : spent > 0 ? spent : 1) : null,
          meterColor: "var(--red)",
        }),
        statRow("this-month-left", t("insightsLeftToSpend"), money(left), {
          meter: hasIncome ? left / ins.income : null,
          meterColor: "var(--green)",
        }),
        statRow("this-month-net", t("insightsNetIncome"), fmt.money(net, { signed: true }), {
          valueColor: net < 0 ? "var(--r-danger)" : "var(--green)",
        }),
      ]);

      // ---- TREND (InsightsTrendGroup / _MonthBars / _DottedBarPainter / _LegendReading)

      const trend = ins.trend || [];
      let sel = trend.length - 1;
      if (params.trendMonth) {
        const i = trend.findIndex((m) => m.month === params.trendMonth);
        if (i >= 0) sel = i;
      }
      const maxV = ins.maxTrend <= 0 ? 1 : ins.maxTrend;
      const barH = (v) => Math.max(8, BAR_CEILING * (v / maxV));
      // _DottedBarPainter: segments 4 tall, 3 apart, radius 2, drawn bottom-up while a segment's top is ≥ 0 in a
      // box h tall. The box is the bars' whole 68 (bottom-aligned), so every segment lands on a whole point from the
      // baseline as on device; the segments are divs (Chrome's rounded-rect edges, like Skia's drawRRect, stay crisp
      // where an SVG rect's do not).
      const dotted = (w, h, color, box = h) => {
        let segs = "";
        for (let y = h - 4; y >= 0; y -= 7) segs += `<i style="top:${+(box - h + y).toFixed(4)}px"></i>`;
        return `<div class="ins-dots" style="width:${w}px;height:${box}px;--dot:${color}">${segs}</div>`;
      };
      const monthCol = (m, i) => {
        const on = i === sel;
        const label = fmt.date(`${m.month}-01`, "MMM", { case: "upper" });
        // a clipped column (left of the last VISIBLE_MONTHS) is drawn but not anchored: nobody can see it to pop it out
        const pop = i >= trend.length - VISIBLE_MONTHS ? ` data-pop="trend-month-${esc(m.month)}"` : "";
        return `<div class="ins-month${on ? " ins-on" : ""}"${pop}>` +
          `<div class="ins-bars">` +
          `<div class="ins-income-bar" style="height:${+barH(m.income).toFixed(4)}px"></div>` +
          `<div class="ins-spend-bar">${dotted(21, barH(m.spent), "var(--red)", BAR_CEILING)}</div>` +
          `</div>` +
          kit.text(label, { size: LABEL_SIZE, weight: on ? 600 : 500, ls: 0.4, lh: 1, lines: 1, align: "center", color: on ? "var(--r-text)" : "var(--r-secondary)", cls: "ins-month-label" }) +
          `</div>`;
      };
      const stripH = BAR_CEILING + 2 * STRIP_PAD_V + 2 * CARD_PAD_V + LABEL_GAP + LABEL_SIZE;
      const strip =
        `<div class="ins-strip" data-pop="trend-bars" style="height:${stripH}px"><div class="ins-strip-row">${trend.map(monthCol).join("")}</div></div>`;
      const selM = trend[sel] || { income: 0, spent: 0 };
      const legendItem = (label, value, mark) =>
        `<div class="ins-legend-item">${mark}<div class="ins-legend-text">` +
        kit.text(label, { size: 11, weight: 500, ls: 0.3, lines: 1, color: "var(--r-secondary)" }) +
        amount(value, { cls: "ins-legend-value" }) +
        `</div></div>`;
      const legend =
        `<div class="ins-legend" data-pop="trend-legend">` +
        legendItem(t("insightsIncome"), money(selM.income), `<div class="ins-mark" style="background:var(--green);border-radius:2px"></div>`) +
        legendItem(t("insightsTotalSpend"), money(selM.spent), `<div class="ins-mark">${dotted(8, 8, "var(--red)")}</div>`) +
        `</div>`;
      const trendGroup = trend.length ? group("trend", t("insightsGroupTrend"), [strip, legend]) : "";

      // ---- BREAKDOWN (SpendingBreakdownGroup / CategoryBreakdownRow)

      const all = ins.breakdown || [];
      const expanded = !!params.expanded;
      const shown = expanded ? all : all.slice(0, COLLAPSED_ROWS);
      const scale = all.length ? all[0].amount : 0;
      const breakdownRows = shown.map((b) => {
        const cat = data.category[b.category];
        const share = ins.total > 0 ? b.amount / ins.total : 0;
        return `<div class="ins-row ins-bd-row" data-pop="breakdown-${esc(b.category)}">` +
          `<div class="ins-bd-line">` +
          tile(cat) +
          kit.text(t(cat.name), { size: 14.5, weight: 400, color: "var(--r-row-label)", lines: 1, cls: "ins-rt ins-bd-name" }) +
          `<div class="ins-cap ins-bd-pct" style="max-width:${+(SCREEN_W * 0.2).toFixed(2)}px">` +
          kit.text(fmt.percent(share * 100), { size: 12, weight: 500, tnum: true, lines: 1, color: "var(--r-secondary)" }) +
          `</div>` +
          `<div class="ins-cap ins-bd-amt" style="max-width:${+(SCREEN_W * 0.4).toFixed(2)}px">${amount(money(b.amount))}</div>` +
          chevron() +
          `</div>` +
          meter(scale > 0 ? b.amount / scale : 0, cat.color, 4, "ins-bd-meter") +
          `</div>`;
      });
      if (all.length > COLLAPSED_ROWS) {
        breakdownRows.push(kit.row({
          pop: "show-all",
          action: true,
          label: expanded ? t("insightsShowFewerCategories") : t("insightsShowAllCategories", { count: String(all.length) }),
        }));
      }
      const breakdown = all.length
        ? group("breakdown", t("insightsGroupBreakdown"), breakdownRows)
        : group("breakdown", t("insightsGroupBreakdown"), [notice(t("insightsEmptyMonth"))]);

      // ---- FREQUENT (FrequentSpendGroup / _FrequentRow)

      const freq = ins.frequent || [];
      const frequent = group(
        "frequent",
        t("insightsGroupFrequent"),
        freq.length
          ? freq.map((f) => {
            const cat = data.category[f.category];
            const negative = f.amount < 0;
            return listRow({
              pop: `frequent-${f.category}`,
              cat,
              title: t(cat.name),
              subtitle: t("frequentSubtitle", { n: String(f.count) }),
              amount: negative ? fmt.money(f.amount, { signed: true }) : money(f.amount),
              amountColor: negative ? "var(--r-secondary)" : null,
            });
          })
          : [notice(t("insightsFrequentBelowThreshold"))],
      );

      // ---- LARGEST (LargestPurchasesGroup)

      const big = ins.largest || [];
      const largest = group(
        "largest",
        t("insightsGroupLargest"),
        big.length
          ? [
            ...big.map((e, i) => listRow({
              pop: `largest-${i + 1}`,
              cat: data.category[e.category],
              title: d(e.name),
              subtitle: fmt.date(e.date, "MMMMd"),
              amount: money(e.amount),
            })),
            kit.row({ pop: "see-more", action: true, chevron: true, label: t("seeMore") }),
          ]
          : [notice(t("largestEmpty"))],
      );

      // RevampNoticeRow (only for an empty month; the demo month never is)
      function notice(text) {
        return `<div class="ins-notice">${kit.text(text, { size: 12, weight: 400, lh: 1.5, color: "var(--r-notice-fg)" })}</div>`;
      }

      return bar +
        `<div class="ins-viewport"><div class="app-scroll">` +
        header +
        `<div class="ins-feed">${thisMonth}${trendGroup}${breakdown}${frequent}${largest}</div>` +
        `</div></div>`;
    },
  });
})();
