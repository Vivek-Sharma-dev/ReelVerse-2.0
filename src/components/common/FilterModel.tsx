import { useState } from "react";

const FilterModal = ({
  isOpen,
  onClose,
  filters,
  setFilters,
}: {
  isOpen: boolean;
  onClose: () => void;
  filters: any;
  setFilters: any;
}) => {
  const [activeTab, setActiveTab] = useState("type"); // 'type', 'year', 'rating'

  const filterTabs = [
    { id: "type", label: "Content Type" },
    { id: "year", label: "Release Year" },
    { id: "safety", label: "Content Safety" },
    { id: "sort", label: "Sort By" },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-zinc-950 border border-zinc-800 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl flex flex-col h-125">
        {/* Header */}
        <div className="p-6 border-b border-zinc-900 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white tracking-tighter">
            ADVANCED <span className="text-vibe-cyan">FILTERS</span>
          </h2>
          <button onClick={onClose} className="text-zinc-500 hover:text-white">
            Close
          </button>
        </div>

        {/* Body: Left Sidebar + Right Options */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left Sidebar */}
          <div className="w-1/3 border-r border-zinc-900 bg-zinc-900/20">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left px-6 py-4 text-sm font-bold transition-all ${
                  activeTab === tab.id
                    ? "bg-vibe-cyan/10 text-vibe-cyan border-r-2 border-vibe-cyan"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Right Content */}
          <div className="w-2/3 p-8 overflow-y-auto">
            {activeTab === "type" && (
              <div className="space-y-3">
                {["all", "movie", "tv", "anime"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setFilters({ ...filters, mediaType: t })}
                    className={`w-full p-4 rounded-xl border text-left transition-all ${filters.mediaType === t ? "border-vibe-cyan bg-vibe-cyan/5 text-white" : "border-zinc-800 text-zinc-500"}`}
                  >
                    {t.toUpperCase()}
                  </button>
                ))}
              </div>
            )}

            {activeTab === "year" && (
              <input
                type="number"
                placeholder="Ex: 2024"
                className="w-full bg-zinc-900 border border-zinc-800 p-4 rounded-xl text-white outline-none focus:border-vibe-cyan"
                value={filters.year}
                onChange={(e) =>
                  setFilters({ ...filters, year: e.target.value })
                }
              />
            )}

            {activeTab === "safety" && (
              <label className="flex items-center gap-4 cursor-pointer p-4 bg-zinc-900 rounded-xl border border-zinc-800">
                <input
                  type="checkbox"
                  checked={filters.includeAdult}
                  onChange={(e) =>
                    setFilters({ ...filters, includeAdult: e.target.checked })
                  }
                />
                <span className="text-white font-bold">
                  Include Adult Content
                </span>
              </label>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-zinc-900 flex justify-end gap-4">
          <button
            onClick={() => {
              setFilters({
                mediaType: "all",
                year: "",
                includeAdult: false,
                sortBy: "popularity.desc",
              });
              onClose();
            }}
            className="text-zinc-500 font-bold text-sm"
          >
            RESET
          </button>
          <button
            onClick={onClose}
            className="bg-vibe-cyan text-black px-8 py-2 rounded-xl font-bold"
          >
            APPLY FILTERS
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
