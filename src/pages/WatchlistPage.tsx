import { useWatchlist } from '../context/WatchlistContext';
import MovieCard from '../components/common/MovieCard';
import { type MovieProps } from '../utils/types/card.type';
import { Film } from 'lucide-react';
import { Link } from 'react-router-dom';

const WatchlistPage = () => {
  const { watchlist } = useWatchlist();

  return (
    <div className="min-h-screen bg-[#0d0d13] text-gray-100 pt-24 px-4 md:px-12 pb-12 selection:bg-vibe-cyan/30">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-zinc-800 pb-6 gap-4">
          <div>
            <h1 className="text-4xl font-black text-white uppercase tracking-tighter flex items-center gap-3">
              <span className="w-2 h-8 bg-vibe-cyan rounded-full block"></span>
              My Watchlist
            </h1>
            <p className="text-zinc-500 text-sm mt-2 font-medium tracking-wide">
              Your personalized collection of curated movies and shows
            </p>
          </div>
          <span className="text-xs bg-vibe-cyan/10 border border-vibe-cyan/20 text-vibe-cyan px-4 py-1.5 rounded-full font-mono font-bold shrink-0 self-start md:self-auto">
            {watchlist.length} {watchlist.length === 1 ? 'Title' : 'Titles'} Saved
          </span>
        </div>

        {/* Dynamic Content Core Logic */}
        {watchlist.length === 0 ? (
          /* Empty State Section */
          <div className="flex flex-col items-center justify-center pt-20 text-center">
            <div className="w-20 h-20 bg-zinc-900/50 rounded-2xl flex items-center justify-center border border-zinc-800 text-zinc-600 mb-6 shadow-xl shadow-black/20">
              <Film size={36} />
            </div>
            <h2 className="text-xl font-bold text-zinc-300">Your Watchlist is Ghost Town 👻</h2>
            <p className="text-zinc-500 text-sm mt-2 max-w-sm">
              Tap the "+ Watch list" button on any movie or TV show to instantly lock it down here.
            </p>
            <Link 
              to="/explore/all" 
              className="mt-6 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-vibe-cyan px-6 py-2.5 rounded-xl font-bold text-sm tracking-wide transition-all active:scale-95 shadow-md"
            >
              Explore Content
            </Link>
          </div>
        ) : (
          /* Active Grid Render Loop -> Standard Reusable Grid Architecture */
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4  gap-6">
            {watchlist.map((item: MovieProps, index: number) => (
              <MovieCard 
                key={`${item.id}-${index}`} 
                data={item} 
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default WatchlistPage;