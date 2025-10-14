import axios from 'axios';
import { getCookie } from '../../utils/cookie.utils';

const dashboardClientApi = axios.create({
  baseURL: 'http://localhost:3001/',
  timeout: 10000,
});

// Interceptor para adicionar o session_token
dashboardClientApi.interceptors.request.use(
  (config) => {
    const accessToken = getCookie('access_token');

    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

if (typeof window !== 'undefined') {
  dashboardClientApi.interceptors.response.use(
    response => response,
    error => {
      if(!window) return;

       if (error?.response?.status === 401) {
        window.location.href = '/authentication/login';
        return; // evita propagação do erro
      }

      return Promise.reject(error);
    }
  );
}

export default dashboardClientApi;