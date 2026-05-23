export type NavLinkType = {
  name: string;
  path: string;
  label: string;
  id: string;
};

export type DirectionType = "row" | "column";

// Type for search result
export interface SearchResult {
  id: number;
  title?: string;
  name?: string;
  media_type: string;
  poster_path: string;
  release_date?: string;
  overview?: string;
}