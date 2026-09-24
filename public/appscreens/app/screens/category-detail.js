/* Screen "category-detail" — one category for one month: planned, spent, and who spent it.
 *
 * Mirrors lib/ui/views/category_detail_view.dart (CategoryDetailView): a pinned header (✕ · category name ·
 * Edit, then SPENT THIS MONTH / the amount / "of $X planned") over a ListView of MemberSharesSection
 * (lib/ui/widgets/Planning/member_shares_section.dart, the category variant: rings against each member's split
 * share), the split action (RevampPrimaryButton + the allocation note, or the split tip on an unsplit category)
 * and TransList (lib/ui/widgets/Expenses/trans_list.dart: day headers + expense tiles with the author line).
 *
 * States (params.category picks any category id in ctx.data.category; default "housing"):
 *   housing      Budget → Housing card (raw/<lang>/02_housing_detail): split 900 / 600, both paid in full
 *   groceries    Budget → Groceries card (raw/en/02_groceries_detail, reference): split 300 / 300, four rows
 *   restaurants  an unsplit category: the split tip, no caption under the member cards (no capture)
 *   utilities    split with the owner only: the partner card has no ceiling (grey ring, no caption) (no capture)
 *
 * Pinned vs scrolled: the header is outside the ListView (it stays put), so it sits above a clipping viewport and
 * only the list is .app-scroll. The viewport runs from 216 pt (the header's bottom) to 956 pt, so it is 740 pt tall.
 * The ListView ends with 24 + 34 pt of padding, and it can scroll at most (list content height − 740) pt. The Flutter
 * list clamps there at rest. The runtime does NOT clamp: a larger scroll just pulls the list up and leaves blank
 * page under it, a position the app cannot show. Measured maximum scroll (store data; en = es-419 unless noted):
 *   housing 0 pt (600 pt of content: the screen does not scroll) · groceries 173 · restaurants 109 en, 127 es-419
 *   (the Spanish split tip wraps to one more line) · utilities 0 · an empty category (savings) 0
 * So `scroll: "@<pop-id>", scrollOffset: -216` (the element right under the header) is only a real position when
 * the element sits at most max + 216 pt from the top unscrolled, i.e. ≤ 389 pt on groceries. For anything lower, use
 * the number instead (scroll: 173). Never set a scroll on housing.
 *
 * data-pop anchors
 *   detail-header        the pinned header: ✕, title, Edit, and the spent block — the Padding(12, 8, 16, 8) box under
 *                        the 62 pt safe area, so it starts at y 62 (0, 62, 440, 154), without the status-bar band
 *   close-button         the ✕ IconButton (48 × 48)
 *   category-title       the category name alone: as wide as the text (≈ 65 pt "Housing", 70 pt "Vivienda"), centred
 *   category-title-slot  the Expanded slot between ✕ and Edit that the name is centred in (300 pt in en)
 *   edit-button          the Edit TextButton (its 64 × 48 tap box)
 *   spent-header         SPENT THIS MONTH + the amount + "of $X planned" (the Padding(8, 4, 8, 4) block, as wide as its
 *                        widest line + 16, like the Flutter Column it mirrors)
 *   spent-amount         the amount alone
 *   planned-line         "of $1,500.00 planned" alone
 *   who-spending         the WHO'S SPENDING WHAT label (its text line: 18 tall, as wide as the text, at x 20)
 *   member-cards         the row of member cards (both cards and the 10 pt gap)
 *   member-owner         the signed-in owner's ring card (always first: orderedForViewer)
 *   member-partner       the partner's ring card
 *   split-tip            the "Say who is covering what" card (unsplit categories only)
 *   split-button         the "Split between us" RevampPrimaryButton
 *   covered-note         the note under the button ("All of it is covered" / "$X unallocated" / "$X over the plan"),
 *                        hugging the centred text: as wide as the line (106 pt in en, 116 pt in es-419), 18 tall
 *   covered-note-row     the same note's full-width Text box (408 pt, text centred: CrossAxisAlignment.stretch)
 *   expense-list         TransList: every day header and row
 *   date-header-<iso>    a day header's content row, e.g. date-header-2026-09-01: date label … day total, 13 tall,
 *                        12 pt in from each edge (x 12, w 416), without the header's 16 / 8 vertical padding
 *   date-header-<iso>-slot  the whole _ProfileStyleDayHeader, including its Padding(12, 16, 12, 8) (x 0, w 440, 37 tall)
 *   expense-<name>-<member>[-<n>]  an expense tile by what the row is: the demo name key in kebab case plus the
 *                        member id; -2, -3… for the 2nd, 3rd row of the same name and member, counting newest first.
 *                        Rows with no member are expense-<name>[-<n>]. Housing: expense-rent-partner (Rent · partner,
 *                        $600) and expense-rent-owner (Rent · owner, $900). USE THESE IN SLIDES: they do not depend on
 *                        data ids. Only a -<n> suffix can shift, when a dataset adds or drops a newer row with the
 *                        same name and member.
 *   expense-<id>         the same tile by data id (the same rect and radius), e.g. expense-143 (Rent · partner) and
 *                        expense-142 (Rent · owner). The ids depend on the dataset: BYBApp.captureData["es-419"]
 *                        renumbers the rows, so its partner Rent is expense-144, and a --compare --lang es-419 finds
 *                        no expense-143 on that row
 *   empty-state          the 🗓️ "Nothing logged this month" block (a category with no rows)
 */
(function () {
  "use strict";

  const A = window.BYBApp;

  // "YYYY-MM-DD" of a local ISO string / Date
  const pad2 = (n) => String(n).padStart(2, "0");
  const isoDay = (d) => `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
  const parseLocal = (s) => {
    const m = /^(\d{4})-(\d{2})-(\d{2})(?:T(\d{2}):(\d{2})(?::(\d{2}))?)?/.exec(String(s));
    return new Date(+m[1], +m[2] - 1, +m[3], +(m[4] || 0), +(m[5] || 0), +(m[6] || 0));
  };

  const EPS = 0.005; // kMoneyEpsilon / kAllocationEpsilon

  A.screen({
    id: "category-detail",
    title: "Category detail",
    states: {
      housing: { params: { category: "housing" } },
      groceries: { params: { category: "groceries" } },
      restaurants: { params: { category: "restaurants" } },
      utilities: { params: { category: "utilities" } },
    },
    captures: {
      housing: "02_housing_detail",
      groceries: "02_groceries_detail",
    },

    render(ctx) {
      const { kit, fmt, data } = ctx;
      const cat = data.category[ctx.params.category || "housing"] || data.category.housing;
      const month = data.month;
      // _money(): symbol + decimalPattern(numeric locale) with the currency's 2 digits
      const money = (n) => fmt.money(n);

      const rows = data.q.expenses({ month, category: cat.id });
      const spent = data.q.sum(rows);
      const planned = cat.plan;
      const over = planned - spent < 0;

      // ---------------------------------------------------------------- header (_header)
      const head =
        `<div class="cd-head" data-pop="detail-header">` +
        `<div class="cd-bar">` +
        `<div class="cd-close" data-pop="close-button">${ctx.icon("Icons.close_rounded")}</div>` +
        `<div class="cd-title" data-pop="category-title-slot"><div class="cd-fit" data-pop="category-title">${kit.text(ctx.t(cat.name), { size: 17, weight: 700, lines: 1, align: "center", color: "var(--ink)" })}</div></div>` +
        `<div class="cd-edit" data-pop="edit-button">${kit.text(ctx.t("commonEdit"), { size: 15, weight: 600, lh: 1.210227, ls: 0.3, color: "var(--primary)" })}</div>` +
        `</div>` +
        `<div class="cd-spent" data-pop="spent-header">` +
        // category_detail_view.dart:530 localizedUpper (the hero label), not plain toUpperCase
        kit.sectionLabel(fmt.upperLocalized(ctx.t("plannerHeroSpentLabel")), { variant: "members" }) +
        `<div class="cd-amount" data-pop="spent-amount">${kit.money(money(spent), 34, { color: over ? "var(--red)" : "var(--ink)" })}</div>` +
        `<div class="cd-planned" data-pop="planned-line">${kit.text(ctx.t("plannerHeroOfPlanned", { planned: money(planned) }), { size: 13, color: "var(--ink-sub)" })}</div>` +
        `</div></div>`;

      // ---------------------------------------------------------------- MemberSharesSection (category variant)
      const split = cat.split && Object.values(cat.split).some((v) => Math.abs(v) > EPS) ? cat.split : null;
      // the budget's members, the viewer first (orderedForViewer)
      const members = [...data.members].sort((a, b) => (a.id === data.signedIn ? -1 : b.id === data.signedIn ? 1 : 0));
      const memberCount = members.length;
      const denominator = !split && memberCount > 1 ? "none" : "share";

      const card = (m) => {
        const income = split ? split[m.id] || 0 : planned;
        const mSpent = (cat.spentBy && cat.spentBy[m.id]) || 0;
        const hasCeiling = income > 0; // denominator is never "income" inside a category
        const isOver = mSpent - income > EPS && hasCeiling;
        const usage = income <= 0 ? (mSpent > 0 ? 1 : 0) : Math.min(Math.max(mSpent / income, 0), 1);
        const ringColor = !hasCeiling
          ? "var(--ink-sub)"
          : denominator === "share"
            ? kit.categoryRingColor(mSpent, income)
            : kit.spendColor(mSpent, income);
        const lines = denominator !== "none" && hasCeiling
          ? [{
            text: isOver ? ctx.t("plannerMembersOverShare") : ctx.t("plannerMembersOfIncome", { income: money(income) }),
            color: isOver ? "var(--red)" : undefined,
          }]
          : [];
        return kit.ringCard({
          kind: "member",
          pop: `member-${m.id}`,
          value: hasCeiling ? usage : 0,
          ringColor,
          avatar: kit.avatar({ size: 52, src: m.avatar, tint: kit.memberTint(m.paletteIndex) }),
          title: ctx.d(m.name),
          amount: money(mSpent),
          amountColor: isOver ? "var(--red)" : undefined,
          lines,
        });
      };

      let membersHtml = "";
      if (memberCount >= 2) {
        const pairs = [];
        for (let i = 0; i < members.length; i += 2) pairs.push(members.slice(i, i + 2));
        membersHtml =
          `<div class="cd-members">` +
          // the same MemberSharesSection as the Budget screen (category_detail_view.dart:428) → localizedUpper
          `<div class="cd-members-label"><div class="cd-fit" data-pop="who-spending">${kit.sectionLabel(fmt.upperLocalized(ctx.t("plannerMembersTitle")), { variant: "members" })}</div></div>` +
          pairs.map((p, i) => `<div class="cd-pair-row">${kit.pair(p.map(card), { pop: i === 0 ? "member-cards" : undefined })}</div>`).join("") +
          `</div>`;
      }

      // ---------------------------------------------------------------- _splitAction
      let splitHtml = "";
      if (memberCount > 1) {
        const allocated = split ? Object.values(split).reduce((s, v) => s + v, 0) : 0;
        const unallocated = planned - allocated;
        const overAllocated = unallocated < -EPS;
        const tip = !split && planned > 0
          ? `<div class="cd-tip" data-pop="split-tip">` +
            kit.text(ctx.t("categorySplitTipTitle"), { size: 13, weight: 700, color: "var(--ink)" }) +
            kit.text(ctx.t("categorySplitTipBody", { amount: money(planned) }), { size: 12.5, lh: 1.45, color: "var(--ink-sub)", cls: "cd-tip-body" }) +
            `</div>`
          : "";
        // the Text stretches across the column (covered-note-row); covered-note hugs the centred line
        const note = split
          ? `<div class="cd-note" data-pop="covered-note-row"><div class="cd-fit" data-pop="covered-note">` + kit.text(
            overAllocated
              ? ctx.t("categorySplitOverAllocated", { amount: money(Math.abs(unallocated)) })
              : unallocated <= EPS
                ? ctx.t("categorySplitAllCovered")
                : ctx.t("categorySplitUnallocated", { amount: money(unallocated) }),
            { size: 12, align: "center", color: overAllocated ? "var(--red)" : "var(--ink-sub)" }) + `</div></div>`
          : "";
        splitHtml = `<div class="cd-split">${tip}${kit.primaryButton(ctx.t("categorySplitCta"), { pop: "split-button" })}${note}</div>`;
      }

      // ---------------------------------------------------------------- TransList / _empty
      let listHtml;
      if (!rows.length) {
        listHtml =
          `<div class="cd-empty" data-pop="empty-state">` +
          `<div class="cd-empty-emoji">${kit.emojiSpan("🗓️", 34, 1.5)}</div>` +
          kit.text(ctx.t("memberExpensesEmptyTitle"), { size: 16, weight: 700, align: "center", color: "var(--ink)" }) +
          `</div>`;
      } else {
        const now = parseLocal(data.now);
        const today = isoDay(now);
        const yesterday = isoDay(new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1));
        const shared = memberCount > 1;
        const items = [];
        // semantic row ids: expense-<name>-<member>, -2, -3… for repeats (newest first), stable across datasets
        const kebab = (s) => String(s).replace(/([a-z0-9])([A-Z])/g, "$1-$2").replace(/[^A-Za-z0-9]+/g, "-").toLowerCase();
        const seen = new Map();
        const rowId = (e) => {
          const base = `expense-${kebab(e.name)}${e.member ? `-${kebab(e.member)}` : ""}`;
          const n = (seen.get(base) || 0) + 1;
          seen.set(base, n);
          return n === 1 ? base : `${base}-${n}`;
        };
        for (const day of data.q.byDay(rows)) {
          const label = day.day === today
            ? ctx.t("timeframesToday")
            : fmt.date(day.day, day.day === yesterday ? "yMMMd" : "yMMMMd");
          // the padded header is the slot; the pop-out anchor is its content row (see .cd-day in the css)
          items.push(
            `<div class="cd-day" data-pop="date-header-${day.day}-slot">` +
            kit.dayHeader(label, fmt.money(day.total, { intl: true }), { pop: `date-header-${day.day}` }) +
            `</div>`);
          for (const e of day.rows) {
            const c = data.category[e.category] || cat;
            const author = shared && e.member ? data.members.find((m) => m.id === e.member) : null;
            items.push(`<div class="cd-xrow" data-pop="${rowId(e)}">` + kit.expenseTile({
              pop: `expense-${e.id}`,
              emoji: c.emoji,
              color: c.color,
              title: ctx.d(e.name),
              category: ctx.t(c.name),
              date: fmt.date(e.date, "MMMd"),
              recurrent: !!e.recurrent,
              author: author
                ? { name: ctx.d(author.name), avatar: kit.avatar({ size: 16, src: author.avatar, tint: kit.memberTint(author.paletteIndex) }) }
                : null,
              amount: fmt.money(e.amount, { intl: true }),
            }) + `</div>`);
          }
        }
        listHtml = `<div class="cd-list" data-pop="expense-list">${items.join("")}</div>`;
      }

      return (
        `<div class="cd-page">${head}` +
        `<div class="cd-viewport"><div class="app-scroll">${membersHtml}${splitHtml}${listHtml}</div></div>` +
        `</div>`
      );
    },
  });
})();
