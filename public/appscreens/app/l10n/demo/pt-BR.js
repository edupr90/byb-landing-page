/* Demo words, Brazilian Portuguese (pt-BR) — same keys as app/l10n/demo/en.js.
 *
 * The couple is Rafael (owner, male Memoji) and Beatriz (partner, female Memoji); the amounts are the English
 * numbers ×3 in reais (app/data.js BYBApp.langData["pt-BR"]), owner decisions 2026-09-17. Lucas was the obvious
 * Brazilian first name and is already the French owner, so Rafael took the row.
 *
 * Expense names are written the way a couple in Brazil types them into a budgeting app, not translated word for
 * word. Bills are named by what they pay for and six of them are the app's own samples in app_pt.arb (Aluguel,
 * Conta de luz, Conta de água, Conta de celular, Internet, Farmácia) — Brazilian households really do write the
 * "Conta de …" out, the way German writes "-rechnung". Shops are generic kinds of shop (Supermercado, Feira,
 * Açougue, Padaria, Pet shop, Ferragens), and the American seed items become their everyday Brazilian
 * counterparts:
 *   Tacos → Churrascaria, the sit-down place a couple goes to, Brazil's Trattoria and Gasthaus. "Lanchonete" and
 *     "Pastelaria" were the first drafts and were dropped on price: the seed amounts on this key are R$ 88–136
 *     at ×3, which is a sit-down meal out, not a counter.
 *   Thai takeout → Comida árabe. Thai is not what a Brazilian household orders in; esfiha and kibe are, the same
 *     swap Italian made to Chinese and German to Vietnamese.
 *   Coffee & pastries → Padaria, the Brazilian institution — café and pão na chapa at the corner bakery, the
 *     counterpart of Italy's "Colazione al bar", not a coffee to go.
 *   Brunch → Almoço fora. Brazil eats lunch out, it does not brunch.
 *   Pizza delivery → Delivery de pizza. "Delivery" is the word Brazilians actually use for ordering food in
 *     ("pedi delivery"), where "entrega" is what the postman does — but the loanword is a noun that takes a
 *     complement, so the phrase is "delivery de pizza". The English "Pizza delivery" word order is not
 *     Portuguese, and it was the one row in the file that read untranslated next to "Fatura do cartão".
 *   Dog food → Ração, Pet store → Pet shop (the everyday Brazilian term, and generic — every neighbourhood has
 *     one; the category itself is the bare "Pets", so the shop needs the second word).
 *   Lodging → Pousada, the Brazilian holiday let, counterpart of the French Gîte, the Italian Agriturismo and the
 *     German Ferienwohnung, with its deposit as "Sinal da pousada" — "sinal" is the Brazilian word for the money
 *     you put down to hold a booking.
 *   Credit card payment → Fatura do cartão. Unlike Germany and Italy, Brazilian households really do carry a
 *     revolving card bill, so this key keeps its English sense instead of becoming a consumer loan.
 *   Savings transfer → Reserva do mês, the es-419 shape ("Ahorro del mes"): what the couple moves aside each
 *     month, not where it lands. "Tesouro Direto" was the first draft and was dropped — it is the proper name of
 *     one Treasury programme rather than a product class (the file's only Title Case value, which is the tell),
 *     and README's "No brand names" rule reaches that far. The plain word, "Poupança", is barred separately: it
 *     is the category's own name.
 *   Concert tickets → Ingressos do show. In Brazil a "concerto" is classical; a band plays a "show".
 *   Home supplies → Artigos para casa. The collocation takes "para", not "de": "artigos de casa" is the literal
 *     rendering of the English compound, where the phrase Brazilian shops and households use is "artigos para
 *     casa" (or "utilidades domésticas", too long for a list row).
 * No brand names, one to one (no two keys share a text), none repeats its own category's name (Moradia, Contas de
 * casa, Pagamento de dívidas, Poupança, Mercado, Restaurantes, Saúde, Pets, Compras e lazer, Viagens —
 * app_pt.arb categories*) word for word, and each fits a list row without ellipsis (≤ 18 characters).
 * Two places where those two rules bite: weeklyGroceries is "Supermercado", not the app's own sample "Mercado",
 * which is also the Groceries category's own name (the same trap German hit with "Lebensmittel"); and dogToys is
 * the bare "Brinquedos", because the full "Brinquedos de cachorro" is 22 characters and the shop-shelf
 * "Brinquedos pet" is e-commerce jargon rather than something a household types. The bare word is free here for
 * the same reason "Jantar" is: the category row under it already says Pets. "Aluguel" and "Aluguel de carro"
 * echo each other deliberately — Portuguese reuses the noun exactly as English reuses "rent"/"rental", and the two
 * rows sit in different categories.
 * The typed form name is "Jantar", one word on purpose: the name field capitalizes every word as you type
 * (add_transaction.dart, RegExp r'\b\w'), so app_pt.arb's own sample "Jantar fora" would come out as the wrong
 * "Jantar Fora". The category row under it already says Restaurantes.
 */
BYBApp.demo("pt-BR", {
  // ---- people
  ownerName: "Rafael",
  partnerName: "Beatriz",
  ownerEmail: "rafael@example.com",

  // ---- typed into the New expense form
  dinnerOut: "Jantar",

  // ---- Ferramentas e configurações → Idioma (lib/core/data/language_data.dart: endonym + flag)
  languageName: "Português",
  languageFlag: "🇧🇷",

  // ---- expense names: Moradia
  rent: "Aluguel",

  // ---- Contas de casa · Pagamento de dívidas · Poupança
  electricBill: "Conta de luz",
  internet: "Internet",
  waterBill: "Conta de água",
  phoneBill: "Conta de celular",
  creditCardPayment: "Fatura do cartão",
  savingsTransfer: "Reserva do mês",

  // ---- Mercado
  weeklyGroceries: "Supermercado",
  monthlyStockUp: "Compra do mês",
  produce: "Frutas e verduras",
  farmersMarket: "Feira",
  pantry: "Mantimentos",
  butcher: "Açougue",
  cleaningSupplies: "Limpeza",

  // ---- Restaurantes
  sushiNight: "Sushi",
  tacos: "Churrascaria",
  brunch: "Almoço fora",
  pizzaDelivery: "Delivery de pizza",
  thaiTakeout: "Comida árabe",
  coffeePastries: "Padaria",
  dateNight: "Jantar a dois",

  // ---- Saúde
  pharmacy: "Farmácia",
  medicine: "Remédios",
  doctorCopay: "Consulta médica",
  vitamins: "Vitaminas",
  dentistCopay: "Dentista",

  // ---- Pets
  dogFood: "Ração",
  dogToys: "Brinquedos",
  petStore: "Pet shop",

  // ---- Compras e lazer
  homeSupplies: "Artigos para casa",
  onlineOrder: "Compra online",
  concertTickets: "Ingressos do show",
  clothes: "Roupas",
  hardwareStore: "Ferragens",

  // ---- Viagens
  lodgingDeposit: "Sinal da pousada",
  lodging: "Pousada",
  hotel: "Hotel",
  rentalCar: "Aluguel de carro",
});
