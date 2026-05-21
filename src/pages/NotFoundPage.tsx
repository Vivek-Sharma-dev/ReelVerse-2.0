import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Film, Home, MoveLeft } from 'lucide-react';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0d0d13] text-gray-100 flex flex-col items-center justify-center px-6 relative overflow-hidden selection:bg-vibe-cyan/30">
      
      {/* Background Matrix Decorative Blurs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-vibe-cyan/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-purple-600/5 rounded-full blur-3xl pointer-events-none" />

      {/* Cinematic Glitch Core Box */}
      <div className="text-center z-10 max-w-lg">
        
        {/* Animated Icon Header */}
        <div className="relative inline-block mb-6 group">
          <div className="absolute inset-0 bg-vibe-cyan/20 rounded-2xl blur-xl group-hover:bg-vibe-cyan/40 transition-all duration-500 animate-pulse" />
          <div className="relative w-24 h-24 bg-zinc-900/80 border border-zinc-800 rounded-2xl flex items-center justify-center text-vibe-cyan shadow-2xl">
            <Film size={44} className="animate-spin [animation-duration:10s]" />
          </div>
          <span className="absolute -bottom-2 -right-2 bg-red-500 text-white font-mono font-black text-xs px-2 py-0.5 rounded-md uppercase tracking-wider shadow-md">
            Cut!
          </span>
        </div>

        {/* 404 Heading Aura */}
        <h1 className="text-8xl md:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-700 select-none">
          404
        </h1>
        
        <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight mt-4">
          Scene Not Found 🎬
        </h2>
        
        <p className="text-zinc-500 text-sm md:text-base mt-3 font-medium leading-relaxed">
          The cinematic sequence you are looking for has been deleted from the final script or moved to another tape layout bucket.
        </p>

        {/* Action Buttons Hub */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          
          {/* Go Back Trigger */}
          <button
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-white px-6 py-3 rounded-xl text-sm font-bold tracking-wide transition-all active:scale-95 shadow-lg"
          >
            <MoveLeft size={16} /> Go Back
          </button>

          {/* Home Redirect */}
          <button
            onClick={() => navigate('/')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-vibe-cyan hover:bg-vibe-cyan/90 text-black px-6 py-3 rounded-xl text-sm font-black tracking-wide transition-all active:scale-95 shadow-lg shadow-vibe-cyan/10"
          >
            <Home size={16} /> Return Home
          </button>

        </div>

      </div>

      {/* Subtle Technical Footer inside 404 */}
      <div className="absolute bottom-6 font-mono text-[10px] text-zinc-700 tracking-widest uppercase pointer-events-none">
        ReelVerse Core Engine • Resource Status Blocked
      </div>

    </div>
  );
};

export default NotFoundPage;