import { motion, AnimatePresence } from 'framer-motion';
import type { CulturalSpot } from '../types/spot';
import {
  X,
  Navigation,
  Train,
  Clock,
  Ticket,
  MapPin,
  Compass,
  Share2,
  Landmark,
  Palette,
  BookOpen,
} from 'lucide-react';

interface SpotDrawerProps {
  spot: CulturalSpot | null;
  onClose: () => void;
}

export const SpotDrawer = ({ spot, onClose }: SpotDrawerProps) => {
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'museum':
        return Landmark;
      case 'gallery':
        return Palette;
      case 'library':
        return BookOpen;
      default:
        return Compass;
    }
  };
  const getCategoryTheme = (category: string) => {
    switch (category.toLowerCase()) {
      case 'museum':
        return {
          color: '#f59e0b',
          bgBadge: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
          accent: 'text-amber-400',
        };
      case 'gallery':
        return {
          color: '#38bdf8',
          // Clean slate-blue token (NO orange!)
          bgBadge: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
          accent: 'text-sky-400',
        };
      case 'library':
        return {
          color: '#06b6d4',
          bgBadge: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
          accent: 'text-cyan-400',
        };
      default:
        return {
          color: '#06b6d4',
          bgBadge: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
          accent: 'text-cyan-400',
        };
    }
  };

  const handleNavigate = (targetSpot: CulturalSpot) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${targetSpot.lat},${targetSpot.lng}`;
    window.open(url, '_blank', 'noreferrer,noopener');
  };

  const handleShare = async (targetSpot: CulturalSpot) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: targetSpot.name,
          text: `Check out ${targetSpot.name} in Bengaluru on Namma Cultour!`,
          url: window.location.href,
        });
      } catch {
        // user canceled share
      }
    } else {
      navigator.clipboard.writeText(
        `${targetSpot.name} - https://www.google.com/maps/dir/?api=1&destination=${targetSpot.lat},${targetSpot.lng}`
      );
      alert('Location link copied to clipboard!');
    }
  };

  return (
    <AnimatePresence mode="wait">
      {spot && (
        <motion.aside
          key={spot.id}
          initial={{ opacity: 0, x: 25, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 25, scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 350, damping: 28 }}
          className="fixed z-20 
            right-4 sm:right-6 top-20 w-[calc(100vw-2rem)] sm:w-[380px] lg:w-[400px] 
            max-h-[calc(100vh-6.5rem)] glass-panel rounded-2xl shadow-2xl border border-white/15 
            overflow-hidden flex flex-col bg-slate-900/95 backdrop-blur-2xl"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 pb-3.5 border-b border-white/10 shrink-0">
            <div className="flex items-center justify-between gap-2.5 mb-2">
              <div className="flex items-center min-w-0 flex-1">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10.5px] sm:text-[11px] font-medium border uppercase tracking-wider font-mono flex items-center gap-1.5 min-w-0 max-w-full ${
                    getCategoryTheme(spot.category).bgBadge
                  }`}
                >
                  {(() => {
                    const CategoryIcon = getCategoryIcon(spot.category);
                    return <CategoryIcon className="w-3 h-3 shrink-0" />;
                  })()}
                  <span className="truncate">
                    {spot.category} • {spot.subType || spot.sub_type}
                  </span>
                </span>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => handleShare(spot)}
                  title="Share Spot"
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer border border-white/10"
                >
                  <Share2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={onClose}
                  title="Close Drawer"
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer border border-white/10"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <h3 className="font-display text-lg sm:text-xl font-bold text-white leading-snug">
              {spot.name}
            </h3>

            {(spot.kannadaName || spot.kannada_name) && (
              <p className="text-xs sm:text-sm text-sky-400 font-medium mt-0.5">
                {spot.kannadaName || spot.kannada_name}
              </p>
            )}
          </div>

          {/* Scrollable Details Body */}
          <div className="p-4 sm:p-5 overflow-y-auto no-scrollbar space-y-3 flex-1">
            {/* Tagline / Overview */}
            {spot.tagline && (
              <p className="text-xs text-slate-200 leading-relaxed bg-white/5 p-3 rounded-xl border border-white/5">
                {spot.tagline}
              </p>
            )}

            {/* Operational Hours */}
            {spot.timings && (
              <div className="glass-card p-3 rounded-xl flex items-start gap-2.5 border border-white/5">
                <Clock className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                <div className="min-w-0">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-mono block">
                    Operational Hours
                  </span>
                  <p className="text-xs text-slate-100 font-medium mt-0.5">
                    {spot.timings}
                  </p>
                </div>
              </div>
            )}

            {/* Nearest Metro Station */}
            {(spot.nearestMetro || spot.nearest_metro) && (
              <div className="glass-card p-3 rounded-xl flex items-start gap-2.5 border border-white/5">
                <Train className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
                <div className="min-w-0">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-mono block">
                    Transit & Namma Metro
                  </span>
                  <p className="text-xs text-slate-100 font-medium mt-0.5">
                    {spot.nearestMetro || spot.nearest_metro}
                  </p>
                </div>
              </div>
            )}

            {/* Entry Fee with clean badge */}
            {(spot.entryFee || spot.entry_fee) && (
              <div className="glass-card p-3 rounded-xl flex items-start gap-2.5 border border-white/5">
                <Ticket className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-mono block">
                    Entry Guidelines
                  </span>
                  <p className="text-xs text-emerald-300 font-mono font-medium mt-0.5">
                    {spot.entryFee || spot.entry_fee}
                  </p>
                </div>
              </div>
            )}

            {/* Neighborhood */}
            {spot.neighborhood && (
              <div className="glass-card p-3 rounded-xl flex items-start gap-2.5 border border-white/5">
                <MapPin className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                <div className="min-w-0">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-mono block">
                    Neighborhood
                  </span>
                  <p className="text-xs text-slate-100 font-medium mt-0.5">
                    {spot.neighborhood}, Bengaluru
                  </p>
                </div>
              </div>
            )}

            {/* Coordinates */}
            <div className="glass-card p-2.5 rounded-xl flex items-center justify-between gap-2 border border-white/5 text-[11px] font-mono text-slate-400">
              <span className="flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-cyan-400" />
                Coordinates
              </span>
              <span className="text-slate-300">
                {spot.lat.toFixed(4)}° N, {spot.lng.toFixed(4)}° E
              </span>
            </div>
          </div>

          {/* Footer Action: Luxury Twilight Indigo Navigation Button (Zero Orange) */}
          <div className="p-3.5 sm:p-4 border-t border-white/10 bg-slate-950/90 backdrop-blur-xl shrink-0">
            <button
              id="navigate-google-maps-btn"
              onClick={() => handleNavigate(spot)}
              className="w-full py-3 px-4 rounded-xl font-display font-semibold text-xs sm:text-sm flex items-center justify-center gap-2.5 bg-gradient-to-r from-sky-600 via-indigo-600 to-indigo-700 hover:from-sky-500 hover:via-indigo-500 hover:to-indigo-600 text-white shadow-xl shadow-indigo-950/60 border border-white/15 transition-all duration-300 cursor-pointer active:scale-95 group"
            >
              <Navigation className="w-4 h-4 text-sky-200 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              <span>Navigate via Google Maps</span>
            </button>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};
