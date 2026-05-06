import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { searchMovies } from "../../../services/tmdb.service";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (query.length > 2) {
        const data = await searchMovies(query);
        setResults(data.slice(0, 20)); // Sirf top 5 results dikhao
      } else {
        setResults([]);
      }
    }, 300); // Debouncing taaki har keystroke par API call na ho

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const filteredResults = results.filter(
    (item: any) => item.media_type === "movie" || item.media_type === "tv",
  );

  console.log(filteredResults)

  return (
    <div className="relative z-999 group">
      <form className="flex items-center bg-zinc-900 border border-zinc-800 rounded-full px-4 py-1.5 focus-within:border-vibe-cyan transition-all">
        <Search size={18} className="text-zinc-500" />
        <input
          type="text"
          placeholder="Search movies..."
          className="bg-transparent border-none outline-none px-3 py-1 text-sm w-40 md:w-64"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>

      {/* Suggestions Dropdown */}
      {filteredResults.length > 0  ? (
        <div className="absolute top-full mt-2 w-full bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl z-100 h-80 overflow-auto no-scrollbar">
          {filteredResults.map((item: any) => (
            <div
              key={item.id}
              onClick={() => {
                navigate(`/watch/${item.media_type || "movie"}/${item.id}`);
                setQuery("");
                setResults([]);
              }}
              className="flex items-center gap-3 p-3 hover:bg-zinc-800 cursor-pointer border-b border-zinc-800/50 last:border-none"
            >
              <img
                src={`https://image.tmdb.org/t/p/w92${item.poster_path}`}
                className="w-10 h-14 object-cover rounded-md"
                alt=""
              />
              <div>
                <p className="text-xs font-bold truncate w-40">
                  {item.title || item.name}
                </p>
                <p className="text-[10px] text-zinc-500">
                  {item.release_date?.split("-")[0] || "N/A"}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) :query.length > 2 && (
        <div>
          <div className="absolute top-full mt-2 w-full bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl z-100">
            <div className="flex items-center gap-3 p-3 hover:bg-zinc-800 cursor-pointer border-b border-zinc-800/50 last:border-none">
              <p className="text-sm text-zinc-500">No results found</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
