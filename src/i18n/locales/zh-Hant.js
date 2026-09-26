/*
 * Traditional Chinese (zh-Hant). Mirrors en.js key for key — see the note at
 * the top of that file: it is the source of truth for every CLAIM here, and a
 * translation that improves on a sentence by saying something new is a bug.
 *
 * TRADITIONAL, AND TAIWAN. Measured in lib/l10n/app_zh.arb: 1,791
 * Traditional-only characters and 0 Simplified, with Taiwan's vocabulary
 * throughout — 網路 (not 網絡), 資料 (not 數據), 預設 (not 默認), 程式 (not
 * 程序), 檔案 (not 文件), 螢幕 (not 屏幕). The mainland and Hong Kong forms are
 * all at zero uses, so any of them here is drift.
 *
 * Voice: 你, 415 uses against 0 for 您. The couple in a shared budget is 你們,
 * and the other person is 對方 or a descriptive phrase — 夥伴 and 伴侶 are both
 * zero, so nothing is invented for "partner".
 *
 * Terms come from the same ARB the embedded phone screens render, so a term
 * that disagrees with it visibly disagrees with the screenshot beside it:
 * 共享預算, 債務規劃, 報表, 洞察, 收據 (發票 means a tax invoice), 支出, 收入,
 * 類別, 雪球還款法, 使用條款, 隱私權政策, 定期, 匯入, BYB+. AI stays "AI" —
 * 人工智慧 and 人工智能 are both zero.
 *
 * THE MECHANICAL GATE IS A SPACE BETWEEN HAN AND LATIN, and check-locale.mjs
 * enforces it as a hard failure because the app is exception-free: Han+Latin
 * 112 with a space and 0 without, Latin+Han 50 and 0, Han+digit 63 and 0. So it
 * is 「只有你需要 BYB+」 and 「匯出成 PDF」, never 「需要BYB+」. Latin against
 * FULLWIDTH punctuation is exempt (22 adjacent, 0 spaced).
 *
 * The rest of the punctuation is fullwidth — ，。、： — with the ASCII comma at
 * zero uses in the app. Quotes are the corner brackets 「」 (curly: zero), used
 * to quote a UI label inside running text. A prose aside is the DOUBLED,
 * unspaced —— ; the single spaced — is the separator form, joining a label to
 * its data in the app (「上個月 — {label}」) and the two halves of a metaTitle
 * here, exactly as en.js and ko.js write it. So a lone — in a metaTitle is
 * correct; only asides inside running prose become ——.
 *
 * LAYOUT. Full CJK, and it differs from the Korean locale shipped just before
 * it: there is NO space between the halves of a split headline (wordSpace is
 * empty for zh and ja, while Korean is space-separated), and
 * `word-break: keep-all` must NEVER be applied here — it is right for Korean
 * and wrong for Chinese, which has no spaces to break at; measured, it produced
 * an unbroken line that overflowed its box. zh keeps `line-break: strict`
 * (kinsoku, measured keeping 。and ，off the start of a line) and
 * `text-wrap: balance`; `word-break: auto-phrase` is inherited from the shared
 * CJK rule and measured to be a NO-OP for Chinese. The font is Noto Sans TC,
 * not JP — both cover these codepoints, but JP draws Japanese glyph shapes.
 *
 * The hero column holds SIX Han glyphs: measured at the lg breakpoint it is
 * 445px at 72px and one glyph is exactly 72px, so seven never fit.
 *
 * The /terms and /privacypolicy documents are NOT translated into Chinese —
 * they exist in English and Spanish only, as prose in pages/Terms.jsx and
 * pages/PrivacyPolicy.jsx. A Chinese visitor gets the English document and the
 * EN/ES switch. Only this file's `legal` block is site chrome.
 */
export default {
  nav: {
    features: '功能',
    shared: '共享預算',
    faq: '常見問題',
    language: '語言',
    soon: '即將推出',
    getApp: '下載 App',
    menu: '選單',
    theme: '切換深色模式',
  },
  hero: {
    badge: 'iOS 與 Android 都能免費使用',
    titleA: '你的每一塊錢',
    titleB: '由你',
    titleAccent: '掌控',
    subtitle: '規劃這個月、記錄支出，每個類別都能一眼看清。Budget Your Budget 簡單到你真的會一直持續下去。',
    rating: '4.8',
    statRating: 'App Store 評分',
    statPrivate: '離線也能用',
    statFree: '免費開始使用',
    caption: '這是真正的 App——這些畫面都在運作，不是圖片。',
  },
  features: {
    eyebrow: '你需要的一切',
    title: '依照你真正規劃預算的方式打造',
    subtitle: '不用登入銀行帳號、不用試算表、也不會說教。輸入你賺多少錢、規劃錢要去哪，算數學的事交給 App。',
    items: [
      {
        title: '依類別規劃',
        body: '幫每個類別填上這個月的金額，花錢時就看著圓環一點一點變少。超支在發薪日之前就看得出來，不是等發薪日過了才發現。',
      },
      {
        title: '幾秒記一筆',
        body: '新增一筆支出，只要點一下再輸入金額。表情符號和顏色讓類別一眼就看得懂。',
      },
      {
        title: '掃描你的收據',
        body: '拍下收據，金額、商家和日期就會自動填入。儲存前先確認數字——讀取的是 AI，確認的是你。',
      },
      {
        title: '和對方共享',
        body: '一份預算，兩支手機。每筆支出都會顯示是誰記錄的，你們兩個人都看得到總額。',
      },
      {
        title: '把債務還清',
        body: '列出你欠的每一筆債務，債務規劃就會用雪球還款法排出還款順序，每還清一筆就把那筆還款加到下一筆。',
      },
      {
        title: '看出消費習慣',
        body: '報表會逐月比較，找出你支出最多的類別，也讓你看到錢悄悄流向哪裡。',
      },
      {
        title: '調成你的樣子',
        body: '十五種主題顏色，淺色與深色，還有自訂類別，名稱和表情符號都自己決定。',
      },
      {
        title: '資料只屬於你',
        body: '不用帳號，完全離線也能用。只有想要雲端備份或共享預算時才需要登入。',
      },
    ],
  },
  showcase: {
    plan: {
      eyebrow: '預算規劃',
      title: '花出去之前，就知道錢要去哪裡',
      body: '月初先為每個類別規劃一筆金額。你一花錢，花瓣就跟著填滿。哪個類別快要超支，立刻就看得出來——點一下，就能看到你在裡面花掉的每一筆。',
      bullets: [
        '每個類別一片花瓣，大小看它佔計畫的多少',
        '類別快要超支時，顏色就會改變',
        '點一下任何類別，查看完整紀錄',
      ],
    },
    track: {
      eyebrow: '記帳',
      title: '每一筆支出，一份清單',
      body: '搜尋、依類別篩選，整個月一眼看完。以後可能需要證明的支出，都可以附上一張收據照片。',
      bullets: [
        '依類別篩選，或用名稱搜尋',
        '定期支出會自動記錄',
        '任何一筆支出都能附上收據照片',
      ],
    },
    shared: {
      eyebrow: '共享預算 · 新功能',
      title: '一份預算，兩支手機',
      body: '把邀請碼傳給和你共用金錢的人，你們就能一起管同一份預算。兩個人都可以新增和編輯，每筆支出都會顯示是誰記錄的，計畫也會把兩人的收入一起算進去。',
      bullets: [
        '支出會在數秒內出現在對方手機上',
        '每一筆都會顯示記錄者',
        '兩人的收入會一起算進同一份計畫',
        '你的債務、PIN 與設定永遠不會共享',
      ],
      note: '共享預算的意思是，和你共用金錢的人會看到裡面的支出、備註和收據。在邀請別人之前，請先讀過使用條款。',
      noteLink: '哪些內容會共享 →',
      cta: '了解共享預算',
    },
    scan: {
      eyebrow: 'AI 收據掃描',
      title: '把鏡頭對準收據',
      body: '金額、商家和日期會自動填好，App 也會建議一個類別。你檢查一下再儲存——這是幫你開個頭，不是要你盲目相信。',
      bullets: [
        '自動讀取金額、商家、日期與明細',
        '會從你自己的類別裡建議一個',
        '儲存前，每個欄位都由你確認',
      ],
      note: '掃描收據會把照片傳送給 Google 處理。詳細說明請見隱私權政策。',
    },
    insights: {
      eyebrow: '洞察',
      title: '這個月，幫你看懂',
      body: '你最大的幾個類別、最常出現的支出，還有花最多錢的那幾天——全都替你整理好，一張圖表也不用你自己做。',
      bullets: [
        '最大的類別和最大的單筆支出',
        '你最常買的東西',
        '每日平均，以及連續消費的天數',
      ],
    },
    reports: {
      eyebrow: '報表',
      title: '任選兩個月來比較',
      body: '把上個月和這個月並排，一個類別一個類別地比，就能清楚看出哪裡變了。需要留一份紀錄時，可以匯出成 PDF 或 Excel。',
      bullets: [
        '依類別逐月比較',
        '收入與支出隨時間的變化',
        '匯出成 PDF 或 Excel',
      ],
    },
    themes: {
      eyebrow: '個人化',
      title: '十五種主題，淺色與深色',
      body: '選一個讓你想打開 App 的顏色。整個介面——圓環、圖表、按鈕——都會跟著你選的主題改變。',
      bullets: [
        '15 種主題配色',
        '完整支援淺色與深色模式',
        '用你自己的表情符號建立自訂類別',
      ],
    },
  },
  howItWorks: {
    eyebrow: '運作方式',
    titleA: '開始規劃預算，只要',
    titleAccent: '三個簡單步驟',
    subtitle: '不用打電話設定、不用連結銀行、不用匯入試算表。今晚就能開始記帳。',
    steps: [
      {
        title: '設定你的收入',
        body: '填入你稅後的實領收入，App 就會清楚告訴你有多少錢可以分配。',
      },
      {
        title: '規劃你的類別',
        body: '給每個類別取個名稱、選個表情符號，再填上每月金額。把每個月固定的類別設成定期。',
      },
      {
        title: '追蹤與調整',
        body: '記一筆支出只要幾秒，看著每個類別被填滿。生活一有變化，就跟著調整計畫。',
      },
    ],
  },
  privacy: {
    eyebrow: '隱私',
    title: '你的資料，永遠是你的',
    subtitle: 'Budget Your Budget 預設把你的財務資料留在你的裝置上，完全離線也能用。雲端同步和共享，你想用的時候隨時都在——絕不會背著你開啟。',
    points: [
      {
        title: '裝置優先',
        body: '你的預算存在裝置裡，完全離線也能用。不需要帳號——只要你一直不登入，財務資料就絕不會離開你的手機。',
      },
      {
        title: '雲端同步由你決定',
        body: '只有在你想把預算備份到每台裝置，或想和你共用金錢的人共享時，才需要登入。你的帳號和雲端上的所有資料，都可以在 App 裡直接刪除。',
      },
      {
        title: '沒有廣告，不賣你的資料',
        body: '我們不顯示廣告，不使用任何廣告 SDK，絕不賣你的資訊，也不會在其他 App 裡追蹤你。你的資料隨時都能匯出。',
      },
      {
        title: '我們絕不碰你的銀行',
        body: '這個 App 不會連結任何銀行或卡片。我們絕不會問你的銀行登入資料，也動不了你的錢。',
      },
    ],
    cta: '閱讀隱私權政策',
  },
  faq: {
    eyebrow: 'FAQ',
    title: '常見問題',
    items: [
      {
        q: '我的資料真的私密嗎？',
        a: '你的預算儲存在你的裝置上，只要你不登入，就一直留在那裡——我們什麼也收不到。要不要登入由你決定，只有登入之後，你的資料才能備份到雲端，或是和你邀請的人共享。我們絕不賣你的資料、絕不顯示廣告，也絕不連結你的銀行帳戶。完整說明都在我們的隱私權政策裡。',
      },
      {
        q: '我需要帳號嗎？',
        a: '不用。沒有帳號也能完整使用這個 App。只有雲端同步、共享預算，以及編輯你的暱稱和照片，才需要帳號。',
      },
      {
        q: '在共享預算裡，對方看得到什麼？',
        a: '共享預算是給兩個人用的。你們兩個人都能編輯同一份預算，權限完全一樣：裡面每一筆支出，還有類別和計畫，你們都看得到、也都能修改——包含備註和任何一張收據照片。你們都看得到彼此的收入金額和兩人的收入加總，但你的收入只有你能編輯。每筆支出都會顯示是誰記錄的。你的債務、PIN、設定和報表都不會共享。加入會把你的資料合併到那份預算，而且無法復原，所以在接受邀請之前，請先讀過使用條款。',
      },
      {
        q: '離線也能用嗎？',
        a: '可以。這個 App 完全在你的裝置上運作，就算一點網路都沒有，你也能照樣追蹤你的預算。只有這些可選擇的額外功能才需要網路連線：雲端同步、共享預算、收據掃描和 AI 洞察。',
      },
      {
        q: '收據掃描有多準確？',
        a: '印出來的收據大多都能讀得很準，但這畢竟是 AI，還是會出錯。掃描出來的總金額、商家和日期會先幫你填好，讓你在儲存前檢查——請務必再拿收據本身比對一次。',
      },
      {
        q: '我可以匯出我的資料嗎？',
        a: '可以。你能把報表匯出成 PDF 或 Excel，而「備份與匯入」會把你全部的資料存成一份你自己保管的檔案，所以你的資料絕不會被鎖在這個 App 裡。',
      },
      {
        q: '雪球還款法是什麼功能？',
        a: '雪球還款法會先還清餘額最小的那一筆債務。每還清一筆，就把那筆還款加到下一筆，投入債務的金額也越滾越大。債務規劃會幫你排出還款順序，並追蹤還清進度。',
      },
    ],
  },
  sharedPage: {
    metaTitle: '共享預算 — Budget Your Budget',
    eyebrow: '共享預算',
    title: '一份預算，兩支手機',
    subtitle: '兩個人開始共用金錢的那一刻，大多數的預算方式就撐不住了。共享預算讓你和共同管理金錢的人共用同一份計畫，各自用自己的手機，中間不需要試算表。',
    heroCaption: '這是真實共享預算裡的真實類別——兩個人，一份計畫。',
    stepsTitle: '運作方式',
    stepsSubtitle: '三個步驟，大約一分鐘。',
    steps: [
      {
        title: '建立邀請碼',
        body: '從「共享預算」畫面建立一組 8 個字元的邀請碼。只能使用一次，7 天後失效。',
      },
      {
        title: '把邀請碼傳給對方',
        body: '你想用什麼方式傳都可以。把它當成密碼看待——任何拿到邀請碼的人都能加入。',
      },
      {
        title: '你們在同一份預算裡',
        body: '對方填入自己的收入，你們的類別會合併為一份計畫，兩支手機也會在數秒內同步。',
      },
    ],
    seeTitle: '你們兩人都看得到什麼',
    seeSubtitle: '共享一份預算，要你們兩個人都能照著做才有用，所以同一份計畫，你們都有完整的編輯權限。',
    splitTitle: '和對方分擔同一個類別',
    splitBody: '房租、生鮮雜貨或其他任何一項，都由你們決定誰負責多少。每個人都有自己的分擔額可以追蹤，類別卡片上也會同時顯示你們兩個人的進度。',
    attributionTitle: '每筆支出都會顯示是誰記錄的',
    attributionBody: '再也不用問「那筆是你花的嗎？」了。每一筆都會顯示新增者的名字和照片，兩支手機上都看得到，這個月的支出讀起來就像你們共同的紀錄，而不是一團謎。',
    privacyTitle: '哪些仍然只屬於你',
    privacySubtitle: '共享一份預算，共享的就只有那份預算——其他都不會。以下這些仍然是各自的私人資料，留在自己的手機上。',
    sharedLabel: '會與對方共享',
    privateLabel: '只有你看得到',
    sharedItems: [
      '預算裡的每筆支出和備註',
      '附在那些支出上的收據照片',
      '類別、預算金額和分配',
      '你們兩人的收入和總額',
      '你的暱稱和照片',
    ],
    privateItems: [
      '你的債務和還款計畫',
      '你的 App PIN 和生物辨識鎖定',
      '你的報表',
      '你的 AI 洞察紀錄',
      '你的設定、主題和語言',
      '你的電子郵件地址',
    ],
    popsCategory: [
      {
        title: '一眼看到你的分擔額',
        body: '你們說好在這個類別由你負責的金額，以及你實際花掉的金額。',
      },
      {
        title: '還有對方的分擔額',
        body: '對方也有一張同樣的卡片，不用開口問也知道彼此的情況。',
      },
      {
        title: '怎麼分配都可以',
        body: '誰負責哪一部分，隨時都能改。說好的是你們——App 只負責算清楚。',
      },
      {
        title: '這筆是誰記的',
        body: '每筆支出都會顯示記錄者的名字和照片，兩支手機上都看得到。',
      },
    ],
    popsBudget: [
      {
        title: '兩份收入，一份計畫',
        body: '這個月是照你們兩人的收入總額規劃的，不只是你的那一份。',
      },
      {
        title: '誰花了多少',
        body: '一人一張卡片並排放著，分配的事不用再講第二次。',
      },
      {
        title: '你們共用同一個圓環圖',
        body: '你們兩人都會花到的每個類別，都在這個月的同一張圖裡。',
      },
    ],
    honestTitle: '邀請別人之前',
    honestBody: '兩個人一起管錢，要能信得過手上的工具，所以把話說清楚：對方會看到這份預算裡的支出、備註和收據，而且加入之後你的資料會合併進去，無法復原。只有預算擁有者可以把成員移除，成員自己則隨時都能離開。',
    honestCta: '看看會共享哪些內容',
    ctaTitle: '一起用同一份預算',
    ctaSubtitle: 'iOS 和 Android 上都免費。邀請和你共用金錢的人一起加入。',
  },
  cta: {
    title: '今晚就開始規劃預算',
    subtitle: 'iOS 和 Android 都能免費使用。今晚把預算設定好，發薪日你就會感謝自己。',
  },
  footer: {
    tagline: '一款貼心的日常預算 App，幫你記錄花費、規劃每月支出，並守住自己的目標。',
    product: '產品',
    legal: '法律資訊',
    connect: '聯絡我們',
    terms: '使用條款',
    privacy: '隱私權政策',
    madeWith: '用心打造',
  },
  meta: {
    title: 'Budget Your Budget — 聰明規劃預算，簡單上手',
    description: '一款貼心的日常預算 App，幫你記錄花費、規劃每月支出，並守住自己的目標。iOS 和 Android 都能使用。',
  },
  legal: {
    docLanguage: '內容語言',
  },
  common: {
    backHome: '返回首頁',
    appStore: '從 App Store 下載',
    googlePlay: '立即前往 Google Play 下載',
  },
};
