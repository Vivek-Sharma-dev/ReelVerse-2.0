import { Check, PlayCircleIcon, Plus, Star } from "lucide-react";
import { BiMovie } from "react-icons/bi";
import { Link } from "react-router-dom";
import type { MovieProps } from "../../utils/types/card.type";
import { movieGenreMap, tvGenreMap } from "../../utils/types/Mapping";
import { useWatchlist } from "../../context/WatchlistContext";
import type React from "react";

const MovieCard = ({ data }: { data: MovieProps }) => {
  const isMovie =
    data?.media_type === "movie" || !!data?.title || !!data?.release_date;
  const geners = data?.genre_ids.map((id) => {
    return isMovie ? movieGenreMap[id] : tvGenreMap[id];
  });

  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();

  const isAdded = isInWatchlist(data?.id);

  const handleWatchlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (isAdded) {
      removeFromWatchlist(data.id);
    } else {
      addToWatchlist(data);
    }
  };

  const filteredGeners = geners.filter(
    (genre) => genre !== undefined && genre.length > 0,
  ) as string[];

  const type = isMovie ? "movie" : "tv";
  return (
    <Link to={`/watch/${type}/${data?.id}`} className="w-full h-full">
      {/* card for single movie */}
      <div className="border-2 border-gray-400 hover:scale-101 hover:border-vibe-cyan rounded-lg overflow-hidden  hover:glow transition-all duration-300 group h-full">
        <div className="h-92 aspect-auto overflow-hidden relative">
          <img
            src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
            alt={data?.original_title || data?.original_name}
            className={`object-fit object-center rounded-t-lg shadow-lg h-full w-full transition-transform duration-300 group-hover:scale-105`}
          />
          <div>
            {isMovie ? (
              <p className="absolute top-2 right-2 text-vibe-cyan bg-black/40 outline outline-white/20 text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
                Movie <BiMovie />
              </p>
            ) : (
              <p className="absolute top-2 right-2 text-vibe-cyan bg-black/40 outline outline-white/20 text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
                TV Show <PlayCircleIcon />
              </p>
            )}
          </div>
        </div>
        <div className="p-2 flex flex-col gap-1">
          <div className="flex justify-between">
            <h1 className="text-xl font-medium group-hover:text-vibe-cyan transition-all duration-300 line-clamp-1">
              {data?.title ||
                data?.name ||
                data?.original_title ||
                data?.original_name}
            </h1>
            {data?.vote_average !== 0 && (
              <p className="text-vibe-cyan flex items-center gap-1">
                <Star
                  className="text-vibe-cyan"
                  fill="currentColor"
                  size={15}
                />
                {data?.vote_average.toFixed(1)}
              </p>
            )}
          </div>
          <div className="flex items-center gap-4">
            <p className="text-[12px] text-gray-400 mt-2 bg-gray-700 px-2 py-1 rounded font-semibold line-clamp-1">
              {data?.release_date || data?.first_air_date}
            </p>
            <p className="text-[12px] text-gray-400 bg-gray-700 mt-2 px-2 py-1 rounded font-semibold line-clamp-1">
              {filteredGeners.length > 0
                ? filteredGeners.slice(0, 2).join(", ")
                : "Unknown Genre"}
            </p>
          </div>
          <p
            className={`text-[14px] text-gray-300 mt-2 ${data?.overview ? "line-clamp-2" : "min-h-10"}`}
          >
            {data?.overview ? data?.overview : "No overview available"}
          </p>
          <div className="border-b border-gray-700 mt-3" />
          <div className="flex justify-center items-center my-2">
            <button
              onClick={handleWatchlistToggle}
              className={`flex items-center gap-2 text-xs transition-all duration-300 active:scale-95 py-1 font-semibold ${
                isAdded
                  ? "text-vibe-cyan hover:text-red-400"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {isAdded ? (
                <>
                  <Check size={14} className="animate-scaleIn" />
                  <span>In Watchlist</span>
                </>
              ) : (
                <>
                  <Plus size={14} />
                  <span>Watch list</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
