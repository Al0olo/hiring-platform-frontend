import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const UserAPI = {
  createUser: async (userData: any) => {
    try {
      const response = await api.post('/users', userData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to create user');
    }
  },

  getUsers: async () => {
    try {
      const response = await api.get('/users');
      return response.data;
    } catch (error: any) {
      throw new Error(error?.response?.data?.message || 'Failed to fetch users');
    }
  },

  getUserById: async (id: number) => {
    try {
      const response = await api.get(`/users/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch user');
    }
  },
};