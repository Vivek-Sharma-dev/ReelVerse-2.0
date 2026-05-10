import { useParams } from "react-router-dom";
import { useInfiniteGenreMovies } from "../hooks/useGenreMovies";
import Loading from "../components/common/Loading";
import MovieCard from "../components/common/MovieCard";
import { useEffect, useState, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { FiFilter, FiChevronDown } from "react-icons/fi";
import FilterModel from "../components/common/FilterModel";
import Error from "../components/common/Error";

const GenreContent = () => {
  const { movieId, tvId, genreName } = useParams();
  const [filters, setFilters] = useState({
    mediaType: "all",
    year: "",
    includeAdult: false,
    sortBy: "popularity.desc",
    rating: "",
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { ref, inView } = useInView();

  const { data, fetchNextPage, hasNextPage, isPending, isError } =
    useInfiniteGenreMovies(Number(movieId), Number(tvId), filters);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView, hasNextPage, fetchNextPage]);

  if (isPending) return <Loading />;
  if (isError) return <Error />;

  const allResults = data?.pages.flatMap((page) => page.results) || [];

  return (
    <div className="container mx-auto px-4 py-10 min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-end mb-12 border-b border-zinc-800 pb-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">
            {genreName || "Action"}{" "}
            <span className="text-vibe-cyan">Content</span>
          </h1>
          <p className="text-zinc-500 text-sm mt-2 font-medium tracking-wide">
            Exploring {allResults.length}+ titles in this category
          </p>
        </div>

        {/* Custom Filter Dropdown */}
        <div>
          <div className="relative inline-block text-left" ref={dropdownRef}>
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
        </div>
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 items-stretch gap-6">
        {allResults.map((movie) => (
          <MovieCard key={`${movie.id}-${movie.media_type}`} data={movie} />
        ))}
      </div>

      {/* Loader for Infinite Scroll */}
      <div ref={ref} className="py-10 flex justify-center">
        {hasNextPage && <Loading />}
      </div>
    </div>
  );
};

export default GenreContent;
