import { useNavigate } from "react-router-dom";
import { useWatchlist } from "../../context/WatchlistContext";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Check, MessageCircle, Pause, Play, Plus } from "lucide-react";

const ReelCard = ({
  item,
  isLastItem,
  innerRef,
  globalMute,
}: {
  item: any;
  idx: number;
  isLastItem: boolean;
  innerRef: any;
  globalMute: boolean;
}) => {
  const navigate = useNavigate();
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();

  // 🌟 NEW STATES FOR PLAY/PAUSE ENGINE
  const [isPlaying, setIsPlaying] = useState(true);
  const [showIcon, setShowIcon] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const { ref: viewRef, inView } = useInView({
    threshold: 0.5,
  });

  // 🎬 Auto Play/Pause Logic based on visibility
  useEffect(() => {
    if (!inView) {
      setIsPlaying(true);
    }
  }, [inView]);

  // 🪄 YouTube Player Control Command via postMessage API
  const handlePlayPauseToggle = () => {
    if (!iframeRef.current) return;

    const command = isPlaying ? "pauseVideo" : "playVideo";
    iframeRef.current.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func: command, args: [] }),
      "*",
    );

    setIsPlaying(!isPlaying);
    setShowIcon(true);

    // After 0.8s, hide the icon again
    setTimeout(() => setShowIcon(false), 800);
  };

  const title = item.title || item.original_title || "Cinematic Epic";
  const isAdded = isInWatchlist(item.id);

  const setRefs = (node: any) => {
    viewRef(node);
    if (isLastItem) innerRef(node);
  };

  return (
    <div
      ref={setRefs}
      className="h-dvh w-full snap-start snap-always relative flex items-center justify-center bg-black overflow-hidden"
    >
      {/* 📺 THE PLAYER CONTAINER */}
      <div className="absolute inset-0 w-full h-full pointer-events-none scale-[1.3] md:scale-100">
        {inView && (
          <iframe
            ref={iframeRef}
            className="w-full h-full object-cover"
            // 🌟 NOTE: `enablejsapi=1` hona zaroorii hai taaki hamara custom code play/pause command bhej sake
            src={`https://www.youtube.com/embed/${item.youtubeKey}?autoplay=1&mute=${globalMute ? 1 : 0}&loop=1&playlist=${item.youtubeKey}&controls=1&modestbranding=1&rel=0&iv_load_policy=3&playsinline=1&enablejsapi=1`}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        )}
      </div>

      {/* 🎬 PLAY/PAUSE CONTROLLER */}
      <div
        onClick={handlePlayPauseToggle}
        className="absolute inset-0 cursor-pointer z-20"
      />

      {/* 🌟 DYNAMIC POP-UP CENTRAL ICON: Instagram style animate-ping overlay */}
      {showIcon && (
        <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
          <div className="p-5 rounded-full bg-black/60 backdrop-blur-sm text-vibe-cyan animate-ping duration-300">
            {isPlaying ? (
              <Play size={40} fill="currentColor" />
            ) : (
              <Pause size={40} fill="currentColor" />
            )}
          </div>
        </div>
      )}

      {/* Shadow Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-[#08080c] via-transparent to-black/40 pointer-events-none z-10" />

      {/* Floating Action Menu Panel - Make sure z-30 is there to stay on top of tap overlay */}
      <div className="absolute right-4 bottom-24 z-30 flex flex-col items-center gap-6">
        <button
          onClick={() =>
            isAdded
              ? removeFromWatchlist(item.id)
              : addToWatchlist({ ...item, media_type: "movie" })
          }
        >
          <div
            className={`p-3 rounded-full backdrop-blur-md border border-white/10 ${isAdded ? "bg-vibe-cyan/20 text-vibe-cyan border-vibe-cyan" : "bg-black/50 text-white"}`}
          >
            {isAdded ? <Check size={22} /> : <Plus size={22} />}
          </div>
          <span className="text-[11px] text-zinc-300 font-mono block text-center mt-1">
            {isAdded ? "Added" : "Watchlist"}
          </span>
        </button>

        <button onClick={() => navigate(`/watch/movie/${item.id}`)}>
          <div className="p-3 bg-black/50 border border-white/10 text-white rounded-full backdrop-blur-md">
            <MessageCircle size={22} />
          </div>
          <span className="text-[11px] text-zinc-300 font-mono block text-center mt-1">
            Details
          </span>
        </button>
      </div>

      {/* Bottom Text Description */}
      {/* Metadata Text Box */}
      <div className="absolute left-4 bottom-25 right-20 z-30 max-w-xl pointer-events-none">
        {/* Dynamic Category Tag Display 🔥 */}
        <span className="px-2.5 py-1 text-[10px] font-black uppercase tracking-widest bg-vibe-cyan text-black rounded-md mb-3 inline-block shadow-md shadow-vibe-cyan/20">
          🎬 {item.category || "Trending"} • Official Trailer
        </span>
        <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight line-clamp-1 drop-shadow-md">
          {title}
        </h2>
        <p className="text-zinc-300 text-xs md:text-sm mt-2 line-clamp-2 drop-shadow-sm">
          {item.overview || "No overview available for this cinematic block."}
        </p>
      </div>
    </div>
  );
};

export default ReelCard;
