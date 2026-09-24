/* BYB demo data — the numbers behind every HTML app screen (language-neutral).
 *
 * WHAT IT IS
 *   The Shared Budget simulation the store captures were taken with, reproduced row for row: Dev Tools →
 *   Simulate Shared Budget → "Add the last 6 months", on the simulator's own September plan (ten categories,
 *   one $3,900 salary), with Utilities raised from $20 to $200 before the months were added
 *   (README "Recapturing"). The rows below were produced by running the app's real seeders
 *   (lib/core/dev/shared_budget_simulation_seed.dart + shared_budget_usage_seed.dart, seed 7) against an
 *   in-memory database — the seed is deterministic, so this is the data in raw/en/*.png, not an imitation.
 *   Every figure the 15 store captures show was checked against it. Nothing here is read off a capture
 *   except the one clock noted at ES419_CAPTURE.
 *
 *   To regenerate (after a seed change): a throwaway flutter test on AppDatabase.forTesting(NativeDatabase.memory())
 *   that inserts the September plan below (Utilities at 20, row-id order) and a $3,900 income with no owner, runs
 *   SharedBudgetSimulationSeeder.start(now: 2026-09-15), sets Utilities to 200, runs
 *   SharedBudgetUsageSeeder.add(months: 6, now: 2026-09-15) and dumps the tables. The time of day does not
 *   change the rows. Expense names are mapped to the demo keys in NAME KEYS below.
 *
 * WHAT IT HOLDS — numbers, ISO dates, ids and string KEYS only
 *   ctx.t(key)  resolves an ARB key (category names: categories[i].name → "categoriesHousing")
 *   ctx.d(key)  resolves a demo key  (people and expense names: members[i].name → "ownerName", expenses[i].name → "rent")
 *   Dates are local ISO strings without an offset ("2026-09-01T11:14"); months are "YYYY-MM".
 *   Money is plain numbers in USD, already rounded to cents.
 *
 * NAME KEYS
 *   An expense's `name` is a demo key named after what the row is, not after the seed's English text. The seed
 *   writes store brands in English (Trader Joe's, Costco run, Safeway, Airbnb deposit…); README "Rules the images
 *   follow" keeps third-party marks out of frame, and the app's own Spanish table already turns them into plain
 *   descriptions (shared_budget_simulation_names.dart), so both demo tables do the same. app/l10n/demo/en.js
 *   notes the seed name beside each key it replaces.
 *
 * SHAPE (BYBApp.data)
 *   now            "2026-09-15T09:41:00"  Tuesday — the captures' clock; every "today" below is this
 *   month          "2026-09"  the month every screen shows · prevMonth "2026-08"
 *   months         ["2026-01" … "2026-09"]  the year so far (the Insights trend and a category's by-month chart start in January)
 *   currency       { code: "USD", symbol: "$", flag: "🇺🇸" }
 *   app            { name: "Budget Your Budget", version: "2.0.0" }   drawer footer, theme picker banner
 *   signedIn       "owner"  whose device it is (drawer profile, "you")
 *
 *   members[]      { id: "owner"|"partner", uid, name (demo key), avatar (path from store_screenshots/), role: "owner"|"member",
 *                    paletteIndex (MemberAvatar tint: 0 = palette accent, 3 = warnIcon #FFC107; from the uid's code units),
 *                    — this month: income, spent, left, usage (0..1, clamped), pctUsed (int),
 *                    split { categoryId: amount }, splitTotal, splitPct (int, of income), incomeNotSplit }
 *   member         { owner: …, partner: … }  the same objects by id
 *
 *   categories[]   the month's plan in the planner's list order (Budget by category):
 *                  { id, type (canonical English, DB value), name (ARB key), emoji, color (#hex),
 *                    plan, spent, left (plan − spent), count (expenses), split { memberId: amount } | null,
 *                    splitTotal, spentBy { owner, partner }, share (of the ring's base), fill (petal fill 0..1) }
 *   category       { housing: …, … }  by id
 *
 *   plans          { "YYYY-MM": { categoryId: planned amount } }       April → September
 *   splits         { "YYYY-MM": { categoryId: { memberId: amount } } }  only split categories
 *   incomes[]      { month, member, amount }
 *   expenses[]     EVERY expense April → September, newest first:
 *                  { id, date, amount, category (id), name (demo key), member (id) }
 *
 *   byMonth        { "YYYY-MM": { income, planned, spent, count, byCategory { id: spent }, countByCategory { id: n },
 *                    byMember { owner, partner } } }  for every entry of `months` (January–March are zeros)
 *
 *   budget         Budget (planner) screen
 *                  { spent, planned, pctUsed 58, usage 0..1, isOver, income, leftToBudget,
 *                    prevSpent, prevComparable (last month prorated to today: prevSpent × 15/31),
 *                    vsLastMonth (spent − prevComparable = 575.28 → "$575 more than last month", money0 of |x|),
 *                    ring { order [ids, clockwise from 12 o'clock], ofIncome, base, fullPetalShare 0.5 } }
 *   insights       Insights screen
 *                  { total, income, leftToSpend, net,
 *                    breakdown [{ category, amount, pct (int) }]  amount desc, positive only
 *                    frequent  [{ category, amount, count }]     ≥ 3 expenses, count desc then amount desc (max 8)
 *                    largest   [expense]                         3 biggest, amount desc then newest
 *                    trend     [{ month, income, spent }]        January → this month
 *                    maxTrend }
 *   expensesView   Expenses screen hero + chart + category chips
 *                  { total, vsLastMonth (to-date: Sep 1–15 vs Aug 1–15 = 370.72 → "$371 above last month"),
 *                    currentDay 15, chart { current [cumulative spend, index 0 = day 1, days 1..15],
 *                    previous [cumulative, days 1..30 (min of both month lengths)] },
 *                    filterOrder [categoryId]  THE CHIP STRIP'S ORDER after "All" — render the chips from this, never
 *                                 from `categories` (planner order) or a fresh sort of `filters`:
 *                                 category_filter_strip.dart counts the month's expenses newest first into an
 *                                 insertion-ordered map and sorts by count desc; Dart's sort is an insertion sort
 *                                 under 32 items, so ties keep the order each category first appears, newest first.
 *                                 → groceries, restaurants, utilities, healthcare, shopping, housing, travel, pets
 *                    filters { categoryId: { total, percent (int, of the month), count } }  keys in filterOrder order }
 *                  The badge does not change with the category filter.
 *   compare        Reports → Last vs Current Month
 *                  { from "2026-08", to "2026-09", previous, current, diff (current − previous), pct (unrounded),
 *                    yMax (max × 1.18), gridStep 1000 }
 *   currentMonth   Reports → Current Month Expenses
 *                  { total, dailyAverage, count, daysElapsed, daysInMonth, top (category id), topAmount,
 *                    topPct (unrounded), byCategory [{ category, amount, pct (unrounded) }] amount desc,
 *                    thisWeek, lastWeek, weekOverWeek (%; 0 when last week is 0), projected }
 *   incomeVsExpenses  Reports → Last 3 Months: Income vs Expenses
 *                  { months [{ month, income, spent, net }] newest first, income, spent, net }
 *   newExpense     the "New expense" form as captured (never saved):
 *                  { amount 64.5, name (demo key), date (today), category "restaurants" }
 *   settings       { language: { name, flag } (demo keys), currency: "USD" }
 *
 *   q              pure helpers over this dataset's rows (no DOM):
 *                  q.expenses({ month, category, member })  → rows, newest first
 *                  q.byDay(rows)  → [{ day "YYYY-MM-DD", total, rows }] newest day first
 *                  q.sum(rows)    → cents-rounded total
 *
 * BYBApp.captureData — COMPARE ONLY
 *   { en: BYBApp.data, "es-419": { …the same shape… } }, keyed like raw/<lang>/.
 *   The Spanish captures were seeded a day later (the same recipe with now: 2026-09-16 reproduces raw/es-419 to the
 *   cent: $2,371.26, $1,163.74 / $1,207.52, Restaurantes $156.38 over 4 expenses, chips Restaurantes ·
 *   Supermercado · Compras…). Seven September rows differ; the plans, splits and incomes do not. Slides and
 *   store renders use BYBApp.data in EVERY language (only the words change); captureData exists so a
 *   `shot.mjs --compare --lang es-419` can render against the numbers raw/es-419 actually shows, and a Spanish
 *   layout difference is not lost among expected number differences.
 */
(function () {
  "use strict";

  const G = typeof window !== "undefined" ? window : globalThis;
  const A = (G.BYBApp = G.BYBApp || {});

  const cents = (n) => Math.round(n * 100) / 100;
  const sum = (xs, f = (x) => x) => cents(xs.reduce((s, x) => s + f(x), 0));
  const pad2 = (n) => String(n).padStart(2, "0");

  // ================================================================ base data (shared by both datasets)

  // The simulator's September plan, in row-id order — the order the planner lists it in
  // (lib/core/data/category_data.dart for type, emoji and colour; lib/l10n/app_*.arb categories* for the name).
  const CATEGORIES = [
    { id: "housing", type: "Housing", name: "categoriesHousing", emoji: "🏠", color: "#6366F1" },
    { id: "restaurants", type: "Restaurants", name: "categoriesRestaurants", emoji: "🍽️", color: "#C2410C" },
    { id: "groceries", type: "Groceries", name: "categoriesGroceries", emoji: "🛒", color: "#22C55E" },
    { id: "utilities", type: "Utilities", name: "categoriesUtilities", emoji: "💡", color: "#EAB308" },
    { id: "savings", type: "Savings", name: "categoriesSavings", emoji: "💰", color: "#84CC16" },
    { id: "debtPayments", type: "Debt Payments", name: "categoriesDebtPayments", emoji: "💳", color: "#A855F7" },
    { id: "pets", type: "Pets", name: "categoriesPets", emoji: "🐾", color: "#8B5CF6" },
    { id: "travel", type: "Travel", name: "categoriesTravel", emoji: "✈️", color: "#06B6D4" },
    { id: "healthcare", type: "Healthcare", name: "categoriesHealthcare", emoji: "🩺", color: "#14B8A6" },
    { id: "shopping", type: "Shopping & Entertainment", name: "categoriesShoppingEntertainment", emoji: "🛍️", color: "#EC4899" },
  ];

  // The simulated owner (you) and the member who joined. uid is the simulation's own ("eduardo" / "laura"):
  // it is never shown, but MemberAvatar picks the tint from it. The names are demo keys — Alex / Sam in
  // English, Diego / Sofía in Spanish (app/l10n/demo/<lang>.js).
  const MEMBERS = [
    { id: "owner", uid: "eduardo", name: "ownerName", avatar: "assets/avatars/owner.png", role: "owner", paletteIndex: 0 },
    { id: "partner", uid: "laura", name: "partnerName", avatar: "assets/avatars/partner.png", role: "member", paletteIndex: 3 },
  ];

  // Planned amounts. September is the simulator's own plan; April–August are the usage seeder's copies of it
  // (everyday categories drift down a little, bills stay put).
  const PLANS = {
    "2026-04": { housing: 1500, restaurants: 240, groceries: 570, utilities: 200, savings: 400, debtPayments: 300, pets: 95, travel: 345, healthcare: 190, shopping: 175 },
    "2026-05": { housing: 1500, restaurants: 235, groceries: 580, utilities: 200, savings: 400, debtPayments: 300, pets: 95, travel: 345, healthcare: 185, shopping: 175 },
    "2026-06": { housing: 1500, restaurants: 240, groceries: 565, utilities: 200, savings: 400, debtPayments: 300, pets: 95, travel: 345, healthcare: 195, shopping: 165 },
    "2026-07": { housing: 1500, restaurants: 245, groceries: 575, utilities: 200, savings: 400, debtPayments: 300, pets: 95, travel: 340, healthcare: 185, shopping: 170 },
    "2026-08": { housing: 1500, restaurants: 245, groceries: 580, utilities: 200, savings: 400, debtPayments: 300, pets: 90, travel: 325, healthcare: 185, shopping: 170 },
    "2026-09": { housing: 1500, restaurants: 250, groceries: 600, utilities: 200, savings: 400, debtPayments: 300, pets: 100, travel: 350, healthcare: 200, shopping: 180 },
  };

  // Rent 60/40, groceries halved, and the one bill that is all yours. Utilities keeps the $20 it was split at:
  // raising a plan never rescales an agreed split (planning_edit_category.dart).
  const splitsOf = (groceries) => ({
    housing: { owner: 900, partner: 600 },
    groceries: { owner: groceries / 2, partner: groceries / 2 },
    utilities: { owner: 20 },
  });
  const SPLITS = {
    "2026-04": splitsOf(570),
    "2026-05": splitsOf(580),
    "2026-06": splitsOf(565),
    "2026-07": splitsOf(575),
    "2026-08": splitsOf(580),
    "2026-09": splitsOf(600),
  };

  const INCOMES = [];
  for (const m of ["2026-04", "2026-05", "2026-06", "2026-07", "2026-08", "2026-09"]) {
    INCOMES.push({ month: m, member: "owner", amount: 3900 }, { month: m, member: "partner", amount: 3000 });
  }

  // Every expense of the store dataset (seeded 2026-09-15), newest first; ids count up from the oldest.
  // September: 8 are the partner's month (partnerExpenseScript), 9 the usage seeder's; April–August are all the
  // usage seeder's.
  const EXPENSES = [
    // 2026-09
    { id: 158, date: "2026-09-12T12:49", amount: 120, category: "travel", name: "lodgingDeposit", member: "partner" },
    { id: 157, date: "2026-09-12T09:32", amount: 100, category: "utilities", name: "electricBill", member: "owner" },
    { id: 156, date: "2026-09-11T12:42", amount: 31.25, category: "groceries", name: "farmersMarket", member: "partner" },
    { id: 155, date: "2026-09-10T17:33", amount: 79.15, category: "groceries", name: "monthlyStockUp", member: "partner" },
    { id: 154, date: "2026-09-09T14:44", amount: 27.57, category: "healthcare", name: "vitamins", member: "partner" },
    { id: 153, date: "2026-09-09T12:35", amount: 23.5, category: "healthcare", name: "pharmacy", member: "partner" },
    { id: 152, date: "2026-09-08T17:33", amount: 51.73, category: "restaurants", name: "brunch", member: "owner" },
    { id: 151, date: "2026-09-08T12:28", amount: 38.75, category: "pets", name: "dogFood", member: "partner" },
    { id: 150, date: "2026-09-07T16:40", amount: 46.89, category: "restaurants", name: "brunch", member: "owner" },
    { id: 149, date: "2026-09-07T12:21", amount: 64.99, category: "shopping", name: "homeSupplies", member: "partner" },
    { id: 148, date: "2026-09-05T12:14", amount: 48, category: "restaurants", name: "sushiNight", member: "partner" },
    { id: 147, date: "2026-09-03T12:07", amount: 45, category: "utilities", name: "phoneBill", member: "partner" },
    { id: 146, date: "2026-09-02T12:00", amount: 86.4, category: "groceries", name: "weeklyGroceries", member: "partner" },
    { id: 145, date: "2026-09-01T20:30", amount: 82.37, category: "groceries", name: "butcher", member: "owner" },
    { id: 144, date: "2026-09-01T20:04", amount: 24.76, category: "shopping", name: "hardwareStore", member: "owner" },
    { id: 143, date: "2026-09-01T17:25", amount: 600, category: "housing", name: "rent", member: "partner" },
    { id: 142, date: "2026-09-01T11:14", amount: 900, category: "housing", name: "rent", member: "owner" },
    // 2026-08
    { id: 141, date: "2026-08-29T17:29", amount: 313.68, category: "travel", name: "lodging", member: "owner" },
    { id: 140, date: "2026-08-28T18:03", amount: 101.99, category: "groceries", name: "pantry", member: "partner" },
    { id: 139, date: "2026-08-27T15:30", amount: 26.3, category: "healthcare", name: "medicine", member: "owner" },
    { id: 138, date: "2026-08-27T12:39", amount: 74.4, category: "groceries", name: "farmersMarket", member: "partner" },
    { id: 137, date: "2026-08-26T18:17", amount: 84.12, category: "groceries", name: "weeklyGroceries", member: "owner" },
    { id: 136, date: "2026-08-26T09:10", amount: 75.33, category: "shopping", name: "clothes", member: "owner" },
    { id: 135, date: "2026-08-25T16:42", amount: 173.91, category: "savings", name: "savingsTransfer", member: "partner" },
    { id: 134, date: "2026-08-25T12:45", amount: 226.09, category: "savings", name: "savingsTransfer", member: "owner" },
    { id: 133, date: "2026-08-24T14:40", amount: 37.09, category: "healthcare", name: "doctorCopay", member: "partner" },
    { id: 132, date: "2026-08-24T14:14", amount: 35.05, category: "restaurants", name: "sushiNight", member: "owner" },
    { id: 131, date: "2026-08-23T12:01", amount: 32.7, category: "restaurants", name: "coffeePastries", member: "owner" },
    { id: 130, date: "2026-08-22T11:33", amount: 30, category: "utilities", name: "waterBill", member: "owner" },
    { id: 129, date: "2026-08-20T09:37", amount: 66.34, category: "groceries", name: "farmersMarket", member: "owner" },
    { id: 128, date: "2026-08-20T09:08", amount: 300, category: "debtPayments", name: "creditCardPayment", member: "owner" },
    { id: 127, date: "2026-08-18T12:36", amount: 70, category: "utilities", name: "internet", member: "owner" },
    { id: 126, date: "2026-08-16T09:45", amount: 33.31, category: "restaurants", name: "coffeePastries", member: "owner" },
    { id: 125, date: "2026-08-16T08:43", amount: 29.89, category: "pets", name: "dogToys", member: "owner" },
    { id: 124, date: "2026-08-14T20:25", amount: 50.3, category: "restaurants", name: "sushiNight", member: "owner" },
    { id: 123, date: "2026-08-13T14:21", amount: 65.22, category: "restaurants", name: "thaiTakeout", member: "owner" },
    { id: 122, date: "2026-08-12T17:15", amount: 100, category: "utilities", name: "electricBill", member: "owner" },
    { id: 121, date: "2026-08-12T09:36", amount: 80.58, category: "shopping", name: "clothes", member: "partner" },
    { id: 120, date: "2026-08-07T10:32", amount: 52.05, category: "pets", name: "dogFood", member: "partner" },
    { id: 119, date: "2026-08-06T19:47", amount: 90.21, category: "groceries", name: "pantry", member: "owner" },
    { id: 118, date: "2026-08-06T11:13", amount: 61.28, category: "groceries", name: "butcher", member: "partner" },
    { id: 117, date: "2026-08-01T20:40", amount: 900, category: "housing", name: "rent", member: "owner" },
    { id: 116, date: "2026-08-01T16:47", amount: 600, category: "housing", name: "rent", member: "partner" },
    // 2026-07
    { id: 115, date: "2026-07-28T10:44", amount: 47.66, category: "restaurants", name: "dateNight", member: "owner" },
    { id: 114, date: "2026-07-28T08:12", amount: 91.58, category: "groceries", name: "cleaningSupplies", member: "owner" },
    { id: 113, date: "2026-07-27T13:42", amount: 39.07, category: "healthcare", name: "medicine", member: "partner" },
    { id: 112, date: "2026-07-25T12:34", amount: 226.09, category: "savings", name: "savingsTransfer", member: "owner" },
    { id: 111, date: "2026-07-25T11:30", amount: 173.91, category: "savings", name: "savingsTransfer", member: "partner" },
    { id: 110, date: "2026-07-22T08:09", amount: 30, category: "utilities", name: "waterBill", member: "owner" },
    { id: 109, date: "2026-07-20T19:20", amount: 300, category: "debtPayments", name: "creditCardPayment", member: "owner" },
    { id: 108, date: "2026-07-20T16:03", amount: 72.39, category: "groceries", name: "farmersMarket", member: "partner" },
    { id: 107, date: "2026-07-19T15:32", amount: 86.18, category: "shopping", name: "hardwareStore", member: "partner" },
    { id: 106, date: "2026-07-18T18:20", amount: 64.78, category: "groceries", name: "monthlyStockUp", member: "owner" },
    { id: 105, date: "2026-07-18T16:18", amount: 70, category: "utilities", name: "internet", member: "owner" },
    { id: 104, date: "2026-07-17T09:04", amount: 45.43, category: "restaurants", name: "tacos", member: "partner" },
    { id: 103, date: "2026-07-16T10:36", amount: 31.3, category: "restaurants", name: "sushiNight", member: "owner" },
    { id: 102, date: "2026-07-12T18:48", amount: 33.38, category: "restaurants", name: "pizzaDelivery", member: "partner" },
    { id: 101, date: "2026-07-12T12:09", amount: 51.43, category: "shopping", name: "concertTickets", member: "owner" },
    { id: 100, date: "2026-07-12T11:33", amount: 100, category: "utilities", name: "electricBill", member: "owner" },
    { id: 99, date: "2026-07-11T19:03", amount: 122.84, category: "groceries", name: "farmersMarket", member: "owner" },
    { id: 98, date: "2026-07-11T15:34", amount: 97.15, category: "groceries", name: "farmersMarket", member: "partner" },
    { id: 97, date: "2026-07-11T09:43", amount: 62.24, category: "pets", name: "dogFood", member: "partner" },
    { id: 96, date: "2026-07-10T09:39", amount: 25.96, category: "restaurants", name: "pizzaDelivery", member: "partner" },
    { id: 95, date: "2026-07-07T10:20", amount: 55.25, category: "groceries", name: "farmersMarket", member: "partner" },
    { id: 94, date: "2026-07-06T11:29", amount: 87.24, category: "groceries", name: "pantry", member: "partner" },
    { id: 93, date: "2026-07-04T18:05", amount: 44.12, category: "restaurants", name: "coffeePastries", member: "partner" },
    { id: 92, date: "2026-07-04T13:47", amount: 52.49, category: "restaurants", name: "brunch", member: "partner" },
    { id: 91, date: "2026-07-03T20:47", amount: 27.69, category: "healthcare", name: "doctorCopay", member: "owner" },
    { id: 90, date: "2026-07-03T17:41", amount: 52.88, category: "healthcare", name: "vitamins", member: "owner" },
    { id: 89, date: "2026-07-01T15:29", amount: 600, category: "housing", name: "rent", member: "partner" },
    { id: 88, date: "2026-07-01T10:08", amount: 900, category: "housing", name: "rent", member: "owner" },
    // 2026-06
    { id: 87, date: "2026-06-29T12:38", amount: 54.78, category: "groceries", name: "produce", member: "owner" },
    { id: 86, date: "2026-06-27T19:23", amount: 47.87, category: "pets", name: "petStore", member: "owner" },
    { id: 85, date: "2026-06-27T11:28", amount: 36.02, category: "restaurants", name: "sushiNight", member: "owner" },
    { id: 84, date: "2026-06-25T18:24", amount: 62.83, category: "shopping", name: "hardwareStore", member: "owner" },
    { id: 83, date: "2026-06-25T10:16", amount: 173.91, category: "savings", name: "savingsTransfer", member: "partner" },
    { id: 82, date: "2026-06-25T09:21", amount: 226.09, category: "savings", name: "savingsTransfer", member: "owner" },
    { id: 81, date: "2026-06-22T19:35", amount: 30, category: "utilities", name: "waterBill", member: "owner" },
    { id: 80, date: "2026-06-21T09:19", amount: 60.76, category: "healthcare", name: "vitamins", member: "owner" },
    { id: 79, date: "2026-06-20T16:00", amount: 81.51, category: "groceries", name: "pantry", member: "partner" },
    { id: 78, date: "2026-06-20T15:12", amount: 300, category: "debtPayments", name: "creditCardPayment", member: "owner" },
    { id: 77, date: "2026-06-20T13:07", amount: 192.64, category: "travel", name: "hotel", member: "owner" },
    { id: 76, date: "2026-06-19T08:44", amount: 68.44, category: "shopping", name: "onlineOrder", member: "owner" },
    { id: 75, date: "2026-06-18T17:28", amount: 33.22, category: "healthcare", name: "doctorCopay", member: "owner" },
    { id: 74, date: "2026-06-18T10:44", amount: 70, category: "utilities", name: "internet", member: "owner" },
    { id: 73, date: "2026-06-16T14:22", amount: 94.81, category: "groceries", name: "cleaningSupplies", member: "partner" },
    { id: 72, date: "2026-06-14T10:36", amount: 79.34, category: "groceries", name: "butcher", member: "owner" },
    { id: 71, date: "2026-06-13T18:11", amount: 69.93, category: "groceries", name: "cleaningSupplies", member: "partner" },
    { id: 70, date: "2026-06-13T17:12", amount: 36.86, category: "healthcare", name: "vitamins", member: "partner" },
    { id: 69, date: "2026-06-13T10:23", amount: 70.66, category: "groceries", name: "butcher", member: "partner" },
    { id: 68, date: "2026-06-12T15:45", amount: 100, category: "utilities", name: "electricBill", member: "owner" },
    { id: 67, date: "2026-06-12T08:02", amount: 39.32, category: "restaurants", name: "thaiTakeout", member: "partner" },
    { id: 66, date: "2026-06-11T20:05", amount: 46.46, category: "pets", name: "dogFood", member: "partner" },
    { id: 65, date: "2026-06-11T15:46", amount: 31.32, category: "restaurants", name: "thaiTakeout", member: "owner" },
    { id: 64, date: "2026-06-11T12:46", amount: 47.41, category: "restaurants", name: "pizzaDelivery", member: "partner" },
    { id: 63, date: "2026-06-10T16:32", amount: 76.5, category: "groceries", name: "weeklyGroceries", member: "owner" },
    { id: 62, date: "2026-06-04T20:40", amount: 43.42, category: "restaurants", name: "tacos", member: "owner" },
    { id: 61, date: "2026-06-01T16:48", amount: 900, category: "housing", name: "rent", member: "owner" },
    { id: 60, date: "2026-06-01T15:24", amount: 600, category: "housing", name: "rent", member: "partner" },
    { id: 59, date: "2026-06-01T08:47", amount: 91.36, category: "groceries", name: "weeklyGroceries", member: "owner" },
    // 2026-05
    { id: 58, date: "2026-05-29T10:10", amount: 59.2, category: "shopping", name: "clothes", member: "owner" },
    { id: 57, date: "2026-05-28T12:40", amount: 99.05, category: "groceries", name: "monthlyStockUp", member: "partner" },
    { id: 56, date: "2026-05-26T20:15", amount: 68.43, category: "groceries", name: "butcher", member: "partner" },
    { id: 55, date: "2026-05-26T18:08", amount: 40.68, category: "healthcare", name: "vitamins", member: "partner" },
    { id: 54, date: "2026-05-25T16:28", amount: 173.91, category: "savings", name: "savingsTransfer", member: "partner" },
    { id: 53, date: "2026-05-25T14:41", amount: 226.09, category: "savings", name: "savingsTransfer", member: "owner" },
    { id: 52, date: "2026-05-24T20:37", amount: 40.47, category: "restaurants", name: "thaiTakeout", member: "owner" },
    { id: 51, date: "2026-05-23T18:10", amount: 59.19, category: "restaurants", name: "brunch", member: "partner" },
    { id: 50, date: "2026-05-23T12:04", amount: 90.43, category: "groceries", name: "pantry", member: "owner" },
    { id: 49, date: "2026-05-22T17:04", amount: 65.53, category: "shopping", name: "hardwareStore", member: "owner" },
    { id: 48, date: "2026-05-22T11:17", amount: 30, category: "utilities", name: "waterBill", member: "owner" },
    { id: 47, date: "2026-05-20T20:38", amount: 300, category: "debtPayments", name: "creditCardPayment", member: "owner" },
    { id: 46, date: "2026-05-18T16:10", amount: 61.04, category: "pets", name: "dogFood", member: "partner" },
    { id: 45, date: "2026-05-18T10:15", amount: 70, category: "utilities", name: "internet", member: "owner" },
    { id: 44, date: "2026-05-16T19:29", amount: 96.14, category: "groceries", name: "produce", member: "owner" },
    { id: 43, date: "2026-05-16T15:08", amount: 79.43, category: "groceries", name: "produce", member: "owner" },
    { id: 42, date: "2026-05-15T19:11", amount: 62.21, category: "restaurants", name: "sushiNight", member: "partner" },
    { id: 41, date: "2026-05-13T19:15", amount: 41.06, category: "healthcare", name: "dentistCopay", member: "owner" },
    { id: 40, date: "2026-05-12T16:08", amount: 29.42, category: "restaurants", name: "tacos", member: "owner" },
    { id: 39, date: "2026-05-12T11:07", amount: 100, category: "utilities", name: "electricBill", member: "owner" },
    { id: 38, date: "2026-05-07T16:44", amount: 44.81, category: "healthcare", name: "dentistCopay", member: "partner" },
    { id: 37, date: "2026-05-06T11:26", amount: 44.13, category: "restaurants", name: "sushiNight", member: "partner" },
    { id: 36, date: "2026-05-05T15:47", amount: 106.02, category: "groceries", name: "farmersMarket", member: "partner" },
    { id: 35, date: "2026-05-05T10:20", amount: 30.75, category: "healthcare", name: "dentistCopay", member: "owner" },
    { id: 34, date: "2026-05-04T10:44", amount: 38.77, category: "shopping", name: "homeSupplies", member: "partner" },
    { id: 33, date: "2026-05-03T08:01", amount: 37.31, category: "restaurants", name: "coffeePastries", member: "partner" },
    { id: 32, date: "2026-05-02T11:21", amount: 324.5, category: "travel", name: "rentalCar", member: "owner" },
    { id: 31, date: "2026-05-01T18:30", amount: 900, category: "housing", name: "rent", member: "owner" },
    { id: 30, date: "2026-05-01T12:45", amount: 600, category: "housing", name: "rent", member: "partner" },
    // 2026-04
    { id: 29, date: "2026-04-30T17:31", amount: 42.61, category: "restaurants", name: "tacos", member: "partner" },
    { id: 28, date: "2026-04-30T08:22", amount: 79.75, category: "groceries", name: "farmersMarket", member: "owner" },
    { id: 27, date: "2026-04-29T12:31", amount: 109.93, category: "groceries", name: "cleaningSupplies", member: "partner" },
    { id: 26, date: "2026-04-26T14:16", amount: 64, category: "pets", name: "petStore", member: "partner" },
    { id: 25, date: "2026-04-25T20:23", amount: 226.09, category: "savings", name: "savingsTransfer", member: "owner" },
    { id: 24, date: "2026-04-25T12:13", amount: 72.5, category: "groceries", name: "weeklyGroceries", member: "owner" },
    { id: 23, date: "2026-04-25T08:18", amount: 173.91, category: "savings", name: "savingsTransfer", member: "partner" },
    { id: 22, date: "2026-04-22T13:44", amount: 30, category: "utilities", name: "waterBill", member: "owner" },
    { id: 21, date: "2026-04-20T19:16", amount: 300, category: "debtPayments", name: "creditCardPayment", member: "owner" },
    { id: 20, date: "2026-04-19T18:26", amount: 46, category: "healthcare", name: "doctorCopay", member: "partner" },
    { id: 19, date: "2026-04-19T15:09", amount: 67.76, category: "groceries", name: "weeklyGroceries", member: "partner" },
    { id: 18, date: "2026-04-18T15:10", amount: 60.71, category: "groceries", name: "pantry", member: "owner" },
    { id: 17, date: "2026-04-18T14:07", amount: 58.84, category: "restaurants", name: "sushiNight", member: "partner" },
    { id: 16, date: "2026-04-18T13:01", amount: 70, category: "utilities", name: "internet", member: "owner" },
    { id: 15, date: "2026-04-14T16:00", amount: 106.94, category: "groceries", name: "butcher", member: "owner" },
    { id: 14, date: "2026-04-12T18:42", amount: 100, category: "utilities", name: "electricBill", member: "owner" },
    { id: 13, date: "2026-04-12T16:08", amount: 44.06, category: "shopping", name: "onlineOrder", member: "owner" },
    { id: 12, date: "2026-04-11T16:06", amount: 58.62, category: "restaurants", name: "brunch", member: "partner" },
    { id: 11, date: "2026-04-11T14:00", amount: 28.05, category: "restaurants", name: "coffeePastries", member: "owner" },
    { id: 10, date: "2026-04-10T09:00", amount: 30.84, category: "healthcare", name: "doctorCopay", member: "partner" },
    { id: 9, date: "2026-04-09T09:23", amount: 28.83, category: "restaurants", name: "sushiNight", member: "owner" },
    { id: 8, date: "2026-04-08T17:37", amount: 51.91, category: "shopping", name: "hardwareStore", member: "partner" },
    { id: 7, date: "2026-04-08T14:45", amount: 47.19, category: "restaurants", name: "sushiNight", member: "partner" },
    { id: 6, date: "2026-04-08T12:43", amount: 64.58, category: "groceries", name: "weeklyGroceries", member: "partner" },
    { id: 5, date: "2026-04-07T13:21", amount: 67.88, category: "shopping", name: "concertTickets", member: "partner" },
    { id: 4, date: "2026-04-04T20:11", amount: 276.23, category: "travel", name: "rentalCar", member: "partner" },
    { id: 3, date: "2026-04-04T16:09", amount: 79.44, category: "groceries", name: "farmersMarket", member: "partner" },
    { id: 2, date: "2026-04-01T15:02", amount: 900, category: "housing", name: "rent", member: "owner" },
    { id: 1, date: "2026-04-01T10:40", amount: 600, category: "housing", name: "rent", member: "partner" },
  ];

  // The Spanish captures' day: the same recipe seeded on 2026-09-16 drops these seven September rows (ids above)
  // and adds these eight; everything before September is identical.
  // The clock is 11:00, not 9:41 (the simulator's status bar is overridden, the app's clock is not): the only
  // time-of-day figure, "¡Excelente! Tu gasto bajó 81% respecto a la semana pasada", holds only from 10:24 to
  // 12:21 (88% up to 10:23, 67% from 12:22). // read from capture es-419/04_reports_export
  // BYBApp.data keeps 9:41: its "down 100% from last week" holds at any time of Sep 15.
  const ES419_CAPTURE = {
    now: "2026-09-16T11:00:00",
    drop: [157, 155, 154, 152, 150, 145, 144],
    add: [
      { date: "2026-09-14T15:28", amount: 27.11, category: "shopping", name: "concertTickets", member: "partner" },
      { date: "2026-09-13T10:47", amount: 27.03, category: "restaurants", name: "thaiTakeout", member: "owner" },
      { date: "2026-09-12T17:42", amount: 19.93, category: "healthcare", name: "dentistCopay", member: "owner" },
      { date: "2026-09-12T14:21", amount: 100, category: "utilities", name: "electricBill", member: "owner" },
      { date: "2026-09-08T12:11", amount: 42.67, category: "restaurants", name: "brunch", member: "partner" },
      { date: "2026-09-07T10:23", amount: 79.85, category: "groceries", name: "weeklyGroceries", member: "partner" },
      { date: "2026-09-03T17:33", amount: 78.1, category: "groceries", name: "monthlyStockUp", member: "owner" },
      { date: "2026-09-01T14:16", amount: 38.68, category: "restaurants", name: "coffeePastries", member: "owner" },
    ],
  };

  // ================================================================ derived — what the app computes from the rows

  const monthOf = (iso) => iso.slice(0, 7);
  const dayOf = (iso) => +iso.slice(8, 10);
  const daysIn = (ym) => new Date(+ym.slice(0, 4), +ym.slice(5, 7), 0).getDate();
  const shiftMonth = (ym, delta) => {
    const d = new Date(+ym.slice(0, 4), +ym.slice(5, 7) - 1 + delta, 1);
    return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}`;
  };
  const localDate = (iso) => {
    const [d, t = "00:00"] = iso.split("T");
    const [y, mo, da] = d.split("-").map(Number);
    const [h, mi, s = 0] = t.split(":").map(Number);
    return new Date(y, mo - 1, da, h, mi, s);
  };
  const byDate = (a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : b.id - a.id);

  // Rows → newest first with ids counting up from the oldest (a new row has no id yet; dates never tie).
  const renumber = (rows) =>
    [...rows]
      .sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0))
      .map((e, i) => ({ id: i + 1, date: e.date, amount: e.amount, category: e.category, name: e.name, member: e.member }))
      .reverse();

  // opts.scale multiplies every amount (rows, plans, splits, incomes, the typed form amount) before anything is
  // derived, so totals, percentages, charts and the petal ring come out the same shape in another currency.
  // opts.currency is that currency ({ code, symbol, flag }). ×100 keeps USD cents as exact whole yen, and ×900
  // the same for won — both are multiples of 100, so no zero-decimal currency ever lands on a fraction.
  function build(now, rows0, opts = {}) {
    const k = opts.scale || 1;
    const money = (n) => (k === 1 ? n : Math.round(n * k * 100) / 100);
    const rows = rows0.map((e) => (k === 1 ? e : { ...e, amount: money(e.amount) }));
    const mapMoney = (o) => Object.fromEntries(Object.entries(o).map(([key, v]) => [key, typeof v === "number" ? money(v) : mapMoney(v)]));
    const plans = mapMoney(PLANS);
    const splits = mapMoney(SPLITS);
    const incomes = INCOMES.map((i) => ({ ...i, amount: money(i.amount) }));
    const currency = opts.currency || { code: "USD", symbol: "$", flag: "🇺🇸" };
    const month = monthOf(now);
    const prevMonth = shiftMonth(month, -1);
    const months = [];
    for (let m = 1; m <= +month.slice(5, 7); m++) months.push(`${month.slice(0, 4)}-${pad2(m)}`);
    const expenses = [...rows].sort(byDate);
    const categories = CATEGORIES.map((c) => ({ ...c }));
    const members = MEMBERS.map((m) => ({ ...m }));

    const q = {
      sum: (list) => sum(list, (e) => e.amount),
      expenses: ({ month: m, category, member } = {}) =>
        expenses
          .filter((e) => (!m || monthOf(e.date) === m) && (!category || e.category === category) && (!member || e.member === member))
          .sort(byDate),
      byDay: (list) => {
        const days = new Map();
        for (const e of [...list].sort(byDate)) {
          const day = e.date.slice(0, 10);
          if (!days.has(day)) days.set(day, []);
          days.get(day).push(e);
        }
        return [...days].map(([day, dayRows]) => ({ day, total: sum(dayRows, (e) => e.amount), rows: dayRows }));
      },
    };

    const memberIds = members.map((m) => m.id);
    const byMonth = {};
    for (const ym of months) {
      const list = q.expenses({ month: ym });
      const byCategory = {};
      const countByCategory = {};
      for (const c of categories) {
        const inCat = list.filter((e) => e.category === c.id);
        byCategory[c.id] = sum(inCat, (e) => e.amount);
        countByCategory[c.id] = inCat.length;
      }
      const byMember = {};
      for (const id of memberIds) byMember[id] = sum(list.filter((e) => e.member === id), (e) => e.amount);
      byMonth[ym] = {
        income: sum(incomes.filter((i) => i.month === ym), (i) => i.amount),
        planned: sum(Object.values(plans[ym] || {})),
        spent: sum(list, (e) => e.amount),
        count: list.length,
        byCategory,
        countByCategory,
        byMember,
      };
    }

    const cur = byMonth[month];
    const prev = byMonth[prevMonth];
    const today = localDate(now);
    const nowDay = today.getDate();

    // ---- the ring's base: share of income while any is left to allocate, of the plan once it has caught up
    // (planning_pie_chart.dart); half of it fills a petal (kFullPetalShare), by area.
    const ofIncome = cur.income > 0 && cur.income + 0.005 >= cur.planned;
    const ringBase = cur.income > cur.planned ? cur.income : cur.planned;
    const FULL_PETAL_SHARE = 0.5;

    // ---- categories: the plan joined with this month's spend
    for (const c of categories) {
      const list = q.expenses({ month, category: c.id });
      c.plan = plans[month][c.id];
      c.spent = sum(list, (e) => e.amount);
      c.left = cents(c.plan - c.spent);
      c.count = list.length;
      c.split = (splits[month] && splits[month][c.id]) || null;
      c.splitTotal = c.split ? sum(Object.values(c.split)) : 0;
      c.spentBy = {};
      for (const id of memberIds) c.spentBy[id] = sum(list.filter((e) => e.member === id), (e) => e.amount);
      c.share = ringBase > 0 ? c.plan / ringBase : 0;
      c.fill = c.share > 0 ? Math.min(c.share / FULL_PETAL_SHARE, 1) : 0;
    }
    const category = Object.fromEntries(categories.map((c) => [c.id, c]));

    // Petals: largest plan first from 12 o'clock, ties by canonical type (so Healthcare before Utilities).
    const ringOrder = [...categories]
      .sort((a, b) => b.plan - a.plan || (a.type < b.type ? -1 : a.type > b.type ? 1 : 0))
      .map((c) => c.id);

    // ---- members (planning_table.dart getMemberShares + member_share.dart)
    for (const m of members) {
      m.income = sum(incomes.filter((i) => i.month === month && i.member === m.id), (i) => i.amount);
      m.spent = cur.byMember[m.id];
      m.left = cents(m.income - m.spent);
      m.usage = m.income > 0 ? Math.min(Math.max(m.spent / m.income, 0), 1) : m.spent > 0 ? 1 : 0;
      m.pctUsed = m.income > 0 ? Math.round((m.spent / m.income) * 100) : m.spent > 0 ? 100 : 0;
      m.split = {};
      for (const c of categories) if (c.split && c.split[m.id]) m.split[c.id] = c.split[m.id];
      m.splitTotal = sum(Object.values(m.split));
      m.splitPct = m.income > 0 ? Math.round((m.splitTotal / m.income) * 100) : 0;
      m.incomeNotSplit = cents(m.income - m.splitTotal);
    }
    const member = Object.fromEntries(members.map((m) => [m.id, m]));

    // ---- Budget (planner_view.dart _buildHero / _spentComparison)
    const prevComparableRaw = prev.spent * Math.min(nowDay / daysIn(prevMonth), 1);
    const budget = {
      spent: cur.spent,
      planned: cur.planned,
      pctUsed: cur.planned > 0 ? Math.round((cur.spent / cur.planned) * 100) : 0,
      usage: cur.planned > 0 ? Math.min(cur.spent / cur.planned, 1) : 0,
      isOver: cur.planned > 0 && cur.spent - cur.planned > 0.005,
      income: cur.income,
      leftToBudget: cents(cur.income - cur.planned),
      prevSpent: prev.spent,
      prevComparable: cents(prevComparableRaw),
      vsLastMonth: cents(cur.spent - prevComparableRaw),
      ring: { order: ringOrder, ofIncome, base: ringBase, fullPetalShare: FULL_PETAL_SHARE },
    };

    // ---- Insights (insights_shared.dart InsightsData.build)
    const monthRows = q.expenses({ month });
    const breakdown = categories
      .filter((c) => c.spent > 0)
      .map((c) => ({ category: c.id, amount: c.spent, pct: Math.round((c.spent / cur.spent) * 100) }))
      .sort((a, b) => b.amount - a.amount);
    const frequent = categories
      .filter((c) => c.count >= 3)
      .map((c) => ({ category: c.id, amount: c.spent, count: c.count }))
      .sort((a, b) => b.count - a.count || b.amount - a.amount)
      .slice(0, 8);
    const largest = [...monthRows].sort((a, b) => b.amount - a.amount || byDate(a, b)).slice(0, 3);
    const trend = months.map((ym) => ({ month: ym, income: byMonth[ym].income, spent: byMonth[ym].spent }));
    const insights = {
      total: cur.spent,
      income: cur.income,
      leftToSpend: cents(cur.income - cur.spent),
      net: cents(cur.income - cur.spent),
      breakdown,
      frequent,
      largest,
      trend,
      maxTrend: Math.max(1, ...trend.map((t) => Math.max(t.income, t.spent))),
    };

    // ---- Expenses (expenses_view.dart _monthComparison / _comparisonChartData / _filteredScope;
    // category_filter_strip.dart for the chip order)
    const dailyOf = (ym) => {
      const days = new Array(daysIn(ym) + 1).fill(0);
      for (const e of q.expenses({ month: ym })) days[dayOf(e.date)] += e.amount;
      return days;
    };
    const cumulative = (daily, upTo) => {
      const out = [];
      let run = 0;
      for (let d = 1; d <= upTo; d++) out.push(cents((run += daily[d])));
      return out;
    };
    const curDaily = dailyOf(month);
    const prevDaily = dailyOf(prevMonth);
    const prevRefDay = Math.min(nowDay, daysIn(prevMonth));
    const chipCounts = new Map(); // insertion order = first appearance in the newest-first list
    for (const e of monthRows) chipCounts.set(e.category, (chipCounts.get(e.category) || 0) + 1);
    const filterOrder = [...chipCounts]
      .map(([id, count], seen) => ({ id, count, seen }))
      .sort((a, b) => b.count - a.count || a.seen - b.seen)
      .map((x) => x.id);
    const filters = {};
    for (const id of filterOrder) {
      const c = category[id];
      filters[id] = { total: c.spent, percent: cur.spent > 0 ? Math.round((c.spent / cur.spent) * 100) : 0, count: c.count };
    }
    const expensesView = {
      total: cur.spent,
      vsLastMonth: cents(sum(curDaily.slice(1, nowDay + 1)) - sum(prevDaily.slice(1, prevRefDay + 1))),
      currentDay: nowDay,
      chart: {
        current: cumulative(curDaily, nowDay),
        previous: cumulative(prevDaily, Math.min(daysIn(month), daysIn(prevMonth))),
      },
      filterOrder,
      filters,
    };

    // ---- Reports → Last vs Current Month (compare_month_view.dart / compare_month_chart.dart)
    const cmpMax = Math.max(prev.spent, cur.spent, 0) || 1;
    const compare = {
      from: prevMonth,
      to: month,
      previous: prev.spent,
      current: cur.spent,
      diff: cents(cur.spent - prev.spent),
      pct: prev.spent > 0 ? ((cur.spent - prev.spent) / prev.spent) * 100 : 0,
      yMax: cmpMax * 1.18,
      gridStep: cmpMax <= 100 ? 20 : cmpMax <= 500 ? 100 : cmpMax <= 1000 ? 200 : cmpMax <= 5000 ? 1000 : cmpMax / 5,
    };

    // ---- Reports → Current Month Expenses (current_month_data.dart)
    const DAY = 86400000;
    const startOfWeek = new Date(today.getTime() - ((today.getDay() + 6) % 7) * DAY); // Monday, at the current time of day
    const lastWeekStart = new Date(startOfWeek.getTime() - 7 * DAY);
    const lastWeekEnd = new Date(today.getTime() - 7 * DAY);
    const within = (from, to) =>
      sum(expenses.filter((e) => { const t = localDate(e.date); return t >= from && t <= to && e.amount > 0; }), (e) => e.amount);
    const thisWeek = within(startOfWeek, today);
    const lastWeek = within(lastWeekStart, lastWeekEnd);
    const top = breakdown[0];
    const currentMonth = {
      total: cur.spent,
      dailyAverage: nowDay > 0 ? cur.spent / nowDay : 0,
      count: cur.count,
      daysElapsed: nowDay,
      daysInMonth: daysIn(month),
      top: top ? top.category : null,
      topAmount: top ? top.amount : 0,
      topPct: top && cur.spent > 0 ? (top.amount / cur.spent) * 100 : 0,
      byCategory: breakdown.map((b) => ({ category: b.category, amount: b.amount, pct: (b.amount / cur.spent) * 100 })),
      thisWeek,
      lastWeek,
      weekOverWeek: lastWeek === 0 ? 0 : ((thisWeek - lastWeek) / lastWeek) * 100,
      projected: nowDay > 0 ? (cur.spent / nowDay) * daysIn(month) : 0,
    };

    // ---- Reports → Last 3 Months: Income vs Expenses
    const last3 = months.slice(-3).reverse().map((ym) => ({
      month: ym,
      income: byMonth[ym].income,
      spent: byMonth[ym].spent,
      net: cents(byMonth[ym].income - byMonth[ym].spent),
    }));
    const incomeVsExpenses = {
      months: last3,
      income: sum(last3, (m) => m.income),
      spent: sum(last3, (m) => m.spent),
      net: sum(last3, (m) => m.net),
    };

    return {
      now,
      month,
      prevMonth,
      months,
      currency,
      app: { name: "Budget Your Budget", version: "2.0.0" },
      signedIn: "owner",

      members,
      member,
      categories,
      category,
      plans,
      splits,
      incomes,
      expenses,

      byMonth,
      budget,
      insights,
      expensesView,
      compare,
      currentMonth,
      incomeVsExpenses,

      // What the "New expense" form holds in 07_expenses_new_form: typed, never saved. Its date is today.
      newExpense: { amount: money(64.5), name: "dinnerOut", date: now.slice(0, 10), category: "restaurants" },

      // Tools & Settings rows: the app's language as the language list names it (lib/core/data/language_data.dart,
      // demo keys because it follows the store language) and the currency.
      settings: { language: { name: "languageName", flag: "languageFlag" }, currency: currency.code },

      q,
    };
  }

  // ================================================================ the datasets

  A.data = build("2026-09-15T09:41:00", EXPENSES);

  const es419Rows = renumber([...EXPENSES.filter((e) => !ES419_CAPTURE.drop.includes(e.id)), ...ES419_CAPTURE.add]);
  A.captureData = { en: A.data, "es-419": build(ES419_CAPTURE.now, es419Rows) };

  // Store languages whose images use another currency: the same budget, every amount ×100 in yen for Japanese,
  // ×3 in reais for Brazilian Portuguese, ×15 in lira for Turkish and ×900 in won for Korean (owner decision
  // 2026-09-17), ×30 in New Taiwan dollars for Traditional Chinese (2026-09-18). app/app.js picks
  // BYBApp.langData[lang] before BYBApp.data.
  A.langData = {
    ja: build("2026-09-15T09:41:00", EXPENSES, { scale: 100, currency: { code: "JPY", symbol: "¥", flag: "🇯🇵" } }),
    // French (France), Italian and German images are in euros with the same numbers (owner decision 2026-09-17)
    "fr-FR": build("2026-09-15T09:41:00", EXPENSES, { scale: 1, currency: { code: "EUR", symbol: "€", flag: "🇪🇺" } }),
    "it-IT": build("2026-09-15T09:41:00", EXPENSES, { scale: 1, currency: { code: "EUR", symbol: "€", flag: "🇪🇺" } }),
    "de-DE": build("2026-09-15T09:41:00", EXPENSES, { scale: 1, currency: { code: "EUR", symbol: "€", flag: "🇪🇺" } }),
    // Brazilian images are in reais, every amount ×3 (owner decision 2026-09-17; it was ×5 earlier that day —
    // slides/05-sync.js documents the move, and the sync slide's Portuguese total lane still carries its answer)
    "pt-BR": build("2026-09-15T09:41:00", EXPENSES, { scale: 3, currency: { code: "BRL", symbol: "R$", flag: "🇧🇷" } }),
    // Turkish images are in lira, every amount ×15 (owner decision 2026-09-17). `symbol` is documentation only
    // — the screens draw intl's TRY symbol, the two ASCII letters "TL" ("TL35.555,40"), never ₺.
    "tr-TR": build("2026-09-15T09:41:00", EXPENSES, { scale: 15, currency: { code: "TRY", symbol: "₺", flag: "🇹🇷" } }),
    // Korean images are in won, every amount ×900 (owner decision 2026-09-17): ₩3,510,000 + ₩2,700,000 a month
    // reads as a comfortable dual-income couple in Seoul, not a top-percentile one. Unlike the lira there is
    // nothing to reconcile — intl's simpleCurrency KRW and CurrencyFormatter.symbolFor both give "₩", so the
    // screens draw the same symbol this line documents. KRW has 0 fraction digits, so no amount shows decimals.
    ko: build("2026-09-15T09:41:00", EXPENSES, { scale: 900, currency: { code: "KRW", symbol: "₩", flag: "🇰🇷" } }),
    // Traditional Chinese images are in New Taiwan dollars, every amount ×30 (owner decision 2026-09-18): rent
    // NT$27,000 and NT$117,000 + NT$90,000 a month, a well-off Taipei couple. The flag is currency_data.dart's TWD
    // row. Unlike the won, TWD keeps 2 fraction digits (intl's currencyFractionDigits lists it at 2), so the screens
    // draw "NT$27,000.00" — and ×30 of a cent amount can land on any cent, which the screens show as the app would.
    // `symbol` is intl's simpleCurrency TWD symbol, what every screen draws; CurrencyFormatter.symbolFor has no TWD
    // case, so only its exporter path writes the code instead ("TWD27,000.00", locale.js money({ stripNbsp })).
    "zh-Hant": build("2026-09-15T09:41:00", EXPENSES, { scale: 30, currency: { code: "TWD", symbol: "NT$", flag: "🇹🇼" } }),
  };
})();
