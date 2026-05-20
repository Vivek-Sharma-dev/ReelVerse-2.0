import type { ContentFilter } from "../utils/constant";
import { filterAdultContent } from "../utils/functions";
import tmdbApi from "./api";

// ** Content fetching functions for TMDB API

// 1. Fetch trending movies of the week
export const fetchTrendingMovies = async () => {
  try {
    const response = await tmdbApi.get("/trending/movie/week");
    return response.data.results;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    throw error;
  }
};

// 2. Fetch movies by genre
export const fetchMoviesByGenre = async (genreId: number, page: number = 1) => {
  try {
    const response = await tmdbApi.get("/discover/movie", {
      params: {
        with_genres: genreId,
        sort_by: "popularity.desc",
        page,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movies by genre:", error);
    throw error;
  }
};

// 3. Fetch TV shows and movies by genre for home page
export const fetchHomeContentByGenre = async (
  movieId: number,
  tvId: number | null | undefined,
  page: number = 1,
) => {
  try {
    const [movies, tvShows] = await Promise.all([
      tmdbApi.get("/discover/movie", {
        params: {
          with_genres: movieId,
          sort_by: "popularity.desc",
          page,
        },
      }),
      tmdbApi.get("/discover/tv", {
        params: {
          with_genres: tvId,
          sort_by: "popularity.desc",
          page,
        },
      }),
    ]);

    const combined = [
      ...movies.data.results.map((m: any) => ({ ...m, media_type: "movie" })),
      ...tvShows.data.results.map((t: any) => ({ ...t, media_type: "tv" })),
    ];

    const shuffle = combined.sort(() => Math.random() - 0.5);

    return shuffle;
  } catch (error) {
    console.error("Error fetching home content by genre:", error);
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
    sortBy: "popularity.desc",
    includeAdult: false,
    year: "",
    rating: "",
  },
  category: string,
) => {
  try {
    let combined = [];
    let totalPages = 500;

    const getParams = (type: "movie" | "tv" | any) => {
      const baseParams: any = {
        sort_by: filter.sortBy,
        include_adult: filter.includeAdult,
        page,
        year: filter.year,
        rating: filter.rating,
      };

      // year logic
      if (filter.year) {
        if (type === "movie") {
          baseParams.primary_release_year = filter.year;
        } else if (type === "tv") {
          baseParams.first_air_date_year = filter.year;
        }
      }

      // 2. category
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
        tmdbApi.get("/discover/movie", {
          params: getParams("movie"),
        }),
        tmdbApi.get("/discover/tv", {
          params: getParams("tv"),
        }),
      ]);

      combined = [
        ...movies.data.results.map((m: any) => ({ ...m, media_type: "movie" })),
        ...tvShows.data.results.map((t: any) => ({ ...t, media_type: "tv" })),
      ];

      totalPages = Math.max(movies.data.total_pages, tvShows.data.total_pages);
    } else {
      const type = filter.mediaType === "anime" ? "tv" : filter.mediaType;

      const res = await tmdbApi.get(`/discover/${type}`, {
        params: getParams(type as any),
      });
      combined = res.data.results.map((t: any) => ({ ...t, media_type: type }));
      totalPages = res.data.total_pages;
    }
    if (!filter.includeAdult) {
      combined = filterAdultContent(combined);
    }
    const shuffle = combined.sort(() => Math.random() - 0.5);
    return { results: shuffle, page, total_pages: totalPages };
  } catch (error) {
    console.error("Error fetching content by genre:", error);
    throw error;
  }
};

// ** fetching movie details, credits, similar movies, etc. can be added here as needed in the future
// fetch movie details
export const fetchMovieDetails = async (id: number, type: string) => {
  try {
    const response = await tmdbApi.get(`/${type}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};

// fetch movie credits
export const fetchMovieCredits = async (id: number, type: string) => {
  try {
    const response = await tmdbApi.get(`/${type}/${id}/credits`);
    return response.data;
  } catch (error) {
    console.error("Error fetching movie credits:", error);
    throw error;
  }
};

// fetch similar movies
export const fetchSimilarMovies = async (id: number, type: string) => {
  try {
    const response = await tmdbApi.get(`/${type}/${id}/similar`);
    return response.data;
  } catch (error) {
    console.error("Error fetching similar movies:", error);
    throw error;
  }
};

// fetch videos
export const fetchTrailer = async (id: number, type: string) => {
  try {
    const response = await tmdbApi.get(`/${type}/${id}/videos`);
    return response.data;
  } catch (error) {
    console.error("Error fetching trailer:", error);
    throw error;
  }
};

// search movies
export const searchMovies = async (query: string) => {
  try {
    const response = await tmdbApi.get(`/search/multi`, {
      params: {
        query,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error searching movies:", error);
    throw error;
  }
};

// explore pages
export const fetchExploreContent = async (
  category: string,
  page: number = 1,
  filters: ContentFilter,
) => {
  const params: any = {
    page,
    sort_by: filters.sortBy || "popularity.desc",
    include_adult: filters.includeAdult || false,
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

  // filter adult content function

  try {
    let combined = [];
    const [movieRes, tvRes] = await Promise.all([
      tmdbApi.get("/discover/movie", { params }),
      tmdbApi.get("/discover/tv", { params }),
    ]);

    const res = type === "movie" ? movieRes : tvRes;

    if (filters.mediaType === "all") {
      combined.push(
        ...movieRes.data.results.map((m: any) => ({
          ...m,
          media_type: "movie",
        })),
        ...tvRes.data.results.map((t: any) => ({ ...t, media_type: "tv" })),
      );
    } else {
      combined.push(
        ...res.data.results.map((t: any) => ({ ...t, media_type: type })),
      );
    }
    if (!filters.includeAdult) {
      combined = filterAdultContent(combined);
    }

    return {
      results: combined.sort(() => Math.random() - 0.5), // shuffle results

      page,
      total_pages: res.data.total_pages,
    };
  } catch (error) {
    console.error("Error fetching content by genre:", error);
    throw error;
  }
};


// fetch person details
export const fetchPersonDetails = async (id: number) : Promise<{
  person: any;
  credits: any[];
}> => {
  try {
    const [personRes, movieCreditsRes, tvCreditsRes] = await Promise.all([
      tmdbApi.get(`/person/${id}`),
      tmdbApi.get(`/person/${id}/movie_credits`),
      tmdbApi.get(`/person/${id}/tv_credits`),
    ]);

    const combinedCredits = [
      ...movieCreditsRes.data.cast.map((m: any) => ({ ...m, media_type: "movie" })),
      ...tvCreditsRes.data.cast.map((t: any) => ({ ...t, media_type: "tv" })),
    ]

    return {
      person: personRes.data,
      credits: combinedCredits.sort(() => Math.random() - 0.5), 
    };
  } catch (error) {
    console.error("Error fetching person details:", error);
    throw error;
  }
}