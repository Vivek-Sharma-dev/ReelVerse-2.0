import { Link, useParams } from "react-router-dom";
import { useMovieDetails } from "../../hooks/useDetails";
import Error from "../../components/common/Error";
import Banner from "../../components/layout/DetailsPage/Banner";
import MovieInfoCard from "../../components/common/MovieInfoCard";
import { useTrailer } from "../../hooks/useTrailer";
import { useState } from "react";
import MovieCard from "../../components/common/MovieCard";
import type { MovieProps } from "../../utils/types/card.type";
import useMetaData from "../../hooks/useMetaData";
import DetailsSkeleton from "../../components/common/loaders/DetailsSkeleton";

export type TrailerType = {
  key: string;
  name: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
};

const MovieDetails = () => {
  const { id, type } = useParams();
  const [isTrailerPlaying, setIsTrailerPlaying] = useState<boolean>(false);
  const trailerData = useTrailer(Number(id), type!);
  const { data, isPending, isError } = useMovieDetails(
    Number(id),
    type || "movie",
  );
  useMetaData(
    data?.details
      ? ` ${data?.details.title || data?.details.name} - Details, Cast & Similar Movies`
      : "Loading Title...",
    "Discover detailed information about your favorite movies and TV shows, including trailers, cast, and similar recommendations on ReelVerse.",
  );

  if (isPending) return <DetailsSkeleton />;
  if (isError) return <Error />;
  const { details, credits, similarMovies } = data || {};

  const getBestTrailer = (videos: TrailerType[]) => {
    if (!videos || videos.length === 0) return null;

    const officialTrailer = videos.find(
      (v) =>
        v.official === true && v.type === "Trailer" && v.site === "YouTube",
    );
    if (officialTrailer) return officialTrailer;

    const anyTrailer = videos.find(
      (v) => v.type === "Trailer" && v.site === "YouTube",
    );
    if (anyTrailer) return anyTrailer;

    const teaser = videos.find(
      (v) => v.type === "Teaser" && v.site === "YouTube",
    );
    if (teaser) return teaser;

    return videos[0];
  };

  
  const trailer = getBestTrailer(trailerData?.data?.results || []);
  return (
    <>
      <section id="movie-details">
        <section id="details-hero">
          <Banner
            details={details}
            trailer={trailer}
            isTrailerPlaying={isTrailerPlaying}
            setIsTrailerPlaying={setIsTrailerPlaying}
          />
        </section>
        <section id="movie-info" className="container mx-auto px-3 lg:px-0">
          <div className="flex flex-col justify-between gap-5 my-7 relative">
            <div>
              <h2 className="text-2xl font-bold text-vibe-cyan border-l-4 border-vibe-cyan pl-4 mb-8 uppercase tracking-tighter">
                Overview
              </h2>
              <p className="text-zinc-400 text-sm md:text-lg max-w-3xl line-clamp-3 md:line-clamp-none mb-5">
                {details.overview}
              </p>
              {/* Cast Section */}
              <div className="mt-10 overflow-hidden max-w-3xl ">
                <h2 className="text-2xl font-bold text-vibe-cyan border-l-4 border-vibe-cyan pl-4 mb-8 uppercase tracking-tighter">
                  Top Cast
                </h2>

                {/* Horizontal Scroll for Cast */}
                <div className="flex gap-6 overflow-x-auto pb-6 no-scrollbar">
                  {credits?.cast?.slice(0, 15).map((person) => (
                    <Link to={`/person/${person.id}`} key={person.id}>
                      <div
                        key={person.id}
                        className="shrink-0 w-32 md:w-40 group flex flex-col items-center"
                      >
                        <div className="relative aspect-square overflow-hidden h-42 w-30 rounded-full border-2 border-zinc-800 group-hover:border-vibe-cyan transition-colors mb-3 shadow-xl">
                          <img
                            src={
                              person.profile_path
                                ? `https://image.tmdb.org/t/p/w200${person.profile_path}`
                                : "https://via.placeholder.com/200x200?text=No+Image"
                            }
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            alt={person.name}
                          />
                        </div>
                        <h4 className="text-sm font-bold text-white truncate">
                          {person.name}
                        </h4>
                        <p className="text-xs text-zinc-500 truncate italic">
                          {person.character}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="lg:absolute lg:-top-60 lg:right-0">
              <MovieInfoCard details={details} />
            </div>
          </div>

          {/* episodes or session Section */}
          {type === "tv" && details.seasons && (
            <div className="mt-10">
              <h2 className="text-2xl font-bold text-vibe-cyan border-l-4 border-vibe-cyan pl-4 mb-4 uppercase tracking-tighter">
                Seasons
              </h2>
              <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                {details.seasons.map((season) => (
                  <>
                    {season.episode_count ? (
                      <div
                        key={season.id}
                        className="shrink-0 w-32 bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-center"
                      >
                        <p className="text-vibe-cyan font-bold text-sm">
                          {season.name}
                        </p>
                        <p className="text-[10px] text-zinc-500">
                          {season.episode_count} Episodes
                        </p>
                      </div>
                    ) : null}
                  </>
                ))}
              </div>
            </div>
          )}
          <div className="mt-20">
            <h2 className="text-2xl font-bold text-vibe-cyan border-l-4 border-vibe-cyan pl-4 mb-8 uppercase tracking-tighter">
              Similar Movies
            </h2>
            {similarMovies && similarMovies.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {similarMovies.map((movie: MovieProps) => (
                  <MovieCard key={movie.id} data={movie} />
                ))}
              </div>
            ) : (
              <p className="text-zinc-400 text-sm md:text-lg max-w-3xl line-clamp-3 md:line-clamp-none mb-5">
                No similar movies found.
              </p>
            )}
          </div>
        </section>
      </section>
    </>
  );
};

export default MovieDetails;
