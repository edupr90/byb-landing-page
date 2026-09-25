/*
 * Latin American Spanish (es-419). Mirrors en.js key for key — see the note at
 * the top of that file: it is the source of truth for every CLAIM here, and a
 * translation that improves on a sentence by saying something new is a bug.
 *
 * Voice: informal "tú", neutral LatAm, and the shipping app's own words —
 * "Presupuesto compartido", "Planificador de Deudas", "Reportes", "Análisis",
 * "BYB+" — taken from lib/l10n/app_es.arb rather than chosen here, so the site
 * and the app never call the same thing two different things.
 *
 * The /terms and /privacypolicy documents are deliberately NOT in this voice:
 * they use formal "usted" and live as prose in pages/Terms.jsx and
 * pages/PrivacyPolicy.jsx. Only this file's `legal` block is site chrome.
 */
export default {
  nav: {
    features: 'Funciones',
    shared: 'Presupuesto compartido',
    faq: 'Preguntas',
    language: 'Idioma',
    soon: 'Pronto',
    getApp: 'Descarga la app',
    menu: 'Menú',
    theme: 'Cambiar modo oscuro',
  },
  hero: {
    badge: 'Gratis en iOS y Android',
    titleA: 'Toma el control',
    titleB: 'de tu',
    titleAccent: 'dinero',
    subtitle:
      'Planifica el mes, registra lo que gastas y mira cada categoría de un vistazo. Budget Your Budget lo hace tan simple que de verdad lo sigues haciendo.',
    rating: '4.8',
    statRating: 'en App Store',
    statPrivate: 'Funciona sin conexión',
    statFree: 'Gratis para empezar',
    caption: 'La app de verdad — estas pantallas están en vivo, no son fotos.',
  },
  features: {
    eyebrow: 'Todo lo que necesitas',
    title: 'Hecho para tu forma real de presupuestar',
    subtitle:
      'Sin claves de banco, sin hojas de cálculo, sin sermones. Escribe lo que ganas, planifica en qué se va y la app hace las cuentas.',
    items: [
      {
        title: 'Planea por categoría',
        body:
          'Dale un monto mensual a cada categoría y mira cómo se vacía el anillo mientras gastas. Pasarte del plan se nota antes del día de pago, no después.',
      },
      {
        title: 'Registra en segundos',
        body:
          'Agregar un gasto toma un toque y un número. Los emojis y los colores hacen que cada categoría se lea de un vistazo.',
      },
      {
        title: 'Escanea tus recibos',
        body:
          'Toma una foto del recibo y el monto, el comercio y la fecha se completan solos. Revisa los datos antes de guardar — la IA los lee, tú los confirmas.',
      },
      {
        title: 'Comparte con tu pareja',
        body:
          'Un presupuesto, dos teléfonos. Cada gasto muestra quién lo registró y los dos ven el total del hogar.',
      },
      {
        title: 'Acaba con tu deuda',
        body:
          'Anota lo que debes y el Planificador de Deudas ordena tus pagos con el método Snowball: al terminar una deuda, sumas ese pago a la siguiente.',
      },
      {
        title: 'Ve los patrones',
        body:
          'Los Reportes comparan meses, destacan tus categorías más grandes y muestran a dónde se va el dinero sin que lo notes.',
      },
      {
        title: 'Hazla tuya',
        body:
          'Quince temas de color, claro y oscuro, más categorías personalizadas con tus propios nombres y emojis.',
      },
      {
        title: 'Tuyo y privado',
        body:
          'Funciona completamente sin conexión y sin cuenta. Inicia sesión solo si quieres respaldo en la nube o un presupuesto compartido.',
      },
    ],
  },
  showcase: {
    plan: {
      eyebrow: 'Planificación',
      title: 'En qué se va, antes de que se vaya',
      body:
        'Ponle un plan a cada categoría al empezar el mes. El anillo se llena conforme gastas, así una categoría en problemas salta a la vista de inmediato — y al tocarla se abre todo lo que gastaste en ella.',
      bullets: [
        'Un pétalo por categoría, del tamaño de su parte del plan',
        'El color cambia conforme una categoría se acerca a su límite',
        'Toca una categoría y ve todo su historial',
      ],
    },
    track: {
      eyebrow: 'Seguimiento',
      title: 'Cada gasto, en una lista',
      body:
        'Busca, filtra por categoría y revisa el mes de un vistazo. Adjunta la foto del recibo a cualquier gasto que después tengas que comprobar.',
      bullets: [
        'Filtra por categoría o busca por nombre',
        'Los gastos recurrentes se agregan solos',
        'Adjunta un recibo a cualquier gasto',
      ],
    },
    shared: {
      eyebrow: 'Presupuesto compartido · Nuevo',
      title: 'Un presupuesto, dos teléfonos',
      body:
        'Invita a tu pareja con un código y comparten un solo presupuesto. Los dos pueden agregar y editar, cada gasto muestra quién lo registró y el plan cuenta los ingresos de ambos.',
      bullets: [
        'Los gastos aparecen en el otro teléfono en segundos',
        'Cada fila muestra quién registró el gasto',
        'Los ingresos de los dos cuentan para un solo plan',
        'Tus deudas, ajustes y PIN nunca se comparten',
      ],
      note:
        'Compartir un presupuesto significa que tu pareja ve los gastos, notas y recibos que contiene. Lee los Términos de uso antes de invitar a alguien.',
      noteLink: 'Qué se comparte →',
      cta: 'Explora Presupuesto compartido',
    },
    scan: {
      eyebrow: 'Escaneo de recibos con IA',
      title: 'Apunta la cámara al recibo',
      body:
        'El total, el comercio y la fecha se completan solos, y la app sugiere una categoría. Tú revisas y guardas — te adelanta el trabajo, no te pide fe ciega.',
      bullets: [
        'Lee total, comercio, fecha y artículos automáticamente',
        'Sugiere una de tus propias categorías',
        'Tú confirmas cada dato antes de guardarlo',
      ],
      note:
        'El escaneo de recibos envía la foto a Google para procesarla. Los detalles, en la Política de Privacidad.',
    },
    insights: {
      eyebrow: 'Análisis',
      title: 'El mes, explicado',
      body:
        'Tus categorías más grandes, tus gastos más frecuentes y los días que más te cuestan — presentados sin que tengas que armar una sola gráfica.',
      bullets: [
        'La categoría más grande y el gasto más alto',
        'Lo que compras más seguido',
        'Promedios diarios y rachas de gasto',
      ],
    },
    reports: {
      eyebrow: 'Reportes',
      title: 'Compara un mes con otro',
      body:
        'Pon el mes pasado frente a este, categoría por categoría, y mira exactamente qué cambió. Exporta a PDF o Excel cuando necesites un registro.',
      bullets: [
        'Mes a mes, por categoría',
        'Ingresos frente a gastos a lo largo del tiempo',
        'Exporta a PDF o Excel',
      ],
    },
    themes: {
      eyebrow: 'Personalización',
      title: 'Quince temas, claro y oscuro',
      body:
        'Elige un color que te dé ganas de abrir la app. Toda la interfaz — anillos, gráficas, botones — sigue el tema que elijas.',
      bullets: [
        '15 temas de color',
        'Modo claro y oscuro completo',
        'Categorías personalizadas con tus emojis',
      ],
    },
  },
  howItWorks: {
    eyebrow: 'Cómo funciona',
    titleA: 'Tu presupuesto en',
    titleAccent: '3 pasos simples',
    subtitle:
      'Sin llamada de configuración, sin conectar el banco, sin hoja de cálculo que importar. Esta noche ya puedes registrar tus gastos.',
    steps: [
      {
        title: 'Define tu ingreso',
        body:
          'Agrega tu ingreso neto, después de impuestos, y la app te muestra exactamente cuánto tienes por asignar.',
      },
      {
        title: 'Planea tus categorías',
        body:
          'Dale a cada categoría un nombre, un emoji y un monto mensual. Haz automáticas las recurrentes.',
      },
      {
        title: 'Registra y ajusta',
        body:
          'Registra gastos en segundos y mira cómo se llena cada categoría. Ajusta el plan cuando la vida cambie.',
      },
    ],
  },
  privacy: {
    eyebrow: 'Privacidad',
    title: 'Tus datos, siempre tuyos',
    subtitle:
      'Budget Your Budget guarda tu presupuesto en tu dispositivo por defecto y funciona completamente sin conexión. La sincronización en la nube y el presupuesto compartido están ahí cuando los quieras — nunca se activan a tus espaldas.',
    points: [
      {
        title: 'Local primero',
        body:
          'Tu presupuesto se guarda en tu dispositivo y funciona totalmente sin conexión. No necesitas cuenta — y si nunca inicias sesión, tus datos financieros nunca salen de tu teléfono.',
      },
      {
        title: 'Sincronizar es opcional',
        body:
          'Inicia sesión solo si quieres tener tu presupuesto respaldado y al día en todos tus dispositivos, o compartirlo con tu pareja. Puedes eliminar tu cuenta y todo lo que hay en la nube desde la app.',
      },
      {
        title: 'Sin anuncios ni venta de datos',
        body:
          'No mostramos anuncios, no usamos ningún SDK de publicidad y nunca vendemos tu información ni te rastreamos en otras apps. Exporta tus datos cuando quieras.',
      },
      {
        title: 'Nunca tocamos tu banco',
        body:
          'La app no se conecta a ningún banco ni tarjeta. Nunca te pedimos credenciales bancarias y no podemos mover tu dinero.',
      },
    ],
    cta: 'Lee la Política de Privacidad',
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Preguntas frecuentes',
    items: [
      {
        q: '¿Mis datos son realmente privados?',
        a:
          'Tu presupuesto se guarda en tu dispositivo y, si nunca inicias sesión, ahí se queda — no recibimos nada. Iniciar sesión es opcional, y solo entonces tus datos pueden respaldarse en la nube o compartirse con la pareja que invites. Nunca vendemos tus datos, nunca mostramos anuncios y nunca nos conectamos a tu banco. Los detalles completos están en nuestra Política de Privacidad.',
      },
      {
        q: '¿Necesito una cuenta?',
        a:
          'No. La app funciona por completo sin cuenta. Solo necesitas una cuenta para la sincronización en la nube, para un Presupuesto compartido y para editar tu nombre y tu foto de perfil.',
      },
      {
        q: '¿Qué ve mi pareja en un presupuesto compartido?',
        a:
          'Un presupuesto compartido es para dos personas. Ambos editan por igual el mismo presupuesto: cada quien puede ver y cambiar cada gasto — incluidas sus notas y la foto del recibo — además de las categorías y el plan. Los dos ven el ingreso del otro y el total del hogar, pero tu propio ingreso solo lo editas tú. Cada gasto muestra quién lo registró. Tus deudas, tu PIN, tus ajustes y tus reportes nunca se comparten. Unirte combina tus datos con ese presupuesto y no se puede deshacer, así que lee los Términos de uso antes de aceptar una invitación.',
      },
      {
        q: '¿Funciona sin conexión?',
        a:
          'Sí. La app funciona por completo en tu dispositivo, así que puedes llevar tu presupuesto sin ninguna conexión a internet. Solo necesitas internet para los extras opcionales: la sincronización en la nube, compartir un presupuesto, el escaneo de recibos y el análisis con IA.',
      },
      {
        q: '¿Qué tan preciso es el escáner de recibos?',
        a:
          'Lee bien la mayoría de los recibos impresos, pero es IA y sí se equivoca. El total, el comercio y la fecha se completan para que los revises antes de guardar — siempre compáralos con el recibo.',
      },
      {
        q: '¿Puedo exportar mis datos?',
        a:
          'Sí. Puedes exportar un reporte a PDF o Excel, y Respaldo e Importación guarda todos tus datos en un archivo que es tuyo, así que nunca quedan atrapados.',
      },
      {
        q: '¿Qué es el método Snowball?',
        a:
          'El método Snowball liquida primero tu saldo más pequeño. Cuando una deuda queda saldada, sumas su pago a la siguiente, así que el monto que le destinas a tu deuda no deja de crecer. El Planificador de Deudas ordena tus deudas y sigue tu progreso hasta liquidarlas.',
      },
    ],
  },
  sharedPage: {
    metaTitle: 'Presupuesto compartido — Budget Your Budget',
    eyebrow: 'Presupuesto compartido',
    title: 'Un presupuesto. Dos\u00a0teléfonos.',
    subtitle:
      'La mayoría de los presupuestos se vienen abajo en cuanto dos personas comparten el dinero. Presupuesto compartido los pone a ti y a tu pareja en el mismo plan, cada uno en su teléfono, sin una hoja de cálculo en medio.',
    heroCaption: 'Una categoría real de un presupuesto compartido real — las dos personas, un solo plan.',
    stepsTitle: 'Cómo funciona',
    stepsSubtitle: 'Tres pasos, como un minuto.',
    steps: [
      {
        title: 'Crea un código de invitación',
        body:
          'Desde la pantalla de Presupuesto compartido, genera un código de 8 caracteres. Se usa una sola vez y vence en 7 días.',
      },
      {
        title: 'Envíaselo a tu pareja',
        body:
          'Compártelo como quieras. Trátalo como una contraseña — quien tenga el código puede usarlo para unirse.',
      },
      {
        title: 'Ya comparten un presupuesto',
        body:
          'La otra persona añade sus ingresos, tus categorías se unen en un solo plan y los dos teléfonos quedan al día en segundos.',
      },
    ],
    seeTitle: 'Lo que ven los dos',
    seeSubtitle:
      'Compartir un presupuesto solo sirve si los dos pueden hacer algo con él, así que ambos pueden editar todo el plan por igual.',
    splitTitle: 'Divide una categoría entre los\u00a0dos',
    splitBody:
      'Decidan quién cubre cuánto de la renta, el supermercado o lo que sea. Cada uno tiene su propia parte que seguir, y la tarjeta de la categoría muestra cómo van los dos.',
    attributionTitle: 'Cada gasto dice quién lo registró',
    attributionBody:
      'Se acabó el "¿eso fuiste tú?". Cada línea lleva el nombre y la foto de quien la agregó, en los dos teléfonos, así el mes se lee como un registro compartido y no como un misterio.',
    privacyTitle: 'Lo que sigue siendo tuyo',
    privacySubtitle:
      'Compartir un presupuesto comparte el presupuesto — y nada más. Esto sigue siendo privado para cada persona, en su propio teléfono.',
    sharedLabel: 'Se comparte con tu pareja',
    privateLabel: 'Sigue siendo privado para ti',
    sharedItems: [
      'Todos los gastos del presupuesto, con sus notas',
      'Las fotos de recibos adjuntas a esos gastos',
      'Las categorías, los montos planeados y la división',
      'Los ingresos de ambos y el total del hogar',
      'Tu nombre y tu foto de perfil',
    ],
    privateItems: [
      'Tus deudas y tus planes de pago',
      'Tu PIN de la app y el bloqueo biométrico',
      'Tus reportes',
      'Tu historial de consejos con IA',
      'Tus ajustes, tema e idioma',
      'Tu correo electrónico',
    ],
    popsCategory: [
      {
        title: 'Tu parte, de un vistazo',
        body: 'Lo que acordaste cubrir en esta categoría, y lo que llevas gastado de ahí.',
      },
      {
        title: 'Y la de tu pareja',
        body: 'La misma tarjeta para tu pareja. Nadie tiene que preguntar cómo va la otra persona.',
      },
      {
        title: 'Divídanlo como quieran',
        body: 'Cambien quién cubre qué cuando quieran. El acuerdo es suyo — la app solo lleva la cuenta.',
      },
      {
        title: 'Quién lo registró',
        body: 'Cada gasto lleva el nombre y la foto de quien lo agregó, en los dos teléfonos.',
      },
    ],
    popsBudget: [
      {
        title: 'Dos ingresos, un plan',
        body: 'El mes se planea con el total del hogar, no solo con lo tuyo.',
      },
      {
        title: 'Quién gasta cuánto',
        body:
          'Una tarjeta para cada uno, lado a lado, para que la división nunca sea una conversación que haya que repetir.',
      },
      {
        title: 'Un solo anillo para el hogar',
        body: 'Todas las categorías de las que gastan los dos, en una sola imagen del mes.',
      },
    ],
    honestTitle: 'Antes de invitar a alguien',
    honestBody:
      'Dos personas que comparten dinero necesitan poder confiar en la herramienta, así que aquí va la versión clara: tu pareja verá los gastos, las notas y los recibos del presupuesto, y cuando se una, tus datos se combinan con él de una forma que no se puede deshacer. Solo el dueño del presupuesto puede quitar a un miembro; un miembro puede salir cuando quiera.',
    honestCta: 'Lee qué se comparte',
    ctaTitle: 'Pónganse de acuerdo',
    ctaSubtitle: 'Gratis en iOS y Android. Trae a tu pareja.',
  },
  cta: {
    title: 'Empieza tu presupuesto hoy',
    subtitle: 'Gratis en iOS y Android. Configúralo esta noche y te lo agradecerás el día de pago.',
  },
  footer: {
    tagline:
      'Una app amigable de presupuesto diario que te ayuda a registrar tus gastos, planificar el mes y no perder de vista tus metas.',
    product: 'Producto',
    legal: 'Legal',
    connect: 'Contacto',
    terms: 'Términos de uso',
    privacy: 'Política de Privacidad',
    madeWith: 'Hecho con',
  },
  meta: {
    title: 'Budget Your Budget — Presupuesto inteligente y simple',
    description:
      'Una app amigable de presupuesto diario que te ayuda a registrar tus gastos, planificar el mes y no perder de vista tus metas. Disponible en iOS y Android.',
  },
  legal: {
    docLanguage: 'Idioma del documento',
  },
  common: {
    backHome: 'Volver al inicio',
    appStore: 'Descárgalo en el App Store',
    googlePlay: 'Disponible en Google Play',
  },
};
