// src/utils/axiosInstance.ts
import axios, { AxiosInstance} from 'axios';
import { BASE_URL } from './constants';

// Create an Axios instance
const axiosInstance: AxiosInstance = axios.create({
    baseURL: BASE_URL, // Change to your backend API base URL
    timeout: 10000, // Request timeout in milliseconds
    headers: {
        'Content-Type': 'application/json',
        // Add any other headers you need
    },
});

// // Optional: Add request/response interceptors
// axiosInstance.interceptors.request.use(
//     (config: AxiosRequestConfig): AxiosRequestConfig => {
//         // You can modify the request here
//         // For example, add an auth token
//         const token = localStorage.getItem('token'); // Adjust as necessary
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error): Promise<never> => {
//         // Handle the error before sending the request
//         return Promise.reject(error);
//     }
// );

// axiosInstance.interceptors.response.use(
//     (response: AxiosResponse): AxiosResponse => {
//         // You can handle the response here
//         return response;
//     },
//     (error): Promise<never> => {
//         // Handle errors globally
//         console.error('API error:', error);
//         return Promise.reject(error);
//     }
// );

export default axiosInstance;
