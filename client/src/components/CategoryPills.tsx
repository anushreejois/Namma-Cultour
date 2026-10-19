import { motion } from 'framer-motion';
import type { FilterCategory } from '../types/spot';
import { Sparkles, Landmark, Palette, BookOpen } from 'lucide-react';

interface CategoryPillsProps {
  activeCategory: FilterCategory;
  onSelectCategory: (category: FilterCategory) => void;
  counts: {
    all: number;
    museum: number;
    gallery: number;
    library: number;
  };
}

interface FilterTab {
  id: FilterCategory;
  label: string;
  icon: typeof Sparkles;
  activeColor: string;
  iconColor: string;
}

const TABS: FilterTab[] = [
  {
    id: 'all',
    label: 'All',
    icon: Sparkles,
    activeColor: 'bg-stone-800/90 border-stone-700/90 text-stone-100 shadow-md',
    iconColor: 'text-amber-400',
  },
  {
    id: 'museum',
    label: 'Museums',
    icon: Landmark,
    activeColor: 'bg-amber-950/50 border-amber-600/60 text-amber-200 shadow-md ring-1 ring-amber-500/20',
    iconColor: 'text-amber-400',
  },
  {
    id: 'gallery',
    label: 'Art & Studios',
    icon: Palette,
    activeColor: 'bg-stone-900/90 border-stone-700/90 text-stone-200 shadow-md',
    iconColor: 'text-sky-400',
  },
  {
    id: 'library',
    label: 'Libraries',
    icon: BookOpen,
    activeColor: 'bg-emerald-950/40 border-emerald-700/60 text-emerald-200 shadow-md ring-1 ring-emerald-500/20',
    iconColor: 'text-emerald-400',
  },
];

export const CategoryPills = ({
  activeCategory,
  onSelectCategory,
  counts,
}: CategoryPillsProps) => {
  return (
    <div className="bg-[#0c0a09]/75 p-1 rounded-xl flex items-center gap-1 border border-stone-800/80 backdrop-blur-xl shadow-lg ring-1 ring-white/5 overflow-x-auto no-scrollbar">
      {TABS.map((tab) => {
        const isActive = activeCategory === tab.id;
        const count = counts[tab.id];
        const Icon = tab.icon;

        return (
          <button
            key={tab.id}
            onClick={() => onSelectCategory(tab.id)}
            className={`relative px-2.5 sm:px-3 py-1 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 whitespace-nowrap z-10 cursor-pointer ${
              isActive
                ? 'text-stone-100 font-semibold'
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900/40'
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="activeFilterPill"
                className={`absolute inset-0 rounded-lg border shadow-sm ${tab.activeColor}`}
                transition={{
                  type: 'spring',
                  stiffness: 450,
                  damping: 32,
                }}
                style={{ zIndex: -1 }}
              />
            )}
            <Icon className={`w-3.5 h-3.5 transition-colors ${isActive ? tab.iconColor : 'text-stone-500'}`} />
            <span>{tab.label}</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono transition-colors ${
                isActive
                  ? 'bg-stone-900 text-stone-200 border border-stone-700/80 font-medium'
                  : 'bg-stone-900/80 text-stone-500 border border-stone-800/80'
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
};
