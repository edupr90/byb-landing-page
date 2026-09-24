/* Number, currency and date formatting for the HTML app screens, matching the Flutter app byte for byte.
 *
 * Registers one BYBApp.locale(lang, cfg) per store language. ctx.fmt in a screen's render is cfg.fmt.
 *
 *   store lang   Dart locale (Localizations.localeOf → dates, percents)   currency → numeric locale (amounts)
 *   en           "en"                                                     USD → "en_US"
 *   es-419       "es"                                                     USD → "en_US"
 *   ja           "ja"                                                     JPY → "ja_JP" (Dart resolves it to "ja")
 *   fr-FR        "fr"                                                     EUR + UI language fr → "fr_FR" (→ "fr")
 *   it-IT        "it"                                                     EUR + UI language it → "it_IT" (→ "it")
 *   de-DE        "de"                                                     EUR + UI language de → "de_DE" (→ "de")
 *   pt-BR        "pt"                                                     BRL → "pt_BR" (Dart keeps the region)
 *   tr-TR        "tr"                                                     TRY → "tr_TR" (Dart resolves it to "tr")
 *   ko           "ko"                                                     KRW → "ko_KR" (Dart resolves it to "ko")
 *   zh-Hant      "zh" for dates · "zh_TW" for percents (L10n.intlLocale)  TWD → "zh_TW" (Dart keeps the region)
 *
 * Why two locales: an AMOUNT is written the way the user's currency is written — the app runs every one of them
 * through the currency's own numeric locale (lib/core/data/currency_locale_data.dart:96 numericLocaleForCurrency)
 * — while a DATE and a PERCENT are written in the language on screen. So the Spanish screens read "$2,371.26" and
 * "15 de septiembre de 2026", and the euro screens read "2.370,36 €" in Italian against "2 370,36 €" in French.
 * The euro and the Swiss franc are the currencies whose numeric locale depends on the UI language (that table's
 * _byAppLanguage: EUR + "fr" → "fr_FR", + "it" → "it_IT", + "de" → "de_DE", + "en" → "en_IE"), so makeFmt passes
 * the dartLocale's language code the way the app passes L10n.languageCode.
 * Brazil is the first store language whose numeric locale KEEPS its region: intl ships a real pt_BR row, so where
 * "ja_JP" shortens to ja and "de_DE" to de, "pt_BR" stays "pt_BR". Amounts are NUMBER_DATA.pt_BR, dates are
 * DATE_DATA.pt and percents are NUMBER_DATA.pt — which is why that alias below is not decoration.
 * Chinese is the first store language whose DATES and PERCENTS are not in one locale, and it was settled from the
 * source, not assumed. A date site passes Localizations.localeOf(context).toString() — for the app's Locale('zh')
 * that is "zh" — while number_labels.dart:35 percentLabel passes L10n.intlLocale, and l10n.dart _toIntlLocale maps
 * a bare zh to "zh_TW" ("the Chinese this app ships is Taiwanese Traditional"). For every earlier language the two
 * were the same string. So cfg.intlLocale exists: "zh_TW" for zh-Hant, the dartLocale for everyone else. What it
 * changes on screen: percents, nothing — intl's zh and zh_TW percent patterns and symbols are identical apart from
 * NaN — but a date in "zh" is FLUTTER's 'zh' row (mainland: 周二, 九月, 公元, 24-hour "09:41"), where zh_TW's would
 * read 週二, 9月, 西元, "上午9:41". The replica draws what the app draws: the "zh" row (DATE_DATA.zh says where).
 *
 * ── The 2026-09-17 fix this file mirrors ────────────────────────────────────────────────────────────────────
 * Adding the yen and the euro exposed four bugs in the app itself, all fixed in Dart that day; this file was
 * rewritten to match. What changed, and what it means for a screen:
 *
 *   1. MONEY PLACEMENT. Every screen used to build money as `currencySymbol` glued IN FRONT of a
 *      NumberFormat.decimalPattern figure. Right for the dollar, wrong for every currency whose locale trails
 *      its symbol. lib/core/data/currency_format.dart:110 MoneyFormat now lets one NumberFormat.simpleCurrency
 *      in the currency's numeric locale compose the whole string: "$2,370.36" · "2 370,36 €" · "2.370,36 €" ·
 *      "¥2,370". USD is byte-identical except a NEGATIVE, which was "$-412.50" and is now "-$412.50".
 *      Consequence here: money() and the old money({ intl: true }) are the SAME formatter now, and so are
 *      money({ digits: 0 }) and the old money({ intl: true, digits: 0 }).
 *   2. THE "vs last month" BADGE. expenses_view.dart:251 used NumberFormat.currency(symbol:…, decimalDigits: 0)
 *      with NO locale, i.e. always en_US: a French user read "€1,339". It is MoneyFormat.formatWhole now.
 *      The Expenses chart tooltip (spending_comparison_chart.dart) was hard-coded to 2 decimals and printed
 *      "¥2,370.36"; it takes a MoneyFormat too, so the yen has no decimals there either.
 *   3. PERCENTS. Dart built them by hand — '${v.toStringAsFixed(1)}%' — which is English punctuation in every
 *      language, beside ARB strings that already wrote "{pct} % utilisés". lib/core/l10n/number_labels.dart:21
 *      percentLabel is NumberFormat.percentPattern(L10n.intlLocale): "36.1%" (en, ja) · "36,1 %" (es, fr, with
 *      a NARROW no-break space) · "36,1%" (it). Percents that go INTO an ARB placeholder which carries its own
 *      "%" still get a bare number — that is fmt.round / fmt.number here, not fmt.percent.
 *   4. MONTH LABELS. The literal patterns DateFormat('MMMM yyyy') / DateFormat('MMM yyyy') became the skeletons
 *      DateFormat.yMMMM / DateFormat.yMMM. English, French and Italian are unchanged; Japanese goes from
 *      "9月 2026" to "2026年9月", and SPANISH gains a preposition: "septiembre de 2026", not "septiembre 2026".
 *      A screen must ask for "yMMMM" / "yMMM", never the old literal patterns — those still format, because
 *      they are legal intl patterns, but they no longer mirror anything the app draws.
 *
 * ctx.fmt API (n is a double; d is a Date, "2026-09-15" / "2026-09-15T09:41", [2026, 9, 15, 9, 41] with a
 * 1-based month like Dart's DateTime, or epoch ms). The USD column is en, the EUR one it-IT.
 *
 *   money(n)                          "$2,370.36" · "2.370,36 €"   currency_format.dart:142 MoneyFormat.format —
 *                                     NumberFormat.simpleCurrency(name: code, locale: numeric). The screens'
 *                                     default: planner_view.dart:715 _formatters().money (Budget hero, "of
 *                                     $4,080.00 planned", member cards), planning_category_list.dart:78 (ring
 *                                     cards), planning_pie_chart.dart:686 (ring tooltip), category_detail_view
 *                                     .dart:197, month_spent.dart:150 (Expenses hero), insights_shared.dart:78
 *                                     InsightsMoney.format, and the sites that always called simpleCurrency
 *                                     themselves: trans_list.dart:245 (expense rows, day totals),
 *                                     compare_month_view.dart:189, current_month_view.dart:215
 *   money(n, { digits: 0 })           "$1,339" · "1.339 €"         :146 MoneyFormat.formatWhole — the same
 *                                     formatter with the fraction digits pinned. planner_view.dart:716 money0
 *                                     and expenses_view.dart:251 (the two vs-last-month badges),
 *                                     insights_shared.dart:82 InsightsMoney.formatWhole
 *   money(n, { signed: true })        "+$4,528.74" · "-412,50 €"   :151 MoneyFormat.formatSigned (Insights Net).
 *                                     intl writes the minus itself, on the side the locale puts it; only the
 *                                     "+" is added
 *   money(n, { compact: true })       "$8.28K" · "8280 €"          NumberFormat.compactSimpleCurrency(numeric),
 *                                     last_three_month_chart.dart:77 (compactCurrency with the same symbol,
 *                                     income_expenses_chart.dart:65, is identical). { locale } overrides it
 *   money(n, { stripNbsp: true })     "$2,370.36" · "2.370,36 €"   CurrencyFormatter.buildFor + stripNbsp
 *                                     (currency_format.dart:79 / :91, reports_home_view.dart:104): the symbol
 *                                     from CurrencyFormatter.symbolFor, then U+00A0 and U+202F flattened to
 *                                     plain spaces. The only money format that is NOT MoneyFormat
 *   money(n, { intl: true })          — legacy spelling, accepted, does nothing. Before the fix it picked
 *                                     intl's composition over the screen's hand-glued one; they are the same
 *                                     formatter now. Drop it from the call; it will stop being accepted
 *   compact(n)                        "4.38K" · it "4380"          NumberFormat.compact(numeric),
 *                                     compare_month_chart.dart:73. { locale: "app" } formats in the UI language
 *   number(n, digits)                 "21.7" · "21,7"              decimalPattern(numeric), min = max = digits.
 *                                     A bare figure for an ARB placeholder that writes the "%" itself:
 *                                     planning_pie_chart.dart:690 _pct1 ("21.7% of income"). Also the amount
 *                                     field of the expense form (add_transaction.dart:336) = number(n,
 *                                     currencyDigits) after fmt.symbol. { locale } as above
 *   number(n)                         "0.581" · "0,581"            decimalPattern(numeric) as is (0–3 digits)
 *   round(n)                          "58" · "-3" (for -2.5)       Dart '${n.round()}', ties away from zero.
 *                                     The other bare-figure form: planner_view.dart:785 pctUsed feeding
 *                                     l10n.plannerHeroPctUsed, expenses_view.dart:353, reports_home_view.dart
 *   fixed(n, digits)                  "-36.1" · "-36.1"            Dart n.toStringAsFixed(digits). ENGLISH
 *                                     punctuation whatever the language — no percent on a screen may use it
 *                                     any more (that is what bug 3 above was); it is kept as the Dart
 *                                     primitive for a figure that really is written in English
 *   percent(n, digits = 0, opts)      "63%" "36.1%" "+4.0%"        number_labels.dart:21 percentLabel. n is in
 *                                     PERCENT units (pass share * 100). percentPattern(L10n.intlLocale: the
 *                                     UI LANGUAGE, "zh_TW" for zh — intlLocale below) with
 *                                     min = max = digits, then intl's plain U+00A0 before "%" narrowed to the
 *                                     U+202F the ARB files were translated with. { signed: true } adds "+"
 *                                     when n >= 0. es/fr/de "63 %" "36,1 %" · it "63%" "36,1%" · ja "63%".
 *                                     insights_shared.dart:694 (Breakdown), compare_month_view.dart:411,
 *                                     current_month_view.dart:523 / :618 / :783, reports_home_view.dart:263
 *   date(d, pattern, opts)            DateFormat(pattern, UI locale).format(d). pattern is a skeleton name
 *                                     ("yMMMd" = DateFormat.yMMMd) or an explicit pattern; as in intl a pattern
 *                                     that IS a skeleton name resolves as one (DateFormat('MMM') → "LLL").
 *                                     opts.case: "upper" | "lower" | "sentence" (toUpperCase / toLowerCase /
 *                                     toBeginningOfSentenceCase); opts.locale: another Dart locale or "app".
 *       date(d, "yMMMM", { case: "upper" }) "SEPTEMBER 2026" · "SETTEMBRE 2026"  planner_view.dart:777,
 *                                     expenses_view.dart:245 (hero month labels)
 *       date(d, "yMMMM")              "September 2026" · "settembre 2026"  planning_dropdown.dart:51,
 *                                     current_month_view.dart:223 (report app-bar month), planner_view.dart:447
 *       date(d, "yMMM")               "Sep 2026" · "set 2026"  compare_month_view.dart:94 (+ :635 / :724 and
 *                                     compare_month_chart.dart:169 for the pills, KPI cards and x axis)
 *       date(d, "yMMMMd")             "September 1, 2026" · "1 settembre 2026"  trans_list.dart:527 (day header)
 *       date(d, "yMMMd")              "Sep 16, 2026" · "16 set 2026"  add_transaction.dart:116 (form Date row),
 *                                     trans_list.dart:525 (yesterday's header)
 *       date(d, "MMMd")               "Sep 1" · "1 set"      trans_list.dart:726 (expense row caption)
 *       date(d, "MMM", { case: "upper" }) "SEP" · "SET"      spending_income.dart:278 (Insights trend strip)
 *       date(d, "MMMM", { case: "sentence" }) "September" · "Settembre"  dashboard.dart:239 (Insights hero)
 *       date(d, "MMMMd")              "September 15" · "15 settembre"  largest_spend.dart:118, see_more.dart:110
 *       date(d, "h:mm a", { locale: "en_US" }) "9:41 AM"      trans_list.dart:604
 *   month(i, width = "long")          i is 0-based; "long" DateFormat.MMMM ("September" · "settembre"), "short"
 *                                     DateFormat.MMM ("Sep" · "set"), "narrow" LLLLL ("S")
 *   weekdayLabel(d)                   "Tu" · "ma"             lib/core/l10n/date_labels.dart:15 shortWeekdayLabel,
 *                                     in the dartLocale its callers pass (history_view.dart:90, ai_advice_view
 *                                     .dart:1598 — Localizations.localeOf): "周二" for zh, never zh_TW's "週二"
 *   upper(s) · lower(s) · sentence(s) Dart toUpperCase / toLowerCase / intl toBeginningOfSentenceCase (intl.dart:543)
 *   upperLocalized(s)                 "KİM NE HARCIYOR"      lib/core/l10n/text_case.dart:16 localizedUpper: dartUpper
 *                                     with the Turkish/Azeri rule (i → İ, ı → I) in front of it, and a no-op in every
 *                                     other language. NOT interchangeable with upper() — the app uppercases some of
 *                                     its eyebrows one way and some the other, so a screen copies the Dart call site
 *                                     it mirrors (the list is at localizedUpper below)
 *   symbol                            "$" · "€"  simpleCurrency(name: code, locale: numeric).currencySymbol —
 *                                     for a field affix or a chart axis, where no figure is attached
 *   currencyDigits                    2 (JPY 0)  its maximumFractionDigits: add_transaction.dart:333
 *                                     _fractionDigits, so the form's amount is number(n, currencyDigits)
 *   dartLocale "en"|"es"|"ja"|"fr"|"it"|"de"|"pt"|"tr"|"ko"|"zh" · numericLocale "en_US"|"ja_JP"|"fr_FR"|"it_IT"|
 *                                     "de_DE"|"pt_BR"|"tr_TR"|"ko_KR"|"zh_TW" · intlLocale (the percents' locale:
 *                                     the dartLocale, "zh_TW" for zh) · currencyCode · lang
 *
 * The same calls per language, from BYBApp.langData. The spaces are the real characters: below, "·" marks a
 * U+202F NARROW NO-BREAK SPACE and "~" a U+00A0 NO-BREAK SPACE, so "2·370,36~€" is fr's and "2.370,36~€" is it's.
 *
 *   en (USD, numbers en_US, dates en)
 *     money(2370.36) "$2,370.36" · money(-412.5) "-$412.50" · money(1338.58, { digits: 0 }) "$1,339"
 *     money(4528.74, { signed: true }) "+$4,528.74" · money(8280, { compact: true }) "$8.28K" · compact(4380) "4.38K"
 *     percent(63.2) "63%" · percent(36.1, 1) "36.1%" · percent(-36.1, 1, { signed: true }) "-36.1%" · round(58.1) "58"
 *     "yMMMM" (upper) "SEPTEMBER 2026" · "yMMM" "Sep 2026" · "yMMMMd" "September 1, 2026" · "yMMMd" "Sep 14, 2026"
 *     "MMMd" "Sep 1" · "MMMM" (sentence) "September" · "MMMMd" "September 15" · "jm" "9:41 AM" · weekdayLabel "Tu"
 *
 *   es-419 (USD, numbers en_US, dates es) — the amounts are the English ones; the language shows in the rest
 *     money(2370.36) "$2,370.36" · number(21.66, 1) "21.7" (en_US: the currency's locale, not Spanish)
 *     percent(63.2) "63·%" · percent(36.1, 1) "36,1·%" (the percent IS Spanish: comma, narrow space)
 *     "yMMMM" "septiembre de 2026" (the "de" is new on 2026-09-17) · "yMMMM" (upper) "SEPTIEMBRE DE 2026"
 *     "yMMM" "sept 2026" · "yMMMMd" "1 de septiembre de 2026" · "yMMMd" "14 sept 2026" · "MMMd" "1 sept"
 *     "MMMM" (sentence) "Septiembre" · "MMMMd" "15 de septiembre" · "jm" "9:41" · weekdayLabel "ma" · month(8,"short") "sept"
 *
 *   ja (JPY, numbers ja_JP, dates ja) — langData.ja is the same budget ×100. JPY has 0 fraction digits, so
 *   every money format drops the decimals (money(2370.36) rounds), and months are "9月" at every width
 *     money(237036) "¥237,036" · money(-412.5) "-¥413" · money(45700, { digits: 0 }) "¥45,700"
 *     money(452874, { signed: true }) "+¥452,874" · money(828000, { compact: true }) "¥82.8万"
 *     money(8280, { compact: true }) "¥8280" (under 10,000 ja's compact pattern is "0": the plain, ungrouped figure)
 *     compact(438000) "43.8万" · compact(400000) "40万" · compact(4380) "4380" · percent(36.1, 1) "36.1%" · round(58.1) "58"
 *     "yMMMM" "2026年9月" (was "9月 2026" before the fix) · "yMMM" "2026年9月" · "yMMMMd" / "yMMMd" "2026年9月1日"
 *     "MMMd" "9月1日" · "MMMM" (sentence) "9月" · "MMMMd" "9月15日" · "jm" "9:41" · weekdayLabel "火" · upper(s) = s
 *
 *   fr-FR (EUR, numbers fr_FR, dates fr) — U+202F groups the digits, U+00A0 stands before "€" and "k"
 *     money(2370.36) "2·370,36~€" · money(-412.5) "-412,50~€" · money(1338.58, { digits: 0 }) "1·339~€"
 *     money(4528.74, { signed: true }) "+4·528,74~€" · money(8280, { compact: true }) "8,28~k~€"
 *     money(2370.36, { stripNbsp: true }) "2 370,36 €" (plain spaces) · compact(4380) "4,38~k" · compact(438000) "438~k"
 *     percent(63.2) "63·%" · percent(36.1, 1) "36,1·%" · number(21.66, 1) "21,7" · number(64.5, currencyDigits) "64,50"
 *     "yMMMM" "septembre 2026" · (upper) "SEPTEMBRE 2026" · "yMMM" "sept. 2026" · (sentence) "Août 2026"
 *     "yMMMMd" "1 septembre 2026" (not "1er") · "yMMMd" "14 sept. 2026" · "MMMd" "1 sept." · "MMM" (upper) "SEPT."
 *     "MMMM" (sentence) "Septembre" · "MMMMd" "15 septembre" · "jm" "09:41" · weekdayLabel "ma"
 *     (di lu ma me je ve sa) · month(8,"short") "sept." · month(1,"short") "févr." · month(8,"narrow") "S"
 *
 *   it-IT (EUR, numbers it_IT, dates it) — Italian groups with a DOT, and it is the one language here that
 *   GLUES the "%" while still writing a decimal comma. Short months carry no period ("set", not "sept.")
 *     money(2370.36) "2.370,36~€" · money(-412.5) "-412,50~€" · money(1338.58, { digits: 0 }) "1.339~€"
 *     money(4528.74, { signed: true }) "+4.528,74~€" · money(2370.36, { stripNbsp: true }) "2.370,36 €"
 *     money(8280, { compact: true }) "8280~€" · compact(4380) "4380" · compact(438000) "438000" · compact(8.28e6) "8,28~Mln"
 *     (it's compact table has a plain "0" for 10^3, 10^4 and 10^5, so everything under a million is written out)
 *     percent(63.2) "63%" · percent(36.1, 1) "36,1%" · percent(-36.1, 1, { signed: true }) "-36,1%"
 *     number(21.66, 1) "21,7" · number(64.5, currencyDigits) "64,50" · round(58.1) "58"
 *     "yMMMM" "settembre 2026" · (upper) "SETTEMBRE 2026" · "yMMM" "set 2026" · (sentence) "Ago 2026"
 *     "yMMMMd" "1 settembre 2026" · "yMMMd" "14 set 2026" · "MMMd" "1 set" · "MMM" (upper) "SET"
 *     "MMMM" (sentence) "Settembre" · "MMMMd" "15 settembre" · "jm" "09:41" · weekdayLabel "ma"
 *     (do lu ma me gi ve sa) · month(8,"short") "set" · month(8,"narrow") "S" · symbol "€" · currencyDigits 2
 *
 *   de-DE (EUR, numbers de_DE, dates de) — Italian's separators with French's spacing: a DOT groups the digits,
 *   a U+00A0 stands before "€" AND before "%". Names are capitalised, and German is the one language here whose
 *   FORMAT short forms differ from its STANDALONE ones — a date reads "Sept. 2026", month() reads "Sep"
 *     money(2370.36) "2.370,36~€" · money(-412.5) "-412,50~€" · money(1338.58, { digits: 0 }) "1.339~€"
 *     money(4528.74, { signed: true }) "+4.528,74~€" · money(2370.36, { stripNbsp: true }) "2.370,36 €"
 *     money(8280, { compact: true }) "8280~€" · compact(4380) "4380" · compact(438000) "438000" · compact(8.28e6) "8,28~Mio."
 *     (de's compact table has a plain "0" for 10^3, 10^4 and 10^5 as it's does, so "8280", never "8,28 Tsd.")
 *     percent(63.2) "63·%" · percent(36.1, 1) "36,1·%" · percent(-36.1, 1, { signed: true }) "-36,1·%"
 *     number(21.66, 1) "21,7" · number(64.5, currencyDigits) "64,50" · round(58.1) "58"
 *     "yMMMM" "September 2026" · (upper) "SEPTEMBER 2026" · "yMMM" "Sept. 2026" · (sentence) "Aug. 2026"
 *     "yMMMMd" "1. September 2026" · "yMMMd" "14. Sept. 2026" · "MMMd" "1. Sept." · "MMM" (upper) "SEP"
 *     "MMMM" (sentence) "September" · "MMMMd" "15. September" · "jm" "09:41" · weekdayLabel "Di"
 *     (So Mo Di Mi Do Fr Sa) · month(8,"short") "Sep" · month(2,"short") "Mär" · month(8,"narrow") "S" · symbol "€"
 *
 *   pt-BR (BRL, numbers pt_BR, dates pt) — langData["pt-BR"] is the same budget ×3, so the figures below are the
 *   Brazilian ones (the scale was ×5 until 2026-09-17; slides/05-sync.js records why it moved). Italian's
 *   separators (dot groups, decimal comma) with the symbol in FRONT and a U+00A0 after it, and Italian's glued
 *   "%". It is the one language here whose compact table writes WORDS at 10^3 — "24,8 mil" where it and de
 *   print "24840" — and the only numeric locale that keeps its region (pt_BR, not pt)
 *     money(7111.08) "R$~7.111,08" · money(-1237.5) "-R$~1.237,50" · money(4015.74, { digits: 0 }) "R$~4.016"
 *     money(13586.22, { signed: true }) "+R$~13.586,22" · money(7111.08, { stripNbsp: true }) "R$ 7.111,08"
 *     money(24840, { compact: true }) "R$~24,8~mil" · money(8280, { compact: true }) "R$~8,28~mil"
 *     compact(24840) "24,8~mil" · compact(4380) "4,38~mil" · compact(1314000) "1,31~mi"
 *     percent(63.2) "63%" · percent(36.1, 1) "36,1%" · percent(-36.1, 1, { signed: true }) "-36,1%"
 *     number(21.66, 1) "21,7" · number(64.5, currencyDigits) "64,50" · round(58.1) "58"
 *     "yMMMM" "setembro de 2026" · (upper) "SETEMBRO DE 2026" · "yMMM" "set. de 2026" · (sentence) "Ago. de 2026"
 *     "yMMMMd" "1 de setembro de 2026" · "yMMMd" "14 de set. de 2026" · "MMMd" "1 de set." · "MMM" (upper) "SET."
 *     "MMMM" (sentence) "Setembro" · "MMMMd" "15 de setembro" · "jm" "09:41" · weekdayLabel "te"
 *     (do se te qu qu se sá — pt is the first language here whose two-grapheme weekday labels COLLIDE, seg./sex.
 *     both "se" and qua./qui. both "qu"; no exported image draws a weekday strip, see README "App issues noticed")
 *     month(8,"short") "set." · month(1,"short") "fev." · month(8,"narrow") "S" · symbol "R$" · currencyDigits 2
 *
 *   tr-TR (TRY, numbers tr_TR → tr, dates tr) — langData["tr-TR"] is the same budget ×15, so the figures below are
 *   the Turkish ones. Italian's and German's separators (a DOT groups, the decimal is a comma) with BOTH signs in
 *   FRONT and glued on with no space at all: intl writes the lira as the two ASCII letters "TL" — never ₺, which
 *   appears nowhere in the app — and Turkish is the one language here whose "%" PRECEDES the figure, so percent()'s
 *   U+00A0 → U+202F narrowing can never fire and no Turkish output holds a U+202F. Compact reverses the money
 *   pattern, trailing the symbol behind a U+00A0, and unlike it and de it HAS an exponent-3 entry, so thousands
 *   compact ("124~B") instead of being written out
 *     money(35555.4) "TL35.555,40" · money(-6187.5) "-TL6.187,50" · money(20078.7, { digits: 0 }) "TL20.079"
 *     money(67931.1, { signed: true }) "+TL67.931,10" · money(35555.4, { stripNbsp: true }) "TRY35.555,40"
 *     (the one money format whose symbol is NOT "TL": CurrencyFormatter.symbolFor has no TRY case and returns the code)
 *     money(124200, { compact: true }) "124~B~TL" · money(8280, { compact: true }) "8,28~B~TL"
 *     money(967.5, { compact: true }) "TL968" (under 10³ the fallback keeps the full pattern: symbol in front, glued)
 *     compact(124200) "124~B" · compact(4380) "4,38~B" · compact(8.28e6) "8,28~Mn"
 *     percent(63.2) "%63" · percent(36.1, 1) "%36,1" · percent(-36.1, 1, { signed: true }) "-%36,1"
 *     number(21.66, 1) "21,7" · number(967.5, currencyDigits) "967,50" · round(58.1) "58"
 *     "yMMMM" "Eylül 2026" · (upper) "EYLÜL 2026" · "yMMM" "Eyl 2026" · (sentence) "Ağu 2026" (already capital:
 *     Turkish month and weekday names are, so { case: "sentence" } on one is a no-op) · "yMd" "15.09.2026"
 *     "yMMMMd" "1 Eylül 2026" · "yMMMd" "14 Eyl 2026" · "MMMd" "1 Eyl" · "MMM" (upper) "EYL" · "MMMM" (sentence) "Eylül"
 *     "MMMMd" "15 Eylül" · "jm" "09:41" (24-hour everywhere, so the AMPMS ÖÖ/ÖS never render) · weekdayLabel "Sa"
 *     (Pa Pz Sa Ça Pe Cu Cm — all seven distinct) · month(8,"short") "Eyl" · month(3,"short") "Nis"
 *     month(8,"narrow") "E" · symbol "TL" · currencyDigits 2
 *     upper("Kim ne harcıyor") "KIM NE HARCIYOR" · upperLocalized(…) "KİM NE HARCIYOR" — the app draws both, at
 *     different call sites (fewer of the first since planner_view.dart:706 was fixed on 2026-09-17), and 1,308
 *     of app_tr.arb's 2,030 messages come out differently under the two
 *
 *   ko (KRW, numbers ko_KR → ko, dates ko) — langData.ko is the same budget ×900, so the figures below are the
 *   Korean ones. Korean takes en_US's separators exactly (comma groups, decimal point) with "₩" IN FRONT and
 *   glued, and a GLUED "%", so a Korean percent is byte for byte an English one. KRW has 0 fraction digits as the
 *   yen does, so every money format drops the decimals — and money({ digits: 0 }) and money({ stripNbsp: true })
 *   are then the SAME STRING as money(), the first language here where all three coincide (symbolFor returns the
 *   same ₩ U+20A9 intl does, so there is no lira-style split to reconcile). Korean is also the first language in
 *   this set whose numeric output holds NO SPACE AT ALL: not a U+202F, not a U+00A0, not a plain one
 *     money(2133324) "₩2,133,324" · money(-371250) "-₩371,250" · money(1204722, { digits: 0 }) "₩1,204,722"
 *     money(4075866, { signed: true }) "+₩4,075,866" · money(2133324, { stripNbsp: true }) "₩2,133,324"
 *     money(58050) "₩58,050" · money(18630000) "₩18,630,000" (11 code points — the widest money in the set)
 *     money(7452000, { compact: true }) "₩745만" · money(8280, { compact: true }) "₩8.28천" (unscaled, to show the
 *     10³ bucket ja has not got) · money(967.5, { compact: true }) "₩968" (under 10³ the fallback keeps the full
 *     pattern, symbol in front and glued) · compact(3942000) "394만" · compact(900000) "90만"
 *     compact(438000) "43.8만" · compact(4380) "4.38천" (ko's exponent-3 IS a suffix, "0천", so thousands compact
 *     where ja, it and de write them out; with no exponent-6 entry a million won divides by 10⁴ and reads in 만)
 *     percent(63.2) "63%" · percent(36.1, 1) "36.1%" · percent(-36.1, 1, { signed: true }) "-36.1%"
 *     number(21.66, 1) "21.7" · number(58050, currencyDigits) "58,050" (currencyDigits is 0, so the expense
 *     form's amount field carries no ".00" — ja's case) · round(58.1) "58" · fixed(-36.1, 1) "-36.1"
 *     "yMMMM" "2026년 9월" · (upper) "2026년 9월" · "yMMM" "2026년 9월" (the same pattern over the same month
 *     string, so the Budget hero and a compare pill read alike) · (sentence) "2026년 8월"
 *     "yMMMMd" "2026년 9월 1일" · "yMMMd" "2026년 9월 14일" · "MMMd" "9월 1일" · "MMM" (upper) "9월"
 *     "MMMM" (sentence) "9월" · "MMMMd" "9월 15일" · "yMd" "2026. 9. 15." · "yM" "2026. 9." · "Md" "9. 15."
 *     (the numeric skeletons all END IN A PERIOD — CLDR's, not a typo) · "jm" "오전 9:41" (12-hour with the marker
 *     IN FRONT; en is the only other language here whose AMPMS render at all, and it trails its marker)
 *     weekdayLabel "화" (일 월 화 수 목 금 토 — all seven distinct, one grapheme each) · month(8,"long") "9월"
 *     month(8,"short") "9월" · month(8,"narrow") "9월" (ko keeps the 월 at narrow, where ja's is a bare "9")
 *     symbol "₩" · currencyDigits 0 · upper(s) = lower(s) = sentence(s) = s on any Hangul string
 *
 *   zh-Hant (TWD, numbers zh_TW, percents zh_TW, dates zh) — langData["zh-Hant"] is the same budget ×30, so the
 *   figures below are the Taiwanese ones. zh_TW takes en_US's separators and currency pattern exactly, so money is
 *   "NT$" (intl's TWD symbol, three ASCII characters) glued IN FRONT, and TWD keeps TWO fraction digits — unlike the
 *   yen and the won, every amount shows cents. Like Korean, no numeric output holds a space of any kind. Compact
 *   counts in the TRADITIONAL 萬 / 億 / 兆 with ja's plain "0" at 10³, so a figure under 10,000 is written out
 *   ungrouped. Dates are the mainland "zh" row (see DATE_DATA.zh): numeric skeletons, but 九月 for a bare month,
 *   周 for a weekday and a 24-hour clock
 *     money(71110.8) "NT$71,110.80" · money(-12375) "-NT$12,375.00" · money(40157.4, { digits: 0 }) "NT$40,157"
 *     money(135862.2, { signed: true }) "+NT$135,862.20" · money(27000) "NT$27,000.00" (the owner's rent)
 *     money(71110.8, { stripNbsp: true }) "TWD71,110.80" (the lira's split again: symbolFor has no TWD case)
 *     money(248400, { compact: true }) "NT$24.8萬" · money(8280, { compact: true }) "NT$8280" (unscaled, under 10⁴)
 *     money(967.5, { compact: true }) "NT$968" · compact(131400) "13.1萬" · compact(4380) "4380" · compact(1.2e6)
 *     "120萬" · compact(1.5e8) "1.5億" · compact(131400, { locale: "app" }) "13.1万" (the MAINLAND zh row: never use it)
 *     percent(63.2) "63%" · percent(36.1, 1) "36.1%" · percent(-36.1, 1, { signed: true }) "-36.1%"
 *     number(21.66, 1) "21.7" · number(1935, currencyDigits) "1,935.00" · round(58.1) "58" · fixed(-36.1, 1) "-36.1"
 *     "yMMMM" "2026年9月" · (upper) "2026年9月" · "yMMM" "2026年9月" · "yMMMMd" "2026年9月1日" · "yMMMd" "2026年9月14日"
 *     "MMMd" "9月1日" · "MMM" (upper) "9月" · "MMMM" (sentence) "九月" — the Insights hero, where zh_TW would print
 *     "9月" · "MMMMd" "9月15日" · "yMd" "2026/9/15" · "yM" "2026年9月" · "Md" "9/15" · "jm" "09:41" / "21:41"
 *     "yMEd" "2026/9/15周二" (no separator before the weekday: the SDK's own pattern "y/M/dEEE")
 *     weekdayLabel "周二" (周日 周一 … 周六: two graphemes each, all seven distinct — date_labels.dart's comment names
 *     zh as the reason it takes UP TO two) · month(8,"long") "九月" · month(8,"short") "9月" · month(8,"narrow") "9"
 *     symbol "NT$" · currencyDigits 2 · upper / lower / sentence change only the Latin inside a string
 *     ("iCloud 同步" → sentence "ICloud 同步", Dart's answer too); "BYB+" is already upper case
 *
 * How it matches: the formatting code below is a port of package:intl 0.20.2 (NumberFormat, its pattern parser,
 * the compact formats, DateFormat and its fields, toBeginningOfSentenceCase) plus the Dart core double.round() /
 * toStringAsFixed(), running on the exact data the app has at runtime: flutter_localizations' (Flutter 3.41.4)
 * generated date symbols and skeletons (main.dart:407 initializeDateFormatting() loads intl's CLDR data, then
 * GlobalMaterialLocalizations.delegate.load overwrites the loaded locale's with Flutter's), and intl's number
 * symbols. Re-proven 2026-09-17, after the app's formatting fix and with Italian and German added, by a
 * throwaway `flutter test` (deleted): a MaterialApp per language with the app's delegates, then
 * MoneyFormat.format / formatWhole / formatSigned, compactSimpleCurrency, CurrencyFormatter.buildFor +
 * stripNbsp, NumberFormat.compact / .decimalPattern(0,1,2,raw), Dart round / toStringAsFixed, percentLabel
 * (0 and 1 decimals, signed and not), 11 date patterns × 4 cases, shortWeekdayLabel, 36 month names, and
 * toUpperCase / toLowerCase / toBeginningOfSentenceCase over every message in the language's own ARB, across
 * 1,634 amounts (every number in BYBApp.data, BYBApp.captureData and every BYBApp.langData variant, each one's
 * negative and absolute value, 0–100 in .5 steps for the percent ties, and edges up to 1.2e7) and 136 dates.
 * All 249,966 strings — 41,661 per language × 6 — equal this file's, GERMAN INCLUDED: its rows are copied
 * byte for byte from the same two SDK files (dateSymbols 'de' + datePatterns 'de', numberFormatSymbols +
 * compactNumberSymbols "de") and the probe was run for it. Running it is what caught the one thing copying
 * the rows could not: JS case mapping expands ß to "SS" where Dart leaves it (see dartUpper below), which
 * 40 values in app_de.arb would have hit.
 * PORTUGUESE was added on 2026-09-17 and re-probed the same way, narrower: the same throwaway `flutter test`
 * (deleted), a MaterialApp(Locale('pt')) with the app's delegates, then the 37 formats this file's pt-BR block
 * above lists — MoneyFormat.format / formatWhole / formatSigned, compactSimpleCurrency, stripNbsp,
 * NumberFormat.compact / .decimalPattern(1,2), percentLabel (0 and 1 decimals, signed and not), 10 date
 * patterns in 4 cases, shortWeekdayLabel over a whole week, month names at three widths — plus every one of
 * the 2,030 messages in app_pt.arb through upper / lower / sentence: 6,090 case strings. 0 diffs against this file,
 * NBSP for NBSP. Its rows are copied byte for byte from the same two SDK files (dateSymbols 'pt' +
 * datePatterns 'pt' — Flutter's 'pt' IS the Brazilian one, pt_PT is its own row — and numberFormatSymbols +
 * compactNumberSymbols "pt_BR"). Unlike German, Portuguese has no letter whose JS and Dart case mappings
 * differ, so the dartUpper parity check below passes it unchanged. Re-run it after an intl / Flutter upgrade
 * or when adding a language: same test, formats taken after initializeDateFormatting() + the delegate load, diffed against
 * node — and put the new language's own ARB through upper / lower / sentence, not only its numbers and dates.
 * TURKISH was added on 2026-09-17 and probed against real Dart directly rather than through a widget test: intl
 * 0.20.2 with flutter_localizations' generated_date_localizations.dart imported by file:// URI and its 'tr'
 * symbols and patterns installed through initializeDateFormattingCustom. 46 formats — every money, compact,
 * percent, number and date form the tr-TR block above lists, both verifiedLocale resolutions, the currency symbol
 * and the fraction digits — plus all 2,030 messages of app_tr.arb through toUpperCase, toLowerCase,
 * toBeginningOfSentenceCase('tr') AND localizedUpper. 0 diffs against this file, NBSP for NBSP. Its rows are
 * copied byte for byte from the same two SDK files (dateSymbols 'tr' + datePatterns 'tr' — Flutter has no tr_TR
 * date row at all — and numberFormatSymbols + compactNumberSymbols "tr").
 * Turkish is the language the case check could NOT have caught by counting. Like Portuguese it has no letter whose
 * JS and Dart mappings differ in LENGTH, so the code-point parity check in tools/strings.mjs passes it green — but
 * 1,308 of those 2,030 messages uppercase differently under Dart's plain toUpperCase than under the app's
 * localizedUpper, and i → I and i → İ are one code point either way. That divergence is a VALUE comparison or
 * nothing, and it is why fmt.upperLocalized was added BESIDE fmt.upper here instead of replacing it: fmt.upper is
 * the model of Dart's own locale-independent toUpperCase, which most of the app's uppercased labels really call.
 * KOREAN was added on 2026-09-17 and probed against real Dart the same way Turkish was, not through a widget
 * test: intl 0.20.2 with flutter_localizations' generated_date_localizations.dart imported by file:// URI and its
 * 'ko' symbols and patterns installed through initializeDateFormattingCustom. 1,239 format comparisons — every
 * money, compact, percent, number and date form the ko block above lists, over 29 amounts and 12 dates × 20
 * patterns × 4 cases, 36 month names, a week of shortWeekdayLabel, the currency symbol, the fraction digits and
 * both verifiedLocale resolutions (Intl.verifiedLocale("ko_KR", NumberFormat.localeExists) really does answer
 * "ko") — plus every one of app_ko.arb's 2,030 messages, 1,671 of them distinct, through toUpperCase,
 * toLowerCase, toBeginningOfSentenceCase('ko') AND localizedUpper: 6,684 more. 7,923 comparisons, 0 diffs
 * against this file. Its rows are copied byte for byte from the same two SDK files (dateSymbols 'ko' +
 * datePatterns 'ko' — Flutter has no ko_KR date row at all — and numberFormatSymbols + compactNumberSymbols "ko").
 * Korean is the language where the case checks cost nothing and prove nothing. Hangul is caseless, so upper,
 * lower, sentence and upperLocalized are all the identity on 21,193 of app_ko.arb's 31,357 characters; the 111
 * that are neither Hangul nor ASCII are punctuation and emoji; and the only cased characters in the whole file
 * are plain ASCII Latin, where JS full mapping and Dart simple mapping agree by definition. So the code-point
 * parity check in tools/strings.mjs and its casePins go green on Korean without saying anything about it —
 * German's ß and Turkish's İ are why that is worth writing down rather than assuming. What a SCREEN should take
 * from it: { case: "upper" } and { case: "sentence" } do nothing to a Korean label, exactly as in Japanese, so an
 * eyebrow that reads as an eyebrow in English only because it is uppercased gets no typographic lift here. Copy
 * ja's precedent and leave it alone; do not fake one by hand-uppercasing or spacing out the ARB.
 * TRADITIONAL CHINESE was added on 2026-09-18 and probed against real Dart the way Turkish and Korean were: a
 * throwaway Dart package (intl 0.20.2, characters 1.4.1, the app's lockfile versions) that runs main.dart's
 * initializeDateFormatting(), then what GlobalMaterialLocalizations.delegate.load runs — loadDateIntlDataIfNotLoaded,
 * which installs EVERY locale in flutter_localizations' generated_date_localizations.dart (imported by file:// URI)
 * through initializeDateFormattingCustom, not only the one being loaded — and then the app's own code copied
 * verbatim: MoneyFormat, CurrencyFormatter.symbolFor / buildFor / stripNbsp, numericLocaleForCurrency, percentLabel,
 * shortWeekdayLabel, localizedUpper and L10n._toIntlLocale, with Localizations.localeOf = Locale('zh') → "zh" and
 * L10n.intlLocale → "zh_TW". 147,814 comparisons, 0 diffs against this file: 21 forms (every money, compact,
 * number, round, fixed and percent form above, plus compactCurrency with simpleCurrency's symbol and the "app"
 * locale variants) over 3,745 amounts (every number in BYBApp.data, captureData and every langData variant, each
 * one's negative and absolute value, 0–100 in .5 steps, and the 萬 / 億 / 兆 rounding edges up to 1.2e13), 250 dates ×
 * 60 patterns (all 44 zh skeletons + 16 explicit ones) × 4 cases, "h:mm a" in en_US (trans_list.dart:604),
 * DateFormat.MMMd().add_jm() against date("MMMd") + " " + date("jm") (profile_view.dart:2361), shortWeekdayLabel
 * on every date, 36 month names, the currency symbol and digits, 8 verifiedLocale resolutions, and all 2,030
 * messages of app_zh.arb through toUpperCase, toLowerCase, toBeginningOfSentenceCase('zh') and localizedUpper.
 * The probe can see the trap: had dates followed L10n.intlLocale, 6,750 of the 15,000 date strings and all 250
 * weekday labels would have differed (九月 / 9月, 周二 / 週二, 1季度 / 第1季, "09:41" / "上午9:41"). Percents cannot:
 * zh and zh_TW format every finite percent identically, so intlLocale is right because the source says so, not
 * because an output proves it. Its rows are copied byte for byte from the same two SDK files (dateSymbols 'zh' +
 * datePatterns 'zh', numberFormatSymbols + compactNumberSymbols "zh_TW" and "zh"), by a script that first
 * regenerated all 18 existing rows of this file and matched every one.
 *
 * {locale} options take a DART locale name ("en_US", "en", "es") or "app" (the UI language's Dart locale), never
 * a store language code: { locale: "es-419" } or { locale: "fr-FR" } throws. A name resolves exactly as intl's
 * verifiedLocale resolves it in the app (intl_helpers.dart:173: as given, canonicalized "en-us" → "en_US", short
 * "en_ZZ" → "en", the deprecated pairs iw/he, in/id, no/nb, tl/fil), against the full list of locales Dart has
 * data for. If Dart would use a locale whose data is not embedded here ("es_419", "es_MX" and "en_GB" all have
 * their own in Dart), it throws instead of formatting with a neighbour's data. Embedded: dates for en / en_US /
 * es / ja / fr / it / de / pt / tr / ko / zh, numbers for en / en_US / es / ja / fr / it / de / pt / pt_BR / tr /
 * ko / zh_TW / zh (zh_TW is NOT a date row here: see DATE_DATA.zh; "zh_Hant" resolves to zh for both, as Dart
 * resolves it, though no call site of the app ever passes it)
 * ("ja_JP" resolves to ja, "fr_FR" to fr, "it_IT" to it, "de_DE" to de, "tr_TR" to tr and "ko_KR" to ko in Dart,
 * so they format with those rows here too, while "pt_BR" stays itself — intl has that row — and "pt" is an alias
 * of it; EUR in any other UI language resolves to a locale that is not embedded — es_ES, pt_PT, en_IE — and
 * throws, and so does { locale: "pt_BR" } for a DATE, which Dart has its own symbols for and this file
 * deliberately does not alias to pt, where tr and ko need no alias in either direction because Dart has neither a
 * tr_TR nor a ko_KR row at all, for dates or for numbers). Another currency or
 * language needs its rows from the Flutter SDK's flutter_localizations/lib/src/l10n/generated_date_localizations
 * .dart and intl's number_symbols_data.dart, a line in STORE_LANGS (end of this file), and the probe re-run.
 * (Resolution proven 2026-09-16 against Dart for 190 spellings and both name lists.)
 *
 * Strict arguments. Every ctx.fmt function throws "[locale.js] fmt.<fn>: …", after adding "<lang> · fmt · <fn>: …"
 * to BYBApp.missing, rather than render junk ("$∞", "+$NaN", "NaN%", an empty date, a guessed month) on:
 *   - an amount or percent that is not a finite number (undefined, null, "2370.36", NaN, Infinity);
 *   - digits that are not an integer 0–20 (percent(58, { signed: true }) — the options go after digits);
 *   - options that are not a plain object, an unknown option key (a typo like { digit: 0 }), a non-boolean flag;
 *   - money options a formatter would ignore: signed with digits, compact or stripNbsp; compact with digits or
 *     stripNbsp; stripNbsp with digits or locale; locale without compact (every other money format uses the
 *     currency's numeric locale). { intl: true } is the one spelling that is tolerated and ignored;
 *   - date() with no pattern or an empty one, an unknown case, a date it cannot read;
 *   - month() with an index outside 0–11 or a width other than "long" | "short" | "narrow";
 *   - upper / lower / sentence given a non-string; a locale with no embedded data (above).
 * A language whose registration fails (e.g. a dartLocale with no embedded date data) stays out of BYBApp.locales,
 * with the reason in BYBApp.intl.registrationErrors[lang] and BYBApp.missing; tools/strings.mjs --check fails on it,
 * and on any theme.js language that STORE_LANGS lacks.
 *
 * Not a Dart helper, but the same engine for anything else: BYBApp.intl.NumberFormat.{decimalPattern, percentPattern,
 * currency, simpleCurrency, compact, compactSimpleCurrency, compactCurrency}(…), BYBApp.intl.DateFormat(pattern,
 * locale) (a null pattern is intl's default, yMMMMd + " " + jms), BYBApp.intl.toBeginningOfSentenceCase, dartRound,
 * dartFixed, verifiedLocale(name, "date" | "number") (the name Dart would use), makeFmt(cfg), storeLangs,
 * registrationErrors. The engine behaves like Dart where the fmt layer is strict: NumberFormat.format(NaN) is "NaN",
 * a non-number throws.
 *
 * Plain JS, no DOM access: loads from <script src> (file://) and in node's vm (window or globalThis).
 */
(function () {
  "use strict";

  const G = typeof window !== "undefined" ? window : globalThis;
  const A = (G.BYBApp = G.BYBApp || {});

  const CURRENCY_SIGN = String.fromCharCode(0xa4); // ¤ in number patterns
  const PER_MILLE = String.fromCharCode(0x2030);

  // ================================================================ data
  // Date symbols + skeletons: flutter_localizations (Flutter 3.41.4) generated_date_localizations.dart, the data
  // GlobalMaterialLocalizations installs over intl's (only the fields DateFormat.format reads).
  // Numbers: intl 0.20.2 number_symbols_data.dart (numberFormatSymbols, compactNumberSymbols).

  const DATE_DATA = {
    en: {
      ERAS: ["BC", "AD"],
      ERANAMES: ["Before Christ", "Anno Domini"],
      NARROWMONTHS: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
      STANDALONENARROWMONTHS: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
      MONTHS: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      STANDALONEMONTHS: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      SHORTMONTHS: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      STANDALONESHORTMONTHS: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      WEEKDAYS: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      STANDALONEWEEKDAYS: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      SHORTWEEKDAYS: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      STANDALONESHORTWEEKDAYS: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      NARROWWEEKDAYS: ["S", "M", "T", "W", "T", "F", "S"],
      STANDALONENARROWWEEKDAYS: ["S", "M", "T", "W", "T", "F", "S"],
      SHORTQUARTERS: ["Q1", "Q2", "Q3", "Q4"],
      QUARTERS: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"],
      AMPMS: ["AM", "PM"],
      patterns: {
        "d": "d", "E": "ccc", "EEEE": "cccc", "LLL": "LLL",
        "LLLL": "LLLL", "M": "L", "Md": "M/d", "MEd": "EEE, M/d",
        "MMM": "LLL", "MMMd": "MMM d", "MMMEd": "EEE, MMM d", "MMMM": "LLLL",
        "MMMMd": "MMMM d", "MMMMEEEEd": "EEEE, MMMM d", "QQQ": "QQQ", "QQQQ": "QQQQ",
        "y": "y", "yM": "M/y", "yMd": "M/d/y", "yMEd": "EEE, M/d/y",
        "yMMM": "MMM y", "yMMMd": "MMM d, y", "yMMMEd": "EEE, MMM d, y", "yMMMM": "MMMM y",
        "yMMMMd": "MMMM d, y", "yMMMMEEEEd": "EEEE, MMMM d, y", "yQQQ": "QQQ y", "yQQQQ": "QQQQ y",
        "H": "HH", "Hm": "HH:mm", "Hms": "HH:mm:ss", "j": "h a",
        "jm": "h:mm a", "jms": "h:mm:ss a", "jmv": "h:mm a v", "jmz": "h:mm a z",
        "jz": "h a z", "m": "m", "ms": "mm:ss", "s": "s",
        "v": "v", "z": "z", "zzzz": "zzzz", "ZZZZ": "ZZZZ",
      },
    },
    es: {
      ERAS: ["a. C.", "d. C."],
      ERANAMES: ["antes de Cristo", "después de Cristo"],
      NARROWMONTHS: ["E", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
      STANDALONENARROWMONTHS: ["E", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
      MONTHS: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
      STANDALONEMONTHS: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
      SHORTMONTHS: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sept", "oct", "nov", "dic"],
      STANDALONESHORTMONTHS: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sept", "oct", "nov", "dic"],
      WEEKDAYS: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
      STANDALONEWEEKDAYS: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
      SHORTWEEKDAYS: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
      STANDALONESHORTWEEKDAYS: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
      NARROWWEEKDAYS: ["D", "L", "M", "X", "J", "V", "S"],
      STANDALONENARROWWEEKDAYS: ["D", "L", "M", "X", "J", "V", "S"],
      SHORTQUARTERS: ["T1", "T2", "T3", "T4"],
      QUARTERS: ["1.er trimestre", "2.º trimestre", "3.er trimestre", "4.º trimestre"],
      AMPMS: ["a.\u00a0m.", "p.\u00a0m."],
      patterns: {
        "d": "d", "E": "ccc", "EEEE": "cccc", "LLL": "LLL",
        "LLLL": "LLLL", "M": "L", "Md": "d/M", "MEd": "EEE, d/M",
        "MMM": "LLL", "MMMd": "d MMM", "MMMEd": "EEE, d MMM", "MMMM": "LLLL",
        "MMMMd": "d 'de' MMMM", "MMMMEEEEd": "EEEE, d 'de' MMMM", "QQQ": "QQQ", "QQQQ": "QQQQ",
        "y": "y", "yM": "M/y", "yMd": "d/M/y", "yMEd": "EEE, d/M/y",
        "yMMM": "MMM y", "yMMMd": "d MMM y", "yMMMEd": "EEE, d MMM y", "yMMMM": "MMMM 'de' y",
        "yMMMMd": "d 'de' MMMM 'de' y", "yMMMMEEEEd": "EEEE, d 'de' MMMM 'de' y", "yQQQ": "QQQ y", "yQQQQ": "QQQQ 'de' y",
        "H": "H", "Hm": "H:mm", "Hms": "H:mm:ss", "j": "H",
        "jm": "H:mm", "jms": "H:mm:ss", "jmv": "H:mm v", "jmz": "H:mm z",
        "jz": "H z", "m": "m", "ms": "mm:ss", "s": "s",
        "v": "v", "z": "z", "zzzz": "zzzz", "ZZZZ": "ZZZZ",
      },
    },
    // Months are numbers + 月 at every width (so "MMMM yyyy" is "9月 2026" and upper-casing changes nothing), a
    // short weekday is one character (火), and every "MMM…" skeleton is numeric ("M月d日", "y年M月d日").
    ja: {
      ERAS: ["紀元前", "西暦"],
      ERANAMES: ["紀元前", "西暦"],
      NARROWMONTHS: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
      STANDALONENARROWMONTHS: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
      MONTHS: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
      STANDALONEMONTHS: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
      SHORTMONTHS: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
      STANDALONESHORTMONTHS: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
      WEEKDAYS: ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"],
      STANDALONEWEEKDAYS: ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"],
      SHORTWEEKDAYS: ["日", "月", "火", "水", "木", "金", "土"],
      STANDALONESHORTWEEKDAYS: ["日", "月", "火", "水", "木", "金", "土"],
      NARROWWEEKDAYS: ["日", "月", "火", "水", "木", "金", "土"],
      STANDALONENARROWWEEKDAYS: ["日", "月", "火", "水", "木", "金", "土"],
      SHORTQUARTERS: ["Q1", "Q2", "Q3", "Q4"],
      QUARTERS: ["第1四半期", "第2四半期", "第3四半期", "第4四半期"],
      AMPMS: ["午前", "午後"],
      patterns: {
        "d": "d日", "E": "ccc", "EEEE": "cccc", "LLL": "M月",
        "LLLL": "M月", "M": "M月", "Md": "M/d", "MEd": "M/d(EEE)",
        "MMM": "M月", "MMMd": "M月d日", "MMMEd": "M月d日(EEE)", "MMMM": "M月",
        "MMMMd": "M月d日", "MMMMEEEEd": "M月d日EEEE", "QQQ": "QQQ", "QQQQ": "QQQQ",
        "y": "y年", "yM": "y/M", "yMd": "y/M/d", "yMEd": "y/M/d(EEE)",
        "yMMM": "y年M月", "yMMMd": "y年M月d日", "yMMMEd": "y年M月d日(EEE)", "yMMMM": "y年M月",
        "yMMMMd": "y年M月d日", "yMMMMEEEEd": "y年M月d日EEEE", "yQQQ": "y/QQQ", "yQQQQ": "y年QQQQ",
        "H": "H時", "Hm": "H:mm", "Hms": "H:mm:ss", "j": "H時",
        "jm": "H:mm", "jms": "H:mm:ss", "jmv": "H:mm v", "jmz": "H:mm z",
        "jz": "H時 z", "m": "m", "ms": "mm:ss", "s": "s",
        "v": "v", "z": "z", "zzzz": "zzzz", "ZZZZ": "ZZZZ",
      },
    },
    // Lower-case month and weekday names; the short forms carry a period ("sept.", "déc.", "mar.") except the
    // ones CLDR leaves whole (mars, mai, juin, août). "E" is "EEE" here, not "ccc" (the same strings in fr), and
    // every time is 24-hour ("jm" "HH:mm"). Dart has no fr_FR date data: "fr_FR" resolves to these rows.
    fr: {
      ERAS: ["av. J.-C.", "ap. J.-C."],
      ERANAMES: ["avant Jésus-Christ", "après Jésus-Christ"],
      NARROWMONTHS: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
      STANDALONENARROWMONTHS: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
      MONTHS: ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"],
      STANDALONEMONTHS: ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"],
      SHORTMONTHS: ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."],
      STANDALONESHORTMONTHS: ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."],
      WEEKDAYS: ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"],
      STANDALONEWEEKDAYS: ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"],
      SHORTWEEKDAYS: ["dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam."],
      STANDALONESHORTWEEKDAYS: ["dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam."],
      NARROWWEEKDAYS: ["D", "L", "M", "M", "J", "V", "S"],
      STANDALONENARROWWEEKDAYS: ["D", "L", "M", "M", "J", "V", "S"],
      SHORTQUARTERS: ["T1", "T2", "T3", "T4"],
      QUARTERS: ["1er trimestre", "2e trimestre", "3e trimestre", "4e trimestre"],
      AMPMS: ["AM", "PM"],
      patterns: {
        "d": "d", "E": "EEE", "EEEE": "EEEE", "LLL": "LLL",
        "LLLL": "LLLL", "M": "L", "Md": "dd/MM", "MEd": "EEE dd/MM",
        "MMM": "LLL", "MMMd": "d MMM", "MMMEd": "EEE d MMM", "MMMM": "LLLL",
        "MMMMd": "d MMMM", "MMMMEEEEd": "EEEE d MMMM", "QQQ": "QQQ", "QQQQ": "QQQQ",
        "y": "y", "yM": "MM/y", "yMd": "dd/MM/y", "yMEd": "EEE dd/MM/y",
        "yMMM": "MMM y", "yMMMd": "d MMM y", "yMMMEd": "EEE d MMM y", "yMMMM": "MMMM y",
        "yMMMMd": "d MMMM y", "yMMMMEEEEd": "EEEE d MMMM y", "yQQQ": "QQQ y", "yQQQQ": "QQQQ y",
        "H": "HH 'h'", "Hm": "HH:mm", "Hms": "HH:mm:ss", "j": "HH 'h'",
        "jm": "HH:mm", "jms": "HH:mm:ss", "jmv": "HH:mm v", "jmz": "HH:mm z",
        "jz": "HH 'h' z", "m": "m", "ms": "mm:ss", "s": "s",
        "v": "v", "z": "z", "zzzz": "zzzz", "ZZZZ": "ZZZZ",
      },
    },
    // Lower-case month names; the short forms carry NO period ("set", "dic", "mar") — the one place Italian
    // differs from French at a glance. "E" is "ccc" (standalone), every time is 24-hour ("jm" "HH:mm"), and
    // the day comes first with no preposition ("15 settembre 2026", where Spanish writes "15 de septiembre
    // de 2026"). Dart has no it_IT date data: "it_IT" resolves to these rows.
    it: {
      ERAS: ["a.C.", "d.C."],
      ERANAMES: ["avanti Cristo", "dopo Cristo"],
      NARROWMONTHS: ["G", "F", "M", "A", "M", "G", "L", "A", "S", "O", "N", "D"],
      STANDALONENARROWMONTHS: ["G", "F", "M", "A", "M", "G", "L", "A", "S", "O", "N", "D"],
      MONTHS: ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"],
      STANDALONEMONTHS: ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"],
      SHORTMONTHS: ["gen", "feb", "mar", "apr", "mag", "giu", "lug", "ago", "set", "ott", "nov", "dic"],
      STANDALONESHORTMONTHS: ["gen", "feb", "mar", "apr", "mag", "giu", "lug", "ago", "set", "ott", "nov", "dic"],
      WEEKDAYS: ["domenica", "lunedì", "martedì", "mercoledì", "giovedì", "venerdì", "sabato"],
      STANDALONEWEEKDAYS: ["domenica", "lunedì", "martedì", "mercoledì", "giovedì", "venerdì", "sabato"],
      SHORTWEEKDAYS: ["dom", "lun", "mar", "mer", "gio", "ven", "sab"],
      STANDALONESHORTWEEKDAYS: ["dom", "lun", "mar", "mer", "gio", "ven", "sab"],
      NARROWWEEKDAYS: ["D", "L", "M", "M", "G", "V", "S"],
      STANDALONENARROWWEEKDAYS: ["D", "L", "M", "M", "G", "V", "S"],
      SHORTQUARTERS: ["T1", "T2", "T3", "T4"],
      QUARTERS: ["1º trimestre", "2º trimestre", "3º trimestre", "4º trimestre"],
      AMPMS: ["AM", "PM"],
      patterns: {
        "d": "d", "E": "ccc", "EEEE": "cccc", "LLL": "LLL",
        "LLLL": "LLLL", "M": "L", "Md": "d/M", "MEd": "EEE d/M",
        "MMM": "LLL", "MMMd": "d MMM", "MMMEd": "EEE d MMM", "MMMM": "LLLL",
        "MMMMd": "d MMMM", "MMMMEEEEd": "EEEE d MMMM", "QQQ": "QQQ", "QQQQ": "QQQQ",
        "y": "y", "yM": "M/y", "yMd": "d/M/y", "yMEd": "EEE d/M/y",
        "yMMM": "MMM y", "yMMMd": "d MMM y", "yMMMEd": "EEE d MMM y", "yMMMM": "MMMM y",
        "yMMMMd": "d MMMM y", "yMMMMEEEEd": "EEEE d MMMM y", "yQQQ": "QQQ y", "yQQQQ": "QQQQ y",
        "H": "HH", "Hm": "HH:mm", "Hms": "HH:mm:ss", "j": "HH",
        "jm": "HH:mm", "jms": "HH:mm:ss", "jmv": "HH:mm v", "jmz": "HH:mm z",
        "jz": "HH z", "m": "m", "ms": "mm:ss", "s": "s",
        "v": "v", "z": "z", "zzzz": "zzzz", "ZZZZ": "ZZZZ",
      },
    },
    // Capitalised month and weekday names, and the one language here whose FORMAT and STANDALONE short forms
    // differ: a date carries the period ("Sept. 2026", "Di., 15.9.2026"), a bare month or weekday does not
    // ("MMM" is "LLL", so a trend strip reads "SEP" while a pill reads "Sept. 2026", and "Mär" is the
    // standalone spelling of "März"). "E" is "ccc" (standalone) like Italian; the day is first and dotted,
    // with an ordinal period ("15. September 2026", "15.9.2026"); time is 24-hour, with 'Uhr' quoted at the
    // bare hour ("21 Uhr", "21:41"), so AMPMS never render. Dart has no de_DE date data: "de_DE" resolves
    // to these rows.
    de: {
      ERAS: ["v. Chr.", "n. Chr."],
      ERANAMES: ["v. Chr.", "n. Chr."],
      NARROWMONTHS: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
      STANDALONENARROWMONTHS: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
      MONTHS: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
      STANDALONEMONTHS: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
      SHORTMONTHS: ["Jan.", "Feb.", "März", "Apr.", "Mai", "Juni", "Juli", "Aug.", "Sept.", "Okt.", "Nov.", "Dez."],
      STANDALONESHORTMONTHS: ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"],
      WEEKDAYS: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
      STANDALONEWEEKDAYS: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
      SHORTWEEKDAYS: ["So.", "Mo.", "Di.", "Mi.", "Do.", "Fr.", "Sa."],
      STANDALONESHORTWEEKDAYS: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
      NARROWWEEKDAYS: ["S", "M", "D", "M", "D", "F", "S"],
      STANDALONENARROWWEEKDAYS: ["S", "M", "D", "M", "D", "F", "S"],
      SHORTQUARTERS: ["Q1", "Q2", "Q3", "Q4"],
      QUARTERS: ["1. Quartal", "2. Quartal", "3. Quartal", "4. Quartal"],
      AMPMS: ["AM", "PM"],
      patterns: {
        "d": "d", "E": "ccc", "EEEE": "cccc", "LLL": "LLL",
        "LLLL": "LLLL", "M": "L", "Md": "d.M.", "MEd": "EEE, d.M.",
        "MMM": "LLL", "MMMd": "d. MMM", "MMMEd": "EEE, d. MMM", "MMMM": "LLLL",
        "MMMMd": "d. MMMM", "MMMMEEEEd": "EEEE, d. MMMM", "QQQ": "QQQ", "QQQQ": "QQQQ",
        "y": "y", "yM": "M.y", "yMd": "d.M.y", "yMEd": "EEE, d.M.y",
        "yMMM": "MMM y", "yMMMd": "d. MMM y", "yMMMEd": "EEE, d. MMM y", "yMMMM": "MMMM y",
        "yMMMMd": "d. MMMM y", "yMMMMEEEEd": "EEEE, d. MMMM y", "yQQQ": "QQQ y", "yQQQQ": "QQQQ y",
        "H": "HH 'Uhr'", "Hm": "HH:mm", "Hms": "HH:mm:ss", "j": "HH 'Uhr'",
        "jm": "HH:mm", "jms": "HH:mm:ss", "jmv": "HH:mm v", "jmz": "HH:mm z",
        "jz": "HH 'Uhr' z", "m": "m", "ms": "mm:ss", "s": "s",
        "v": "v", "z": "z", "zzzz": "zzzz", "ZZZZ": "ZZZZ",
      },
    },
    // Brazilian Portuguese. Flutter/intl have ONE "pt" and it is the Brazilian one (pt_PT is its own row), so
    // dartLocale "pt" resolves to itself. Month, weekday and quarter names are lower case, and the yMMMM / yMMM
    // skeletons carry a literal 'de' — "setembro de 2026", "set. de 2026" — the same preposition Spanish gained
    // in the 2026-09-17 skeleton fix, which is why a screen must ask for "yMMMM" / "yMMM" and never "MMMM yyyy".
    // The short months keep a period ("jan.", "set."), so an uppercased trend strip reads JAN. FEV. MAR.
    pt: {
      ERAS: ["a.C.", "d.C."],
      ERANAMES: ["antes de Cristo", "depois de Cristo"],
      NARROWMONTHS: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
      STANDALONENARROWMONTHS: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
      MONTHS: ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"],
      STANDALONEMONTHS: ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"],
      SHORTMONTHS: ["jan.", "fev.", "mar.", "abr.", "mai.", "jun.", "jul.", "ago.", "set.", "out.", "nov.", "dez."],
      STANDALONESHORTMONTHS: ["jan.", "fev.", "mar.", "abr.", "mai.", "jun.", "jul.", "ago.", "set.", "out.", "nov.", "dez."],
      WEEKDAYS: ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"],
      STANDALONEWEEKDAYS: ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"],
      SHORTWEEKDAYS: ["dom.", "seg.", "ter.", "qua.", "qui.", "sex.", "sáb."],
      STANDALONESHORTWEEKDAYS: ["dom.", "seg.", "ter.", "qua.", "qui.", "sex.", "sáb."],
      NARROWWEEKDAYS: ["D", "S", "T", "Q", "Q", "S", "S"],
      STANDALONENARROWWEEKDAYS: ["D", "S", "T", "Q", "Q", "S", "S"],
      SHORTQUARTERS: ["T1", "T2", "T3", "T4"],
      QUARTERS: ["1º trimestre", "2º trimestre", "3º trimestre", "4º trimestre"],
      AMPMS: ["AM", "PM"],
      patterns: {
        "d": "d", "E": "ccc", "EEEE": "cccc", "LLL": "LLL",
        "LLLL": "LLLL", "M": "L", "Md": "d/M", "MEd": "EEE, dd/MM",
        "MMM": "LLL", "MMMd": "d 'de' MMM", "MMMEd": "EEE, d 'de' MMM", "MMMM": "LLLL",
        "MMMMd": "d 'de' MMMM", "MMMMEEEEd": "EEEE, d 'de' MMMM", "QQQ": "QQQ", "QQQQ": "QQQQ",
        "y": "y", "yM": "MM/y", "yMd": "dd/MM/y", "yMEd": "EEE, dd/MM/y",
        "yMMM": "MMM 'de' y", "yMMMd": "d 'de' MMM 'de' y", "yMMMEd": "EEE, d 'de' MMM 'de' y", "yMMMM": "MMMM 'de' y",
        "yMMMMd": "d 'de' MMMM 'de' y", "yMMMMEEEEd": "EEEE, d 'de' MMMM 'de' y", "yQQQ": "QQQ 'de' y", "yQQQQ": "QQQQ 'de' y",
        "H": "HH", "Hm": "HH:mm", "Hms": "HH:mm:ss", "j": "HH",
        "jm": "HH:mm", "jms": "HH:mm:ss", "jmv": "HH:mm v", "jmz": "HH:mm z",
        "jz": "HH z", "m": "m", "ms": "mm:ss", "s": "s",
        "v": "v", "z": "z", "zzzz": "zzzz", "ZZZZ": "ZZZZ",
      },
    },
    // Turkish. Dart has no tr_TR date row at all — "tr_TR" and "tr-TR" both resolve to this one, the way "ja_JP"
    // resolves to ja. Month, weekday and quarter names are CAPITALISED and FORMAT is identical to STANDALONE at
    // every width, so nothing here splits the way German's "Sept." / "Sep" does and { case: "sentence" } on a
    // month is a no-op. The weekday comes AFTER the date and takes no comma ("yMMMMEEEEd" is "d MMMM y EEEE" →
    // "15 Eylül 2026 Salı"), "yMMMM" carries no preposition ("Eylül 2026"), and the numeric skeletons mix their
    // separators exactly as CLDR has them: "yMd" is dotted and zero-padded ("15.09.2026") while "Md" is "d/M"
    // ("15/9") and "yM" is "MM/y" ("09/2026"). Every time is 24-hour, so the AMPMS (ÖÖ/ÖS) never render. "MMMEd"
    // spells the month out in full ("15 Eylül Sal") though its skeleton asks for the abbreviation — the SDK's
    // own oddity, kept verbatim, as is the mixed punctuation above.
    //   CASE: 13 of these strings hold a dotted i — "Nis", "Eki", "Nisan", "Haziran", "Ekim", "Pazartesi",
    // "Cumartesi" and both ERANAMES. Uppercased through dartUpper (Dart's plain toUpperCase) they read NIS / EKI
    // / NISAN, and that is what the APP draws too: spending_income.dart:280 uppercases the Insights trend strip
    // with a plain toUpperCase. Only the labels the app runs through localizedUpper want NİS / EKİ — that is
    // fmt.upperLocalized below, never fmt.upper. The dotless ı ("Mayıs", "Salı", "Kasım", "Aralık") is safe:
    // both rules write I.
    tr: {
      ERAS: ["MÖ", "MS"],
      ERANAMES: ["Milattan Önce", "Milattan Sonra"],
      NARROWMONTHS: ["O", "Ş", "M", "N", "M", "H", "T", "A", "E", "E", "K", "A"],
      STANDALONENARROWMONTHS: ["O", "Ş", "M", "N", "M", "H", "T", "A", "E", "E", "K", "A"],
      MONTHS: ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"],
      STANDALONEMONTHS: ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"],
      SHORTMONTHS: ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"],
      STANDALONESHORTMONTHS: ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"],
      WEEKDAYS: ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"],
      STANDALONEWEEKDAYS: ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"],
      SHORTWEEKDAYS: ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"],
      STANDALONESHORTWEEKDAYS: ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"],
      NARROWWEEKDAYS: ["P", "P", "S", "Ç", "P", "C", "C"],
      STANDALONENARROWWEEKDAYS: ["P", "P", "S", "Ç", "P", "C", "C"],
      SHORTQUARTERS: ["Ç1", "Ç2", "Ç3", "Ç4"],
      QUARTERS: ["1. çeyrek", "2. çeyrek", "3. çeyrek", "4. çeyrek"],
      AMPMS: ["ÖÖ", "ÖS"],
      patterns: {
        "d": "d", "E": "ccc", "EEEE": "cccc", "LLL": "LLL",
        "LLLL": "LLLL", "M": "L", "Md": "d/M", "MEd": "d/MM EEE",
        "MMM": "LLL", "MMMd": "d MMM", "MMMEd": "d MMMM EEE", "MMMM": "LLLL",
        "MMMMd": "d MMMM", "MMMMEEEEd": "d MMMM EEEE", "QQQ": "QQQ", "QQQQ": "QQQQ",
        "y": "y", "yM": "MM/y", "yMd": "dd.MM.y", "yMEd": "d.M.y EEE",
        "yMMM": "MMM y", "yMMMd": "d MMM y", "yMMMEd": "d MMM y EEE", "yMMMM": "MMMM y",
        "yMMMMd": "d MMMM y", "yMMMMEEEEd": "d MMMM y EEEE", "yQQQ": "y QQQ", "yQQQQ": "y QQQQ",
        "H": "HH", "Hm": "HH:mm", "Hms": "HH:mm:ss", "j": "HH",
        "jm": "HH:mm", "jms": "HH:mm:ss", "jmv": "HH:mm v", "jmz": "HH:mm z",
        "jz": "HH z", "m": "m", "ms": "mm:ss", "s": "s",
        "v": "v", "z": "z", "zzzz": "zzzz", "ZZZZ": "ZZZZ",
      },
    },
    // Korean. Dart has no ko_KR date row at all — "ko_KR" and "ko-KR" both resolve to this one, the way "ja_JP"
    // resolves to ja and "tr_TR" to tr. Like Japanese the month is a NUMBER + a suffix, but at EVERY width:
    // MONTHS, SHORTMONTHS and NARROWMONTHS all read "9월", where ja's narrow is the bare "9". The year carries 년,
    // and "yMMMM" and "yMMM" are the same pattern over the same month string ("y년 MMMM" / "y년 MMM"), so both
    // render "2026년 9월" — the Budget hero and a compare pill read alike, as they do in ja — and "yMMMMd" /
    // "yMMMd" collapse the same way onto "2026년 9월 15일". The NUMERIC skeletons all END IN A PERIOD: "Md" is
    // "9. 15.", "yMd" "2026. 9. 15.", "yM" "2026. 9." — a trailing dot no other language here has, CLDR's and not
    // a typo. Time is 12-HOUR with the marker IN FRONT ("jm" is "a h:mm" → "오전 9:41"): en is the only other
    // language here whose AMPMS render at all, and it trails its marker. The bare-hour forms carry 시 ("H시",
    // "a h시"). ERAS are ASCII BC/AD while ERANAMES are Korean. A short weekday is one syllable (화) and all seven
    // are distinct, so weekdayLabel never collides the way pt's does.
    //   CASE: no Hangul syllable has a case mapping, so upper / lower / sentence are no-ops on every string below
    // (only the ASCII ERAS could change, and no screen draws an era) and the dartUpper parity check is trivial.
    ko: {
      ERAS: ["BC", "AD"],
      ERANAMES: ["기원전", "서기"],
      NARROWMONTHS: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
      STANDALONENARROWMONTHS: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
      MONTHS: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
      STANDALONEMONTHS: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
      SHORTMONTHS: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
      STANDALONESHORTMONTHS: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
      WEEKDAYS: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"],
      STANDALONEWEEKDAYS: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"],
      SHORTWEEKDAYS: ["일", "월", "화", "수", "목", "금", "토"],
      STANDALONESHORTWEEKDAYS: ["일", "월", "화", "수", "목", "금", "토"],
      NARROWWEEKDAYS: ["일", "월", "화", "수", "목", "금", "토"],
      STANDALONENARROWWEEKDAYS: ["일", "월", "화", "수", "목", "금", "토"],
      SHORTQUARTERS: ["1분기", "2분기", "3분기", "4분기"],
      QUARTERS: ["제 1/4분기", "제 2/4분기", "제 3/4분기", "제 4/4분기"],
      AMPMS: ["오전", "오후"],
      patterns: {
        "d": "d일", "E": "ccc", "EEEE": "cccc", "LLL": "LLL",
        "LLLL": "LLLL", "M": "M월", "Md": "M. d.", "MEd": "M. d. (EEE)",
        "MMM": "LLL", "MMMd": "MMM d일", "MMMEd": "MMM d일 (EEE)", "MMMM": "LLLL",
        "MMMMd": "MMMM d일", "MMMMEEEEd": "MMMM d일 EEEE", "QQQ": "QQQ", "QQQQ": "QQQQ",
        "y": "y년", "yM": "y. M.", "yMd": "y. M. d.", "yMEd": "y. M. d. (EEE)",
        "yMMM": "y년 MMM", "yMMMd": "y년 MMM d일", "yMMMEd": "y년 MMM d일 (EEE)", "yMMMM": "y년 MMMM",
        "yMMMMd": "y년 MMMM d일", "yMMMMEEEEd": "y년 MMMM d일 EEEE", "yQQQ": "y년 QQQ", "yQQQQ": "y년 QQQQ",
        "H": "H시", "Hm": "HH:mm", "Hms": "H시 m분 s초", "j": "a h시",
        "jm": "a h:mm", "jms": "a h:mm:ss", "jmv": "a h:mm v", "jmz": "a h:mm z",
        "jz": "a h시 z", "m": "m", "ms": "mm:ss", "s": "s",
        "v": "v", "z": "z", "zzzz": "zzzz", "ZZZZ": "ZZZZ",
      },
    },
    // Chinese as Localizations.localeOf(context).toString() names it for the app's Locale('zh'): "zh", which is
    // FLUTTER'S 'zh' row (loadDateIntlDataIfNotLoaded overwrites intl's 'zh' with it) — the MAINLAND row, although
    // app_zh.arb is Taiwan Traditional. Flutter also has a zh_TW row, and it differs in exactly the places a Taiwanese
    // reader notices: short weekdays are 周日 周一 … here and 週日 週一 … there, full months are the numerals 一月 …
    // 十二月 here and 1月 … 12月 there, ERAS are 公元 / 西元, quarters 季度 / 季, the bare hour is 时 (Simplified) /
    // 時, and "jm" is 24-hour "HH:mm" here where zh_TW is "ah:mm" (上午9:41). Every date site a replica screen mirrors
    // passes Localizations.localeOf(context).toString() (planner_view.dart:785, expenses_view.dart:245,
    // trans_list.dart:133, add_transaction.dart:116, dashboard.dart:238, spending_income.dart:278 via
    // dashboard.dart:94, largest_spend.dart:118, compare_month_view.dart:93, compare_month_chart.dart:74,
    // current_month_view.dart:223, profile_view.dart:2404), and so do date_labels.dart's two callers
    // (history_view.dart:90, ai_advice_view.dart:1598/:1732) — so the app draws THIS row and so does the replica,
    // mainland spellings included. Only L10n.intlLocale sites (the exporters, incomeVsExpenses_data.dart:64) reach
    // zh_TW's dates, no replica screen draws one, and zh_TW's date row is deliberately not embedded: a
    // { locale: "zh_TW" } date throws rather than pretend a screen formats that way. The yMMMM / yMMM / yMMMMd /
    // yMMMd / MMMd / MMMMd skeletons are numeric in both rows ("2026年9月", "9月15日"), which is why the split only
    // surfaces in "MMMM" (九月), weekdays, eras, quarters and times.
    //   CASE: Han has no case, so upper / lower / sentence are no-ops on every string here except the digits.
    zh: {
      ERAS: ["公元前", "公元"],
      ERANAMES: ["公元前", "公元"],
      NARROWMONTHS: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
      STANDALONENARROWMONTHS: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
      MONTHS: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
      STANDALONEMONTHS: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
      SHORTMONTHS: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
      STANDALONESHORTMONTHS: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
      WEEKDAYS: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
      STANDALONEWEEKDAYS: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
      SHORTWEEKDAYS: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
      STANDALONESHORTWEEKDAYS: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
      NARROWWEEKDAYS: ["日", "一", "二", "三", "四", "五", "六"],
      STANDALONENARROWWEEKDAYS: ["日", "一", "二", "三", "四", "五", "六"],
      SHORTQUARTERS: ["1季度", "2季度", "3季度", "4季度"],
      QUARTERS: ["第一季度", "第二季度", "第三季度", "第四季度"],
      AMPMS: ["上午", "下午"],
      patterns: {
        "d": "d日", "E": "ccc", "EEEE": "cccc", "LLL": "LLL",
        "LLLL": "LLLL", "M": "M月", "Md": "M/d", "MEd": "M/dEEE",
        "MMM": "LLL", "MMMd": "M月d日", "MMMEd": "M月d日EEE", "MMMM": "LLLL",
        "MMMMd": "M月d日", "MMMMEEEEd": "M月d日EEEE", "QQQ": "QQQ", "QQQQ": "QQQQ",
        "y": "y年", "yM": "y年M月", "yMd": "y/M/d", "yMEd": "y/M/dEEE",
        "yMMM": "y年M月", "yMMMd": "y年M月d日", "yMMMEd": "y年M月d日EEE", "yMMMM": "y年M月",
        "yMMMMd": "y年M月d日", "yMMMMEEEEd": "y年M月d日EEEE", "yQQQ": "y年第Q季度", "yQQQQ": "y年第Q季度",
        "H": "H时", "Hm": "HH:mm", "Hms": "HH:mm:ss", "j": "H时",
        "jm": "HH:mm", "jms": "HH:mm:ss", "jmv": "v HH:mm", "jmz": "z HH:mm",
        "jz": "zH时", "m": "m", "ms": "mm:ss", "s": "s",
        "v": "v", "z": "z", "zzzz": "zzzz", "ZZZZ": "ZZZZ",
      },
    },
  };
  DATE_DATA.en_US = DATE_DATA.en; // flutter_localizations' en_US is identical to en (checked 2026-09-16)

  const NUMBER_DATA = {
    en_US: {
      DECIMAL_SEP: ".", GROUP_SEP: ",", PERCENT: "%", ZERO_DIGIT: "0",
      PLUS_SIGN: "+", MINUS_SIGN: "-", EXP_SYMBOL: "E", PERMILL: "\u2030",
      INFINITY: "∞", NAN: "NaN", DECIMAL_PATTERN: "#,##0.###", SCIENTIFIC_PATTERN: "#E0",
      PERCENT_PATTERN: "#,##0%", CURRENCY_PATTERN: "¤#,##0.00", DEF_CURRENCY_CODE: "USD",
      COMPACT_SHORT: [[3, "0K"], [6, "0M"], [9, "0B"], [12, "0T"]],
      COMPACT_SHORT_CURRENCY: [[3, "¤0K"], [6, "¤0M"], [9, "¤0B"], [12, "¤0T"]],
    },
    es: {
      DECIMAL_SEP: ",", GROUP_SEP: ".", PERCENT: "%", ZERO_DIGIT: "0",
      PLUS_SIGN: "+", MINUS_SIGN: "-", EXP_SYMBOL: "E", PERMILL: "\u2030",
      INFINITY: "∞", NAN: "NaN", DECIMAL_PATTERN: "#,##0.###", SCIENTIFIC_PATTERN: "#E0",
      PERCENT_PATTERN: "#,##0\u00a0%", CURRENCY_PATTERN: "#,##0.00\u00a0¤", DEF_CURRENCY_CODE: "EUR",
      COMPACT_SHORT: [[3, "0\u00a0mil"], [6, "0\u00a0M"], [10, "00\u00a0mil\u00a0M"], [12, "0\u00a0B"]],
      COMPACT_SHORT_CURRENCY: [[3, "0\u00a0mil\u00a0¤"], [6, "0\u00a0M¤"], [10, "00\u00a0mil\u00a0M¤"], [12, "0\u00a0B¤"]],
    },
    // What "ja_JP" (the JPY numeric locale) resolves to. Separators are en_US's; the compact formats count in
    // 万 (10^4), 億 (10^8), 兆 (10^12), 京 (10^16), and exponent 3 is "0" — a plain, ungrouped "4380", not "4.38K".
    ja: {
      DECIMAL_SEP: ".", GROUP_SEP: ",", PERCENT: "%", ZERO_DIGIT: "0",
      PLUS_SIGN: "+", MINUS_SIGN: "-", EXP_SYMBOL: "E", PERMILL: "\u2030",
      INFINITY: "∞", NAN: "NaN", DECIMAL_PATTERN: "#,##0.###", SCIENTIFIC_PATTERN: "#E0",
      PERCENT_PATTERN: "#,##0%", CURRENCY_PATTERN: "¤#,##0.00", DEF_CURRENCY_CODE: "JPY",
      COMPACT_SHORT: [[3, "0"], [4, "0万"], [8, "0億"], [12, "0兆"], [16, "0京"]],
      COMPACT_SHORT_CURRENCY: [[3, "0"], [4, "¤0万"], [8, "¤0億"], [12, "¤0兆"], [16, "¤0京"]],
    },
    // What "fr_FR" (EUR for a French-language user) resolves to. The group separator is U+202F NARROW NO-BREAK
    // SPACE ("2 370,36"), the currency and percent patterns put the sign AFTER the figure behind a U+00A0
    // NO-BREAK SPACE ("2 370,36 €", "22 %"), and the compact formats are k / M / Md / Bn behind a U+00A0
    // ("8,28 k", "8,28 k €").
    fr: {
      DECIMAL_SEP: ",", GROUP_SEP: " ", PERCENT: "%", ZERO_DIGIT: "0",
      PLUS_SIGN: "+", MINUS_SIGN: "-", EXP_SYMBOL: "E", PERMILL: "‰",
      INFINITY: "∞", NAN: "NaN", DECIMAL_PATTERN: "#,##0.###", SCIENTIFIC_PATTERN: "#E0",
      PERCENT_PATTERN: "#,##0 %", CURRENCY_PATTERN: "#,##0.00 ¤", DEF_CURRENCY_CODE: "EUR",
      COMPACT_SHORT: [[3, "0 k"], [6, "0 M"], [9, "0 Md"], [12, "0 Bn"]],
      COMPACT_SHORT_CURRENCY: [[3, "0 k ¤"], [6, "0 M ¤"], [9, "0 Md ¤"], [12, "0 Bn ¤"]],
    },
    // What "it_IT" (EUR for an Italian-language user) resolves to. Italian groups with a DOT and writes a
    // decimal comma ("2.370,36" — a German's separators, not a Frenchman's), puts "€" after the figure behind
    // a U+00A0, and — unlike French, Spanish and German — glues "%" straight onto the figure ("36,1%"). The
    // compact formats have NO exponent-3 or -4 or -5 entry beyond a plain "0", so everything under a million
    // is written out ungrouped ("4380"), then "0 Mln" / "0 Mld" / "0 Bln" behind a U+00A0.
    it: {
      DECIMAL_SEP: ",", GROUP_SEP: ".", PERCENT: "%", ZERO_DIGIT: "0",
      PLUS_SIGN: "+", MINUS_SIGN: "-", EXP_SYMBOL: "E", PERMILL: "‰",
      INFINITY: "∞", NAN: "NaN", DECIMAL_PATTERN: "#,##0.###", SCIENTIFIC_PATTERN: "#E0",
      PERCENT_PATTERN: "#,##0%", CURRENCY_PATTERN: "#,##0.00 ¤", DEF_CURRENCY_CODE: "EUR",
      COMPACT_SHORT: [[3, "0"], [4, "0"], [5, "0"], [6, "0 Mln"], [9, "0 Mld"], [12, "0 Bln"]],
      COMPACT_SHORT_CURRENCY: [[3, "0"], [4, "0"], [5, "0"], [6, "0 Mln ¤"], [9, "0 Mld ¤"], [12, "0 Bln ¤"]],
    },
    // What "de_DE" (EUR for a German-language user) resolves to: Dart has no de_DE row in either list, so it
    // shortens to "de" for numbers and dates alike. German takes Italian's separators (group ".", decimal
    // comma: "2.370,36") and French's spacing — a U+00A0 before "€" AND before "%", which percent() then
    // narrows to the U+202F app_de.arb was translated with ("36,1 %"). The compact formats have NO
    // exponent-3, -4 or -5 entry beyond a plain "0", so everything under a million is written out ungrouped
    // ("8280"), then "0 Mio." / "0 Mrd." / "0 Bio." behind a U+00A0.
    de: {
      DECIMAL_SEP: ",", GROUP_SEP: ".", PERCENT: "%", ZERO_DIGIT: "0",
      PLUS_SIGN: "+", MINUS_SIGN: "-", EXP_SYMBOL: "E", PERMILL: "‰",
      INFINITY: "∞", NAN: "NaN", DECIMAL_PATTERN: "#,##0.###", SCIENTIFIC_PATTERN: "#E0",
      PERCENT_PATTERN: "#,##0 %", CURRENCY_PATTERN: "#,##0.00 ¤", DEF_CURRENCY_CODE: "EUR",
      COMPACT_SHORT: [[3, "0"], [4, "0"], [5, "0"], [6, "0 Mio."], [9, "0 Mrd."], [12, "0 Bio."]],
      COMPACT_SHORT_CURRENCY: [[3, "0"], [4, "0"], [5, "0"], [6, "0 Mio. ¤"], [9, "0 Mrd. ¤"], [12, "0 Bio. ¤"]],
    },
    // What "pt_BR" (BRL's numeric locale) resolves to — itself. The first row here that does NOT shorten: intl
    // has a real pt_BR, where it has no fr_FR, it_IT or de_DE and folds those onto the language. Brazil takes
    // Italian's and German's separators (group ".", decimal comma: "11.851,80"), but is the first currency in
    // this set whose symbol goes IN FRONT and carries a U+00A0 AFTER it — the currency pattern is "¤ #,##0.00",
    // so money() is "R$ 11.851,80" where the dollar and the yen glue theirs on and the euro trails. Like Italian
    // it glues "%" onto the figure ("21,7%"), so percent()'s U+00A0 → U+202F narrowing never fires. And unlike
    // Italian and German the compact formats DO have an exponent-3 entry, so thousands compact ("41,4 mil", not
    // German's ungrouped "41400"), then "0 mi" / "0 bi" / "0 tri", each behind a U+00A0.
    pt_BR: {
      DECIMAL_SEP: ",", GROUP_SEP: ".", PERCENT: "%", ZERO_DIGIT: "0",
      PLUS_SIGN: "+", MINUS_SIGN: "-", EXP_SYMBOL: "E", PERMILL: "‰",
      INFINITY: "∞", NAN: "NaN", DECIMAL_PATTERN: "#,##0.###", SCIENTIFIC_PATTERN: "#E0",
      PERCENT_PATTERN: "#,##0%", CURRENCY_PATTERN: "¤\u00a0#,##0.00", DEF_CURRENCY_CODE: "BRL",
      COMPACT_SHORT: [[3, "0\u00a0mil"], [6, "0\u00a0mi"], [9, "0\u00a0bi"], [12, "0\u00a0tri"]],
      COMPACT_SHORT_CURRENCY: [[3, "¤\u00a00\u00a0mil"], [6, "¤\u00a00\u00a0mi"], [9, "¤\u00a00\u00a0bi"], [12, "¤\u00a00\u00a0tri"]],
    },
    // What "tr_TR" (TRY's numeric locale) resolves to: intl has no tr_TR row, so Dart shortens it to "tr" — and
    // the UI language is "tr" too, so ONE row serves money and percent alike. That is German's arrangement, not
    // Brazil's, which is why no alias line follows this literal. Turkish takes Italian's and German's separators
    // (group ".", decimal comma: "35.555,40"), but it is the first language here that puts BOTH signs IN FRONT.
    // The currency pattern is "¤#,##0.00", so money glues its symbol on the way the dollar does
    // ("TL35.555,40" — intl's TRY symbol is the two ASCII letters "TL", not ₺), and the PERCENT pattern is
    // "%#,##0", the sign LEADING the figure with no space at all ("%21,7", a negative "-%4,2"), so percent()'s
    // U+00A0 → U+202F narrowing can never fire here. The compact formats go the other way — "B" (bin), "Mn",
    // "Mr", "Tn" behind a U+00A0, and the compact CURRENCY trails its symbol behind another one ("35,6 B TL")
    // although the full pattern leads with it. Unlike Italian and German there IS an exponent-3 entry, so
    // thousands compact ("35,6 B") instead of being written out ungrouped.
    tr: {
      DECIMAL_SEP: ",", GROUP_SEP: ".", PERCENT: "%", ZERO_DIGIT: "0",
      PLUS_SIGN: "+", MINUS_SIGN: "-", EXP_SYMBOL: "E", PERMILL: "‰",
      INFINITY: "∞", NAN: "NaN", DECIMAL_PATTERN: "#,##0.###", SCIENTIFIC_PATTERN: "#E0",
      PERCENT_PATTERN: "%#,##0", CURRENCY_PATTERN: "¤#,##0.00", DEF_CURRENCY_CODE: "TRY",
      COMPACT_SHORT: [[3, "0\u00a0B"], [6, "0\u00a0Mn"], [9, "0\u00a0Mr"], [12, "0\u00a0Tn"]],
      COMPACT_SHORT_CURRENCY: [[3, "0\u00a0B\u00a0¤"], [6, "0\u00a0Mn\u00a0¤"], [9, "0\u00a0Mr\u00a0¤"], [12, "0\u00a0Tn\u00a0¤"]],
    },
    // What "ko_KR" (KRW's numeric locale) resolves to: intl has no ko_KR row, so Dart shortens it to "ko" — and
    // the UI language is "ko" too, so ONE row serves money and percent alike. That is Turkish's and German's
    // arrangement, not Brazil's, which is why no alias line follows this literal. Korean takes en_US's separators
    // exactly (comma groups, decimal point: "2,133,324") and en_US's currency pattern, "¤#,##0.00", so the symbol
    // is glued IN FRONT the way the dollar's is — and KRW has 0 fraction digits, so no money format ever shows a
    // decimal. The PERCENT pattern is "#,##0%", the sign GLUED behind the figure as in Italian, so percent()'s
    // U+00A0 → U+202F narrowing can never fire: no Korean output holds a U+202F, a U+00A0, or a space of ANY kind
    // — the first language here of which that is true. The compact formats count in 천 (10^3), 만 (10^4),
    // 억 (10^8), 조 (10^12), each glued on with no space; unlike ja there IS a 10^3 entry, so thousands compact
    // ("8.28천") instead of ja's ungrouped "8280", and there is no 10^16 (ja's 京). With no exponent-6 entry a
    // million won divides by 10^4 and reads in 만: 3,942,000 → "394만".
    ko: {
      DECIMAL_SEP: ".", GROUP_SEP: ",", PERCENT: "%", ZERO_DIGIT: "0",
      PLUS_SIGN: "+", MINUS_SIGN: "-", EXP_SYMBOL: "E", PERMILL: "‰",
      INFINITY: "∞", NAN: "NaN", DECIMAL_PATTERN: "#,##0.###", SCIENTIFIC_PATTERN: "#E0",
      PERCENT_PATTERN: "#,##0%", CURRENCY_PATTERN: "¤#,##0.00", DEF_CURRENCY_CODE: "KRW",
      COMPACT_SHORT: [[3, "0천"], [4, "0만"], [8, "0억"], [12, "0조"]],
      COMPACT_SHORT_CURRENCY: [[3, "¤0천"], [4, "¤0만"], [8, "¤0억"], [12, "¤0조"]],
    },
    // What "zh_TW" (TWD's numeric locale) resolves to — itself: intl has a real zh_TW row, as it has pt_BR. It is
    // ALSO what L10n.intlLocale is for the app's Locale('zh') (l10n.dart _toIntlLocale: a bare zh means Taiwan), so
    // this one row writes both the amounts and the percents. en_US's separators exactly (comma groups, decimal
    // point) and en_US's currency pattern, "¤#,##0.00": intl's TWD symbol is the three ASCII characters "NT$",
    // glued IN FRONT the way the dollar's is ("NT$27,000.00" — TWD keeps 2 fraction digits, see
    // CURRENCY_FRACTION_DIGITS). The percent is glued behind the figure ("21.7%"), so percent()'s U+00A0 → U+202F
    // narrowing never fires, and like Korean no output holds a space of any kind. The compact formats count in
    // 萬 (10^4), 億 (10^8) and 兆 (10^12) — the TRADITIONAL characters, where the mainland zh row below writes 万 / 亿 /
    // 万亿 — and exponent 3 is ja's plain "0", so a figure under 10,000 is written out ungrouped ("8280", "NT$8280").
    // NAN is 非數值 here and "NaN" in zh; the strict fmt layer never lets a NaN through, so that never renders.
    zh_TW: {
      DECIMAL_SEP: ".", GROUP_SEP: ",", PERCENT: "%", ZERO_DIGIT: "0",
      PLUS_SIGN: "+", MINUS_SIGN: "-", EXP_SYMBOL: "E", PERMILL: "‰",
      INFINITY: "∞", NAN: "非數值", DECIMAL_PATTERN: "#,##0.###", SCIENTIFIC_PATTERN: "#E0",
      PERCENT_PATTERN: "#,##0%", CURRENCY_PATTERN: "¤#,##0.00", DEF_CURRENCY_CODE: "TWD",
      COMPACT_SHORT: [[3, "0"], [4, "0萬"], [8, "0億"], [12, "0兆"]],
      COMPACT_SHORT_CURRENCY: [[3, "0"], [4, "¤0萬"], [8, "¤0億"], [12, "¤0兆"]],
    },
    // intl's bare "zh": the MAINLAND row (DEF_CURRENCY_CODE CNY, compact 万 / 亿 / 万亿 in Simplified). No money, number
    // or percent the app draws for a zh user reads it — amounts are zh_TW (the currency's locale) and so are percents
    // (L10n.intlLocale) — so only a { locale: "app" } number or compact reaches it, the way "app" means
    // Localizations.localeOf(context).toString() everywhere in this file. Embedded so that option formats as Dart would
    // instead of throwing; a screen that wants the app's own numbers must not pass it.
    zh: {
      DECIMAL_SEP: ".", GROUP_SEP: ",", PERCENT: "%", ZERO_DIGIT: "0",
      PLUS_SIGN: "+", MINUS_SIGN: "-", EXP_SYMBOL: "E", PERMILL: "‰",
      INFINITY: "∞", NAN: "NaN", DECIMAL_PATTERN: "#,##0.###", SCIENTIFIC_PATTERN: "#E0",
      PERCENT_PATTERN: "#,##0%", CURRENCY_PATTERN: "¤#,##0.00", DEF_CURRENCY_CODE: "CNY",
      COMPACT_SHORT: [[3, "0"], [4, "0万"], [8, "0亿"], [12, "0万亿"]],
      COMPACT_SHORT_CURRENCY: [[3, "0"], [4, "¤0万"], [8, "¤0亿"], [12, "¤0万亿"]],
    },
  };
  NUMBER_DATA.en = NUMBER_DATA.en_US; // intl's en is identical to en_US (checked 2026-09-16)
  // intl's pt is identical to pt_BR, NAME apart (checked 2026-09-17). Not decoration: money() asks for the
  // CURRENCY's locale "pt_BR", percent() for the UI LANGUAGE's "pt" — without this, registration still succeeds
  // and fmt.percent throws at render time.
  NUMBER_DATA.pt = NUMBER_DATA.pt_BR;

  // intl constants.dart simpleCurrencySymbols (the entries this set can meet) and currencyFractionDigits
  // (USD, EUR, BRL and TRY are not listed there, so they take DEFAULT — 2, which is right for all four; the
  // table's "TRL": 0 is the pre-2005 lira and is not the one the app means). JPY and KRW are the two currencies
  // here that intl DOES list, both at 0, so neither the yen nor the won ever draws a fraction digit. JPY is
  // U+00A5 YEN SIGN, not the fullwidth U+FFE5; KRW is ₩ U+20A9 WON SIGN (intl also has 'KPW' on the same glyph —
  // the North Korean won, which the app does not offer); BRL is the two ASCII characters intl writes as r'R$',
  // one of the two "$" currencies where intl's symbol and CurrencyFormatter.symbolFor's agree (MXN is "$" there
  // and "MX$" here). TRY agrees too, but only since 2026-09-17: intl writes the lira as the two ASCII letters
  // "TL" — never ₺ U+20BA, which appears nowhere in the app — and symbolFor had no TRY case at all, so it fell
  // through to the code and the PDF/Excel exporters wrote "TRY35.555,40" under a screen that said "TL35.555,40".
  // symbolFor now returns "TL" as well (currency_format.dart), so both paths draw the same string. No screen
  // draws the exporter's path either way. KRW needed no such fix: symbolFor has returned ₩ U+20A9 — the same
  // single code point intl gives — since long before the store set existed, so money({ stripNbsp: true }) is
  // byte-identical to money() in Korean. TWD is the lira's case again, not the won's: intl writes r'NT$'
  // (constants.dart:51) while symbolFor has no TWD case and returns the code, so money({ stripNbsp: true }) is
  // "TWD27,000.00" where every screen says "NT$27,000.00" (see CURRENCY_FORMATTER_SYMBOLS below). TWD IS listed in
  // currencyFractionDigits, at 2 — CLDR's cash digits for it are 0, but intl does not use those — so the New Taiwan
  // dollar draws cents the way the dollar does; its 2 is copied below rather than left to DEFAULT so the table reads
  // like intl's.
  const SIMPLE_CURRENCY_SYMBOLS = { USD: "$", EUR: String.fromCharCode(0x20ac), MXN: "$", JPY: String.fromCharCode(0xa5), BRL: "R$", TRY: "TL", KRW: String.fromCharCode(0x20a9), TWD: "NT$" };
  const CURRENCY_FRACTION_DIGITS = { DEFAULT: 2, CLP: 0, JPY: 0, KRW: 0, TWD: 2 };

  // lib/core/data/currency_format.dart CurrencyFormatter.symbolFor (the switch, in full; any other code is itself).
  const CURRENCY_FORMATTER_SYMBOLS = {
    USD: "$", MXN: "MX$", CAD: "C$", AUD: "A$", NZD: "NZ$", SGD: "S$", HKD: "HK$", ARS: "AR$", CLP: "CL$", COP: "COP",
    PEN: "S/", BRL: "R$", EUR: "€", GBP: "£", JPY: "¥", CNY: "¥", KRW: "₩", INR: "₹", ZAR: "R", AED: "AED", SAR: "SAR",
  };
  // TRY is deliberately absent, mirroring the app: symbolFor has no 'TRY' case, so it falls through to the ISO
  // code and this path writes "TRY1.234,56" while every screen, which goes through simpleCurrency, writes
  // "TL1.234,56". A 'TRY' case was added on 2026-09-17 and REVERTED on 2026-09-18 (owner: app changes need
  // approval first), so the split is the app's real behaviour today and this table must keep it.
  // TWD is absent for the same reason (checked 2026-09-18: symbolFor's switch has no 'TWD' case), so this path
  // writes "TWD27,000.00" — zh_TW's "¤#,##0.00" glues the code on with no space — against the screens'
  // "NT$27,000.00". No replica screen draws this path (reports_home_view.dart:104, last_year_view.dart and the
  // onboarding plan do; none of them is in the store set).

  // lib/core/data/currency_locale_data.dart numericLocaleForCurrency: kCurrencyNumericLocale for the currencies this
  // set can meet, and _byAppLanguage (in full) — the euro and the Swiss franc depend on the app's language
  // (L10n.languageCode), because the currency alone does not say whether it is 1.234,56 € or 1 234,56 €. So EUR is
  // "fr_FR" for a French UI (Dart resolves it to intl's "fr"), "de_DE" in any language the table lacks. USD and JPY
  // are not in that table, so the UI language never changes them; Dart resolves "ja_JP" to "ja". BRL is
  // language-independent too, but unlike every other entry here Dart does NOT shorten "pt_BR" — intl ships a
  // pt_BR row of its own, so the reais are formatted with it and not with "pt". TRY is language-independent as
  // well, and Dart DOES shorten "tr_TR" — to "tr", which is the row the Turkish UI already writes its percents
  // with, so one row serves both. KRW is Turkish's case exactly: not in _byAppLanguage, so the UI language never
  // touches it, and Dart shortens "ko_KR" to "ko" — intl has no ko_KR row — which is the row the Korean UI
  // already writes its percents with, so one row serves both there too. TWD (currency_locale_data.dart:45) is
  // Brazil's case — "zh_TW" is a real intl row and stays itself — with a twist no earlier language had: the UI
  // language's Dart locale is "zh" (Localizations.localeOf), not "zh_TW", yet the percents still land on zh_TW,
  // because percentLabel asks L10n.intlLocale and that maps a bare zh to zh_TW (STORE_LANGS' intlLocale below).
  const CURRENCY_NUMERIC_LOCALE = { USD: "en_US", JPY: "ja_JP", EUR: "de_DE", CHF: "de_CH", BRL: "pt_BR", TRY: "tr_TR", KRW: "ko_KR", TWD: "zh_TW" };
  const CURRENCY_NUMERIC_LOCALE_BY_APP_LANGUAGE = {
    EUR: { de: "de_DE", fr: "fr_FR", it: "it_IT", es: "es_ES", pt: "pt_PT", en: "en_IE" },
    CHF: { de: "de_CH", fr: "fr_CH", it: "it_CH" },
  };

  // The app never sets Intl.defaultLocale, so intl falls back to systemLocale, which is "en_US" in Flutter.
  const DEFAULT_LOCALE = "en_US";

  // ================================================================ Dart primitives

  // double.round(): the nearest integer, ties away from zero.
  const dartRound = (x) => (x < 0 ? -Math.round(-x) : Math.round(x));
  // String of an int result ("-0" cannot happen in Dart ints).
  const intString = (x) => String(x === 0 ? 0 : x);
  // double.toStringAsFixed: the exact decimal value rounded half up with the sign kept ("-0.0" for -0.04 and for
  // -0.0) — Number.prototype.toFixed except that it drops the sign of -0.
  function dartFixed(x, digits) {
    if (Number.isNaN(x)) return "NaN";
    if (x === Infinity) return "Infinity";
    if (x === -Infinity) return "-Infinity";
    if (Math.abs(x) >= 1e21) return String(x);
    return Object.is(x, -0) ? `-${(0).toFixed(digits)}` : x.toFixed(digits);
  }
  const isNegative = (x) => x < 0 || Object.is(x, -0);

  // Dart's String.toUpperCase / toLowerCase apply Unicode SIMPLE case mapping (UnicodeData.txt: one code point in,
  // one code point out). JavaScript's apply FULL mapping (SpecialCasing.txt), which expands one code point into
  // several — ß → "SS", the ﬁ/ﬂ ligatures → "FI"/"FL", ŉ → "ʼN", the Greek iota-subscript letters — and lowers a
  // word-final Σ to ς. German is the only supported language where that bites: Dart uppercases "Größte Ausgaben"
  // to "GRÖßTE AUSGABEN", JS to "GRÖSSTE AUSGABEN", and 40 values in app_de.arb hold a ß. Mapping code point by
  // code point drops the final-sigma context rule (Dart: "ΑΣ" → "ασ"), and wherever JS expands, Dart's simple
  // mapping is the code point itself — except for the 27 Greek iota-subscript letters, whose simple uppercase is
  // the precomposed titlecase form (U+1F80 ᾀ → U+1F88 ᾈ: three +8 ranges plus three singles). Lowercase expands
  // for exactly one code point, U+0130 İ, which Dart lowercases to "i".
  //   Verified 2026-09-17 by `dart run` over all 1,112,064 code points: these rules reproduce Dart's answer for
  // every code point whose mapping Dart's Unicode tables and Node's agree on. They disagree, in both directions,
  // only on scripts added after the SDK's table vintage (Georgian Mtavruli, Cherokee lowercase, Osage, Vithkuqi,
  // Adlam, Medefaidrin, Garay). None of those appears in any app ARB or anywhere in this replica; the only
  // divergent characters that do appear are ß (de) and İ (tr).
  const greekIotaSubscriptUpper = (cp) => {
    if ((cp >= 0x1f80 && cp <= 0x1f87) || (cp >= 0x1f90 && cp <= 0x1f97) || (cp >= 0x1fa0 && cp <= 0x1fa7)) return String.fromCodePoint(cp + 8);
    if (cp === 0x1fb3) return "\u1FBC";
    if (cp === 0x1fc3) return "\u1FCC";
    if (cp === 0x1ff3) return "\u1FFC";
    return null;
  };
  function dartUpper(s) {
    let out = "";
    for (const ch of s) {
      const u = ch.toUpperCase();
      if ([...u].length === 1) { out += u; continue; }
      out += greekIotaSubscriptUpper(ch.codePointAt(0)) ?? ch;
    }
    return out;
  }
  function dartLower(s) {
    let out = "";
    for (const ch of s) out += ch === "\u0130" ? "i" : ch.toLowerCase();
    return out;
  }

  // lib/core/l10n/text_case.dart:16 localizedUpper — NOT the same thing as dartUpper. Dart's String.toUpperCase()
  // is locale-independent (dartUpper above is its model and must stay that way), so the app carries the
  // Turkish/Azeri rule itself: i → İ and ı → I applied BEFORE the plain mapping. Every other language is
  // dartUpper unchanged, so this only ever differs for a tr/az locale.
  // The app is deliberately inconsistent about which of the two an uppercased label gets, and a screen must
  // copy the call site it mirrors rather than pick one:
  //   localizedUpper (fmt.upperLocalized) — revamp_form.dart:622 RevampSectionLabel, member_shares_section
  //     .dart:183 plannerMembersTitle, category_detail_view.dart:530 plannerHeroSpentLabel, and since
  //     2026-09-17 planner_view.dart:706 _sectionLabel (plannerAllocationTitle, plannerBudgetByCategory: it
  //     used the plain call and shipped "NEREYE GIDIYOR" into a Turkish store image before it was fixed);
  //   plain toUpperCase (fmt.upper, { case: "upper" }) — the two hero month labels (planner_view.dart:787,
  //     expenses_view.dart:247), spending_income.dart:280 (Insights trend strip).
  // Turkish is the only wired language where the choice is visible: "Kim ne harcıyor" is "KİM NE HARCIYOR"
  // through one and "KIM NE HARCIYOR" through the other. Both are 15 code points, so the code-point parity check
  // in tools/strings.mjs cannot see a mix-up — it has to be compared by value.
  function localizedUpper(s, locale) {
    const lang = locale ? languageCodeOf(locale) : "";
    if (lang === "tr" || lang === "az") return dartUpper(s.replace(/i/g, "\u0130").replace(/\u0131/g, "I"));
    return dartUpper(s);
  }

  // intl.dart:543 toBeginningOfSentenceCase: upper-case the first UTF-16 unit (Turkish/Azeri dotted i).
  function toBeginningOfSentenceCase(input, locale) {
    if (input == null || input === "") return input;
    const first = input[0];
    const upper = first === "i" && locale && (locale.startsWith("tr") || locale.startsWith("az")) ? String.fromCharCode(0x130) : dartUpper(first);
    return upper + input.substring(1);
  }

  // ================================================================ locales (intl_helpers.dart)

  const hasOwn = (o, k) => Object.prototype.hasOwnProperty.call(o, k);

  // Every locale name Dart has data for at runtime. A name resolves against THESE exactly as intl's
  // verifiedLocale resolves it in the app, and only then is the result looked up in the data embedded above —
  // so "es_MX" or "en_GB" (which Dart formats with their own data) throw instead of quietly using es / en.
  //   numbers: intl 0.20.2 number_symbols_data.dart numberFormatSymbols (compactNumberSymbols has the same keys)
  //   dates:   DateFormat.allLocalesWithSymbols() after initializeDateFormatting() + the Flutter delegate —
  //            the same names plus en_ISO
  // (Both lists checked 2026-09-16 against the running Dart, with the resolution of 90 locale spellings.)
  const DART_NUMBER_LOCALES = new Set(`
    af am ar ar_DZ ar_EG as az be bg bm bn br bs ca chr cs cy da de de_AT de_CH el en en_AU en_CA en_GB en_IE en_IN
    en_MY en_NZ en_SG en_US en_ZA es es_419 es_ES es_MX es_US et eu fa fi fil fr fr_CA fr_CH fur ga gl gsw gu haw he
    hi hr hu hy id in is it it_CH iw ja ka kk km kn ko ky ln lo lt lv mg mk ml mn mr ms mt my nb ne nl no no_NO nyn
    or pa pl ps pt pt_BR pt_PT ro ru si sk sl sq sr sr_Latn sv sw ta te th tl tr uk ur uz vi zh zh_CN zh_HK zh_TW zu
  `.trim().split(/\s+/));
  const DART_DATE_LOCALES = new Set([...DART_NUMBER_LOCALES, "en_ISO"]);

  // intl_helpers.dart:134 _separatorIndex — only a "-" or "_" at index 2 or 3 counts
  function separatorIndex(l) {
    if (l.length < 3) return -1;
    if (l[2] === "-" || l[2] === "_") return 2;
    if (l.length < 4) return -1;
    if (l[3] === "-" || l[3] === "_") return 3;
    return -1;
  }
  // intl_helpers.dart:150
  function canonicalizedLocale(l) {
    if (l == null) return DEFAULT_LOCALE;
    if (l === "C") return "en_ISO";
    if (l.length < 5) return l;
    const i = separatorIndex(l);
    if (i === -1) return l;
    let region = l.substring(i + 1);
    if (region.length <= 3) region = region.toUpperCase();
    return `${l.substring(0, i)}_${region}`;
  }
  // intl_helpers.dart:213
  const DEPRECATED_LOCALES = { iw: "he", he: "iw", fil: "tl", tl: "fil", id: "in", in: "id", no: "nb", nb: "no" };
  const deprecatedLocale = (l) => (hasOwn(DEPRECATED_LOCALES, l) ? DEPRECATED_LOCALES[l] : l);
  // intl_helpers.dart:236
  function shortLocale(l) {
    if (l === "invalid") return "in";
    if (l.length < 2) return l;
    const i = separatorIndex(l);
    if (i === -1) return l.length < 4 ? l.toLowerCase() : l;
    return l.substring(0, i).toLowerCase();
  }
  // intl_helpers.dart:173 verifiedLocale: the locale name Dart formats with (null → Intl.systemLocale en_US),
  // or Dart's ArgumentError when there is none.
  function dartVerifiedLocale(l, names) {
    if (l == null) l = DEFAULT_LOCALE;
    if (typeof l !== "string") throw new TypeError(`[locale.js] a locale is a string like "en_US", got ${describe(l)}`);
    if (names.has(l)) return l;
    const fallbacks = [
      canonicalizedLocale,
      shortLocale,
      deprecatedLocale,
      (x) => deprecatedLocale(shortLocale(x)),
      (x) => deprecatedLocale(canonicalizedLocale(x)),
      () => "fallback",
    ];
    for (const f of fallbacks) {
      const x = f(l);
      if (names.has(x)) return x;
    }
    throw new Error(`[locale.js] Invalid locale "${l}" (Dart throws ArgumentError too)`);
  }
  // What Dart resolves `l` to, if this file embeds that locale's data; otherwise throws (never guesses).
  function verifiedLocale(l, table, what) {
    const resolved = dartVerifiedLocale(l, what === "date" ? DART_DATE_LOCALES : DART_NUMBER_LOCALES);
    if (hasOwn(table, resolved)) return resolved;
    const via = resolved === l ? "" : ` (Dart resolves "${l}" to "${resolved}", which has its own data there)`;
    const hint = hasOwn(STORE_LANGS, l)
      ? ` "${l}" is a store language code; a {locale} option takes a Dart locale name ("${STORE_LANGS[l].dartLocale}") or "app"`
      : ` Embed its rows from generated_date_localizations.dart / number_symbols_data.dart and re-run the probe`;
    throw new Error(`[locale.js] no ${what} data embedded for locale "${resolved}"${via}; embedded: ${Object.keys(table).sort().join(", ")}.${hint}`);
  }

  // A value, for error messages.
  function describe(v) {
    if (typeof v === "string") return JSON.stringify(v);
    if (v === undefined || v === null || typeof v !== "object") return String(v);
    if (Object.prototype.toString.call(v) === "[object Date]") return `Date(${v.getTime()})`;
    try {
      return JSON.stringify(v);
    } catch (err) {
      return Object.prototype.toString.call(v);
    }
  }

  // ================================================================ NumberFormat (number_format_parser.dart)

  function parseNumberPattern(symbols, input, isForCurrency, currencySymbol, currencyName, decimalDigits) {
    const r = {
      negativePrefix: symbols.MINUS_SIGN, positivePrefix: "", negativeSuffix: "", positiveSuffix: "",
      multiplier: 1, minimumExponentDigits: 0, maximumIntegerDigits: 40, minimumIntegerDigits: 1,
      maximumFractionDigits: 3, minimumFractionDigits: 0, groupingSize: 3, finalGroupingSize: 3,
      decimalSeparatorAlwaysShown: false, useSignForPositiveExponent: false, useExponentialNotation: false,
      decimalDigits: decimalDigits == null ? null : decimalDigits,
    };
    if (input == null) return r;
    const s = input;
    let i = 0;
    const atEnd = () => i >= s.length;
    const peek = (n = 1) => s.substring(i, Math.min(i + n, s.length));
    const pop = (n = 1) => { i += n; };
    const read = (n = 1) => { const x = peek(n); pop(n); return x; };
    let inQuote = false;
    let groupingSizeSetExplicitly = false;

    function parseCharacterAffix(affix) {
      if (atEnd()) return false;
      const ch = peek();
      if (ch === "'") {
        const p = peek(2);
        if (p.length === 2 && p[1] === "'") {
          pop();
          affix.push("'");
        } else inQuote = !inQuote;
        return true;
      }
      if (inQuote) affix.push(ch);
      else {
        switch (ch) {
          case "#": case "0": case ",": case ".": case ";":
            return false;
          case CURRENCY_SIGN:
            affix.push(currencySymbol);
            break;
          case "%":
            if (r.multiplier !== 1 && r.multiplier !== 100) throw new Error("Too many percent/permill");
            r.multiplier = 100;
            affix.push(symbols.PERCENT);
            break;
          case PER_MILLE:
            if (r.multiplier !== 1 && r.multiplier !== 1000) throw new Error("Too many percent/permill");
            r.multiplier = 1000;
            affix.push(symbols.PERMILL);
            break;
          default:
            affix.push(ch);
        }
      }
      return true;
    }
    function parseAffix() {
      const affix = [];
      inQuote = false;
      while (parseCharacterAffix(affix) && read().length) { /* consume */ }
      return affix.join("");
    }

    let decimalPos = -1, digitLeftCount = 0, zeroDigitCount = 0, digitRightCount = 0, groupingCount = -1;
    function parseTrunkCharacter(trunk) {
      const ch = peek();
      switch (ch) {
        case "#":
          if (zeroDigitCount > 0) digitRightCount++;
          else digitLeftCount++;
          if (groupingCount >= 0 && decimalPos < 0) groupingCount++;
          break;
        case "0":
          if (digitRightCount > 0) throw new Error(`Unexpected "0" in pattern "${s}"`);
          zeroDigitCount++;
          if (groupingCount >= 0 && decimalPos < 0) groupingCount++;
          break;
        case ",":
          if (groupingCount > 0) {
            groupingSizeSetExplicitly = true;
            r.groupingSize = groupingCount;
          }
          groupingCount = 0;
          break;
        case ".":
          if (decimalPos >= 0) throw new Error(`Multiple decimal separators in pattern "${s}"`);
          decimalPos = digitLeftCount + zeroDigitCount + digitRightCount;
          break;
        case "E":
          trunk.push(ch);
          if (r.useExponentialNotation) throw new Error(`Multiple exponential symbols in pattern "${s}"`);
          r.useExponentialNotation = true;
          r.minimumExponentDigits = 0;
          pop();
          if (peek() === "+") {
            trunk.push(read());
            r.useSignForPositiveExponent = true;
          }
          while (peek() === "0") {
            trunk.push(read());
            r.minimumExponentDigits++;
          }
          if (digitLeftCount + zeroDigitCount < 1 || r.minimumExponentDigits < 1) throw new Error(`Malformed exponential pattern "${s}"`);
          return false;
        default:
          return false;
      }
      trunk.push(ch);
      pop();
      return true;
    }
    function parseTrunk() {
      let loop = true;
      const trunk = [];
      while (peek().length && loop) loop = parseTrunkCharacter(trunk);
      if (zeroDigitCount === 0 && digitLeftCount > 0 && decimalPos >= 0) {
        const n = decimalPos === 0 ? 1 : decimalPos;
        digitRightCount = digitLeftCount - n;
        digitLeftCount = n - 1;
        zeroDigitCount = 1;
      }
      if ((decimalPos < 0 && digitRightCount > 0) ||
          (decimalPos >= 0 && (decimalPos < digitLeftCount || decimalPos > digitLeftCount + zeroDigitCount)) ||
          groupingCount === 0) {
        throw new Error(`Malformed pattern "${s}"`);
      }
      const totalDigits = digitLeftCount + zeroDigitCount + digitRightCount;
      r.maximumFractionDigits = decimalPos >= 0 ? totalDigits - decimalPos : 0;
      if (decimalPos >= 0) {
        r.minimumFractionDigits = digitLeftCount + zeroDigitCount - decimalPos;
        if (r.minimumFractionDigits < 0) r.minimumFractionDigits = 0;
      }
      const effectiveDecimalPos = decimalPos >= 0 ? decimalPos : totalDigits;
      r.minimumIntegerDigits = effectiveDecimalPos - digitLeftCount;
      if (r.useExponentialNotation) {
        r.maximumIntegerDigits = digitLeftCount + r.minimumIntegerDigits;
        if (r.maximumFractionDigits === 0 && r.minimumIntegerDigits === 0) r.minimumIntegerDigits = 1;
      }
      r.finalGroupingSize = Math.max(0, groupingCount);
      if (!groupingSizeSetExplicitly) r.groupingSize = r.finalGroupingSize;
      r.decimalSeparatorAlwaysShown = decimalPos === 0 || decimalPos === totalDigits;
      return trunk.join("");
    }

    r.positivePrefix = parseAffix();
    const trunk = parseTrunk();
    r.positiveSuffix = parseAffix();
    if (peek() === ";") {
      pop();
      r.negativePrefix = parseAffix();
      let t = 0;
      while (t < trunk.length) {
        const each = trunk[t++];
        if (peek() !== each && !atEnd()) throw new Error(`Positive and negative trunks must be the same: ${trunk}`);
        pop();
      }
      r.negativeSuffix = parseAffix();
    } else {
      r.negativePrefix = r.negativePrefix + r.positivePrefix;
      r.negativeSuffix = r.positiveSuffix + r.negativeSuffix;
    }
    if (isForCurrency && r.decimalDigits == null) {
      const upper = currencyName.toUpperCase();
      r.decimalDigits = upper in CURRENCY_FRACTION_DIGITS ? CURRENCY_FRACTION_DIGITS[upper] : CURRENCY_FRACTION_DIGITS.DEFAULT;
    }
    if (r.decimalDigits != null) {
      r.minimumFractionDigits = r.decimalDigits;
      r.maximumFractionDigits = r.decimalDigits;
    }
    return r;
  }

  // ================================================================ NumberFormat (number_format.dart)

  function assertNum(number) {
    if (typeof number !== "number") throw new TypeError(`[locale.js] NumberFormat.format: ${describe(number)} is not a number`);
  }

  // NumberFormat.numberOfIntegerDigits
  function numberOfIntegerDigits(number) {
    const n = Math.abs(number);
    let limit = 10;
    for (let digits = 1; digits < 19; digits++, limit *= 10) if (n < limit) return digits;
    return 19;
  }
  const pow10 = (e) => Math.pow(10, e);

  class NumberFormat {
    constructor(locale, getPattern, o = {}) {
      locale = verifiedLocale(locale, NUMBER_DATA, "number");
      const symbols = NUMBER_DATA[locale];
      const name = o.name == null ? symbols.DEF_CURRENCY_CODE : o.name;
      let currencySymbol = o.currencySymbol;
      if (currencySymbol == null && o.lookupSimpleCurrencySymbol) currencySymbol = SIMPLE_CURRENCY_SYMBOLS[name];
      if (currencySymbol == null) currencySymbol = name;
      const pattern = getPattern(symbols);
      const r = parseNumberPattern(symbols, pattern, !!o.isForCurrency, currencySymbol, name, o.decimalDigits);
      this.currencyName = name;
      this.currencySymbol = currencySymbol;
      this._isForCurrency = !!o.isForCurrency;
      this._locale = locale;
      this._pattern = pattern;
      this.symbols = symbols;
      this._positivePrefix = r.positivePrefix;
      this._negativePrefix = r.negativePrefix;
      this._positiveSuffix = r.positiveSuffix;
      this._negativeSuffix = r.negativeSuffix;
      this.multiplier = r.multiplier;
      this._multiplierDigits = dartRound(Math.log(r.multiplier) / Math.log(10));
      this._useExponentialNotation = r.useExponentialNotation;
      this.minimumExponentDigits = r.minimumExponentDigits;
      this.maximumIntegerDigits = r.maximumIntegerDigits;
      this.minimumIntegerDigits = r.minimumIntegerDigits;
      this._maximumFractionDigits = r.maximumFractionDigits;
      this._minimumFractionDigits = r.minimumFractionDigits;
      this._groupingSize = r.groupingSize;
      this._finalGroupingSize = r.finalGroupingSize;
      this._useSignForPositiveExponent = r.useSignForPositiveExponent;
      this._decimalSeparatorAlwaysShown = r.decimalSeparatorAlwaysShown;
      this.decimalDigits = r.decimalDigits;
      this._explicitMaximumFractionDigits = false;
      this._explicitMinimumFractionDigits = false;
      this._maximumSignificantDigits = null;
      this._minimumSignificantDigits = null;
      this.minimumSignificantDigitsStrict = false;
      this.significantDigitsInUse = false;
      this._buffer = [];
    }

    get locale() { return this._locale; }
    get positivePrefix() { return this._positivePrefix; }
    get negativePrefix() { return this._negativePrefix; }
    get positiveSuffix() { return this._positiveSuffix; }
    get negativeSuffix() { return this._negativeSuffix; }

    get maximumFractionDigits() { return this._maximumFractionDigits; }
    set maximumFractionDigits(x) {
      this.significantDigitsInUse = false;
      this._explicitMaximumFractionDigits = true;
      this._maximumFractionDigits = x;
      this._minimumFractionDigits = Math.min(this._minimumFractionDigits, x);
    }
    get minimumFractionDigits() { return this._minimumFractionDigits; }
    set minimumFractionDigits(x) {
      this.significantDigitsInUse = false;
      this._explicitMinimumFractionDigits = true;
      this._minimumFractionDigits = x;
      this._maximumFractionDigits = Math.max(this._maximumFractionDigits, x);
    }
    get maximumSignificantDigits() { return this._maximumSignificantDigits; }
    set maximumSignificantDigits(x) {
      this._maximumSignificantDigits = x;
      if (x != null && this._minimumSignificantDigits != null) this._minimumSignificantDigits = Math.min(this._minimumSignificantDigits, x);
      this.significantDigitsInUse = true;
    }
    get minimumSignificantDigits() { return this._minimumSignificantDigits; }
    set minimumSignificantDigits(x) {
      this._minimumSignificantDigits = x;
      if (x != null && this._maximumSignificantDigits != null) this._maximumSignificantDigits = Math.max(this._maximumSignificantDigits, x);
      this.significantDigitsInUse = true;
      this.minimumSignificantDigitsStrict = x != null;
    }
    set significantDigits(x) {
      this.minimumSignificantDigits = x;
      this.maximumSignificantDigits = x;
    }

    // Dart cascade style: nf.set({ minimumFractionDigits: 2, maximumFractionDigits: 2 }) applies in that order.
    set_(props) {
      for (const [k, v] of Object.entries(props)) this[k] = v;
      return this;
    }

    // number_format.dart:484. Dart's format(dynamic) throws NoSuchMethodError on a non-num; so does this.
    format(number) {
      assertNum(number);
      if (Number.isNaN(number)) return this.symbols.NAN;
      if (!Number.isFinite(number)) return `${this._signPrefix(number)}${this.symbols.INFINITY}`;
      this._buffer = [this._signPrefix(number)];
      this._formatNumber(Math.abs(number));
      this._buffer.push(this._signSuffix(number));
      const out = this._buffer.join("");
      this._buffer = [];
      return out;
    }

    _signPrefix(x) { return isNegative(x) ? this.negativePrefix : this.positivePrefix; }
    _signSuffix(x) { return isNegative(x) ? this.negativeSuffix : this.positiveSuffix; }

    _formatNumber(number) {
      if (this._useExponentialNotation) this._formatExponential(number);
      else this._formatFixed(number);
    }

    _formatExponential(number) {
      if (number === 0) {
        this._formatFixed(number);
        this._formatExponent(0);
        return;
      }
      let exponent = Math.floor(Math.log(number) / Math.log(10));
      let mantissa = number / Math.pow(10, exponent);
      if (this.maximumIntegerDigits > 1 && this.maximumIntegerDigits > this.minimumIntegerDigits) {
        while (exponent % this.maximumIntegerDigits !== 0) {
          mantissa *= 10;
          exponent--;
        }
      } else if (this.minimumIntegerDigits < 1) {
        exponent++;
        mantissa /= 10;
      } else {
        exponent -= this.minimumIntegerDigits - 1;
        mantissa *= Math.pow(10, this.minimumIntegerDigits - 1);
      }
      this._formatFixed(mantissa);
      this._formatExponent(exponent);
    }
    _formatExponent(exponent) {
      this._buffer.push(this.symbols.EXP_SYMBOL);
      if (exponent < 0) {
        exponent = -exponent;
        this._buffer.push(this.symbols.MINUS_SIGN);
      } else if (this._useSignForPositiveExponent) this._buffer.push(this.symbols.PLUS_SIGN);
      this._buffer.push(String(exponent).padStart(this.minimumExponentDigits, "0"));
    }

    _useDefaultSignificantDigits() { return !this._isForCurrency; }
    _adjustFractionDigits(fractionDigits, expectedSignificantDigits) {
      if (this._useDefaultSignificantDigits()) return fractionDigits;
      if (expectedSignificantDigits > 0) return this.decimalDigits;
      return Math.min(fractionDigits, this.decimalDigits);
    }

    _formatFixed(number) {
      let integerPart;
      let fractionPart;
      let extraIntegerDigits;
      let fractionDigits = this.maximumFractionDigits;
      let minFractionDigits = this.minimumFractionDigits;
      let power = 0;

      integerPart = Math.floor(number);
      let fraction = number - integerPart;
      if (Math.trunc(fraction) !== 0) {
        integerPart = number;
        fraction = 0;
      }

      const computeFractionDigits = () => {
        if (!this.significantDigitsInUse) return;
        const integerLength = number === 0 ? 1 : integerPart !== 0 ? numberOfIntegerDigits(integerPart) : Math.ceil(Math.log(fraction) / Math.LN10);
        if (this.minimumSignificantDigits != null) {
          const remaining = this.minimumSignificantDigits - this._multiplierDigits - integerLength;
          fractionDigits = Math.max(0, remaining);
          if (this.minimumSignificantDigitsStrict) minFractionDigits = fractionDigits;
          fractionDigits = this._adjustFractionDigits(fractionDigits, remaining);
        }
        if (this.maximumSignificantDigits != null) {
          if (this.maximumSignificantDigits === 0) {
            integerPart = 0;
            fractionDigits = 0;
          } else if (this.maximumSignificantDigits < integerLength + this._multiplierDigits) {
            const divideBy = pow10(integerLength - this.maximumSignificantDigits);
            if (this.maximumSignificantDigits < integerLength) integerPart = dartRound(integerPart / divideBy) * divideBy;
            fraction = dartRound(fraction / divideBy) * divideBy;
            fractionDigits = 0;
          } else {
            fractionDigits = this.maximumSignificantDigits - integerLength - this._multiplierDigits;
            fractionDigits = this._adjustFractionDigits(fractionDigits, fractionDigits);
          }
        }
        if (fractionDigits > this.maximumFractionDigits && this._explicitMaximumFractionDigits) {
          fractionDigits = Math.min(fractionDigits, this.maximumFractionDigits);
        }
        if (fractionDigits < this.minimumFractionDigits && this._explicitMinimumFractionDigits) {
          fractionDigits = this._minimumFractionDigits;
        }
      };

      computeFractionDigits();
      power = pow10(fractionDigits);
      const digitMultiplier = power * this.multiplier;
      let remainingDigits = Math.trunc(dartRound(fraction * digitMultiplier));
      let hasRounding = false;
      if (remainingDigits >= digitMultiplier) {
        integerPart++;
        remainingDigits -= digitMultiplier;
        hasRounding = true;
      } else if (numberOfIntegerDigits(remainingDigits) > numberOfIntegerDigits(Math.trunc(Math.floor(fraction * digitMultiplier)))) {
        fraction = remainingDigits / digitMultiplier;
        hasRounding = true;
      }
      if (hasRounding && this.significantDigitsInUse) computeFractionDigits();
      extraIntegerDigits = Math.trunc(remainingDigits / power);
      fractionPart = remainingDigits % power;

      let integerDigits = this._integerDigits(integerPart, extraIntegerDigits);
      let digitLength = integerDigits.length;
      const fractionPresent = fractionDigits > 0 && (minFractionDigits > 0 || fractionPart > 0);
      if (integerDigits.length || this.minimumIntegerDigits > 0) {
        integerDigits = "0".repeat(Math.max(0, this.minimumIntegerDigits - digitLength)) + integerDigits;
        digitLength = integerDigits.length;
        for (let i = 0; i < digitLength; i++) {
          this._buffer.push(integerDigits[i]);
          this._group(digitLength, i);
        }
      } else if (!fractionPresent) {
        this._buffer.push(this.symbols.ZERO_DIGIT);
      }
      if (this._decimalSeparatorAlwaysShown || fractionPresent) this._buffer.push(this.symbols.DECIMAL_SEP);
      if (fractionPresent) this._formatFractionPart(String(fractionPart + power), minFractionDigits);
    }

    _integerDigits(integerPart, extraIntegerDigits) {
      const extra = extraIntegerDigits === 0 ? "" : String(extraIntegerDigits);
      const intDigits = this._mainIntegerDigits(integerPart);
      const paddedExtra = intDigits.length === 0 ? extra : extra.padStart(this._multiplierDigits, "0");
      return `${intDigits}${paddedExtra}`;
    }
    _mainIntegerDigits(integer) {
      if (integer === 0) return "";
      let digits = String(integer);
      if (this.significantDigitsInUse && this.maximumSignificantDigits != null && digits.length > this.maximumSignificantDigits) {
        digits = digits.substring(0, this.maximumSignificantDigits) + "0".repeat(digits.length - this.maximumSignificantDigits);
      }
      return digits.startsWith("-") ? digits.substring(1) : digits;
    }
    _formatFractionPart(fractionPart, minDigits) {
      let len = fractionPart.length;
      while (fractionPart[len - 1] === "0" && len > minDigits + 1) len--;
      for (let i = 1; i < len; i++) this._buffer.push(fractionPart[i]);
    }
    _group(totalLength, position) {
      const distanceFromEnd = totalLength - position;
      if (distanceFromEnd <= 1 || this._groupingSize <= 0) return;
      if (distanceFromEnd === this._finalGroupingSize + 1) this._buffer.push(this.symbols.GROUP_SEP);
      else if (distanceFromEnd > this._finalGroupingSize && (distanceFromEnd - this._finalGroupingSize) % this._groupingSize === 1) {
        this._buffer.push(this.symbols.GROUP_SEP);
      }
    }
    turnOffGrouping() {
      this._groupingSize = 0;
      this._finalGroupingSize = 0;
    }
  }

  // ================================================================ compact (compact_number_format.dart)

  const DEFAULT_COMPACT_STYLE = { pattern: null, divisor: 1, positivePrefix: "", negativePrefix: "", positiveSuffix: "", negativeSuffix: "", isDirectValue: false };
  const isFallbackStyle = (st) => st == null || st.pattern == null || st.pattern === "0";

  function createCompactStyle(symbols, pattern, normalizedExponent, explicitSign) {
    let prefix = "";
    let suffix = "";
    let divisor = 1;
    let isDirectValue = false;
    const match = /([^0]*)(0+)(.*)/.exec(pattern);
    if (match) {
      prefix = match[1];
      suffix = match[3];
      if (!/^0*$/.test(pattern)) divisor = pow10(normalizedExponent - match[2].length + 1);
    } else if (pattern.length && !pattern.includes("0")) {
      divisor = pow10(normalizedExponent);
      isDirectValue = true;
    }
    return {
      pattern,
      positivePrefix: explicitSign ? `${symbols.PLUS_SIGN}${prefix}` : prefix,
      negativePrefix: `${symbols.MINUS_SIGN}${prefix}`,
      positiveSuffix: suffix,
      negativeSuffix: suffix,
      divisor,
      isDirectValue,
    };
  }

  class CompactNumberFormat extends NumberFormat {
    constructor(o) {
      const getPattern = o.getPattern || ((s) => s.DECIMAL_PATTERN);
      super(o.locale, getPattern, o);
      const table = o.currencyPattern ? this.symbols.COMPACT_SHORT_CURRENCY : this.symbols.COMPACT_SHORT;
      this._explicitSign = !!o.explicitSign;
      this._styles = table.map(([exponent, pattern]) => {
        if (pattern.includes(";")) throw new Error("[locale.js] compact patterns with a negative part are not ported");
        return [exponent, createCompactStyle(this.symbols, pattern, exponent, this._explicitSign)];
      });
      this._style = null;
      // significantDigits = 3 (the compact override), then turnOffGrouping()
      this._explicitMinimumFractionDigits = false;
      this.minimumSignificantDigits = 3;
      this.maximumSignificantDigits = null;
      this.minimumSignificantDigitsStrict = false;
      this.turnOffGrouping();
    }

    get minimumFractionDigits() {
      return this._style != null && !isFallbackStyle(this._style) && !this._explicitMinimumFractionDigits ? 0 : this._minimumFractionDigits;
    }
    set minimumFractionDigits(x) { super.minimumFractionDigits = x; }
    get positivePrefix() { return isFallbackStyle(this._style) ? this._positivePrefix : this._style.positivePrefix; }
    get negativePrefix() { return isFallbackStyle(this._style) ? this._negativePrefix : this._style.negativePrefix; }
    get positiveSuffix() { return isFallbackStyle(this._style) ? this._positiveSuffix : this._style.positiveSuffix; }
    get negativeSuffix() { return isFallbackStyle(this._style) ? this._negativeSuffix : this._style.negativeSuffix; }

    _useDefaultSignificantDigits() { return !this._isForCurrency || !isFallbackStyle(this._style); }

    format(number) {
      assertNum(number);
      const style = this._styleFor(number);
      this._style = style;
      const divisor = isFallbackStyle(style) ? 1 : style.divisor;
      const numberToFormat = number / divisor;
      let formatted = style.isDirectValue ? `${this._signPrefix(number)}${style.pattern}${this._signSuffix(number)}` : super.format(numberToFormat);
      if (this._explicitSign && isFallbackStyle(style) && number >= 0 && !formatted.includes(this.symbols.PLUS_SIGN)) {
        formatted = `${this.symbols.PLUS_SIGN}${formatted}`;
      }
      if (this._isForCurrency && !isFallbackStyle(style)) formatted = formatted.replace(CURRENCY_SIGN, () => this.currencySymbol);
      this._style = null;
      return formatted;
    }

    _styleFor(number) {
      if (Math.abs(number) < 10) return DEFAULT_COMPACT_STYLE;
      let rounded = number;
      let digitLength = numberOfIntegerDigits(number);
      let divisor = 1;
      const updateRounding = () => {
        let fractionDigits = this.maximumFractionDigits;
        if (this.significantDigitsInUse) {
          const divisorLength = numberOfIntegerDigits(divisor);
          const sig = this.maximumSignificantDigits != null ? this.maximumSignificantDigits : this.minimumSignificantDigits != null ? this.minimumSignificantDigits : 0;
          fractionDigits = sig - digitLength + divisorLength - 1;
          if (this.maximumSignificantDigits == null) fractionDigits = Math.max(0, fractionDigits);
        }
        const fractionMultiplier = pow10(fractionDigits);
        rounded = (dartRound((rounded * fractionMultiplier) / divisor) * divisor) / fractionMultiplier;
        digitLength = numberOfIntegerDigits(rounded);
      };
      updateRounding();
      let style = null;
      for (const [exponent, st] of this._styles) {
        if (exponent + 1 > digitLength) break;
        style = st;
        divisor = st.divisor;
        updateRounding();
      }
      return style || DEFAULT_COMPACT_STYLE;
    }
  }

  const NF = {
    decimalPattern: (locale) => new NumberFormat(locale, (s) => s.DECIMAL_PATTERN),
    percentPattern: (locale) => new NumberFormat(locale, (s) => s.PERCENT_PATTERN),
    currency: ({ locale, name, symbol, decimalDigits, customPattern } = {}) =>
      new NumberFormat(locale, (s) => customPattern || s.CURRENCY_PATTERN, { name, currencySymbol: symbol, decimalDigits, isForCurrency: true }),
    simpleCurrency: ({ locale, name, decimalDigits } = {}) =>
      new NumberFormat(locale, (s) => s.CURRENCY_PATTERN, { name, decimalDigits, lookupSimpleCurrencySymbol: true, isForCurrency: true }),
    compact: ({ locale, explicitSign } = {}) => new CompactNumberFormat({ locale, explicitSign }),
    compactSimpleCurrency: ({ locale, name, decimalDigits } = {}) =>
      new CompactNumberFormat({ locale, name, decimalDigits, getPattern: (s) => s.CURRENCY_PATTERN, currencyPattern: true, lookupSimpleCurrencySymbol: true, isForCurrency: true }),
    compactCurrency: ({ locale, name, symbol, decimalDigits } = {}) =>
      new CompactNumberFormat({ locale, name, currencySymbol: symbol, decimalDigits, getPattern: (s) => s.CURRENCY_PATTERN, currencyPattern: true, isForCurrency: true }),
  };

  // ================================================================ DateFormat (date_format.dart, date_format_field.dart)

  // A Dart-like DateTime view of the input, local time.
  function toDateTime(d) {
    let date;
    // a Date from any realm (another window or vm context fails instanceof)
    if (Object.prototype.toString.call(d) === "[object Date]") date = new Date(d.getTime());
    else if (Array.isArray(d)) date = new Date(d[0], (d[1] || 1) - 1, d[2] || 1, d[3] || 0, d[4] || 0, d[5] || 0, d[6] || 0);
    else if (typeof d === "number") date = new Date(d);
    else if (typeof d === "string") {
      const m = /^(-?\d{4,})-(\d{2})(?:-(\d{2}))?(?:[T ](\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{1,3}))?)?)?$/.exec(d.trim());
      if (!m) throw new Error(`[locale.js] cannot read date "${d}" (use "2026-09-15" or "2026-09-15T09:41")`);
      date = new Date(+m[1], +m[2] - 1, m[3] ? +m[3] : 1, m[4] ? +m[4] : 0, m[5] ? +m[5] : 0, m[6] ? +m[6] : 0, m[7] ? +m[7].padEnd(3, "0") : 0);
    } else throw new Error(`[locale.js] cannot read date ${String(d)}`);
    if (Number.isNaN(date.getTime())) throw new Error(`[locale.js] invalid date ${String(d)}`);
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      hour: date.getHours(),
      minute: date.getMinutes(),
      second: date.getSeconds(),
      millisecond: date.getMilliseconds(),
      weekdayIndex: date.getDay(), // Dart weekday % 7: Sunday 0
    };
  }

  const FIELD_RE = /^(?:G+|y+|M+|k+|S+|E+|a+|h+|K+|H+|c+|L+|Q+|d+|D+|m+|s+|v+|z+|Z+)/;
  const QUOTED_RE = /^'(?:[^']|'')*'/;
  const LITERAL_RE = /^[^'GyMkSEahKHcLQdDmsvzZ]+/;

  function parseDatePattern(pattern) {
    const fields = [];
    let rest = pattern;
    while (rest.length) {
      let m = QUOTED_RE.exec(rest);
      if (m) {
        const full = m[0];
        fields.push({ literal: full === "''" ? "'" : full.substring(1, full.length - 1).replace(/''/g, "'") });
        rest = rest.substring(full.length);
        continue;
      }
      m = FIELD_RE.exec(rest);
      if (m) fields.push({ field: m[0] });
      else {
        m = LITERAL_RE.exec(rest);
        if (!m) break; // an unclosed quote: intl stops parsing there too
        fields.push({ literal: m[0] });
      }
      rest = rest.substring(m[0].length);
    }
    return fields;
  }

  const isLeapYear = (year) => new Date(year, 1, 29).getMonth() === 1;
  function dayOfYear(month, day, leap) {
    if (month === 1) return day;
    if (month === 2) return day + 31;
    return Math.floor(30.6 * month - 91.4) + day + 59 + (leap ? 1 : 0);
  }

  function formatDateField(p, t, S) {
    const width = p.length;
    const pad = (w, v) => String(v).padStart(w, "0");
    switch (p[0]) {
      case "a": return S.AMPMS[t.hour >= 12 && t.hour < 24 ? 1 : 0];
      case "c":
        if (width === 5) return S.STANDALONENARROWWEEKDAYS[t.weekdayIndex];
        if (width === 4) return S.STANDALONEWEEKDAYS[t.weekdayIndex];
        if (width === 3) return S.STANDALONESHORTWEEKDAYS[t.weekdayIndex];
        return pad(1, t.day);
      case "d": return pad(width, t.day);
      case "D": return pad(width, dayOfYear(t.month, t.day, isLeapYear(t.year)));
      case "E":
        if (width <= 3) return S.SHORTWEEKDAYS[t.weekdayIndex];
        if (width === 4) return S.WEEKDAYS[t.weekdayIndex];
        if (width === 5) return S.NARROWWEEKDAYS[t.weekdayIndex];
        throw new Error('"Short" weekdays are currently not supported.');
      case "G": return width >= 4 ? S.ERANAMES[t.year > 0 ? 1 : 0] : S.ERAS[t.year > 0 ? 1 : 0];
      case "h": {
        let hours = t.hour;
        if (t.hour > 12) hours -= 12;
        if (hours === 0) hours = 12;
        return pad(width, hours);
      }
      case "H": return pad(width, t.hour);
      case "K": return pad(width, t.hour % 12);
      case "k": return pad(width, t.hour === 0 ? 24 : t.hour);
      case "L":
        if (width === 5) return S.STANDALONENARROWMONTHS[t.month - 1];
        if (width === 4) return S.STANDALONEMONTHS[t.month - 1];
        if (width === 3) return S.STANDALONESHORTMONTHS[t.month - 1];
        return pad(width, t.month);
      case "M":
        if (width === 5) return S.NARROWMONTHS[t.month - 1];
        if (width === 4) return S.MONTHS[t.month - 1];
        if (width === 3) return S.SHORTMONTHS[t.month - 1];
        return pad(width, t.month);
      case "m": return pad(width, t.minute);
      case "Q": {
        const quarter = Math.trunc((t.month - 1) / 3);
        if (width === 4) return S.QUARTERS[quarter];
        if (width === 3) return S.SHORTQUARTERS[quarter];
        return pad(width, quarter + 1);
      }
      case "S": return pad(3, t.millisecond) + (width - 3 > 0 ? pad(width - 3, 0) : "");
      case "s": return pad(width, t.second);
      case "y": {
        const year = Math.abs(t.year);
        return width === 2 ? pad(2, year % 100) : pad(width, year);
      }
      default: return ""; // v, z, Z
    }
  }

  const dateFormatCache = new Map();
  // date_format.dart:266 DateFormat([newPattern, locale]) + addPattern (:759): a skeleton name resolves to the
  // locale's pattern, anything else is an explicit pattern; no pattern at all is _useDefaultPattern (:724),
  // yMMMMd + " " + jms.
  function DateFormat(pattern, locale) {
    locale = verifiedLocale(locale, DATE_DATA, "date");
    if (pattern != null && typeof pattern !== "string") throw new TypeError(`[locale.js] DateFormat: a pattern is a string, got ${describe(pattern)}`);
    const key = `${locale}|${pattern == null ? " default" : pattern}`;
    let cached = dateFormatCache.get(key);
    if (!cached) {
      const data = DATE_DATA[locale];
      const skeleton = (p) => (hasOwn(data.patterns, p) ? data.patterns[p] : p);
      const actual = pattern == null ? `${skeleton("yMMMMd")} ${skeleton("jms")}` : skeleton(pattern);
      const fields = parseDatePattern(actual);
      cached = {
        locale,
        pattern: actual,
        format: (d) => {
          const t = toDateTime(d);
          return fields.map((f) => (f.literal != null ? f.literal : formatDateField(f.field, t, data))).join("");
        },
      };
      dateFormatCache.set(key, cached);
    }
    return cached;
  }

  // ================================================================ the app's helpers

  // appLanguage: L10n.languageCode, the UI locale's language code ("fr" for Locale('fr')). Required for a currency
  // whose locale depends on it (EUR, CHF): the app would read the running language, so a guess here could only hide
  // a wrong one.
  function numericLocaleForCurrency(code, appLanguage) {
    const key = String(code).toUpperCase();
    const byLanguage = hasOwn(CURRENCY_NUMERIC_LOCALE_BY_APP_LANGUAGE, key) ? CURRENCY_NUMERIC_LOCALE_BY_APP_LANGUAGE[key] : null;
    if (byLanguage) {
      if (typeof appLanguage !== "string" || !appLanguage) {
        throw new Error(`[locale.js] numericLocaleForCurrency("${key}") needs the app language (L10n.languageCode, e.g. "fr"): ${key}'s locale depends on it`);
      }
      if (hasOwn(byLanguage, appLanguage)) return byLanguage[appLanguage];
    }
    const loc = hasOwn(CURRENCY_NUMERIC_LOCALE, key) ? CURRENCY_NUMERIC_LOCALE[key] : null;
    if (!loc) throw new Error(`[locale.js] no numeric locale for currency ${code} — see currency_locale_data.dart and add its data`);
    return loc;
  }

  // L10n.languageCode for a Dart locale name: Locale.languageCode, the part before "_" ("fr" for "fr", "pt" for "pt_BR").
  const languageCodeOf = (dartLocale) => dartLocale.split(/[_-]/)[0];

  // One store language's ctx.fmt. cfg: { lang, dartLocale, intlLocale, currencyCode }
  //   dartLocale  Localizations.localeOf(context).toString(): dates, month and weekday names, { locale: "app" }
  //   intlLocale  L10n.intlLocale (lib/core/l10n/l10n.dart _toIntlLocale): percents. Omitted, it is dartLocale,
  //               which is what _toIntlLocale gives every supported locale but one — the bare Locale('zh'), which
  //               it maps to "zh_TW" (see the header)
  //
  // Every function checks its arguments and throws "[locale.js] fmt.<fn>: …" (after adding
  // "<lang> · fmt · <fn>: …" to BYBApp.missing) instead of printing "$∞", "NaN%" or a month it guessed: a store
  // image must never show junk from a typo in a screen or a hole in the demo data.
  function makeFmt(cfg) {
    const lang = cfg.lang;
    const dartLocale = cfg.dartLocale;
    const intlLocale = cfg.intlLocale == null ? dartLocale : cfg.intlLocale;
    const currencyCode = cfg.currencyCode || "USD";
    if (typeof dartLocale !== "string" || !dartLocale) throw new Error(`[locale.js] makeFmt: dartLocale must be a Dart locale name like "es", got ${describe(dartLocale)}`);
    if (typeof intlLocale !== "string" || !intlLocale) throw new Error(`[locale.js] makeFmt: intlLocale must be a Dart locale name like "zh_TW", got ${describe(intlLocale)}`);
    const numericLocale = numericLocaleForCurrency(currencyCode, languageCodeOf(dartLocale));
    verifiedLocale(dartLocale, DATE_DATA, "date"); // every date format needs it: fail at registration, not at render
    verifiedLocale(intlLocale, NUMBER_DATA, "number"); // and every percent this one
    const cache = new Map();
    const memo = (key, make) => {
      let v = cache.get(key);
      if (!v) cache.set(key, (v = make()));
      return v;
    };

    const simple = memo("simple", () => NF.simpleCurrency({ name: currencyCode, locale: numericLocale }));
    const symbol = simple.currencySymbol;
    const currencyDigits = simple.maximumFractionDigits;

    // NumberFormat.decimalPattern(locale) ..minimumFractionDigits = d ..maximumFractionDigits = d
    // (digits null: the pattern's own 0–3)
    const decimal = (digits, locale) =>
      memo(`dec|${locale}|${digits}`, () => {
        const nf = NF.decimalPattern(locale);
        if (digits != null) {
          nf.minimumFractionDigits = digits;
          nf.maximumFractionDigits = digits;
        }
        return nf;
      });

    // ---- argument checks
    class FmtError extends Error {}
    const fail = (fn, problem) => {
      throw new FmtError(`[locale.js] fmt.${fn}: ${problem}`);
    };
    const finite = (fn, n, what = "an amount") => {
      if (typeof n !== "number" || !Number.isFinite(n)) fail(fn, `${what} must be a finite number, got ${describe(n)}`);
    };
    const digitsArg = (fn, d) => {
      if (d != null && !(Number.isInteger(d) && d >= 0 && d <= 20)) {
        fail(fn, `digits must be an integer 0–20, got ${describe(d)}${typeof d === "object" ? ` (options go after digits: ${fn}(n, digits, { … }))` : ""}`);
      }
    };
    const options = (fn, o, allowed) => {
      if (o == null) return {};
      if (typeof o !== "object" || Array.isArray(o) || Object.prototype.toString.call(o) !== "[object Object]") {
        fail(fn, `options must be an object { ${allowed.join(", ")} }, got ${describe(o)}`);
      }
      for (const k of Object.keys(o)) if (!allowed.includes(k)) fail(fn, `unknown option "${k}" (it takes ${allowed.join(", ")})`);
      return o;
    };
    const flag = (fn, o, k) => {
      if (o[k] != null && typeof o[k] !== "boolean") fail(fn, `${k} must be true or false, got ${describe(o[k])}`);
      return o[k] === true;
    };
    const localeOpt = (fn, o) => {
      if (o.locale == null) return null;
      if (typeof o.locale !== "string" || !o.locale) fail(fn, `locale must be a Dart locale name ("en_US", "es") or "app", got ${describe(o.locale)}`);
      if (hasOwn(STORE_LANGS, o.locale) && !DART_NUMBER_LOCALES.has(o.locale)) {
        fail(fn, `locale "${o.locale}" is a store language code; pass a Dart locale name ("${STORE_LANGS[o.locale].dartLocale}") or "app"`);
      }
      return o.locale === "app" ? dartLocale : o.locale;
    };
    const text = (fn, s) => {
      if (typeof s !== "string") fail(fn, `expected a string, got ${describe(s)}`);
    };
    // Records any failure (an argument check or the engine's "no data for locale") in BYBApp.missing, the set
    // the gallery and the export gates read, then rethrows.
    const guard = (fn, impl) => (...args) => {
      try {
        return impl(...args);
      } catch (err) {
        const msg = String(err && err.message).replace(/^\[locale\.js\] /, "");
        if (A.missing && typeof A.missing.add === "function") A.missing.add(`${lang || dartLocale} · fmt · ${msg.startsWith("fmt.") ? msg.slice(4) : `${fn}: ${msg}`}`);
        throw err;
      }
    };

    // ---- the formats
    //
    // currency_format.dart:110 MoneyFormat — one NumberFormat.simpleCurrency in the CURRENCY's numeric locale
    // composes the whole string, so the symbol lands on the side that locale writes it on and the currency's
    // own fraction digits apply. Since 2026-09-17 every money site on a screen funnels through it; before that
    // each screen glued the symbol in front of a decimalPattern figure, which is right for the dollar alone.
    const money = (n, o0) => {
      const o = options("money", o0, ["digits", "signed", "compact", "stripNbsp", "intl", "locale"]);
      finite("money", n);
      digitsArg("money", o.digits);
      const signed = flag("money", o, "signed");
      const compact = flag("money", o, "compact");
      const stripNbsp = flag("money", o, "stripNbsp");
      flag("money", o, "intl"); // legacy spelling: type-checked, then ignored — see the header
      const locale = localeOpt("money", o);
      if (signed && (compact || stripNbsp || o.digits != null)) {
        fail("money", "signed is MoneyFormat.formatSigned on its own: it takes no digits and does not combine with compact or stripNbsp");
      }
      if (compact && stripNbsp) fail("money", "compact and stripNbsp are two different formatters; pick one");
      if (compact && o.digits != null) fail("money", "compact takes no digits (compactSimpleCurrency rounds to 3 significant digits)");
      if (stripNbsp && (o.digits != null || locale != null)) {
        fail("money", "stripNbsp is CurrencyFormatter.buildFor + stripNbsp (the currency's own numeric locale and digits): { stripNbsp: true }, nothing else");
      }
      if (locale != null && !compact) fail("money", `locale goes with compact; every other money format uses the currency's numeric locale (${numericLocale})`);
      if (compact) {
        const loc = locale || numericLocale;
        return memo(`compactCur|${loc}`, () => NF.compactSimpleCurrency({ name: currencyCode, locale: loc })).format(n);
      }
      if (stripNbsp) {
        // currency_format.dart:79 buildFor: NumberFormat.currency(locale: numeric, name: code, symbol: symbolFor(code)),
        // then :91 stripNbsp: U+00A0 and U+202F -> " " (reports_home_view.dart:104). fr: "2 370,36 EUR-sign", plain spaces.
        const sym = hasOwn(CURRENCY_FORMATTER_SYMBOLS, currencyCode) ? CURRENCY_FORMATTER_SYMBOLS[currencyCode] : currencyCode;
        const nf = memo("buildFor", () => NF.currency({ locale: numericLocale, name: currencyCode, symbol: sym }));
        return nf.format(n).replace(/\u00a0/g, " ").replace(/\u202f/g, " ");
      }
      // formatSigned (:151): intl writes the minus itself, on the side the locale puts it; only "+" is added.
      if (signed) {
        const s = simple.format(n);
        return n < 0 ? s : `+${s}`;
      }
      // formatWhole (:146) — simpleCurrency with the fraction digits pinned instead of the currency's own.
      if (o.digits != null && o.digits !== currencyDigits) {
        return memo(`simple|${numericLocale}|${o.digits}`, () => NF.simpleCurrency({ name: currencyCode, locale: numericLocale, decimalDigits: o.digits })).format(n);
      }
      return simple.format(n); // format (:142)
    };

    const compact = (n, o0) => {
      const o = options("compact", o0, ["locale"]);
      finite("compact", n);
      const loc = localeOpt("compact", o) || numericLocale;
      return memo(`compact|${loc}`, () => NF.compact({ locale: loc })).format(n);
    };

    const number = (n, digits, o0) => {
      const o = options("number", o0, ["locale"]);
      finite("number", n);
      digitsArg("number", digits);
      return decimal(digits == null ? null : digits, localeOpt("number", o) || numericLocale).format(n);
    };

    const round = (n) => {
      finite("round", n);
      return intString(dartRound(n));
    };

    const fixed = (n, digits = 0) => {
      finite("fixed", n);
      if (!(Number.isInteger(digits) && digits >= 0 && digits <= 20)) fail("fixed", `digits must be an integer 0–20, got ${describe(digits)}`);
      return dartFixed(n, digits);
    };

    // number_labels.dart:21 percentLabel — NumberFormat.percentPattern(L10n.intlLocale) with
    // min = max = decimals, formatting percent / 100 (the pattern carries the x100), then intl's plain U+00A0
    // before "%" narrowed to the U+202F CLDR moved to and the ARB files were translated with. The locale is
    // the UI LANGUAGE, not the currency's: a percentage is a word of the language it sits in — spelled as
    // L10n.intlLocale spells it (intlLocale: "zh_TW" for Chinese, the dartLocale for every other language).
    const percentFmt = (digits) =>
      memo(`pct|${digits}`, () => {
        const nf = NF.percentPattern(intlLocale);
        nf.minimumFractionDigits = digits; // this order: Dart's ..min ..max cascade
        nf.maximumFractionDigits = digits;
        return nf;
      });
    const percent = (n, digits = 0, o0) => {
      const o = options("percent", o0, ["signed"]);
      finite("percent", n, "a percent");
      digitsArg("percent", digits);
      const signed = flag("percent", o, "signed");
      const out = percentFmt(digits == null ? 0 : digits).format(n / 100).replace(/\u00a0%/g, "\u202f%");
      return signed && n >= 0 ? `+${out}` : out;
    };

    const date = (d, pattern, o0) => {
      const o = options("date", o0, ["case", "locale"]);
      if (typeof pattern !== "string" || !pattern) fail("date", `pattern must be a skeleton ("yMMMd") or a pattern ("MMMM yyyy"), got ${describe(pattern)}`);
      if (o.case != null && !["upper", "lower", "sentence"].includes(o.case)) fail("date", `case must be "upper", "lower" or "sentence", got ${describe(o.case)}`);
      const loc = localeOpt("date", o) || dartLocale;
      const s = DateFormat(pattern, loc).format(d);
      return applyCase(s, o.case, loc);
    };

    const month = (i, width = "long") => {
      if (!(Number.isInteger(i) && i >= 0 && i <= 11)) fail("month", `the month index is 0-based, an integer 0–11, got ${describe(i)}`);
      const skeletons = { long: "MMMM", short: "MMM", narrow: "LLLLL" };
      if (typeof width !== "string" || !hasOwn(skeletons, width)) fail("month", `width must be "long", "short" or "narrow", got ${describe(width)}`);
      return DateFormat(skeletons[width], dartLocale).format(new Date(2026, i, 1));
    };

    // date_labels.dart:15 — DateFormat.E(locale).format(date).characters.take(2)
    const weekdayLabel = (d) => graphemes(DateFormat("E", dartLocale).format(d)).slice(0, 2).join("");

    return {
      lang,
      dartLocale,
      intlLocale,
      numericLocale,
      currencyCode,
      symbol,
      currencyDigits,
      money: guard("money", money),
      compact: guard("compact", compact),
      number: guard("number", number),
      round: guard("round", round),
      fixed: guard("fixed", fixed),
      percent: guard("percent", percent),
      date: guard("date", date),
      month: guard("month", month),
      weekdayLabel: guard("weekdayLabel", weekdayLabel),
      upper: guard("upper", (s) => (text("upper", s), dartUpper(s))),
      lower: guard("lower", (s) => (text("lower", s), dartLower(s))),
      sentence: guard("sentence", (s) => (text("sentence", s), toBeginningOfSentenceCase(s, dartLocale))),
      upperLocalized: guard("upperLocalized", (s) => (text("upperLocalized", s), localizedUpper(s, dartLocale))),
    };
  }

  function applyCase(s, mode, locale) {
    if (!mode) return s;
    if (mode === "upper") return dartUpper(s);
    if (mode === "lower") return dartLower(s);
    if (mode === "sentence") return toBeginningOfSentenceCase(s, locale);
    throw new Error(`[locale.js] unknown case "${mode}" (upper | lower | sentence)`);
  }

  function graphemes(s) {
    if (typeof Intl !== "undefined" && Intl.Segmenter) return [...new Intl.Segmenter(undefined, { granularity: "grapheme" }).segment(s)].map((x) => x.segment);
    return Array.from(s);
  }

  // ================================================================ registration

  // store language → the Dart locale the app runs in for it (dates) and the user's currency (numbers).
  // A language in theme.js that is missing here has no ctx.fmt (tools/strings.mjs --check fails on it).
  const STORE_LANGS = {
    en: { dartLocale: "en", currencyCode: "USD" },
    "es-419": { dartLocale: "es", currencyCode: "USD" }, // the app's one Spanish ARB (app_es.arb) runs as Locale('es')
    ja: { dartLocale: "ja", currencyCode: "JPY" }, // app_ja.arb runs as Locale('ja'); the images show yen (owner, 2026-09-17)
    // app_fr.arb runs as Locale('fr'); the images show euros, same numbers (owner, 2026-09-17): EUR + fr → "fr_FR"
    "fr-FR": { dartLocale: "fr", currencyCode: "EUR" },
    // app_it.arb runs as Locale('it'); euros, same numbers as English (owner, 2026-09-17): EUR + it → "it_IT"
    "it-IT": { dartLocale: "it", currencyCode: "EUR" },
    // app_de.arb runs as Locale('de'); euros, same numbers as English (owner, 2026-09-17): EUR + de → "de_DE"
    "de-DE": { dartLocale: "de", currencyCode: "EUR" },
    // app_pt.arb runs as Locale('pt'); the images show reais, every amount ×3 (owner, 2026-09-17): BRL → "pt_BR"
    "pt-BR": { dartLocale: "pt", currencyCode: "BRL" },
    // app_tr.arb runs as Locale('tr'); the images show lira, every amount ×15 (owner, 2026-09-17): TRY → "tr_TR"
    "tr-TR": { dartLocale: "tr", currencyCode: "TRY" },
    // app_ko.arb runs as Locale('ko'); the images show won, every amount ×900 (owner, 2026-09-17): KRW → "ko_KR",
    // which Dart shortens to "ko" for numbers, so the same row writes the amounts and the percents
    ko: { dartLocale: "ko", currencyCode: "KRW" },
    // app_zh.arb (Taiwan Traditional) runs as the bare Locale('zh'); the images show New Taiwan dollars, every amount
    // ×30 (owner, 2026-09-18): TWD → "zh_TW". The one language whose L10n.intlLocale is NOT its dartLocale:
    // _toIntlLocale maps a bare zh to "zh_TW", so percents are zh_TW while dates stay "zh" (Flutter's mainland row)
    "zh-Hant": { dartLocale: "zh", intlLocale: "zh_TW", currencyCode: "TWD" },
  };

  A.intl = {
    NumberFormat: NF,
    DateFormat,
    toBeginningOfSentenceCase,
    dartRound,
    dartFixed,
    numericLocaleForCurrency,
    verifiedLocale: (l, what = "date") => dartVerifiedLocale(l, what === "number" ? DART_NUMBER_LOCALES : DART_DATE_LOCALES),
    makeFmt,
    storeLangs: STORE_LANGS,
    registrationErrors: {},
    data: { date: DATE_DATA, number: NUMBER_DATA, dartDateLocales: DART_DATE_LOCALES, dartNumberLocales: DART_NUMBER_LOCALES },
  };

  const register = A.locale || ((lang, cfg) => ((A.locales = A.locales || {})[lang] = cfg));
  for (const [lang, cfg] of Object.entries(STORE_LANGS)) {
    try {
      const fmt = makeFmt({ lang, ...cfg });
      register(lang, { dartLocale: cfg.dartLocale, intlLocale: fmt.intlLocale, numericLocale: fmt.numericLocale, currencyCode: cfg.currencyCode, fmt });
    } catch (err) {
      // one broken language must not take the others down with it
      A.intl.registrationErrors[lang] = err.message;
      if (A.missing && typeof A.missing.add === "function") A.missing.add(`${lang} · fmt · not registered: ${err.message}`);
      if (typeof console !== "undefined") console.error(`[locale.js] ${lang} has no ctx.fmt: ${err.message}`);
    }
  }
})();
