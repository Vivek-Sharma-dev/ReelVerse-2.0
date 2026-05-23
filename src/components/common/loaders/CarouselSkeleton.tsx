
const CarouselSkeleton = () => {
  return (
    // Main container exactly matches the height and layout of hero component
    <div className="relative w-full h-[60dvh] md:h-[70dvh] bg-zinc-950 flex items-end pb-12 px-6 md:px-16 animate-pulse overflow-hidden">
      
      {/* Background Subtle Shimmer Base */}
      <div className="absolute inset-0 bg-linear-to-t from-[#0d0d13] via-zinc-900/20 to-zinc-950/40" />

      {/* Content Container Matrix */}
      <div className="relative z-10 w-full max-w-4xl flex flex-col gap-4">
        
        {/* 🎬 Movie Title Shimmer Block */}
        <div className="h-10 md:h-12 bg-zinc-800 rounded-xl w-2/3 md:w-1/2 mt-4" />

        {/* 🏷️ Categories / Badges Row Shimmer */}
        <div className="flex gap-3 my-2">
          <div className="h-5 bg-zinc-800/80 rounded-md w-16" />
          <div className="h-5 bg-zinc-800/80 rounded-md w-14" />
          <div className="h-5 bg-zinc-800/80 rounded-md w-20" />
          <div className="h-5 bg-zinc-800/80 rounded-md w-16" />
        </div>

        {/* 📝 Movie Overview Description Lines */}
        <div className="space-y-2 max-w-2xl hidden sm:block">
          <div className="h-4 bg-zinc-800/60 rounded-md w-full" />
          <div className="h-4 bg-zinc-800/60 rounded-md w-11/12" />
          <div className="h-4 bg-zinc-800/60 rounded-md w-4/5" />
        </div>

        {/* 🎛️ Action Buttons Shimmer Hub */}
        <div className="flex items-center gap-4 mt-4">
          {/* Play Now Button Fake Shimmer */}
          <div className="h-11 bg-zinc-800 rounded-xl w-32" />
          {/* Watchlist Button Fake Shimmer */}
          <div className="h-11 bg-zinc-800/70 rounded-xl w-28" />
        </div>

      </div>

      {/* 🔘 Carousel Dots Bottom Shimmer Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        <div className="w-2 h-2 rounded-full bg-zinc-800" />
        <div className="w-2 h-2 rounded-full bg-zinc-800" />
        <div className="w-6 h-2 rounded-md bg-zinc-700/80" /> {/* Active dot style setup */}
        <div className="w-2 h-2 rounded-full bg-zinc-800" />
      </div>

    </div>
  );
};

export default CarouselSkeleton;