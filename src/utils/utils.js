// Save access token to localStorage
export const setAccessToken = (token) => {
  localStorage.setItem("accessToken", token);
};

// Get access token from localStorage
export const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

// Remove access token from localStorage
export const removeAccessToken = () => {
  localStorage.removeItem("accessToken");
};
