/*
 * Turkish (tr-TR). Mirrors en.js key for key — see the note at the top of that
 * file: it is the source of truth for every CLAIM here, and a translation that
 * improves on a sentence by saying something new is a bug.
 *
 * Voice: the reader is SEN, and the second-person PLURAL appears only where the
 * sentence means the two people in a shared budget — the app's own split
 * («Kategorileriniz … ikinizin de düzenlediği», «kimin ne harcadığını
 * görürsünüz»). The formal siz for a single reader appears nowhere here; the
 * app's own onboarding does it, and that is drift, not the house voice.
 *
 * Terms come from lib/l10n/app_tr.arb, which is byte-identical to the ARB the
 * embedded phone screens on this page render — so a term that disagrees with it
 * visibly disagrees with the screenshot beside it: Ortak bütçe (the feature
 * NAME; «paylaşılan bütçe» is the description), Borç planlayıcı, Kartopu
 * yöntemi (Turkish translates Snowball, unlike Italian), Raporlar, Analiz, fiş
 * (never «makbuz»), harcama (never «gider»), yapay zekâ, BYB+.
 *
 * Turkish does NOT have the gendering problem German and Portuguese have, so
 * unlike those two this file does not recast around the other person: «partner»
 * is gender-neutral and the app uses it («Partnerin bu tutarı ve toplamı
 * görecek»). The warmer register the newer app strings prefer is «parayı
 * paylaştığın kişi», and that is used here wherever the line has room.
 *
 * TYPOGRAPHY is mechanical and check-locale.mjs gates all of it, because none
 * of it is visible to a reviewer reading for sense:
 *  - the apostrophe is the plain ASCII ' (the app: 75 uses to 0 typographic);
 *  - the aside takes the em dash — (34 to 0 en dashes), like English, unlike
 *    German and French;
 *  - quotes are the curly Turkish pair “…”;
 *  - «yapay zekâ» always carries the circumflex (14 uses to 0 without);
 *  - a suffix on a proper noun takes an apostrophe AND vowel harmony from how
 *    the word is spoken: App Store'da, Google Play'den, iOS'ta, BYB+'ya;
 *  - a capital I before a lowercase letter is a spelling error — Turkish
 *    capitalises i as İ.
 *
 * LENGTH: Turkish sentences are not longer than English, but single words are,
 * because case, possessive and plural all stack onto one stem. A 16-character
 * Turkish word in a card title overflows exactly the way a German compound
 * does. The lint reports long words in the narrow boxes; the fix is shorter
 * copy, not CSS.
 *
 * The /terms and /privacypolicy documents are NOT translated into Turkish —
 * they exist in English and Spanish only, as prose in pages/Terms.jsx and
 * pages/PrivacyPolicy.jsx. A Turkish visitor gets the English document and the
 * EN/ES switch. Only this file's `legal` block is site chrome.
 */
export default {
  nav: {
    features: 'Özellikler',
    shared: 'Ortak bütçe',
    faq: 'FAQ',
    language: 'Dil',
    soon: 'Yakında',
    getApp: 'Uygulamayı al',
    menu: 'Menü',
    theme: 'Koyu modu aç/kapat',
  },
  hero: {
    badge: "iOS'ta ve Android'de ücretsiz",
    titleA: 'Paranda',
    titleB: 'söz',
    titleAccent: 'sende',
    subtitle: 'Bu ayı planla, ne harcadığını kaydet ve her kategoriyi bir bakışta gör. Budget Your Budget bunu o kadar basit tutar ki gerçekten kullanmaya devam edersin.',
    rating: '4,8',
    statRating: "App Store'da",
    statPrivate: 'Çevrimdışı çalışır',
    statFree: 'Ücretsiz başla',
    caption: 'Gerçek uygulama — bu ekranlar canlı, resim değil.',
  },
  features: {
    eyebrow: 'Sana gereken her şey',
    title: 'Gerçekte nasıl bütçe yaptığına göre tasarlandı',
    subtitle: 'Banka bağlantısı yok, hesap tablosu yok, nutuk yok. Ne kazandığını yaz, paranın nereye gideceğini planla; matematiği uygulama yapar.',
    items: [
      {
        title: 'Kategoriye göre planla',
        body: 'Her kategoriye o ay için bir tutar ver ve harcadıkça halkanın boşalmasını izle. Bütçeyi aştığını maaş günü gelmeden görürsün, sonrasında değil.',
      },
      {
        title: 'Saniyeler içinde kaydet',
        body: 'Harcama eklemek için tek bir dokunuş ve bir tutar yeter. Emojiler ve renkler sayesinde kategoriler bir bakışta okunur.',
      },
      {
        title: 'Fişlerini tara',
        body: 'Bir fişin fotoğrafını çek; tutar, mağaza ve tarih kendiliğinden dolar. Kaydetmeden önce rakamları kontrol et — yapay zekâ okur, sen onaylarsın.',
      },
      {
        title: 'Partnerinle paylaş',
        body: 'Tek bütçe, iki telefon. Her harcamada onu kimin girdiği görünür ve evin toplam harcamasını ikiniz de görürsünüz.',
      },
      {
        title: 'Borçtan kurtul',
        body: 'Borçlarını listele; Borç planlayıcı, Kartopu yöntemiyle ödeme sırasını belirler ve kapanan her borç bir sonrakini besler.',
      },
      {
        title: 'Trendleri gör',
        body: 'Raporlar ayları karşılaştırır, en büyük kategorilerini öne çıkarır ve paranın sessizce nereye gittiğini gösterir.',
      },
      {
        title: 'Kişiselleştir',
        body: 'On beş renk teması, açık ve koyu mod, bir de kendi adların ve emojilerinle özel kategoriler.',
      },
      {
        title: 'Sana ait ve gizli',
        body: 'Hesap olmadan tamamen çevrimdışı çalışır. Yalnızca bulut yedeği ya da paylaşılan bütçe istiyorsan giriş yap.',
      },
    ],
  },
  showcase: {
    plan: {
      eyebrow: 'Planlama',
      title: 'Paranın nereye gittiğini gitmeden bil',
      body: 'Ay başında her kategori için bir plan belirle. Harcadıkça halka dolar, böylece zorlanan bir kategori hemen göze çarpar — üstüne dokunduğunda o kategoride harcadığın her şey açılır.',
      bullets: [
        'Her kategori bir taç yaprağı, payı kadar büyük',
        'Bir kategori sınırına yaklaştıkça rengi değişir',
        'Bir kategoriye dokun, tüm geçmişini gör',
      ],
    },
    track: {
      eyebrow: 'Takip',
      title: 'Her harcama, tek liste',
      body: 'Ara, kategoriye göre filtrele, ayın tamamını bir bakışta gör. Sonradan kanıtlaman gerekebilecek her şeye bir fiş fotoğrafı ekle.',
      bullets: [
        'Kategoriye göre filtrele ya da isme göre ara',
        'Yinelenen harcamalar kendiliğinden eklenir',
        'Her harcamaya fiş fotoğrafı eklenebilir',
      ],
    },
    shared: {
      eyebrow: 'Ortak bütçe · Yeni',
      title: 'Tek bütçe, iki telefon',
      body: 'Parayı paylaştığın kişiyi bir kodla davet et, birlikte tek bir bütçe kullanırsınız. İkiniz de harcama ekleyip düzenleyebilirsiniz; her harcamada onu kimin girdiği görünür ve plan ikinizin de gelirini hesaba katar.',
      bullets: [
        'Harcamalar saniyeler içinde diğer telefonda belirir',
        'Her satırda onu kimin girdiği görünür',
        'İki gelir de tek bir plana sayılır',
        "Borçların, PIN'in ve ayarların asla paylaşılmaz",
      ],
      note: "Bütçeni paylaşmak, içindeki harcamaları, notları ve fişleri partnerinin görmesi demektir. Birini davet etmeden önce Kullanım Koşulları'nı oku.",
      noteLink: 'Neler paylaşılır →',
      cta: 'Ortak bütçeyi keşfet',
    },
    scan: {
      eyebrow: 'Yapay zekâ ile fiş tarama',
      title: 'Kameranı fişe doğrult',
      body: 'Tutar, mağaza ve tarih kendiliğinden dolar, uygulama da bir kategori önerir. Sen kontrol edip kaydedersin — bu bir başlangıç avantajı, gözü kapalı güvenme meselesi değil.',
      bullets: [
        'Tutar, mağaza, tarih ve ürünler otomatik okunur',
        'Kendi kategorilerin arasından birini önerir',
        'Kaydetmeden önce her bilgiyi sen onaylarsın',
      ],
      note: "Fiş taradığında fotoğraf işlenmek üzere Google'a gönderilir. Detaylar Gizlilik Politikası'nda.",
    },
    insights: {
      eyebrow: 'Analizler',
      title: 'Bu ay, anlaşılır hâliyle',
      body: 'En büyük kategorilerin, en sık yaptığın harcamalar ve en çok harcadığın günler — hepsi hazır, tek bir grafik çizmene gerek kalmadan.',
      bullets: [
        'En büyük kategori ve en büyük tek harcama',
        'En sık aldıkların',
        'Günlük ortalamalar ve harcama serileri',
      ],
    },
    reports: {
      eyebrow: 'Raporlar',
      title: 'İstediğin iki ayı karşılaştır',
      body: "Geçen ayı bu ayla yan yana koy, kategori kategori neyin değiştiğini tam olarak gör. Kayıtlarında saklamak istediğinde PDF'ye veya Excel'e aktar.",
      bullets: [
        'Kategoriye göre ay ay karşılaştırma',
        'Zaman içinde gelire karşı harcamalar',
        "PDF'ye veya Excel'e aktar",
      ],
    },
    themes: {
      eyebrow: 'Kişiselleştirme',
      title: 'On beş tema, açık ve koyu',
      body: 'Uygulamayı açmak istemeni sağlayacak bir renk seç. Arayüzün tamamı — halkalar, grafikler, düğmeler — seçtiğin temaya uyar.',
      bullets: [
        '15 renk teması',
        'Eksiksiz açık ve koyu mod',
        'Kendi emojinle özel kategoriler',
      ],
    },
  },
  howItWorks: {
    eyebrow: 'Nasıl çalışır',
    titleA: 'Bütçene başlamak için',
    titleAccent: '3 basit adım',
    subtitle: 'Kurulum görüşmesi yok, banka bağlantısı yok, içe aktarılacak hesap tablosu yok. Daha bu akşam harcama kaydetmeye başlayabilirsin.',
    steps: [
      {
        title: 'Gelirini belirle',
        body: 'Vergi sonrası hesabına yatan tutarı ekle; uygulama da tam olarak ne kadar para dağıtacağını gösterir.',
      },
      {
        title: 'Kategorilerini planla',
        body: 'Her kategoriye bir ad, bir emoji ve aylık bir tutar ver. Yinelenenleri otomatik ekle.',
      },
      {
        title: 'Takip et ve ayarla',
        body: 'Harcamaları saniyeler içinde kaydet, her kategorinin dolduğunu izle. Hayat değiştikçe planını da ayarla.',
      },
    ],
  },
  privacy: {
    eyebrow: 'Gizlilik',
    title: 'Verilerin sana ait kalır',
    subtitle: 'Budget Your Budget, paranı varsayılan olarak cihazında tutar ve tamamen çevrimdışı çalışır. Bulut senkronizasyonu ve paylaşım, sen istediğinde devreye girer — ikisi de haberin olmadan asla açılmaz.',
    points: [
      {
        title: 'Önce cihazında',
        body: 'Bütçen cihazında saklanır ve uygulama tamamen çevrimdışı çalışır. Hesap gerekmez — hiç giriş yapmazsan finansal verilerin telefonundan asla çıkmaz.',
      },
      {
        title: 'Bulut senkronizasyonu isteğe bağlı',
        body: 'Yalnızca bütçeni cihazlarında yedeklemek ya da partnerinle paylaşmak istiyorsan giriş yap. Hesabını ve bulutta saklanan her şeyi uygulamanın içinden silebilirsin.',
      },
      {
        title: 'Reklam yok, veri satışı yok',
        body: "Reklam göstermiyoruz, hiçbir reklam SDK'sı kullanmıyoruz, bilgilerini asla satmıyoruz ve seni başka uygulamalarda takip etmiyoruz. Verilerini istediğin zaman dışa aktar.",
      },
      {
        title: 'Bankana asla dokunmayız',
        body: 'Uygulama hiçbir bankaya ya da karta bağlanmaz. Banka giriş bilgilerini asla istemeyiz ve paranı hareket ettiremeyiz.',
      },
    ],
    cta: "Gizlilik Politikası'nı oku",
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Sıkça sorulan sorular',
    items: [
      {
        q: 'Verilerim gerçekten gizli mi?',
        a: "Bütçen cihazında saklanır ve hiç giriş yapmazsan orada kalır — bize hiçbir şey ulaşmaz. Giriş yapmak isteğe bağlıdır; verilerin ancak o zaman buluta yedeklenebilir ya da davet ettiğin kişiyle paylaşılabilir. Verilerini asla satmayız, asla reklam göstermeyiz ve bankana asla bağlanmayız. Tüm ayrıntılar Gizlilik Politikası'nda.",
      },
      {
        q: 'Hesap açmam gerekir mi?',
        a: 'Hayır. Uygulama hesap olmadan da eksiksiz çalışır. Hesap yalnızca bulut senkronizasyonu, Ortak bütçe ve görünen adınla fotoğrafını düzenlemek için gerekir.',
      },
      {
        q: 'Paylaşılan bir bütçede partnerim ne görür?',
        a: "Paylaşılan bütçe iki kişiliktir. Tek bir bütçeyi ikiniz de eşit şekilde düzenlersiniz: her biriniz kategorileri, planı ve bütçedeki her harcamayı — notlarıyla ve varsa fiş fotoğrafıyla birlikte — görüp değiştirebilirsiniz. Her iki geliri ve toplam gelirinizi ikiniz de görürsünüz, ama kendi gelirini yalnızca sen düzenleyebilirsin. Her harcamada onu kimin girdiği görünür. Borçların, PIN'in, ayarların ve raporların asla paylaşılmaz. Katılmak, verilerini o bütçeyle birleştirir ve geri alınamaz; bu yüzden bir daveti kabul etmeden önce Kullanım Koşulları'nı oku.",
      },
      {
        q: 'Çevrimdışı çalışır mı?',
        a: 'Evet. Uygulama tamamen cihazında çalışır, yani bütçeni hiç internet bağlantısı olmadan takip edebilirsin. İnternet yalnızca isteğe bağlı ekstralar için gerekir: bulut senkronizasyonu, bütçe paylaşımı, fiş tarama ve yapay zekâ analizleri.',
      },
      {
        q: 'Fiş tarama ne kadar doğru?',
        a: 'Basılı fişlerin çoğunu iyi okur, ama bu bir yapay zekâ ve hata da yapar. Taranan tutar, mağaza ve tarih, kaydetmeden önce kontrol etmen için doldurulur — bunları her zaman fişin kendisiyle karşılaştır.',
      },
      {
        q: 'Verilerimi dışa aktarabilir miyim?',
        a: 'Evet. Raporlarını PDF ya da Excel olarak dışa aktarabilirsin; Yedekleme ve içe aktarma ise tüm verilerini sende kalan bir dosyaya kaydeder, yani verilerin asla uygulamada kilitli kalmaz.',
      },
      {
        q: 'Borç kartopu yöntemi nedir?',
        a: 'Kartopu yöntemi önce en küçük bakiyeni kapatır. Her borç kapandıkça onun ödemesini bir sonrakine eklersin, böylece borçlarına giden tutar giderek büyür. Borç planlayıcı borçlarını sıralar ve borçtan kurtulma ilerlemeni takip eder.',
      },
    ],
  },
  sharedPage: {
    metaTitle: 'Ortak bütçe — Budget Your Budget',
    eyebrow: 'Ortak bütçe',
    title: 'Tek bütçe. İki telefon.',
    subtitle: 'Bütçelerin çoğu, iki kişi parayı paylaşmaya başladığı anda dağılır. Ortak bütçe seni ve partnerini aynı planda buluşturur — her biriniz kendi telefonunda, arada hesap tablosu olmadan.',
    heroCaption: 'Paylaşılan gerçek bir bütçedeki gerçek bir kategori — iki kişi, tek plan.',
    stepsTitle: 'Nasıl çalışır',
    stepsSubtitle: 'Üç adım, yaklaşık bir dakika.',
    steps: [
      {
        title: 'Davet kodu oluştur',
        body: 'Ortak bütçe ekranından 8 karakterli bir kod oluştur. Yalnızca bir kez kullanılır ve 7 gün sonra geçerliliğini yitirir.',
      },
      {
        title: 'Partnerine gönder',
        body: 'İstediğin gibi paylaş. Kodu bir şifre gibi sakla — kod kimin elindeyse bütçeye o katılabilir.',
      },
      {
        title: 'Tek bir bütçedesiniz',
        body: 'Partnerin kendi gelirini ekler, kategorileriniz tek bir planda birleşir ve iki telefon da saniyeler içinde senkronize kalır.',
      },
    ],
    seeTitle: 'İkinizin de gördüğü şeyler',
    seeSubtitle: 'Bir bütçeyi paylaşmak, ancak ikiniz de onu yönetebiliyorsanız işe yarar — bu yüzden ikiniz de aynı planı tam yetkiyle düzenlersiniz.',
    splitTitle: 'Kategoriyi aranızda paylaştırın',
    splitBody: 'Kiranın, market alışverişinin ya da başka her şeyin ne kadarını kimin üstlendiğine karar verin. Herkesin takip edeceği kendi payı olur ve kategori kartı ikinizin de nerede olduğunu gösterir.',
    attributionTitle: 'Her harcamada kimin girdiği görünür',
    attributionBody: 'Artık “Bu sen miydin?” yok. Her satırda onu ekleyen kişinin adı ve fotoğrafı iki telefonda da yer alır; böylece ayınız bir gizem gibi değil, ortak bir kayıt gibi okunur.',
    privacyTitle: 'Sende kalanlar',
    privacySubtitle: 'Bir bütçeyi paylaştığında yalnızca bütçe paylaşılır — başka hiçbir şey. Bunlar, herkesin kendi telefonunda özel kalır.',
    sharedLabel: 'Partnerinle paylaşılır',
    privateLabel: 'Sana özel kalır',
    sharedItems: [
      'Bütçedeki her harcama, notlarıyla birlikte',
      'O harcamalara eklenen fiş fotoğrafları',
      'Kategoriler, planlanan tutarlar ve aranızdaki paylaşım',
      'Her iki gelir ve evin toplamı',
      'Takma adın ve profil fotoğrafın',
    ],
    privateItems: [
      'Borçların ve ödeme planların',
      "Uygulama PIN'in ve biyometrik kilidin",
      'Raporların',
      'Yapay zekâ analiz geçmişin',
      'Ayarların, teman ve dilin',
      'E-posta adresin',
    ],
    popsCategory: [
      {
        title: 'Kendi payın, bir bakışta',
        body: 'Bu kategoride üstlendiğin tutarı ve ondan gerçekte ne kadar harcadığını gösterir.',
      },
      {
        title: 'Bir de partnerinin payı',
        body: 'Partnerin için de aynı kart — kimse diğerine ne durumda olduğunu sormak zorunda kalmaz.',
      },
      {
        title: 'Nasıl isterseniz paylaştırın',
        body: 'Kimin neyi üstlendiğini istediğiniz an değiştirin. Anlaşma sizin — uygulama yalnızca hesabı tutar.',
      },
      {
        title: 'Kimin girdiği belli',
        body: 'Her harcamada onu ekleyenin adı ve fotoğrafı görünür — iki telefonda birden.',
      },
    ],
    popsBudget: [
      {
        title: 'İki gelir, tek plan',
        body: 'Ay, ikinizin toplam gelirine göre planlanır — yalnızca seninkine göre değil.',
      },
      {
        title: 'Kim ne harcıyor',
        body: 'Kişi başına bir kart, yan yana — paylaşımı ikinci kez konuşmanıza gerek kalmaz.',
      },
      {
        title: 'İkiniz için tek halka',
        body: 'İkinizin de içinden harcadığı her kategori, ayın tek bir resminde.',
      },
    ],
    honestTitle: 'Birini davet etmeden önce',
    honestBody: 'Parayı paylaşan iki kişi, kullandıkları uygulamaya güvenebilmeli, o yüzden açık konuşalım: parayı paylaştığın kişi bütçedeki harcamaları, notları ve fişleri görecek; katılmak ise verilerini bu bütçeyle geri alınamaz biçimde birleştirir. Bir üyeyi yalnızca bütçe sahibi çıkarabilir; üye istediği zaman ayrılabilir.',
    honestCta: 'Nelerin paylaşıldığını oku',
    ctaTitle: 'Bir anlaşmaya varın',
    ctaSubtitle: "iOS ve Android'de ücretsiz. Partnerini de yanına al.",
  },
  cta: {
    title: 'Bu akşam bütçene başla',
    subtitle: "iOS ve Android'de ücretsiz. Bu akşam kur, maaş gününde kendine teşekkür et.",
  },
  footer: {
    tagline: 'Harcamalarını takip etmene, ayını planlamana ve hedeflerini gözden kaçırmamana yardımcı olan samimi bir günlük bütçe uygulaması.',
    product: 'Ürün',
    legal: 'Yasal',
    connect: 'İletişim',
    terms: 'Kullanım Koşulları',
    privacy: 'Gizlilik Politikası',
    madeWith: 'Sevgiyle',
  },
  meta: {
    title: 'Budget Your Budget — Akıllı ve kolay bütçe yönetimi',
    description: "Harcamalarını takip etmene, ayını planlamana ve hedeflerini gözden kaçırmamana yardımcı olan samimi bir günlük bütçe uygulaması. iOS ve Android'de kullanılabilir.",
  },
  legal: {
    docLanguage: 'Belge dili',
  },
  common: {
    backHome: 'Ana sayfaya dön',
    appStore: "App Store'dan indirin",
    googlePlay: "Google Play'den alın",
  },
};
