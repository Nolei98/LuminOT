import type {
  NewsItem,
  DownloadOption,
  OnlineCharacter,
  HighscoreEntry,
  Top5Board,
  LastKill,
  Guild,
  ShopPackage,
  RuleSection,
  CommunityLink,
} from "./types";

// Camada de dados mockada que alimenta a versão imersiva (/novo). O "passado" não usa
// esses dados — é um redirect para o site oficial existente (ver TransitionProvider).
// Troque por chamadas reais ao AAC/back-end quando disponível — mantenha o mesmo shape.

export const gameName = "LuminOT";

export const news: NewsItem[] = [
  {
    id: "n1",
    title: "Nova atualização de conteúdo: Vale Esquecido",
    date: "2026-06-18",
    category: "Atualização",
    excerpt: "Nova região explorável, criaturas inéditas e itens exclusivos chegam ao servidor.",
    href: "/news/vale-esquecido",
  },
  {
    id: "n2",
    title: "Evento de fim de semana: Caça ao Tesouro",
    date: "2026-06-14",
    category: "Evento",
    excerpt: "Participe da caça ao tesouro e ganhe recompensas exclusivas em todos os mundos.",
    href: "/news/cacao-tesouro",
  },
  {
    id: "n3",
    title: "Manutenção programada concluída",
    date: "2026-06-10",
    category: "Manutenção",
    excerpt: "Servidor estável após otimizações de performance e correções de bugs.",
    href: "/news/manutencao-junho",
  },
  {
    id: "n4",
    title: "Comunidade atinge 10.000 personagens criados",
    date: "2026-06-02",
    category: "Comunidade",
    excerpt: "Obrigado por fazer parte dessa jornada! Recompensa especial para todos os jogadores.",
    href: "/news/10000-personagens",
  },
];

export const downloads: DownloadOption[] = [
  { id: "d1", os: "Windows", label: "Cliente OTC - Windows", sizeMb: 184, href: "#", recommended: true },
  { id: "d2", os: "macOS", label: "Cliente OTC - macOS", sizeMb: 192, href: "#" },
  { id: "d3", os: "Linux", label: "Cliente OTC - Linux", sizeMb: 176, href: "#" },
];

export const onlineCharacters: OnlineCharacter[] = [
  { id: "c1", name: "Veluthien", level: 312, vocation: "Royal Paladin", status: "online" },
  { id: "c2", name: "Kaelborn", level: 287, vocation: "Elder Druid", status: "online" },
  { id: "c3", name: "Sarithae", level: 264, vocation: "Master Sorcerer", status: "away" },
  { id: "c4", name: "Drogmir", level: 251, vocation: "Elite Knight", status: "online" },
  { id: "c5", name: "Ynalia", level: 198, vocation: "Elder Druid", status: "online" },
];

export const highscores: HighscoreEntry[] = [
  { rank: 1, name: "Veluthien", vocation: "Royal Paladin", level: 312 },
  { rank: 2, name: "Kaelborn", vocation: "Elder Druid", level: 287 },
  { rank: 3, name: "Sarithae", vocation: "Master Sorcerer", level: 264 },
  { rank: 4, name: "Drogmir", vocation: "Elite Knight", level: 251 },
  { rank: 5, name: "Ynalia", vocation: "Elder Druid", level: 198 },
];

export const top5Boards: Top5Board[] = [
  {
    id: "killers",
    title: "Top 5 Killers",
    entries: [
      { rank: 1, name: "Drogmir", value: 482, unit: "frags" },
      { rank: 2, name: "Veluthien", value: 401, unit: "frags" },
      { rank: 3, name: "Sarithae", value: 376, unit: "frags" },
      { rank: 4, name: "Kaelborn", value: 312, unit: "frags" },
      { rank: 5, name: "Ynalia", value: 298, unit: "frags" },
    ],
  },
  {
    id: "ranked",
    title: "Top 5 Ranked",
    entries: [
      { rank: 1, name: "Sarithae", value: 2890, unit: "pts" },
      { rank: 2, name: "Drogmir", value: 2745, unit: "pts" },
      { rank: 3, name: "Veluthien", value: 2611, unit: "pts" },
      { rank: 4, name: "Ynalia", value: 2490, unit: "pts" },
      { rank: 5, name: "Kaelborn", value: 2355, unit: "pts" },
    ],
  },
  {
    id: "survival",
    title: "Top 5 Survival",
    entries: [
      { rank: 1, name: "Kaelborn", value: 47, unit: "dias" },
      { rank: 2, name: "Ynalia", value: 39, unit: "dias" },
      { rank: 3, name: "Veluthien", value: 33, unit: "dias" },
      { rank: 4, name: "Sarithae", value: 28, unit: "dias" },
      { rank: 5, name: "Drogmir", value: 21, unit: "dias" },
    ],
  },
];

export const lastKills: LastKill[] = [
  { id: "k1", killer: "Drogmir", victim: "Tharneval", level: 244, timeAgo: "há 4 min" },
  { id: "k2", killer: "Veluthien", victim: "Oskandar", level: 198, timeAgo: "há 12 min" },
  { id: "k3", killer: "Sarithae", victim: "Brindleth", level: 211, timeAgo: "há 27 min" },
  { id: "k4", killer: "Kaelborn", victim: "Wyndrel", level: 176, timeAgo: "há 41 min" },
  { id: "k5", killer: "Ynalia", victim: "Calderic", level: 165, timeAgo: "há 58 min" },
];

export const guilds: Guild[] = [
  { id: "g1", name: "Ordem do Crepúsculo", members: 42, founded: "2025-11-02", crestColor: "#7c3aed" },
  { id: "g2", name: "Lâminas de Ferro", members: 35, founded: "2025-12-19", crestColor: "#b91c1c" },
  { id: "g3", name: "Conselho Arcano", members: 28, founded: "2026-01-08", crestColor: "#0e7490" },
  { id: "g4", name: "Punho de Pedra", members: 31, founded: "2026-02-21", crestColor: "#92400e" },
];

export const shopPackages: ShopPackage[] = [
  { id: "s1", name: "Pacote Iniciante", coins: 250, priceBRL: 14.9 },
  { id: "s2", name: "Pacote Aventureiro", coins: 600, priceBRL: 29.9, highlight: true },
  { id: "s3", name: "Pacote Lendário", coins: 1500, priceBRL: 69.9 },
];

export const ruleSections: RuleSection[] = [
  { id: "r1", title: "Conduta Geral", body: "Respeite todos os jogadores. Assédio, discurso de ódio e spam resultam em banimento." },
  { id: "r2", title: "Uso de Bots e Macros", body: "É proibido o uso de qualquer automação que ofereça vantagem injusta sobre outros jogadores." },
  { id: "r3", title: "Comércio e Trocas", body: "Negociações entre jogadores são de responsabilidade própria. A equipe não medeia disputas de troca." },
  { id: "r4", title: "Nomes de Personagem", body: "Nomes ofensivos, com referências reais ou que imitem a equipe serão renomeados ou banidos." },
];

export const communityLinks: CommunityLink[] = [
  { id: "cm1", label: "Discord Oficial", href: "#", members: "8.200 membros" },
  { id: "cm2", label: "Comunidade WhatsApp", href: "#", members: "1.400 membros" },
];
