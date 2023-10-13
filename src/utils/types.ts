export type MessageType = {
  message: string | undefined;
  status: string;
};

export type TeamType = {
  announcements: string[] | null;
  city: string | null;
  division: string | null;
  id: number;
  logo: string | null;
  member_emails: string[] | null;
  name: string | null;
  next_opp: string | null;
  member_requests: string[] | null;
};
