export const isAuthenticated = () => {
  if (localStorage.getItem('token')) {
    return JSON.parse(localStorage.getItem('token'));
  } else {
    return false;
  }
};

export const signout = (next) => {
  localStorage.removeItem('token');
  next();
  return;
};
