/*
 * German (de-DE). Mirrors en.js key for key — see the note at the top of that
 * file: it is the source of truth for every CLAIM here, and a translation that
 * improves on a sentence by saying something new is a bug.
 *
 * Voice: the reader is DU, and the couple is IHR/EURE — the app's own usage
 * («Eure Kategorien … das ihr beide bearbeitet»). Never Sie. Terms come from
 * lib/l10n/app_de.arb: Gemeinsames Budget, Schuldenplaner, Schneeball-Methode,
 * Berichte, Analyses → Analysen, Beleg (never Quittung), Einnahmen, BYB+.
 *
 * THE OTHER PERSON IS NEVER GENDERED. German would force Partner/Partnerin and
 * the app refuses to choose: «Die andere Person sieht diesen Betrag»
 * (sharedBudgetIncomeNotice), «die Person, mit der du dein Geld teilst»
 * (sharedBudgetPaywallSubtitle). This file follows that.
 *
 * LENGTH IS A LAYOUT CONSTRAINT IN GERMAN, not a preference. A compound noun
 * cannot break: measured in the live page, a 19–22 character noun in a 163px
 * feature-card title overflows its box by 28–52px rather than wrapping. Keep
 * long compounds out of the narrow boxes (card titles, nav, bullets, the hero
 * stat row) and re-measure if you edit one. Typography: en dash – for an aside
 * (the app uses – 59 times to — 8), „low-high“ quotes, ß.
 *
 * The /terms and /privacypolicy documents are NOT translated into German —
 * they exist in English and Spanish only, as prose in pages/Terms.jsx and
 * pages/PrivacyPolicy.jsx. A German visitor gets the English document and the
 * EN/ES switch. Only this file's `legal` block is site chrome.
 */
export default {
  nav: {
    features: 'Funktionen',
    shared: 'Gemeinsames Budget',
    faq: 'Fragen',
    language: 'Sprache',
    soon: 'Bald',
    getApp: 'App holen',
    menu: 'Menü',
    theme: 'Dunkelmodus umschalten',
  },
  hero: {
    badge: 'Kostenlos für iOS und Android',
    /* Measured, not guessed. The hero column holds about 13 characters per line
       at the lg breakpoint, and titleB sits with titleAccent on a forced second
       line. „Übernimm die Kontrolle“ ran to FOUR lines at 1024 and three even at
       390. This holds two at 390, 768, 1024 and 1440, and the swash under
       „Griff“ covers 35% of the column — the same share English gives „money“.
       Re-measure before re-editing. */
    titleA: 'Behalte dein',
    titleB: 'Geld im',
    titleAccent: 'Griff',
    subtitle:
      'Plane den Monat, erfasse, was du ausgibst, und sieh jede Kategorie auf einen Blick. Budget Your Budget bleibt so einfach, dass du wirklich dranbleibst.',
    rating: '4,8',
    statRating: 'im App Store',
    statPrivate: 'Auch offline',
    statFree: 'Gratis starten',
    caption: 'Die echte App – diese Ansichten sind live, keine Bilder.',
  },
  features: {
    eyebrow: 'Alles, was du brauchst',
    title: 'Für die Art, wie du wirklich budgetierst',
    subtitle:
      'Keine Bankzugänge, keine Excel-Tabellen, keine Belehrungen. Trag ein, was du verdienst, plane, wohin es geht, und die App rechnet.',
    items: [
      {
        title: 'Pro Kategorie planen',
        body:
          'Gib jeder Kategorie einen Betrag für den Monat und sieh zu, wie sich der Ring beim Ausgeben leert. Dass du zu viel ausgibst, siehst du vor dem Zahltag, nicht danach.',
      },
      {
        title: 'In Sekunden erfassen',
        body:
          'Eine Ausgabe erfassen: einmal tippen, eine Zahl eingeben. Emojis und Farben machen jede Kategorie auf einen Blick lesbar.',
      },
      {
        title: 'Belege scannen',
        body:
          'Fotografiere einen Beleg: Betrag, Händler und Datum tragen sich selbst ein. Prüfe die Zahlen vor dem Speichern – die KI liest sie, du bestätigst sie.',
      },
      {
        title: 'Budget zu zweit teilen',
        body:
          'Ein Budget, zwei Handys. Bei jeder Ausgabe steht, wer sie erfasst hat, und ihr beide seht die Summe für den Haushalt.',
      },
      {
        title: 'Schulden loswerden',
        body:
          'Liste auf, was du schuldest, und der Schuldenplaner ordnet die Tilgung nach der Schneeball-Methode: Die Rate jeder getilgten Schuld kommt zur nächsten dazu.',
      },
      {
        title: 'Muster erkennen',
        body:
          'Die Berichte vergleichen Monate, heben deine größten Kategorien hervor und zeigen, wohin dein Geld unbemerkt fließt.',
      },
      {
        title: 'Ganz dein Stil',
        body: 'Fünfzehn Farbdesigns, hell und dunkel, dazu eigene Kategorien mit deinen Namen und Emojis.',
      },
      {
        title: 'Deins und privat',
        body:
          'Funktioniert ganz offline und ohne Konto. Melde dich nur an, wenn du ein Cloud-Backup oder ein gemeinsames Budget willst.',
      },
    ],
  },
  showcase: {
    plan: {
      eyebrow: 'Planung',
      title: 'Wohin es geht, bevor es weg ist',
      body:
        'Gib jeder Kategorie zu Monatsbeginn einen geplanten Betrag. Der Ring füllt sich mit jeder Ausgabe – so fällt eine Kategorie, die aus dem Ruder läuft, sofort auf. Und ein Tippen darauf öffnet alles, was du darin ausgegeben hast.',
      bullets: [
        'Ein Blütenblatt pro Kategorie, groß wie ihr Plananteil',
        'Die Farbe wechselt, wenn das Limit näher rückt',
        'Tippe eine Kategorie an – ihr ganzer Verlauf',
      ],
    },
    track: {
      eyebrow: 'Erfassen',
      title: 'Jede Ausgabe, eine Liste',
      body:
        'Durchsuche deine Ausgaben, filtere nach Kategorie und sieh den ganzen Monat auf einen Blick. Hänge ein Belegfoto an alles, was du später vielleicht nachweisen musst.',
      bullets: [
        'Nach Kategorie filtern oder nach Namen suchen',
        'Wiederkehrende Ausgaben tragen sich selbst ein',
        'Belegfotos an jede Ausgabe anhängen',
      ],
    },
    shared: {
      eyebrow: 'Gemeinsames Budget · Neu',
      title: 'Ein Budget, zwei Handys',
      body:
        'Lade mit einem Code die Person ein, mit der du dein Geld teilst – und ihr habt ein Budget gemeinsam. Ihr beide könnt Ausgaben hinzufügen und bearbeiten, bei jeder steht, wer sie eingetragen hat, und der Plan rechnet mit beiden Einkommen.',
      bullets: [
        'Ausgaben sind in Sekunden auf dem anderen Handy',
        'Jede Zeile zeigt, wer sie eingetragen hat',
        'Beide Einkommen, ein gemeinsamer Plan',
        'Schulden, PIN und Einstellungen werden nie geteilt',
      ],
      note:
        'Ein Budget zu teilen heißt: Die andere Person sieht die Ausgaben, Notizen und Belege darin. Lies die Nutzungsbedingungen, bevor du jemanden einlädst.',
      noteLink: 'Was geteilt wird →',
      cta: 'Gemeinsames Budget entdecken',
    },
    scan: {
      eyebrow: 'Beleg-Scan mit KI',
      title: 'Halte die Kamera auf den Beleg',
      body:
        'Betrag, Händler und Datum füllen sich von selbst aus, und die App schlägt eine Kategorie vor. Du prüfst und speicherst – das ist ein Vorsprung, kein blindes Vertrauen.',
      bullets: [
        'Liest Gesamtbetrag, Händler, Datum und Posten aus',
        'Schlägt eine deiner eigenen Kategorien vor',
        'Du bestätigst jeden Wert vor dem Speichern',
      ],
      note:
        'Beim Beleg-Scan wird das Foto zur Verarbeitung an Google geschickt. Details stehen in der Datenschutzerklärung.',
    },
    insights: {
      eyebrow: 'Analysen',
      title: 'Der Monat, erklärt',
      body:
        'Deine größten Kategorien, deine häufigsten Ausgaben und die Tage, die am meisten kosten – aufbereitet, ohne dass du ein einziges Diagramm erstellen musst.',
      bullets: [
        'Größte Kategorie und größte einzelne Ausgabe',
        'Was du am häufigsten kaufst',
        'Tagesdurchschnitt und Ausgaben-Serien',
      ],
    },
    reports: {
      eyebrow: 'Berichte',
      title: 'Zwei Monate vergleichen',
      body:
        'Stelle den Vormonat dem aktuellen gegenüber, Kategorie für Kategorie, und sieh genau, was sich bewegt hat. Exportiere Berichte als PDF oder Excel, wenn du sie für deine Unterlagen brauchst.',
      bullets: [
        'Monat vs. Monat, nach Kategorie',
        'Einnahmen vs. Ausgaben über die Zeit',
        'Export als PDF oder Excel',
      ],
    },
    themes: {
      eyebrow: 'Personalisierung',
      title: 'Fünfzehn Designs, hell und dunkel',
      body:
        'Wähle eine Farbe, die dir Lust macht, die App zu öffnen. Die ganze Oberfläche – Ringe, Diagramme, Buttons – folgt dem Design, das du wählst.',
      bullets: [
        '15 Farbdesigns',
        'Vollständiger Hell- und Dunkelmodus',
        'Eigene Kategorien mit deinen Emojis',
      ],
    },
  },
  howItWorks: {
    eyebrow: 'So funktioniert es',
    titleA: 'Budget in',
    titleAccent: '3 einfachen Schritten',
    subtitle:
      'Kein Einrichtungsgespräch, keine Bank zum Verknüpfen, keine Tabelle zum Importieren. Heute Abend kannst du schon deine Ausgaben erfassen.',
    steps: [
      {
        title: 'Einnahmen festlegen',
        body:
          'Trag ein, was nach Steuern bei dir ankommt, und die App zeigt dir genau, wie viel du verteilen kannst.',
      },
      {
        title: 'Kategorien planen',
        body:
          'Gib jeder Kategorie einen Namen, ein Emoji und einen monatlichen Betrag. Wiederkehrende Kategorien stellst du auf automatisch.',
      },
      {
        title: 'Verfolgen & anpassen',
        body:
          'Erfasse Ausgaben in Sekunden und sieh, wie sich jede Kategorie füllt. Pass den Plan an, wann immer sich das Leben ändert.',
      },
    ],
  },
  privacy: {
    eyebrow: 'Datenschutz',
    title: 'Deine Daten bleiben deine',
    subtitle:
      'Bei Budget Your Budget bleiben deine Finanzdaten standardmäßig auf deinem Gerät, und die App funktioniert komplett offline. Cloud-Sync und das gemeinsame Budget sind da, wenn du sie willst – nie hinter deinem Rücken eingeschaltet.',
    points: [
      {
        title: 'Zuerst lokal',
        body:
          'Dein Budget liegt auf deinem Gerät und funktioniert vollständig offline. Ein Konto brauchst du nicht – und wenn du dich nie anmeldest, verlassen deine Finanzdaten nie dein Handy.',
      },
      {
        title: 'Cloud-Sync ist optional',
        body:
          'Melde dich nur an, wenn du dein Budget auf allen Geräten sichern oder es gemeinsam mit der Person nutzen willst, mit der du dein Geld teilst. Dein Konto und alles in der Cloud kannst du direkt in der App löschen.',
      },
      {
        title: 'Keine Werbung, kein Datenverkauf',
        body:
          'Wir zeigen keine Werbung, nutzen kein Werbe-SDK, verkaufen deine Daten nie und verfolgen dich nicht über andere Apps hinweg. Deine Daten kannst du jederzeit exportieren.',
      },
      {
        title: 'Keine Verbindung zur Bank',
        body:
          'Die App verbindet sich mit keiner Bank und keiner Karte. Wir fragen nie nach Bankzugangsdaten und können dein Geld nicht bewegen.',
      },
    ],
    cta: 'Datenschutzerklärung lesen',
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Häufige Fragen',
    items: [
      {
        q: 'Sind meine Daten wirklich privat?',
        a:
          'Dein Budget wird auf deinem Gerät gespeichert, und wenn du dich nie anmeldest, bleibt es dort – bei uns kommt nichts an. Die Anmeldung ist freiwillig, und erst dann können deine Daten in der Cloud gesichert oder mit einer Person geteilt werden, die du einlädst. Wir verkaufen deine Daten nie, zeigen nie Werbung und verbinden uns nie mit deiner Bank. Alle Details stehen in unserer Datenschutzerklärung.',
      },
      {
        q: 'Brauche ich ein Konto?',
        a:
          'Nein. Die App funktioniert komplett ohne Konto. Ein Konto brauchst du nur für die Cloud-Synchronisierung, für ein Gemeinsames Budget und um deinen Spitznamen und dein Foto zu ändern.',
      },
      {
        q: 'Was sieht die andere Person im gemeinsamen Budget?',
        a:
          'Ein gemeinsames Budget ist für zwei Personen. Ihr bearbeitet beide dasselbe Budget, gleichberechtigt: Jeder von euch kann jede Ausgabe darin – samt Notizen und Belegfoto – sehen und ändern, dazu die Kategorien und den Plan. Ihr seht eure beiden Einnahmen und die Summe für den Haushalt, aber deine eigenen Einnahmen änderst nur du. Jede Ausgabe zeigt, wer sie eingetragen hat. Deine Schulden, deine PIN, deine Einstellungen und deine Berichte werden nie geteilt. Beim Beitreten werden deine Daten in dieses Budget übernommen, und das lässt sich nicht rückgängig machen – lies also die Nutzungsbedingungen, bevor du eine Einladung annimmst.',
      },
      {
        q: 'Funktioniert die App offline?',
        a:
          'Ja. Die App läuft komplett auf deinem Gerät, du kannst dein Budget also ganz ohne Internetverbindung führen. Internet brauchst du nur für die optionalen Extras: Cloud-Synchronisierung, das Teilen eines Budgets, Belegscan und KI-Analysen.',
      },
      {
        q: 'Wie genau ist der Belegscan?',
        a:
          'Er liest die meisten gedruckten Belege gut, aber es ist KI, und die macht auch Fehler. Betrag, Händler und Datum werden aus dem Scan ausgefüllt, damit du sie vor dem Speichern prüfst – vergleiche sie immer mit dem Beleg selbst.',
      },
      {
        q: 'Kann ich meine Daten exportieren?',
        a:
          'Ja. Du kannst einen Bericht als PDF oder Excel exportieren, und Backup & Import speichert alle deine Daten in einer Datei, die dir gehört – so stecken sie nie in der App fest.',
      },
      {
        q: 'Was ist die Schneeball-Methode?',
        a:
          'Bei der Schneeball-Methode zahlst du zuerst deinen kleinsten Saldo ab. Jedes Mal, wenn du eine Schuld tilgst, kommt ihre Rate zur nächsten dazu – der Betrag, den du in deine Schulden steckst, wird also immer größer. Der Schuldenplaner sortiert deine Schulden und behält die Tilgung im Blick.',
      },
    ],
  },
  sharedPage: {
    metaTitle: 'Gemeinsames Budget – Budget Your Budget',
    eyebrow: 'Gemeinsames Budget',
    title: 'Ein Budget. Zwei Handys.',
    subtitle:
      'Die meisten Budgets scheitern in dem Moment, in dem zwei Personen ihr Geld teilen. Das Gemeinsame Budget bringt dich und die Person, mit der du dein Geld teilst, auf denselben Plan – jeder auf dem eigenen Handy, ohne Tabelle dazwischen.',
    heroCaption: 'Eine echte Kategorie in einem echten gemeinsamen Budget – beide Personen, ein Plan.',
    stepsTitle: 'So funktioniert es',
    stepsSubtitle: 'Drei Schritte, etwa eine Minute.',
    steps: [
      {
        title: 'Einladungscode erstellen',
        body:
          'Öffne Gemeinsames Budget und erstelle einen Code mit 8 Zeichen. Er gilt nur einmal und läuft nach 7 Tagen ab.',
      },
      {
        title: 'Code weitergeben',
        body:
          'Teile ihn, wie du willst. Behandle ihn wie ein Passwort – wer den Code hat, kann damit beitreten.',
      },
      {
        title: 'Ihr seid in einem Budget',
        body:
          'Die andere Person trägt ihre Einnahmen ein, eure Kategorien werden zu einem Plan, und beide Handys sind innerhalb von Sekunden auf demselben Stand.',
      },
    ],
    seeTitle: 'Was ihr beide seht',
    seeSubtitle:
      'Ein gemeinsames Budget bringt nur etwas, wenn ihr beide damit arbeiten könnt. Deshalb bearbeitet ihr beide denselben Plan, ohne Einschränkungen.',
    splitTitle: 'Teilt eine Kategorie unter euch',
    splitBody:
      'Legt fest, wer wie viel von Miete, Lebensmitteln oder allem anderen übernimmt. Jeder von euch hat seinen eigenen Anteil im Blick, und die Karte der Kategorie zeigt euch beide im Vergleich dazu.',
    attributionTitle: 'Jede Ausgabe zeigt, wer sie erfasst hat',
    attributionBody:
      'Kein „Warst du das?“ mehr. Jede Zeile trägt den Namen und das Foto der Person, die sie hinzugefügt hat, auf beiden Handys – so liest sich der Monat wie eine gemeinsame Aufzeichnung und nicht wie ein Rätsel.',
    privacyTitle: 'Was deins bleibt',
    privacySubtitle:
      'Ein Budget zu teilen heißt, das Budget zu teilen – und sonst nichts. Das hier bleibt für jeden privat, auf dem eigenen Handy.',
    sharedLabel: 'Geteilt mit der anderen Person',
    privateLabel: 'Bleibt privat für dich',
    sharedItems: [
      'Jede Ausgabe im Budget, mit ihren Notizen',
      'Belegfotos zu diesen Ausgaben',
      'Kategorien, geplante Beträge und die Aufteilung',
      'Beide Einnahmen und die Gesamtsumme',
      'Dein Spitzname und dein Profilbild',
    ],
    privateItems: [
      'Deine Schulden und Tilgungspläne',
      'Deine PIN und die Biometrie-Sperre',
      'Deine Berichte',
      'Deine bisherigen KI-Analysen',
      'Deine Einstellungen, dein Design und deine Sprache',
      'Deine E-Mail-Adresse',
    ],
    popsCategory: [
      {
        title: 'Dein Anteil auf einen Blick',
        body:
          'Was du laut eurer Absprache in dieser Kategorie übernimmst, und was du davon wirklich ausgegeben hast.',
      },
      {
        title: 'Der Anteil der anderen Person',
        body: 'Dieselbe Karte für die andere Person. So muss niemand nachfragen, wie sie gerade dasteht.',
      },
      {
        title: 'Teilt auf, wie ihr wollt',
        body: 'Ändert jederzeit, wer was übernimmt. Die Absprache ist eure – die App zählt nur mit.',
      },
      {
        title: 'Wer sie erfasst hat',
        body:
          'Jede Ausgabe trägt den Namen und das Foto der Person, die sie hinzugefügt hat, auf beiden Handys.',
      },
    ],
    popsBudget: [
      {
        title: 'Beide Einnahmen, ein Plan',
        body: 'Geplant wird der Monat mit eurer Gesamtsumme, nicht nur mit deinen Einnahmen.',
      },
      {
        title: 'Wer gibt was aus',
        body: 'Eine Karte pro Person, nebeneinander – über die Aufteilung müsst ihr nie zweimal reden.',
      },
      {
        title: 'Ein Ring für euch beide',
        body: 'Jede Kategorie, aus der ihr beide zahlt, in einem Bild des Monats.',
      },
    ],
    honestTitle: 'Bevor du jemanden einlädst',
    honestBody:
      'Zwei Personen, die ihr Geld teilen, müssen der App vertrauen können – deshalb hier die klare Version: Die andere Person sieht die Ausgaben, Notizen und Belege im Budget, und beim Beitreten werden deine Daten in dieses Budget übernommen, was sich nicht rückgängig machen lässt. Nur der Budget-Inhaber kann jemanden entfernen; wer beigetreten ist, kann das Budget jederzeit verlassen.',
    honestCta: 'Nachlesen, was geteilt wird',
    ctaTitle: 'Werdet euch einig',
    ctaSubtitle: 'Kostenlos für iOS und Android. Lade die andere Person ein.',
  },
  cta: {
    title: 'Starte noch heute dein Budget',
    subtitle: 'Kostenlos für iOS und Android. Richte es heute Abend ein – am Zahltag wirst du es dir danken.',
  },
  footer: {
    tagline:
      'Eine freundliche App fürs tägliche Budget, die dir hilft, deine Ausgaben zu erfassen, den Monat zu planen und deine Ziele im Blick zu behalten.',
    product: 'Produkt',
    legal: 'Rechtliches',
    connect: 'Kontakt',
    terms: 'Nutzungsbedingungen',
    privacy: 'Datenschutzerklärung',
    madeWith: 'Gemacht mit',
  },
  meta: {
    title: 'Budget Your Budget – Clever budgetieren, ganz einfach',
    description:
      'Eine freundliche App fürs tägliche Budget, die dir hilft, deine Ausgaben zu erfassen, den Monat zu planen und deine Ziele im Blick zu behalten. Verfügbar für iOS und Android.',
  },
  legal: {
    docLanguage: 'Sprache des Dokuments',
  },
  common: {
    backHome: 'Zur Startseite',
    appStore: 'Laden im App Store',
    googlePlay: 'Jetzt bei Google Play',
  },
};
