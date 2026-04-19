import { useTrendingMovies } from "../hooks/useTrendingMovies";
import { type MovieProps } from "../utils/types/card.type";
import Loading from "../components/common/Loading";
import Error from "../components/common/Error";
import MovieCard from "../components/common/MovieCard";
import HeroSection from "../components/layout/header/HeroSection";
import { GENRES } from "../utils/constant";
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
      <section className="w-full min-h-screen relative">
        <HeroSection data={data as MovieProps[]} />
        <div className="grid grid-cols-4 gap-4 my-10">
          {data?.slice(0, 12).map((movie) => (
            <MovieCard key={movie.id} data={movie} />
          ))}
        </div>

        <div>
          {/* action movies */}
          <MovieRow
            title="Action Packed"
            genreId={GENRES.ACTION}
            exploreLink="/action"
          />
          {/* comedy movies */}
          <MovieRow
            title="Laugh Out Loud"
            genreId={GENRES.COMEDY}
            exploreLink="/comedy"
          />
          {/* horror movies */}
          <MovieRow
            title="Spine Chillers"
            genreId={GENRES.HORROR}
            exploreLink="/horror"
          />
          {/* sci-fi movies */}
          <MovieRow
            title="Sci-Fi Spectacles"
            genreId={GENRES.SCIFI}
            exploreLink="/sci-fi"
          />
          {/* romance movies */}
          <MovieRow
            title="Romantic Escapes"
            genreId={GENRES.ROMANCE}
            exploreLink="/romance"
          />
        </div>
      </section>
    </>
  );
};

export default Home;
