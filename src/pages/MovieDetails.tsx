import { useParams } from "react-router-dom";
import { useMovieDetails } from "../hooks/useDetails";
import Loading from "../components/common/Loading";
import Error from "../components/common/Error";
import Banner from "../components/layout/DetailsPage/Banner";
import MovieInfoCard from "../components/common/MovieInfoCard";

const MovieDetails = () => {
  const { id, type } = useParams();
  const { data, isPending, isError } = useMovieDetails(
    Number(id),
    type || "movie",
  );

  if (isPending) return <Loading />;
  if (isError) return <Error />;
  const { details, credits, similarMovies } = data || {};
  console.log("Movie Details:", details);
  const title = details?.original_title || details?.name || "Untitled";
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
                  {credits?.cast?.slice(0, 15).map((person: any) => (
                    <div
                      key={person.id}
                      className="flex-shrink-0 w-32 md:w-40 group text-center"
                    >
                      <div className="relative aspect-square overflow-hidden rounded-full border-2 border-zinc-800 group-hover:border-vibe-cyan transition-colors mb-3 shadow-xl">
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
        <div className="mt-8">
          <h3 className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-4">
            Production Studios
          </h3>
          <div className="flex flex-wrap gap-6 items-center grayscale hover:grayscale-0 transition-all">
            {details?.production_companies?.map(
              (company: any) =>
                company.logo_path && (
                  <img
                    key={company.id}
                    src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                    alt={company.name}
                    title={company.name} // Hover karne par naam dikhega
                    className="h-6 md:h-8 object-contain"
                  />
                ),
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default MovieDetails;
