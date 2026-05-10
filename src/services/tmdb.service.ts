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
  movieGenreId: number,
  tvGenreId: number | null | undefined,
  page: number = 1,
  filter: {
    mediaType: string;
    sortBy: string;
    includeAdult: boolean;
    year: string;
    rating: string;
  } = {
    mediaType: "all",
    sortBy: "popularity.desc",
    includeAdult: false,
    year: "",
    rating: "",
  },
) => {
  try {
    let combined = [];
    let totalPages = 500;
    if (filter.mediaType === "all") {
      const [movies, tvShows] = await Promise.all([
        tmdbApi.get("/discover/movie", {
          params: {
            with_genres: movieGenreId,
            sort_by: filter.sortBy,
            include_adult: filter.includeAdult,
            year: filter.year,
            rating: filter.rating,
            primary_release_year: filter.year,
            page,
          },
        }),
        tmdbApi.get("/discover/tv", {
          params: {
            with_genres: tvGenreId,
            sort_by: filter.sortBy,
            include_adult: filter.includeAdult,
            year: filter.year,
            rating: filter.rating,
            first_air_date_year: filter.year,
            page,
          },
        }),
      ]);

      combined = [
        ...movies.data.results.map((m: any) => ({ ...m, media_type: "movie" })),
        ...tvShows.data.results.map((t: any) => ({ ...t, media_type: "tv" })),
      ];
    } else {
      const type = filter.mediaType === "anime" ? "tv" : filter.mediaType;
      const genre =
        filter.mediaType === "anime"
          ? 16
          : type === "movie"
            ? movieGenreId
            : tvGenreId;

      const res = await tmdbApi.get(`/discover/${type}`, {
        params: {
          with_genres: genre,
          sort_by: filter.sortBy,
          include_adult: filter.includeAdult,
          year: filter.year,
          rating: filter.rating,
          primary_release_year: filter.year,
          first_air_date_year: filter.year,
          page,
        },
      });
      combined = res.data.results.map((t: any) => ({ ...t, media_type: type }));
      totalPages = res.data.total_pages;
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
