import { useTrendingMovies } from "../hooks/useTrendingMovies";
import { type MovieProps } from "../utils/types/card.type";
import Error from "../components/common/Error";
import HeroSection from "../components/layout/HeroSection";
import { GENRE_MAP } from "../utils/constant";
import MovieRow from "../components/layout/MovieRow";
import useMetaData from "../hooks/useMetaData";
import CardLoader from "../components/common/loaders/CardLoader";
import CarouselSkeleton from "../components/common/loaders/CarouselSkeleton";

const Home = () => {
  useMetaData(
    "Home",
    "Welcome to ReelVerse, your ultimate destination for discovering trending movies and TV shows. Explore personalized recommendations, detailed information, and a vast collection of entertainment content all in one place.",
  );
  const { data, isError, isLoading } = useTrendingMovies();
  if (isLoading) {
    return (
      <>
        <CarouselSkeleton />
        <CardLoader CardsCount={8} />
      </>
    );
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
