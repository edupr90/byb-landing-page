/*
 * Italian (it-IT). Mirrors en.js key for key — see the note at the top of that
 * file: it is the source of truth for every CLAIM here, and a translation that
 * improves on a sentence by saying something new is a bug.
 *
 * Voice: the reader is TU, and VOI appears only where the sentence means the two
 * people in a shared budget. Terms come from lib/l10n/app_it.arb: Budget
 * condiviso, Piano debiti, Metodo Snowball, Report (the English word, not
 * «rapporti»), Analisi, scontrino (never «ricevuta»), entrate, BYB+.
 *
 * TYPOGRAPHY, and note it differs from the French locale on purpose: the
 * apostrophe here is the PLAIN ASCII ', because that is what the app's Italian
 * uses (126 times, against 2 typographic ones that are drift). Italian also
 * keeps the em dash — for an aside, where German and French both take the en
 * dash. Accented capitals are real letters: È, never E'. check-locale.mjs
 * enforces all three.
 *
 * The /terms and /privacypolicy documents are NOT translated into Italian —
 * they exist in English and Spanish only, as prose in pages/Terms.jsx and
 * pages/PrivacyPolicy.jsx. An Italian visitor gets the English document and the
 * EN/ES switch. Only this file's `legal` block is site chrome.
 */
export default {
  nav: {
    features: 'Funzioni',
    shared: 'Budget condiviso',
    faq: 'Domande',
    language: 'Lingua',
    soon: 'Presto',
    getApp: "Scarica l'app",
    menu: 'Menu',
    theme: 'Attiva o disattiva la modalità scura',
  },
  hero: {
    badge: 'Gratis su iOS e Android',
    /* Measured, not guessed. Line 1 holds about 13 characters at the lg
       breakpoint and line 2 about 14, with titleB and titleAccent forced onto
       that second line. «Prendi in mano» is 14 and broke to three lines at
       1024. This holds two at 390, 768, 1024 and 1440, and ends on the
       highlighted noun. Re-measure before re-editing. */
    titleA: 'Al comando',
    titleB: 'dei tuoi',
    titleAccent: 'soldi',
    subtitle:
      "Pianifica il mese, registra quello che spendi e vedi ogni categoria a colpo d'occhio. Budget Your Budget resta così semplice che continui davvero a usarlo.",
    rating: '4,8',
    statRating: 'su App Store',
    statPrivate: 'Funziona offline',
    statFree: 'Inizia gratis',
    caption: "L'app vera — queste schermate sono dal vivo, non immagini.",
  },
  features: {
    eyebrow: 'Tutto ciò che ti serve',
    title: 'Pensato per come fai davvero il budget',
    subtitle:
      "Niente credenziali bancarie, niente fogli di calcolo, niente prediche. Scrivi quanto guadagni, pianifica dove vanno i soldi e l'app fa i conti.",
    items: [
      {
        title: 'Pianifica per categoria',
        body:
          "Dai a ogni categoria un importo per il mese e guarda l'anello svuotarsi mentre spendi. Se stai spendendo troppo lo vedi prima dello stipendio, non dopo.",
      },
      {
        title: 'Registra in pochi secondi',
        body:
          "Per aggiungere una spesa bastano un tocco e un numero. Emoji e colori rendono ogni categoria leggibile a colpo d'occhio.",
      },
      {
        title: 'Scansiona i tuoi scontrini',
        body:
          "Fotografa uno scontrino e l'importo, il negozio e la data si compilano da soli. Controlla i numeri prima di salvare — l'IA li legge, tu li confermi.",
      },
      {
        title: 'Condividi con il tuo partner',
        body:
          "Un budget, due telefoni. Ogni spesa mostra chi l'ha registrata e vedete entrambi il totale di casa.",
      },
      {
        title: 'Estingui i tuoi debiti',
        body:
          'Elenca quello che devi e il Piano debiti mette in fila i pagamenti con il metodo Snowball: ogni debito estinto alimenta il successivo.',
      },
      {
        title: 'Riconosci le abitudini',
        body:
          'I Report confrontano i mesi, fanno emergere le tue categorie più grandi e mostrano dove finiscono i soldi senza che tu te ne accorga.',
      },
      {
        title: 'Rendila tua',
        body:
          'Quindici temi di colore, in modalità chiara e scura, più categorie personalizzate con i tuoi nomi e le tue emoji.',
      },
      {
        title: 'Tuo e privato',
        body:
          'Funziona del tutto offline e senza account. Accedi solo se vuoi il backup nel cloud o un budget condiviso.',
      },
    ],
  },
  showcase: {
    plan: {
      eyebrow: 'Pianificazione',
      title: 'Dove vanno i soldi, prima che vadano',
      body:
        "Imposta un piano per ogni categoria a inizio mese. L'anello si riempie mentre spendi, così una categoria in difficoltà salta subito all'occhio — e toccandola vedi tutto quello che ci hai speso.",
      bullets: [
        'Un petalo per categoria, in proporzione al piano',
        "Il colore cambia all'avvicinarsi del limite",
        'Tocca una categoria e vedi tutta la cronologia',
      ],
    },
    track: {
      eyebrow: 'Monitoraggio',
      title: 'Ogni spesa, una sola lista',
      body:
        "Cerca, filtra per categoria e guarda il mese intero a colpo d'occhio. Allega la foto dello scontrino a qualsiasi spesa che un domani potresti dover dimostrare.",
      bullets: [
        'Filtra per categoria o cerca per nome',
        'Le spese ricorrenti si aggiungono da sole',
        'Allega lo scontrino a qualsiasi spesa',
      ],
    },
    shared: {
      eyebrow: 'Budget condiviso · Novità',
      title: 'Un budget, due telefoni',
      body:
        "Invita il tuo partner con un codice e avrete un solo budget. Potete aggiungere e modificare le spese tutti e due, ogni spesa mostra chi l'ha registrata e il piano conta le entrate di entrambi.",
      bullets: [
        "Ogni spesa sull'altro telefono in pochi secondi",
        "Ogni riga mostra chi l'ha registrata",
        'Le entrate di tutti e due in un unico piano',
        'Debiti, PIN e impostazioni non si condividono mai',
      ],
      note:
        "Condividere un budget significa che il tuo partner vede le spese, le note e gli scontrini che contiene. Leggi le Condizioni d'uso prima di invitare qualcuno.",
      noteLink: 'Cosa si condivide →',
      cta: 'Scopri il Budget condiviso',
    },
    scan: {
      eyebrow: 'Scansione scontrini con IA',
      title: 'Punta la fotocamera sullo scontrino',
      body:
        "L'importo, il negozio e la data si compilano da soli, e l'app ti suggerisce una categoria. Tu controlli e salvi — è un passo avanti, non un atto di fede.",
      bullets: [
        'Legge da sola importo, negozio, data e articoli',
        'Ti suggerisce una delle tue categorie',
        'Confermi tu ogni dato prima di salvare',
      ],
      note:
        "La scansione dello scontrino invia la foto a Google per l'elaborazione. I dettagli sono nell'Informativa sulla privacy.",
    },
    insights: {
      eyebrow: 'Analisi',
      title: 'Il mese, spiegato',
      body:
        'Le tue categorie più grandi, le spese che ripeti più spesso e i giorni che costano di più — già pronti, senza che tu debba costruire un solo grafico.',
      bullets: [
        'Categoria principale e spesa più grande',
        'Quello che compri più spesso',
        'Medie giornaliere e serie di giorni di spesa',
      ],
    },
    reports: {
      eyebrow: 'Report',
      title: 'Confronta due mesi',
      body:
        'Metti il mese scorso a confronto con quello in corso, categoria per categoria, e vedi esattamente cosa è cambiato. Esporta in PDF o Excel quando ti serve tenerne traccia.',
      bullets: [
        'Mese vs mese, per categoria',
        'Entrate vs uscite nel tempo',
        'Esporta in PDF o Excel',
      ],
    },
    themes: {
      eyebrow: 'Personalizzazione',
      title: 'Quindici temi, chiaro e scuro',
      body:
        "Scegli un colore che ti faccia venire voglia di aprire l'app. Tutta l'interfaccia — anelli, grafici, pulsanti — segue il tema che scegli.",
      bullets: [
        '15 temi di colore',
        'Modalità chiara e scura, entrambe complete',
        'Categorie personalizzate con le tue emoji',
      ],
    },
  },
  howItWorks: {
    eyebrow: 'Come funziona',
    titleA: 'Il tuo budget in',
    titleAccent: '3 semplici passi',
    subtitle:
      'Nessuna chiamata di configurazione, nessuna banca da collegare, nessun foglio di calcolo da importare. Puoi iniziare a registrare le spese già stasera.',
    steps: [
      {
        title: 'Aggiungi le entrate',
        body:
          "Inserisci le tue entrate nette, dopo le tasse, e l'app ti mostra esattamente quanto hai da assegnare.",
      },
      {
        title: 'Pianifica le categorie',
        body:
          "Dai a ogni categoria un nome, un'emoji e un importo mensile. Rendi automatiche quelle ricorrenti.",
      },
      {
        title: 'Registra e adatta',
        body:
          'Annota le spese in pochi secondi e guarda ogni categoria riempirsi. Adatta il piano ogni volta che la vita cambia.',
      },
    ],
  },
  privacy: {
    eyebrow: 'Privacy',
    title: 'I tuoi dati restano tuoi',
    subtitle:
      'Budget Your Budget tiene i tuoi soldi sul dispositivo, per impostazione predefinita, e funziona completamente offline. La sincronizzazione cloud e la condivisione ci sono quando le vuoi — non si attivano mai alle tue spalle.',
    points: [
      {
        title: 'Prima in locale',
        body:
          'Il tuo budget è salvato sul tuo dispositivo e funziona completamente offline. Non serve nessun account — e se non accedi mai, i tuoi dati finanziari non escono mai dal tuo telefono.',
      },
      {
        title: 'Sincronizzare è opzionale',
        body:
          "Accedi solo se vuoi il backup del tuo budget su tutti i dispositivi o se vuoi condividerlo con il tuo partner. Puoi eliminare il tuo account e tutto quello che c'è nel cloud direttamente dall'app.",
      },
      {
        title: 'Niente pubblicità né dati venduti',
        body:
          'Non mostriamo pubblicità, non usiamo nessun SDK pubblicitario e non vendiamo mai le tue informazioni né ti tracciamo in altre app. Esporta i tuoi dati quando vuoi.',
      },
      {
        title: 'Non tocchiamo mai la tua banca',
        body:
          "L'app non si collega a nessuna banca né a nessuna carta. Non ti chiediamo mai le credenziali bancarie e non possiamo spostare i tuoi soldi.",
      },
    ],
    cta: "Leggi l'Informativa sulla privacy",
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Domande frequenti',
    items: [
      {
        q: 'I miei dati sono davvero privati?',
        a:
          'Il tuo budget è salvato sul tuo dispositivo e, se non accedi mai, resta lì — a noi non arriva nulla. Accedere è facoltativo, e solo allora i tuoi dati possono essere salvati nel cloud o condivisi con il partner che inviti. Non vendiamo mai i tuoi dati, non mostriamo mai pubblicità e non ci colleghiamo mai alla tua banca. Tutti i dettagli sono nella nostra Informativa sulla privacy.',
      },
      {
        q: 'Serve un account?',
        a:
          "No. L'app funziona completamente senza account. L'account serve solo per la sincronizzazione cloud, per un Budget condiviso e per modificare il tuo soprannome e la tua foto.",
      },
      {
        q: 'Che cosa vede il mio partner in un budget condiviso?',
        a:
          "Un budget condiviso è per due persone. Il budget diventa uno solo e lo modificate entrambi alla pari: ognuno di voi può vedere e cambiare ogni spesa — note e foto dello scontrino comprese — oltre alle categorie e al piano. Vedete entrambi le due entrate e il totale di casa, ma le tue entrate le modifichi solo tu. Ogni spesa mostra chi l'ha registrata. I tuoi debiti, il tuo PIN, le tue impostazioni e i tuoi report non vengono mai condivisi. Quando ti unisci, i tuoi dati confluiscono in quel budget e non si può annullare: leggi le Condizioni d'uso prima di accettare un invito.",
      },
      {
        q: 'Funziona offline?',
        a:
          "Sì. L'app gira interamente sul tuo dispositivo, quindi puoi tenere traccia del tuo budget senza nessuna connessione a internet. Internet serve solo per gli extra facoltativi: sincronizzazione cloud, condivisione di un budget, scansione degli scontrini e Analisi IA.",
      },
      {
        q: 'Quanto è precisa la scansione degli scontrini?',
        a:
          "Legge bene la maggior parte degli scontrini stampati, ma è IA e qualche errore lo fa. L'importo totale, il negozio e la data vengono compilati dalla scansione perché tu li controlli prima di salvare — confrontali sempre con lo scontrino stesso.",
      },
      {
        q: 'Posso esportare i miei dati?',
        a:
          "Sì. Puoi esportare un report in PDF o Excel, e Backup e importazione salva tutti i tuoi dati in un file che resta tuo: così non sono mai prigionieri dell'app.",
      },
      {
        q: "Che cos'è il Metodo Snowball?",
        a:
          "Il Metodo Snowball estingue per primo il tuo saldo più piccolo. Ogni volta che chiudi un debito, aggiungi quel pagamento al successivo, così l'importo che destini ai debiti continua a crescere. Piano debiti mette in ordine i tuoi debiti e tiene traccia dell'estinzione.",
      },
    ],
  },
  sharedPage: {
    metaTitle: 'Budget condiviso — Budget Your Budget',
    eyebrow: 'Budget condiviso',
    title: 'Un budget. Due telefoni.',
    subtitle:
      'La maggior parte dei budget smette di funzionare nel momento in cui due persone condividono i soldi. Con Budget condiviso tu e il tuo partner seguite lo stesso piano, ognuno sul proprio telefono, senza un foglio di calcolo in mezzo.',
    heroCaption: 'Una categoria vera in un budget condiviso vero — entrambe le persone, un solo piano.',
    stepsTitle: 'Come funziona',
    stepsSubtitle: 'Tre passaggi, circa un minuto.',
    steps: [
      {
        title: 'Crea un codice di invito',
        body:
          'Dalla schermata Budget condiviso, genera un codice di 8 caratteri. Si usa una sola volta e scade dopo 7 giorni.',
      },
      {
        title: 'Invialo al tuo partner',
        body:
          'Condividilo come preferisci. Trattalo come una password — chiunque abbia il codice può usarlo per unirsi.',
      },
      {
        title: 'Siete in un unico budget',
        body:
          'Il tuo partner inserisce le sue entrate, le vostre categorie si uniscono in un unico piano, e i due telefoni restano allineati in pochi secondi.',
      },
    ],
    seeTitle: 'Cosa vedete entrambi',
    seeSubtitle:
      'Condividere un budget ha senso solo se tutti e due potete intervenire, quindi modificate entrambi lo stesso piano, senza restrizioni.',
    splitTitle: 'Dividete una categoria tra voi',
    splitBody:
      "Decidete chi copre quanto dell'affitto, degli alimentari o di qualsiasi altra cosa. Ognuno ha la sua parte da tenere d'occhio, e la scheda della categoria mostra come state andando tutti e due.",
    attributionTitle: "Ogni spesa mostra chi l'ha registrata",
    attributionBody:
      "Basta con il «l'hai aggiunta tu?». Ogni riga porta il nome e la foto di chi l'ha registrata, su entrambi i telefoni, così il mese si legge come un registro condiviso e non come un mistero.",
    privacyTitle: 'Cosa resta tuo',
    privacySubtitle:
      "Condividere un budget vuol dire condividere il budget — e nient'altro. Queste cose restano private per ognuno, sul proprio telefono.",
    sharedLabel: 'Condiviso con il tuo partner',
    privateLabel: 'Resta privato per te',
    sharedItems: [
      'Ogni spesa del budget, con le sue note',
      'Le foto degli scontrini allegate a quelle spese',
      'Categorie, importi pianificati e la divisione',
      'Le entrate di entrambi e il totale',
      'Il tuo soprannome e la tua foto profilo',
    ],
    privateItems: [
      'I tuoi debiti e i piani per saldarli',
      "Il PIN dell'app e lo sblocco biometrico",
      'I tuoi report',
      'La cronologia delle tue analisi IA',
      'Le tue impostazioni, il tema e la lingua',
      'Il tuo indirizzo email',
    ],
    popsCategory: [
      {
        title: "La tua parte, a colpo d'occhio",
        body: 'Quello che hai accettato di coprire in questa categoria, e quanto ci hai speso davvero.',
      },
      {
        title: 'E quella del tuo partner',
        body: "La stessa scheda per il tuo partner. Nessuno deve chiedere come sta andando l'altro.",
      },
      {
        title: 'Dividetela come volete',
        body: "Cambiate chi copre cosa quando volete. L'accordo è vostro — l'app tiene solo il conto.",
      },
      {
        title: "Chi l'ha registrata",
        body: "Ogni spesa porta il nome e la foto di chi l'ha aggiunta, su entrambi i telefoni.",
      },
    ],
    popsBudget: [
      {
        title: 'Due entrate, un piano',
        body: 'Il mese si pianifica sul totale di tutti e due, non solo sulle tue entrate.',
      },
      {
        title: 'Chi spende cosa',
        body: 'Una scheda a testa, affiancate, così della divisione non dovete parlare due volte.',
      },
      {
        title: 'Un anello per tutti e due',
        body: "Ogni categoria da cui spendete tutti e due, in un'unica immagine del mese.",
      },
    ],
    honestTitle: 'Prima di invitare qualcuno',
    honestBody:
      'Due persone che condividono i soldi devono potersi fidare dello strumento, quindi ecco la versione chiara: il tuo partner vedrà le spese, le note e gli scontrini che ci sono nel budget, e unirsi fonde i tuoi dati con quel budget in un modo che non si può annullare. Solo il proprietario del budget può rimuovere un membro; un membro può uscire quando vuole.',
    honestCta: 'Leggi cosa si condivide',
    ctaTitle: "Mettetevi d'accordo",
    ctaSubtitle: 'Gratis su iOS e Android. Porta con te il tuo partner.',
  },
  cta: {
    title: 'Crea il tuo budget stasera',
    subtitle: 'Gratis su iOS e Android. Preparalo stasera e il giorno di paga ti ringrazierai.',
  },
  footer: {
    tagline:
      "Un'app amichevole per il budget quotidiano, che ti aiuta a tenere traccia delle spese, pianificare il mese e non perdere di vista i tuoi obiettivi.",
    product: 'Prodotto',
    legal: 'Note legali',
    connect: 'Contatti',
    terms: "Condizioni d'uso",
    privacy: 'Informativa sulla privacy',
    madeWith: 'Fatto con',
  },
  meta: {
    title: 'Budget Your Budget — Budget intelligente e semplice',
    description:
      "Un'app amichevole per il budget quotidiano, che ti aiuta a tenere traccia delle spese, pianificare il mese e non perdere di vista i tuoi obiettivi. Disponibile su iOS e Android.",
  },
  legal: {
    docLanguage: 'Lingua del documento',
  },
  common: {
    backHome: 'Torna alla home',
    appStore: 'Scarica su App Store',
    googlePlay: 'Disponibile su Google Play',
  },
};
