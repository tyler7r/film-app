export type TeamType = {
  affiliation_pwd: string | null;
  city: string;
  created_at: string;
  division: string | null;
  id: number;
  logo: string;
  name: string;
};

export type GameType<T> = {
  created_at: string;
  id: number;
  season: string | null;
  team1_id: number;
  team2_id: number;
  team1: T[];
  team2: T[];
  tournament: string | null;
};
