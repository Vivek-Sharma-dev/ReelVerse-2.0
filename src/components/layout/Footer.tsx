import React from 'react';
import { Link } from 'react-router-dom';
import { PlayCircleIcon,  Globe } from 'lucide-react';
import { BsGithub } from 'react-icons/bs';
import { LiaLinkedin } from 'react-icons/lia';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#09090d] border-t border-zinc-900 text-zinc-500 text-sm mt-auto">
      <div className="max-w-7xl mx-auto px-4 md:px-12 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Brand Aura */}
        <div className="flex items-center gap-2">
          <PlayCircleIcon className="text-vibe-cyan w-6 h-6 animate-pulse" />
          <span className="font-black text-white tracking-tighter text-lg uppercase">
            Reel<span className="text-vibe-cyan">Verse</span>
          </span>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center gap-6 font-medium text-xs md:text-sm">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <Link to="/explore/all" className="hover:text-white transition-colors">Explore</Link>
          <Link to="/watchlist" className="hover:text-white transition-colors">Watchlist</Link>
          <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
        </div>

        {/* Social Hooks */}
        <div className="flex items-center gap-4 text-zinc-400">
          <a href="https://github.com/Vivek-Sharma-dev" target="_blank" rel="noreferrer" className="hover:text-vibe-cyan transition-colors">
            <BsGithub size={18} />
          </a>
          <a href="https://www.linkedin.com/in/vivek-sharma-webdev" target="_blank" rel="noreferrer" className="hover:text-vibe-cyan transition-colors">
            <LiaLinkedin size={18} />
          </a>
        </div>
      </div>

      {/* Bottom Legal bar */}
      <div className="bg-black/40 py-4 text-center text-[11px] text-zinc-600 border-t border-zinc-900/50 font-mono">
        © {currentYear} ReelVerse 2.0 Engine. Built with React, Vite, Tailwind, and TMDB API.
      </div>
    </footer>
  );
};

export default Footer;