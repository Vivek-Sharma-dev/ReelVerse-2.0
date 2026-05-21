
const TrailerSkeleton = () => {
  return (
    // Main full screen viewport matrix container matching your Reels height layout
    <div className="h-dvh w-full bg-black relative flex items-center justify-center overflow-hidden animate-pulse">
      
      {/* 📺 Background Video Placeholder Shimmer */}
      <div className="absolute inset-0 w-full h-full bg-zinc-900/60 scale-[1.3] md:scale-100" />

      {/* Subtle Bottom Dark Gradient Overlay for structure flow */}
      <div className="absolute inset-0 bg-linear-to-t from-[#08080c] via-transparent to-black/40 pointer-events-none z-10" />

      {/* 📊 Right Side Floating Action Panel Shimmer Mock */}
      <div className="absolute right-4 bottom-24 z-30 flex flex-col items-center gap-6">
        

        {/* Watchlist/Save Button Skeleton */}
        <div className="flex flex-col items-center gap-1">
          <div className="w-12 h-12 rounded-full bg-zinc-800/80 border border-zinc-700/30" />
          <div className="h-3 bg-zinc-800 rounded w-8 mt-1" />
        </div>

        {/* Details Button Skeleton */}
        <div className="flex flex-col items-center gap-1">
          <div className="w-12 h-12 rounded-full bg-zinc-800/80 border border-zinc-700/30" />
          <div className="h-3 bg-zinc-800 rounded w-8 mt-1" />
        </div>

      </div>

      {/* 📝 Left Bottom Metadata Content Panel Shimmer */}
      <div className="absolute left-4 bottom-8 right-20 z-30 max-w-xl space-y-3 pointer-events-none">
        
        {/* Category + Official Trailer Badge Shimmer */}
        <div className="h-6 bg-zinc-800/90 border border-zinc-700/20 rounded-md w-44 mb-2" />
        
        {/* Blockbuster Movie Title Shimmer Line */}
        <div className="h-7 md:h-8 bg-zinc-700 rounded-lg w-3/4" />
        
        {/* Overview Subtext Shimmer Lines */}
        <div className="space-y-2 mt-2">
          <div className="h-3.5 bg-zinc-800/70 rounded-md w-full" />
          <div className="h-3.5 bg-zinc-800/70 rounded-md w-11/12" />
          <div className="h-3.5 bg-zinc-800/50 rounded-md w-4/5 sm:block hidden" />
        </div>

      </div>

      {/* Floating Top Left Back Arrow Skeleton Link */}
      <div className="absolute top-6 left-6 z-50 w-11 h-11 bg-zinc-900/60 rounded-full border border-zinc-800/40" />

      {/* Floating Top Right Mute Volume Controller Skeleton */}
      <div className="absolute top-6 right-6 z-50 w-11 h-11 bg-zinc-900/60 rounded-full border border-zinc-800/40" />

    </div>
  );
};

export default TrailerSkeleton;