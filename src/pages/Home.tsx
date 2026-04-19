import React from "react";
import { useTrendingMovies } from "../hooks/useTrendingMovies";
import { type MovieProps } from "../utils/types/card.type";
import Loading from "../components/common/Loading";
import Error from "../components/common/Error";
import { Play, PlayCircleIcon, Plus, Star } from "lucide-react";
import { movieGenreMap, tvGenreMap } from "../utils/types/Mapping";
import { BiMovie } from "react-icons/bi";
import { Link } from "react-router-dom";
const Home = () => {
  const { data, isError, isLoading } = useTrendingMovies();

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <Error />;
  }
  const singleMovie = data ? (data as MovieProps[])[0] : null;
  console.log(singleMovie);

  const geners = singleMovie?.genre_ids.map((id) => {
    return singleMovie?.media_type === "movie"
      ? movieGenreMap[id]
      : tvGenreMap[id];
  });

  return (
    <Link to={`/movie/${singleMovie?.id}`} className="w-full h-full ">
      {/* card for single movie */}
      <div className="w-72 border-2 border-gray-400 hover:scale-101 hover:border-vibe-cyan rounded-lg overflow-hidden  hover:glow transition-all duration-300 group">
        <div className=" h-72 w-full overflow-hidden relative">
          <img
            src={`https://image.tmdb.org/t/p/w500/${singleMovie?.poster_path}`}
            alt={singleMovie?.original_title}
            className={`object-cover object-bottom rounded-lg shadow-lg h-full w-full transition-transform duration-300 group-hover:scale-105`}
          />
          <div>
            {singleMovie?.media_type === "movie" ? (
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
            <h1 className="text-mdx font-medium group-hover:text-vibe-cyan transition-all duration-300">
              {singleMovie?.original_title}
            </h1>
            <p className="text-vibe-cyan flex items-center gap-1">
              <Star className="text-vibe-cyan" fill="currentColor" size={15} />
              {singleMovie?.vote_average.toFixed(1)}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-[12px] text-gray-400 mt-2 bg-gray-700 px-2 py-1 rounded font-semibold">
              {singleMovie?.release_date}
            </p>
            <p className="text-[12px] text-gray-400 bg-gray-700 mt-2 px-2 py-1 rounded font-semibold">
              {geners?.slice(0, 3).join(", ") || "Unknown Genre"}
            </p>
          </div>
          <p className="text-[14px] text-gray-300 mt-2 line-clamp-2">
            {singleMovie?.overview}
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

export default Home;
