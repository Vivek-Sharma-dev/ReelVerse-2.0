import { Play, Plus, Star, X } from "lucide-react";
import { useWatchlist } from "../../hooks/useWatchlist";
import type { ContentDetailsProps, TrailerType } from "../../utils/types/movie.type";
const Banner = ({
  details,
  trailer,
  isTrailerPlaying,
  setIsTrailerPlaying,
}: {
  details: ContentDetailsProps;
  trailer: TrailerType | null;
  isTrailerPlaying: boolean;
  setIsTrailerPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  // Common Data Handling
  const title = details.title || details.name;
  const date = details.release_date || details.first_air_date;
  const year = date ? new Date(date).getFullYear() : "N/A";
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
  const isAdded = isInWatchlist(details.id);

  const handleWatchlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (isAdded) {
      removeFromWatchlist(details.id);
    } else {
      const formattedMovieForWatchlist = {
        // FIX: Details page ke [{id, name}] array ko flat integer list [id] mein map karo 🌟
        id: details.id,
        title: details.title || "",
        name: details.name || "",
        original_title: details.original_title || "",
        original_name: details.original_name || "",
        backdrop_path: details.backdrop_path || "",
        poster_path: details.poster_path || "",
        overview: details.overview || "",
        vote_average: details.vote_average || 0,
        release_date: details.release_date || "",
        first_air_date: details.first_air_date || "",
        media_type: details.title || details.release_date ? "movie" : "tv",
        adult: details.adult || false,
        video: details.video || false,
        vote_count: details.vote_count || 0,
        popularity: details.popularity || 0,
        original_language: details.original_language || "",

        // FIX: Details page ke [{id, name}] array ko flat integer list [id] mein map karo 🌟
        genre_ids: details.genres
          ? details.genres.map((g: { id: number }) => g.id)
          : [],
      };
      addToWatchlist(formattedMovieForWatchlist);
    }
  };

  // Format Runtime: Movies use 'runtime', TV uses 'episode_run_time' array
  const rawRuntime = details.runtime || details.episode_run_time?.[0] || 0;
  const hours = Math.floor(rawRuntime / 60);
  const minutes = rawRuntime % 60;
  const duration = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;

  return (
    <div className="relative w-full h-[60dvh] md:h-[80dvh]">
      {/* 📺 Trailer Modal */}
      {isTrailerPlaying && trailer?.key ? (
        <>
          <div className="relative w-full h-full z-50 rounded-2xl">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&loop=1&playlist=${trailer.key}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
            <button
              onClick={() => setIsTrailerPlaying(false)}
              className="absolute top-13 right-6 p-2 bg-white/20 rounded-full hover:bg-white/40 active:scale-95"
            >
              <X />
            </button>
          </div>
        </>
      ) : (
        // 🎬 Movie Hero Banner
        <>
          {/* 1. Background Image */}
          <div className="absolute inset-0">
            <img
              src={`https://image.tmdb.org/t/p/original${details.backdrop_path}`}
              className="w-full h-full object-cover object-top"
              alt={title}
            />
            <div className="hidden lg:block absolute inset-0 bg-linear-to-t from-main-bg via-main-bg/60 to-transparent" />
            <div className="hidden lg:block absolute inset-0 bg-linear-to-r from-main-bg via-transparent to-transparent" />
          </div>

          {/* 2. Content Container */}
          <div className="absolute bottom-10 left-0 px-6 md:px-16 w-full z-10">
            <div className="flex flex-col gap-4 max-w-4xl">
              {/* Tagline if exists */}
              {details.tagline && (
                <span className="text-vibe-cyan italic tracking-widest text-sm md:text-base opacity-90 font-serif">
                  "{details.tagline}"
                </span>
              )}

              <h1 className="text-xl lg:text-4xl md:text-3xl font-serif uppercase tracking-tighter leading-none">
                {title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm md:text-lg font-medium text-zinc-300">
                {details?.vote_average !== 0 && (
                  <p className="text-vibe-cyan flex items-center gap-1">
                    <Star
                      className="text-vibe-cyan"
                      fill="currentColor"
                      size={15}
                    />
                    {details?.vote_average.toFixed(1)}
                  </p>
                )}
                <span className="text-vibe-cyan">{year}</span>
                <span className="px-2 py-0.5 border border-zinc-600 rounded text-xs">
                  HD
                </span>
                {details?.runtime && <span>{duration}</span>}
                <div className="flex gap-2">
                  {details.genres?.slice(0, 3).map((g) => (
                    <span
                      key={g.id}
                      className="text-zinc-400 underline decoration-vibe-cyan/40 underline-offset-4"
                    >
                      {g.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* 3. Buttons */}
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-3">
                {trailer?.key ? (
                  <button
                    onClick={() => setIsTrailerPlaying(true)}
                    className="bg-vibe-cyan text-white px-6 py-2 lg:py-3 rounded-full font-bold hover:bg-vibe-cyan/80 transition-colors flex items-center gap-2"
                  >
                    <Play className="text-white" fill="currentColor" /> Watch
                    Trailer
                  </button>
                ) : (
                  <button
                    disabled
                    className="bg-zinc-800 text-zinc-500 border border-zinc-700 px-6 py-2 lg:py-3 rounded-full font-bold cursor-not-allowed flex items-center gap-2"
                  >
                    Trailer Unavailable
                  </button>
                )}
                <button
                  onClick={handleWatchlistToggle}
                  className="bg-white/10 px-6 py-3 rounded-full font-bold hover:bg-white/20 transition-colors flex items-center gap-2"
                >
                  <Plus /> {isAdded ? "Remove from" : "Add to"} Watchlist
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      {/* 1. Backdrop Image with Gradient Overlay */}
    </div>
  );
};

export default Banner;
