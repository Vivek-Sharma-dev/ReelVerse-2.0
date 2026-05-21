import { useParams } from "react-router-dom";
import { useInfiniteGenreMovies } from "../hooks/useGenreMovies";
import Loading from "../components/common/Loading";
import MovieCard from "../components/common/MovieCard";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { FiFilter, FiChevronDown } from "react-icons/fi";
import FilterModel from "../components/common/FilterModel";
import Error from "../components/common/Error";
import HeroSection from "../components/layout/HeroSection";
import useMetaData from "../hooks/useMetaData";
import CarouselSkeleton from "../components/common/CarouselSkeleton";
import CardLoader from "../components/common/CardLoader";

const GenreContent = () => {
  const { movieId, tvId, genreName } = useParams();
  const [filters, setFilters] = useState({
    mediaType: "all",
    year: "",
    includeAdult: false,
    sortBy: "popularity.desc",
    rating: "",
  });
  useMetaData(
    `${genreName || "Genre"} Content`,
    `Explore a curated collection of ${genreName || "genre"} movies and TV shows on ReelVerse. Dive into trending titles, personalized recommendations, and detailed information about your favorite entertainment in this genre.`,
  );
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { ref, inView } = useInView();

  const { data, fetchNextPage, hasNextPage, isPending, isError } =
    useInfiniteGenreMovies(Number(movieId), Number(tvId), filters, "");

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView, hasNextPage, fetchNextPage]);

  if (isPending) return (
    <>
    <CarouselSkeleton />
    <CardLoader CardsCount={8} />
    </>
  );
  if (isError) return <Error />;

  const allResults = data?.pages.flatMap((page) => page.results) || [];

  return (
    <>
      <section className="mb-4">
        <HeroSection data={allResults.slice(0, 5)} />
      </section>
      {/* Header Section */}
      <section className="flex justify-between items-center mb-12 border-b border-zinc-800 pb-6 container mx-auto px-4">
        <div>
          <h1 className="text-xl lg:text-4xl md:text-5xl font-black text-white uppercase tracking-tighter ">
            {genreName || "Action"}{" "}
            <span className="text-vibe-cyan text-sm lg:text-xl">Content</span>
          </h1>
          <p className="text-zinc-500 text-sm mt-2 font-medium tracking-wide">
            Exploring {allResults.length}+ titles in this category
          </p>
        </div>

        {/* Custom Filter Dropdown */}
        <div className="relative inline-block text-left">
          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-2 text-zinc-500 hover:text-white"
          >
            <FiFilter />
            <span>Filter</span>
            <FiChevronDown />
          </button>
          <FilterModel
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            filters={filters}
            setFilters={setFilters}
          />
        </div>
      </section>

      {/* Grid Section */}
      <section id="content-portion" className="container mx-auto px-3 lg:px-0">
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 items-stretch gap-6">
          {allResults.map((movie) => (
            <MovieCard key={`${movie.id}-${movie.media_type}`} data={movie} />
          ))}
        </div>
      </section>

      {/* Loader for Infinite Scroll */}
      <div ref={ref} className="py-10 flex justify-center">
        {hasNextPage && <Loading />}
      </div>
    </>
  );
};

export default GenreContent;
