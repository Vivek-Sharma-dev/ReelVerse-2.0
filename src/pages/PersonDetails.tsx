import { useParams } from 'react-router-dom';
import { usePersonDetails } from '../hooks/usePersonDetails';
import { type MovieProps } from '../utils/types/card.type';
import MovieCard from '../components/common/MovieCard';

const PersonDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isPending, isError } = usePersonDetails(Number(id));

  // Loading Skeleton State
  if (isPending) {
    return (
      <div className="min-h-screen bg-[#0d0d13] text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-vibe-cyan border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-400 text-sm font-medium tracking-wide">Syncing Actor Aura... 🌀</p>
        </div>
      </div>
    );
  }

  // Error State
  if (isError || !data) {
    return (
      <div className="min-h-screen bg-[#0d0d13] text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-2">💥 Explosion in Actor Engine</h2>
          <p className="text-gray-400">Could not fetch data from TMDB pipelines.</p>
        </div>
      </div>
    );
  }
  const { person, credits } = data;
  const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';
    console.log('Person Details Data:', person); // Debugging log to check the structure of the fetched data

  return (
    <div className="min-h-screen bg-[#0d0d13] text-gray-100 pt-10 px-4 md:px-12 pb-12 selection:bg-vibe-cyan/30">
      
      {/* Container: Profile Section + Bio */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start gap-10">
        
        {/* Left Side: Avatar Panel -> Made STICKY to prevent empty space below */}
        <div className="w-full lg:w-1/4 flex flex-col items-center lg:items-start shrink-0 lg:sticky lg:top-24">
          <div className=" rounded-2xl overflow-hidden shadow-2xl shadow-vibe-cyan/5 border border-white/10 group bg-gray-900">
            {person.profile_path ? (
              <img
                src={`${TMDB_IMAGE_BASE}${person.profile_path}`}
                alt={person.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500 bg-gray-950">
                No Image
              </div>
            )}
          </div>
          
          {/* Quick Info Box */}
          <div className="mt-6 w-64 space-y-3 bg-white/2 border border-white/5 p-4 rounded-xl text-sm">
            <div>
              <span className="text-vibe-cyan/70 font-semibold block">Known For</span>
              <span className="text-gray-300">{person.known_for_department || 'Acting'}</span>
            </div>
            {person.birthday && (
              <div>
                <span className="text-vibe-cyan/70 font-semibold block">Born</span>
                <span className="text-gray-300">{person.birthday} {person.place_of_birth ? `in ${person.place_of_birth}` : ''}</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Detailed Bio + Dynamic Grid */}
        <div className="flex-1 w-full space-y-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-black bg-linear-to-r from-white via-gray-200 to-gray-500 bg-clip-text text-transparent mb-4">
              {person.name}
            </h1>
            <h3 className="text-xl font-bold text-transparent bg-clip-text bg-linear-to-r from-vibe-cyan to-indigo-400 mb-2">Biography</h3>
            <p className="text-gray-400 leading-relaxed text-justify font-normal text-sm md:text-base max-h-64 overflow-y-auto pr-2 no-scrollbar">
              {person.biography || `${person.name} is a celebrated personality in world cinema.`}
            </p>
          </div>

          <hr className="border-white/5" />

          {/* Combined Credits Dynamic Grid */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black tracking-tight text-white flex items-center gap-2 h-full border-l-4 border-vibe-cyan pl-4">
                Filmography & Roles
              </h2>
              <span className="text-xs bg-vibe-cyan/10 border border-vibe-cyan/20 text-vibe-cyan px-3 py-1 rounded-full font-mono">
                {credits.length} Total Credits
              </span>
            </div>

            {/* 🛠️ FIXED GRID LAYOUT: Standard responsive column scale up to 5 cols */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {/* 🛠️ FIXED: Safe slicing mechanism instead of mutation-heavy splice */}
              {credits.slice(0, 20).map((movie: MovieProps, index: number) => (
                <MovieCard key={`${movie.id}-${index}`} data={movie} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PersonDetails;