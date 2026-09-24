/* Demo words, Traditional Chinese, Taiwan (zh-Hant) — same keys as app/l10n/demo/en.js.
 *
 * The couple is 宗翰 (owner, male Memoji) and 佳穎 (partner, female Memoji); the amounts are New Taiwan dollars,
 * the English numbers ×30 (app/data.js BYBApp.langData["zh-Hant"]), owner decisions 2026-09-18: incomes
 * NT$117,000 + NT$90,000 a month, a well-off Taipei couple. Both names were top names for Taiwanese born around
 * 1990–95, so the couple is in its thirties, the generation that keeps a 記帳 app on a phone. They are not the
 * meme-level 家豪 / 雅婷, they look nothing alike on the two member cards, and no other language uses them. The
 * email is the passport (Wade-Giles) spelling a real 宗翰 carries, tsunghan, not pinyin "zonghan".
 *
 * Expense names are written the way a Taiwanese household types them into a 記帳 app, not translated word for
 * word, and each was checked against the amounts on its key (NT$, at ×30):
 *   · Four values are app_zh.arb's own expenseNameSamples*: 房租, 電費, 網路費, 藥局. Two samples were NOT taken:
 *     水費, because waterBill is NT$900 every month and a Taiwanese water bill is a few hundred NT$ every two
 *     months — so this key is 瓦斯費, one cylinder of 桶裝瓦斯 a month, still under 水電瓦斯; and 電話費, which
 *     reads as a landline, where NT$1,350 on phoneBill is a 5G plan: 手機費.
 *   · creditCardPayment → 信貸. A flat NT$9,000 on the 20th under 債務還款 is a personal-loan instalment, and a
 *     Taiwanese 卡費 varies month to month (the de / it move). savingsTransfer → 定存, what Taiwanese call a fixed
 *     monthly amount put aside; 存款 would mean a balance.
 *   · doctorCopay → 看中醫, dentistCopay → 看牙醫. Under national health insurance an ordinary co-pay is
 *     NT$150–250, so NT$830–1,380 is self-paid care, which is what a 中醫 visit or a 牙醫 visit often is. 中藥
 *     was not used for medicine (常備藥, the household kit) because it would collide with 看中醫.
 *   · Groceries are five different errands: 超市 (the weekly shop), 大賣場 (the monthly run: what people say, not
 *     the trade word 量販店), 菜市場 (the market; 傳統市場 is signage), 水果 (NT$1,643–2,884 is a fruit run — fruit is
 *     the expensive part of a Taiwanese grocery bill, and 菜市場 already covers vegetables), 米油雜糧 (the everyday
 *     name for the rice, oil and dry-goods shelf; a NT$1,821–3,060 restock of it is normal, of rice and
 *     seasonings alone it is not), and 買肉 (NT$1,838–3,208 is 10+ 斤, not one stall, so not 肉攤).
 *   · The American seed meals become what a Taipei couple eats out on: Tacos → 熱炒 (NT$883–1,363 is a stir-fry
 *     and beer table for two), Pizza delivery → 外送 (Taiwan's word, never 外賣), Coffee & pastries → 下午茶,
 *     Sushi night → 壽司 (not 迴轉壽司: NT$1,866 is beyond a conveyor belt), Date night → 約會.
 *   · Pet store → 毛孩用品, the pet-parent word, which keeps clear of the category 寵物; 狗狗玩具 is the same register.
 *     Lodging → 民宿, Taiwan's own holiday stay (the Gîte, the Pousada, the 펜션); Hotel → 飯店, never 酒店.
 * No brand names (全聯, 家樂福, 好市多, 7-11, IKEA, Uber Eats, foodpanda are all out), no place or currency names,
 * one to one (no two keys share a text), and none contains its own category's name or a picker's: app_zh.arb
 * categories* 居住, 水電瓦斯, 生鮮雜貨, 餐廳, 醫療, 寵物, 旅遊, 儲蓄, 債務還款, 購物與娛樂, and 車貸, 油錢與交通,
 * 汽車保養, 送禮與捐款, 緊急預備金, 訂閱, 其他. Taiwan vocabulary throughout (外送, 網路, 瓦斯, 飯店, 毛孩, 訂金).
 *
 * LENGTH. The longest value is five Han (演唱會門票). PingFang TC draws a Han glyph full-width, so that is 80 px at
 * the expense row's 16 px, well inside the name column and shorter than Japanese's eight-glyph ライブのチケット.
 *
 * The typed form name is 晚餐. It is not app_zh.arb's expenseNameSamplesDinnerOut 外食晚餐, which is stilted, and it
 * does not repeat 餐廳, the Category row right under the field — the collision ja solved with 夕食 under 外食 and
 * ko with 저녁 식사 under 외식. The capitalize-as-you-type rule (RegExp(r'\b\w')) is a no-op on Han: Dart's \w is
 * ASCII-only, and Han is caseless.
 */
BYBApp.demo("zh-Hant", {
  // ---- people
  ownerName: "宗翰",
  partnerName: "佳穎",
  ownerEmail: "tsunghan@example.com",

  // ---- typed into the New expense form
  dinnerOut: "晚餐",

  // ---- 工具與設定 → 語言 (lib/core/data/language_data.dart: endonym + flag)
  languageName: "繁體中文",
  languageFlag: "🇹🇼",

  // ---- expense names: 居住
  rent: "房租",

  // ---- 水電瓦斯 · 債務還款 · 儲蓄
  electricBill: "電費",
  internet: "網路費",
  waterBill: "瓦斯費",
  phoneBill: "手機費",
  creditCardPayment: "信貸",
  savingsTransfer: "定存",

  // ---- 生鮮雜貨
  weeklyGroceries: "超市",
  monthlyStockUp: "大賣場",
  produce: "水果",
  farmersMarket: "菜市場",
  pantry: "米油雜糧",
  butcher: "買肉",
  cleaningSupplies: "清潔用品",

  // ---- 餐廳
  sushiNight: "壽司",
  tacos: "熱炒",
  brunch: "早午餐",
  pizzaDelivery: "外送",
  thaiTakeout: "泰式料理",
  coffeePastries: "下午茶",
  dateNight: "約會",

  // ---- 醫療
  pharmacy: "藥局",
  medicine: "常備藥",
  doctorCopay: "看中醫",
  vitamins: "保健食品",
  dentistCopay: "看牙醫",

  // ---- 寵物
  dogFood: "狗飼料",
  dogToys: "狗狗玩具",
  petStore: "毛孩用品",

  // ---- 購物與娛樂
  homeSupplies: "日用品",
  onlineOrder: "網購",
  concertTickets: "演唱會門票",
  clothes: "衣服",
  hardwareStore: "五金行",

  // ---- 旅遊
  lodgingDeposit: "住宿訂金",
  lodging: "民宿",
  hotel: "飯店",
  rentalCar: "租車",
});
