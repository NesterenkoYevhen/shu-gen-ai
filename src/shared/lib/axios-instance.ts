// axiosInstance.ts
import axios from 'axios';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth';

const axiosInstance = axios.create({
  baseURL: process.env.API_URL,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const session = await getServerSession(authOptions);
    if (session && typeof session === 'object' && 'accessToken' in session) {
      config.headers.Authorization = `Token ${session.accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.defaults.withCredentials = true;

export default axiosInstance;
