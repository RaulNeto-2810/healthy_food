import axios from 'axios';

// Configuração base do axios
const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token JWT se existir
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para lidar com respostas de erro
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado ou inválido
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    }
    return Promise.reject(error);
  }
);

// Funções da API
export const apiService = {
  // Verificar status da API
  checkStatus: async () => {
    try {
      const response = await api.get('/status/');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Buscar comidas saudáveis
  getHealthyFoods: async () => {
    try {
      const response = await api.get('/healthy-foods/');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Testar conexão POST
  testConnection: async (data) => {
    try {
      const response = await api.post('/test-connection/', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Login (obter token JWT)
  login: async (username, password) => {
    try {
      const response = await api.post('/token/', {
        username,
        password,
      });
      
      if (response.data.access) {
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
      }
      
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Refresh token
  refreshToken: async () => {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      const response = await api.post('/token/refresh/', {
        refresh: refreshToken,
      });
      
      if (response.data.access) {
        localStorage.setItem('access_token', response.data.access);
      }
      
      return response.data;
    } catch (error) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      throw error;
    }
  },
};

export default api;
