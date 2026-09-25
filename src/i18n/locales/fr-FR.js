/*
 * French (fr-FR). Mirrors en.js key for key — see the note at the top of that
 * file: it is the source of truth for every CLAIM here, and a translation that
 * improves on a sentence by saying something new is a bug.
 *
 * Voice: the reader is TU, and VOUS appears only where the sentence means the
 * two people in a shared budget — the app does exactly this in one breath
 * (sharedBudgetSoloBody: « Invite la personne avec qui TU partages ton argent.
 * VOUS planifierez les mêmes catégories »). Terms come from lib/l10n/app_fr.arb:
 * Budget partagé, Plan de remboursement (not « planificateur de dettes »),
 * méthode boule de neige, Rapports, Analyses, revenus, BYB+.
 *
 * TYPOGRAPHY.   is a NARROW NO-BREAK SPACE and it is required before ? ! :
 * and ». It is written escaped here on purpose: it is indistinguishable from a
 * plain space in an editor, and the three LLM reviewers that checked this file
 * all passed 19 plain spaces as correct because they cannot see the difference.
 * The gate is mechanical — scratchpad/check-locale.mjs lints every string — so
 * if you edit a line here, run it rather than trusting your eyes.
 * Apostrophes are ’ (U+2019), never ASCII. Quotes are « » with   inside.
 *
 * The /terms and /privacypolicy documents are NOT translated into French — they
 * exist in English and Spanish only, as prose in pages/Terms.jsx and
 * pages/PrivacyPolicy.jsx. A French visitor gets the English document and the
 * EN/ES switch. Only this file's `legal` block is site chrome.
 */
export default {
  nav: {
    features: 'Fonctions',
    shared: 'Budget partagé',
    faq: 'Questions',
    language: 'Langue',
    soon: 'Bientôt',
    getApp: 'Obtenir l’app',
    menu: 'Menu',
    theme: 'Basculer le mode sombre',
  },
  hero: {
    badge: 'Gratuit sur iOS et Android',
    titleA: 'Prends les rênes',
    titleB: 'de ton',
    titleAccent: 'argent',
    subtitle:
      'Planifie ton mois, note ce que tu dépenses et suis chaque catégorie d’un coup d’œil. Budget Your Budget reste assez simple pour que tu continues vraiment à t’en servir.',
    rating: '4,8',
    statRating: 'sur l’App Store',
    statPrivate: 'Marche hors ligne',
    statFree: 'Gratuit au départ',
    caption: 'La vraie app — ces écrans sont en direct, pas des images.',
  },
  features: {
    eyebrow: 'Tout ce qu’il te faut',
    title: 'Pensé pour ta vraie façon de budgéter',
    subtitle:
      'Pas de connexion bancaire, pas de tableur, pas de sermons. Saisis ce que tu gagnes, planifie où va ton argent, et l’app fait les calculs.',
    items: [
      {
        title: 'Planifie par catégorie',
        body:
          'Donne à chaque catégorie un montant pour le mois et regarde l’anneau se vider au fil de tes dépenses. Le dépassement saute aux yeux avant la paie, pas après.',
      },
      {
        title: 'Note en quelques secondes',
        body:
          'Ajouter une dépense, c’est un geste et un montant. Les emojis et les couleurs rendent les catégories lisibles d’un coup d’œil.',
      },
      {
        title: 'Scanne tes reçus',
        body:
          'Photographie un reçu et le montant, le commerçant et la date se remplissent tout seuls. Vérifie les chiffres avant d’enregistrer — l’IA les lit, c’est toi qui les confirmes.',
      },
      {
        title: 'Partage avec ton partenaire',
        body:
          'Un budget, deux téléphones. Chaque dépense indique qui l’a saisie, et vous voyez tous les deux le total du foyer.',
      },
      {
        title: 'Élimine tes dettes',
        body:
          'Liste ce que tu dois et le Plan de remboursement classe tes dettes avec la méthode boule de neige\u202f: chaque dette soldée alimente la suivante.',
      },
      {
        title: 'Repère les tendances',
        body:
          'Les Rapports comparent tes mois, font ressortir tes plus grosses catégories et montrent où l’argent file sans que tu le voies.',
      },
      {
        title: 'À ton image',
        body:
          'Quinze thèmes de couleur, en mode clair et sombre, plus des catégories personnalisées avec tes propres noms et emojis.',
      },
      {
        title: 'Rien qu’à toi',
        body:
          'L’app marche entièrement hors ligne, sans compte. Connecte-toi seulement si tu veux une sauvegarde dans le cloud ou un budget partagé.',
      },
    ],
  },
  showcase: {
    plan: {
      eyebrow: 'Planification',
      title: 'Où va ton argent, avant qu’il parte',
      body:
        'Prévois un montant pour chaque catégorie en début de mois. L’anneau se remplit à mesure que tu dépenses\u202f: une catégorie qui dérape saute aux yeux tout de suite — et en la touchant, tu ouvres tout ce que tu y as dépensé.',
      bullets: [
        'Un pétale par catégorie, de la taille de sa part du plan',
        'La couleur change à l’approche de la limite',
        'Touche une catégorie pour voir tout son historique',
      ],
    },
    track: {
      eyebrow: 'Suivi',
      title: 'Toutes tes dépenses, une seule liste',
      body:
        'Cherche, filtre par catégorie et parcours le mois d’un coup d’œil. Joins la photo d’un reçu à toute dépense que tu devras peut-être justifier plus tard.',
      bullets: [
        'Filtre par catégorie ou cherche par nom',
        'Les dépenses récurrentes s’ajoutent seules',
        'Joins un reçu à n’importe quelle dépense',
      ],
    },
    shared: {
      eyebrow: 'Budget partagé · Nouveau',
      title: 'Un budget, deux téléphones',
      body:
        'Invite ton partenaire avec un code et vous n’avez plus qu’un seul budget. Vous pouvez tous les deux ajouter et modifier, chaque dépense indique qui l’a saisie, et le plan compte vos deux revenus.',
      bullets: [
        /* One line in the 405px card; French holds about 52 characters there.
           « aussitôt » carries the English's "within seconds". */
        'Les dépenses arrivent aussitôt sur l’autre téléphone',
        'Chaque ligne indique qui l’a saisie',
        'Vos deux revenus comptent dans un seul plan',
        /* Determiners dropped to hold one line — idiomatic in a bullet list,
           and the claim and the app's term « code PIN » are both intact. */
        'Dettes, code PIN et réglages ne sont jamais partagés',
      ],
      note:
        'Partager un budget, c’est laisser ton partenaire voir les dépenses, les notes et les reçus qu’il contient. Lis les Conditions d’utilisation avant d’inviter quelqu’un.',
      noteLink: 'Ce qui est partagé →',
      cta: 'Découvrir le Budget partagé',
    },
    scan: {
      eyebrow: 'Scan de reçus par IA',
      title: 'Pointe l’appareil photo sur le reçu',
      body:
        'Le total, le commerçant et la date se remplissent tout seuls, et l’app propose une catégorie. Tu vérifies et tu enregistres — c’est une longueur d’avance, pas un acte de foi.',
      bullets: [
        'Total, commerçant, date et articles lus automatiquement',
        'Propose une de tes propres catégories',
        'Tu confirmes chaque valeur avant l’enregistrement',
      ],
      note:
        'Le scan du reçu envoie la photo à Google pour traitement. Les détails sont dans la Politique de confidentialité.',
    },
    insights: {
      eyebrow: 'Analyses',
      title: 'Le mois, expliqué',
      body:
        'Tes plus grosses catégories, tes dépenses les plus fréquentes et les jours qui coûtent le plus — présentés sans que tu aies un seul graphique à construire.',
      bullets: [
        'Plus grosse catégorie et plus grosse dépense',
        'Ce que tu achètes le plus souvent',
        'Moyennes par jour et séries de dépenses',
      ],
    },
    reports: {
      eyebrow: 'Rapports',
      title: 'Compare un mois à un autre',
      body:
        'Mets le mois dernier face au mois en cours, catégorie par catégorie, et vois exactement ce qui a bougé. Exporte en PDF ou Excel quand il te faut une trace.',
      bullets: [
        'D’un mois à l’autre, par catégorie',
        'Revenus face aux dépenses dans le temps',
        'Export en PDF ou Excel',
      ],
    },
    themes: {
      eyebrow: 'Personnalisation',
      title: 'Quinze thèmes, clair et sombre',
      body:
        'Choisis une couleur qui te donne envie d’ouvrir l’app. Toute l’interface — anneaux, graphiques, boutons — suit le thème que tu choisis.',
      bullets: [
        '15 thèmes de couleur',
        'Modes clair et sombre complets',
        'Catégories personnalisées avec tes emojis',
      ],
    },
  },
  howItWorks: {
    eyebrow: 'Comment ça marche',
    titleA: 'Ton budget en',
    titleAccent: '3 étapes simples',
    subtitle:
      'Pas d’appel de configuration, pas de connexion bancaire, pas de tableur à importer. Tu peux commencer à suivre tes dépenses dès ce soir.',
    steps: [
      {
        title: 'Indique tes revenus',
        body:
          'Ajoute ton revenu net, après impôts, et l’app te montre exactement combien tu as à répartir.',
      },
      {
        title: 'Planifie tes catégories',
        body:
          'Donne à chaque catégorie un nom, un emoji et un montant mensuel. Passe les récurrentes en automatique.',
      },
      {
        title: 'Suis et ajuste',
        body:
          'Note tes dépenses en quelques secondes et regarde chaque catégorie se remplir. Ajuste le plan dès que la vie change.',
      },
    ],
  },
  privacy: {
    eyebrow: 'Confidentialité',
    title: 'Tes données restent les tiennes',
    subtitle:
      'Budget Your Budget garde par défaut ton budget sur ton appareil et marche entièrement hors ligne. La synchronisation cloud et le partage sont là quand tu en as envie — jamais activés dans ton dos.',
    points: [
      {
        title: 'D’abord en local',
        body:
          'Ton budget est enregistré sur ton appareil et fonctionne totalement hors ligne. Aucun compte n’est nécessaire — et si tu ne te connectes jamais, tes données financières ne quittent jamais ton téléphone.',
      },
      {
        title: 'La synchro est facultative',
        body:
          'Connecte-toi seulement si tu veux que ton budget soit sauvegardé sur tous tes appareils ou partagé avec ton partenaire. Tu peux supprimer ton compte et tout ce qui est dans le cloud depuis l’app.',
      },
      {
        title: 'Ni pub, ni revente de données',
        body:
          'Nous n’affichons aucune pub, nous n’utilisons aucun SDK publicitaire et nous ne vendons jamais tes informations ni ne suivons ton activité dans d’autres apps. Exporte tes données quand tu veux.',
      },
      {
        /* A fragment like its three sibling card titles, and one line at 319px. */
      title: 'Aucun lien avec ta banque',
        body:
          'L’app ne se connecte à aucune banque ni à aucune carte. Nous ne demandons jamais d’identifiants bancaires et nous ne pouvons pas déplacer ton argent.',
      },
    ],
    cta: 'Lire la Politique de confidentialité',
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Questions fréquentes',
    items: [
      {
        q: 'Mes données sont-elles vraiment privées\u202f?',
        a:
          'Ton budget est enregistré sur ton appareil et, si tu ne te connectes jamais, il y reste — on ne reçoit rien. Se connecter est facultatif, et c’est seulement là que tes données peuvent être sauvegardées dans le cloud ou partagées avec le partenaire que tu invites. On ne vend jamais tes données, on n’affiche jamais de publicité et on ne se connecte jamais à ta banque. Tous les détails sont dans notre Politique de confidentialité.',
      },
      {
        q: 'Dois-je créer un compte\u202f?',
        a:
          'Non. L’app fonctionne entièrement sans compte. Un compte n’est nécessaire que pour la synchronisation cloud, pour un Budget partagé et pour modifier ton pseudo et ta photo.',
      },
      {
        q: 'Que voit mon partenaire dans un budget partagé\u202f?',
        a:
          'Un budget partagé est fait pour deux personnes. Vous modifiez tous les deux le même budget, à égalité\u202f: chacun peut voir et changer chaque dépense — ses notes et la photo du reçu comprises — ainsi que les catégories et le plan. Vous voyez chacun les revenus de l’autre et le total du foyer, mais tes revenus restent les tiens\u202f: ton partenaire ne peut pas les modifier. Chaque dépense indique qui l’a saisie. Tes dettes, ton code PIN, tes réglages et tes rapports ne sont jamais partagés. Rejoindre fusionne tes données avec ce budget et c’est irréversible\u202f: lis les Conditions d’utilisation avant d’accepter une invitation.',
      },
      {
        q: 'Est-ce que ça marche hors ligne\u202f?',
        a:
          'Oui. L’app tourne entièrement sur ton appareil, donc tu peux suivre ton budget sans la moindre connexion internet. Internet n’est nécessaire que pour les fonctionnalités facultatives\u202f: la synchronisation cloud, le partage d’un budget, le scan de reçus et les analyses IA.',
      },
      {
        q: 'À quel point le scan de reçus est-il précis\u202f?',
        a:
          'Il lit bien la plupart des reçus imprimés, mais c’est de l’IA, et il lui arrive de se tromper. Le total, le commerçant et la date sont remplis pour que tu les vérifies avant d’enregistrer — compare-les toujours avec le reçu lui-même.',
      },
      {
        q: 'Puis-je exporter mes données\u202f?',
        a:
          'Oui. Tu peux exporter un rapport en PDF ou Excel, et la fonction Sauvegarde et import enregistre toutes tes données dans un fichier qui t’appartient\u202f: elles ne sont jamais prisonnières.',
      },
      {
        q: 'Qu’est-ce que la méthode boule de neige\u202f?',
        a:
          'La méthode boule de neige rembourse d’abord ton plus petit solde. Chaque fois que tu soldes une dette, tu ajoutes son paiement à la suivante\u202f: le montant consacré à tes dettes ne cesse de grossir. Le Plan de remboursement classe tes dettes et suit tes progrès jusqu’au bout.',
      },
    ],
  },
  sharedPage: {
    metaTitle: 'Budget partagé — Budget Your Budget',
    eyebrow: 'Budget partagé',
    title: 'Un budget. Deux téléphones.',
    subtitle:
      'La plupart des budgets s’effondrent dès que deux personnes partagent leur argent. Avec le Budget partagé, toi et ton partenaire suivez un seul et même plan, chacun sur son téléphone, sans tableur au milieu.',
    heroCaption: 'Une vraie catégorie dans un vrai budget partagé — les deux personnes, un seul plan.',
    stepsTitle: 'Comment ça marche',
    stepsSubtitle: 'Trois étapes, environ une minute.',
    steps: [
      {
        title: 'Crée un code d’invitation',
        body:
          'Depuis l’écran Budget partagé, génère un code de 8 caractères. Il ne sert qu’une fois et expire au bout de 7 jours.',
      },
      {
        title: 'Envoie-le à ton partenaire',
        body:
          'Partage-le comme tu veux. Traite-le comme un mot de passe — quiconque a le code peut s’en servir pour rejoindre.',
      },
      {
        title: 'Vous partagez un seul budget',
        body:
          'Ton partenaire saisit ses revenus, vos catégories fusionnent en un seul plan, et les deux téléphones restent à jour en quelques secondes.',
      },
    ],
    seeTitle: 'Ce que vous voyez tous les deux',
    seeSubtitle:
      'Un budget partagé n’a d’intérêt que si chacun peut agir dessus\u202f: vous modifiez donc tous les deux le même plan, sans restriction.',
    splitTitle: 'Répartir une catégorie à deux',
    splitBody:
      'Décidez qui prend quelle part du loyer, des courses ou du reste. Chacun a sa propre part à suivre, et la carte de la catégorie montre où vous en êtes tous les deux.',
    attributionTitle: 'Chaque dépense indique qui l’a saisie',
    attributionBody:
      'Fini le «\u202fc’était toi\u202f?\u202f». Chaque ligne porte le nom et la photo de la personne qui l’a ajoutée, sur les deux téléphones, si bien que le mois se lit comme un registre partagé plutôt que comme un mystère.',
    privacyTitle: 'Ce qui reste à toi',
    privacySubtitle:
      'Partager un budget, c’est partager le budget — et rien d’autre. Ce qui suit reste privé pour chacun, sur son propre téléphone.',
    sharedLabel: 'Partagé avec ton partenaire',
    privateLabel: 'Reste privé pour toi',
    sharedItems: [
      'Toutes les dépenses du budget, avec leurs notes',
      'Les photos de reçus jointes à ces dépenses',
      'Les catégories, les montants prévus et la répartition',
      'Les revenus de chacun et le total du foyer',
      'Ton pseudo et ta photo de profil',
    ],
    privateItems: [
      'Tes dettes et tes plans de remboursement',
      'Ton code PIN et le déverrouillage biométrique',
      'Tes rapports',
      'Ton historique d’analyses IA',
      'Tes réglages, ton thème et ta langue',
      'Ton adresse e-mail',
    ],
    popsCategory: [
      {
        title: 'Ta part, en un coup d’œil',
        body:
          'Ce que tu as accepté de prendre dans cette catégorie, et ce que tu as réellement dépensé dessus.',
      },
      {
        title: 'Et celle de ton partenaire',
        body: 'La même carte pour ton partenaire. Personne n’a besoin de demander où en est l’autre.',
      },
      {
        title: 'Répartissez comme vous voulez',
        body:
          'Changez qui prend quoi à tout moment. L’accord est le vôtre — l’app se contente de compter.',
      },
      {
        title: 'Qui l’a saisie',
        body:
          'Chaque dépense porte le nom et la photo de la personne qui l’a ajoutée, sur les deux téléphones.',
      },
    ],
    popsBudget: [
      {
        title: 'Deux revenus, un seul plan',
        body: 'Le mois se planifie sur le total du foyer, pas seulement sur tes revenus.',
      },
      {
        title: 'Qui dépense combien',
        body: 'Une carte pour chacun, côte à côte, pour ne jamais avoir à reparler de la répartition.',
      },
      {
        title: 'Un seul anneau pour le foyer',
        body:
          'Toutes les catégories dans lesquelles vous dépensez tous les deux, en une seule image du mois.',
      },
    ],
    honestTitle: 'Avant d’inviter quelqu’un',
    honestBody:
      'Deux personnes qui partagent leur argent doivent pouvoir faire confiance à l’outil, alors disons les choses clairement\u202f: ton partenaire verra les dépenses, les notes et les reçus du budget, et rejoindre fusionne tes données avec ce budget de façon irréversible. Seul le propriétaire du budget peut en retirer quelqu’un. L’autre personne peut quitter le budget quand elle veut.',
    honestCta: 'Lire ce qui est partagé',
    ctaTitle: 'Mettez-vous d’accord',
    ctaSubtitle: 'Gratuit sur iOS et Android. Invite ton partenaire.',
  },
  cta: {
    title: 'Crée ton budget ce soir',
    subtitle: 'Gratuit sur iOS et Android. Configure-le ce soir et tu te remercieras le jour de paie.',
  },
  footer: {
    tagline:
      'Une app de budget conviviale qui t’aide au quotidien à suivre tes dépenses, planifier ton mois et garder le cap sur tes objectifs.',
    product: 'Produit',
    legal: 'Informations légales',
    connect: 'Contact',
    terms: 'Conditions d’utilisation',
    privacy: 'Politique de confidentialité',
    madeWith: 'Fait avec',
  },
  meta: {
    title: 'Budget Your Budget — Le budget malin, en toute simplicité',
    description:
      'Une app de budget conviviale qui t’aide au quotidien à suivre tes dépenses, planifier ton mois et garder le cap sur tes objectifs. Disponible sur iOS et Android.',
  },
  legal: {
    docLanguage: 'Langue du document',
  },
  common: {
    backHome: 'Retour à l’accueil',
    appStore: 'Télécharger dans l’App Store',
    googlePlay: 'Disponible sur Google Play',
  },
};
