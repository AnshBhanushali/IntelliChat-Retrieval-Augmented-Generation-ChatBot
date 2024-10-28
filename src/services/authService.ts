import api from './api';

export const login = (email: string, password: string) => {
  return api.post('/login', { email, password });
};

export const signup = (email: string, password: string) => {
  return api.post('/signup', { email, password });
};

export const getCurrentUser = () => {
  return api.get('/current_user'); 
};
