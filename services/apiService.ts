// services/apiService.ts
import axios from 'axios';
import { API_BASE_URL } from '../utils/apiConfig';

// services/apiService.ts
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';


// Crear una instancia de axios con configuración base
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Interceptor para añadir el token a cada solicitud
apiClient.interceptors.request.use((config) => {
    const token = Cookies.get('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export const apiService = {
    async getUsers() {
        try {
            const response = await apiClient.get('/users');
            return response.data.data; // Asumiendo estructura de Sanctum
        } catch (error) {
            // Manejo centralizado de errores
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data.message || 'Failed to fetch users');
            }
            throw error;
        }
    },

    async createUser(userData: any) {
        try {
            const response = await apiClient.post('/users', userData);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data.message || 'Failed to create user');
            }
            throw error;
        }
    },

    async updateUser(id: any, userData: any) {
        try {
            const response = await apiClient.put(`/users/${id}`, userData);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data.message || 'Failed to update user');
            }
            throw error;
        }
    },

    async login(credentials: { email: string; password: string }) {
        try {
            const response = await apiClient.post('/login', credentials);
            return response.data; // Asume que devuelve { token, user: {...} }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data.message || 'Login failed');
            }
            throw error;
        }
    },

    async logout() {
        try {
            const response = await apiClient.post('/logout');
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data.message || 'Logout failed');
            }
            throw error;
        }
    },

};