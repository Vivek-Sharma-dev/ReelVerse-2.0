export interface ContentFilter {
  mediaType?: string | null | undefined;
  sort_by: string;
  include_adult: boolean;
  year: string;
  rating: string;
  primary_release_year?: string;
  first_air_date_year?: string;
  page?: number
  with_original_language?: string;
  region?: string;
  with_genres?: number | null | undefined;
  language?: string;
}