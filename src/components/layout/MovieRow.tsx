import { Link } from "react-router-dom";
import MovieCard from "../common/MovieCard";
import { useGenreMovies } from "../../hooks/useGenreMovies.tsx";
import type { MovieProps } from "../../utils/types/card.type";

type MovieRowProps = {
  title: string; // Section name (e.g., "Horror Classics")
  exploreLink: string; // "Explore All" button ka path
  movieId: number;
  tvId: number | null | undefined;
};

const MovieRow = ({ title, movieId, tvId, exploreLink }: MovieRowProps) => {

  const { data } = useGenreMovies(movieId, tvId);
  const movies = data?.slice(0, 8);

  return (
    <section className="py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-vibe-cyan border-l-4 border-vibe-cyan pl-4">
          {title}
        </h2>
        <Link
          to={exploreLink}
          className="text-sm text-zinc-400 hover:text-vibe-cyan transition-colors"
        >
          Explore All →
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {movies?.map((movie: MovieProps) => (
          <MovieCard key={movie.id} data={movie} />
        ))}
      </div>
    </section>
  );
};

export default MovieRow;
