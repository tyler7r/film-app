// Check email is valid
export const validateEmail = (email: string) => {
  const regex = new RegExp(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/);
  if (regex.test(email)) {
    return true;
  }
  return false;
};

// Check if name is valid
export const validateName = (name: string) => {
  if (name === "" || name === undefined) {
    return false;
  }
  return true;
};

// Check if passwords match
export const validatePwdMatch = (pwd: string, confirmPwd: string) => {
  if (pwd === confirmPwd) {
    return true;
  } else {
    return false;
  }
};

export const emailListToArray = (emails: string) => {
  // Split text input at commas
  const emailArray = emails.split(", ");
  const validEmails: string[] = [];

  // Loop through new array of emails and check for valid email form and any duplication
  emailArray.forEach((email) => {
    const isValidEmail = validateEmail(email);
    const emailAlreadyEntered = validEmails.includes(email);
    if (isValidEmail && !emailAlreadyEntered) {
      validEmails.push(email);
    }
  });
  return validEmails;
};

export const validateImage = (url: string) => {
  const request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.send();
  let status: number = 0;
  request.onload = () => {
    status = request.status;
  };
  console.log(status);
  if (status === 200) {
    return true;
  } else {
    return false;
  }
};

export const validateTeamSelect = (id: number | null | "") => {
  if (typeof id === "number" && id !== 0) {
    return true;
  } else {
    return false;
  }
};
