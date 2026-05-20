import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { movieGenreMap, tvGenreMap } from "../../utils/types/Mapping";
import type { MovieProps } from "../../utils/types/card.type";
const Carousel = ({
  movie,
  isExiting,
}: {
  movie: MovieProps;
  isExiting: boolean;
}) => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (isExiting) {
        gsap.to(container.current, {
          clipPath: "circle(0% at 50% 50%)",
          duration: 0.8,
          ease: "power3.inOut",
        });

        gsap.to(".hero-content > *", {
          opacity: 0,
          y: -30,
          stagger: 0.2,
          duration: 0.5,
        });
      }
    },
    { scope: container, dependencies: [isExiting] },
  );

  useGSAP(
    () => {
      gsap.set(".hero-content > *", { opacity: 0, y: 50 });
      const tl = gsap.timeline({
        defaults: { ease: "power3.out", duration: 1 },
      });

      tl.to(".hero-content > *", {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        delay: 0.8,
      });

      const bgAnim = gsap.to(".hero-bg-img", {
        scale: 1.15,
        duration: 15,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.fromTo(
        container.current,
        {
          clipPath: "circle(0% at 50% 50%)",
        },
        {
          clipPath: "circle(100% at 50% 50%)",
          duration: 0.8,
          ease: "power3.inOut",
        },
      );

      return () => {
        tl.kill();
        bgAnim.kill();
      };
    },
    { scope: container, dependencies: [movie.id] },
  );
  if (!movie) return null;
  const geners = movie?.genre_ids.map((id) => {
    return movie?.media_type === "movie" ? movieGenreMap[id] : tvGenreMap[id];
  });

  return (
    <div ref={container} className="relative w-full md:h-[60dvh] lg:h-[70dvh] overflow-hidden">
      <img
        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        alt={
          movie.title ||
          movie.name ||
          movie.original_name ||
          movie.original_title
        }
        className=" w-full h-full object-cover hero-bg-img"
      />
      <div className="hero-content absolute inset-0 z-10 px-5 lg:p-16 flex flex-col justify-center h-full bg-linear-to-r from-black/80 to-transparent">
        <h1 className="text-xl md:text-3xl lg:text-4xl font-bold">
          {movie.title ||
            movie.name ||
            movie.original_name ||
            movie.original_title}
        </h1>
        <div className="flex items-center gap-1 lg:gap-4">
          {geners.map((genre, index) => (
            <span
              key={index}
              className={` text-[12px] text-gray-400 bg-gray-700/50 mt-2 px-2 py-1 rounded font-semibold inline-block`}
            >
              {genre}
            </span>
          ))}
        </div>
        <p className="max-w-xl text-zinc-400 hidden lg:block">{movie.overview}</p>
        <div className="flex gap-4 mt-6">
          <button className="bg-vibe-cyan text-black px-6 py-1 lg:py-2 font-bold rounded text-sm lg:text-base">
            Play Now
          </button>
          <button className="bg-white/10 px-6 py-1 lg:py-2 font-bold rounded text-sm lg:text-base">
            Watch list
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
