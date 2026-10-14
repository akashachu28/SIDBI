import axios from 'axios';
import { env } from '../env';

/**
 * Axios instance configured with base URL and interceptors
 */
export const apiClient = axios.create({
  baseURL: env.apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds
});

/**
 * Request interceptor
 * Add authentication tokens or modify requests before they are sent
 */
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response interceptor
 * Handle responses and errors globally
 */
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      
      switch (status) {
        case 401:
          // Unauthorized - clear token and redirect to login
          localStorage.removeItem('authToken');
          window.location.href = '/login';
          break;
        case 403:
          console.error('Access forbidden:', data?.message);
          break;
        case 404:
          console.error('Resource not found:', data?.message);
          break;
        case 500:
          console.error('Server error:', data?.message);
          break;
        default:
          console.error('API error:', data?.message);
      }
    } else if (error.request) {
      // Request made but no response received
      console.error('No response from server');
    } else {
      // Error in request setup
      console.error('Request error:', error.message);
    }
    
    return Promise.reject(error);
  }
);
