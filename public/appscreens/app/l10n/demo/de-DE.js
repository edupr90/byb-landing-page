/* Demo words, German (Germany) (de-DE) — same keys as app/l10n/demo/en.js.
 *
 * The couple is Jonas (owner, male Memoji) and Lena (partner, female Memoji); the amounts are the same numbers in
 * euros (app/data.js BYBApp.langData["de-DE"]), owner decisions 2026-09-17.
 *
 * Expense names are written the way a couple in Germany types them into a budgeting app, not translated word for
 * word. Bills are named by what they pay for and four of them are the app's own samples in app_de.arb
 * (Miete, Stromrechnung, Wasserrechnung, Handyrechnung, Internet, Apotheke) — German really does write the
 * "-rechnung" compounds out, unlike French "Eau" / Italian "Bolletta acqua". Shops are generic kinds of shop
 * (Supermarkt, Wochenmarkt, Metzgerei, Zoohandlung, Baumarkt), and the American seed items become their everyday
 * German counterparts:
 *   Tacos → Gasthaus, the neighbourhood sit-down place, Germany's Trattoria. "Imbiss" and "Döner" were the first
 *     drafts and were dropped: the seed amounts on this key are 29–45 €, which is a table for two, not a counter.
 *   Thai takeout → Vietnamesisch. Thai is not what a German household orders in; Vietnamese is, the same swap
 *     Italian made to Chinese. Dropping the "takeaway" half also keeps the 65 € row believable.
 *   Coffee & pastries → Kaffee und Kuchen, the afternoon institution, not a coffee-to-go.
 *   Date night → Essen zu zweit. German has no "date night"; the phrase is what it means.
 *   Dog food → Hundefutter, Pet store → Zoohandlung (the everyday German word for a pet shop; "Tierhandlung" is
 *     the sign over the door, not what anyone says).
 *   Lodging → Ferienwohnung, the German holiday let, counterpart of the French Gîte and the Italian Agriturismo,
 *     with its deposit as "Anzahlung Fewo" — "Fewo" is the standard shorthand on every German rental listing.
 *   Credit card payment → Ratenkredit, because German households borrow with a fixed consumer-loan instalment,
 *     not a revolving card, and Savings transfer → Tagesgeld, the plain instant-access savings account every
 *     German bank offers (a product type, not a brand — the counterpart of the French Livret A).
 * No brand names, one to one (no two keys share a text), none repeats its own category's name (Wohnen,
 * Nebenkosten, Schuldentilgung, Sparen, Lebensmittel, Restaurants, Gesundheit, Haustiere, Shopping & Freizeit,
 * Reisen — app_de.arb categories*) word for word, and each fits a list row without ellipsis (≤ 18 characters).
 * That length rule binds harder here than in any other language: weeklyGroceries is "Supermarkt", not the app's
 * own sample "Lebensmittel" (which is also the category's own name), and internet stays the bare "Internet"
 * rather than "Internetanschluss".
 * The typed form name is "Abendessen", one word on purpose: the name field capitalizes every word as you type
 * (add_transaction.dart, RegExp r'\b\w'), so app_de.arb's own sample "Essen gehen" would come out as the wrong
 * "Essen Gehen" — a capitalized verb. The category row under it already says Restaurants.
 */
BYBApp.demo("de-DE", {
  // ---- people
  ownerName: "Jonas",
  partnerName: "Lena",
  ownerEmail: "jonas@example.com",

  // ---- typed into the New expense form
  dinnerOut: "Abendessen",

  // ---- Tools & Einstellungen → Sprache (lib/core/data/language_data.dart: endonym + flag)
  languageName: "Deutsch",
  languageFlag: "🇩🇪",

  // ---- expense names: Wohnen
  rent: "Miete",

  // ---- Nebenkosten · Schuldentilgung · Sparen
  electricBill: "Stromrechnung",
  internet: "Internet",
  waterBill: "Wasserrechnung",
  phoneBill: "Handyrechnung",
  creditCardPayment: "Ratenkredit",
  savingsTransfer: "Tagesgeld",

  // ---- Lebensmittel
  weeklyGroceries: "Supermarkt",
  monthlyStockUp: "Großeinkauf",
  produce: "Obst & Gemüse",
  farmersMarket: "Wochenmarkt",
  pantry: "Vorräte",
  butcher: "Metzgerei",
  cleaningSupplies: "Putzmittel",

  // ---- Restaurants
  sushiNight: "Sushi",
  tacos: "Gasthaus",
  brunch: "Brunch",
  pizzaDelivery: "Pizza-Lieferung",
  thaiTakeout: "Vietnamesisch",
  coffeePastries: "Kaffee und Kuchen",
  dateNight: "Essen zu zweit",

  // ---- Gesundheit
  pharmacy: "Apotheke",
  medicine: "Medikamente",
  doctorCopay: "Arztbesuch",
  vitamins: "Vitamine",
  dentistCopay: "Zahnarzt",

  // ---- Haustiere
  dogFood: "Hundefutter",
  dogToys: "Hundespielzeug",
  petStore: "Zoohandlung",

  // ---- Shopping & Freizeit
  homeSupplies: "Haushaltswaren",
  onlineOrder: "Onlinebestellung",
  concertTickets: "Konzertkarten",
  clothes: "Kleidung",
  hardwareStore: "Baumarkt",

  // ---- Reisen
  lodgingDeposit: "Anzahlung Fewo",
  lodging: "Ferienwohnung",
  hotel: "Hotel",
  rentalCar: "Mietwagen",
});
