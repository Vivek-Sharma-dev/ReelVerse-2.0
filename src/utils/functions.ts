// Kisi bhi type ke object ko handle karne ke liye interface define karo jo flexible ho
interface MinimalContentProps {
  title?: string;
  name?: string;
  overview?: string;
  genres?: { id: number; name: string }[];
  genre_ids?: number[]; // Safe side ke liye, agar search params mein IDs aayein
}

export const filterAdultContent = <T extends MinimalContentProps>(content: T[]): T[] => {
  const BANNED_PLATFORMS = [
    "ullu", "kooku", "altbalaji", "primeshot", "gandii baat", 
    "charmsukh", "chachi no.1", "palang tod", "jane anjane mein",
    "sensual", "erotic", "seductive", "hot", "sexy", "sex", "xxx", "adult", "18+",
    "hentai", "ecchi", "intimacy", "marital", "naked", "uncensored", 
    "undercover agent riko", "nudity", "lust", "desire",
  ];

  if (!content || !Array.isArray(content)) return [];

  return content.filter((item: T) => {
    const title = (item.title || item.name || "").toLowerCase();
    const overview = (item.overview || "").toLowerCase();

    // 1. Keyword check (Title + Description)
    const hasBannedWord = BANNED_PLATFORMS.some((word) => {
      return title.includes(word) || overview.includes(word);
    });

    if (hasBannedWord) return false;

    // 2. Genres object array check (Detailed content ke liye)
    if (item.genres && Array.isArray(item.genres)) {
      const hasAdultGenre = item.genres.some((genre) => genre.id === 10749);
      if (hasAdultGenre && (overview.includes("touching") || title.includes("body"))) {
        return false;
      }
    }

    // 3. Genre IDs array check (Search results / Grid items ke liye)
    if (item.genre_ids && Array.isArray(item.genre_ids)) {
      const hasAdultGenreId = item.genre_ids.includes(10749);
      if (hasAdultGenreId && (overview.includes("touching") || title.includes("body"))) {
        return false;
      }
    }

    return true;
  });
};