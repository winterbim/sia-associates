export interface BlogTopic {
  slug: string;
  topic: string;
  category: "architecture" | "migration" | "cloud" | "methodology" | "trends" | "basis";
}

export const BLOG_TOPICS: BlogTopic[] = [
  // Architecture
  {
    slug: "clean-core-stratégie-s4hana-2026",
    topic: "Clean Core : comment préparer votre stratégie S/4HANA en 2026 sans accumuler de dette technique",
    category: "architecture",
  },
  {
    slug: "architecture-sap-hybride-on-premise-cloud",
    topic: "Architecture SAP hybride : quand garder du on-premise et quand basculer dans le cloud",
    category: "architecture",
  },
  {
    slug: "sap-btp-cas-usage-concrets",
    topic: "SAP BTP en pratique : 5 cas d'usage concrets pour les grands comptes français",
    category: "architecture",
  },
  {
    slug: "intégration-sap-cpi-api-management",
    topic: "Intégration SAP : CPI vs API Management, comment choisir pour votre paysage applicatif",
    category: "architecture",
  },

  // Migration
  {
    slug: "migration-ecc6-s4hana-erreurs-eviter",
    topic: "Migration ECC6 vers S/4HANA : les 7 erreurs que je vois systématiquement chez mes clients",
    category: "migration",
  },
  {
    slug: "brownfield-greenfield-bluefield-guide",
    topic: "Brownfield, Greenfield ou Bluefield : guide pratique pour choisir votre approche de migration S/4HANA",
    category: "migration",
  },
  {
    slug: "sap-activate-méthodologie-projet",
    topic: "SAP Activate démystifié : comment appliquer cette méthodologie sur un vrai projet de migration",
    category: "migration",
  },
  {
    slug: "conduite-changement-projet-sap",
    topic: "La conduite du changement dans un projet SAP : ce que les consultants techniques oublient trop souvent",
    category: "migration",
  },

  // Cloud
  {
    slug: "rise-with-sap-retour-expérience",
    topic: "RISE with SAP : retour d'expérience après 2 ans de déploiements en France",
    category: "cloud",
  },
  {
    slug: "souveraineté-données-sap-cloud",
    topic: "Souveraineté des données et SAP Cloud : OVHcloud, Azure France, AWS Paris — quel choix pour un grand compte ?",
    category: "cloud",
  },
  {
    slug: "coût-reel-migration-cloud-sap",
    topic: "Le coût réel d'une migration cloud SAP : au-delà des promesses commerciales des éditeurs",
    category: "cloud",
  },
  {
    slug: "grow-with-sap-pme-eti",
    topic: "Grow with SAP : est-ce vraiment adapté aux ETI françaises ?",
    category: "cloud",
  },

  // Methodology
  {
    slug: "audit-sap-methodology-indépendant",
    topic: "Comment mener un audit SAP indépendant : méthodologie et livrables concrets",
    category: "methodology",
  },
  {
    slug: "gouvernance-sap-multi-entites",
    topic: "Gouvernance SAP multi-entités : organiser la décision technique dans un groupe international",
    category: "methodology",
  },
  {
    slug: "chiffrage-projet-sap-erreurs",
    topic: "Chiffrage de projet SAP : pourquoi 80% des estimations dérapent et comment l'éviter",
    category: "methodology",
  },
  {
    slug: "transfert-competences-sap-équipes-internes",
    topic: "Transfert de compétences SAP : comment rendre vos équipes internes autonomes après un projet",
    category: "methodology",
  },

  // Trends
  {
    slug: "ia-generative-sap-joule-impact",
    topic: "IA générative et SAP : Joule, copilots et impact concret sur les projets en 2026",
    category: "trends",
  },
  {
    slug: "sap-datasphere-analytics-cloud-bi",
    topic: "SAP Datasphere et Analytics Cloud : la BI SAP rattrape-t-elle enfin son retard ?",
    category: "trends",
  },
  {
    slug: "fin-maintenance-ecc6-2027-plan-action",
    topic: "Fin de maintenance ECC6 en 2027 : plan d'action réaliste pour les retardataires",
    category: "trends",
  },
  {
    slug: "consultant-sap-indépendant-vs-esn",
    topic: "Consultant SAP indépendant vs ESN : pourquoi le modèle change en 2026",
    category: "trends",
  },

  // Basis
  {
    slug: "sap-basis-best-practices-2026",
    topic: "SAP Basis en 2026 : les best practices que tout administrateur devrait connaître",
    category: "basis",
  },
  {
    slug: "monitoring-sap-proactif-solution-manager",
    topic: "Monitoring SAP proactif : au-delà de Solution Manager, les outils et pratiques qui changent la donne",
    category: "basis",
  },
  {
    slug: "gestion-transports-sap-devops",
    topic: "Gestion des transports SAP à l'ère du DevOps : CTS+, gCTS et intégration continue",
    category: "basis",
  },
  {
    slug: "sécurité-sap-audit-autorisations",
    topic: "Sécurité SAP : comment auditer vos autorisations et corriger les failles les plus courantes",
    category: "basis",
  },
];

export function getTopicForWeek(weekNumber: number): BlogTopic {
  const index = weekNumber % BLOG_TOPICS.length;
  const topic = BLOG_TOPICS[index];
  if (!topic) return BLOG_TOPICS[0]!;
  return topic;
}

export function getCurrentWeekNumber(): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const diff = now.getTime() - start.getTime();
  const oneWeek = 1000 * 60 * 60 * 24 * 7;
  return Math.floor(diff / oneWeek);
}
