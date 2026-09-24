/*
 * English site copy. Every claim here is checked against the shipping app —
 * what a Shared Budget exposes, what syncs and what stays on the device are
 * all taken from source, not from marketing wishes. If you change the app,
 * change this file.
 *
 * NOTE: these marketing pages deliberately say nothing about subscriptions.
 * The subscription terms live in /terms and /privacypolicy, which must keep
 * them: Apple and Google require the disclosure, and those documents govern
 * actual purchases.
 */
export default {
  nav: {
    features: 'Features',
    shared: 'Shared Budget',
    faq: 'FAQ',
    language: 'Language',
    soon: 'Soon',
    getApp: 'Get the app',
    menu: 'Menu',
    theme: 'Toggle dark mode',
  },

  hero: {
    badge: 'Free on iOS & Android',
    titleA: 'Take control',
    titleB: 'of your',
    titleAccent: 'money',
    subtitle:
      'Plan the month, log what you spend, and watch every category in one glance. Budget Your Budget keeps it simple enough that you actually keep doing it.',
    statRating: 'App Store rating',
    statPrivate: 'Works offline',
    statFree: 'Free to start',
    caption: 'The real app — these screens are live, not pictures.',
  },

  features: {
    eyebrow: 'Everything you need',
    title: 'Built for the way you actually budget',
    subtitle:
      'No bank logins, no spreadsheets, no lectures. Type what you earn, plan where it goes, and the app does the arithmetic.',
    items: [
      {
        title: 'Plan by category',
        body: 'Give every category a number for the month and watch the ring drain as you spend. Overspending is obvious before payday, not after.',
      },
      {
        title: 'Log in seconds',
        body: 'Adding an expense takes one tap and a number. Emojis and colours make categories readable at a glance.',
      },
      {
        title: 'Scan your receipts',
        body: 'Photograph a receipt and the total, merchant and date fill themselves in. Check the numbers before you save — AI reads them, you confirm them.',
      },
      {
        title: 'Share with your partner',
        body: 'One budget, two phones. Every expense shows who logged it, and both of you see the household total.',
      },
      {
        title: 'Kill your debt',
        body: 'List what you owe and the snowball planner orders the payoff, rolling each cleared balance into the next.',
      },
      {
        title: 'See the patterns',
        body: 'Reports compare months, surface your biggest categories, and show where the money quietly goes.',
      },
      {
        title: 'Make it yours',
        body: 'Fifteen colour themes, light and dark, plus custom categories with your own names and emoji.',
      },
      {
        title: 'Yours to keep private',
        body: 'Works fully offline with no account. Sign in only if you want cloud backup or a shared budget.',
      },
    ],
  },

  showcase: {
    plan: {
      eyebrow: 'Planning',
      title: 'Know where it goes before it goes',
      body: 'Set a plan for each category at the start of the month. The ring fills as you spend, so a category in trouble stands out immediately — and tapping one opens everything you spent in it.',
      bullets: [
        'A petal per category, sized by its share of the plan',
        'Colour shifts as a category approaches its limit',
        'Tap any category for its full history',
      ],
    },
    track: {
      eyebrow: 'Tracking',
      title: 'Every expense, one list',
      body: 'Search, filter by category, and scan the month at a glance. Attach a receipt photo to anything you might need to prove later.',
      bullets: [
        'Filter by category or search by name',
        'Recurring expenses post themselves',
        'Receipt photos attach to any expense',
      ],
    },
    shared: {
      eyebrow: 'Shared Budget · New',
      title: 'One budget, two phones',
      body: 'Invite your partner with a code and you keep one budget together. Both of you can add and edit, every expense is labelled with who logged it, and the plan counts both incomes.',
      bullets: [
        'Expenses appear on the other phone within seconds',
        'Every row shows who logged it',
        'Both incomes count toward one household plan',
        'Your debts, PIN and settings are never shared',
      ],
      note: 'Sharing a budget means your partner sees the expenses, notes and receipts in it. Read the Terms of Use before you invite someone.',
      noteLink: 'What gets shared →',
      cta: 'Explore Shared Budget',
    },
    scan: {
      eyebrow: 'AI receipt scanning',
      title: 'Point your camera at the receipt',
      body: 'The total, the merchant and the date fill themselves in, and the app suggests a category. You check it and save — it is a head start, not a blind trust exercise.',
      bullets: [
        'Total, merchant, date and line items read automatically',
        'Suggests one of your own categories',
        'You confirm every value before it is saved',
      ],
      note: 'Receipt scanning sends the photo to Google for processing. Details are in the Privacy Policy.',
    },
    insights: {
      eyebrow: 'Insights',
      title: 'The month, explained',
      body: 'Your biggest categories, your most frequent spends and the days that cost the most — laid out without you having to build a single chart.',
      bullets: [
        'Biggest category and biggest single expense',
        'What you buy most often',
        'Daily averages and spending streaks',
      ],
    },
    reports: {
      eyebrow: 'Reports',
      title: 'Compare any two months',
      body: 'Put last month against this one, category by category, and see exactly what moved. Export to PDF or Excel when you need a record.',
      bullets: [
        'Month-vs-month by category',
        'Income against expenses over time',
        'Export to PDF or Excel',
      ],
    },
    themes: {
      eyebrow: 'Personalisation',
      title: 'Fifteen themes, light and dark',
      body: 'Pick a colour that makes you want to open the app. The whole interface — rings, charts, buttons — follows the theme you choose.',
      bullets: ['15 colour themes', 'Full light and dark mode', 'Custom categories with your own emoji'],
    },
  },

  howItWorks: {
    eyebrow: 'How it works',
    titleA: 'Start budgeting in',
    titleAccent: '3 simple steps',
    subtitle: 'No setup call, no bank connection, no spreadsheet to import. You can be tracking tonight.',
    steps: [
      {
        title: 'Set your income',
        body: 'Add what you take home after taxes and the app shows you exactly how much there is to allocate.',
      },
      {
        title: 'Plan your categories',
        body: 'Give each category a name, an emoji and a monthly amount. Make the recurring ones automatic.',
      },
      {
        title: 'Track and adjust',
        body: 'Log expenses in seconds and watch each category fill up. Adjust the plan whenever life does.',
      },
    ],
  },

  privacy: {
    eyebrow: 'Privacy',
    title: 'Your data stays yours',
    subtitle:
      'Budget Your Budget keeps your money on your device by default and works completely offline. Cloud sync and sharing are there when you want them — never switched on behind your back.',
    points: [
      {
        title: 'Local first',
        body: 'Your budget is stored on your device and works fully offline. No account is required — and if you never sign in, your financial data never leaves your phone.',
      },
      {
        title: 'Cloud sync is optional',
        body: 'Sign in only if you want your budget backed up across devices or shared with your partner. You can delete your account and everything in the cloud from inside the app.',
      },
      {
        title: 'No ads, no selling your data',
        body: 'We show no ads, run no advertising SDK, and never sell your information or track you across other apps. Export your data anytime.',
      },
      {
        title: 'We never touch your bank',
        body: 'The app does not connect to any bank or card. We never ask for banking credentials, and we cannot move your money.',
      },
    ],
    cta: 'Read the Privacy Policy',
  },


  faq: {
    eyebrow: 'FAQ',
    title: 'Frequently asked questions',
    items: [
      {
        q: 'Is my data really private?',
        a: 'Your budget is stored on your device, and if you never sign in it stays there — we receive nothing. Signing in is optional, and only then can your data be backed up to the cloud or shared with a partner you invite. We never sell your data, never show ads, and never connect to your bank. Full details are in our Privacy Policy.',
      },
      {
        q: 'Do I need an account?',
        a: 'No. The app works fully without one. An account is only needed for cloud sync, for a Shared Budget, and for editing your display name and photo.',
      },
      {
        q: 'What does my partner see in a shared budget?',
        a: 'A shared budget is for two people. You both become equal editors of one budget: each of you can see and change every expense in it — including its notes and any receipt photo — plus the categories, the plan, and both of your income amounts. Every expense shows who logged it. Your debts, your PIN, your settings and your reports are never shared. Joining merges your data into that budget and cannot be undone, so read the Terms of Use before you accept an invite.',
      },
      {
        q: 'Does it work offline?',
        a: 'Yes. The app runs entirely on your device, so you can track your budget with no internet connection at all. An internet connection is only needed for optional extras: cloud sync, sharing a budget, receipt scanning and AI insights.',
      },
      {
        q: 'How accurate is the receipt scanner?',
        a: 'It reads most printed receipts well, but it is AI and it does get things wrong. The scanned total, merchant and date are filled in for you to check before you save — always compare them against the receipt itself.',
      },
      {
        q: 'Can I export my data?',
        a: 'Yes. You can export a report to PDF or Excel, and Backup & Import saves your whole dataset to a file you keep, so your data is never locked in.',
      },
      {
        q: 'What is the debt snowball feature?',
        a: 'The debt snowball method pays off your smallest balance first. As each debt clears, you roll its payment into the next one, so the amount going at your debt keeps growing. The Debt Planner orders your debts and tracks the payoff.',
      },
    ],
  },

  sharedPage: {
    metaTitle: 'Shared Budget — Budget Your Budget',
    eyebrow: 'Shared Budget',
    title: 'One budget. Two phones.',
    subtitle:
      'Most budgeting breaks down the moment two people share money. Shared Budget puts you and your partner on the same plan, on your own phones, with no spreadsheet in the middle.',
    heroCaption: 'A real category in a real shared budget — both people, one plan.',

    stepsTitle: 'How it works',
    stepsSubtitle: 'Three steps, about a minute.',
    steps: [
      {
        title: 'Create an invite code',
        body: 'From the Shared Budget screen, generate an 8-character code. It works once and expires after 7 days.',
      },
      {
        title: 'Send it to your partner',
        body: 'Share it however you like. Treat it like a password — anyone who has the code can use it to join.',
      },
      {
        title: 'You are on one budget',
        body: 'They enter their income, your categories merge into one plan, and both phones stay in step within seconds.',
      },
    ],

    seeTitle: 'What you both see',
    seeSubtitle:
      'Sharing a budget is only useful if you can both act on it, so both of you are full editors of the same plan.',

    splitTitle: 'Split a category between you',
    splitBody:
      'Decide who covers how much of rent, groceries or anything else. Each person gets their own share to watch, and the category card shows both of you against it.',

    attributionTitle: 'Every expense says who logged it',
    attributionBody:
      'No more "was that you?". Each row carries the name and photo of whoever added it, on both phones, so the month reads like a shared record instead of a mystery.',

    privacyTitle: 'What stays yours',
    privacySubtitle:
      'Sharing a budget shares the budget — and nothing else. These stay private to each person, on their own phone.',
    sharedLabel: 'Shared with your partner',
    privateLabel: 'Stays private to you',
    sharedItems: [
      'Every expense in the budget, with its notes',
      'Receipt photos attached to those expenses',
      'Categories, planned amounts and the split',
      'Both incomes and the household total',
      'Your display name and profile photo',
    ],
    privateItems: [
      'Your debts and payoff plans',
      'Your app PIN and biometric lock',
      'Your reports',
      'Your AI advice history',
      'Your settings, theme and language',
      'Your email address',
    ],

    honestTitle: 'Before you invite someone',
    honestBody:
      'Two people sharing money need to be able to trust the tool, so here is the plain version: your partner will see the expenses, notes and receipts in the budget, and joining merges your data into it in a way that cannot be undone. Only the budget owner can remove a member; a member can leave whenever they want.',
    honestCta: 'Read what gets shared',

    ctaTitle: 'Get on the same page',
    ctaSubtitle: 'Free on iOS and Android. Bring your partner along.',
  },

  cta: {
    title: 'Start budgeting tonight',
    subtitle: 'Free on iOS and Android. Set it up tonight and thank yourself on payday.',
  },

  footer: {
    tagline:
      'A friendly daily budgeting app that helps you track spending, plan monthly expenses, and stay on top of your goals.',
    product: 'Product',
    legal: 'Legal',
    connect: 'Connect',
    terms: 'Terms of Use',
    privacy: 'Privacy Policy',
    madeWith: 'Made with',
  },

  common: {
    backHome: 'Back to Home',
    appStore: 'Download on the App Store',
    googlePlay: 'Get it on Google Play',
  },
};
