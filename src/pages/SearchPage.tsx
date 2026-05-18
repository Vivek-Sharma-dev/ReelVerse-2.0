import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../services/tmdb.service";
import { filterAdultContent } from "../utils/functions";
import MovieCard from "../components/common/MovieCard";
import Loading from "../components/common/Loading";
import type { MovieProps } from "../utils/types/card.type";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAllResults = async () => {
      if (!query) return;
      setIsLoading(true);
      try {
        const data = await searchMovies(query);
        setResults(data || []);
      } catch (error) {
        console.error("Search page fetch failed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllResults();
  }, [query]);

  // Client Side Filtering (Safe Content Only)
  const validMedia = results.filter(
    (item: MovieProps) => item.media_type === "movie" || item.media_type === "tv",
  );
  const filteredResults = filterAdultContent(validMedia);

  if (isLoading) return <Loading />;

  return (
    <section className="container mx-auto py-10 px-4 min-h-[70vh]">
      <div className="border-b border-zinc-800 pb-6 mb-10">
        <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight">
          Search Results for: <span className="text-vibe-cyan">"{query}"</span>
        </h1>
        <p className="text-zinc-500 text-sm mt-2 font-medium">
          Found {filteredResults.length} safe titles matching your search
        </p>
      </div>

      {filteredResults.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {filteredResults.map((item: MovieProps) => (
            <MovieCard key={`${item.id}-${item.media_type}`} data={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-zinc-500 text-lg">
            No safe matches found for "{query}".
          </p>
          <p className="text-zinc-600 text-sm mt-1">
            Try checking for typos or searching another title.
          </p>
        </div>
      )}
    </section>
  );
};

export default SearchPage;
