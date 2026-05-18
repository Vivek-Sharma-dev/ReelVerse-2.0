import { useState } from "react";
import { Server, Tv, Film } from "lucide-react";
import { STREAM_SERVERS } from "../../utils/config";

interface WatchPlayerProps {
  id: number;
  type: string; // "movie" or "tv"
  season?: number;
  episode?: number;
}

const WatchPlayer = ({
  id,
  type,
  season = 1,
  episode = 1,
}: WatchPlayerProps) => {
  const [activeServer, setActiveServer] = useState(STREAM_SERVERS[0]);

  // Dynamic URL Builder based on media type and selected server
  const getStreamUrl = () => {
    if (type === "movie") {
      // e.g., https://vidsrc.to/embed/movie/1726
      return `${activeServer.baseUrl}/movie/${id}`;
    } else {
      // For TV: formats vary slightly but general standard is /tv/id/season/episode
      // Embed.su uses different paths sometimes, but vidsrc format works on 90% of them
      return `${activeServer.baseUrl}/tv/${id}/${season}/${episode}`;
    }
  };

  return (
    <div className="w-full bg-zinc-950 rounded-2xl border border-zinc-900 overflow-hidden shadow-2xl">
      {/* 1. Video Player Viewport */}
      <div className="relative aspect-video w-full bg-black">
        <iframe
          src={getStreamUrl()}
          className="w-full h-full"
          title="ReelVerse Player Engine"
          frameBorder="0"
          allowFullScreen
          scrolling="no"
          // Halka sa loop unlock kiya hai permissions ka testing ke liye
          sandbox="allow-scripts allow-same-origin allow-forms allow-presentation allow-pointer-lock"
          allow="autoplay; encrypted-media"
        ></iframe>
      </div>

      {/* 2. Control Panel / Server Switcher Layout */}
      <div className="p-4 bg-zinc-900/40 border-t border-zinc-900 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-vibe-cyan/10 text-vibe-cyan">
            {type === "tv" ? <Tv size={20} /> : <Film size={20} />}
          </div>
          <div>
            <h4 className="text-sm font-bold text-zinc-200 uppercase tracking-wide">
              {type === "tv"
                ? `Streaming: Season {season} - Episode {episode}`
                : "Streaming Feature Film"}
            </h4>
            <p className="text-xs text-zinc-500 mt-0.5">
              If the video buffers or fails to load, please switch to a backup
              server below.
            </p>
          </div>
        </div>

        {/* Server Selection Chips */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs font-bold text-zinc-500 flex items-center gap-1 mr-1">
            <Server size={14} /> Servers:
          </span>
          {STREAM_SERVERS.map((server) => (
            <button
              key={server.id}
              onClick={() => setActiveServer(server)}
              className={`px-3 py-1.5 text-xs font-extrabold rounded-lg border transition-all ${
                activeServer.id === server.id
                  ? "bg-vibe-cyan border-vibe-cyan text-black shadow-md shadow-vibe-cyan/10"
                  : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"
              }`}
            >
              {server.name.split(" ")[0]}{" "}
              {/* UI ko clean rakhne ke liye sirf Alpha, Beta dikhega */}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WatchPlayer;
