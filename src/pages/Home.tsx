import { useTrendingMovies } from "../hooks/useTrendingMovies";
import { type MovieProps } from "../utils/types/card.type";
import Loading from "../components/common/Loading";
import Error from "../components/common/Error";
import HeroSection from "../components/layout/HeroSection";
import { GENRE_MAP } from "../utils/constant";
import MovieRow from "../components/layout/MovieRow";

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
      <section className="w-full relative">
        <HeroSection data={data as MovieProps[]} />
      </section>
      <section className="py-8 px-3 lg:px-0 container mx-auto" id="Movie-list">
        {GENRE_MAP.map((genre) => (
          <MovieRow
            key={genre.name}
            title={genre.name}
            movieId={genre.movie}
            tvId={genre.tv}
            exploreLink={`/genre/${genre.movie}/${genre.tv}/${genre.name}`}
            category={genre.name}
          />
        ))}
      </section>
    </>
  );
};

export default Home;
