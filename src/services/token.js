export const getAccessToken = () => {
  const token = localStorage.getItem('accessToken');
  return token;
};

export const getRefreshToken = () => {
  const token = localStorage.getItem('refreshToken');
  return token;
};

export const setAccessToken = (token) => {
  localStorage.setItem('accessToken', token);
};

export const setRefreshToken = (token) => {
  localStorage.setItem('refreshToken', token);
};

export const isTokenExist = () => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  if (!accessToken && !refreshToken) return false;

  return true;
};

export const setLocalUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const getLocalUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

export const logoutLocal = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');
};
