/* Demo words, Turkish (Türkiye) (tr-TR) — same keys as app/l10n/demo/en.js.
 *
 * The couple is Emre (owner, male Memoji) and Elif (partner, female Memoji); the amounts are the English numbers
 * ×15 in lira (app/data.js BYBApp.langData["tr-TR"]), owner decisions 2026-09-17. The screens draw that lira as
 * "TL", not "₺" — intl maps TRY to those two letters — so a lira row carries a wider number than a dollar one,
 * which is what the ≤ 18 character rule below is protecting.
 *
 * Expense names are written the way a couple in Türkiye types them into a budgeting app, not translated word for
 * word. Bills are named by what they pay for, and six values are lifted straight from the app's own samples in
 * app_tr.arb — Kira, Elektrik faturası, Su faturası, Telefon faturası, İnternet and, outside the bills, Eczane.
 * Turkish households really do write the "… faturası" out, the way German writes "-rechnung" and Brazil writes
 * "Conta de …". Shops are generic kinds of shop (Süpermarket, Manav, Kasap, Pastane, Nalbur, Petshop), and the
 * American seed items become their everyday Turkish counterparts:
 *   Tacos → Kebapçı, the neighbourhood sit-down grill, Türkiye's Trattoria and Gasthaus. "Büfe" and "Dönerci"
 *     were the first drafts and were dropped on price: the seed amounts on this key are 441–681 TL at ×15,
 *     which is a table for two, not a counter.
 *   Thai takeout → Lahmacun. Thai is not what a Turkish household orders in; lahmacun by the dozen is, the same
 *     swap Italian made to Chinese, German to Vietnamese and Brazilian to Arabic.
 *   Brunch → Kahvaltı. Türkiye does not brunch, it goes out for the long weekend breakfast — the meal a couple
 *     here actually books a table for.
 *   Coffee & pastries → Pastane, the corner pastry shop, counterpart of Italy's "Colazione al bar" and Brazil's
 *     "Padaria", not a coffee to go.
 *   Date night → Baş başa yemek, "just the two of us", which is the phrase Turkish uses where English says date
 *     night. "Meyhane akşamı" was the first draft and was dropped: an alcohol-led evening is not what a store
 *     screenshot should hand every household.
 *   Farmers market → Semt pazarı, the weekly neighbourhood street market. The bare "Pazar" was dropped because
 *     it is also the word for Sunday, and the rows it sits in print weekday names.
 *   Fruit & veggies → Manav, the greengrocer. A Turkish household really does split produce between the manav
 *     and the pazar, which is why the two keys read as two different errands.
 *   Pantry staples → Kuru gıda, the dry-goods shop-up (rice, bulgur, legumes) a Turkish pantry actually is.
 *   Dog food → Köpek maması, Pet store → Petshop (the everyday Turkish word, written as one; the category itself
 *     is "Evcil hayvan", so the shop has to carry its own name).
 *   Hardware store → Nalbur, the neighbourhood hardware shop, counterpart of the Italian Ferramenta.
 *   Lodging → Pansiyon, the Turkish family-run guesthouse, counterpart of the French Gîte, the Italian
 *     Agriturismo, the German Ferienwohnung and the Brazilian Pousada, with its deposit as "Pansiyon kaporası" —
 *     "kapora" is the Turkish word for the money you put down to hold a booking.
 *   Credit card payment → Kredi kartı borcu. Like Brazil and unlike Germany and Italy, Turkish households really
 *     do carry a revolving card balance, so this key keeps its English sense instead of becoming a consumer-loan
 *     instalment.
 *   Savings transfer → Vadeli mevduat, the plain time-deposit account every Turkish bank offers (a product
 *     class, not a brand — the counterpart of the German Tagesgeld and the French Livret A). "Altın alımı" was
 *     the other true Turkish reflex and was dropped: gram gold is an asset you buy, where this key is the fixed
 *     amount both members move aside every month.
 * No brand names (no supermarket chain, no delivery app — README keeps third-party marks out of frame), one to
 * one (no two keys share a text), none repeats its own category's name (Market, Konut, Faturalar, Borç ödemeleri,
 * Birikim, Restoran, Sağlık, Evcil hayvan, Alışveriş ve eğlence, Seyahat — app_tr.arb categories*) word for word,
 * and each fits a list row without ellipsis (≤ 18 characters). Turkish agglutinates, so that length rule binds as
 * hard here as it does in German: cleaningSupplies is "Temizlik ürünleri" (17) because "Temizlik malzemeleri" is
 * 20, and weeklyGroceries is "Süpermarket" rather than the app's own sample "Market", which is also the
 * Groceries category's own name.
 * The typed form name is "Yemek", one word on purpose, and the reason bites harder in Turkish than in any other
 * language: the name field capitalizes every word as you type (add_transaction.dart, RegExp r'\b\w'), and Dart's
 * \w is ASCII-only, so every Turkish diacritic counts as a word boundary. The app's own sample "Dışarıda yemek"
 * comes out as "DışArıDa Yemek", and "Akşam yemeği" as "AkşAm YemeğI" — which shows the second half of the
 * trap too: the ğ opens a boundary and the plain toUpperCase() behind it turns that "i" into "I", never the
 * Turkish "İ". "Yemek" is the everyday word with no diacritic and no leading i, and the category row under it
 * already says Restoran. (Both renders were run through the real rule, not reasoned about.)
 */
BYBApp.demo("tr-TR", {
  // ---- people
  ownerName: "Emre",
  partnerName: "Elif",
  ownerEmail: "emre@example.com",

  // ---- typed into the New expense form
  dinnerOut: "Yemek",

  // ---- Araçlar ve ayarlar → Dil (lib/core/data/language_data.dart: endonym + flag)
  languageName: "Türkçe",
  languageFlag: "🇹🇷",

  // ---- expense names: Konut
  rent: "Kira",

  // ---- Faturalar · Borç ödemeleri · Birikim
  electricBill: "Elektrik faturası",
  internet: "İnternet",
  waterBill: "Su faturası",
  phoneBill: "Telefon faturası",
  creditCardPayment: "Kredi kartı borcu",
  savingsTransfer: "Vadeli mevduat",

  // ---- Market
  weeklyGroceries: "Süpermarket",
  monthlyStockUp: "Aylık alışveriş",
  produce: "Manav",
  farmersMarket: "Semt pazarı",
  pantry: "Kuru gıda",
  butcher: "Kasap",
  cleaningSupplies: "Temizlik ürünleri",

  // ---- Restoran
  sushiNight: "Sushi",
  tacos: "Kebapçı",
  brunch: "Kahvaltı",
  pizzaDelivery: "Pizza siparişi",
  thaiTakeout: "Lahmacun",
  coffeePastries: "Pastane",
  dateNight: "Baş başa yemek",

  // ---- Sağlık
  pharmacy: "Eczane",
  medicine: "İlaç",
  doctorCopay: "Muayene ücreti",
  vitamins: "Vitamin",
  dentistCopay: "Diş hekimi",

  // ---- Evcil hayvan
  dogFood: "Köpek maması",
  dogToys: "Köpek oyuncağı",
  petStore: "Petshop",

  // ---- Alışveriş ve eğlence
  homeSupplies: "Ev eşyası",
  onlineOrder: "Online sipariş",
  concertTickets: "Konser bileti",
  clothes: "Kıyafet",
  hardwareStore: "Nalbur",

  // ---- Seyahat
  lodgingDeposit: "Pansiyon kaporası",
  lodging: "Pansiyon",
  hotel: "Otel",
  rentalCar: "Araç kiralama",
});
