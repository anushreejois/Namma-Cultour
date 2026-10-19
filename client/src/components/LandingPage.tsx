import React from 'react';
import { motion } from 'framer-motion';
import {
  Compass,
  Plus,
  Route,
  ArrowRight,
  Palette,
  Landmark,
  Sparkles,
  Footprints,
  ChevronRight,
} from 'lucide-react';
import type { CulturalSpot } from '../types/spot';

interface LandingPageProps {
  onEnterMap: () => void;
  onOpenAddSpot: () => void;
  onStartCubbonTrail: () => void;
  spotsCount?: number;
  featuredSpots?: CulturalSpot[];
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onEnterMap,
  onOpenAddSpot,
  onStartCubbonTrail,
  spotsCount = 36,
}) => {
  return (
    <div className="relative min-h-screen w-full bg-[#020617] text-slate-100 overflow-x-hidden selection:bg-cyan-500 selection:text-slate-950 font-sans">
      {/* 1. AMBIENT GLOW BACKDROP */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-96 sm:w-[540px] h-96 sm:h-[540px] rounded-full bg-cyan-600/15 blur-[120px]" />
        <div className="absolute top-1/4 -right-40 w-96 sm:w-[600px] h-96 sm:h-[600px] rounded-full bg-indigo-600/15 blur-[140px]" />
        <div className="absolute bottom-10 left-1/3 w-80 sm:w-[500px] h-80 sm:h-[500px] rounded-full bg-emerald-600/10 blur-[130px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      {/* 2. FLOATING TOP HEADER */}
      <header className="fixed top-4 inset-x-4 sm:inset-x-8 max-w-7xl mx-auto z-40 flex items-center justify-between gap-3 bg-slate-900/85 backdrop-blur-2xl border border-white/10 shadow-2xl px-4 sm:px-6 py-3 rounded-2xl pointer-events-auto">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-sky-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/25 shrink-0">
            <Compass className="w-4 h-4 sm:w-5 sm:h-5 text-slate-950" />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-base sm:text-lg tracking-tight text-white whitespace-nowrap">
              ನಮ್ಮ Cultour
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 font-mono border border-cyan-500/30 font-semibold hidden xs:inline">
              BLR
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{spotsCount} Cultural Spots</span>
          </div>

          <button
            id="landing-header-add-spot-btn"
            type="button"
            onClick={onOpenAddSpot}
            className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Add Spot</span>
          </button>

          <button
            id="landing-header-launch-map-btn"
            type="button"
            onClick={onEnterMap}
            className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-slate-950 font-display font-semibold text-xs transition-all shadow-md shadow-cyan-500/25 flex items-center gap-1.5 cursor-pointer active:scale-95"
          >
            <span>Launch Map</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* 3. HERO SECTION */}
      <section className="relative z-10 pt-36 sm:pt-44 pb-20 px-4 sm:px-6 md:px-8 max-w-6xl mx-auto flex flex-col items-center text-center">
        {/* Cultural Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-medium mb-6 shadow-inner"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>BENGALURU CULTURAL & HERITAGE ATLAS</span>
          <span className="text-white/30">•</span>
          <span className="text-emerald-400 font-semibold">Live Edition</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display font-bold text-4xl sm:text-6xl md:text-7xl tracking-tight leading-[1.1] max-w-4xl text-white mb-6"
        >
          Discover Bengaluru’s Hidden{' '}
          <span className="bg-gradient-to-r from-cyan-300 via-sky-200 to-amber-300 bg-clip-text text-transparent">
            Lore & Literature
          </span>
        </motion.h1>

        {/* Sub-tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-xl text-slate-300 max-w-2xl font-light leading-relaxed mb-10"
        >
          Explore 35+ curated museums, historic reading rooms, and hidden art studios across the city with interactive walking trails.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto"
        >
          <button
            id="hero-explore-map-btn"
            type="button"
            onClick={onEnterMap}
            className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 hover:from-cyan-400 hover:via-sky-400 hover:to-indigo-500 text-slate-950 font-display font-bold text-sm sm:text-base transition-all shadow-xl shadow-cyan-500/25 flex items-center justify-center gap-2.5 cursor-pointer active:scale-98 group"
          >
            <Compass className="w-5 h-5 text-slate-950 group-hover:rotate-45 transition-transform" />
            <span>Explore Interactive Map</span>
            <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            id="hero-cubbon-trail-btn"
            type="button"
            onClick={onStartCubbonTrail}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-400/50 text-emerald-300 font-display font-semibold text-sm sm:text-base transition-all shadow-lg shadow-emerald-950/40 flex items-center justify-center gap-2 cursor-pointer active:scale-98"
          >
            <Route className="w-4 h-4 text-emerald-400" />
            <span>Cubbon Heritage Trail (1.8 KM)</span>
          </button>

          <button
            id="hero-contribute-spot-btn"
            type="button"
            onClick={onOpenAddSpot}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 text-slate-200 hover:text-white font-display font-semibold text-sm sm:text-base transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
          >
            <Plus className="w-4 h-4 text-cyan-400" />
            <span>+ Contribute Spot</span>
          </button>
        </motion.div>

        {/* Quick Stats Pill Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-14 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 w-full max-w-4xl"
        >
          <div className="p-3 rounded-xl bg-slate-900/60 border border-white/8 backdrop-blur-md">
            <span className="block font-display font-bold text-2xl sm:text-3xl text-amber-400">11+</span>
            <span className="text-xs text-slate-400 font-medium">Historic Museums</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-white/8 backdrop-blur-md">
            <span className="block font-display font-bold text-2xl sm:text-3xl text-orange-400">14+</span>
            <span className="text-xs text-slate-400 font-medium">Art Studios & Houses</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-white/8 backdrop-blur-md">
            <span className="block font-display font-bold text-2xl sm:text-3xl text-sky-400">11+</span>
            <span className="text-xs text-slate-400 font-medium">Public Archives</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-white/8 backdrop-blur-md">
            <span className="block font-display font-bold text-2xl sm:text-3xl text-emerald-400">1.8 KM</span>
            <span className="text-xs text-slate-400 font-medium">Walking Trail</span>
          </div>
        </motion.div>
      </section>

      {/* 4. FEATURE HIGHLIGHT GRID (3 GLASS CARDS) */}
      <section className="relative z-10 py-16 px-4 sm:px-6 md:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2">Curated Exploration</p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight">
            Three Pillars of Namma Cultour
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Curated Archives & Museums */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ duration: 0.2 }}
            className="p-6 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-amber-500/30 hover:border-amber-400 shadow-xl shadow-amber-950/20 flex flex-col justify-between group"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform">
                <Landmark className="w-6 h-6 text-amber-400" />
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 uppercase font-semibold">
                Museums & History
              </span>
              <h3 className="font-display font-bold text-xl text-white mt-3 mb-2">
                Curated Archives & Museums
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-light">
                From the 1915 crimson State Central Library to HAL Aerospace, explore deep collections of science, numismatics, and regional antiquities.
              </p>
              <div className="mt-4 pt-4 border-t border-white/8 space-y-1.5 text-xs text-slate-400">
                <p>• Government Museum (1877)</p>
                <p>• NIMHANS Rare Brain Museum</p>
                <p>• Visvesvaraya Tech Pavilions</p>
              </div>
            </div>

            <button
              onClick={onEnterMap}
              className="mt-6 w-full py-2.5 rounded-xl bg-white/5 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <span>Explore Museums</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>

          {/* Card 2: Hidden Art Studios */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ duration: 0.2 }}
            className="p-6 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-orange-500/30 hover:border-orange-400 shadow-xl shadow-orange-950/20 flex flex-col justify-between group"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform">
                <Palette className="w-6 h-6 text-orange-400" />
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-orange-500/15 text-orange-300 border border-orange-500/30 uppercase font-semibold">
                Art & Studios
              </span>
              <h3 className="font-display font-bold text-xl text-white mt-3 mb-2">
                Hidden Art Studios & Residencies
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-light">
                Venture into hidden courtyard galleries, modernist studio retreats, and colonial mansions preserving South Indian contemporary arts.
              </p>
              <div className="mt-4 pt-4 border-t border-white/8 space-y-1.5 text-xs text-slate-400">
                <p>• 1Shanthiroad Studio Gallery</p>
                <p>• Venkatappa Art Gallery</p>
                <p>• Museum of Art & Photography (MAP)</p>
              </div>
            </div>

            <button
              onClick={onEnterMap}
              className="mt-6 w-full py-2.5 rounded-xl bg-white/5 hover:bg-orange-500/20 text-orange-300 border border-orange-500/30 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <span>Explore Art Houses</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>

          {/* Card 3: Interactive Trails */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ duration: 0.2 }}
            className="p-6 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-emerald-500/30 hover:border-emerald-400 shadow-xl shadow-emerald-950/20 flex flex-col justify-between group"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform">
                <Route className="w-6 h-6 text-emerald-400" />
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase font-semibold">
                Pedestrian Tours
              </span>
              <h3 className="font-display font-bold text-xl text-white mt-3 mb-2">
                Interactive Walking Trails
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-light">
                Step outside and walk through curated pedestrian circuits linking botanical promenades, neoclassical courts, and historic bandstands.
              </p>
              <div className="mt-4 pt-4 border-t border-white/8 space-y-1.5 text-xs text-slate-400">
                <p>• Cubbon Heritage Circuit (1.8 KM)</p>
                <p>• Turn-by-Turn Google Walking Route</p>
                <p>• 8 Curated Architectural Stops</p>
              </div>
            </div>

            <button
              onClick={onStartCubbonTrail}
              className="mt-6 w-full py-2.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-200 border border-emerald-400/40 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <span>Launch Cubbon Trail</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* 5. CULTURAL SPOTLIGHT TICKER */}
      <section className="relative z-10 py-12 px-4 sm:px-6 md:px-8 max-w-6xl mx-auto border-t border-white/10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
              Curator’s Pick: Cubbon Cultural Loop
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              A 25-minute walking loop through Bangalore's green sanctum
            </p>
          </div>

          <button
            onClick={onStartCubbonTrail}
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-emerald-300 hover:text-emerald-200 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Footprints className="w-4 h-4 text-emerald-400" />
            <span>View Full Itinerary</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/8 backdrop-blur-md">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-base">📚</span>
              <span className="font-display font-semibold text-sm text-white">State Central Library</span>
            </div>
            <p className="text-xs text-slate-400">1915 crimson heritage building housing over 300,000 reference volumes.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/8 backdrop-blur-md">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-base">🏛️</span>
              <span className="font-display font-semibold text-sm text-white">Attara Kacheri (High Court)</span>
            </div>
            <p className="text-xs text-slate-400">Neoclassical two-storied red brick masterpiece facing Vidhana Soudha.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/8 backdrop-blur-md">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-base">🎨</span>
              <span className="font-display font-semibold text-sm text-white">Venkatappa Art Gallery</span>
            </div>
            <p className="text-xs text-slate-400">Celebrated modernist gallery preserving K. Venkatappa watercolors and sculptures.</p>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION FOOTER BANNER */}
      <section className="relative z-10 py-16 px-4 sm:px-6 md:px-8 max-w-6xl mx-auto">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-tr from-slate-900 via-slate-900/90 to-cyan-950/40 border border-cyan-500/30 text-center relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="font-display font-bold text-2xl sm:text-4xl text-white mb-4">
              Ready to explore Bengaluru's cultural map?
            </h2>
            <p className="text-sm sm:text-base text-slate-300 font-light mb-8">
              Open the full-bleed vector map to find operating hours, nearest Namma Metro stations, and curated entry details for every spot.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={onEnterMap}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-slate-950 font-display font-bold text-sm shadow-xl shadow-cyan-500/25 transition-all cursor-pointer active:scale-98"
              >
                Launch Interactive Map Now
              </button>
              <button
                onClick={onOpenAddSpot}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/15 text-sm font-medium transition-all cursor-pointer"
              >
                Submit a Cultural Landmark
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="relative z-10 py-8 px-4 border-t border-white/8 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between max-w-6xl mx-auto gap-3">
        <div className="flex items-center gap-2">
          <span className="font-display font-semibold text-slate-400">ನಮ್ಮ Cultour BLR</span>
          <span>•</span>
          <span>Bengaluru Cultural & Heritage Explorer</span>
        </div>

        <div className="flex items-center gap-4 text-slate-400">
          <button onClick={onEnterMap} className="hover:text-cyan-400 transition-colors cursor-pointer">Map View</button>
          <button onClick={onStartCubbonTrail} className="hover:text-emerald-400 transition-colors cursor-pointer">Cubbon Trail</button>
          <button onClick={onOpenAddSpot} className="hover:text-white transition-colors cursor-pointer">Add Spot</button>
        </div>
      </footer>
    </div>
  );
};
