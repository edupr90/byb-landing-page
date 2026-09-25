/*
 * Brazilian Portuguese (pt-BR). Mirrors en.js key for key — see the note at the
 * top of that file: it is the source of truth for every CLAIM here, and a
 * translation that improves on a sentence by saying something new is a bug.
 *
 * Voice: você, Brazilian throughout (tela, celular, app, planejar,
 * compartilhar — never ecrã, telemóvel, planear, partilhar), and the shipping
 * app's own words — Orçamento compartilhado, Planejador de dívidas, Método Bola
 * de Neve, Relatórios, Análises, renda, BYB+ — taken from lib/l10n/app_pt.arb
 * rather than chosen here.
 *
 * THE OTHER PERSON IN A SHARED BUDGET IS NEVER GENDERED. Portuguese forces
 * gender on parceiro/parceira and the app refuses to guess: it writes "a outra
 * pessoa" (sharedBudgetIncomeNotice) and "quem divide o dinheiro"
 * (reportsPaywallRp3Body). This file follows that, and recasts around "vocês
 * dois" where the English says "your partner". Keep it that way.
 *
 * The /terms and /privacypolicy documents are NOT translated into Portuguese —
 * they exist in English and Spanish only, as prose in pages/Terms.jsx and
 * pages/PrivacyPolicy.jsx. A Brazilian visitor gets the English document and
 * the EN/ES switch. Only this file's `legal` block is site chrome.
 */
export default {
  nav: {
    features: 'Recursos',
    shared: 'Orçamento compartilhado',
    faq: 'Perguntas',
    language: 'Idioma',
    soon: 'Em breve',
    getApp: 'Baixe o app',
    menu: 'Menu',
    theme: 'Alternar modo escuro',
  },
  hero: {
    badge: 'Grátis no iOS e Android',
    titleA: 'Tome o controle',
    titleB: 'do seu',
    titleAccent: 'dinheiro',
    subtitle:
      'Planeje o mês, registre o que você gasta e acompanhe cada categoria num relance. O Budget Your Budget mantém tudo simples o bastante para você continuar de verdade.',
    rating: '4,8',
    statRating: 'na App Store',
    statPrivate: 'Funciona offline',
    statFree: 'Grátis para começar',
    caption: 'O app de verdade — estas telas rodam ao vivo, não são fotos.',
  },
  features: {
    eyebrow: 'Tudo que você precisa',
    title: 'Feito para o seu jeito real de planejar',
    subtitle:
      'Sem login de banco, sem planilhas, sem sermão. Digite o que você ganha, planeje para onde vai e o app faz as contas.',
    items: [
      {
        title: 'Planeje por categoria',
        body:
          'Dê um valor mensal a cada categoria e veja o anel esvaziar conforme você gasta. Passar do plano fica óbvio antes do dia do pagamento, não depois.',
      },
      {
        title: 'Registre em segundos',
        body:
          'Adicionar uma despesa é um toque e um número. Emojis e cores deixam as categorias fáceis de ler num relance.',
      },
      {
        title: 'Escaneie seus recibos',
        body:
          'Fotografe um recibo e o valor, o estabelecimento e a data se preenchem sozinhos. Confira os números antes de salvar — a IA lê, você confirma.',
      },
      {
        title: 'Compartilhe com outra pessoa',
        body:
          'Um orçamento, dois celulares. Cada despesa mostra quem registrou, e vocês dois veem o total da casa.',
      },
      {
        title: 'Quite suas dívidas',
        body:
          'Liste o que você deve e o Planejador de dívidas organiza a quitação pelo método Bola de Neve: cada dívida quitada vira o pagamento da próxima.',
      },
      {
        title: 'Veja os padrões',
        body:
          'Os Relatórios comparam meses, destacam suas maiores categorias e mostram para onde o dinheiro vai sem você perceber.',
      },
      {
        title: 'Deixe do seu jeito',
        body:
          'Quinze temas de cor, claro e escuro, além de categorias personalizadas com seus próprios nomes e emojis.',
      },
      {
        title: 'Seu e privado',
        body:
          'Funciona totalmente offline e sem conta. Você só entra se quiser backup na nuvem ou um orçamento compartilhado.',
      },
    ],
  },
  showcase: {
    plan: {
      eyebrow: 'Planejamento',
      title: 'Para onde vai o dinheiro, antes de ir',
      body:
        'Defina um plano para cada categoria no início do mês. O anel se preenche conforme você gasta, então uma categoria em apuros salta aos olhos na hora — e, ao tocar nela, você vê tudo o que gastou ali.',
      bullets: [
        'Uma pétala por categoria, do tamanho da fatia dela no plano',
        'A cor muda conforme a categoria se aproxima do limite',
        'Toque numa categoria e veja todo o histórico',
      ],
    },
    track: {
      eyebrow: 'Acompanhamento',
      title: 'Cada despesa, numa lista',
      body:
        'Busque, filtre por categoria e veja o mês inteiro num relance. Anexe a foto do recibo a qualquer despesa que você possa precisar comprovar depois.',
      bullets: [
        'Filtre por categoria ou busque pelo nome',
        'As despesas recorrentes entram sozinhas',
        'Qualquer despesa pode ter a foto do recibo',
      ],
    },
    shared: {
      eyebrow: 'Orçamento compartilhado · Novo',
      title: 'Um orçamento, dois celulares',
      body:
        'Envie um código de convite para a pessoa com quem você divide o dinheiro e vocês ficam com um orçamento só. Vocês dois podem adicionar e editar, cada despesa mostra quem registrou e o plano soma as duas rendas.',
      bullets: [
        'As despesas aparecem no outro celular em segundos',
        'Cada linha mostra quem registrou',
        'As duas rendas contam para o mesmo plano da casa',
        /* One line in the 363px card at lg; the explicit negation does not fit
         there with the app's own term. "Ajustes" would fit but means the iOS
         Settings app in this app's Portuguese, never BYB's own settings. */
      'Dívidas, PIN e configurações ficam só com você',
      ],
      note:
        'Compartilhar um orçamento significa que a outra pessoa vê as despesas, as notas e os recibos que estão nele. Leia os Termos de Uso antes de convidar alguém.',
      noteLink: 'O que é compartilhado →',
      cta: 'Conheça o Orçamento compartilhado',
    },
    scan: {
      eyebrow: 'Leitura de recibos com IA',
      title: 'Aponte a câmera para o recibo',
      body:
        'O total, o estabelecimento e a data se preenchem sozinhos, e o app sugere uma categoria. Você confere e salva — é um adiantamento do trabalho, não um ato de fé.',
      bullets: [
        'Lê total, estabelecimento, data e itens automaticamente',
        'Sugere uma das suas próprias categorias',
        'Você confirma cada valor antes de salvar',
      ],
      note:
        'O escaneamento do recibo envia a foto para o Google processar. Os detalhes estão na Política de Privacidade.',
    },
    insights: {
      eyebrow: 'Análises',
      title: 'O mês, explicado',
      body:
        'Suas maiores categorias, seus gastos mais frequentes e os dias que mais pesam — tudo pronto, sem você precisar montar um único gráfico.',
      bullets: [
        'Maior categoria e maior despesa individual',
        'O que você compra com mais frequência',
        'Médias diárias e sequências de gastos',
      ],
    },
    reports: {
      eyebrow: 'Relatórios',
      title: 'Compare um mês ao outro',
      body:
        'Ponha o mês passado ao lado deste, categoria por categoria, e veja exatamente o que mudou. Exporte para PDF ou Excel quando precisar de um registro.',
      bullets: [
        'Mês a mês, por categoria',
        'Renda vs despesas ao longo do tempo',
        'Exporte para PDF ou Excel',
      ],
    },
    themes: {
      eyebrow: 'Personalização',
      title: 'Quinze temas, claro e escuro',
      body:
        'Escolha uma cor que dê vontade de abrir o app. A interface inteira — anéis, gráficos, botões — segue o tema que você escolher.',
      bullets: [
        '15 temas de cor',
        'Modo claro e escuro completo',
        'Categorias personalizadas com seus emojis',
      ],
    },
  },
  howItWorks: {
    eyebrow: 'Como funciona',
    titleA: 'Orçamento em',
    titleAccent: '3 passos simples',
    subtitle:
      'Sem telefonema de configuração, sem conectar o banco, sem planilha para importar. Hoje à noite você já começa a registrar.',
    steps: [
      {
        title: 'Defina sua renda',
        body:
          'Adicione sua renda líquida, depois dos impostos, e o app mostra exatamente quanto você tem a distribuir.',
      },
      {
        title: 'Planeje as categorias',
        body:
          'Dê a cada categoria um nome, um emoji e um valor mensal. Deixe as recorrentes no automático.',
      },
      {
        title: 'Acompanhe e ajuste',
        body:
          'Registre despesas em segundos e veja cada categoria ir enchendo. Ajuste o plano sempre que a vida mudar.',
      },
    ],
  },
  privacy: {
    eyebrow: 'Privacidade',
    title: 'Seus dados são só seus',
    subtitle:
      'O Budget Your Budget guarda seu orçamento no seu dispositivo por padrão e funciona completamente offline. A sincronização na nuvem e o compartilhamento estão ali quando você quiser — nunca ativamos nada pelas suas costas.',
    points: [
      {
        title: 'Local primeiro',
        body:
          'Seu orçamento fica salvo no seu dispositivo e funciona totalmente offline. Não precisa de conta — e, se você nunca fizer login, seus dados financeiros nunca saem do seu celular.',
      },
      {
        title: 'Sincronizar é opcional',
        body:
          'Faça login só se quiser ter backup do seu orçamento em todos os seus dispositivos ou compartilhá-lo com quem você divide o dinheiro. Você pode excluir sua conta e tudo o que está na nuvem pelo próprio app.',
      },
      {
        title: 'Sem anúncios, sem venda de dados',
        body:
          'Não mostramos anúncios, não usamos nenhum SDK de publicidade e nunca vendemos suas informações nem rastreamos você em outros apps. Exporte seus dados quando quiser.',
      },
      {
        title: 'Nunca tocamos no seu banco',
        body:
          'O app não se conecta a nenhum banco nem cartão. Nunca pedimos credenciais bancárias e não temos como mover seu dinheiro.',
      },
    ],
    cta: 'Leia a Política de Privacidade',
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Perguntas frequentes',
    items: [
      {
        q: 'Meus dados são mesmo privados?',
        a:
          'Seu orçamento fica salvo no seu dispositivo e, se você nunca entrar na sua conta, ele fica só aí — não recebemos nada. Entrar é opcional, e só então seus dados podem ter backup na nuvem ou ser compartilhados com quem você convidar. Nunca vendemos seus dados, nunca mostramos anúncios e nunca nos conectamos ao seu banco. Todos os detalhes estão na nossa Política de Privacidade.',
      },
      {
        q: 'Preciso de uma conta?',
        a:
          'Não. O app funciona por completo sem conta. A conta só é necessária para a sincronização na nuvem, para o Orçamento compartilhado e para editar seu apelido e sua foto.',
      },
      {
        q: 'O que a outra pessoa vê no orçamento compartilhado?',
        a:
          'Um orçamento compartilhado é para duas pessoas. Vocês dois editam o mesmo orçamento, com o mesmo acesso a tudo: cada um pode ver e alterar qualquer despesa — incluindo as notas e a foto do recibo — além das categorias e do plano. Os dois veem as duas rendas e o total da casa, mas só você edita a sua renda. Cada despesa mostra quem registrou. Suas dívidas, seu PIN, suas configurações e seus relatórios nunca são compartilhados. Entrar no orçamento junta seus dados a ele e não dá para desfazer, então leia os Termos de Uso antes de aceitar um convite.',
      },
      {
        q: 'Funciona offline?',
        a:
          'Sim. O app roda inteiramente no seu dispositivo, então você acompanha seu orçamento sem nenhuma conexão com a internet. A internet só é necessária para os extras opcionais: sincronização na nuvem, orçamento compartilhado, escaneamento de recibos e análises com IA.',
      },
      {
        q: 'Quão preciso é o escâner de recibos?',
        a:
          'Ele lê bem a maioria dos recibos impressos, mas é IA e erra sim. O valor, o estabelecimento e a data vêm preenchidos para você conferir antes de salvar — sempre compare com o próprio recibo.',
      },
      {
        q: 'Posso exportar meus dados?',
        a:
          'Sim. Você pode exportar um relatório em PDF ou Excel, e o Backup e importação salva todos os seus dados em um arquivo que fica com você, então seus dados nunca ficam presos aqui.',
      },
      {
        q: 'O que é o método Bola de Neve?',
        a:
          'O método Bola de Neve quita primeiro o seu menor saldo. Cada vez que você quita uma dívida, soma esse pagamento à próxima, então o valor que vai para as dívidas só cresce. O Planejador de dívidas ordena suas dívidas e acompanha a quitação.',
      },
    ],
  },
  sharedPage: {
    metaTitle: 'Orçamento compartilhado — Budget Your Budget',
    eyebrow: 'Orçamento compartilhado',
    title: 'Um orçamento. Dois celulares.',
    subtitle:
      'A maioria dos orçamentos desmorona no momento em que duas pessoas dividem o dinheiro. O Orçamento compartilhado coloca vocês dois no mesmo plano, cada um no seu celular, sem planilha no meio.',
    heroCaption: 'Uma categoria real de um orçamento compartilhado real — as duas pessoas, um só plano.',
    stepsTitle: 'Como funciona',
    stepsSubtitle: 'Três passos, cerca de um minuto.',
    steps: [
      {
        title: 'Crie um código de convite',
        body:
          'Na tela de Orçamento compartilhado, gere um código de 8 caracteres. Ele pode ser usado uma vez e vence em 7 dias.',
      },
      {
        title: 'Envie para a outra pessoa',
        body:
          'Compartilhe como quiser. Trate como uma senha — quem tiver o código pode usá-lo para entrar.',
      },
      {
        title: 'Agora é um só orçamento',
        body:
          'A outra pessoa adiciona a própria renda, suas categorias viram um só plano e os dois celulares ficam em dia em segundos.',
      },
    ],
    seeTitle: 'O que os dois veem',
    seeSubtitle:
      'Compartilhar um orçamento só é útil se os dois puderem mexer nele, então vocês dois editam o mesmo plano por inteiro.',
    splitTitle: 'Divida uma categoria entre vocês',
    splitBody:
      'Decidam quem cobre quanto do aluguel, do mercado ou de qualquer outra coisa. Cada um fica com a própria parte para acompanhar, e a categoria mostra como vocês dois estão indo.',
    attributionTitle: 'Cada despesa mostra quem registrou',
    attributionBody:
      'Acabou o "foi você?". Cada linha traz o nome e a foto de quem adicionou, nos dois celulares, então o mês vira um registro compartilhado em vez de um mistério.',
    privacyTitle: 'O que continua seu',
    privacySubtitle:
      'Compartilhar um orçamento compartilha o orçamento — e nada mais. Estes itens continuam privados para cada pessoa, no próprio celular.',
    sharedLabel: 'Compartilhado entre vocês',
    privateLabel: 'Continua privado para você',
    sharedItems: [
      'Todas as despesas do orçamento, com as notas',
      'As fotos de recibo anexadas a essas despesas',
      'Categorias, valores planejados e a divisão',
      'As duas rendas e o total da casa',
      'Seu nome e sua foto de perfil',
    ],
    privateItems: [
      'Suas dívidas e seus planos de pagamento',
      'Seu PIN do app e o bloqueio por biometria',
      'Seus relatórios',
      'Seu histórico de análises com IA',
      'Suas configurações, tema e idioma',
      'Seu e-mail',
    ],
    popsCategory: [
      {
        title: 'Sua parte, num relance',
        body: 'O que você combinou cobrir nesta categoria e o quanto já gastou dela.',
      },
      {
        title: 'E a da outra pessoa',
        body: 'A mesma coisa do outro lado. Ninguém precisa perguntar como cada um está indo.',
      },
      {
        title: 'Dividam como quiserem',
        body: 'Mudem quem cobre o quê a qualquer momento. O acordo é de vocês — o app só faz as contas.',
      },
      {
        title: 'Quem registrou',
        body: 'Cada despesa traz o nome e a foto de quem adicionou, nos dois celulares.',
      },
    ],
    popsBudget: [
      {
        title: 'Duas rendas, um só plano',
        body: 'O mês é planejado com o total da casa, não só com a sua renda.',
      },
      {
        title: 'Quem está gastando o quê',
        body: 'Um resumo para cada pessoa, lado a lado, para não precisar falar da divisão duas vezes.',
      },
      {
        title: 'Um anel para a casa toda',
        body: 'Todas as categorias em que vocês dois gastam, em uma só imagem do mês.',
      },
    ],
    honestTitle: 'Antes de convidar alguém',
    honestBody:
      'Duas pessoas que dividem o dinheiro precisam poder confiar na ferramenta, então aqui vai a versão direta: a outra pessoa vai ver as despesas, as notas e os recibos do orçamento, e ao entrar os seus dados são unidos a ele de um jeito que não dá para desfazer. Só o dono do orçamento pode remover um membro; quem é membro pode sair quando quiser.',
    honestCta: 'Leia o que é compartilhado',
    ctaTitle: 'Fiquem em sintonia',
    ctaSubtitle: 'Grátis no iOS e no Android. Chame quem divide o dinheiro com você.',
  },
  cta: {
    title: 'Comece seu orçamento hoje',
    subtitle: 'Grátis no iOS e no Android. Configure hoje à noite e no dia do pagamento você agradece.',
  },
  footer: {
    tagline:
      'Um app amigável de orçamento diário que ajuda você a acompanhar os gastos, planejar as despesas do mês e não perder de vista suas metas.',
    product: 'Produto',
    legal: 'Jurídico',
    connect: 'Contato',
    terms: 'Termos de Uso',
    privacy: 'Política de Privacidade',
    madeWith: 'Feito com',
  },
  meta: {
    title: 'Budget Your Budget — Orçamento inteligente e simples',
    description:
      'Um app amigável de orçamento diário que ajuda você a acompanhar os gastos, planejar as despesas do mês e não perder de vista suas metas. Disponível no iOS e no Android.',
  },
  legal: {
    docLanguage: 'Idioma do documento',
  },
  common: {
    backHome: 'Voltar ao início',
    appStore: 'Baixar na App Store',
    googlePlay: 'Disponível no Google Play',
  },
};
