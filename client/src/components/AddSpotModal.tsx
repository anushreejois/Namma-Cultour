import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Category, SpotSubmission } from '../types/spot';
import { submitSpot } from '../services/api';
import { X, Plus, Sparkles, CheckCircle2, AlertCircle, MapPin, Locate } from 'lucide-react';

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
  const [isLocating, setIsLocating] = useState(false);

  if (!isOpen) return null;

  const resetForm = () => {
    setName('');
    setKannadaName('');
    setCategory('gallery');
    setSubType('');
    setNeighborhood('');
    setNearestMetro('');
    setEntryFee('Free');
    setTimings('10:00 AM – 06:00 PM');
    setTagline('');
    setLat('12.9716');
    setLng('77.5946');
    setErrorMsg(null);
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      setErrorMsg('Geolocation is not supported by your browser.');
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLat(pos.coords.latitude.toFixed(6));
        setLng(pos.coords.longitude.toFixed(6));
        setIsLocating(false);
      },
      () => {
        // Fallback to Bengaluru Central coordinates
        setLat('12.9716');
        setLng('77.5946');
        setIsLocating(false);
      },
      { timeout: 8000 }
    );
  };

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
      setSuccessMsg(res.message || 'Spot submitted successfully for review!');
      resetForm();
      if (onSpotAdded) onSpotAdded();
      setTimeout(() => {
        onClose();
        setSuccessMsg(null);
      }, 1800);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Submission failed';
      setErrorMsg(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div id="add-spot-modal" className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-md"
        />

        {/* Modal Window: Warm Obsidian Glassmorphism */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', stiffness: 350, damping: 26 }}
          className="relative w-full max-w-lg rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.85)] border border-stone-800/80 ring-1 ring-white/5 overflow-hidden z-10 max-h-[92vh] flex flex-col bg-[#0c0a09]/95 backdrop-blur-2xl text-stone-100"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-stone-800/80 flex items-center justify-between bg-[#0c0a09]/60 shrink-0">
            <div className="flex items-center gap-2.5">
              <span className="p-2 rounded-xl bg-stone-900 border border-stone-800 text-amber-500 shadow-md">
                <Sparkles className="w-5 h-5" />
              </span>
              <div>
                <h3 className="font-serif font-bold text-base sm:text-lg text-stone-100">
                  Add a Cultural Spot
                </h3>
                <p className="text-[11px] sm:text-xs text-stone-400">
                  Community curation • No account required
                </p>
              </div>
            </div>
            <button
              id="close-add-spot-modal-btn"
              onClick={onClose}
              className="p-1.5 rounded-xl bg-stone-900/80 hover:bg-stone-800 text-stone-400 hover:text-stone-100 transition-colors cursor-pointer border border-stone-800"
              title="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-4 sm:p-5 overflow-y-auto no-scrollbar space-y-4">
            {errorMsg && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2"
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </motion.div>
            )}

            {successMsg && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3.5 rounded-xl bg-emerald-500/25 border border-emerald-400 text-emerald-200 text-xs flex items-center gap-2.5 shadow-lg shadow-emerald-950/40"
              >
                <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
                <div>
                  <p className="font-semibold">{successMsg}</p>
                  <p className="text-[10px] text-emerald-300/80">Updating live map and directory...</p>
                </div>
              </motion.div>
            )}

            {/* Category Segmented Selector */}
            <div>
              <label className="block text-xs font-mono text-stone-300 mb-1.5">
                Category *
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setCategory('museum')}
                  className={`py-2 px-2 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
                    category === 'museum'
                      ? 'bg-amber-950/50 border-amber-600/60 text-amber-200 shadow-md ring-1 ring-amber-500/20'
                      : 'bg-stone-900/60 border-stone-800 text-stone-400 hover:text-stone-200 hover:bg-stone-850'
                  }`}
                >
                  <span className="truncate">Museum</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCategory('gallery')}
                  className={`py-2 px-2 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
                    category === 'gallery'
                      ? 'bg-stone-850 border-stone-600 text-stone-200 shadow-md ring-1 ring-white/10'
                      : 'bg-stone-900/60 border-stone-800 text-stone-400 hover:text-stone-200 hover:bg-stone-850'
                  }`}
                >
                  <span className="truncate">Art & Studio</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCategory('library')}
                  className={`py-2 px-2 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
                    category === 'library'
                      ? 'bg-emerald-950/40 border-emerald-700/60 text-emerald-200 shadow-md ring-1 ring-emerald-500/20'
                      : 'bg-stone-900/60 border-stone-800 text-stone-400 hover:text-stone-200 hover:bg-stone-850'
                  }`}
                >
                  <span className="truncate">Library</span>
                </button>
              </div>
            </div>

            {/* Spot Name */}
            <div>
              <label htmlFor="spot-name-input" className="block text-xs font-mono text-stone-300 mb-1">
                Spot Name *
              </label>
              <input
                id="spot-name-input"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. 1ShanthiRoad Studio"
                className="w-full bg-stone-900/90 border border-stone-800 rounded-xl px-3.5 py-2 text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-600/60 focus:ring-1 focus:ring-amber-600/40 shadow-inner"
              />
            </div>

            {/* Kannada Name & SubType */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="spot-kannada-input" className="block text-xs font-mono text-stone-300 mb-1">
                  Kannada Name (Optional)
                </label>
                <input
                  id="spot-kannada-input"
                  type="text"
                  value={kannadaName}
                  onChange={(e) => setKannadaName(e.target.value)}
                  placeholder="e.g. ಶಾಂತಿ ರೋಡ್ ಸ್ಟುಡಿಯೋ"
                  className="w-full bg-stone-900/90 border border-stone-800 rounded-xl px-3.5 py-2 text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-600/60 shadow-inner"
                />
              </div>

              <div>
                <label htmlFor="spot-subtype-input" className="block text-xs font-mono text-stone-300 mb-1">
                  Sub-Type
                </label>
                <input
                  id="spot-subtype-input"
                  type="text"
                  value={subType}
                  onChange={(e) => setSubType(e.target.value)}
                  placeholder="e.g. Contemporary Residency"
                  className="w-full bg-stone-900/90 border border-stone-800 rounded-xl px-3.5 py-2 text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-600/60 shadow-inner"
                />
              </div>
            </div>

            {/* Neighborhood & Nearest Metro */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="spot-neighborhood-input" className="block text-xs font-mono text-stone-300 mb-1">
                  Neighborhood
                </label>
                <input
                  id="spot-neighborhood-input"
                  type="text"
                  value={neighborhood}
                  onChange={(e) => setNeighborhood(e.target.value)}
                  placeholder="e.g. Shanthi Nagar"
                  className="w-full bg-stone-900/90 border border-stone-800 rounded-xl px-3.5 py-2 text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-600/60 shadow-inner"
                />
              </div>

              <div>
                <label htmlFor="spot-metro-input" className="block text-xs font-mono text-stone-300 mb-1">
                  Nearest Metro
                </label>
                <input
                  id="spot-metro-input"
                  type="text"
                  value={nearestMetro}
                  onChange={(e) => setNearestMetro(e.target.value)}
                  placeholder="e.g. MG Road Metro (1.2 km)"
                  className="w-full bg-stone-900/90 border border-stone-800 rounded-xl px-3.5 py-2 text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-600/60 shadow-inner"
                />
              </div>
            </div>

            {/* Entry Fee & Operational Timings */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="spot-fee-input" className="block text-xs font-mono text-stone-300 mb-1">
                  Entry Fee
                </label>
                <input
                  id="spot-fee-input"
                  type="text"
                  value={entryFee}
                  onChange={(e) => setEntryFee(e.target.value)}
                  placeholder="e.g. Free / ₹50"
                  className="w-full bg-stone-900/90 border border-stone-800 rounded-xl px-3.5 py-2 text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-600/60 shadow-inner"
                />
              </div>

              <div>
                <label htmlFor="spot-timings-input" className="block text-xs font-mono text-stone-300 mb-1">
                  Timings
                </label>
                <input
                  id="spot-timings-input"
                  type="text"
                  value={timings}
                  onChange={(e) => setTimings(e.target.value)}
                  placeholder="e.g. 10:00 AM – 06:30 PM"
                  className="w-full bg-stone-900/90 border border-stone-800 rounded-xl px-3.5 py-2 text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-600/60 shadow-inner"
                />
              </div>
            </div>

            {/* Curator Tagline */}
            <div>
              <label htmlFor="spot-tagline-input" className="block text-xs font-mono text-stone-300 mb-1">
                Curator Tagline / Description
              </label>
              <textarea
                id="spot-tagline-input"
                rows={2}
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="What makes this place special for Bengaluru culture lovers?"
                className="w-full bg-stone-900/90 border border-stone-800 rounded-xl px-3.5 py-2 text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-600/60 shadow-inner"
              />
            </div>

            {/* Geographic Coordinates with Helper */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-mono text-stone-300">
                  Coordinates (Lat, Lng) *
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setLat('12.9716');
                      setLng('77.5946');
                    }}
                    className="text-[10px] text-amber-500 hover:text-amber-400 flex items-center gap-1 cursor-pointer"
                  >
                    <MapPin className="w-3 h-3" />
                    <span>Cubbon Center</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleUseCurrentLocation}
                    disabled={isLocating}
                    className="text-[10px] text-stone-400 hover:text-stone-200 flex items-center gap-1 cursor-pointer"
                  >
                    <Locate className={`w-3 h-3 ${isLocating ? 'animate-spin' : ''}`} />
                    <span>{isLocating ? 'Locating...' : 'My Location'}</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <input
                  id="spot-lat-input"
                  type="text"
                  required
                  value={lat}
                  onChange={(e) => setLat(e.target.value)}
                  placeholder="Latitude (e.g. 12.9716)"
                  className="w-full bg-stone-900/90 border border-stone-800 rounded-xl px-3.5 py-2 text-sm text-stone-100 font-mono focus:outline-none focus:border-amber-600/60 shadow-inner"
                />

                <input
                  id="spot-lng-input"
                  type="text"
                  required
                  value={lng}
                  onChange={(e) => setLng(e.target.value)}
                  placeholder="Longitude (e.g. 77.5946)"
                  className="w-full bg-stone-900/90 border border-stone-800 rounded-xl px-3.5 py-2 text-sm text-stone-100 font-mono focus:outline-none focus:border-amber-600/60 shadow-inner"
                />
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-2">
              <button
                id="spot-submit-button"
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-stone-100 hover:bg-white text-stone-950 font-sans font-semibold shadow-lg shadow-black/50 border border-white/20 transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2 active:scale-98"
              >
                {isSubmitting ? (
                  <span>Submitting to Namma Cultour...</span>
                ) : (
                  <>
                    <Plus className="w-4 h-4 text-stone-900" />
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
