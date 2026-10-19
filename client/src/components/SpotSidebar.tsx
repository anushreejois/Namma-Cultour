import { useState, useMemo, useRef, useEffect } from 'react';
import type { CulturalSpot, FilterCategory } from '../types/spot';
import { Search, MapPin, Ticket, X, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';

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
      return '#f59e0b'; // Warm Amber
    case 'gallery':
      return '#ea580c'; // Warm Terracotta / Bronze
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
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-20 md:hidden"
        />
      )}

      {/* Sidebar Container: Warm Obsidian Glassmorphism */}
      <aside
        className={`fixed z-20 transition-all duration-300 flex flex-col rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.7)] border border-stone-800/80 ring-1 ring-white/5 bg-[#0c0a09]/85 backdrop-blur-2xl text-stone-100 overflow-hidden
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
        <div className="p-3.5 border-b border-stone-800/80 bg-[#0c0a09]/60 backdrop-blur-md flex flex-col gap-2.5 shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-stone-300">
                Landmarks Directory
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-stone-900 border border-stone-700/80 text-amber-500/90 font-medium">
                {filteredSpots.length}
              </span>
            </div>

            <div className="flex items-center gap-1">
              {/* Desktop collapse toggle */}
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="hidden md:flex p-1 rounded-lg hover:bg-stone-800/80 text-stone-400 hover:text-stone-100 transition-colors cursor-pointer"
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
                className="md:hidden p-1 rounded-lg hover:bg-stone-800/80 text-stone-400 hover:text-stone-100 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Search Box */}
          {!isCollapsed && (
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search spots, areas (e.g. Cubbon)..."
                className="w-full bg-stone-900/90 border border-stone-800 rounded-xl pl-8 pr-7 py-2 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-600/60 focus:ring-1 focus:ring-amber-600/40 transition-all font-sans shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-100 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Scrollable Spots List with Tactile Hover Effects */}
        {!isCollapsed && (
          <div className="flex-1 overflow-y-auto no-scrollbar p-2 space-y-1.5">
            {filteredSpots.length === 0 ? (
              <div className="p-6 text-center text-xs text-stone-400 flex flex-col items-center gap-2">
                <span>No cultural spots match "{searchQuery}"</span>
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-amber-500 hover:underline cursor-pointer"
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
                    className={`group p-2.5 rounded-xl cursor-pointer transition-all duration-200 border flex items-start gap-2.5 select-none ${
                      isSelected
                        ? 'bg-stone-900/95 border-amber-600/60 shadow-lg shadow-black/50 ring-1 ring-amber-600/40 translate-x-1'
                        : 'bg-stone-900/45 hover:bg-stone-900/90 border-stone-800/60 hover:border-amber-600/40 hover:translate-x-1.5 shadow-xs hover:shadow-lg hover:shadow-black/60 hover:ring-1 hover:ring-amber-500/20 active:scale-[0.99]'
                    }`}
                  >
                    {/* Category dot with glowing pulse on hover */}
                    <div
                      className="w-2.5 h-2.5 rounded-full shrink-0 mt-1 shadow-sm transition-all duration-300 group-hover:scale-125"
                      style={{
                        backgroundColor: catColor,
                        boxShadow: `0 0 10px ${catColor}88`,
                      }}
                    />

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <h4
                          className={`text-xs font-serif font-bold tracking-tight truncate transition-colors duration-150 ${
                            isSelected
                              ? 'text-amber-200'
                              : 'text-stone-200 group-hover:text-amber-300'
                          }`}
                        >
                          {spot.name}
                        </h4>

                        {/* Strict single-line truncated badge */}
                        {(spot.entryFee || spot.entry_fee) && (
                          <span className="shrink-0 text-[10px] font-mono text-stone-300 bg-stone-900/90 px-1.5 py-0.5 rounded border border-stone-800 group-hover:border-stone-700/80 transition-colors flex items-center gap-0.5 whitespace-nowrap truncate max-w-[100px]">
                            <Ticket className="w-2.5 h-2.5 text-amber-500/80 shrink-0" />
                            <span className="truncate">
                              {spot.entryFee || spot.entry_fee}
                            </span>
                          </span>
                        )}
                      </div>

                      {/* Kannada name if available */}
                      {(spot.kannadaName || spot.kannada_name) && (
                        <p className="text-[10px] text-amber-500/80 truncate mb-0.5 font-medium">
                          {spot.kannadaName || spot.kannada_name}
                        </p>
                      )}

                      {/* Subtype and Neighborhood */}
                      <div className="flex items-center gap-2 text-[11px] text-stone-400 group-hover:text-stone-300 transition-colors">
                        <span className="truncate max-w-[130px]">
                          {spot.subType || spot.sub_type}
                        </span>
                        {spot.neighborhood && (
                          <span className="flex items-center gap-0.5 text-stone-400 group-hover:text-stone-300 truncate max-w-[100px] shrink-0 transition-colors">
                            <MapPin className="w-2.5 h-2.5 text-stone-500 shrink-0" />
                            <span className="truncate">{spot.neighborhood}</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Interactive hover indicator arrow */}
                    <ArrowRight className="w-3.5 h-3.5 text-amber-500/80 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 shrink-0 mt-1 self-center" />
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
