import { Link } from "react-router-dom";
import MovieCard from "../common/MovieCard";
import {
  useInfiniteGenreMovies,
} from "../../hooks/useGenreMovies.tsx";
import type { MovieProps } from "../../utils/types/card.type";
import type { ContentFilter } from "../../utils/constant.ts";

type MovieRowProps = {
  title: string; // Section name (e.g., "Horror Classics")
  exploreLink: string; // "Explore All" button ka path
  movieId: number | null | undefined;
  tvId: number | null | undefined;
  category: string | undefined;
  filter?: ContentFilter;
};

const MovieRow = ({
  title,
  movieId,
  tvId,
  exploreLink,
  category = "",
  filter = {
    mediaType: "all",
    sortBy: "popularity.desc",
    includeAdult: false,
    year: "",
    rating: "",
  },
}: MovieRowProps) => {
  const { data, isPending, isError } = useInfiniteGenreMovies(
    movieId,
    tvId,
    filter,
    category,
  );
  if(isPending) return <p>Loading...</p>;
  if(isError) return <p>Error loading movies.</p>;
  const movies =
  data?.pages.flatMap((page) => page.results).slice(0, 8) || ([] as MovieProps[]);
  console.log(movies)
  return (
    <section className="py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl lg:text-2xl font-bold text-vibe-cyan border-l-4 border-vibe-cyan pl-4">
          {title}
        </h2>
        <Link
          to={exploreLink}
          className="text-sm text-zinc-400 hover:text-vibe-cyan transition-colors"
        >
          Explore All →
        </Link>
      </div>

      <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {movies?.map((movie: MovieProps, idx: number) => (
          <div className={`${idx >= 4 ? "hidden lg:block" : ""}`} key={movie.id}>
          <MovieCard data={movie} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default MovieRow;
