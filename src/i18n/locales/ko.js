/*
 * Korean (ko). Mirrors en.js key for key — see the note at the top of that
 * file: it is the source of truth for every CLAIM here, and a translation that
 * improves on a sentence by saying something new is a bug.
 *
 * Voice: 해요체 throughout, which is what the app speaks — 981 해요체 endings
 * against 34 합니다체. Never 합니다체, never 반말, and never 당신: the app uses
 * it zero times and Korean drops the pronoun the English needs.
 *
 * Terms come from lib/l10n/app_ko.arb, which is byte-identical to the ARB the
 * embedded phone screens on this page render, so a term that disagrees with it
 * visibly disagrees with the screenshot beside it: 공유 예산, 부채 플래너,
 * 리포트 (never 보고서, which the app uses zero times), 인사이트 (never 분석),
 * 영수증, 지출, 수입, 스노우볼 방식, 이용약관, 개인정보 처리방침, BYB+. AI stays
 * "AI" — 인공지능 appears nowhere in the app.
 *
 * Korean has no grammatical gender, so like Turkish and unlike German this file
 * does not recast around the other person; the app's own habit is descriptive
 * anyway («돈을 함께 관리하는 사람», «상대방»).
 *
 * THE PARTICLE AFTER A LATIN WORD is this locale's mechanical gate, and
 * check-locale.mjs enforces it. Korean chooses 은/는, 이/가, 을/를, 와/과 and
 * 로/으로 by whether the preceding syllable ends in a consonant — and for a
 * Latin token that is decided by its KOREAN PRONUNCIATION, not its spelling:
 * iOS is 아이오에스 and ends in a vowel, Excel is 엑셀 and ends in ㄹ, PIN is 핀
 * and ends in ㄴ. Note Google (구글) takes the ㄹ set while Google Play
 * (구글 플레이) does not. Getting one wrong is a hard error that reads as
 * fluent nonsense, which is exactly why it is linted rather than reviewed.
 *
 * LAYOUT. Korean is CJK for casing — Eyebrow skips `uppercase` — but NOT for
 * spacing: Korean puts spaces between words, so it keeps the separator in a
 * split headline (the context used to strip it for every CJK language, which
 * was a Japanese rule) and it needs `word-break: keep-all`, or a line breaks
 * mid-word. The hero column holds SIX Hangul syllables: measured at the lg
 * breakpoint it is 445px at 72px and one syllable is 66px, so seven never fit.
 *
 * The /terms and /privacypolicy documents are NOT translated into Korean —
 * they exist in English and Spanish only, as prose in pages/Terms.jsx and
 * pages/PrivacyPolicy.jsx. A Korean visitor gets the English document and the
 * EN/ES switch. Only this file's `legal` block is site chrome.
 */
export default {
  nav: {
    features: '기능',
    shared: '공유 예산',
    faq: '자주 묻는 질문',
    language: '언어',
    soon: '준비 중',
    getApp: '앱 다운로드',
    menu: '메뉴',
    theme: '다크 모드 전환',
  },
  hero: {
    badge: 'iOS·Android에서 무료',
    titleA: '돈 관리는 이제',
    titleB: '내',
    titleAccent: '손안에',
    subtitle: '한 달 계획을 세우고, 쓴 돈을 기록하고, 모든 카테고리를 한눈에 확인하세요. Budget Your Budget은 정말 꾸준히 할 수 있을 만큼 단순해요.',
    rating: '4.8',
    statRating: 'App Store 평점',
    statPrivate: '오프라인 지원',
    statFree: '무료로 시작하기',
    caption: '진짜 앱이에요 — 이 화면은 사진이 아니라 실제로 작동해요.',
  },
  features: {
    eyebrow: '필요한 모든 것',
    title: '실제로 예산을 세우는 방식에 맞췄어요',
    subtitle: '은행 로그인도, 스프레드시트도, 잔소리도 없어요. 버는 금액을 입력하고 돈이 어디로 갈지 정하면, 계산은 앱이 해요.',
    items: [
      {
        title: '카테고리별로 계획',
        body: '카테고리마다 이번 달 금액을 정해 두면, 쓸수록 링이 줄어들어요. 초과 지출은 월급날 이후가 아니라 그전에 분명히 보여요.',
      },
      {
        title: '몇 초 만에 기록',
        body: '지출 추가는 한 번 누르고 금액만 넣으면 끝이에요. 이모지와 색상으로 카테고리가 한눈에 읽혀요.',
      },
      {
        title: '영수증 스캔',
        body: '영수증을 찍으면 금액, 가맹점, 날짜가 자동으로 채워져요. 저장하기 전에 숫자를 확인해 주세요 — AI가 읽고, 확인은 직접 해요.',
      },
      {
        title: '함께 쓰는 사람과 공유',
        body: '하나의 예산, 두 사람의 휴대폰. 지출마다 기록한 사람이 표시되고, 두 사람의 지출 합계는 둘 다 볼 수 있어요.',
      },
      {
        title: '부채 다 갚기',
        body: '갚아야 할 금액을 등록하면 부채 플래너가 스노우볼 방식으로 상환 순서를 정해요. 하나를 다 갚을 때마다 그 금액이 다음 부채로 넘어가요.',
      },
      {
        title: '돈의 흐름 보기',
        body: '리포트가 달마다 비교하고, 지출이 큰 카테고리를 보여주고, 돈이 조용히 어디로 가는지 알려줘요.',
      },
      {
        title: '내 취향대로',
        body: '테마 색상 15가지에 라이트와 다크, 이름과 이모지를 직접 정하는 맞춤 카테고리까지 있어요.',
      },
      {
        title: '내 데이터는 비공개',
        body: '계정 없이 완전히 오프라인에서도 작동해요. 클라우드 백업이나 공유 예산을 쓰고 싶을 때만 로그인하면 돼요.',
      },
    ],
  },
  showcase: {
    plan: {
      eyebrow: '예산 계획',
      title: '돈이 나가기 전에 어디로 갈지 알 수 있어요',
      body: '매달 초에 카테고리마다 계획 금액을 정해요. 지출이 쌓이면 링이 채워져서 아슬아슬한 카테고리가 바로 눈에 들어와요 — 카테고리를 누르면 그 안에서 쓴 내역이 모두 열려요.',
      bullets: [
        '카테고리마다 꽃잎 하나, 크기는 계획의 비중만큼',
        '한도에 가까워지면 카테고리 색이 바뀌어요',
        '카테고리를 누르면 전체 내역이 보여요',
      ],
    },
    track: {
      eyebrow: '지출 기록',
      title: '모든 지출, 하나의 목록',
      body: '검색하고, 카테고리로 걸러내고, 한 달을 한눈에 훑어봐요. 나중에 증빙이 필요할 것 같은 지출에는 영수증 사진을 첨부해 두세요.',
      bullets: [
        '카테고리로 걸러내거나 이름으로 검색해요',
        '정기 지출은 자동으로 기록돼요',
        '어떤 지출에든 영수증 사진을 첨부할 수 있어요',
      ],
    },
    shared: {
      eyebrow: '공유 예산 · 신규',
      title: '하나의 예산, 휴대폰 두 대',
      body: '돈을 함께 관리하는 사람을 코드로 초대하면 하나의 예산이 돼요. 두 사람 모두 추가하고 수정할 수 있고, 모든 지출에 누가 기록했는지 표시되고, 계획은 두 사람의 수입 합계를 기준으로 세워져요.',
      bullets: [
        '지출이 몇 초 안에 상대방 기기에 나타나요',
        '모든 항목에 기록한 사람이 표시돼요',
        '두 사람의 수입이 하나의 계획으로 합쳐져요',
        '부채와 PIN, 설정은 절대 공유되지 않아요',
      ],
      note: '예산을 공유하면 그 안의 지출과 메모, 영수증이 상대방에게 보여요. 누군가를 초대하기 전에 이용약관을 읽어 보세요.',
      noteLink: '공유되는 내용 →',
      cta: '공유 예산 살펴보기',
    },
    scan: {
      eyebrow: 'AI 영수증 스캔',
      title: '영수증에 카메라를 비춰 보세요',
      body: '금액, 가맹점, 날짜가 저절로 채워지고 카테고리까지 추천해줘요. 확인하고 저장하면 끝이에요 — 먼저 채워주는 것일 뿐, 확인 없이 그대로 믿어도 되는 건 아니에요.',
      bullets: [
        '금액, 가맹점, 날짜, 품목까지 자동으로 읽어요',
        '내 카테고리 중에서 하나를 추천해요',
        '저장하기 전에 모든 항목을 내가 직접 확인해요',
      ],
      note: '영수증을 스캔하면 처리를 위해 사진이 Google로 전송돼요. 자세한 내용은 개인정보 처리방침에서 확인할 수 있어요.',
    },
    insights: {
      eyebrow: '인사이트',
      title: '이번 달을 풀어드려요',
      body: '지출이 가장 큰 카테고리, 가장 자주 생기는 지출, 가장 많이 쓴 날 — 차트를 하나도 만들지 않아도 전부 정리되어 있어요.',
      bullets: [
        '가장 큰 카테고리와 가장 큰 지출 한 건',
        '가장 자주 사는 것',
        '일평균과 지출이 이어진 일수',
      ],
    },
    reports: {
      eyebrow: '리포트',
      title: '원하는 두 달을 비교해 보세요',
      body: '지난달과 이번 달을 카테고리별로 나란히 놓고, 무엇이 달라졌는지 정확히 볼 수 있어요. 기록으로 남겨야 할 때는 PDF나 Excel로 내보내세요.',
      bullets: [
        '카테고리별 월 단위 비교',
        '시간에 따른 수입·지출 추이',
        'PDF나 Excel로 내보내기',
      ],
    },
    themes: {
      eyebrow: '개인 설정',
      title: '열다섯 가지 테마, 라이트와 다크',
      body: '앱을 열고 싶어지는 색을 골라 보세요. 링도 차트도 버튼도, 화면 전체가 내가 고른 테마를 따라가요.',
      bullets: [
        '테마 색상 15가지',
        '라이트·다크 모드 모두 지원',
        '내 이모지로 만드는 맞춤 카테고리',
      ],
    },
  },
  howItWorks: {
    eyebrow: '이렇게 작동해요',
    titleA: '예산 세우기는',
    titleAccent: '간단한 3단계',
    subtitle: '설정 상담 전화도, 은행 연결도, 가져올 스프레드시트도 필요 없어요. 오늘 밤부터 지출을 기록할 수 있어요.',
    steps: [
      {
        title: '수입 입력하기',
        body: '세후 실수령 수입을 입력하면 배정할 금액이 얼마인지 정확하게 보여줘요.',
      },
      {
        title: '카테고리 계획하기',
        body: '카테고리마다 이름과 이모지, 월 금액을 정하세요. 매달 반복되는 항목은 정기 카테고리로 만들면 자동으로 추가돼요.',
      },
      {
        title: '기록하고 조정하기',
        body: '지출을 몇 초 만에 기록하고, 카테고리가 채워지는 걸 지켜보세요. 생활이 바뀔 때마다 계획도 바꾸면 돼요.',
      },
    ],
  },
  privacy: {
    eyebrow: '프라이버시',
    title: '내 데이터는 내 것이에요',
    subtitle: 'Budget Your Budget은 기본적으로 내 금융 정보를 기기 안에만 저장하고, 완전히 오프라인에서도 작동해요. 클라우드 동기화와 공유는 원할 때 쓰는 기능이에요 — 모르는 사이에 켜지는 일은 없어요.',
    points: [
      {
        title: '기기에 먼저 저장해요',
        body: '예산은 내 기기에 저장되고, 앱은 완전히 오프라인에서도 작동해요. 계정은 필요 없어요 — 한 번도 로그인하지 않으면 금융 정보가 휴대폰을 벗어나지 않아요.',
      },
      {
        title: '클라우드 동기화는 선택이에요',
        body: '예산을 여러 기기에 백업하거나 함께 쓰는 사람과 공유하고 싶을 때만 로그인하세요. 계정도, 클라우드에 저장된 모든 데이터도 앱 안에서 삭제할 수 있어요.',
      },
      {
        title: '광고도 없고, 데이터도 팔지 않아요',
        body: '광고를 보여주지 않고, 광고 SDK도 쓰지 않아요. 내 정보를 팔지도, 다른 앱에서까지 추적하지도 않아요. 데이터는 언제든 내보낼 수 있어요.',
      },
      {
        title: '은행은 건드리지 않아요',
        body: '앱은 어떤 은행이나 카드에도 연결하지 않아요. 은행 로그인 정보를 묻지 않고, 돈을 움직일 수도 없어요.',
      },
    ],
    cta: '개인정보 처리방침 읽기',
  },
  faq: {
    eyebrow: 'FAQ',
    title: '자주 묻는 질문',
    items: [
      {
        q: '내 데이터는 정말 비공개인가요?',
        a: '예산은 내 기기에 저장되고, 로그인하지 않으면 계속 기기에만 남아 있어요 — 저희에게는 아무것도 전달되지 않아요. 로그인은 선택이고, 로그인했을 때만 데이터를 클라우드에 백업하거나 내가 초대한 사람과 공유할 수 있어요. 데이터를 파는 일도, 광고를 띄우는 일도, 은행에 연결하는 일도 절대 없어요. 자세한 내용은 개인정보 처리방침에 있어요.',
      },
      {
        q: '계정이 필요한가요?',
        a: '아니요. 계정이 없어도 앱을 완전히 쓸 수 있어요. 계정이 필요한 건 클라우드 동기화, 공유 예산, 그리고 닉네임과 프로필 사진 수정뿐이에요.',
      },
      {
        q: '공유 예산에서 상대방에게는 무엇이 보이나요?',
        a: '공유 예산은 두 사람이 쓰는 기능이에요. 하나의 예산을 두 사람이 같은 권한으로 편집해요. 예산 안의 모든 지출을 두 사람 모두 보고 바꿀 수 있어요 — 메모와 영수증 사진까지요. 카테고리와 계획도 마찬가지예요. 서로의 수입 금액과 합계도 볼 수 있지만, 내 수입은 나만 수정할 수 있어요. 모든 지출에는 기록한 사람이 표시돼요. 부채와 PIN, 설정, 리포트는 절대 공유되지 않아요. 참여하면 내 데이터가 그 예산에 합쳐져요. 되돌릴 수 없으니 초대를 받아들이기 전에 이용약관을 읽어 주세요.',
      },
      {
        q: '오프라인에서도 작동하나요?',
        a: '네. 앱 전체가 기기 안에서 돌아가니까 인터넷 연결이 전혀 없어도 예산을 관리할 수 있어요. 인터넷 연결은 선택 기능에만 필요해요: 클라우드 동기화, 예산 공유, 영수증 스캔, AI 인사이트.',
      },
      {
        q: '영수증 스캔은 얼마나 정확한가요?',
        a: '인쇄된 영수증을 대부분 잘 읽지만, AI라서 틀리기도 해요. 스캔한 금액과 가맹점, 날짜는 저장하기 전에 확인할 수 있도록 미리 채워 드려요 — 항상 실제 영수증과 비교해 주세요.',
      },
      {
        q: '데이터를 내보낼 수 있나요?',
        a: '네. 리포트는 PDF나 Excel로 내보낼 수 있고, 백업 및 가져오기로 전체 데이터를 내가 보관하는 파일에 저장할 수 있어요. 데이터가 앱에 갇히는 일은 없어요.',
      },
      {
        q: '스노우볼 방식은 어떤 기능인가요?',
        a: '스노우볼 방식은 잔액이 가장 적은 부채부터 갚는 방법이에요. 하나를 다 갚으면 그 상환액을 다음 부채로 넘겨서, 부채에 들어가는 금액이 계속 커져요. 부채 플래너가 부채 순서를 정리하고 상환 진행 상황을 추적해요.',
      },
    ],
  },
  sharedPage: {
    metaTitle: '공유 예산 — Budget Your Budget',
    eyebrow: '공유 예산',
    title: '예산은 하나. 휴대폰은 둘.',
    subtitle: '두 사람이 돈을 함께 쓰기 시작하는 순간, 대부분의 예산 관리는 무너져요. 공유 예산이 있으면 돈을 함께 관리하는 사람과 같은 계획을 각자의 휴대폰에서 세울 수 있어요. 중간에 스프레드시트는 필요 없어요.',
    heroCaption: '실제 공유 예산에 있는 실제 카테고리예요 — 두 사람, 하나의 계획.',
    stepsTitle: '이렇게 사용해요',
    stepsSubtitle: '세 단계, 1분쯤이면 돼요.',
    steps: [
      {
        title: '초대 코드 만들기',
        body: '공유 예산 화면에서 여덟 자리 코드를 만들어 보세요. 한 번만 쓸 수 있고, 7일 후에 만료돼요.',
      },
      {
        title: '파트너에게 보내기',
        body: '보내는 방법은 자유예요. 비밀번호처럼 다뤄 주세요 — 코드를 가진 사람은 누구나 참여할 수 있어요.',
      },
      {
        title: '하나의 예산이 돼요',
        body: '상대방이 자기 수입을 입력하면 카테고리가 하나의 계획으로 합쳐지고, 두 사람의 휴대폰이 몇 초 안에 같은 상태가 돼요.',
      },
    ],
    seeTitle: '두 사람에게 보이는 것',
    seeSubtitle: '예산 공유는 두 사람이 모두 움직일 수 있어야 의미가 있어요. 그래서 같은 계획을 함께 편집할 수 있어요.',
    splitTitle: '카테고리를 두 사람이 나누기',
    splitBody: '월세, 식료품, 그 밖에 무엇이든 누가 얼마를 맡을지 정해요. 각자 지켜볼 몫이 생기고, 카테고리 카드에는 두 사람이 각자의 몫에 비해 얼마나 썼는지 나란히 보여요.',
    attributionTitle: '지출마다 누가 기록했는지 보여요',
    attributionBody: '누가 썼는지 서로 물어볼 일이 없어요. 지출마다 기록한 사람의 이름과 사진이 두 사람의 휴대폰에 보여요. 그래서 이번 달 지출이 수수께끼가 아니라 두 사람이 함께 남긴 기록처럼 읽혀요.',
    privacyTitle: '나만 보는 건 그대로',
    privacySubtitle: '예산을 공유하면 공유되는 건 예산뿐이에요 — 그 밖의 것은 그대로예요. 아래 항목은 각자의 휴대폰에 비공개로 남아요.',
    sharedLabel: '함께 쓰는 사람과 공유돼요',
    privateLabel: '나만 볼 수 있어요',
    sharedItems: [
      '예산 안의 모든 지출과 메모',
      '그 지출에 첨부한 영수증 사진',
      '카테고리와 계획 금액, 나누기',
      '각자의 수입과 총 수입',
      '닉네임과 프로필 사진',
    ],
    privateItems: [
      '부채와 상환 계획',
      '앱 PIN과 생체 인증 잠금',
      '리포트',
      'AI 조언 기록',
      '설정과 테마, 언어',
      '이메일 주소',
    ],
    popsCategory: [
      {
        title: '내 몫을 한눈에',
        body: '이 카테고리에서 내가 맡기로 한 금액과 실제로 쓴 금액이에요.',
      },
      {
        title: '파트너의 몫도',
        body: '파트너에게도 같은 카드가 있어요. 서로 어떤지 물어볼 필요가 없어요.',
      },
      {
        title: '나누기는 원하는 대로',
        body: '누가 무엇을 맡을지 언제든 바꿀 수 있어요. 정하는 건 두 사람이고, 앱은 계산만 해요.',
      },
      {
        title: '누가 기록했는지',
        body: '지출마다 기록한 사람의 이름과 사진이 함께 남고, 두 사람의 휴대폰에 똑같이 보여요.',
      },
    ],
    popsBudget: [
      {
        title: '두 사람의 수입, 하나의 계획',
        body: '한 달 계획의 기준은 내 수입이 아니라 두 사람의 총 수입이에요.',
      },
      {
        title: '누가 무엇에 쓰나요',
        body: '각자 카드가 하나씩 나란히 있어서 나누기 이야기를 두 번 할 필요가 없어요.',
      },
      {
        title: '두 사람을 위한 링 하나',
        body: '두 사람이 함께 쓰는 모든 카테고리를 이번 달 그림 한 장에 담아요.',
      },
    ],
    honestTitle: '누군가를 초대하기 전에',
    honestBody: '돈을 함께 관리하는 두 사람은 같이 쓰는 앱을 믿을 수 있어야 해요. 그래서 솔직하게 알려드릴게요. 파트너에게는 예산 안의 지출과 메모, 영수증이 모두 보여요. 그리고 참여하면 내 데이터가 그 예산에 합쳐지는데, 이건 되돌릴 수 없어요. 멤버를 내보낼 수 있는 사람은 예산 소유자뿐이고, 멤버는 언제든 스스로 나갈 수 있어요.',
    honestCta: '공유되는 내용 읽어 보기',
    ctaTitle: '두 사람이 하나의 계획으로',
    ctaSubtitle: 'iOS와 Android에서 무료예요. 함께 쓰는 사람도 초대해 보세요.',
  },
  cta: {
    title: '오늘 밤부터 예산을 세워 보세요',
    subtitle: 'iOS와 Android에서 무료예요. 오늘 밤 설정해 두면 월급날에 스스로에게 고마워할 거예요.',
  },
  footer: {
    tagline: '매일의 예산 관리를 위한 다정한 앱이에요. 지출을 기록하고, 매달 나갈 돈을 계획하고, 목표를 놓치지 않도록 도와드려요.',
    product: '제품',
    legal: '법적 고지',
    connect: '문의',
    terms: '이용약관',
    privacy: '개인정보 처리방침',
    madeWith: '마음을 담아',
  },
  meta: {
    title: 'Budget Your Budget — 똑똑한 예산 관리를 간단하게',
    description: '매일의 예산 관리를 위한 다정한 앱이에요. 지출을 기록하고, 매달 나갈 돈을 계획하고, 목표를 놓치지 않도록 도와드려요. iOS와 Android에서 사용할 수 있어요.',
  },
  legal: {
    docLanguage: '문서 언어',
  },
  common: {
    backHome: '홈으로 돌아가기',
    appStore: 'App Store에서 다운로드하기',
    googlePlay: 'Google Play에서 다운로드하기',
  },
};
