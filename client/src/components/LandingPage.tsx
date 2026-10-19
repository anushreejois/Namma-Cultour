import React from 'react';
import { motion } from 'framer-motion';
import {
  Compass,
  Plus,
  Route,
  ArrowRight,
  ArrowUpRight,
  MapPin,
  Clock,
  BookOpen,
  Palette,
  Landmark,
  Trees,
  Coffee,
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
    <div className="relative min-h-screen w-full bg-[#F6F5F2] text-[#1C1917] overflow-x-hidden selection:bg-stone-300 selection:text-stone-900 font-sans">
      {/* 1. TACTILE ARCHITECTURAL DOT GRID PATTERN */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(#d6d3d1_1px,transparent_1px)] [background-size:24px_24px] opacity-70" />

      {/* 2. REFINED ARCHITECTURAL AMBIENT LIGHT (Warm Sand & Muted Cubbon Sage) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Soft Warm Sand Ambient Halo */}
        <div className="absolute -top-32 right-[10%] w-[620px] h-[620px] rounded-full bg-[#E7E5E4]/80 blur-[120px]" />
        {/* Muted Cubbon Sage Ambient Glow */}
        <div className="absolute top-[35%] -left-28 w-[680px] h-[680px] rounded-full bg-[#D1FAE5]/25 blur-[140px]" />
        {/* Warm Alabaster Depth Halo */}
        <div className="absolute bottom-10 right-[25%] w-[540px] h-[540px] rounded-full bg-stone-200/50 blur-[110px]" />
      </div>

      {/* 3. REFINED EDITORIAL TOP BAR */}
      <header className="relative z-30 max-w-7xl mx-auto px-4 sm:px-8 pt-6 pb-4 flex items-center justify-between gap-4 border-b border-stone-200/80">
        {/* Left Publication Stamp */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-stone-900 flex items-center justify-center text-stone-50 shadow-sm shrink-0">
            <Compass className="w-4 h-4" strokeWidth={1.5} />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-base sm:text-lg tracking-tight text-stone-900">
                ನಮ್ಮ Cultour
              </span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-stone-100 text-stone-700 font-mono border border-stone-200 font-semibold">
                BLR
              </span>
            </div>
            <span className="text-[10px] font-mono tracking-widest text-stone-500 uppercase hidden sm:block">
              Archive & Cartography • Vol. 01
            </span>
          </div>
        </div>

        {/* Center Live Database Pill */}
        <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-xl border border-stone-200/80 text-xs font-mono text-stone-700 shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
          <span className="font-medium">{spotsCount} Curated Cultural Spaces</span>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            id="landing-submit-btn"
            type="button"
            onClick={onOpenAddSpot}
            className="px-3.5 py-1.5 rounded-full bg-white/80 hover:bg-white border border-stone-200/80 text-stone-800 text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
          >
            <Plus className="w-3.5 h-3.5 text-stone-700" strokeWidth={1.5} />
            <span>Submit a Landmark</span>
          </button>

          <button
            id="landing-enter-atlas-btn"
            type="button"
            onClick={() => onEnterMap()}
            className="px-4 py-1.5 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-50 font-sans font-semibold text-xs transition-all shadow-sm flex items-center gap-1.5 cursor-pointer active:scale-95"
          >
            <span>Enter Atlas</span>
            <ArrowRight className="w-3.5 h-3.5 text-stone-300" strokeWidth={1.5} />
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
              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-stone-900/5 border border-stone-900/10 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#9A3412]" />
                <span className="text-[11px] font-mono tracking-widest text-stone-700 font-semibold uppercase">
                  ನಮ್ಮ ಬೆಂಗಳೂರು • Cartography Issue No. 01
                </span>
              </div>

              {/* Large Editorial Serif Headline (Deep Charcoal + Single Accent Tone: Deep Terracotta) */}
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-[44px] xl:text-[48px] tracking-tight leading-[1.12] text-stone-900 mb-6">
                A <span className="italic text-[#9A3412]">living atlas</span> of Bengaluru’s{' '}
                <span className="italic text-[#9A3412]">reading rooms</span>,{' '}
                <span>museums</span> &{' '}
                <span className="italic text-[#9A3412]">hidden studios</span>.
              </h1>

              {/* Editorial Narrative */}
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-normal mb-8 max-w-xl">
                From the red-pompeian brick colonnades of Seshadri Iyer Memorial to quiet courtyard
                residencies in Shanthi Nagar, Namma Cultour is an independent, non-commercial
                cartography of 35+ spaces keeping Bengaluru’s artistic soul and literary memory alive.
              </p>

              {/* High-Contrast Architectural Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 mb-10">
                <button
                  id="hero-explore-map-btn"
                  type="button"
                  onClick={() => onEnterMap()}
                  className="px-6 py-3 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-50 font-sans font-semibold text-sm transition-all shadow-md shadow-stone-900/15 flex items-center gap-2 cursor-pointer active:scale-98 group"
                >
                  <span>Enter the Atlas</span>
                  <ArrowRight className="w-4 h-4 text-stone-300 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
                </button>

                <button
                  id="hero-contribute-spot-btn"
                  type="button"
                  onClick={onOpenAddSpot}
                  className="px-5 py-3 rounded-full bg-white/80 hover:bg-white border border-stone-200/80 text-stone-800 font-sans font-medium text-sm transition-all flex items-center gap-2 cursor-pointer shadow-xs active:scale-98"
                >
                  <Plus className="w-4 h-4 text-stone-700" strokeWidth={1.5} />
                  <span>Submit a Landmark</span>
                </button>
              </div>

              {/* Editorial Quick Jump Bar */}
              <div className="p-4 rounded-2xl bg-white/70 backdrop-blur-2xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-stone-900/5 max-w-xl">
                <span className="block text-[10px] font-mono uppercase tracking-wider text-stone-500 font-semibold mb-2.5">
                  Direct Archive Jumps:
                </span>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => onEnterMap({ cubbonTrail: true })}
                    className="px-3 py-1.5 rounded-xl bg-stone-900/5 hover:bg-stone-900/10 border border-stone-900/10 text-stone-800 text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-95"
                  >
                    <Route className="w-3.5 h-3.5 text-stone-700" strokeWidth={1.5} />
                    <span>Cubbon Crescent Loop</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onEnterMap({ category: 'library' })}
                    className="px-3 py-1.5 rounded-xl bg-stone-900/5 hover:bg-stone-900/10 border border-stone-900/10 text-stone-800 text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-95"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-stone-700" strokeWidth={1.5} />
                    <span>Basavanagudi Archives</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onEnterMap({ spotId: 'shanthiroad' })}
                    className="px-3 py-1.5 rounded-xl bg-stone-900/5 hover:bg-stone-900/10 border border-stone-900/10 text-stone-800 text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-95"
                  >
                    <Palette className="w-3.5 h-3.5 text-stone-700" strokeWidth={1.5} />
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
                className="sm:col-span-2 p-5 sm:p-6 rounded-3xl bg-white/70 hover:bg-white backdrop-blur-2xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-stone-900/5 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] transition-all duration-300 cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  {/* Clean Monocle-Grade Frosted Glass Header Bar */}
                  <div className="bg-stone-900/[0.03] border-b border-stone-900/[0.06] -mx-5 -mt-5 sm:-mx-6 sm:-mt-6 p-4 sm:p-5 mb-4 rounded-t-3xl flex items-center justify-between">
                    <span className="flex items-center gap-2 text-[11px] font-mono tracking-wider text-stone-600 uppercase font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#9A3412]" />
                      <span>Flagship Archive • Est. 1915</span>
                    </span>
                    <span className="text-[11px] font-mono text-stone-500 flex items-center gap-1 group-hover:text-stone-900 transition-colors">
                      <span>View on Map</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-stone-600 group-hover:text-stone-900" strokeWidth={1.5} />
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-xl sm:text-2xl text-stone-900 group-hover:text-[#9A3412] transition-colors">
                    State Central Library (Seshadri Iyer Memorial)
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 font-normal mt-2 leading-relaxed">
                    Centennial crimson landmark nestled in Cubbon Park canopy. Houses over 300,000 reference
                    volumes, rare dewan papers, and regional literature archives.
                  </p>
                </div>

                <div className="mt-5 pt-3.5 border-t border-stone-200/80 flex items-center justify-between text-xs text-stone-500 font-mono">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#9A3412]" strokeWidth={1.5} />
                    <span className="text-stone-700 font-medium">12.9754° N, 77.5929° E</span>
                  </div>
                  <span className="text-stone-600">Cubbon Park Metro (400m)</span>
                </div>
              </div>

              {/* BENTO CARD 2: Tall Pedestrian Walking Circuit */}
              <div
                onClick={() => onEnterMap({ cubbonTrail: true })}
                className="p-5 rounded-3xl bg-white/70 hover:bg-white backdrop-blur-2xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-stone-900/5 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] transition-all duration-300 cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  {/* Clean Unified Header Bar */}
                  <div className="bg-stone-900/[0.03] border-b border-stone-900/[0.06] -mx-5 -mt-5 p-4 mb-4 rounded-t-3xl flex items-center justify-between">
                    <span className="flex items-center gap-2 text-[11px] font-mono tracking-wider text-stone-600 uppercase font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                      <span>1.8 KM Circuit</span>
                    </span>
                    <Route className="w-4 h-4 text-stone-600 group-hover:rotate-45 transition-transform" strokeWidth={1.5} />
                  </div>

                  <h3 className="font-serif font-bold text-lg text-stone-900 group-hover:text-stone-950 transition-colors">
                    The Cubbon Cultural Trail
                  </h3>
                  <p className="text-xs text-stone-600 font-normal mt-1 leading-relaxed">
                    A 25-minute walking loop connecting Bangalore’s iconic neoclassical colonnades.
                  </p>

                  {/* Visual Mini-Timeline */}
                  <div className="mt-4 space-y-2 border-l-2 border-stone-300 pl-3 ml-1 text-[11px] text-stone-700 font-mono">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-stone-900 shrink-0" />
                      <span className="font-medium text-stone-900">State Central Library</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-stone-400 shrink-0" />
                      <span>Attara Kacheri (High Court)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-stone-400 shrink-0" />
                      <span>Government Museum (1877)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-stone-900 shrink-0" />
                      <span className="font-medium text-stone-900">Venkatappa Art Gallery</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-200/80 flex items-center justify-between text-xs text-stone-700 font-semibold">
                  <span className="flex items-center gap-1 font-mono text-stone-500 text-[11px]">
                    <Clock className="w-3.5 h-3.5 text-stone-600" strokeWidth={1.5} />
                    <span>~25 Min Walk</span>
                  </span>
                  <span className="text-stone-900 group-hover:translate-x-1 transition-transform">Start Walk →</span>
                </div>
              </div>

              {/* BENTO CARD 3 & 4 (Stacked in right column): Studios & Science */}
              <div className="flex flex-col gap-4">
                
                {/* BENTO CARD 3: Hidden Studios */}
                <div
                  onClick={() => onEnterMap({ category: 'gallery' })}
                  className="p-5 rounded-3xl bg-white/70 hover:bg-white backdrop-blur-2xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-stone-900/5 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] transition-all duration-300 cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    {/* Clean Unified Header Bar */}
                    <div className="bg-stone-900/[0.03] border-b border-stone-900/[0.06] -mx-5 -mt-5 p-4 mb-4 rounded-t-3xl flex items-center justify-between">
                      <span className="flex items-center gap-2 text-[11px] font-mono tracking-wider text-stone-600 uppercase font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-stone-500" />
                        <span>14 Spaces</span>
                      </span>
                      <Palette className="w-4 h-4 text-stone-600" strokeWidth={1.5} />
                    </div>

                    <h3 className="font-serif font-bold text-base sm:text-lg text-stone-900 group-hover:text-stone-950 transition-colors">
                      1 Shanthiroad & Hidden Studios
                    </h3>
                    <p className="text-xs text-stone-600 font-normal mt-1 leading-relaxed">
                      Courtyard residencies, printmaking archives, and artist-run rooms across Shanthi Nagar and Malleshwaram.
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-stone-200/60 text-[11px] font-mono text-stone-500 flex items-center justify-between">
                    <span className="text-stone-600 font-medium">1Shanthiroad • MAP • Kynkyny</span>
                    <span className="text-stone-900 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                      <span>Explore</span>
                      <ArrowUpRight className="w-3 h-3" strokeWidth={1.5} />
                    </span>
                  </div>
                </div>

                {/* BENTO CARD 4: Science Lore & Specialized Museums */}
                <div
                  onClick={() => onEnterMap({ category: 'museum' })}
                  className="p-5 rounded-3xl bg-white/70 hover:bg-white backdrop-blur-2xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-stone-900/5 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] transition-all duration-300 cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    {/* Clean Unified Header Bar */}
                    <div className="bg-stone-900/[0.03] border-b border-stone-900/[0.06] -mx-5 -mt-5 p-4 mb-4 rounded-t-3xl flex items-center justify-between">
                      <span className="flex items-center gap-2 text-[11px] font-mono tracking-wider text-stone-600 uppercase font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-stone-500" />
                        <span>11 Museums</span>
                      </span>
                      <Landmark className="w-4 h-4 text-stone-600" strokeWidth={1.5} />
                    </div>

                    <h3 className="font-serif font-bold text-base sm:text-lg text-stone-900 group-hover:text-stone-950 transition-colors">
                      NIMHANS Brain Museum & Science Lore
                    </h3>
                    <p className="text-xs text-stone-600 font-normal mt-1 leading-relaxed">
                      Actual neuroanatomy specimens, HAL aerospace fighters, and ancient Halmidi inscriptions.
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-stone-200/60 text-[11px] font-mono text-stone-500 flex items-center justify-between">
                    <span className="text-stone-600 font-medium">NIMHANS • HAL • VITM</span>
                    <span className="text-stone-900 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                      <span>Explore</span>
                      <ArrowUpRight className="w-3 h-3" strokeWidth={1.5} />
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        </div>

        {/* ========================================================= */}
        {/* 5. INTERACTIVE NEIGHBOURHOOD QUARTERS STRIP AT BOTTOM */}
        {/* ========================================================= */}
        <section className="mt-14 pt-8 border-t border-stone-200/80">
          <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
            <span className="text-xs font-mono uppercase tracking-widest text-stone-500 font-bold">
              Select Cultural Quarter to Jump on Map:
            </span>
            <span className="text-xs text-stone-500 font-mono hidden sm:inline">
              Click to view quarter landmarks
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              {
                id: 'cubbon',
                name: 'Cubbon Park',
                icon: Trees,
                count: '8 Spots',
                action: () => onEnterMap({ cubbonTrail: true }),
              },
              {
                id: 'basavanagudi',
                name: 'Basavanagudi',
                icon: Coffee,
                count: '4 Spots',
                action: () => onEnterMap({ neighborhood: 'Basavanagudi' }),
              },
              {
                id: 'malleshwaram',
                name: 'Malleshwaram',
                icon: Sparkles,
                count: '5 Spots',
                action: () => onEnterMap({ neighborhood: 'Malleshwaram' }),
              },
              {
                id: 'shanthi-nagar',
                name: 'Shanthi Nagar',
                icon: Palette,
                count: '4 Spots',
                action: () => onEnterMap({ neighborhood: 'Shanthi Nagar' }),
              },
              {
                id: 'indiranagar',
                name: 'Indiranagar',
                icon: Compass,
                count: '4 Spots',
                action: () => onEnterMap({ neighborhood: 'Indiranagar' }),
              },
              {
                id: 'vasanth-nagar',
                name: 'Palace Road',
                icon: Landmark,
                count: '5 Spots',
                action: () => onEnterMap({ neighborhood: 'Vasanth Nagar' }),
              },
            ].map((quarter) => {
              const IconComponent = quarter.icon;
              return (
                <button
                  key={quarter.id}
                  type="button"
                  onClick={quarter.action}
                  className="p-3.5 rounded-2xl bg-white/70 hover:bg-white backdrop-blur-2xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] ring-1 ring-stone-900/5 transition-all text-left cursor-pointer group flex flex-col justify-between active:scale-95"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-xl bg-stone-900/5 border border-stone-900/10 flex items-center justify-center text-stone-700 group-hover:bg-stone-900 group-hover:text-stone-50 transition-colors">
                      <IconComponent className="w-4 h-4" strokeWidth={1.5} />
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 border border-stone-200/80 font-medium">
                      {quarter.count}
                    </span>
                  </div>
                  <div>
                    <span className="block font-serif font-bold text-xs sm:text-sm text-stone-900 group-hover:text-stone-950 transition-colors">
                      {quarter.name}
                    </span>
                    <span className="text-[10px] text-stone-500 font-mono mt-0.5 flex items-center gap-0.5 group-hover:text-stone-800">
                      <span>Open quarter</span>
                      <ArrowUpRight className="w-2.5 h-2.5" strokeWidth={1.5} />
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      </main>

      {/* 6. REFINED EDITORIAL FOOTER */}
      <footer className="relative z-10 py-8 px-4 sm:px-8 border-t border-stone-200/80 text-xs text-stone-500 flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto gap-3">
        <div className="flex items-center gap-2">
          <span className="font-serif font-bold text-stone-800">ನಮ್ಮ Cultour BLR</span>
          <span>•</span>
          <span>Open Bengaluru Heritage Cartography</span>
        </div>

        <div className="flex items-center gap-4 text-stone-500">
          <button
            type="button"
            onClick={() => onEnterMap()}
            className="hover:text-stone-900 transition-colors cursor-pointer"
          >
            Map View
          </button>
          <button
            type="button"
            onClick={() => onEnterMap({ cubbonTrail: true })}
            className="hover:text-stone-900 transition-colors cursor-pointer font-medium"
          >
            Cubbon Trail
          </button>
          <button
            type="button"
            onClick={onOpenAddSpot}
            className="hover:text-stone-900 transition-colors cursor-pointer"
          >
            Submit Landmark
          </button>
        </div>
      </footer>
    </div>
  );
};
