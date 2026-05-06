import { useState } from "react";
import { Play, Film, X, AlertTriangle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchVideos } from "../../services/tmdb.service";

interface MediaViewerProps {
  id: number;
  type: string;
}

const MediaViewer = ({ id, type }: MediaViewerProps) => {
  const [activeTab, setActiveTab] = useState<"movie" | "trailer" | null>(null);
  const videoData = useQuery({
    queryKey: ["videos", id, type],
    queryFn: () => fetchVideos(Number(id), type || "movie"),
  });

  const trailerKey = videoData.data?.key;

  console.log(videoData);
  // Streaming URL Logic
  const getStreamUrl = (id: number, type: string) => {
    // Ye server abhi India mein bina VPN ke chal raha hai
    const baseUrl = "https://embed.su/embed";
    return type === "movie"
      ? ` `
      : `${baseUrl}/tv/${id}/1/1`;
  };

  if (!activeTab) {
    return (
      <div className="flex flex-wrap gap-4 mt-6">
        {trailerKey && (
          <button
            onClick={() => setActiveTab("trailer")}
            className="bg-zinc-800 text-white px-8 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-zinc-700 transition-all border border-zinc-700"
          >
            <Film size={20} /> Watch Trailer
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="w-full mt-8 animate-in fade-in slide-in-from-top-4 duration-500">
      {/* Tab Switcher & Close */}
      <div className="flex justify-between items-center mb-4 bg-zinc-900/50 p-2 rounded-2xl border border-zinc-800">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("movie")}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${activeTab === "movie" ? "bg-vibe-cyan text-black" : "text-zinc-400 hover:text-white"}`}
          >
            Full {type === "movie" ? "Movie" : "Show"}
          </button>
          {trailerKey && (
            <button
              onClick={() => setActiveTab("trailer")}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${activeTab === "trailer" ? "bg-vibe-cyan text-black" : "text-zinc-400 hover:text-white"}`}
            >
              Official Trailer
            </button>
          )}
        </div>
        <button
          onClick={() => setActiveTab(null)}
          className="p-1.5 hover:bg-red-500/20 hover:text-red-500 rounded-lg transition-all text-zinc-500"
        >
          <X size={20} />
        </button>
      </div>

      {/* Actual Player Screen */}
      <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-black border border-zinc-800 shadow-2xl">
        {activeTab === "movie" ? (
          <>
            {/* Ad-Blocker Alert Banner */}
            <div className="absolute top-0 left-0 w-full bg-yellow-500/10 border-b border-yellow-500/20 p-2 text-center z-10 flex items-center justify-center gap-2">
              <AlertTriangle size={12} className="text-yellow-500" />
              <p className="text-[10px] md:text-xs text-yellow-500 font-medium">
                Use <span className="underline">Brave Browser</span> or{" "}
                <span className="underline">uBlock Origin</span> for an Ad-Free
                experience.
              </p>
            </div>
            <iframe
              src={getStreamUrl()}
              className="w-full h-full pt-8"
              allowFullScreen
              sandbox="allow-forms allow-pointer-lock allow-same-origin allow-scripts"
            ></iframe>
          </>
        ) : (
          <iframe
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&rel=0`}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}
      </div>
    </div>
  );
};

export default MediaViewer;
