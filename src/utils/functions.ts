import type { ContentDetailsProps } from "./types/card.type";

export const filterAdultContent = (
  content: ContentDetailsProps[],
): ContentDetailsProps[] => {
  const BANNED_PLATFORMS = [
    "ullu",
    "kooku",
    "altbalaji",
    "primeshot",
    "gandii baat",
    "charmsukh",
    "chachi no.1",
    "palang tod",
    "jane anjane mein",
    "sensual",
    "erotic",
    "seductive",
    "hot",
    "sexy",
    "sex",
    "xxx",
    "adult",
    "18+",
    "hentai",
    "ecchi",
    "intimacy",
    "marital",
    "naked",
    "uncensored",
    "undercover agent riko",
    "nudity",
    "lust",
    "desire",
  ];
  return content.filter((item: ContentDetailsProps) => {
    const title = (item.title || item.name || "").toLowerCase();
    const overview = (item.overview || "").toLowerCase();

    const hasBannedWord = BANNED_PLATFORMS.some((word) => {
      return title.includes(word) || overview.includes(word);
    });

    if (hasBannedWord) return false;

    if (
      item.genres &&
      Array.isArray(item.genres) &&
      item.genres.some((genre) => genre.id === 10749) &&
      (overview.includes("touching") || title.includes("body"))
    )
      return false;
    return true;
  });
};
