import React, { useState, createContext, useContext, useEffect } from "react";
import type { MovieProps } from "../utils/types/card.type";

interface WatchlistContextType {
  watchlist: MovieProps[];
  addToWatchlist: (movie: MovieProps) => void;
  removeFromWatchlist: (movieId: number) => void;
  isInWatchlist: (movieId: number) => boolean;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(
  undefined,
);

export const WatchlistProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [watchlist, setWatchlist] = useState<MovieProps[]>(() => {
    const savedData = localStorage.getItem("vibe_stream_watchlist");
    return savedData ? JSON.parse(savedData) : [];
  });

  useEffect(() => {
    localStorage.setItem("vibe_stream_watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  const addToWatchlist = (movie: MovieProps) => {
    setWatchlist((prev) => {
      if (prev.some((item) => item.id === movie.id)) return prev;
      return [movie, ...prev];
    });
  };

  const removeFromWatchlist = (movieId: number) => {
    setWatchlist((prev) => prev.filter((movie) => movie.id !== movieId));
  };

  const isInWatchlist = (movieId: number) => {
    return watchlist.some((movie) => movie.id === movieId);
  };

  return (
    <WatchlistContext.Provider
      value={{ watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist }}
    >
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = () => {
  const context = useContext(WatchlistContext);
  if (!context) {
    throw new Error("useWatchlist must be used within a WatchlistProvider");
  }
  return context;
};
