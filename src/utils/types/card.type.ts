export interface MovieProps {
  name?: string | undefined; // TV show name
  id: number;
  release_date: string;
  poster_path: string;
  vote_average: number;
  backdrop_path: string;
  overview: string;
  genre_ids: number[];
  popularity: number;
  vote_count: number;
  original_language: string;
  video: boolean;
  adult: boolean;
  original_title: string;
  media_type: string;
  title: string;
  // tv option
  first_air_date: string;
  original_name: string;
  youtubeKey?: string;
  category? : string;
};



export interface ContentDetailsProps extends Omit<
  MovieProps,
  | "genre_ids"
  | "title"
  | "release_date"
  | "original_title"
  | "original_name"
  | "first_air_date"
> {
  // 1. Common detailed fields
  genres: { id: number; name: string }[];
  tagline: string;
  status: string;
  imdb_id: string;
  homepage: string;
  production_companies: {
    id: number;
    name: string;
    logo_path: string;
    origin_country: string;
  }[];

  // 2. Movie Specific (Keep them optional)
  title?: string;
  original_title?: string;
  release_date?: string;
  runtime?: number;
  budget?: number;
  revenue?: number;
  belongs_to_collection?: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  };

  // 3. TV Specific
  id: number;
  name?: string;
  original_name?: string;
  first_air_date?: string;
  number_of_seasons?: number;
  number_of_episodes?: number;
  episode_run_time?: number[];
  episode_count: number;

  // season
  seasons: [
    {
      id: number;
      name: string;
      poster_path: string;
      episode_count: number;
    },
  ];
}

export interface CastProps {
  id: number;
  name: string; // Asli naam (e.g., Chris Pratt)
  character: string; // Movie character (e.g., Mario)
  profile_path: string | null; // Actor ki image
  order: number; // Display order (Top cast ke liye kaam aayega)
}

// Credits Response Type
export interface CreditsResponse {
  id: number;
  cast: CastProps[];
}
