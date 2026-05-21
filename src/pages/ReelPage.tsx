import  { useState, useEffect } from "react";
import { useInfiniteReels } from "../hooks/useInfiniteReels";
import {
  ArrowLeft,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";

// Individual Single Reel Card Engine
import ReelCard from "../components/common/ReelCard";
import TrailerSkeleton from "../components/common/TrailerSkeleton";


// Main Component Wrapper
const ReelsPage = () => {
  const navigate = useNavigate();
  const [globalMute, setGlobalMute] = useState<boolean>(true);

  const { ref, inView } = useInView({ threshold: 0.1 });
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteReels();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) return <TrailerSkeleton />

  const reelsList = data?.pages.flatMap((page) => page.results) || [];

  return (
    <div className="h-dvh w-full bg-[#08080c] overflow-y-scroll snap-y snap-mandatory no-scrollbar relative">
      {/* Global Mute Controller */}
      <button
        onClick={() => setGlobalMute(!globalMute)}
        className="fixed top-30 right-6 z-50 p-3 bg-black/50 backdrop-blur-md rounded-full text-white border border-white/10 active:scale-95"
      >
        {globalMute ? (
          <VolumeX size={20} />
        ) : (
          <Volume2 size={20} className="text-vibe-cyan" />
        )}
      </button>

      {/* Back Action */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 z-50 p-3 bg-black/50 backdrop-blur-md rounded-full text-white border border-white/10 active:scale-95"
      >
        <ArrowLeft size={20} />
      </button>

      {/* Render Dynamic Cards */}
      {reelsList.map((item: any, idx: number) => (
        <ReelCard
          key={`${item.id}-${idx}`}
          item={item}
          idx={idx}
          globalMute={globalMute}
          isLastItem={idx === reelsList.length - 2}
          innerRef={ref}
        />
      ))}

      {isFetchingNextPage && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-vibe-cyan text-black px-5 py-1.5 rounded-full text-xs font-mono font-black z-50 shadow-lg">
          FETCHING NEXT BATCH... 🍿
        </div>
      )}
    </div>
  );
};

export default ReelsPage;
