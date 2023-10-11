export const rootDomain = "http://localhost";

// Check email is valid
export const validateEmail = (email: string) => {
  console.log("email", email);
  const regex = new RegExp(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/);
  if (regex.test(email)) {
    return true;
  }
  return false;
};

export const validateName = (name: string) => {
  console.log("name", name);
  if (name === "" || name === undefined) {
    return false;
  }
  return true;
};
