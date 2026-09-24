/* Demo words, Latin American Spanish (es-419) — same keys as app/l10n/demo/en.js.
 *
 * Expense names come from the simulation's Spanish table (lib/core/dev/shared_budget_simulation_names.dart), which
 * is what raw/es-419 shows ("Renta", "Desayuno", "Sushi", "Cafetería"…): brands become plain descriptions there,
 * and the English table follows the same descriptions.
 * The typed form name is "Cena", as captured (README "How the Spanish set was made").
 */
BYBApp.demo("es-419", {
  // ---- people
  ownerName: "Diego",
  partnerName: "Sofía",
  ownerEmail: "diego@example.com",

  // ---- typed into the New expense form
  dinnerOut: "Cena",

  // ---- Herramientas y Ajustes → Idioma (lib/core/data/language_data.dart: endonym + flag)
  languageName: "Español",
  languageFlag: "🇵🇷",

  // ---- expense names: Vivienda
  rent: "Renta",

  // ---- Servicios · Pagos de deudas · Ahorros
  electricBill: "Luz",
  internet: "Internet",
  waterBill: "Agua",
  phoneBill: "Teléfono",
  creditCardPayment: "Pago de tarjeta",
  savingsTransfer: "Ahorro del mes",

  // ---- Supermercado
  weeklyGroceries: "Súper de la semana",
  monthlyStockUp: "Compras del mes",
  produce: "Frutas y verduras",
  farmersMarket: "Mercado",
  pantry: "Despensa",
  butcher: "Carnicería",
  cleaningSupplies: "Artículos de limpieza",

  // ---- Restaurantes
  sushiNight: "Sushi",
  tacos: "Tacos",
  brunch: "Desayuno",
  pizzaDelivery: "Pizza a domicilio",
  thaiTakeout: "Comida tailandesa",
  coffeePastries: "Cafetería",
  dateNight: "Cena en pareja",

  // ---- Salud
  pharmacy: "Farmacia",
  medicine: "Medicinas",
  doctorCopay: "Consulta médica",
  vitamins: "Vitaminas",
  dentistCopay: "Dentista",

  // ---- Mascotas
  dogFood: "Comida para perro",
  dogToys: "Juguetes para perro",
  petStore: "Tienda de mascotas",

  // ---- Compras y entretenimiento
  homeSupplies: "Cosas para la casa",
  onlineOrder: "Compra en línea",
  concertTickets: "Concierto",
  clothes: "Ropa",
  hardwareStore: "Ferretería",

  // ---- Viajes
  lodgingDeposit: "Anticipo de hospedaje",
  lodging: "Hospedaje",
  hotel: "Hotel",
  rentalCar: "Renta de auto",
});
