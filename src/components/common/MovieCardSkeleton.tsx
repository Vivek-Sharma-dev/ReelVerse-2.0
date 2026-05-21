
const MovieCardSkeleton = () => {
  return (
    // 🌟 'animate-pulse' hi poora magic handle karti hai shimmer effect ka
    <div className="w-full bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-3 animate-pulse flex flex-col gap-3">
      {/* Poster Image Ka Replacement */}
      <div className="w-full aspect-2/3 bg-zinc-800 rounded-xl" />

      {/* Title Text Line 1 */}
      <div className="h-4 bg-zinc-800 rounded-md w-3/4 mt-1" />

      {/* Subtitle / Year Text Line 2 */}
      <div className="flex gap-4 items-center mt-1">
        <div className="h-3 bg-zinc-800 rounded-md w-1/4" />
        <div className="h-4 bg-zinc-800/80 rounded-md w-10" />
      </div>

      {/* overview  */}
        <div className="h-10 bg-zinc-800 rounded-md w-full mt-1" />

    {/* watchlist button */}
        <div className="h-8 bg-zinc-800 rounded-full w-2/3 mt-2 self-center" />
    </div>
  );
};

export default MovieCardSkeleton;
