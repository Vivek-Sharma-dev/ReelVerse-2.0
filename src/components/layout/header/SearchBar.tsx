import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import { searchMovies } from "../../../services/tmdb.service";
import { filterAdultContent } from "../../../utils/functions";

interface SearchResult {
  id: number;
  title?: string;
  name?: string;
  media_type: string;
  poster_path: string;
  release_date?: string;
  overview?: string;
}

const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const navigate = useNavigate();

  // 1. Global Shortcut Loop (Ctrl + K / Cmd + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault(); // Browser ka default search block karo
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // 2. Debouncing API Request logic
  useEffect(() => {
    if (!isOpen) return;

    const delayDebounceFn = setTimeout(async () => {
      if (query.trim().length > 2) {
        try {
          const data = await searchMovies(query);
          setResults(data || []);
        } catch (error) {
          console.error("Search API failed:", error);
        }
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query, isOpen]);

  // Reset states when closing modal
  const handleClose = () => {
    setIsOpen(false);
    setQuery("");
    setResults([]);
  };

  // 3. Client Side Filters: Type check + Adult content block
  const validMedia = results.filter(
    (item) => item.media_type === "movie" || item.media_type === "tv",
  );
  const filteredResults = filterAdultContent(validMedia);
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim().length > 2) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      handleClose(); // Modal ya dropdown close kar do
    }
  };
  return (
    <>
      {/* HEADER TRIGGER BUTTON: Yeh tere navbar mein chota sa dikhega */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-between bg-zinc-900 border border-zinc-800 rounded-full px-4 py-2 hover:border-zinc-700 text-zinc-400 w-40 md:w-64 text-sm transition-all text-left group"
      >
        <div className="flex items-center gap-2">
          <Search
            size={16}
            className="text-zinc-500 group-hover:text-vibe-cyan transition-colors"
          />
          <span className="text-xs md:text-sm truncate">Search...</span>
        </div>
        <kbd className="hidden md:inline-flex items-center bg-zinc-800 text-zinc-500 text-[10px] px-1.5 py-0.5 rounded border border-zinc-700 font-sans font-bold">
          Ctrl K
        </kbd>
      </button>

      {/* GLOBAL SEARCH COMMAND PALETTE MODAL */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-999 flex items-start justify-center p-0 md:p-4 md:pt-28 animate-in fade-in duration-200"
          onClick={handleClose}
        >
          {/* Modal Box Layout */}
          <div
            className="bg-zinc-950 w-full h-full md:h-auto md:max-w-2xl border-0 md:border border-zinc-800 shadow-2xl flex flex-col md:rounded-2xl overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            {/* Header / Input Field Box */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-zinc-900 bg-zinc-900/30">
              <form
                onSubmit={handleSearchSubmit}
                className="flex items-center gap-3 w-full"
              >
                <Search size={22} className="text-vibe-cyan" />
                <input
                  type="text"
                  placeholder="Search movies, TV shows, anime..."
                  className="w-full bg-transparent text-white focus:outline-none text-base md:text-lg placeholder-zinc-500"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  autoFocus
                />
                <button
                  onClick={handleClose}
                  type="button"
                  className="p-1 rounded-lg bg-zinc-900 text-zinc-500 hover:text-white border border-zinc-800 transition-colors"
                >
                  <X size={16} />
                </button>
              </form>
            </div>

            {/* Content Display Result Block */}
            <div className="flex-1 overflow-y-auto max-h-full md:max-h-105 no-scrollbar bg-zinc-950">
              {query.trim().length <= 2 ? (
                <div className="p-8 text-center text-zinc-600 text-sm">
                  Type at least 3 characters to search...
                </div>
              ) : filteredResults.length > 0 ? (
                <div className="p-2 divide-y divide-zinc-900/50">
                  {filteredResults.map((item: SearchResult) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        navigate(
                          `/watch/${item.media_type || "movie"}/${item.id}`,
                        );
                        handleClose();
                      }}
                      className="flex items-center gap-4 p-3 hover:bg-zinc-900/60 rounded-xl cursor-pointer group transition-colors"
                    >
                      {item.poster_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w92${item.poster_path}`}
                          className="w-11 h-16 object-cover rounded-lg shadow-md border border-zinc-800"
                          alt=""
                        />
                      ) : (
                        <div className="w-11 h-16 bg-zinc-900 border border-zinc-800 rounded-lg flex items-center justify-center text-[10px] text-zinc-500 text-center">
                          No Pic
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-zinc-200 group-hover:text-vibe-cyan transition-colors truncate">
                          {item.title || item.name}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] uppercase font-extrabold tracking-wider bg-zinc-900 text-zinc-400 px-1.5 py-0.5 rounded border border-zinc-800">
                            {item.media_type === "tv" ? "TV Show" : "Movie"}
                          </span>
                          <span className="text-xs text-zinc-500">
                            {item.release_date?.split("-")[0] || "N/A"}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                  {filteredResults.length > 0 && (
                    <div
                      onClick={handleSearchSubmit}
                      className="p-4 bg-zinc-900/80 hover:bg-zinc-900 text-center text-sm font-bold text-vibe-cyan cursor-pointer border-t border-zinc-800 sticky bottom-0"
                    >
                      See all results for "{query}"
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-12 text-center text-zinc-500 text-sm">
                  No matching content found safely.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchBar;
