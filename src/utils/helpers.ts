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

export const emailListToArray = (emails: string) => {
  const arrayForm: string[] = emails.split(", ");
  let validEmails: string[] = [];

  arrayForm.forEach((email) => {
    const isValidEmail = validateEmail(email);
    const isUniqueEmail = arrayForm.includes(email);
    if (isValidEmail && isUniqueEmail) {
      validEmails.push(email);
    }
  });

  return validEmails;
};
