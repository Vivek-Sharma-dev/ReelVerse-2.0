import { useParams, useSearchParams } from "react-router-dom";
import { useInfinityExploreContent } from "../hooks/useGenreMovies";
import { useEffect, useState } from "react";
import MovieCard from "../components/common/MovieCard";
import FilterModel from "../components/common/FilterModel";
import { FiChevronDown, FiFilter } from "react-icons/fi";
import { useInView } from "react-intersection-observer";
import Loading from "../components/common/loaders/Loading";
import Error from "../components/common/Error";
import MovieRow from "../components/common/MovieRow";
import HeroSection from "../components/common/HeroSection";
import useMetaData from "../hooks/useMetaData";
import CardLoader from "../components/common/loaders/CardLoader";
import CarouselSkeleton from "../components/common/loaders/CarouselSkeleton";
import type { ContentFilter } from "../utils/types/filter.type";

const ExplorePage = () => {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { ref, inView } = useInView();

  // Set dynamic metadata based on category and sorting
  useMetaData(
    `${category ? category.charAt(0).toUpperCase() + category.slice(1) : "Explore"} Explore`,
    `Dive into the ${category ? category : "Explore"} section of ReelVerse to discover a curated collection of movies and TV shows. Filter by popularity, ratings, release year, and more to find your next binge-worthy obsession with ease.`,
  );
  // Dynamic sorting parameter from URL
  const currentSortParam = searchParams.get("sort") || "popularity.desc";
  // Check if user is applying custom sorting (like rating, release date) instead of default popularity
  const isCustomExploring = searchParams.has("sort");

  const [filters, setFilters] = useState<ContentFilter>({
    mediaType: "all",
    year: "",
    include_adult: false,
    sort_by: currentSortParam,
    rating: "",
  });

  // Sync filters with URL sort parameter changes
  useEffect(() => {
    // eslint-disable-next-line
    setFilters((prev) => ({
      ...prev,
      sort_by: currentSortParam,
    }));
  }, [currentSortParam]);

  const { data, isError, isLoading, fetchNextPage, hasNextPage } =
    useInfinityExploreContent(category || "IN", filters);

  // Infinite scroll trigger
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isError) return <Error />;
  if (isLoading)
    return (
      <>
        <CarouselSkeleton />
        <CardLoader CardsCount={8} />
      </>
    );

  const results = data?.pages.flatMap((page) => page.results) || [];
  const length = results?.length || 0;

  // Dynamic Title Logic
  const getHeadingTitle = () => {
    if (category === "indian") return "Desi Vibes 🇮🇳";
    if (category === "hollywood") return "Hollywood Hits 🎬";
    if (category === "anime") return "Otaku Station ⛩️";
    return category || "Explore";
  };

  return (
    <>
      <section id="heroSection">
        {/*Hero Section */}
        <HeroSection data={results} />
      </section>

      {/* Header Section */}
      <section
        className="container mx-auto py-10 px-4"
        id={`section-${category}`}
      >
        <div className="flex justify-between items-center mb-12 border-b border-zinc-800 pb-6">
          <div>
            <h1 className="text-xl lg:text-4xl md:text-3xl font-black text-white uppercase tracking-tighter">
              {getHeadingTitle()}{" "}
              <span className="text-vibe-cyan text-sm lg:text-xl">
                {isCustomExploring
                  ? `> ${searchParams.get("sort")?.split(".")[0]}`
                  : "Content"}
              </span>
            </h1>
            <p className="text-zinc-500 text-sm mt-2 font-medium tracking-wide">
              Exploring {length}+ titles in this category
            </p>
          </div>
          <div>
            <div className="relative inline-block text-left">
              <button
                onClick={() => setIsFilterOpen(true)}
                className="flex items-center gap-2 text-zinc-500 hover:text-white font-bold border border-zinc-800 px-4 py-2 rounded-xl bg-zinc-900/50 transition-all"
              >
                <FiFilter className="text-vibe-cyan" />
                <span>Filters</span>
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

        {!isCustomExploring && (
          <div className="space-y-10 mb-16">
            <MovieRow
              movieId={null}
              tvId={null}
              title={"Top Rated"}
              exploreLink={`/explore/${category}?sort=vote_average.desc`} // dynamic parameter
              filter={{ ...filters, sort_by: "vote_average.desc" }}
              category={category}
            />
            <MovieRow
              movieId={null}
              tvId={null}
              title={"Trending Now"}
              exploreLink={`/explore/${category}?sort=popularity.desc`} // dynamic parameter
              filter={{ ...filters, sort_by: "popularity.desc" }}
              category={category}
            />
          </div>
        )}

        {/* 4. Main Infinite Grid Section */}
        <div>
          <h2 className="text-xl lg:text-2xl font-bold text-white mb-6 uppercase tracking-tight">
            {isCustomExploring ? "Filtered Results" : "More To Explore"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {results.map((item) => (
              <MovieCard
                key={`${item.id}-${item.media_type || "movie"}`}
                data={item}
              />
            ))}
          </div>
        </div>

        {/* Loader for Infinite Scroll */}
        <div ref={ref} className="py-10 flex justify-center">
          {hasNextPage && <Loading />}
        </div>
      </section>
    </>
  );
};

export default ExplorePage;
