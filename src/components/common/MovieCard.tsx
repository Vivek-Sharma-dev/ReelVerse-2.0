import { Play, PlayCircleIcon, Plus, Star } from "lucide-react";
import { BiMovie } from "react-icons/bi";
import { Link } from "react-router-dom";
import type { MovieCardProps } from "../../utils/types/card.type";
import { movieGenreMap, tvGenreMap } from "../../utils/types/Mapping";

const MovieCard = ({ data }: { data: MovieCardProps }) => {
  const geners = data?.genre_ids.map((id) => {
    return data?.media_type === "movie" ? movieGenreMap[id] : tvGenreMap[id];
  });
  return (
    <Link to={`/movie/${data?.id}`} className="w-full h-full ">
      {/* card for single movie */}
      <div className="border-2 border-gray-400 hover:scale-101 hover:border-vibe-cyan rounded-lg overflow-hidden  hover:glow transition-all duration-300 group">
        <div className="h-62 aspect-auto overflow-hidden relative">
          <img
            src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
            alt={data?.original_title}
            className={`object-cover object-bottom rounded-t-lg shadow-lg h-full w-full transition-transform duration-300 group-hover:scale-105`}
          />
          <div>
            {data?.media_type === "movie" ? (
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
            <h1 className="text-mdx font-medium group-hover:text-vibe-cyan transition-all duration-300 line-clamp-1">
              {data?.original_title}
            </h1>
            <p className="text-vibe-cyan flex items-center gap-1">
              <Star className="text-vibe-cyan" fill="currentColor" size={15} />
              {data?.vote_average.toFixed(1)}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-[12px] text-gray-400 mt-2 bg-gray-700 px-2 py-1 rounded font-semibold">
              {data?.release_date}
            </p>
            <p className="text-[12px] text-gray-400 bg-gray-700 mt-2 px-2 py-1 rounded font-semibold">
              {geners?.slice(0, 3).join(", ") || "Unknown Genre"}
            </p>
          </div>
          <p className="text-[14px] text-gray-300 mt-2 line-clamp-2">
            {data?.overview}
          </p>
          <div className="border-b border-gray-700 mt-3" />
          <div className="flex justify-between items-center my-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                console.log("add to wishlist");
              }}
              className="flex items-center gap-2 text-gray-400 cursor-pointer hover:text-white transition-all duration-300 active:scale-95"
            >
              <Plus /> Watch list
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                console.log("play trailer");
              }}
              className="border-2 p-2 rounded-full border-vibe-cyan"
              aria-label="play trailer"
            >
              <Play className="text-vibe-cyan" fill="currentColor" size={16} />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
