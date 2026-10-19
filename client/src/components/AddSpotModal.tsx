import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Category, SpotSubmission } from '../types/spot';
import { submitSpot } from '../services/api';
import { X, Plus, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';

interface AddSpotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSpotAdded?: () => void;
}

export const AddSpotModal: React.FC<AddSpotModalProps> = ({
  isOpen,
  onClose,
  onSpotAdded,
}) => {
  const [name, setName] = useState('');
  const [kannadaName, setKannadaName] = useState('');
  const [category, setCategory] = useState<Category>('gallery');
  const [subType, setSubType] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [nearestMetro, setNearestMetro] = useState('');
  const [entryFee, setEntryFee] = useState('Free');
  const [timings, setTimings] = useState('10:00 AM – 06:00 PM');
  const [tagline, setTagline] = useState('');
  const [lat, setLat] = useState('12.9716');
  const [lng, setLng] = useState('77.5946');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg('Please enter a spot name.');
      return;
    }

    const parsedLat = parseFloat(lat);
    const parsedLng = parseFloat(lng);
    if (isNaN(parsedLat) || isNaN(parsedLng)) {
      setErrorMsg('Please provide valid decimal coordinates.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    const submission: SpotSubmission = {
      name: name.trim(),
      kannadaName: kannadaName.trim() || undefined,
      category,
      subType: subType.trim() || 'Cultural Heritage',
      lat: parsedLat,
      lng: parsedLng,
      neighborhood: neighborhood.trim() || 'Bengaluru',
      nearestMetro: nearestMetro.trim() || 'Namma Metro',
      entryFee: entryFee.trim() || 'Free',
      timings: timings.trim() || '10:00 AM – 06:00 PM',
      tagline: tagline.trim() || undefined,
      status: 'pending',
    };

    try {
      const res = await submitSpot(submission);
      setSuccessMsg(res.message || 'Spot submitted successfully for moderation!');
      if (onSpotAdded) onSpotAdded();
      setTimeout(() => {
        onClose();
        setSuccessMsg(null);
      }, 2000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Submission failed';
      setErrorMsg(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/75 backdrop-blur-md"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          className="relative w-full max-w-lg glass-panel rounded-2xl shadow-2xl border border-white/15 overflow-hidden z-10 max-h-[90vh] flex flex-col bg-slate-900/90"
        >
          {/* Header */}
          <div className="p-5 border-b border-white/10 flex items-center justify-between bg-white/5">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400">
                <Sparkles className="w-5 h-5" />
              </span>
              <div>
                <h3 className="font-display font-semibold text-lg text-white">
                  Add a Cultural Spot
                </h3>
                <p className="text-xs text-slate-400">
                  Guest curation • No sign-up required
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-5 overflow-y-auto no-scrollbar space-y-4">
            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {successMsg && (
              <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">
                Spot Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. 1ShanthiRoad Studio"
                className="w-full bg-slate-800/80 border border-white/10 rounded-xl px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Kannada Name (Optional)
                </label>
                <input
                  type="text"
                  value={kannadaName}
                  onChange={(e) => setKannadaName(e.target.value)}
                  placeholder="e.g. ಶಾಂತಿ ರೋಡ್ ಸ್ಟುಡಿಯೋ"
                  className="w-full bg-slate-800/80 border border-white/10 rounded-xl px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Category)}
                  className="w-full bg-slate-800/80 border border-white/10 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="museum">🏛️ Museum</option>
                  <option value="gallery">🎨 Art & Studio</option>
                  <option value="library">📚 Library & Archive</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Sub-Type
                </label>
                <input
                  type="text"
                  value={subType}
                  onChange={(e) => setSubType(e.target.value)}
                  placeholder="e.g. Contemporary Residency"
                  className="w-full bg-slate-800/80 border border-white/10 rounded-xl px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Neighborhood
                </label>
                <input
                  type="text"
                  value={neighborhood}
                  onChange={(e) => setNeighborhood(e.target.value)}
                  placeholder="e.g. Shanthi Nagar"
                  className="w-full bg-slate-800/80 border border-white/10 rounded-xl px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Nearest Metro
                </label>
                <input
                  type="text"
                  value={nearestMetro}
                  onChange={(e) => setNearestMetro(e.target.value)}
                  placeholder="e.g. MG Road Metro (1.2 km)"
                  className="w-full bg-slate-800/80 border border-white/10 rounded-xl px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Entry Fee
                </label>
                <input
                  type="text"
                  value={entryFee}
                  onChange={(e) => setEntryFee(e.target.value)}
                  placeholder="e.g. Free / ₹50"
                  className="w-full bg-slate-800/80 border border-white/10 rounded-xl px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">
                Operational Timings
              </label>
              <input
                type="text"
                value={timings}
                onChange={(e) => setTimings(e.target.value)}
                placeholder="e.g. 10:00 AM – 06:30 PM (Closed Mon)"
                className="w-full bg-slate-800/80 border border-white/10 rounded-xl px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">
                Curator Tagline / Description
              </label>
              <textarea
                rows={2}
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="What makes this place special for Bengaluru culture lovers?"
                className="w-full bg-slate-800/80 border border-white/10 rounded-xl px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Latitude *
                </label>
                <input
                  type="text"
                  required
                  value={lat}
                  onChange={(e) => setLat(e.target.value)}
                  className="w-full bg-slate-800/80 border border-white/10 rounded-xl px-3.5 py-2 text-sm text-white font-mono focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Longitude *
                </label>
                <input
                  type="text"
                  required
                  value={lng}
                  onChange={(e) => setLng(e.target.value)}
                  className="w-full bg-slate-800/80 border border-white/10 rounded-xl px-3.5 py-2 text-sm text-white font-mono focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-slate-950 font-display font-semibold shadow-lg shadow-cyan-500/20 transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Submitting...</span>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>Submit Spot for Review</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
