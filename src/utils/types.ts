export type MessageType = {
  message: string | undefined;
  status: "error" | "warning" | "success";
};

export type UserSess = {
  userId: string;
  isLoggedIn: boolean;
  email: string | undefined;
  teamId: number | null;
};

export type TeamType = {
  announcements: string[] | null;
  city: string | null;
  division: string | null;
  id: number;
  logo: string | null;
  member_requests: string[] | null;
  name: string | null;
  next_opp: string | null;
  owner: string | null;
};
