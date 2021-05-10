import Axios from 'axios';
import { parseCookies } from 'nookies';
const instance = Axios.create({
  baseURL: 'http://localhost:3001',
  // headers: {
  //   Authorization: 'Bearer ' + cookies?.token,
  // }
  // withCredentials: true,
});

// Add a request interceptor
instance.interceptors.request.use((config) => {
  const cookies = parseCookies();
  if (!cookies.token) return config;
  config.headers.Authorization = 'Bearer ' + cookies.token;

  return config;
});

export default instance;