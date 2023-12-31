export const validateField = (input: string) => {
  if (input === "") {
    return false;
  } else {
    return true;
  }
};

export const validateEmail = (email: string) => {
  const regex = new RegExp(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/);
  if (regex.test(email)) {
    return true;
  }
  return false;
};

export const validatePwdMatch = (p1: string, p2: string) => {
  if (p1 === p2) {
    return true;
  } else {
    return false;
  }
};

export const validateTeamSelect = (team: number) => {
  if (team !== 0) {
    return true;
  } else {
    return false;
  }
};

export const divisions = [
  "Open",
  "Women's",
  "Mixed",
  "AUDL",
  "PUL",
  "WUL",
  "D1 College Men's",
  "D1 College Women's",
  "D3 College Men's",
  "D3 College Women's",
];

export const noNavbarLocations = [
  "/login/",
  "/signup/",
  "/signup/details/",
  "/signup/password/",
  "/signup/team-select/",
  "/create-team/",
  "/create-team/details/",
  "/create-team/logo/",
  "/create-team/members/",
];

export const emailListToArray = (emails: string) => {
  const arrayForm: string[] = emails.split(",");
  const validEmails: string[] = [];

  arrayForm.forEach((email) => {
    const isValidEmail = validateEmail(email);
    const isUniqueEmail = !validEmails.includes(email);
    if (isValidEmail && isUniqueEmail) {
      validEmails.push(email);
    }
  });

  return validEmails;
};

export const checkForDuplicates = (item: string, array: string[]) => {
  const itemInArray = array.includes(item);
  if (itemInArray) return false;
  else return true;
};
