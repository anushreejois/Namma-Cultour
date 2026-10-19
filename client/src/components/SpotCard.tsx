import { motion } from 'framer-motion';
import type { CulturalSpot } from '../types/spot';
import { MapPin, Train, Ticket, ExternalLink } from 'lucide-react';

interface SpotCardProps {
  spot: CulturalSpot;
  isSelected: boolean;
  onSelect: (spot: CulturalSpot) => void;
  onNavigate?: (spot: CulturalSpot) => void;
}

export const SpotCard = ({
  spot,
  isSelected,
  onSelect,
  onNavigate,
}: SpotCardProps) => {
  const getCategoryStyles = (category: string) => {
    switch (category) {
      case 'museum':
        return {
          badge: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
          accent: 'border-l-amber-500',
          dot: 'bg-amber-400',
        };
      case 'gallery':
        return {
          badge: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
          accent: 'border-l-sky-500',
          dot: 'bg-sky-400',
        };
      case 'library':
        return {
          badge: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
          accent: 'border-l-cyan-500',
          dot: 'bg-cyan-400',
        };
      default:
        return {
          badge: 'bg-slate-500/15 text-slate-300 border-slate-500/30',
          accent: 'border-l-cyan-500',
          dot: 'bg-cyan-400',
        };
    }
  };

  const style = getCategoryStyles(spot.category);

  return (
    <motion.div
      onClick={() => onSelect(spot)}
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      className={`relative min-w-[280px] sm:min-w-[320px] max-w-[320px] rounded-2xl p-4 cursor-pointer transition-all duration-300 border border-l-4 ${style.accent} flex flex-col justify-between select-none ${
        isSelected
          ? 'glass-card-active ring-2 ring-sky-400/50 shadow-2xl scale-[1.01]'
          : 'glass-card hover:border-white/25 hover:shadow-xl'
      }`}
    >
      <div>
        {/* Header row: category badge + entry fee */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-1.5">
            <span
              className={`px-2 py-0.5 rounded-full text-[11px] font-medium border flex items-center gap-1 uppercase tracking-wider font-mono ${style.badge}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${style.dot} animate-pulse`} />
              {spot.category}
            </span>
            <span className="text-[11px] text-slate-400 truncate max-w-[120px]">
              {spot.subType || spot.sub_type}
            </span>
          </div>

          {(spot.entryFee || spot.entry_fee) && (
            <span className="text-[11px] text-slate-300 font-mono bg-white/5 px-2 py-0.5 rounded-full flex items-center gap-1">
              <Ticket className="w-3 h-3 text-emerald-400" />
              {spot.entryFee || spot.entry_fee}
            </span>
          )}
        </div>

        {/* Spot Name */}
        <h3 className="font-display font-semibold text-slate-100 text-sm sm:text-base leading-snug line-clamp-1 mb-1 group-hover:text-sky-300 transition-colors">
          {spot.name}
        </h3>

        {/* Kannada Name if present */}
        {(spot.kannadaName || spot.kannada_name) && (
          <p className="text-xs text-sky-400/80 font-medium mb-1 line-clamp-1">
            {spot.kannadaName || spot.kannada_name}
          </p>
        )}

        {/* Tagline */}
        {spot.tagline && (
          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-3">
            {spot.tagline}
          </p>
        )}
      </div>

      {/* Meta Footer */}
      <div className="pt-2 border-t border-white/5 flex flex-col gap-1 text-[11px] text-slate-400">
        <div className="flex items-center justify-between">
          {/* Neighborhood */}
          {spot.neighborhood && (
            <span className="flex items-center gap-1 text-slate-300 truncate max-w-[160px]">
              <MapPin className="w-3 h-3 text-cyan-400 shrink-0" />
              <span className="truncate">{spot.neighborhood}</span>
            </span>
          )}

          {/* Quick Navigate link */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onNavigate) {
                onNavigate(spot);
              } else {
                window.open(
                  `https://www.google.com/maps/dir/?api=1&destination=${spot.lat},${spot.lng}`,
                  '_blank',
                  'noreferrer,noopener'
                );
              }
            }}
            className="flex items-center gap-1 text-[10px] text-sky-400 hover:text-sky-200 transition-colors cursor-pointer px-1.5 py-0.5 rounded bg-sky-500/10 hover:bg-sky-500/20"
          >
            <span>Directions</span>
            <ExternalLink className="w-2.5 h-2.5" />
          </button>
        </div>

        {/* Nearest Metro */}
        {(spot.nearestMetro || spot.nearest_metro) && (
          <div className="flex items-center gap-1 text-slate-400 truncate text-[10px]">
            <Train className="w-3 h-3 text-purple-400 shrink-0" />
            <span className="truncate">{spot.nearestMetro || spot.nearest_metro}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};
