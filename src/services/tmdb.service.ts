import axios from "axios";
import type { ContentFilter } from "./../utils/types/filter.type";
import {
  type ContentDetailsProps,
  type MovieProps,
} from "./../utils/types/movie.type";
import { filterAdultContent } from "../utils/functions";

// 🌟 AUTO DETECT ENVIRONMENT
const isLocal =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";

// Base URLs Setup
const TMDB_LOCAL_BASE = "https://api.themoviedb.org/3";
const PROXY_LIVE_BASE = window.location.origin + "/api/tmdb";

// Helper function to build bulletproof local/live configuration URLs dynamically
const getRequestConfig = (
  endpoint: string,
  extraParams: Record<string, any> = {},
) => {
  if (isLocal) {
    // Local machine: Target direct TMDB structure with explicit path injection
    return {
      url: `${TMDB_LOCAL_BASE}/${endpoint}`,
      params: {
        ...extraParams,
        api_key: import.meta.env.VITE_TMDB_API_KEY, // Automatic mapping from .env
      },
    };
  } else {
    // Production Live: Target our serverless backend function path mapping
    return {
      url: PROXY_LIVE_BASE,
      params: {
        endpoint,
        ...extraParams,
      },
    };
  }
};

// 1. Fetch trending movies of the week
export const fetchTrendingMovies = async () => {
  try {
    const config = getRequestConfig("trending/movie/week");
    const response = await axios.get(config.url, { params: config.params });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    throw error;
  }
};

// fetch both movie and tv shows by genre
export const fetchContentByGenre = async (
  movieGenreId: number | null | undefined,
  tvGenreId: number | null | undefined,
  page: number = 1,
  filter: ContentFilter = {
    mediaType: "all",
    sort_by: "popularity.desc",
    include_adult: false,
    year: "",
    rating: "",
  },
  category: string,
) => {
  try {
    let combined = [];
    let totalPages = 500;

    const getParams = (type: "movie" | "tv") => {
      const baseParams: any = {
        sort_by: filter.sort_by,
        include_adult: filter.include_adult,
        page,
        year: filter.year,
        rating: filter.rating,
      };

      if (filter.year) {
        if (type === "movie") baseParams.primary_release_year = filter.year;
        else if (type === "tv") baseParams.first_air_date_year = filter.year;
      }

      if (category) {
        if (category === "hollywood") {
          baseParams.with_original_language = "en";
        } else if (category === "indian") {
          baseParams.with_original_language = "hi|te|ta|kn|ml";
          baseParams.region = "IN";
        } else if (category === "anime") {
          baseParams.with_original_language = "ja";
          baseParams.with_genres = 16;
        } else {
          baseParams.with_genres = type === "movie" ? movieGenreId : tvGenreId;
        }
      }
      return baseParams;
    };

    if (filter.mediaType === "all") {
      const movieCfg = getRequestConfig("discover/movie", getParams("movie"));
      const tvCfg = getRequestConfig("discover/tv", getParams("tv"));

      const [movies, tvShows] = await Promise.all([
        axios.get(movieCfg.url, { params: movieCfg.params }),
        axios.get(tvCfg.url, { params: tvCfg.params }),
      ]);

      combined = [
        ...movies.data.results.map((m: ContentDetailsProps) => ({
          ...m,
          media_type: "movie",
        })),
        ...tvShows.data.results.map((t: ContentDetailsProps) => ({
          ...t,
          media_type: "tv",
        })),
      ];
      totalPages = Math.max(movies.data.total_pages, tvShows.data.total_pages);
    } else {
      const type = filter.mediaType === "anime" ? "tv" : filter.mediaType;
      const cfg = getRequestConfig(
        `discover/${type}`,
        getParams(type as "movie" | "tv"),
      );

      const res = await axios.get(cfg.url, { params: cfg.params });
      combined = res.data.results.map((t: ContentDetailsProps) => ({
        ...t,
        media_type: type,
      }));
      totalPages = res.data.total_pages;
    }

    if (!filter.include_adult) {
      combined = filterAdultContent(combined);
    }
    return {
      results: combined.sort(() => Math.random() - 0.5),
      page,
      total_pages: totalPages,
    };
  } catch (error) {
    console.error("Error fetching content by genre:", error);
    throw error;
  }
};

// fetch movie details
export const fetchMovieDetails = async (id: number, type: string) => {
  try {
    const detailsCfg = getRequestConfig(`${type}/${id}`);
    const creditsCfg = getRequestConfig(`${type}/${id}/credits`);
    const similarCfg = getRequestConfig(`${type}/${id}/similar`);

    const [details, credits, similarMovies] = await Promise.all([
      axios.get(detailsCfg.url, { params: detailsCfg.params }),
      axios.get(creditsCfg.url, { params: creditsCfg.params }),
      axios.get(similarCfg.url, { params: similarCfg.params }),
    ]);

    const combinedData = {
      details: details.data,
      credits: credits.data,
      similarMovies: similarMovies.data.results,
    };
    return combinedData;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};

// fetch trailer
export const fetchTrailer = async (id: number, type: string) => {
  try {
    const config = getRequestConfig(`${type}/${id}/videos`);
    const response = await axios.get(config.url, { params: config.params });
    return response.data;
  } catch (error) {
    console.error("Error fetching trailer:", error);
    throw error;
  }
};

// search movies
export const searchMovies = async (query: string) => {
  try {
    const config = getRequestConfig("search/multi", { query });
    const response = await axios.get(config.url, { params: config.params });
    return response.data.results;
  } catch (error) {
    console.error("Error searching movies:", error);
    throw error;
  }
};

// explore page content fetching with filters
export const fetchExploreContent = async (
  category: string,
  page: number = 1,
  filters: ContentFilter,
) => {
  const baseParams: any = {
    page,
    sort_by: filters.sort_by || "popularity.desc",
    include_adult: filters.include_adult || false,
    year: filters.year || "",
    rating: filters.rating || "",
    primary_release_year: filters.year || "",
    first_air_date_year: filters.year || "",
    language: "en-US",
  };

  let type = filters.mediaType === "all" ? "movie" : filters.mediaType;

  if (category === "indian") {
    baseParams.with_original_language = "hi|te|ta|kn|ml";
    baseParams.region = "IN";
  } else if (category === "hollywood") {
    baseParams.with_original_language = "en";
  } else if (category === "anime") {
    baseParams.with_original_language = "ja";
    baseParams.with_genres = 16;
    if (filters?.mediaType === "all") type = "tv";
  }

  try {
    let combined = [];
    const movieCfg = getRequestConfig("discover/movie", baseParams);
    const tvCfg = getRequestConfig("discover/tv", baseParams);

    const [movieRes, tvRes] = await Promise.all([
      axios.get(movieCfg.url, { params: movieCfg.params }),
      axios.get(tvCfg.url, { params: tvCfg.params }),
    ]);

    const res = type === "movie" ? movieRes : tvRes;

    if (filters.mediaType === "all") {
      combined.push(
        ...movieRes.data.results.map((m: ContentDetailsProps) => ({
          ...m,
          media_type: "movie",
        })),
        ...tvRes.data.results.map((t: ContentDetailsProps) => ({
          ...t,
          media_type: "tv",
        })),
      );
    } else {
      combined.push(
        ...res.data.results.map((t: ContentDetailsProps) => ({
          ...t,
          media_type: type,
        })),
      );
    }

    if (!filters.include_adult) {
      combined = filterAdultContent(combined);
    }

    return {
      results: combined.sort(() => Math.random() - 0.5),
      page,
      total_pages: res.data.total_pages,
    };
  } catch (error) {
    console.error("Error fetching explore content:", error);
    throw error;
  }
};

// fetch person details
export const fetchPersonDetails = async (id: number) => {
  try {
    const pCfg = getRequestConfig(`person/${id}`);
    const mCfg = getRequestConfig(`person/${id}/movie_credits`);
    const tCfg = getRequestConfig(`person/${id}/tv_credits`);

    const [personRes, movieCreditsRes, tvCreditsRes] = await Promise.all([
      axios.get(pCfg.url, { params: pCfg.params }),
      axios.get(mCfg.url, { params: mCfg.params }),
      axios.get(tCfg.url, { params: tCfg.params }),
    ]);

    const combinedCredits = [
      ...movieCreditsRes.data.cast.map((m: MovieProps) => ({
        ...m,
        media_type: "movie",
      })),
      ...tvCreditsRes.data.cast.map((t: MovieProps) => ({
        ...t,
        media_type: "tv",
      })),
    ];

    return {
      person: personRes.data,
      credits: combinedCredits.sort(() => Math.random() - 0.5),
    };
  } catch (error) {
    console.error("Error fetching person details:", error);
    throw error;
  }
};

// fetch trailers data for explore page
export const fetchTrailerData = async (page: number) => {
  try {
    const animeCfg = getRequestConfig("discover/movie", {
      page,
      with_keywords: "210024|287501",
      with_original_language: "ja",
    });
    const indianCfg = getRequestConfig("discover/movie", {
      page,
      region: "IN",
      with_original_language: "hi",
    });
    const hollywoodCfg = getRequestConfig("discover/movie", {
      page,
      with_original_language: "en",
    });

    const [animeRes, indianRes, hollywoodRes] = await Promise.all([
      axios.get(animeCfg.url, { params: animeCfg.params }),
      axios.get(indianCfg.url, { params: indianCfg.params }),
      axios.get(hollywoodCfg.url, { params: hollywoodCfg.params }),
    ]);

    const combinedResults = [
      ...animeRes.data.results.map((m: ContentDetailsProps) => ({
        ...m,
        category: "Anime",
      })),
      ...indianRes.data.results.map((m: ContentDetailsProps) => ({
        ...m,
        category: "Indian",
      })),
      ...hollywoodRes.data.results.map((m: ContentDetailsProps) => ({
        ...m,
        category: "Hollywood",
      })),
    ];

    for (let i = combinedResults.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [combinedResults[i], combinedResults[j]] = [
        combinedResults[j],
        combinedResults[i],
      ];
    }

    const finalizedList = await Promise.all(
      combinedResults.map(async (movie: ContentDetailsProps) => {
        try {
          const vCfg = getRequestConfig(`movie/${movie.id}/videos`);
          const videoRes = await axios.get(vCfg.url, { params: vCfg.params });
          const videos = videoRes.data.results || [];
          const trailer =
            videos.find(
              (v: any) => v.type === "Trailer" && v.site === "YouTube",
            ) ||
            videos.find((v: any) => v.site === "YouTube") ||
            null;

          return trailer ? { ...movie, youtubeKey: trailer.key } : null;
        } catch {
          return null;
        }
      }),
    );

    return finalizedList
      .filter((m) => m !== null)
      .sort(() => Math.random() - 0.5);
  } catch (error) {
    console.error("Error fetching trailer data:", error);
    throw error;
  }
};
