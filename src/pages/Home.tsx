import { useTrendingMovies } from "../hooks/useTrendingMovies";
import { type MovieProps } from "../utils/types/card.type";
import Loading from "../components/common/Loading";
import Error from "../components/common/Error";
import MovieCard from "../components/common/MovieCard";
import HeroSection from "../components/layout/header/HeroSection";

const Home = () => {
  const { data, isError, isLoading } = useTrendingMovies();
  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <Error />;
  }
  return (
    <>
      <section className="w-full min-h-screen relative">
        <HeroSection data={data as MovieProps[]} />
        <div className="grid grid-cols-4 gap-4 my-10">
          {data?.slice(0, 12).map((movie) => (
            <MovieCard key={movie.id} data={movie} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
