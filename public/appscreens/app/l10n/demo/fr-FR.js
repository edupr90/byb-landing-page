/* Demo words, French (France) (fr-FR) — same keys as app/l10n/demo/en.js.
 *
 * The couple is Lucas (owner, male Memoji) and Léa (partner, female Memoji); the amounts are the same numbers in
 * euros (app/data.js BYBApp.langData["fr-FR"]), owner decisions 2026-09-17.
 *
 * Expense names are written the way a couple in France types them into a budgeting app, not translated word for
 * word: bills are named by what they pay for (Électricité, Eau, Box internet, Forfait mobile — the last one is also
 * the app's own sample in app_fr.arb), shops are generic kinds of shop (Marché, Boucherie, Animalerie, Bricolage),
 * and a few American seed items become their everyday French counterparts (Tacos → Crêperie, Brunch → Déjeuner,
 * Dog food → Croquettes, Lodging → Gîte, Credit card payment → Crédit conso, since revolving card debt is not how
 * French households borrow). Livret A is the state-regulated savings account every French bank offers, not a brand.
 * No brand names, one to one (no two keys share a text), none repeats its own category's name (Logement, Courses,
 * Restaurants, Santé, Animaux, Épargne…) word for word, and each fits a list row without ellipsis.
 * The typed form name is "Dîner": the category row below it already says Restaurants.
 */
BYBApp.demo("fr-FR", {
  // ---- people
  ownerName: "Lucas",
  partnerName: "Léa",
  ownerEmail: "lucas@example.com",

  // ---- typed into the New expense form
  dinnerOut: "Dîner",

  // ---- Outils et réglages → Langue (lib/core/data/language_data.dart: endonym + flag)
  languageName: "Français",
  languageFlag: "🇫🇷",

  // ---- expense names: Logement
  rent: "Loyer",

  // ---- Charges et factures · Remboursement de dettes · Épargne
  electricBill: "Électricité",
  internet: "Box internet",
  waterBill: "Eau",
  phoneBill: "Forfait mobile",
  creditCardPayment: "Crédit conso",
  savingsTransfer: "Virement Livret A",

  // ---- Courses
  weeklyGroceries: "Supermarché",
  monthlyStockUp: "Courses du mois",
  produce: "Fruits et légumes",
  farmersMarket: "Marché",
  pantry: "Épicerie",
  butcher: "Boucherie",
  cleaningSupplies: "Produits ménagers",

  // ---- Restaurants
  sushiNight: "Sushis",
  tacos: "Crêperie",
  brunch: "Déjeuner",
  pizzaDelivery: "Livraison pizza",
  thaiTakeout: "Thaï à emporter",
  coffeePastries: "Café et croissants",
  dateNight: "Dîner en amoureux",

  // ---- Santé
  pharmacy: "Pharmacie",
  medicine: "Médicaments",
  doctorCopay: "Médecin",
  vitamins: "Vitamines",
  dentistCopay: "Dentiste",

  // ---- Animaux
  dogFood: "Croquettes",
  dogToys: "Jouets du chien",
  petStore: "Animalerie",

  // ---- Achats et loisirs
  homeSupplies: "Pour la maison",
  onlineOrder: "Commande en ligne",
  concertTickets: "Places de concert",
  clothes: "Vêtements",
  hardwareStore: "Bricolage",

  // ---- Voyages
  lodgingDeposit: "Acompte location",
  lodging: "Gîte",
  hotel: "Hôtel",
  rentalCar: "Location voiture",
});
