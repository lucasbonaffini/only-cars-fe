export const validateCredentials = (username, password) => {
  const isValidUsername = username.length <= 8;
  const hasValidPassword =
    password.length >= 8 && /[A-Z]/.test(password) && /\d/.test(password);
  return isValidUsername && hasValidPassword;
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    setError("El correo electrónico no es válido.");
    return;
  }
};

export const isFutureDate = (comparedDate) => {
  let currentDateTime = new Date();
  let comparedDateTime = Date.parse(comparedDate);
  return currentDateTime < comparedDateTime;
};
