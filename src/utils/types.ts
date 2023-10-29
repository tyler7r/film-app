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
