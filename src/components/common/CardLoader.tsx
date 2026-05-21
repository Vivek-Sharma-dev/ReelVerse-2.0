import MovieCardSkeleton from './MovieCardSkeleton';
const CardLoader = ({ CardsCount }: { CardsCount: number }) => {
  // 🍿 10 Skeletons ka ek dummy array banao loop chalane ke liye
  const skeletonArray = Array(CardsCount).fill(0);

  return (
    <div className="min-h-screen bg-[#0d0d13] pt-24 px-4 md:px-12 pb-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Dynamic Context Header Shimmer */}
        <div className="mb-12 border-b border-zinc-900 pb-6 animate-pulse">
          <div className="h-8 bg-zinc-800 rounded-lg w-48 mb-3" />
          <div className="h-4 bg-zinc-800/60 rounded-md w-80" />
        </div>

        {/* 🚀 Render Card Skeletons Grid Exactly Matching Your Main UI */}
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {skeletonArray.map((_, idx) => (
            <MovieCardSkeleton key={idx} />
          ))}
        </div>

      </div>
    </div>
  );
};

export default CardLoader;