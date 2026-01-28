

import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});



api.interceptors.request.use(async (config) => {
  const userDate = localStorage.getItem('devburguer:userData');
  const token = userDate && JSON.parse(userDate).token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});