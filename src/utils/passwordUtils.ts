export const checkPasswordStrength = (password: string) => {
  const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  const mediumPassword = /^(?=.*[a-z])(?=.*\d).{6,}$/;

  if (strongPassword.test(password)) {
    return { strength: 'strong', valid: true };
  } else if (mediumPassword.test(password)) {
    return { strength: 'medium', valid: true };
  } else {
    return { strength: 'weak', valid: false };
  }
};
