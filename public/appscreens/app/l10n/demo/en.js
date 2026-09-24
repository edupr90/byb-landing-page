/* Demo words, English (en) — everything a screen shows that is the demo's data rather than an app string:
 * the two people, the expense names, what the user typed into the new-expense form.
 * Keys are referenced from app/data.js (members[].name, expenses[].name, newExpense.name, settings) and read
 * with ctx.d(key). app/l10n/demo/es-419.js must have exactly the same keys.
 *
 * Expense names are the English names of the Shared Budget simulation (lib/core/dev/shared_budget_simulation_seed.dart
 * and shared_budget_usage_seed.dart), except that no store brand is shown: README "Rules the images follow" keeps
 * third-party marks out of frame, so every branded seed name ("seed: …" below) becomes the plain description the
 * app's Spanish table gives it (lib/core/dev/shared_budget_simulation_names.dart). Keep the names one to one: two
 * keys with the same text would read as one merchant.
 */
BYBApp.demo("en", {
  // ---- people (the simulation's Eduardo and Laura, renamed per language)
  ownerName: "Alex", // you, the signed-in owner (male Memoji, assets/avatars/owner.png)
  partnerName: "Sam", // the member who joined (female Memoji, assets/avatars/partner.png)
  ownerEmail: "alex@example.com", // Tools & Settings → Cloud Sync card (reserved example domain)

  // ---- typed into the New expense form (07_expenses_new_form, never saved)
  dinnerOut: "Dinner Out",

  // ---- Tools & Settings → Language (lib/core/data/language_data.dart: endonym + flag)
  languageName: "English",
  languageFlag: "🇺🇸",

  // ---- expense names: Housing
  rent: "Rent",

  // ---- Utilities · Debt Payments · Savings (bills)
  electricBill: "Electric bill",
  internet: "Internet",
  waterBill: "Water bill",
  phoneBill: "Phone bill",
  creditCardPayment: "Credit card payment",
  savingsTransfer: "Savings transfer",

  // ---- Groceries
  weeklyGroceries: "Weekly groceries", // seed: Trader Joe's
  monthlyStockUp: "Monthly stock-up", // seed: Costco run
  produce: "Fruit & veggies", // seed: Whole Foods
  farmersMarket: "Farmers market",
  pantry: "Pantry staples", // seed: Target groceries
  butcher: "Butcher", // seed: Safeway
  cleaningSupplies: "Cleaning supplies", // seed: Aldi trip

  // ---- Restaurants
  sushiNight: "Sushi night",
  tacos: "Tacos", // seed: Chipotle
  brunch: "Brunch",
  pizzaDelivery: "Pizza delivery",
  thaiTakeout: "Thai takeout",
  coffeePastries: "Coffee & pastries",
  dateNight: "Date night",

  // ---- Healthcare
  pharmacy: "Pharmacy",
  medicine: "Medicine", // seed: CVS Pharmacy
  doctorCopay: "Doctor copay",
  vitamins: "Vitamins", // seed: Walgreens
  dentistCopay: "Dentist copay",

  // ---- Pets
  dogFood: "Dog food",
  dogToys: "Dog toys", // seed: Chewy order
  petStore: "Pet store", // seed: Petco

  // ---- Shopping & Entertainment
  homeSupplies: "Home supplies", // seed: Target run
  onlineOrder: "Online order", // seed: Amazon order
  concertTickets: "Concert tickets",
  clothes: "Clothes", // seed: Zara
  hardwareStore: "Hardware store", // seed: Home Depot

  // ---- Travel
  lodgingDeposit: "Lodging deposit", // seed: Airbnb deposit
  lodging: "Lodging", // seed: Airbnb
  hotel: "Hotel",
  rentalCar: "Rental car",
});
