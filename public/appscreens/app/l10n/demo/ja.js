/* Demo words, Japanese (ja) — same keys as app/l10n/demo/en.js.
 *
 * The couple is 健太 (owner, male Memoji) and 結衣 (partner, female Memoji); the amounts are yen (app/data.js
 * BYBApp.langData.ja, every figure ×100), owner decisions 2026-09-17.
 *
 * Expense names are written the way a Japanese couple types them into a household budget (家計簿), not translated
 * word for word: bills take the 〜代 form (電気代, 水道代, スマホ代), stores are generic kinds of shop (スーパー,
 * ホームセンター, 薬局, 直売所), and a few American seed meals become their everyday Japanese counterparts
 * (Tacos → ラーメン, Brunch → ランチ, Sushi night → 回転寿司, Lodging → 温泉旅館). No brand names, one to one (no two
 * keys share a text), and none repeats its own category's name (外食, 貯金, ペット…) word for word.
 * The savings transfer lands on the 25th, which is payday in most Japanese companies, hence 先取り貯金.
 * The typed form name is 夕食: the category row below it already says 外食.
 */
BYBApp.demo("ja", {
  // ---- people
  ownerName: "健太",
  partnerName: "結衣",
  ownerEmail: "kenta@example.com",

  // ---- typed into the New expense form
  dinnerOut: "夕食",

  // ---- Tools & Settings → 言語 (lib/core/data/language_data.dart: endonym + flag)
  languageName: "日本語",
  languageFlag: "🇯🇵",

  // ---- expense names: 住居費
  rent: "家賃",

  // ---- 水道光熱費 · 借金の返済 · 貯金
  electricBill: "電気代",
  internet: "ネット代",
  waterBill: "水道代",
  phoneBill: "スマホ代",
  creditCardPayment: "カードの返済",
  savingsTransfer: "先取り貯金",

  // ---- 食料品
  weeklyGroceries: "スーパー",
  monthlyStockUp: "まとめ買い",
  produce: "野菜・果物",
  farmersMarket: "直売所",
  pantry: "お米・調味料",
  butcher: "精肉店",
  cleaningSupplies: "掃除用品",

  // ---- 外食
  sushiNight: "回転寿司",
  tacos: "ラーメン",
  brunch: "ランチ",
  pizzaDelivery: "宅配ピザ",
  thaiTakeout: "タイ料理",
  coffeePastries: "カフェ",
  dateNight: "記念日ディナー",

  // ---- 医療費
  pharmacy: "薬局",
  medicine: "風邪薬",
  doctorCopay: "病院代",
  vitamins: "サプリ",
  dentistCopay: "歯医者",

  // ---- ペット
  dogFood: "ドッグフード",
  dogToys: "犬のおもちゃ",
  petStore: "ペット用品",

  // ---- 買い物・娯楽
  homeSupplies: "日用品",
  onlineOrder: "ネット通販",
  concertTickets: "ライブのチケット",
  clothes: "洋服",
  hardwareStore: "ホームセンター",

  // ---- 旅行
  lodgingDeposit: "宿の前払い",
  lodging: "温泉旅館",
  hotel: "ホテル",
  rentalCar: "レンタカー",
});
