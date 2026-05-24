import axios from "axios";

// 🌟 AUTO DETECT ENVIRONMENT
const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";

// Base URL configuration split
const BASE_URL = isLocal 
  ? "https://api.themoviedb.org/3" // Local mapping
  : window.location.origin + "/api/tmdb"; // Production routing proxy

const tmdbApi = axios.create({
  baseURL: BASE_URL,
});

// 🎬 ADVANCED SMART INTERCEPTOR PIPELINE
tmdbApi.interceptors.request.use((config) => {
  // Agar hum local machine par hain:
  if (isLocal) {
    const params = config.params || {};
    const endpoint = params.endpoint;

    if (endpoint) {
      // 🚀 MAGIC: query se endpoint utha kar direct URL path mein jod do!
      config.url = `/${endpoint}`;
      delete params.endpoint; // Ganda extra param delete karo
    }

    config.params = {
      ...params,
      api_key: import.meta.env.VITE_TMDB_API_KEY, // Tumhari local .env file se automatic key
    };
  }
  // Agar hum live Vercel Server par hain, toh params.endpoint waise hi rehne do kyunki hamara backend proxy use padhega!
  return config;
});

export default tmdbApi;