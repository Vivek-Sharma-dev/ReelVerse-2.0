import { useCallback, useEffect, useState } from "react";
import Carousel from "../../common/Carousel";
import type { MovieProps } from "../../../utils/types/card.type";
import { ChevronLeft, ChevronRight } from "lucide-react";

const HeroSection = ({ data }: { data: MovieProps[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const featuredMovies = data ? (data as MovieProps[]).slice(0, 5) : [];
  const [isExiting, setIsExiting] = useState(false);

  const triggerNext = useCallback(
    async (direction: "next" | "prev") => {
      if (isExiting) return;
      setIsExiting(true);
      setTimeout(() => {
        if (direction === "next") {
          setCurrentIndex((prevIndex) =>
            prevIndex === featuredMovies.length - 1 ? 0 : prevIndex + 1,
          );
        } else {
          setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? featuredMovies.length - 1 : prevIndex - 1,
          );
        }
        setIsExiting(false);
      }, 800);
    },
    [isExiting, featuredMovies.length],
  );
  useEffect(() => {
    const timer = setInterval(() => triggerNext("next"), 5000);
    return () => clearInterval(timer);
  }, [triggerNext, currentIndex]);

  if (data.length === 0) return null;
  return (
    <div className="relative group">
      <Carousel movie={featuredMovies[currentIndex]} isExiting={isExiting} />
      {!isExiting && (
        <div>
          <button
            onClick={() => triggerNext("prev")}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/20 backdrop-blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          >
            <ChevronLeft size={30} />
          </button>

          <button
            onClick={() => triggerNext("next")}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/20 backdrop-blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          >
            <ChevronRight size={30} />
          </button>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {featuredMovies.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === currentIndex ? "w-8 bg-vibe-cyan" : "w-2 bg-white/40"}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroSection;
