import axios from "axios";

// 🌟 DETECT ENVIRONMENT AUTOMATICALLY
const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";

// Local par direct TMDB chalega, Live site par tumhara proxy chalega!
const BASE_URL = isLocal 
  ? "https://api.themoviedb.org/3" 
  : window.location.origin + "/api/tmdb";

const tmdbApi = axios.create({
  baseURL: BASE_URL,
});

// 🌟 LOCAL TESTING FOR AXIOS PARAMS Patches
// Kyunki local par direct TMDB ko api_key chahiye hoti hai, toh hum interceptor laga dete hain automatic
tmdbApi.interceptors.request.use((config) => {
  if (isLocal) {
    config.params = {
      ...config.params,
      api_key: import.meta.env.VITE_TMDB_API_KEY, // Teri local .env se key utha lega
    };
  }
  return config;
});

export default tmdbApi;