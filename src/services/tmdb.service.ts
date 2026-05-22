import {
  type ContentDetailsProps,
  type CreditsResponse,
  type MovieProps,
} from "./../utils/types/card.type";
import type { ContentFilter, PersonDetails } from "../utils/constant";
import { filterAdultContent } from "../utils/functions";
import tmdbApi from "./api.service.ts";

// ** Content fetching functions for TMDB API

// 1. Fetch trending movies of the week
export const fetchTrendingMovies = async () => {
  try {
    const response = await tmdbApi.get("/trending/movie/week");
    return response.data.results;
  } catch (error) {
    // eslint-disable-next-line no-console
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
      const baseParams: ContentFilter = {
        sort_by: filter.sort_by,
        include_adult: filter.include_adult,
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

      const res = await tmdbApi.get(`/discover/${type}`, {
        params: getParams(type as "movie" | "tv"),
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
    // eslint-disable-next-line no-console
    console.error("Error fetching content by genre:", error);
    throw error;
  }
};

// ** fetching movie details, credits, similar movies, etc. can be added here as needed in the future
// fetch movie details
export const fetchMovieDetails = async (id: number, type: string) => {
  try {
    const [details, credits, similarMovies] = await Promise.all([
      tmdbApi.get(`/${type}/${id}`), // fetch movie details
      tmdbApi.get(`/${type}/${id}/credits`), // fetch credits first to get director and main cast
      tmdbApi.get(`/${type}/${id}/similar`), // fetch similar movies
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
    // eslint-disable-next-line no-console
    console.error("Error fetching movie details:", error);
    throw error;
  }
};

// fetch trailer
export const fetchTrailer = async (id: number, type: string) => {
  try {
    const response = await tmdbApi.get(`/${type}/${id}/videos`);
    return response.data;
  } catch (error) {
    // eslint-disable-next-line no-console
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
    // eslint-disable-next-line no-console
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
  const params: ContentFilter = {
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
      results: combined.sort(() => Math.random() - 0.5), // shuffle results

      page,
      total_pages: res.data.total_pages,
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error fetching content by genre:", error);
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
      tmdbApi.get(`/person/${id}`),
      tmdbApi.get(`/person/${id}/movie_credits`),
      tmdbApi.get(`/person/${id}/tv_credits`),
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
    // eslint-disable-next-line no-console
    console.error("Error fetching person details:", error);
    throw error;
  }
};

//fetch trailers data for explore page (anime, indian, hollywood) with parallel trailer validation and category tagging
export const fetchTrailerData = async (page: number) => {
  // 1. ANIME: Keyword ID for Anime is 210024 or Japanese animation genre logic
  const animePromise = tmdbApi.get("/discover/movie", {
    params: {
      page,
      with_keywords: "210024|287501", // Anime & Animation tags
      with_original_language: "ja", // Japanese origin (Anime)
    },
  });

  // 2. INDIAN: Region IN, languages Hindi (hi) or regional
  const indianPromise = tmdbApi.get("/discover/movie", {
    params: {
      page,
      region: "IN",
      with_original_language: "hi",
    },
  });

  // 3. HOLLYWOOD: Language English (en), popular releases
  const hollywoodPromise = tmdbApi.get("/discover/movie", {
    params: {
      page,
      with_original_language: "en",
    },
  });

  const [animeRes, indianRes, hollywoodRes] = await Promise.all([
    animePromise,
    indianPromise,
    hollywoodPromise,
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

  interface TrailerTypes {
    key: string;
    name: string;
    site: string;
    size: number;
    type: string;
    official: boolean;
    published_at: string;
    id: string;
  }
  // 🎬 Parallel trailer validation check pipeline (No Blank Videos allowed)
  const finalizedList = await Promise.all(
    combinedResults.map(async (movie: ContentDetailsProps) => {
      try {
        const videoRes = await tmdbApi.get(`/movie/${movie.id}/videos`);
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

  // Filter out any entries where trailer was not found
  return finalizedList
    .filter((m) => m !== null)
    .sort(() => Math.random() - 0.5);
};
