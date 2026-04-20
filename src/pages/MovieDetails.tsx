import { useParams } from "react-router-dom";
import { useMovieDetails } from "../hooks/useDetails";
import Loading from "../components/common/Loading";
import Error from "../components/common/Error";
import Banner from "../components/layout/DetailsPage/Banner";
import MovieInfoCard from "../components/common/MovieInfoCard";
import MovieCard from "../components/common/MovieCard";

const MovieDetails = () => {
  const { id, type } = useParams();
  const { data, isPending, isError } = useMovieDetails(
    Number(id),
    type || "movie",
  );

  if (isPending) return <Loading />;
  if (isError) return <Error />;
  const { details, credits, similarMovies } = data || {};

  console.log(credits.cast[1]);

  return (
    <>
      <section id="movie-details">
        <div>
          <Banner details={details} />
          <div className="flex justify-between gap-5 my-7">
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
                    <div
                      key={person.id}
                      className="shrink-0 w-32 md:w-40 group text-center"
                    >
                      <div className="relative  overflow-hidden rounded-full border-2 border-zinc-800 group-hover:border-vibe-cyan transition-colors mb-3 shadow-xl">
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
                  ))}
                </div>
              </div>
            </div>
            <div className="relative lg:-top-60">
              <MovieInfoCard details={details} />
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-vibe-cyan border-l-4 border-vibe-cyan pl-4 mb-8 uppercase tracking-tighter">
            Similar Movies
          </h2>

          <div className="grid grid-cols-4 gap-5">
            {similarMovies?.results?.slice(0, 8).map((movie) => (
              <MovieCard key={movie.id} data={movie} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default MovieDetails;
