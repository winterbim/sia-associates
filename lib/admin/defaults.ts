// Default site content shipped with the bundle. The admin panel
// overrides any of these by writing to KV under `site:content`. If a
// section is missing from KV (or KV isn't configured at all), reads
// fall back to these defaults — so the public site keeps working
// even when nothing has been edited yet.

export interface SiteContent {
  hero: {
    eyebrow: string;
    tagline: string;
    titleLeft: string;
    titleAccent: string;
    titleMiddle: string;
    titleEnd: string;
    titleRight: string;
    lede: string;
    quote: string;
    quoteAuthor: string;
  };
  about: {
    paragraph1: string;
    paragraph2: string;
    quote: string;
    quoteAuthor: string;
    paragraph3: string;
    portraitUrl: string;
  };
  pillars: Array<{
    id: string;
    num: string;
    title: string;
    lead: string;
    tags: string[];
    details: string[];
  }>;
  cases: Array<{
    sector: string;
    title: string;
    description: string;
    tags: string[];
  }>;
  clients: Array<{
    name: string;
    period: string;
    src?: string;
  }>;
  approche: {
    phases: Array<{
      num: string;
      title: string;
      duration: string;
      description: string;
    }>;
  };
  contact: {
    phone: string;
    phoneDisplay: string;
    email: string;
    location: string;
    responseTime: string;
  };
}

export const DEFAULT_CONTENT: SiteContent = {
  hero: {
    eyebrow: "Conseil SAP · depuis 2007",
    tagline: "Human First Build Success",
    titleLeft: "Architecte, ",
    titleAccent: "chef d'orchestre",
    titleMiddle: " et gardien de vos projets ",
    titleEnd: "SAP",
    titleRight: ".",
    lede: "19+ ans à bâtir, piloter et exploiter des paysages SAP pour des entreprises qui ne peuvent pas se permettre d'approximations. De Safran à VINCI Construction, en passant par GRDF, RTE et ENGIE.",
    quote:
      "Un projet SAP réussi, c'est d'abord une équipe qui comprend ce qu'elle construit. La technique vient après.",
    quoteAuthor: "— Amine Silemane, fondateur",
  },
  about: {
    paragraph1:
      "Je suis Amine Silemane, consultant SAP depuis 2007. Mon parcours m'a conduit des grandes ESN aux directions informatiques de groupes comme Safran, VINCI Construction, ENGIE, GRDF et RTE.",
    paragraph2:
      "Ce que je retiens de ces 19 années : les meilleurs projets SAP ne sont pas ceux qui ont le plus de budget — ce sont ceux où un interlocuteur senior comprend à la fois la technique et le métier, et reste engagé du début à la fin.",
    quote:
      "Je travaille de façon organique : j'intègre les besoins, les contraintes et la sécurité SAP dans un flux naturel, pour construire une solution cohérente, évolutive et alignée avec votre réalité métier.",
    quoteAuthor: "— A.S., fondateur",
    paragraph3:
      "Je reste convaincu que la réussite passe par de bonnes relations humaines. Chaque interaction, chaque collaboration peut être bénéfique et enrichissante pour toutes les parties — en partageant la même vision et la même méthode de travail.",
    portraitUrl: "/amine-portrait.png",
  },
  pillars: [
    {
      id: "architecture",
      num: "01",
      title: "Architecture SAP",
      lead: "Concevoir un paysage SAP qui tient dans le temps — choix technologiques, intégration, stratégie cloud. Pas de dette technique cachée, pas de surprise en production.",
      tags: ["SAP Basis", "S/4HANA", "BTP", "Clean Core", "Intégration"],
      details: [
        "Audit d'architecture existante et recommandations",
        "Design du paysage cible (dev, QA, prod, sandbox)",
        "Stratégie d'intégration (PI/PO, CPI, API Management)",
        "Trajectoire et roadmap S/4HANA",
        "Dimensionnement et choix d'infrastructure",
      ],
    },
    {
      id: "pilotage",
      num: "02",
      title: "Pilotage de projet SAP",
      lead: "Du cadrage au Go-Live. Gouvernance, conduite du changement, coordination d'équipes on-shore / near-shore / off-shore. Succès chez Safran, GRDF, RTE, VINCI Construction et EQUANS.",
      tags: ["PMO", "Change", "Gouvernance"],
      details: [
        "Cadrage de projet et chiffrage ferme",
        "Mise en place de la gouvernance projet",
        "Coordination des équipes multi-sites",
        "Conduite du changement et formation",
        "Reporting et escalade proactive",
      ],
    },
    {
      id: "exploitation",
      num: "03",
      title: "Exploitation applicative",
      lead: "Support N2/N3, run ops optimisé. Parce qu'un projet ne s'arrête pas à la mise en production.",
      tags: ["N2/N3", "Run Ops", "Monitoring"],
      details: [
        "Support Basis N2/N3 et résolution d'incidents",
        "Optimisation des performances système",
        "Gestion des transports et des releases",
        "Monitoring et alerting proactif",
        "Amélioration des process et documentation",
      ],
    },
    {
      id: "cloud",
      num: "04",
      title: "Cloud SAP",
      lead: "RISE with SAP, Grow with SAP, Azure, AWS, OVHcloud souverain. Choisir la bonne infrastructure selon vos contraintes de souveraineté et budgétaires.",
      tags: ["RISE", "Azure", "AWS", "OVHcloud"],
      details: [
        "Audit cloud-readiness du paysage existant",
        "Comparatif RISE / Grow / IaaS souverain",
        "Migration vers le cloud (planning, exécution, validation)",
        "Optimisation des coûts cloud",
        "Conformité et souveraineté des données",
      ],
    },
    {
      id: "cybersecurite",
      num: "05",
      title: "Cybersécurité SAP",
      lead: "Dans l'écosystème SAP, la cybersécurité consiste à protéger les données, les accès et les processus critiques de l'entreprise contre toute menace, en garantissant intégrité, confidentialité et conformité. Cela prévaut à tous les domaines de l'entreprise. Un enjeu global en termes de sécurité et surtout de Business.",
      tags: ["SSO", "IAM", "Security Notes", "RGPD", "Audit"],
      details: [
        "Sécurisation des accès et authentification — SSO (Azure AD, IAS), MFA, Identity Providers (IAS, AD, S/4, BTP)",
        "Sécurisation des paysages SAP — analyse de surface d'attaque, Security Notes, patching, durcissement",
        "Sécurisation des interfaces — OData, RFC, API, Cloud Connectors",
        "Audit de sécurité SAP — S/4, ECC, BTP, HANA",
        "Vérification conformité RGPD / ISO / audit interne, recommandations et plan d'action priorisés",
      ],
    },
  ],
  cases: [
    {
      sector: "Énergie",
      title: "Pilotage technique",
      description:
        "Pilotage technique SAP sur paysage critique d'un opérateur énergétique français. Coordination migration, fiabilisation des interfaces, sécurisation des flux métiers. Zéro incident majeur post-migration.",
      tags: ["Pilotage", "Basis", "Migration"],
    },
    {
      sector: "Industrie",
      title: "Architecture technique",
      description:
        "Architecture SAP technique pour un groupe industriel de défense. Cadrage de la trajectoire cloud, stratégie Basis, gouvernance des environnements. Paysage sécurisé et maintenable.",
      tags: ["Architecture", "Basis", "Cloud"],
    },
    {
      sector: "Construction",
      title: "Consulting senior",
      description:
        "SAP Senior BC Consultant intégré au groupe : référent technique sur le paysage SAP en production, support à l'architecture applicative, optimisation du run, cadrage des évolutions, accompagnement et montée en compétence des équipes internes.",
      tags: ["Senior BC", "Run Ops", "Architecture", "Montée en compétence"],
    },
  ],
  clients: [
    { name: "UGAP", src: "/clients/ugap.png", period: "2010 – 2011" },
    { name: "COFIROUTE", src: "/clients/cofiroute.svg", period: "2011 – 2012" },
    { name: "MONOPRIX", src: "/clients/monoprix.svg", period: "2014" },
    { name: "MOTUL", src: "/clients/motul.svg", period: "2014 – 2015" },
    { name: "ENGIE", src: "/clients/engie.png", period: "2015 – 2016" },
    { name: "GRDF", src: "/clients/grdf.svg", period: "2016 – 2018" },
    { name: "SAFRAN", src: "/clients/safran.png", period: "2018 – 2019" },
    { name: "RTE", src: "/clients/rte.svg", period: "2020 – 2021" },
    { name: "VINCI Construction", src: "/clients/vinci.svg", period: "2022 – 2024" },
    { name: "FINANCIÈRE SNOP Dunois", period: "2024 – 2025" },
    { name: "EQUANS", src: "/clients/equans.png", period: "2025 – aujourd'hui" },
  ],
  approche: {
    phases: [
      {
        num: "01",
        title: "Premier échange",
        duration: "15 min · offert",
        description:
          "Comprendre votre contexte, votre besoin, vos contraintes. Objectif : déterminer si je suis la bonne personne pour votre sujet.",
      },
      {
        num: "02",
        title: "Cadrage",
        duration: "2–5 jours",
        description:
          "Livrable écrit, chiffrage ferme. Vous ressortez avec une proposition structurée, lisible, défendable en comité.",
      },
      {
        num: "03",
        title: "Exécution",
        duration: "Selon périmètre",
        description:
          "Points hebdomadaires, reporting mensuel, escalade immédiate en cas de difficulté. Aucune surprise en cours de route.",
      },
      {
        num: "04",
        title: "Clôture & passation",
        duration: "1–2 semaines",
        description:
          "Documentation complète, transfert aux équipes internes, bilan de mission. Je ne pars pas avant que vous soyez autonome.",
      },
    ],
  },
  contact: {
    phone: "+33630156331",
    phoneDisplay: "+33 6 30 15 63 31",
    email: "business@sia-associates.com",
    location: "Paris & International",
    responseTime: "Réponse sous 72 h ouvrables",
  },
};
