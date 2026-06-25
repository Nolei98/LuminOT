export type NewsItem = {
  id: string;
  title: string;
  date: string;
  category: "Atualização" | "Evento" | "Manutenção" | "Comunidade";
  excerpt: string;
  href: string;
};

export type DownloadOption = {
  id: string;
  os: "Windows" | "macOS" | "Linux";
  label: string;
  sizeMb: number;
  href: string;
  recommended?: boolean;
};

export type OnlineCharacter = {
  id: string;
  name: string;
  level: number;
  vocation: string;
  status: "online" | "away";
};

export type HighscoreEntry = {
  rank: number;
  name: string;
  vocation: string;
  level: number;
};

export type TopKillerEntry = {
  rank: number;
  name: string;
  value: number;
  unit: string;
};

export type Top5Board = {
  id: "killers" | "ranked" | "survival";
  title: string;
  entries: TopKillerEntry[];
};

export type LastKill = {
  id: string;
  killer: string;
  victim: string;
  level: number;
  timeAgo: string;
};

export type Guild = {
  id: string;
  name: string;
  members: number;
  founded: string;
  crestColor: string;
};

export type ShopPackage = {
  id: string;
  name: string;
  coins: number;
  priceBRL: number;
  highlight?: boolean;
};

export type RuleSection = {
  id: string;
  title: string;
  body: string;
};

export type CommunityLink = {
  id: string;
  label: string;
  href: string;
  members: string;
};
