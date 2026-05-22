import React, { useState, createContext, useEffect } from "react";
import type { MovieProps } from "../utils/types/card.type";

export interface WatchlistContextType {
  watchlist: MovieProps[];
  // eslint-disable-next-line no-unused-vars
  addToWatchlist: (movie: MovieProps) => void;
  // eslint-disable-next-line no-unused-vars
  removeFromWatchlist: (movieId: number) => void;
  // eslint-disable-next-line no-unused-vars
  isInWatchlist: (movieId: number) => boolean;
}

// eslint-disable-next-line react-refresh/only-export-components
export const WatchlistContext = createContext<WatchlistContextType | undefined>(
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
