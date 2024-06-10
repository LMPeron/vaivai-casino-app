import axios from 'axios';
import useUserStore from './stores/user';
const VITE_APP_HOST_HTTP = import.meta.env.VITE_APP_HOST_HTTP;

const http = axios.create({
  baseURL: VITE_APP_HOST_HTTP,
  headers: {
    'Content-type': 'application/json',
  },
});

http.interceptors.request.use(
  (config) => {
    const user = useUserStore();
    const token = user.token;
    if (token && token !== 'false') {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default http;
