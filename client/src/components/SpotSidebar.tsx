import { useState, useMemo, useRef, useEffect } from 'react';
import type { CulturalSpot, FilterCategory } from '../types/spot';
import { Search, MapPin, Ticket, X, ChevronDown, ChevronUp } from 'lucide-react';

interface SpotSidebarProps {
  spots: CulturalSpot[];
  selectedSpot: CulturalSpot | null;
  activeCategory: FilterCategory;
  onSelectSpot: (spot: CulturalSpot) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

function getCategoryColor(category: string): string {
  switch (category.toLowerCase()) {
    case 'museum':
      return '#f59e0b'; // Amber
    case 'gallery':
      return '#c2410c'; // Warm Terracotta / Bronze
    case 'library':
      return '#06b6d4'; // Clean Electric Cyan / Teal
    default:
      return '#0ea5e9';
  }
}

export const SpotSidebar = ({
  spots,
  selectedSpot,
  activeCategory,
  onSelectSpot,
  isOpenMobile,
  onCloseMobile,
}: SpotSidebarProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const itemRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Filter spots by category & search query
  const filteredSpots = useMemo(() => {
    let result = spots;
    if (activeCategory !== 'all') {
      result = result.filter(
        (s) => s.category.toLowerCase() === activeCategory.toLowerCase()
      );
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          (s.kannadaName && s.kannadaName.toLowerCase().includes(q)) ||
          (s.neighborhood && s.neighborhood.toLowerCase().includes(q)) ||
          (s.subType && s.subType.toLowerCase().includes(q)) ||
          (s.tagline && s.tagline.toLowerCase().includes(q))
      );
    }
    return result;
  }, [spots, activeCategory, searchQuery]);

  // Scroll to selected item inside sidebar
  useEffect(() => {
    if (selectedSpot && itemRefs.current[selectedSpot.id]) {
      itemRefs.current[selectedSpot.id]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [selectedSpot]);

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-slate-900/30 backdrop-blur-sm z-20 md:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed z-20 transition-all duration-300 flex flex-col bg-white/75 backdrop-blur-2xl rounded-2xl shadow-[0_16px_40px_-10px_rgba(15,23,42,0.08)] border border-white/90 ring-1 ring-slate-900/5 text-slate-800 overflow-hidden
          ${
            isOpenMobile
              ? 'inset-x-4 bottom-4 max-h-[70vh] md:max-h-none md:inset-x-auto'
              : 'hidden md:flex'
          }
          md:left-6 md:top-20 md:bottom-6 md:w-80 lg:w-88
          ${isCollapsed ? 'md:h-14 md:bottom-auto' : ''}
        `}
      >
        {/* Sidebar Header */}
        <div className="p-3.5 border-b border-slate-200/80 bg-white/40 flex flex-col gap-2.5 shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-display font-semibold uppercase tracking-wider text-slate-700">
                Landmarks Directory
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 font-semibold">
                {filteredSpots.length}
              </span>
            </div>

            <div className="flex items-center gap-1">
              {/* Desktop collapse toggle */}
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="hidden md:flex p-1 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                title={isCollapsed ? 'Expand directory' : 'Collapse directory'}
              >
                {isCollapsed ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronUp className="w-4 h-4" />
                )}
              </button>

              {/* Mobile close */}
              <button
                onClick={onCloseMobile}
                className="md:hidden p-1 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Search Box */}
          {!isCollapsed && (
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search spots, areas (e.g. Cubbon)..."
                className="w-full bg-white/90 border border-slate-200/90 rounded-xl pl-8 pr-7 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 shadow-xs font-sans transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Scrollable Spots List */}
        {!isCollapsed && (
          <div className="flex-1 overflow-y-auto no-scrollbar p-2 space-y-1.5">
            {filteredSpots.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-500 flex flex-col items-center gap-2">
                <span>No cultural spots match "{searchQuery}"</span>
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-indigo-600 hover:underline cursor-pointer font-medium"
                >
                  Clear search
                </button>
              </div>
            ) : (
              filteredSpots.map((spot) => {
                const isSelected = selectedSpot?.id === spot.id;
                const catColor = getCategoryColor(spot.category);

                return (
                  <div
                    key={spot.id}
                    ref={(el) => {
                      itemRefs.current[spot.id] = el;
                    }}
                    onClick={() => {
                      onSelectSpot(spot);
                      if (isOpenMobile) onCloseMobile();
                    }}
                    className={`group p-2.5 rounded-xl cursor-pointer transition-all duration-200 border flex items-start gap-2.5 ${
                      isSelected
                        ? 'bg-white/95 border-indigo-500/40 shadow-md shadow-indigo-500/10 ring-1 ring-indigo-500/20'
                        : 'bg-white/45 hover:bg-white/85 border-slate-100 hover:border-slate-200/80 shadow-xs'
                    }`}
                  >
                    {/* Category dot */}
                    <div
                      className="w-2.5 h-2.5 rounded-full shrink-0 mt-1 shadow-xs transition-transform group-hover:scale-125"
                      style={{
                        backgroundColor: catColor,
                        boxShadow: `0 0 6px ${catColor}66`,
                      }}
                    />

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <h4
                          className={`text-xs font-display font-semibold truncate transition-colors ${
                            isSelected
                              ? 'text-indigo-700 font-bold'
                              : 'text-slate-800 group-hover:text-slate-950'
                          }`}
                        >
                          {spot.name}
                        </h4>

                        {/* Strict single-line truncated badge */}
                        {(spot.entryFee || spot.entry_fee) && (
                          <span className="shrink-0 text-[10px] font-mono text-slate-600 bg-slate-100/90 px-1.5 py-0.5 rounded border border-slate-200/80 flex items-center gap-0.5 whitespace-nowrap truncate max-w-[100px]">
                            <Ticket className="w-2.5 h-2.5 text-emerald-600 shrink-0" />
                            <span className="truncate">
                              {spot.entryFee || spot.entry_fee}
                            </span>
                          </span>
                        )}
                      </div>

                      {/* Kannada name if available */}
                      {(spot.kannadaName || spot.kannada_name) && (
                        <p className="text-[10px] text-indigo-600/80 truncate mb-0.5 font-medium">
                          {spot.kannadaName || spot.kannada_name}
                        </p>
                      )}

                      {/* Subtype and Neighborhood */}
                      <div className="flex items-center gap-2 text-[11px] text-slate-500">
                        <span className="truncate max-w-[130px]">
                          {spot.subType || spot.sub_type}
                        </span>
                        {spot.neighborhood && (
                          <span className="flex items-center gap-0.5 text-slate-500 truncate max-w-[100px] shrink-0">
                            <MapPin className="w-2.5 h-2.5 text-slate-400 shrink-0" />
                            <span className="truncate">{spot.neighborhood}</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </aside>
    </>
  );
};
