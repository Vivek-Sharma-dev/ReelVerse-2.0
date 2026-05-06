import { useParams } from "react-router-dom";
import { useGenreMovies } from "../hooks/useGenreMovies";
import Loading from "../components/common/Loading";
import Error from "../components/common/Error";
import MovieCard from "../components/common/MovieCard";
import type { MovieProps } from "../utils/types/card.type";

const GenreContent = () => {
  const { movieId, tvId } = useParams();
  const {data, isPending, isError } = useGenreMovies(Number(movieId), Number(tvId));
  if(isPending) return <Loading  />;
  if(isError) return <Error />;
  console.log(data);
  return (
    <>
    <div className="grid grid-cols-4 gap-3 container mx-auto">
    {data.map((movie: MovieProps) => (
        
        <MovieCard key={movie.id} data={movie} />
    ))}
    </div>
    </>
  );
};

export default GenreContent;
