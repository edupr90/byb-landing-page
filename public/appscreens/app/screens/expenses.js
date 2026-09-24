/* Expenses — the home tab (lib/ui/views/expenses_view.dart, HomepageView), recreated for the store images.
 *
 * Flutter source, top to bottom:
 *   buildModernAppBar (modern_app_bar.dart): transparent AppBar, toolbar 56 under the 62pt safe area,
 *     leading HamburgerMenuButton (app_drawer.dart) · titleSpacing 8 · ExpenseSearchBar (expense_search_bar.dart) ·
 *     actions [Padding(right 16) RevealAddButton (reveal_add_button.dart)]
 *   ListView
 *     Padding(20, 8, 20, 8) _buildHero: MonthPickerButton(minHeight 44, the month 13/700/+1.6) · 6 ·
 *       Row[Expanded(FittedBox(scaleDown) MonthTotalSpentPro 48, month_spent.dart) · 14 · _comparisonBadge] · 6 ·
 *       caption 14/500 subText
 *     Padding(20, 4, 0, 0) SizedBox(130) SpendingComparisonChart (spending_comparison_chart.dart, fl_chart 0.65)
 *     Padding(top 20, bottom 4) CategoryFilterStrip (category_filter_strip.dart)
 *     Padding(10, 4, 10, 0) TransList (trans_list.dart): day header / tile, 8 apart
 *
 * States
 *   all          no filter ("Current spend this month")                               raw/en/07_expenses_top
 *   restaurants  the Restaurants chip selected (the store image)                       raw/<lang>/07_expenses_restaurants
 *   utilities    the Utilities chip selected                                           raw/en/07_expenses_utilities
 * params
 *   filter       category id of the selected chip (null = All)
 *   authors      false hides the "who spent it" line under each row (a solo budget: trans_list.dart:348 only passes
 *                an author inside a shared budget, which is BYB+). Default true, as captured.
 *
 * Pop-out anchors (data-pop)
 *   app-bar              the pinned toolbar row (menu · search · add), under the status bar
 *   menu-button          the hamburger circle
 *   search-bar           the read-only search pill
 *   add-button           the "+" circle
 *   month-total          the hero column: SEPTEMBER 2026 · the amount + badge row · the caption
 *   month-label          "SEPTEMBER 2026"
 *   month-amount         the big amount ("$146.62")
 *   month-caption        "6% of this month's spend · 3 expenses" / "Current spend this month"
 *   pace-badge           the vs-last-month badge ("$371 above last month")
 *   pace-chart           the this-month-vs-last-month line chart (420 × 130)
 *   filter-chips         the chip strip (full width, 36 tall)
 *   chip-all             the "All" chip
 *   chip-<categoryId>    one chip per category in the strip (chip-groceries, chip-restaurants, chip-utilities, …)
 *   expense-list         the list block (every day header and row)
 *   day-header-<iso>     a day header's label + total row ("September 8, 2026 · $51.73"), e.g. day-header-2026-09-08 —
 *                        the Row inside _ProfileStyleDayHeader's Padding(12, 16, 12, 8), so the box is the text
 *                        line (396 wide, 12 in from the list's 10 inset), not the padded widget
 *   expense-<expenseId>  one expense card, e.g. expense-152 (ids from app/data.js)
 */
(function () {
  "use strict";

  // FittedBox(fit: BoxFit.scaleDown) around a one-line text: the natural width is measured once on a hidden
  // .byb-app host (browser only; node's vm has no document and leaves the text unscaled), then CSS picks
  // min(S, 100cqi · S / W0) inside a width container — the same approach as kit.js's ring cards.
  let host = null;
  const naturalWidth = (html) => {
    if (typeof document === "undefined" || !document.body) return 0;
    if (!host) {
      host = document.createElement("div");
      host.className = "byb-app";
      host.setAttribute("aria-hidden", "true");
      host.style.cssText = "position:absolute;left:-40000px;top:0;width:4000px;height:auto;visibility:hidden;pointer-events:none;contain:layout style;background:none";
    }
    if (!host.isConnected) document.body.appendChild(host);
    host.innerHTML = html;
    const el = host.firstElementChild;
    el.style.display = "inline-block";
    el.style.whiteSpace = "nowrap";
    const w = el.getBoundingClientRect().width;
    host.innerHTML = "";
    return w;
  };
  const r3 = (n) => Math.round(n * 1000) / 1000;

  // ------------------------------------------------------------------ chart (fl_chart 0.65 LineChart)

  // generateNormalBarPath with isCurved, curveSmoothness 0.25, preventCurveOverShooting (threshold 10): the
  // tangent's dy is dropped whenever a neighbour's pixel dy <= 10 (always, for a rising cumulative line), its dx
  // whenever a neighbour is <= 10 px away (the last point).
  function curvePath(pts) {
    if (!pts.length) return "";
    let d = `M${r3(pts[0][0])},${r3(pts[0][1])}`;
    if (pts.length === 1) return d + `L${r3(pts[0][0])},${r3(pts[0][1])}`;
    let tx = 0, ty = 0;
    for (let i = 1; i < pts.length; i++) {
      const cur = pts[i], prev = pts[i - 1], next = pts[i + 1 < pts.length ? i + 1 : i];
      const c1 = [prev[0] + tx, prev[1] + ty];
      tx = ((next[0] - prev[0]) / 2) * 0.25;
      ty = ((next[1] - prev[1]) / 2) * 0.25;
      if (next[1] - cur[1] <= 10 || cur[1] - prev[1] <= 10) ty = 0;
      if (next[0] - cur[0] <= 10 || cur[0] - prev[0] <= 10) tx = 0;
      const c2 = [cur[0] - tx, cur[1] - ty];
      d += `C${r3(c1[0])},${r3(c1[1])} ${r3(c2[0])},${r3(c2[1])} ${r3(cur[0])},${r3(cur[1])}`;
    }
    return d;
  }

  function chart(ctx) {
    const { current, previous } = ctx.data.expensesView.chart;
    const W = 420, H = 130;
    const curMax = current.length ? current[current.length - 1] : 0;
    const prevMax = previous.length ? previous[previous.length - 1] : 0;
    if (curMax <= 0 && prevMax <= 0) return "";
    const maxX = Math.max(previous.length || 1, current.length || 1, 2);
    const peak = Math.max(curMax, prevMax);
    const maxY = peak <= 0 ? 1 : peak * 1.15;
    const px = (day) => ((day - 1) / (maxX - 1)) * W;
    const py = (v) => H - (v / maxY) * H;
    const prevPts = previous.map((v, i) => [px(i + 1), py(v)]);
    const curPts = current.map((v, i) => [px(i + 1), py(v)]);
    const prevLine = curvePath(prevPts);
    let svg = "";
    if (prevPts.length) {
      const last = prevPts[prevPts.length - 1], first = prevPts[0];
      svg +=
        `<path class="xp-prev-fill" d="${prevLine}L${r3(last[0])},${H}L${r3(first[0])},${H}L${r3(first[0])},${r3(first[1])}Z"/>` +
        `<path class="xp-prev-line" d="${prevLine}"/>`;
    }
    if (curPts.length) {
      const last = curPts[curPts.length - 1];
      svg +=
        `<path class="xp-cur-line" d="${curvePath(curPts)}"/>` +
        // FlDotCirclePainter radius 5: Skia's analytic AA of the disc reads ~0.15pt smaller than Chrome's, so 4.85 lands on the capture
        `<circle class="xp-cur-dot" cx="${r3(last[0])}" cy="${r3(last[1])}" r="4.85"/>`;
    }
    return `<div class="xp-chart-pad"><div class="xp-chart" data-pop="pace-chart"><svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${svg}</svg></div></div>`;
  }

  // ------------------------------------------------------------------ hero

  function hero(ctx, filter) {
    const { kit, fmt, data } = ctx;
    const ev = data.expensesView;
    const monthLabel = fmt.date(`${data.month}-01`, "yMMMM", { case: "upper" });

    // the hero amount: the filter's total, else the month's (symbol + decimalPattern, 2 digits)
    const scope = filter ? ev.filters[filter] : null;
    const amount = fmt.money(scope ? scope.total : ev.total);
    const amountCls = "k-line k-gf k-tnum k-block xp-amount-text";
    const amountStyle = "font-size:48px;font-weight:800;--lh:1;--ls:-1px";
    // The paragraph is exactly as wide as its line: Flutter 3.41's TextPainter no longer ceils the width (the old
    // _applyFloatingPointHack — ceiling it put the "all" list 0.4 raw px high and the digits 0.5 raw px right).
    // FittedBox then scales that box by min(1, width / W) about its top-left and takes 48 · scale as its height.
    const w0 = naturalWidth(`<div class="${amountCls}" style="${amountStyle}">${kit.esc(amount)}</div>`);
    const W = w0 > 0 ? r3(w0) : 0;
    const fitVars = W > 0 ? `--xp-w:${W}px` : "";
    // _monthComparison: this month to date vs last month up to the same day (prevRefDay = today clamped to last
    // month's length); the badge hides when that is 0. chart.previous is last month's cumulative spend per day.
    const prev = ev.chart.previous;
    const prevToDate = prev.length ? prev[Math.min(ev.currentDay, prev.length) - 1] : 0;
    const diff = ev.vsLastMonth;
    let badge = "";
    if (prevToDate > 0) {
      const same = Math.abs(diff) < 1;
      const amountStr = fmt.money(Math.abs(diff), { intl: true, digits: 0 });
      const label = same
        ? ctx.t("expensesHeroSameAsLastMonth")
        : diff > 0
          ? ctx.t("expensesHeroAboveLastMonth", { amount: amountStr })
          : ctx.t("expensesHeroBelowLastMonth", { amount: amountStr });
      badge = kit.compareBadge(label, { tone: same ? "same" : diff > 0 ? "up" : "down", pop: "pace-badge", cls: "xp-badge" });
    }

    const caption = scope
      ? ctx.t("expensesHeroFilteredCaption", { percent: String(scope.percent), count: String(scope.count) })
      : ctx.t("expensesHeroCurrentSpend");

    return (
      `<div class="xp-hero-pad"><div class="xp-hero" data-pop="month-total">` +
      `<div class="xp-month">${kit.sectionLabel(monthLabel, { variant: "month", pop: "month-label" })}</div>` +
      `<div class="xp-amount-row">` +
      `<div class="xp-fit"${W > 0 ? ` style="${fitVars}"` : ""}><div class="xp-fit-box" data-pop="month-amount">` +
      `<div class="${amountCls}" style="${amountStyle}">${kit.esc(amount)}</div></div></div>` +
      badge +
      `</div>` +
      kit.text(caption, { size: 14, weight: 500, color: "var(--ink-sub)", pop: "month-caption", cls: "xp-caption" }) +
      `</div></div>`
    );
  }

  // ------------------------------------------------------------------ app bar

  function appBar(ctx) {
    const { kit } = ctx;
    const search =
      `<div class="xp-search" data-pop="search-bar">${ctx.icon("Icons.search_rounded", "xp-search-ic")}` +
      kit.text(ctx.t("expensesSearchHint"), { size: 14, weight: 500, lh: 1.5, ls: 0.25, prop: false, lines: 1, cls: "xp-search-hint" }) +
      `</div>`;
    return (
      `<div class="xp-bar">` +
      kit.appBar({
        pop: "app-bar",
        leading: kit.menuButton({ pop: "menu-button" }),
        title: search,
        actions: kit.addButton({ pop: "add-button" }),
        actionsPad: 16,
      }) +
      `</div>`
    );
  }

  // ------------------------------------------------------------------ chips + list

  function chips(ctx, filter) {
    const { kit, data } = ctx;
    const items = [kit.chip(ctx.t("expensesFilterAll"), { selected: !filter, pop: "chip-all" })];
    for (const id of data.expensesView.filterOrder) {
      const c = data.category[id];
      items.push(kit.chip(ctx.t(c.name), { selected: filter === id, color: c.color, pop: `chip-${id}` }));
    }
    return `<div class="xp-chips">${kit.chips(items.join(""), { pop: "filter-chips" })}</div>`;
  }

  function dayLabel(ctx, day) {
    const today = ctx.data.now.slice(0, 10);
    const t = new Date(+today.slice(0, 4), +today.slice(5, 7) - 1, +today.slice(8, 10));
    const y = new Date(t.getFullYear(), t.getMonth(), t.getDate() - 1);
    const yIso = `${y.getFullYear()}-${String(y.getMonth() + 1).padStart(2, "0")}-${String(y.getDate()).padStart(2, "0")}`;
    if (day === today) return ctx.t("timeframesToday");
    if (day === yIso) return ctx.fmt.date(day, "yMMMd");
    return ctx.fmt.date(day, "yMMMMd");
  }

  // _ProfileStyleDayHeader: Padding(12, 16, 12, 8) > Row[Expanded(label) · 12 · total]. kit.dayHeader puts the spans
  // straight into the padded .k-dayhead and its { pop } on that padded box, 16 pt of blank above the line and 12 each
  // side. The anchor belongs on the Row, so the spans move into an inner .xp-dayrow that carries the data-pop.
  // LOCAL FALLBACK (requested for kit.dayHeader: an o.rowPop, with kit.css's `.k-dayhead > span` selectors widened):
  // expenses.css repeats those three span rules for `.xp-dayrow > span`.
  function dayHeader(ctx, label, total, pop) {
    const h = ctx.kit.dayHeader(label, total);
    const open = h.indexOf(">") + 1; // the label and total are escaped: the first ">" closes the opening tag
    const close = h.lastIndexOf("</div>");
    return h.slice(0, open) + `<div class="xp-dayrow" data-pop="${ctx.kit.esc(pop)}">` + h.slice(open, close) + `</div>` + h.slice(close);
  }

  function list(ctx, filter) {
    const { kit, fmt, data } = ctx;
    const showAuthors = ctx.params.authors !== false;
    const rows = data.q.expenses({ month: data.month, category: filter || undefined });
    const items = [];
    for (const day of data.q.byDay(rows)) {
      items.push(dayHeader(ctx, dayLabel(ctx, day.day), fmt.money(day.total, { intl: true }), `day-header-${day.day}`));
      for (const e of day.rows) {
        const c = data.category[e.category];
        const m = data.member[e.member];
        items.push(
          kit.expenseTile({
            pop: `expense-${e.id}`,
            emoji: c.emoji,
            color: c.color,
            title: ctx.d(e.name),
            category: ctx.t(c.name),
            date: fmt.date(e.date, "MMMd"),
            author: showAuthors && m
              ? { name: ctx.d(m.name), avatar: kit.avatar({ size: 16, tint: kit.memberTint(m.paletteIndex), src: m.avatar }) }
              : null,
            amount: fmt.money(e.amount, { intl: true }),
          })
        );
      }
    }
    return `<div class="xp-list" data-pop="expense-list">${items.join("")}</div>`;
  }

  // ------------------------------------------------------------------ screen

  BYBApp.screen({
    id: "expenses",
    title: "Expenses",
    states: {
      all: { params: { filter: null } },
      restaurants: { params: { filter: "restaurants" } },
      utilities: { params: { filter: "utilities" } },
    },
    captures: {
      all: "07_expenses_top",
      restaurants: "07_expenses_restaurants",
      utilities: "07_expenses_utilities",
    },
    render(ctx) {
      const f = ctx.params.filter;
      const filter = f && ctx.data.expensesView.filters[f] ? f : null;
      return (
        `<div class="xp-viewport"><div class="app-scroll">` +
        hero(ctx, filter) +
        chart(ctx) +
        chips(ctx, filter) +
        list(ctx, filter) +
        `</div></div>` +
        appBar(ctx)
      );
    },
  });
})();
