export const setSession = (token) => {
  if (token) {
    localStorage.setItem("token", token);
  }
};
