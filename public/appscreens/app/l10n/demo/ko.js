/* Demo words, Korean (ko) — same keys as app/l10n/demo/en.js.
 *
 * The couple is 지훈 (owner, male Memoji) and 수진 (partner, female Memoji); the amounts are won, the English
 * numbers ×900 (app/data.js BYBApp.langData.ko), owner decisions 2026-09-17. Both are names a couple in their
 * thirties actually carries in Korea today — the generation that keeps a 가계부 on a phone — and neither reuses a
 * name another language already took.
 *
 * Expense names are written the way a Korean household types them into a 가계부, not translated word for word:
 *   · Bills take 요금, which is app_ko.arb's own choice (전기요금, 수도요금, 인터넷 요금, 휴대폰 요금) — the Korean
 *     counterpart of Japanese's 〜代, German's -rechnung and Brazil's "Conta de …". Seven values are lifted
 *     straight from that file's expenseNameSamples*: 월세, 전기요금, 수도요금, 인터넷 요금, 휴대폰 요금, 장보기 and
 *     약국.
 *   · Shops are generic kinds of shop, never a chain: 대형마트, 전통시장, 정육점, 철물점, 펫용품, 카페.
 *     monthlyStockUp was 창고형 마트 until 2026-09-17 — the American seed said Costco, and 창고형 마트 is the
 *     word the chains and the trade press use for that format, not the word a household types into a 가계부.
 *     The amounts settled it: this key renders ₩71,235 and ₩89,145 at ×900, an ordinary 대형마트 run, where a
 *     warehouse-club haul in Korea is ₩150,000–200,000. 대형마트 is 4 syllables and narrower than what it
 *     replaced, so no fit risk. 전통시장 rather than 재래시장 — the market renamed itself, and signage and the
 *     press have said 전통시장 for a decade; it is the official name rather than the everyday 시장, and it is
 *     kept on purpose, because the row it sits on is the deliberate-errand one.
 *   · The American seed meals become what a Korean couple actually eats out on, each checked against the amounts
 *     sitting on that key (won, at ×900):
 *       Tacos → 삼겹살. The neighbourhood grill is Korea's Trattoria and Kebapçı, and the ₩40,887 at the top of
 *         this key is exactly a 삼겹살 table for two.
 *       Pizza delivery → 치킨 배달. Pizza exists in Korea; 치킨 is what gets ordered, and this key is the delivery
 *         row, not the pizza row.
 *       Thai takeout → 족발·보쌈, the same swap Italian made to Chinese, German to Vietnamese and Turkish to
 *         lahmacun. Thai is not the Korean takeout reflex; ₩58,698 is a 족발 세트 for two.
 *       Sushi night → 초밥, Brunch → 브런치 (a fully naturalised Korean word, not a brand — Korea does brunch),
 *         Coffee & pastries → 카페: the outing, which is why it is NOT app_ko.arb's own 커피 sample. That sample
 *         stays free for the user's own row, and ₩39,708 is two people sitting down, not one coffee.
 *       Date night → 데이트, the word Korean uses where English says date night. Everything built on 저녁 was kept
 *         clear of the typed form name below.
 *   · Fruit & veggies → 과일·채소, Farmers market → 전통시장, Pantry staples → 쌀·양념: three different grocery
 *     errands, the way Turkish splits manav / semt pazarı / kuru gıda and Japanese splits 野菜・果物 / 直売所 /
 *     お米・調味料. 쌀·양념 is what a Korean pantry restock literally is.
 *   · Credit card payment → 카드값, the everyday Korean word for what you owe the card. Like Brazil and Türkiye,
 *     and unlike Germany and Italy, Korean households do carry a revolving card balance, so this key keeps its
 *     English sense instead of becoming a consumer-loan instalment. Savings transfer → 적금 이체: the 적금, the
 *     fixed monthly recurring deposit every Korean bank sells, is a product class like the German Tagesgeld and
 *     the Turkish vadeli mevduat, not a brand, and it is exactly this key — the same amount moved aside monthly.
 *   · Lodging → 펜션, the Korean family-run holiday rental, counterpart of the Gîte, the Agriturismo, the
 *     Ferienwohnung, the Pousada and the Pansiyon, with its deposit as 숙소 예약금.
 *   · Pet store → 펫용품. The category is 반려동물, so the shop cannot carry that name — the row's subtitle
 *     already reads 반려동물 one line under it, the collision 저녁 식사 was written to avoid. It was 애견용품
 *     until 2026-09-17: still the retail-signage word, but app_ko.arb's ONLY pet word is categoriesPets
 *     "반려동물" — 애견 and 애완 appear in none of its 2,030 messages — and Korean pet copy has moved to 반려.
 *     펫 is the register-neutral way to say it without repeating the category; 반려동물용품 would repeat it.
 * No brand names (README "Rules the images follow"), one to one (no two keys share a text), and none repeats its
 * own category's name — app_ko.arb categories*: 주거, 공과금, 식료품, 외식, 의료, 반려동물, 여행, 저축, 부채 상환,
 * 쇼핑·여가, and in the picker 자동차 정비, 자동차 할부, 비상금, 주유·교통, 선물·기부, 구독, 기타.
 *
 * LENGTH. The "≤ 18 characters" rule the Latin languages carry does not transfer, and neither does Japanese's
 * full-width arithmetic. Measured in Chrome at the expense row's own style (16px / w600, tracking −0.1px, with
 * the faces app/app.css declares): Apple SD Gothic Neo draws a Hangul syllable at 13.84px — 0.865em, NOT full
 * width — against 9.76px for a Latin "n" and 16.00px for Hiragino's 漢. (The declaration is doing that: the same
 * syllable through the system's own last resort measures 15.98px.) One syllable is therefore about 1.4 Latin
 * characters, so the working rule is ≤ 8 syllables, and it was checked by rendering, not by counting: the name
 * column in the expense list is 222–233px once the widest Korean amount (₩810,000, on 월세) takes its share, and
 * the widest value below — 강아지 장난감 — measures 86.3px, 37% of it, against English's "Credit card payment" at
 * 156.0px and Japanese's ライブのチケット at 127.2px. Nothing here comes near an ellipsis. The three values that use
 * "·" are safe too: U+00B7 measures 4.65px in Inter against the fallback's 4.00, i.e. Inter draws it, so 과일·채소,
 * 족발·보쌈 and 옷·신발 never pull a second face into the middle of a row.
 *
 * The typed form name is 저녁 식사, and the capitalize-as-you-type rule behind it is a double no-op in Korean:
 * add_transaction.dart runs value.replaceAllMapped(RegExp(r'\b\w'), toUpperCase), Dart's \w is ASCII-only, so a
 * Hangul string offers nothing for \b to sit against and matches nothing — and Hangul is caseless, so even a
 * match would change nothing. Run through the real rule rather than reasoned about: 저녁 식사 comes back
 * 저녁 식사, where "dinner out" comes back "Dinner Out". It is 저녁 식사 and not 외식 because 외식 is what
 * expenseNameSamplesDinnerOut says AND what categoriesRestaurants says — the category row right under the field
 * already reads 외식, exactly the collision Japanese solved with 夕食 under 外食.
 */
BYBApp.demo("ko", {
  // ---- people
  ownerName: "지훈",
  partnerName: "수진",
  ownerEmail: "jihun@example.com",

  // ---- typed into the New expense form
  dinnerOut: "저녁 식사",

  // ---- 도구 및 설정 → 언어 (lib/core/data/language_data.dart: endonym + flag)
  languageName: "한국어",
  languageFlag: "🇰🇷",

  // ---- expense names: 주거
  rent: "월세",

  // ---- 공과금 · 부채 상환 · 저축
  electricBill: "전기요금",
  internet: "인터넷 요금",
  waterBill: "수도요금",
  phoneBill: "휴대폰 요금",
  creditCardPayment: "카드값",
  savingsTransfer: "적금 이체",

  // ---- 식료품
  weeklyGroceries: "장보기",
  monthlyStockUp: "대형마트",
  produce: "과일·채소",
  farmersMarket: "전통시장",
  pantry: "쌀·양념",
  butcher: "정육점",
  cleaningSupplies: "청소용품",

  // ---- 외식
  sushiNight: "초밥",
  tacos: "삼겹살",
  brunch: "브런치",
  pizzaDelivery: "치킨 배달",
  thaiTakeout: "족발·보쌈",
  coffeePastries: "카페",
  dateNight: "데이트",

  // ---- 의료
  pharmacy: "약국",
  medicine: "감기약",
  doctorCopay: "진료비",
  vitamins: "영양제",
  dentistCopay: "치과",

  // ---- 반려동물
  dogFood: "강아지 사료",
  dogToys: "강아지 장난감",
  petStore: "펫용품",

  // ---- 쇼핑·여가
  homeSupplies: "생활용품",
  onlineOrder: "온라인 쇼핑",
  concertTickets: "공연 티켓",
  clothes: "옷·신발",
  hardwareStore: "철물점",

  // ---- 여행
  lodgingDeposit: "숙소 예약금",
  lodging: "펜션",
  hotel: "호텔",
  rentalCar: "렌터카",
});
