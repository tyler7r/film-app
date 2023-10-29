export type MessageType = {
  message: string | undefined;
  status: "error" | "warning" | "success";
};

export const validateField = (input: string) => {
  if (input === "" || input === null || input === undefined) {
    return false;
  } else {
    return true;
  }
};

export const validateEmail = (email: string) => {
  const regex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (email.match(regex)) {
    return true;
  } else {
    return false;
  }
};
