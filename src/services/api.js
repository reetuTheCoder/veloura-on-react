import axios from "axios";

// Config is loaded globally by <script src="/config.js"></script> in index.html.
// It exposes window.__APP_CONFIG__ before React mounts.
const API_CONFIG = window.__APP_CONFIG__;

if (!API_CONFIG || !API_CONFIG.API_BASE_URL) {
  throw new Error(
    "[api] window.__APP_CONFIG__.API_BASE_URL is missing. " +
      "Make sure public/config.js exists and is loaded via <script src='/config.js'></script> " +
      "in index.html BEFORE <script type='module' src='/src/main.jsx'></script>."
  );
}

const api = axios.create({
  baseURL: API_CONFIG.API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;