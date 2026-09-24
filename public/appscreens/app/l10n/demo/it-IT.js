/* Demo words, Italian (Italy) (it-IT) — same keys as app/l10n/demo/en.js.
 *
 * The couple is Marco (owner, male Memoji) and Giulia (partner, female Memoji); the amounts are the same numbers in
 * euros (app/data.js BYBApp.langData["it-IT"]), owner decisions 2026-09-17.
 *
 * Expense names are written the way a couple in Italy types them into a budgeting app, not translated word for
 * word: bills are named by what they pay for (Bolletta luce, Bolletta acqua and Telefono — the first two are also
 * the app's own samples in app_it.arb — and Fibra, which is what an Italian home calls its internet line), shops
 * are generic kinds of shop (Supermercato, Mercato, Macelleria, Ferramenta), and the American seed items become
 * their everyday Italian counterparts: Tacos → Trattoria, Brunch → Pranzo fuori, Thai takeout → Cinese d'asporto
 * (Chinese, not Thai, is the takeaway Italians order), Coffee & pastries → Colazione al bar, Dog food →
 * Crocchette, Pet store → Toelettatura (there is no one-word Italian "pet store", and grooming is the pet spend a
 * household actually books), Lodging → Agriturismo, and Credit card payment → Rata prestito, since Italian
 * households borrow with a consumer-loan instalment rather than a revolving card.
 * No brand names, one to one (no two keys share a text), none repeats its own category's name (Casa, Alimentari,
 * Ristoranti, Utenze, Risparmi, Pagamenti debiti, Salute, Animali, Shopping e svago, Viaggi) word for word, and
 * each fits a list row without ellipsis (≤ 18 characters).
 * The typed form name is "Cena", one word on purpose: the name field capitalizes every word as you type
 * (add_transaction.dart, RegExp r'\b\w'), and Italian writes "cena fuori" in sentence case — the category row
 * under it already says Ristoranti.
 */
BYBApp.demo("it-IT", {
  // ---- people
  ownerName: "Marco",
  partnerName: "Giulia",
  ownerEmail: "marco@example.com",

  // ---- typed into the New expense form
  dinnerOut: "Cena",

  // ---- Strumenti e impostazioni → Lingua (lib/core/data/language_data.dart: endonym + flag)
  languageName: "Italiano",
  languageFlag: "🇮🇹",

  // ---- expense names: Casa
  rent: "Affitto",

  // ---- Utenze · Pagamenti debiti · Risparmi
  electricBill: "Bolletta luce",
  internet: "Fibra",
  waterBill: "Bolletta acqua",
  phoneBill: "Telefono",
  creditCardPayment: "Rata prestito",
  savingsTransfer: "Bonifico risparmi",

  // ---- Alimentari
  weeklyGroceries: "Supermercato",
  monthlyStockUp: "Scorte del mese",
  produce: "Frutta e verdura",
  farmersMarket: "Mercato",
  pantry: "Dispensa",
  butcher: "Macelleria",
  cleaningSupplies: "Detersivi",

  // ---- Ristoranti
  sushiNight: "Sushi",
  tacos: "Trattoria",
  brunch: "Pranzo fuori",
  pizzaDelivery: "Pizza a domicilio",
  thaiTakeout: "Cinese d'asporto",
  coffeePastries: "Colazione al bar",
  dateNight: "Cena romantica",

  // ---- Salute
  pharmacy: "Farmacia",
  medicine: "Medicinali",
  doctorCopay: "Visita medica",
  vitamins: "Integratori",
  dentistCopay: "Dentista",

  // ---- Animali
  dogFood: "Crocchette",
  dogToys: "Giochi per cani",
  petStore: "Toelettatura",

  // ---- Shopping e svago
  homeSupplies: "Casalinghi",
  onlineOrder: "Ordine online",
  concertTickets: "Biglietti concerto",
  clothes: "Vestiti",
  hardwareStore: "Ferramenta",

  // ---- Viaggi
  lodgingDeposit: "Caparra alloggio",
  lodging: "Agriturismo",
  hotel: "Albergo",
  rentalCar: "Noleggio auto",
});
