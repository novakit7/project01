import axios from "axios";

const Api = axios.create({
  baseURL: "http://localhost:5000"
});

// Add interceptor
Api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default Api;