import CardLoader from "./CardLoader";

const DetailsSkeleton = () => {
  // Shimmer pulse animation class shorthand
  const shimmer = "animate-pulse bg-zinc-800/60";

  return (
    <div className="w-full min-h-screen bg-[#08080c] text-white flex flex-col overflow-hidden select-none">
      
      {/* 🎬 1. HERO BANNER SKELETON */}
      <div className="w-full h-[50dvh] md:h-[65dvh] relative bg-zinc-900/40 flex items-end p-6 md:p-12 border-b border-zinc-900">
        {/* Background Subtle Shimmer Overlay */}
        <div className={`absolute inset-0 ${shimmer}`} />
        
        {/* Bottom Shadow Matrix */}
        <div className="absolute inset-0 bg-linear-to-t from-[#08080c] via-transparent to-transparent z-10" />

        {/* Hero Meta Info */}
        <div className="relative z-20 w-full max-w-2xl space-y-4">
          {/* Category Tag */}
          <div className={`h-5 w-32 rounded-md ${shimmer}`} />
          {/* Main Title */}
          <div className={`h-10 w-3/4 md:w-1/2 rounded-lg ${shimmer}`} />
          {/* Metadata Badges (Rating, Year, Duration) */}
          <div className="flex gap-3 pt-2">
            <div className={`h-5 w-16 rounded-md ${shimmer}`} />
            <div className={`h-5 w-16 rounded-md ${shimmer}`} />
            <div className={`h-5 w-20 rounded-md ${shimmer}`} />
          </div>
          {/* CTA Buttons */}
          <div className="flex gap-4 pt-4">
            <div className={`h-11 w-36 rounded-full ${shimmer}`} />
            <div className={`h-11 w-36 rounded-full ${shimmer}`} />
          </div>
        </div>
      </div>

      {/* 📊 2. CORE CONTENT SPLIT MATRIX */}
      <div className="w-full max-w-350 mx-auto px-6 md:px-12 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10 flex-1">
        
        {/* LEFT COLUMN: Overview & Cast Sections */}
        <div className="lg:col-span-2 space-y-10">
          
          {/* Overview Block */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-6 w-1 bg-vibe-cyan rounded-full animate-pulse" />
              <div className={`h-6 w-36 rounded-md ${shimmer}`} />
            </div>
            <div className="space-y-2">
              <div className={`h-4 w-full rounded-md ${shimmer}`} />
              <div className={`h-4 w-full rounded-md ${shimmer}`} />
              <div className={`h-4 w-2/3 rounded-md ${shimmer}`} />
            </div>
          </div>

          {/* Top Cast Row */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="h-6 w-1 bg-vibe-cyan rounded-full animate-pulse" />
              <div className={`h-6 w-28 rounded-md ${shimmer}`} />
            </div>
            {/* Cast Circular Avatars Row */}
            <div className="flex gap-6 overflow-x-hidden pt-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex flex-col items-center space-y-3 min-w-22.5">
                  {/* Round Avatar */}
                  <div className={`w-21.5 h-21.5 rounded-full ${shimmer}`} />
                  {/* Actor Name */}
                  <div className={`h-3 w-16 rounded-md ${shimmer}`} />
                  {/* Character Name */}
                  <div className={`h-2.5 w-12 rounded-md bg-zinc-800/40`} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Sidebar Stats Grid Panel */}
        <div className="lg:col-span-1">
          {/* Main Card Grid Frame */}
          <div className="w-full border border-zinc-900 bg-zinc-950/40 p-5 rounded-2xl space-y-6">
            {/* Poster Thumbnail Placeholder */}
            <div className={`w-full aspect-16/10 rounded-xl ${shimmer}`} />
            
            {/* 2x2 Metadata Metric Grids */}
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="p-4 rounded-xl bg-zinc-900/30 border border-zinc-900/60 space-y-2">
                  <div className={`h-3 w-12 rounded-md ${shimmer}`} />
                  <div className={`h-5 w-20 rounded-md ${shimmer}`} />
                </div>
              ))}
            </div>
          </div>
        </div>


      </div>
      // 🎬 Movie Card Skeleton Grid
        <div>
          <CardLoader CardsCount={20} />
        </div>
    </div>
  );
};

export default DetailsSkeleton;