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
    <div className="relative min-h-screen w-full bg-[#f8fafc] text-slate-900 overflow-x-hidden selection:bg-indigo-500/20 selection:text-indigo-900 font-sans">
      {/* 1. TACTILE GRAIN / NOISE OVERLAY */}
      <svg
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none opacity-[0.03] w-full h-full z-0 mix-blend-multiply"
      >
        <filter id="editorialNoise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.75"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#editorialNoise)" />
      </svg>

      {/* 2. VIBRANT LUSH PASTEL MESH BACKDROP (True Glassmorphism Foundation) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Orb 1: Soft Cubbon Emerald */}
        <div className="absolute -top-24 left-[15%] w-[580px] h-[580px] rounded-full bg-emerald-300/40 blur-[100px] animate-pulse" />
        {/* Orb 2: Bengaluru Jacaranda Rose/Lavender */}
        <div className="absolute top-[20%] -right-24 w-[640px] h-[640px] rounded-full bg-fuchsia-300/35 blur-[110px]" />
        {/* Orb 3: Sunlit Amber/Peach */}
        <div className="absolute bottom-10 left-[25%] w-[560px] h-[560px] rounded-full bg-amber-200/50 blur-[90px]" />
        {/* Orb 4: Clear Sky Cyan */}
        <div className="absolute top-[55%] -left-20 w-[540px] h-[540px] rounded-full bg-sky-300/40 blur-[100px]" />
        {/* Subtle geometric dot grid for tactile paper depth */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(15,23,42,0.04)_1px,transparent_1px)] bg-[size:36px_36px]" />
      </div>

      {/* 3. REFINED EDITORIAL TOP BAR */}
      <header className="relative z-30 max-w-7xl mx-auto px-4 sm:px-8 pt-6 pb-4 flex items-center justify-between gap-4 border-b border-slate-200/80">
        {/* Left Publication Stamp */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 via-sky-500 to-teal-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 shrink-0">
            <Compass className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-base sm:text-lg tracking-tight text-slate-900">
                ನಮ್ಮ Cultour
              </span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-indigo-50 text-indigo-700 font-mono border border-indigo-200 font-semibold">
                BLR
              </span>
            </div>
            <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase hidden sm:block">
              Archive & Cartography • Vol. 01
            </span>
          </div>
        </div>

        {/* Center Live Database Pill */}
        <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 backdrop-blur-xl border border-white/90 text-xs font-mono text-slate-700 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-medium">{spotsCount} Curated Cultural Spaces</span>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            id="landing-submit-btn"
            type="button"
            onClick={onOpenAddSpot}
            className="px-3.5 py-1.5 rounded-full bg-white/80 hover:bg-white border border-slate-200/90 text-slate-700 hover:text-slate-950 text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
          >
            <Plus className="w-3.5 h-3.5 text-indigo-600" />
            <span>Submit a Landmark</span>
          </button>

          <button
            id="landing-enter-atlas-btn"
            type="button"
            onClick={() => onEnterMap()}
            className="px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-600 to-teal-500 hover:from-indigo-500 hover:to-teal-400 text-white font-sans font-semibold text-xs transition-all shadow-md shadow-indigo-500/20 flex items-center gap-1.5 cursor-pointer active:scale-95"
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
              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/80 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
                <span className="text-[11px] font-mono tracking-widest text-amber-800 font-semibold uppercase">
                  ನಮ್ಮ ಬೆಂಗಳೂರು • Cartography Issue No. 01
                </span>
              </div>

              {/* Large Editorial Serif Headline (Italics on key words) */}
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-[44px] xl:text-[48px] tracking-tight leading-[1.12] text-slate-900 mb-6">
                A <em>living atlas</em> of Bengaluru’s{' '}
                <span className="text-teal-700 font-normal italic">reading rooms</span>,{' '}
                <span className="text-amber-700 font-normal">museums</span> &{' '}
                <span className="text-indigo-700 font-normal italic">hidden studios</span>.
              </h1>

              {/* Editorial Narrative */}
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal mb-8 max-w-xl">
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
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-teal-500 hover:from-indigo-500 hover:to-teal-400 text-white font-sans font-semibold text-sm transition-all shadow-xl shadow-indigo-500/25 flex items-center gap-2 cursor-pointer active:scale-98 group"
                >
                  <span>Enter the Atlas</span>
                  <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  id="hero-contribute-spot-btn"
                  type="button"
                  onClick={onOpenAddSpot}
                  className="px-5 py-3 rounded-full bg-white/80 hover:bg-white border border-slate-200/90 text-slate-700 hover:text-slate-950 font-sans font-medium text-sm transition-all flex items-center gap-2 cursor-pointer shadow-xs active:scale-98"
                >
                  <Plus className="w-4 h-4 text-indigo-600" />
                  <span>Submit a Landmark</span>
                </button>
              </div>

              {/* Editorial Quick Jump Bar */}
              <div className="p-4 rounded-2xl bg-white/60 backdrop-blur-xl border border-white/90 shadow-[0_8px_30px_-6px_rgba(15,23,42,0.05)] ring-1 ring-slate-900/5 max-w-xl">
                <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold mb-2.5">
                  Direct Archive Jumps:
                </span>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => onEnterMap({ cubbonTrail: true })}
                    className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-300/80 text-emerald-800 text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-95"
                  >
                    <Route className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Cubbon Crescent Loop</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onEnterMap({ category: 'library' })}
                    className="px-3 py-1.5 rounded-xl bg-teal-50 hover:bg-teal-100/80 border border-teal-300/80 text-teal-800 text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-95"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-teal-600" />
                    <span>Basavanagudi Archives</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onEnterMap({ spotId: 'shanthiroad' })}
                    className="px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100/80 border border-indigo-300/80 text-indigo-800 text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-95"
                  >
                    <Palette className="w-3.5 h-3.5 text-indigo-600" />
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
                className="sm:col-span-2 p-5 sm:p-6 rounded-3xl bg-white/60 hover:bg-white/80 backdrop-blur-2xl border border-white/90 shadow-[0_12px_40px_-10px_rgba(0,0,0,0.07)] ring-1 ring-slate-900/5 hover:-translate-y-1 hover:shadow-[0_20px_50px_-12px_rgba(99,102,241,0.15)] transition-all duration-300 cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  {/* Vibrant Colorful Architectural Preview Banner */}
                  <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-red-500/15 via-amber-500/15 to-orange-400/15 border border-red-500/20 mb-4 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-red-600/15 border border-red-600/30 flex items-center justify-center text-red-700 font-bold text-sm shrink-0">
                        🏛️
                      </div>
                      <div>
                        <span className="block text-[11px] font-mono uppercase tracking-wider text-red-800 font-bold">
                          Flagship Archive • Est. 1915
                        </span>
                        <span className="text-xs text-red-950 font-medium">
                          Cubbon Park • 300,000+ Volumes
                        </span>
                      </div>
                    </div>

                    <span className="hidden sm:inline-flex text-[11px] font-mono px-2.5 py-1 rounded-full bg-white/80 text-red-800 border border-red-200 items-center gap-1 group-hover:bg-red-600 group-hover:text-white transition-all shadow-xs">
                      <span>View on Map</span>
                      <ExternalLink className="w-3 h-3" />
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-xl sm:text-2xl text-slate-900 group-hover:text-red-800 transition-colors">
                    State Central Library (Seshadri Iyer Memorial)
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-normal mt-1.5 leading-relaxed">
                    Centennial crimson landmark nestled in Cubbon Park canopy. Houses over 300,000 reference
                    volumes, rare dewan papers, and regional literature archives.
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500 font-mono">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-red-600" />
                    <span className="text-slate-700 font-medium">12.9754° N, 77.5929° E</span>
                  </div>
                  <span className="text-slate-600">Cubbon Park Metro (400m)</span>
                </div>
              </div>

              {/* BENTO CARD 2: Tall Pedestrian Walking Circuit */}
              <div
                onClick={() => onEnterMap({ cubbonTrail: true })}
                className="p-5 rounded-3xl bg-white/60 hover:bg-white/80 backdrop-blur-2xl border border-white/90 shadow-[0_12px_40px_-10px_rgba(0,0,0,0.07)] ring-1 ring-slate-900/5 hover:-translate-y-1 hover:shadow-[0_20px_50px_-12px_rgba(5,150,105,0.18)] transition-all duration-300 cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  {/* Vibrant Emerald Circuit Preview Banner */}
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-emerald-500/20 via-teal-500/15 to-emerald-400/20 border border-emerald-500/30 mb-3.5 flex items-center justify-between">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold uppercase">
                      1.8 KM Circuit
                    </span>
                    <Route className="w-4 h-4 text-emerald-600 group-hover:rotate-45 transition-transform" />
                  </div>

                  <h3 className="font-serif font-bold text-lg text-slate-900 group-hover:text-emerald-800 transition-colors">
                    The Cubbon Cultural Trail
                  </h3>
                  <p className="text-xs text-slate-600 font-normal mt-1 leading-relaxed">
                    A 25-minute walking loop connecting Bangalore’s iconic neoclassical colonnades.
                  </p>

                  {/* Visual Mini-Timeline */}
                  <div className="mt-4 space-y-2 border-l-2 border-emerald-400 pl-3 ml-1 text-[11px] text-slate-700 font-mono">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                      <span className="font-medium">State Central Library</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                      <span>Attara Kacheri (High Court)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                      <span>Government Museum (1877)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                      <span className="font-medium">Venkatappa Art Gallery</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs text-emerald-700 font-semibold">
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
                  className="p-5 rounded-3xl bg-white/60 hover:bg-white/80 backdrop-blur-2xl border border-white/90 shadow-[0_12px_40px_-10px_rgba(0,0,0,0.07)] ring-1 ring-slate-900/5 hover:-translate-y-1 hover:shadow-[0_20px_50px_-12px_rgba(99,102,241,0.18)] transition-all duration-300 cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    {/* Vibrant Jacaranda Violet Preview Banner */}
                    <div className="p-2.5 rounded-2xl bg-gradient-to-r from-fuchsia-500/15 via-indigo-500/20 to-rose-400/15 border border-indigo-500/20 mb-3 flex items-center justify-between">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 border border-indigo-200 font-bold uppercase">
                        14 Independent Spaces
                      </span>
                      <Palette className="w-4 h-4 text-indigo-600" />
                    </div>

                    <h3 className="font-serif font-bold text-base sm:text-lg text-slate-900 group-hover:text-indigo-800 transition-colors">
                      1 Shanthiroad & Hidden Studios
                    </h3>
                    <p className="text-xs text-slate-600 font-normal mt-1 leading-relaxed">
                      Courtyard residencies, printmaking archives, and artist-run rooms across Shanthi Nagar and Malleshwaram.
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-200/60 text-[11px] font-mono text-slate-500 flex items-center justify-between">
                    <span className="text-slate-700 font-medium">1Shanthiroad • MAP • Kynkyny</span>
                    <span className="text-indigo-600 font-semibold group-hover:translate-x-0.5 transition-transform">Explore ↗</span>
                  </div>
                </div>

                {/* BENTO CARD 4: Science Lore & Specialized Museums */}
                <div
                  onClick={() => onEnterMap({ category: 'museum' })}
                  className="p-5 rounded-3xl bg-white/60 hover:bg-white/80 backdrop-blur-2xl border border-white/90 shadow-[0_12px_40px_-10px_rgba(0,0,0,0.07)] ring-1 ring-slate-900/5 hover:-translate-y-1 hover:shadow-[0_20px_50px_-12px_rgba(217,119,6,0.18)] transition-all duration-300 cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    {/* Vibrant Amber Preview Banner */}
                    <div className="p-2.5 rounded-2xl bg-gradient-to-r from-amber-500/20 via-yellow-400/15 to-orange-400/15 border border-amber-500/20 mb-3 flex items-center justify-between">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200 font-bold uppercase">
                        11 Specialized Museums
                      </span>
                      <Landmark className="w-4 h-4 text-amber-600" />
                    </div>

                    <h3 className="font-serif font-bold text-base sm:text-lg text-slate-900 group-hover:text-amber-800 transition-colors">
                      NIMHANS Brain Museum & Science Lore
                    </h3>
                    <p className="text-xs text-slate-600 font-normal mt-1 leading-relaxed">
                      Actual neuroanatomy specimens, HAL aerospace fighters, and ancient Halmidi inscriptions.
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-200/60 text-[11px] font-mono text-slate-500 flex items-center justify-between">
                    <span className="text-slate-700 font-medium">NIMHANS • HAL • VITM</span>
                    <span className="text-amber-700 font-semibold group-hover:translate-x-0.5 transition-transform">Explore ↗</span>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        </div>

        {/* ========================================================= */}
        {/* 5. INTERACTIVE NEIGHBOURHOOD QUARTERS STRIP AT BOTTOM */}
        {/* ========================================================= */}
        <section className="mt-14 pt-8 border-t border-slate-200/80">
          <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
            <span className="text-xs font-mono uppercase tracking-widest text-slate-500 font-bold">
              Select Cultural Quarter to Jump on Map:
            </span>
            <span className="text-xs text-slate-500 font-mono hidden sm:inline">
              Click to view quarter landmarks
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
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
                className="p-3.5 rounded-2xl bg-white/60 hover:bg-white/95 backdrop-blur-xl border border-white/90 hover:border-indigo-300 shadow-[0_8px_20px_-6px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_28px_-6px_rgba(99,102,241,0.15)] ring-1 ring-slate-900/5 transition-all text-left cursor-pointer group flex flex-col justify-between active:scale-95"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg">{quarter.icon}</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 group-hover:bg-indigo-50 group-hover:text-indigo-700 transition-colors font-medium">
                    {quarter.count}
                  </span>
                </div>
                <div>
                  <span className="block font-serif font-bold text-xs sm:text-sm text-slate-800 group-hover:text-indigo-900 transition-colors">
                    {quarter.name}
                  </span>
                  <span className="text-[10px] text-slate-500 group-hover:text-indigo-600 font-medium">
                    Open quarter →
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>
      </main>

      {/* 6. REFINED EDITORIAL FOOTER */}
      <footer className="relative z-10 py-8 px-4 sm:px-8 border-t border-slate-200/80 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto gap-3">
        <div className="flex items-center gap-2">
          <span className="font-serif font-bold text-slate-800">ನಮ್ಮ Cultour BLR</span>
          <span>•</span>
          <span>Open Bengaluru Heritage Cartography</span>
        </div>

        <div className="flex items-center gap-4 text-slate-500">
          <button
            type="button"
            onClick={() => onEnterMap()}
            className="hover:text-slate-900 transition-colors cursor-pointer"
          >
            Map View
          </button>
          <button
            type="button"
            onClick={() => onEnterMap({ cubbonTrail: true })}
            className="hover:text-emerald-700 transition-colors cursor-pointer font-medium"
          >
            Cubbon Trail
          </button>
          <button
            type="button"
            onClick={onOpenAddSpot}
            className="hover:text-slate-900 transition-colors cursor-pointer"
          >
            Submit Landmark
          </button>
        </div>
      </footer>
    </div>
  );
};
