import axios from "axios";
import type { ContentFilter } from "./../utils/types/filter.type";
import {
  type ContentDetailsProps,
  type CreditsResponse,
  type MovieProps,
} from "./../utils/types/movie.type"; // 🌟 Fixed: Removed explicit .ts extensions
import type { PersonDetails } from "../utils/types/movie.type";
import { filterAdultContent } from "../utils/functions";

// 🌐 BASE URL Configurations (Bypasses Jio Block through Vercel Serverless Function)
const BASE_URL = window.location.origin + "/api/tmdb";

const tmdbApi = axios.create({
  baseURL: BASE_URL,
});

// ** Content fetching functions for TMDB API via Serverless Proxy

// 1. Fetch trending movies of the week
export const fetchTrendingMovies = async () => {
  try {
    // 🚀 Passing actual TMDB route as endpoint query parameter
    const response = await tmdbApi.get("", {
      params: { endpoint: "trending/movie/week" },
    });
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
      const [movies, tvShows] = await Promise.all([
        tmdbApi.get("", {
          params: { endpoint: "discover/movie", ...getParams("movie") },
        }),
        tmdbApi.get("", {
          params: { endpoint: "discover/tv", ...getParams("tv") },
        }),
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

      const res = await tmdbApi.get("", {
        params: {
          endpoint: `discover/${type}`,
          ...getParams(type as "movie" | "tv"),
        },
      });
      combined = res.data.results.map((t: ContentDetailsProps) => ({
        ...t,
        media_type: type,
      }));
      totalPages = res.data.total_pages;
    }

    if (!filter.include_adult) {
      combined = filterAdultContent(combined);
    }
    const shuffle = combined.sort(() => Math.random() - 0.5);
    return { results: shuffle, page, total_pages: totalPages };
  } catch (error) {
    console.error("Error fetching content by genre:", error);
    throw error;
  }
};

// fetch movie details
export const fetchMovieDetails = async (id: number, type: string) => {
  try {
    const [details, credits, similarMovies] = await Promise.all([
      tmdbApi.get("", { params: { endpoint: `${type}/${id}` } }),
      tmdbApi.get("", { params: { endpoint: `${type}/${id}/credits` } }),
      tmdbApi.get("", { params: { endpoint: `${type}/${id}/similar` } }),
    ]);

    type MovieDetailsResponse = {
      details: ContentDetailsProps;
      credits: CreditsResponse;
      similarMovies: MovieProps[];
    };

    const combinedData: MovieDetailsResponse = {
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
    const response = await tmdbApi.get("", {
      params: { endpoint: `${type}/${id}/videos` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching trailer:", error);
    throw error;
  }
};

// search movies
export const searchMovies = async (query: string) => {
  try {
    const response = await tmdbApi.get("", {
      params: { endpoint: "search/multi", query },
    });
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
  const params: any = {
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
    params.with_original_language = "hi|te|ta|kn|ml";
    params.region = "IN";
  } else if (category === "hollywood") {
    params.with_original_language = "en";
  } else if (category === "anime") {
    params.with_original_language = "ja";
    params.with_genres = 16;
    if (filters?.mediaType === "all") type = "tv";
  }

  try {
    let combined = [];
    const [movieRes, tvRes] = await Promise.all([
      tmdbApi.get("", { params: { endpoint: "discover/movie", ...params } }),
      tmdbApi.get("", { params: { endpoint: "discover/tv", ...params } }),
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
export const fetchPersonDetails = async (
  id: number,
): Promise<{
  person: PersonDetails;
  credits: MovieProps[];
}> => {
  try {
    const [personRes, movieCreditsRes, tvCreditsRes] = await Promise.all([
      tmdbApi.get("", { params: { endpoint: `person/${id}` } }),
      tmdbApi.get("", { params: { endpoint: `person/${id}/movie_credits` } }),
      tmdbApi.get("", { params: { endpoint: `person/${id}/tv_credits` } }),
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
    const [animeRes, indianRes, hollywoodRes] = await Promise.all([
      tmdbApi.get("", {
        params: {
          endpoint: "discover/movie",
          page,
          with_keywords: "210024|287501",
          with_original_language: "ja",
        },
      }),
      tmdbApi.get("", {
        params: {
          endpoint: "discover/movie",
          page,
          region: "IN",
          with_original_language: "hi",
        },
      }),
      tmdbApi.get("", {
        params: {
          endpoint: "discover/movie",
          page,
          with_original_language: "en",
        },
      }),
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

    // Fisher-Yates Shuffle
    for (let i = combinedResults.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [combinedResults[i], combinedResults[j]] = [
        combinedResults[j],
        combinedResults[i],
      ];
    }

    interface TrailerTypes {
      key: string;
      name: string;
      site: string;
      type: string;
    }

    const finalizedList = await Promise.all(
      combinedResults.map(async (movie: ContentDetailsProps) => {
        try {
          const videoRes = await tmdbApi.get("", {
            params: { endpoint: `movie/${movie.id}/videos` },
          });
          const videos = videoRes.data.results || [];
          const trailer =
            videos.find(
              (v: TrailerTypes) => v.type === "Trailer" && v.site === "YouTube",
            ) ||
            videos.find((v: TrailerTypes) => v.site === "YouTube") ||
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

export default tmdbApi;
