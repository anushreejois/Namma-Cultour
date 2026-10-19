import React from 'react';
import { motion } from 'framer-motion';
import {
  Compass,
  Plus,
  Route,
  ArrowRight,
  ExternalLink,
  MapPin,
  Clock,
  BookOpen,
  Palette,
  Landmark,
  Sparkles,
} from 'lucide-react';
import type { FilterCategory } from '../types/spot';

export interface MapNavigationTarget {
  spotId?: string;
  category?: FilterCategory;
  cubbonTrail?: boolean;
  neighborhood?: string;
}

interface LandingPageProps {
  onEnterMap: (target?: MapNavigationTarget) => void;
  onOpenAddSpot: () => void;
  spotsCount?: number;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onEnterMap,
  onOpenAddSpot,
  spotsCount = 36,
}) => {
  return (
    <div className="relative min-h-screen w-full bg-[#0c0a09] text-[#f5f5f4] overflow-x-hidden selection:bg-[#d97706]/30 selection:text-[#fef3c7] font-sans">
      {/* 1. TACTILE GRAIN / NOISE OVERLAY */}
      <svg
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none opacity-[0.035] w-full h-full z-0 mix-blend-overlay"
      >
        <filter id="editorialNoise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#editorialNoise)" />
      </svg>

      {/* 2. WARM CULTURAL AMBIENT GLOWS (Terracotta, Parchment, Cubbon Sage) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-32 right-0 w-[580px] h-[580px] rounded-full bg-[#ea580c]/8 blur-[150px]" />
        <div className="absolute top-1/3 -left-32 w-[620px] h-[620px] rounded-full bg-[#059669]/7 blur-[160px]" />
        <div className="absolute bottom-10 right-1/4 w-[480px] h-[480px] rounded-full bg-[#d97706]/6 blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:36px_36px]" />
      </div>

      {/* 3. REFINED EDITORIAL TOP BAR */}
      <header className="relative z-30 max-w-7xl mx-auto px-4 sm:px-8 pt-6 pb-4 flex items-center justify-between gap-4 border-b border-stone-800/80">
        {/* Left Publication Stamp */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-stone-900 border border-stone-700/80 flex items-center justify-center text-amber-500 shadow-sm shrink-0">
            <Compass className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-base sm:text-lg tracking-tight text-stone-100">
                ನಮ್ಮ Cultour
              </span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-stone-800 text-stone-300 font-mono border border-stone-700">
                BLR
              </span>
            </div>
            <span className="text-[10px] font-mono tracking-widest text-stone-400 uppercase hidden sm:block">
              Archive & Cartography • Vol. 01
            </span>
          </div>
        </div>

        {/* Center Live Database Pill */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-stone-900/90 border border-stone-800 text-xs font-mono text-stone-300">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>{spotsCount} Curated Cultural Spaces</span>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            id="open-theme-studio-btn"
            href="/themes/index.html"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 sm:px-3.5 py-1.5 rounded-full bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 text-xs font-mono font-medium transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
            title="Preview 5 clean HTML themes"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden xs:inline">Theme Studio</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-200">5 Themes</span>
          </a>

          <button
            id="landing-submit-btn"
            type="button"
            onClick={onOpenAddSpot}
            className="hidden sm:flex px-3.5 py-1.5 rounded-full bg-stone-900/90 hover:bg-stone-800 border border-stone-700/80 text-stone-300 hover:text-white text-xs font-medium transition-all items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <Plus className="w-3.5 h-3.5 text-amber-500" />
            <span>Submit a Landmark</span>
          </button>

          <button
            id="landing-enter-atlas-btn"
            type="button"
            onClick={() => onEnterMap()}
            className="px-4 py-1.5 rounded-full bg-[#f5f5f4] hover:bg-white text-stone-950 font-sans font-semibold text-xs transition-all shadow-md flex items-center gap-1.5 cursor-pointer active:scale-95"
          >
            <span>Enter Atlas</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* 4. ASYMMETRIC 2-COLUMN EDITORIAL HERO & BENTO GRID */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 pt-8 sm:pt-14 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* ========================================================= */}
          {/* LEFT SIDE (5 COLS): Editorial Monograph & Narrative Lead */}
          {/* ========================================================= */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col justify-between"
          >
            <div>
              {/* Monospace Issue Stamp */}
              <div className="inline-flex items-center gap-2 mb-5">
                <span className="w-2 h-2 rounded-full bg-amber-600" />
                <span className="text-[11px] font-mono tracking-widest text-amber-500/90 uppercase">
                  ನಮ್ಮ ಬೆಂಗಳೂರು • Cartography Issue No. 01
                </span>
              </div>

              {/* Large Editorial Serif Headline (Italics on key words) */}
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-[44px] xl:text-[48px] tracking-tight leading-[1.12] text-stone-100 mb-6">
                A <em>living atlas</em> of Bengaluru’s{' '}
                <span className="text-stone-300 font-normal italic">reading rooms</span>,{' '}
                <span className="text-amber-200/90 font-normal">museums</span> &{' '}
                <span className="text-orange-200/90 font-normal italic">hidden studios</span>.
              </h1>

              {/* Editorial Narrative */}
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed font-light mb-8 max-w-xl">
                From the red-pompeian brick colonnades of Seshadri Iyer Memorial to quiet courtyard
                residencies in Shanthi Nagar, Namma Cultour is an independent, non-commercial
                cartography of 35+ spaces keeping Bengaluru’s artistic soul and literary memory alive.
              </p>

              {/* Tactile Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 mb-10">
                <button
                  id="hero-explore-map-btn"
                  type="button"
                  onClick={() => onEnterMap()}
                  className="px-6 py-3 rounded-full bg-[#f5f5f4] hover:bg-white text-stone-950 font-sans font-semibold text-sm transition-all shadow-xl shadow-stone-950/60 flex items-center gap-2 cursor-pointer active:scale-98 group"
                >
                  <span>Enter the Atlas</span>
                  <ArrowRight className="w-4 h-4 text-stone-950 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  id="hero-contribute-spot-btn"
                  type="button"
                  onClick={onOpenAddSpot}
                  className="px-5 py-3 rounded-full bg-stone-900/90 hover:bg-stone-800 border border-stone-700/80 text-stone-200 hover:text-white font-sans font-medium text-sm transition-all flex items-center gap-2 cursor-pointer active:scale-98"
                >
                  <Plus className="w-4 h-4 text-amber-500" />
                  <span>Submit a Landmark</span>
                </button>
              </div>

              {/* Editorial Quick Jump Bar */}
              <div className="p-4 rounded-2xl bg-stone-900/60 border border-stone-800/90 backdrop-blur-md max-w-xl">
                <span className="block text-[10px] font-mono uppercase tracking-wider text-stone-400 mb-2.5">
                  Direct Archive Jumps:
                </span>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => onEnterMap({ cubbonTrail: true })}
                    className="px-3 py-1.5 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/40 text-emerald-300 text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Route className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Cubbon Crescent Loop</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onEnterMap({ category: 'library' })}
                    className="px-3 py-1.5 rounded-xl bg-sky-950/40 hover:bg-sky-900/50 border border-sky-500/40 text-sky-300 text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-sky-400" />
                    <span>Basavanagudi Archives</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onEnterMap({ spotId: 'shanthiroad' })}
                    className="px-3 py-1.5 rounded-xl bg-orange-950/40 hover:bg-orange-900/50 border border-orange-500/40 text-orange-300 text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Palette className="w-3.5 h-3.5 text-orange-400" />
                    <span>Shanthi Nagar Studios</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ========================================================= */}
          {/* RIGHT SIDE (7 COLS): Asymmetric Glassmorphic Bento Grid */}
          {/* ========================================================= */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-7"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* BENTO CARD 1: Large Featured Landmark (Span 2 cols) */}
              <div
                onClick={() => onEnterMap({ spotId: 'scl' })}
                className="sm:col-span-2 p-5 sm:p-6 rounded-3xl bg-stone-900/75 hover:bg-stone-900/95 backdrop-blur-xl border border-stone-800 hover:border-amber-600/50 shadow-xl transition-all duration-300 cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-950/70 text-red-300 border border-red-800/60 uppercase font-medium">
                      Flagship Archive • Est. 1915
                    </span>
                    <span className="text-[11px] font-mono text-stone-400 flex items-center gap-1 group-hover:text-amber-400 transition-colors">
                      <span>View on Map</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-xl sm:text-2xl text-stone-100 group-hover:text-amber-200 transition-colors">
                    State Central Library (Seshadri Iyer Memorial)
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-300 font-light mt-1.5 leading-relaxed">
                    Centennial crimson landmark nestled in Cubbon Park canopy. Houses over 300,000 reference
                    volumes, rare dewan papers, and regional literature archives.
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-stone-800/80 flex items-center justify-between text-xs text-stone-400 font-mono">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-red-400" />
                    <span>12.9754° N, 77.5929° E</span>
                  </div>
                  <span className="text-stone-300">Cubbon Park Metro (400m)</span>
                </div>
              </div>

              {/* BENTO CARD 2: Tall Pedestrian Walking Circuit */}
              <div
                onClick={() => onEnterMap({ cubbonTrail: true })}
                className="p-5 rounded-3xl bg-emerald-950/20 hover:bg-emerald-950/35 backdrop-blur-xl border border-emerald-800/40 hover:border-emerald-500/60 shadow-xl transition-all duration-300 cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-900/60 text-emerald-300 border border-emerald-700/50 uppercase font-medium">
                      1.8 KM Circuit
                    </span>
                    <Route className="w-4 h-4 text-emerald-400 group-hover:rotate-45 transition-transform" />
                  </div>

                  <h3 className="font-serif font-bold text-lg text-stone-100 group-hover:text-emerald-200 transition-colors mt-1">
                    The Cubbon Cultural Trail
                  </h3>
                  <p className="text-xs text-stone-300 font-light mt-1 leading-relaxed">
                    A 25-minute walking loop connecting Bangalore’s iconic neoclassical colonnades.
                  </p>

                  {/* Visual Mini-Timeline */}
                  <div className="mt-4 space-y-2 border-l border-emerald-500/30 pl-3 ml-1 text-[11px] text-stone-300 font-mono">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>State Central Library</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/70" />
                      <span>Attara Kacheri (High Court)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/70" />
                      <span>Government Museum (1877)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>Venkatappa Art Gallery</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-emerald-900/40 flex items-center justify-between text-xs text-emerald-300 font-medium">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>~25 Min Walk</span>
                  </span>
                  <span className="group-hover:translate-x-1 transition-transform">Start Walk →</span>
                </div>
              </div>

              {/* BENTO CARD 3 & 4 (Stacked in right column): Studios & Science */}
              <div className="flex flex-col gap-4">
                
                {/* BENTO CARD 3: Hidden Studios */}
                <div
                  onClick={() => onEnterMap({ category: 'gallery' })}
                  className="p-5 rounded-3xl bg-stone-900/75 hover:bg-stone-900/95 backdrop-blur-xl border border-stone-800 hover:border-orange-500/50 shadow-xl transition-all duration-300 cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-orange-950/70 text-orange-300 border border-orange-800/60 uppercase font-medium">
                        14 Independent Spaces
                      </span>
                      <Palette className="w-4 h-4 text-orange-400" />
                    </div>

                    <h3 className="font-serif font-bold text-base sm:text-lg text-stone-100 group-hover:text-orange-200 transition-colors">
                      1 Shanthiroad & Hidden Studios
                    </h3>
                    <p className="text-xs text-stone-300 font-light mt-1 leading-relaxed">
                      Courtyard residencies, printmaking archives, and artist-run rooms across Shanthi Nagar and Malleshwaram.
                    </p>
                  </div>

                  <div className="mt-3 pt-2 text-[11px] font-mono text-stone-400 flex items-center justify-between">
                    <span>1Shanthiroad • MAP • Kynkyny</span>
                    <span className="text-orange-400 group-hover:translate-x-0.5 transition-transform">Explore ↗</span>
                  </div>
                </div>

                {/* BENTO CARD 4: Science Lore & Specialized Museums */}
                <div
                  onClick={() => onEnterMap({ category: 'museum' })}
                  className="p-5 rounded-3xl bg-stone-900/75 hover:bg-stone-900/95 backdrop-blur-xl border border-stone-800 hover:border-amber-500/50 shadow-xl transition-all duration-300 cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950/70 text-amber-300 border border-amber-800/60 uppercase font-medium">
                        11 Specialized Museums
                      </span>
                      <Landmark className="w-4 h-4 text-amber-400" />
                    </div>

                    <h3 className="font-serif font-bold text-base sm:text-lg text-stone-100 group-hover:text-amber-200 transition-colors">
                      NIMHANS Brain Museum & Science Lore
                    </h3>
                    <p className="text-xs text-stone-300 font-light mt-1 leading-relaxed">
                      Actual neuroanatomy specimens, HAL aerospace fighters, and ancient Halmidi inscriptions.
                    </p>
                  </div>

                  <div className="mt-3 pt-2 text-[11px] font-mono text-stone-400 flex items-center justify-between">
                    <span>NIMHANS • HAL • VITM</span>
                    <span className="text-amber-400 group-hover:translate-x-0.5 transition-transform">Explore ↗</span>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        </div>

        {/* ========================================================= */}
        {/* 5. INTERACTIVE NEIGHBOURHOOD QUARTERS STRIP AT BOTTOM */}
        {/* ========================================================= */}
        <section className="mt-14 pt-8 border-t border-stone-800/90">
          <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
            <span className="text-xs font-mono uppercase tracking-widest text-stone-400">
              Select Cultural Quarter to Jump on Map:
            </span>
            <span className="text-xs text-stone-400 font-mono hidden sm:inline">
              Click to view quarter landmarks
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {[
              {
                id: 'cubbon',
                name: 'Cubbon Park',
                icon: '🌳',
                count: '8 Spots',
                action: () => onEnterMap({ cubbonTrail: true }),
              },
              {
                id: 'basavanagudi',
                name: 'Basavanagudi',
                icon: '☕',
                count: '4 Spots',
                action: () => onEnterMap({ neighborhood: 'Basavanagudi' }),
              },
              {
                id: 'malleshwaram',
                name: 'Malleshwaram',
                icon: '🌸',
                count: '5 Spots',
                action: () => onEnterMap({ neighborhood: 'Malleshwaram' }),
              },
              {
                id: 'shanthi-nagar',
                name: 'Shanthi Nagar',
                icon: '🎨',
                count: '4 Spots',
                action: () => onEnterMap({ neighborhood: 'Shanthi Nagar' }),
              },
              {
                id: 'indiranagar',
                name: 'Indiranagar',
                icon: '🌿',
                count: '4 Spots',
                action: () => onEnterMap({ neighborhood: 'Indiranagar' }),
              },
              {
                id: 'vasanth-nagar',
                name: 'Palace Road',
                icon: '🏛️',
                count: '5 Spots',
                action: () => onEnterMap({ neighborhood: 'Vasanth Nagar' }),
              },
            ].map((quarter) => (
              <button
                key={quarter.id}
                type="button"
                onClick={quarter.action}
                className="p-3 rounded-2xl bg-stone-900/60 hover:bg-stone-800/90 border border-stone-800 hover:border-stone-600 transition-all text-left cursor-pointer group flex flex-col justify-between active:scale-95 shadow-sm"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-base">{quarter.icon}</span>
                  <span className="text-[10px] font-mono text-stone-400 group-hover:text-amber-400 transition-colors">
                    {quarter.count}
                  </span>
                </div>
                <div>
                  <span className="block font-serif font-medium text-xs sm:text-sm text-stone-200 group-hover:text-white transition-colors">
                    {quarter.name}
                  </span>
                  <span className="text-[10px] text-stone-400 group-hover:text-stone-300">
                    Open quarter →
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>
      </main>

      {/* 6. REFINED EDITORIAL FOOTER */}
      <footer className="relative z-10 py-8 px-4 sm:px-8 border-t border-stone-800/80 text-xs text-stone-400 flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto gap-3">
        <div className="flex items-center gap-2">
          <span className="font-serif font-bold text-stone-300">ನಮ್ಮ Cultour BLR</span>
          <span>•</span>
          <span>Open Bengaluru Heritage Cartography</span>
        </div>

        <div className="flex items-center gap-4 text-stone-400">
          <button
            type="button"
            onClick={() => onEnterMap()}
            className="hover:text-stone-200 transition-colors cursor-pointer"
          >
            Map View
          </button>
          <button
            type="button"
            onClick={() => onEnterMap({ cubbonTrail: true })}
            className="hover:text-emerald-300 transition-colors cursor-pointer"
          >
            Cubbon Trail
          </button>
          <button
            type="button"
            onClick={onOpenAddSpot}
            className="hover:text-stone-200 transition-colors cursor-pointer"
          >
            Submit Landmark
          </button>
        </div>
      </footer>
    </div>
  );
};
