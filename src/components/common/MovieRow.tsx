import { Link } from "react-router-dom";
import MovieCard from "./MovieCard.tsx";
import { useInfiniteGenreMovies } from "../../hooks/useGenreMovies.tsx";
import type { MovieProps } from "../../utils/types/movie.type.ts";
import CardLoader from "./loaders/CardLoader.tsx";
import Error from "./Error.tsx";
import type { ContentFilter } from "../../utils/types/filter.type.ts";
type MovieRowProps = {
  title: string; // Section name (e.g., "Horror Classics")
  exploreLink: string; // Link to explore more
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
    sort_by: "popularity.desc",
    include_adult: false,
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

  if (isPending) return <CardLoader CardsCount={8} />;
  if (isError) return <Error />;
  const movies =
    data?.pages.flatMap((page) => page.results).slice(0, 8) ||
    ([] as MovieProps[]);
  return (
    <section id={`${category}`} className="py-8">
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
      /* Movie Cards Grid */
      <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {movies?.map((movie: MovieProps, idx: number) => (
          <div
            className={`${idx >= 4 ? "hidden lg:block" : ""}`}
            key={movie.id}
          >
            <MovieCard data={movie} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default MovieRow;
