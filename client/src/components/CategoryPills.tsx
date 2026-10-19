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
    activeColor: 'bg-slate-900/10 border-slate-900/20 text-slate-900 shadow-sm',
    iconColor: 'text-indigo-600',
  },
  {
    id: 'museum',
    label: 'Museums',
    icon: Landmark,
    activeColor: 'bg-amber-500/15 border-amber-500/30 text-amber-800 shadow-sm',
    iconColor: 'text-amber-600',
  },
  {
    id: 'gallery',
    label: 'Art & Studios',
    icon: Palette,
    activeColor: 'bg-indigo-500/15 border-indigo-500/30 text-indigo-800 shadow-sm',
    iconColor: 'text-indigo-600',
  },
  {
    id: 'library',
    label: 'Libraries',
    icon: BookOpen,
    activeColor: 'bg-teal-500/15 border-teal-500/30 text-teal-800 shadow-sm',
    iconColor: 'text-teal-600',
  },
];

export const CategoryPills = ({
  activeCategory,
  onSelectCategory,
  counts,
}: CategoryPillsProps) => {
  return (
    <div className="bg-white/60 backdrop-blur-xl p-1 rounded-xl flex items-center gap-1 border border-white/80 shadow-sm overflow-x-auto no-scrollbar">
      {TABS.map((tab) => {
        const isActive = activeCategory === tab.id;
        const count = counts[tab.id];
        const Icon = tab.icon;

        return (
          <button
            key={tab.id}
            onClick={() => onSelectCategory(tab.id)}
            className={`relative px-2.5 sm:px-3 py-1 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap z-10 cursor-pointer ${
              isActive ? 'text-slate-900 font-semibold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="activeFilterPill"
                className={`absolute inset-0 rounded-lg border ${tab.activeColor}`}
                transition={{
                  type: 'spring',
                  stiffness: 450,
                  damping: 32,
                }}
                style={{ zIndex: -1 }}
              />
            )}
            <Icon className={`w-3.5 h-3.5 ${isActive ? tab.iconColor : 'text-slate-500'}`} />
            <span>{tab.label}</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono transition-colors ${
                isActive
                  ? 'bg-white/80 text-slate-800 font-semibold shadow-xs'
                  : 'bg-slate-200/60 text-slate-600'
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
