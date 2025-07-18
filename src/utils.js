export const saveAuthToken = (token) => {
  localStorage.setItem("authToken", token);
  console.log("AuthToken Saved ", token);
};

export const removeAuthToken = () => {
  localStorage.removeItem("authToken");
  console.log("AuthToken Removed Successfully");
};

export const getAuthToken = () => {
  console.log("AuthToken got Successfully");
  return localStorage.getItem("authToken");
};
