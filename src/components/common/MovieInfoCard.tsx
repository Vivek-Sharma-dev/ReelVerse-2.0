import type { ContentDetailsProps } from "../../utils/types/card.type";
import { DollarSign, Star, Calendar, Globe } from "lucide-react";

const MovieInfoCard = ({ details }: { details: ContentDetailsProps }) => {
  // Helpers
  const formatCurrency = (num?: number) =>
    num
      ? new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 0,
        }).format(num)
      : "N/A";

  const stats = [
    {
      label: "Rating",
      value: `${details.vote_average?.toFixed(1)} / 10`,
      icon: <Star className="text-yellow-500" size={18} />,
      color: "text-yellow-500",
    },
    {
      label: "Status",
      value: details.status,
      icon: <Calendar className="text-vibe-cyan" size={18} />,
      color: "text-vibe-cyan",
    },
    {
      label: "Budget",
      value: formatCurrency(details.budget),
      icon: <DollarSign className="text-green-500" size={18} />,
      color: "text-green-500",
    },
    {
      label: "Revenue",
      value: formatCurrency(details.revenue),
      icon: <Globe className="text-blue-500" size={18} />,
      color: "text-blue-500",
    },
  ];

  const name = details.title || details.name || "N/A";
  return (
    <div className="w-full h-full max-w-sm bg-zinc-900/50 backdrop-blur-md border-4 border-vibe-cyan rounded-3xl overflow-hidden hover:glow transition-shadow duration-300j">
      {/* 1. Poster Section */}
      <div className="relative group ">
        <img
          src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
          alt={name}
          className="w-full aspect-2/2.5 object-fit transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-zinc-900/50 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* 2. Stats Grid */}
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-white/5 p-3 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center gap-2 mb-1">
                {stat.icon}
                <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">
                  {stat.label}
                </span>
              </div>
              <p className={`text-sm font-semibold truncate ${stat.color}`}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* 3. Production Badge */}
        {details.production_companies?.[0] && (
          <div className="pt-4 border-t border-zinc-800 flex items-center gap-3">
            {details.production_companies[0].logo_path && (
              <img
                src={`https://image.tmdb.org/t/p/w200${details.production_companies[0].logo_path}`}
                className="h-6 invert opacity-70 object-contain"
                alt="studio"
              />
            )}
            <p className="text-[11px] text-zinc-400 italic">
              Produced by {details.production_companies[0].name}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieInfoCard;
