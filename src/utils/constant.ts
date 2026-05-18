export const GENRES = {
  ACTION: 28,
  HORROR: 27,
  ANIME: 16,
  COMEDY: 35,
  SCIFI: 878,
  ROMANCE: 10749,
};
export const GENRE_MAP = [
  {
    name: "Action",
    movie: 28,
    tv: 10759, // Action & Adventure in TV
  },
  {
    name: "Adventure",
    movie: 12,
    tv: 10759,
  },
  {
    name: "Animation",
    movie: 16,
    tv: 16,
  },
  {
    name: "Comedy",
    movie: 35,
    tv: 35,
  },
  {
    name: "Crime",
    movie: 80,
    tv: 80,
  },
  {
    name: "Documentary",
    movie: 99,
  },
  {
    name: "Drama",
    movie: 18,
    tv: 18,
  },
  {
    name: "Family",
    movie: 10751,
    tv: 10751,
  },
  {
    name: "Fantasy",
    movie: 14,
    tv: 10765, // Sci-Fi & Fantasy in TV
  },
  {
    name: "Horror",
    movie: 27,
    tv: null, // TV mein Horror ki specific main category nahi hoti (usually Mystery/Thriller)
  },
  {
    name: "Mystery",
    movie: 9648,
    tv: 9648,
  },
  {
    name: "Sci-Fi",
    movie: 878,
    tv: 10765,
  },
  {
    name: "Thriller",
    movie: 53,
    tv: null,
  },
  {
    name: "War",
    movie: 10752,
    tv: 10768, // War & Politics in TV
  },
];


export interface ContentFilter {
  mediaType: string;
  sortBy: string;
  includeAdult: boolean;
  year: string;
  rating: string;
  primary_release_year?: string;
  first_air_date_year?: string;
}