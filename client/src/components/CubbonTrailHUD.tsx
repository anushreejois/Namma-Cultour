import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Route,
  X,
  ChevronUp,
  ChevronDown,
  Navigation,
  ExternalLink,
  MapPin,
  Clock,
  Compass,
} from 'lucide-react';

export interface TrailWaypoint {
  id: string;
  number: number;
  name: string;
  category: 'library' | 'museum' | 'gallery' | 'landmark';
  subType: string;
  lat: number;
  lng: number;
  description: string;
  matchedSpotId?: string;
  iconEmoji: string;
}

export const CUBBON_TRAIL_STOPS: TrailWaypoint[] = [
  {
    id: 'scl',
    number: 1,
    name: 'State Central Library',
    category: 'library',
    subType: 'Historic Flagship Archive (1915)',
    lat: 12.9754,
    lng: 77.5929,
    description: 'Iconic crimson heritage landmark inside Cubbon Park with over 300,000 reference volumes.',
    matchedSpotId: 'scl',
    iconEmoji: '📚',
  },
  {
    id: 'attara-kacheri',
    number: 2,
    name: 'High Court (Attara Kacheri)',
    category: 'landmark',
    subType: 'Neoclassical Landmark (1868)',
    lat: 12.9772,
    lng: 77.5925,
    description: 'Stunning two-storied red brick heritage landmark facing Vidhana Soudha.',
    iconEmoji: '🏛️',
  },
  {
    id: 'vidhana-soudha',
    number: 3,
    name: 'Vidhana Soudha (South Promenade)',
    category: 'landmark',
    subType: 'Neo-Dravidian Architectural Monument',
    lat: 12.9785,
    lng: 77.5920,
    description: 'Seat of the Karnataka state legislature built with Bangalore granite.',
    iconEmoji: '🏛️',
  },
  {
    id: 'victoria-statue',
    number: 4,
    name: 'Queen Victoria Statue & Groves',
    category: 'landmark',
    subType: 'Historic Marble Sculpture & Bamboo Park',
    lat: 12.9775,
    lng: 77.5948,
    description: 'Centennial British marble sculpture framed by dense canopy trees and bamboo clusters.',
    iconEmoji: '🌳',
  },
  {
    id: 'gov-museum',
    number: 5,
    name: 'Government Museum',
    category: 'museum',
    subType: 'Archaeology & Antiquity (1877)',
    lat: 12.9753,
    lng: 77.5958,
    description: 'One of India’s oldest public museums, housing ancient sculptures and the Halmidi Kannada stone.',
    matchedSpotId: 'gov-museum',
    iconEmoji: '🏛️',
  },
  {
    id: 'venkatappa',
    number: 6,
    name: 'Venkatappa Art Gallery',
    category: 'gallery',
    subType: 'Modern Art & Retrospective',
    lat: 12.9752,
    lng: 77.5960,
    description: 'Celebrated public gallery spotlighting K. Venkatappa watercolors and contemporary painters.',
    matchedSpotId: 'venkatappa',
    iconEmoji: '🎨',
  },
  {
    id: 'vitm',
    number: 7,
    name: 'Visvesvaraya Tech Museum (VITM)',
    category: 'museum',
    subType: 'Interactive STEM Pavilions',
    lat: 12.9752,
    lng: 77.5963,
    description: 'Dynamic interactive mechanics, engine halls, aerospace exhibits, and children science galleries.',
    matchedSpotId: 'vitm',
    iconEmoji: '⚙️',
  },
  {
    id: 'bandstand',
    number: 8,
    name: 'Cubbon Park Bandstand',
    category: 'landmark',
    subType: 'Victorian Walking Promenade',
    lat: 12.9736,
    lng: 77.5945,
    description: 'Historic octagonal cast-iron bandstand surrounded by heritage mahogany trees and morning joggers.',
    iconEmoji: '🎵',
  },
];

const GOOGLE_MAPS_WALKING_URL =
  'https://www.google.com/maps/dir/?api=1&origin=12.9754,77.5929&destination=12.9754,77.5929&waypoints=12.9772,77.5925%7C12.9785,77.5920%7C12.9753,77.5958%7C12.9752,77.5963%7C12.9736,77.5945&travelmode=walking';

interface CubbonTrailHUDProps {
  isVisible: boolean;
  onClose: () => void;
  onSelectWaypoint: (stop: TrailWaypoint) => void;
  onRecenterTrail: () => void;
  activeWaypointId?: string | null;
}

export const CubbonTrailHUD: React.FC<CubbonTrailHUDProps> = ({
  isVisible,
  onClose,
  onSelectWaypoint,
  onRecenterTrail,
  activeWaypointId,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 35, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 35, scale: 0.95 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-auto max-w-2xl w-[calc(100vw-1.5rem)] sm:w-auto"
      >
        <div
          className={`rounded-2xl bg-white/85 backdrop-blur-2xl border shadow-xl ring-1 ring-slate-900/5 transition-all duration-300 overflow-hidden ${
            isExpanded
              ? 'border-emerald-500/50 shadow-emerald-500/10'
              : 'border-emerald-500/30 shadow-slate-300/40 hover:border-emerald-400 hover:bg-white/95'
          }`}
        >
          {/* Main Collapsed Header Bar (Clickable to toggle expansion) */}
          <div
            id="cubbon-trail-hud-banner"
            onClick={() => setIsExpanded((prev) => !prev)}
            className="flex items-center gap-3 sm:gap-3.5 px-3.5 sm:px-4 py-2.5 cursor-pointer select-none group"
            title={isExpanded ? 'Collapse trail guide' : 'Click to open interactive 8-stop tour guide'}
          >
            {/* Emerald Icon */}
            <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Route className="w-5 h-5 text-emerald-600 animate-pulse" />
            </div>

            {/* Title & Badges */}
            <div className="flex-1 min-w-0 pr-1">
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                <span className="font-display font-semibold text-xs sm:text-sm text-slate-900 tracking-wide group-hover:text-emerald-700 transition-colors">
                  Cubbon Park Heritage Loop
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-mono font-bold border border-emerald-200">
                  1.8 KM
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-teal-50 text-teal-700 font-mono font-medium border border-teal-200 hidden xs:inline">
                  8 STOPS
                </span>
              </div>
              <p className="text-[11px] text-slate-600 truncate mt-0.5">
                State Central Library ➔ Attara Kacheri ➔ Museum ➔ VITM ➔ Bandstand
              </p>
            </div>

            {/* Actions: Expand Arrow & Dismiss Button */}
            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded((prev) => !prev);
                }}
                className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer flex items-center gap-1 text-xs"
                title={isExpanded ? 'Collapse' : 'Expand full itinerary'}
              >
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4 text-emerald-600" />
                ) : (
                  <>
                    <span className="hidden sm:inline text-[11px] font-medium text-emerald-700">
                      Explore Stops
                    </span>
                    <ChevronUp className="w-4 h-4 text-emerald-600 animate-bounce" />
                  </>
                )}
              </button>

              <button
                id="exit-cubbon-trail-btn"
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 border border-slate-200 transition-colors cursor-pointer shrink-0"
                title="Exit Cubbon Trail"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Expanded Interactive Tour Guide Drawer */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="border-t border-slate-200/80 bg-slate-50/90 p-3.5 sm:p-4 space-y-3.5"
              >
                {/* Circuit Stats & Navigation Controls */}
                <div className="flex items-center justify-between gap-2 flex-wrap pb-2 border-b border-slate-200/80">
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                      <Clock className="w-3.5 h-3.5" />
                      ~25 Min Walk
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-500">Pedestrian heritage circuit</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Re-center Map on Trail */}
                    <button
                      type="button"
                      onClick={onRecenterTrail}
                      className="px-2.5 py-1 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-[11px] font-medium text-slate-700 hover:text-slate-900 flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                      title="Center map camera on Cubbon Park"
                    >
                      <Compass className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Re-center Loop</span>
                    </button>

                    {/* Google Maps Directions */}
                    <a
                      href={GOOGLE_MAPS_WALKING_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-medium text-[11px] flex items-center gap-1.5 shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
                      title="Open full pedestrian route in Google Maps navigation"
                    >
                      <Navigation className="w-3 h-3 text-white" />
                      <span>Open in Google Maps</span>
                      <ExternalLink className="w-3 h-3 opacity-70" />
                    </a>
                  </div>
                </div>

                {/* Interactive Stop Grid (Click any stop to inspect on map) */}
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-2 font-medium">
                    Click any landmark below to fly camera & inspect details:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto no-scrollbar pr-1">
                    {CUBBON_TRAIL_STOPS.map((stop) => {
                      const isActive = activeWaypointId === stop.id;
                      return (
                        <button
                          key={stop.id}
                          type="button"
                          onClick={() => onSelectWaypoint(stop)}
                          className={`text-left p-2.5 rounded-xl border transition-all flex items-start gap-2.5 cursor-pointer group/item ${
                            isActive
                              ? 'bg-emerald-50 border-emerald-400 shadow-sm ring-1 ring-emerald-400/40 text-emerald-950'
                              : 'bg-white/80 hover:bg-white border-slate-200/80 hover:border-slate-300 text-slate-800 shadow-xs'
                          }`}
                        >
                          {/* Number Badge with Category Icon */}
                          <div className="w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 text-xs font-mono font-bold text-slate-800 group-hover/item:bg-emerald-100 transition-colors">
                            <span>{stop.iconEmoji}</span>
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1">
                              <span className="font-display font-medium text-xs text-slate-900 truncate group-hover/item:text-emerald-700 transition-colors">
                                {stop.number}. {stop.name}
                              </span>
                              <MapPin className="w-3 h-3 text-slate-400 group-hover/item:text-emerald-600 shrink-0" />
                            </div>
                            <p className="text-[10px] text-slate-500 truncate mt-0.5">
                              {stop.subType}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
