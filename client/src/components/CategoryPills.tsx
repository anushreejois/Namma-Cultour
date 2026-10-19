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
    activeColor: 'bg-slate-700/80 border-slate-400/40 text-white',
    iconColor: 'text-cyan-300',
  },
  {
    id: 'museum',
    label: 'Museums',
    icon: Landmark,
    activeColor: 'bg-amber-500/20 border-amber-500/50 text-amber-300',
    iconColor: 'text-amber-400',
  },
  {
    id: 'gallery',
    label: 'Art & Studios',
    icon: Palette,
    activeColor: 'bg-sky-500/20 border-sky-400/50 text-sky-200',
    iconColor: 'text-sky-400',
  },
  {
    id: 'library',
    label: 'Libraries',
    icon: BookOpen,
    activeColor: 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300',
    iconColor: 'text-cyan-400',
  },
];

export const CategoryPills = ({
  activeCategory,
  onSelectCategory,
  counts,
}: CategoryPillsProps) => {
  return (
    <div className="bg-slate-950/50 p-1 rounded-xl flex items-center gap-1 border border-white/8 overflow-x-auto no-scrollbar">
      {TABS.map((tab) => {
        const isActive = activeCategory === tab.id;
        const count = counts[tab.id];
        const Icon = tab.icon;

        return (
          <button
            key={tab.id}
            onClick={() => onSelectCategory(tab.id)}
            className={`relative px-2.5 sm:px-3 py-1 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap z-10 cursor-pointer ${
              isActive ? 'text-white font-semibold' : 'text-slate-400 hover:text-slate-200'
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
            <Icon className={`w-3.5 h-3.5 ${isActive ? tab.iconColor : 'text-slate-400'}`} />
            <span>{tab.label}</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono transition-colors ${
                isActive
                  ? 'bg-white/20 text-white font-semibold'
                  : 'bg-white/5 text-slate-400'
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
