import { apiFetch } from './api';

export const authService = {
  login: async (credentials: { email: string; password: any }) => {
    return apiFetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  register: async (credentials: { email: string; password: any }) => {
    return apiFetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }
};
