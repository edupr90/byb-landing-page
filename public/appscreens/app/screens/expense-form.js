/* New expense — AddTransactionPage (lib/ui/widgets/Expenses/add_transaction.dart), recreated for the store images.
 *
 * Flutter source (lib/ui/widgets/common/revamp_form.dart), top to bottom:
 *   RevampScaffold: SafeArea · 52pt bar (✕ · centred 15/600 title · 44 slot, 1px hairline) · scroll body · pinned bar
 *   header RevampAmountBlock: page ground, padding 20 22 20 20, bottom hairline; RevampSectionLabel · 6 ·
 *     Row(baseline)[symbol · 6 · Expanded(TextField)] in RevampTokens.amountStyle (moneyStyle 44)
 *   Padding(20): RevampGroup × 4 (label · 8 · group surface · 22 below)
 *     Details   RevampFieldRow name (no chevron) · RevampRow date (value + chevron) · RevampValueRow category
 *               (24pt identity tile · 8 · value · chevron)
 *     Receipt   ReceiptAttachmentSection(style: rows): "Attach a photo" (chevron) · divider · "Scan receipt" (accent
 *               action + subtitle; the BYB+ tag only when not premium)
 *     Notes     RevampTextArea (min 56, hint "Optional")
 *     Repeat    RevampToggleRow (off)
 *   actions     page ground, 1px top hairline, padding 20 12 20 (20 + 34 home indicator): RevampPrimaryButton
 *
 * States
 *   new    the form as captured: amount 64.50, name ctx.d(data.newExpense.name), today's date, Restaurants, never
 *          saved, no caret                                                     raw/<lang>/07_expenses_new_form
 * params
 *   pro    false shows the BYB+ tag on "Scan receipt" (receipt_attachment_section.dart:992). Default true, as captured.
 *
 * Pop-out anchors (data-pop)
 *   form-bar         the 52pt bar under the status bar (✕ · "New expense")
 *   close-button     the ✕ circle
 *   amount-hero      the AMOUNT block, edge to edge, including its bottom hairline
 *   amount-value     the "$ 64.50" row
 *   details-group    the Details group with its DETAILS label
 *   form-fields      the grouped Details card (name / date / category rows, border included)
 *   field-name       the Expense name row
 *   field-date       the Date row
 *   field-category   the Category row
 *   receipt-group    the RECEIPT label + card (receipt scanning is BYB+ — keep it out of free-feature crops)
 *   receipt-attach   the "Attach a photo" row
 *   receipt-scan     the "Scan receipt" row (accent label + subtitle)
 *   notes-group      the NOTES label + card
 *   notes-field      the notes text area ("Optional")
 *   repeat-group     the REPEAT label + card
 *   repeat-toggle    the "Save as recurring" row with its switch
 *   action-bar       the pinned bottom bar (hairline, padding, button)
 *   save-button      the "Save expense" button
 */
(function () {
  "use strict";

  // RevampGroup: label · 8 · one group surface of rows with 16-inset dividers · 22 below
  // The label is a RevampSectionLabel (revamp_form.dart:622), which uppercases through localizedUpper — so it
  // is cased HERE, not by k-label's CSS text-transform: the browser cases with the DOCUMENT's language, which
  // spells the Turkish "Fiş" "FIŞ" where the app draws "FİŞ".
  const group = (ctx, label, rows, pop, bodyPop) =>
    `<div class="k-group" data-pop="${pop}">${ctx.kit.sectionLabel(ctx.fmt.upperLocalized(label))}` +
    `<div class="k-group-body"${bodyPop ? ` data-pop="${bodyPop}"` : ""}>${rows.join(`<div class="k-divider"></div>`)}</div></div>`;

  BYBApp.screen({
    id: "expense-form",
    title: "New expense",
    states: {
      new: {},
    },
    captures: {
      new: "07_expenses_new_form",
    },
    render(ctx) {
      const { kit, fmt, data } = ctx;
      const nx = data.newExpense;
      const cat = data.category[nx.category] || kit.category(nx.category);

      const bar = `<div class="xf-top">${kit.revampBar({ title: ctx.t("addTxTitle"), safe: true, pop: "form-bar", leading: kit.closeButton({ pop: "close-button" }) })}</div>`;

      // RevampAmountBlock: the symbol and the digits in the same moneyStyle(44), baseline-aligned, 6 apart
      const amount =
        `<div class="xf-amount" data-pop="amount-hero">${kit.sectionLabel(fmt.upperLocalized(ctx.t("addTxFieldsAmount")))}` +
        `<div class="xf-amount-row" data-pop="amount-value">${kit.money(fmt.symbol, 44, { cls: "xf-symbol" })}` +
        `${kit.money(fmt.number(nx.amount, fmt.currencyDigits), 44, { cls: "xf-digits" })}</div></div>`;

      const details = group(ctx, ctx.t("addTxSectionDetails"), [
        // RevampFieldRow: a TextField (M3 input style = bodyLarge geometry, letterSpacing 0.5) right-aligned, no chevron
        kit.row({ label: ctx.t("addTxFieldsName"), value: ctx.d(nx.name), pop: "field-name", cls: "xf-field" }),
        kit.row({ label: ctx.t("addTxFieldsDate"), value: fmt.date(nx.date, "yMMMd"), tabular: true, chevron: true, pop: "field-date" }),
        kit.row({
          label: ctx.t("addTxFieldsCategory"),
          value: ctx.t(cat.name || cat.nameKey),
          leading: kit.identityTile(cat.emoji, cat.color),
          chevron: true,
          pop: "field-category",
        }),
      ], "details-group", "form-fields");

      const receipt = group(ctx, ctx.t("receiptSectionTitle"), [
        kit.row({ label: ctx.t("receiptAttachCta"), chevron: true, pop: "receipt-attach" }),
        kit.row({
          label: ctx.t("receiptScanCta"),
          subtitle: ctx.t("receiptScanSubtitleShort"),
          action: true,
          fixed: true,
          pop: "receipt-scan",
          trailing: ctx.params.pro === false
            ? `<div class="xf-premium">${kit.text(fmt.upper(ctx.t("commonPremium")), { size: 9.5, weight: 600, ls: 0.6 })}</div>`
            : "",
        }),
      ], "receipt-group");

      const notes = group(ctx, ctx.t("addTxFieldsNotesSection"), [
        `<div class="xf-textarea" data-pop="notes-field">${kit.text(ctx.t("commonOptional"), { size: 14.5, weight: 400, lh: 1.45, ls: 0.5, cls: "xf-hint" })}</div>`,
      ], "notes-group");

      const repeat = group(ctx, ctx.t("addTxSectionRepeat"), [
        kit.toggleRow({ label: ctx.t("addTxRecurringToggle"), subtitle: ctx.t("addTxRecurringToggleSubtitle"), on: false, pop: "repeat-toggle" }),
      ], "repeat-group");

      const actions = `<div class="xf-actions" data-pop="action-bar">${kit.primaryButton(ctx.t("addTxCtaAdd"), { pop: "save-button" })}</div>`;

      return (
        `<div class="xf-viewport"><div class="app-scroll">${amount}<div class="xf-groups">${details}${receipt}${notes}${repeat}</div></div></div>` +
        bar +
        actions
      );
    },
  });
})();
