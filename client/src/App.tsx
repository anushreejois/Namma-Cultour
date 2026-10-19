import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { GoogleMap, useJsApiLoader, MarkerF, PolylineF } from '@react-google-maps/api';
import type { CulturalSpot, FilterCategory } from './types/spot';
import { fetchSpots } from './services/api';
import { AmbientGlow } from './components/AmbientGlow';
import { CategoryPills } from './components/CategoryPills';
import { SpotSidebar } from './components/SpotSidebar';
import { SpotDrawer } from './components/SpotDrawer';
import { AddSpotModal } from './components/AddSpotModal';
import { LeafletMap } from './components/LeafletMap';
import { CubbonTrailHUD, type TrailWaypoint } from './components/CubbonTrailHUD';
import { LandingPage, type MapNavigationTarget } from './components/LandingPage';
import {
  Compass,
  Plus,
  Menu,
  Layers,
  Route,
  ArrowLeft,
} from 'lucide-react';

const MAP_CENTER = { lat: 12.9716, lng: 77.5946 }; // Cubbon Park / Bengaluru City Center

// Daylight vector map stylers for Google Maps
const DAYLIGHT_MAP_STYLES: google.maps.MapTypeStyle[] = [
  { elementType: 'geometry', stylers: [{ color: '#f8fafc' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#475569' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#ffffff' }] },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#dcfce7' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#166534' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#ffffff' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#e2e8f0' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#e0f2fe' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#0369a1' }],
  },
];

// Cubbon Loop coordinates for Google Maps Polyline (complete heritage circuit)
const CUBBON_LOOP_GOOGLE_COORDS = [
  { lat: 12.9754, lng: 77.5929 }, // State Central Library (Seshadri Iyer Memorial Hall)
  { lat: 12.9772, lng: 77.5925 }, // High Court / Attara Kacheri
  { lat: 12.9785, lng: 77.5920 }, // Vidhana Soudha South Gate
  { lat: 12.9775, lng: 77.5948 }, // Victoria Statue & Bamboo Groves
  { lat: 12.9753, lng: 77.5958 }, // Government Museum (1877)
  { lat: 12.9752, lng: 77.5960 }, // Venkatappa Art Gallery
  { lat: 12.9752, lng: 77.5963 }, // VITM
  { lat: 12.9736, lng: 77.5945 }, // Cubbon Park Bandstand
  { lat: 12.9744, lng: 77.5930 }, // King Edward VII Statue
  { lat: 12.9754, lng: 77.5929 }, // Loop returns to State Central Library
];

interface CategoryColorTheme {
  border: string;
  bgTint: string;
  badge: string;
  svgGlyph: string;
}

function getCategoryColorTheme(category: string): CategoryColorTheme {
  switch (category.toLowerCase()) {
    case 'museum':
      return {
        border: '#f59e0b',
        bgTint: '#fef3c7',
        badge: '#b45309',
        svgGlyph: `
          <g fill="#b45309" stroke="#b45309" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="17,10 10.5,13.8 23.5,13.8" stroke-width="1.2"/>
            <rect x="11" y="14.2" width="12" height="1.3" rx="0.4" stroke-width="0"/>
            <rect x="12" y="16.2" width="1.6" height="5" rx="0.4" stroke-width="0"/>
            <rect x="15.2" y="16.2" width="1.6" height="5" rx="0.4" stroke-width="0"/>
            <rect x="18.4" y="16.2" width="1.6" height="5" rx="0.4" stroke-width="0"/>
            <rect x="21.6" y="16.2" width="1.6" height="5" rx="0.4" stroke-width="0"/>
            <rect x="10" y="21.8" width="14" height="1.5" rx="0.4" stroke-width="0"/>
          </g>
        `,
      };
    case 'gallery':
      return {
        border: '#c2410c', // Warm Terracotta / Bronze (NO pink!)
        bgTint: '#ffedd5',
        badge: '#9a3412',
        svgGlyph: `
          <g>
            <path
              d="M17 10C13 10 9.8 13.2 9.8 17.2c0 3 1.9 4.6 4 4.6 1 0 1.7-.5 2.2-1.2.4-.5.6-.6 1.1-.6.7 0 1.3.6 1.3 1.4 0 .3-.1.5-.2.8-.4 1.1.5 1.9 1.5 1.9 3.5 0 6.2-3.2 6.2-6.9C26 13.2 21.8 10 17 10Z"
              fill="#9a3412"
              fill-opacity="0.18"
              stroke="#9a3412"
              stroke-width="1.5"
              stroke-linejoin="round"
            />
            <ellipse cx="17.8" cy="19.5" rx="1.2" ry="1" fill="#ffedd5" stroke="#9a3412" stroke-width="0.9"/>
            <circle cx="13.2" cy="13.8" r="1.1" fill="#ef4444" />
            <circle cx="16.8" cy="12.2" r="1.1" fill="#f59e0b" />
            <circle cx="20.5" cy="13.8" r="1.1" fill="#3b82f6" />
            <circle cx="22" cy="17" r="1.1" fill="#10b981" />
          </g>
        `,
      };
    case 'library':
      return {
        border: '#0284c7',
        bgTint: '#e0f2fe',
        badge: '#0369a1',
        svgGlyph: `
          <g stroke="#0369a1" stroke-linecap="round" stroke-linejoin="round">
            <path
              d="M17 13.2C15.4 12 13.2 11.6 11.1 11.6a1 1 0 0 0-.9.9v7.8a.5.5 0 0 0 .5.5c1.9.2 4 .7 5.8 1.9 1.8-1.2 3.9-1.7 5.8-1.9a.5.5 0 0 0 .5-.5V12.5a1 1 0 0 0-.9-.9c-2.1 0-4.3.4-5.9 1.6Z"
              fill="#0369a1"
              fill-opacity="0.18"
              stroke-width="1.5"
            />
            <line x1="17" y1="13.2" x2="17" y2="22.2" stroke-width="1.5" />
          </g>
        `,
      };
    default:
      return {
        border: '#06b6d4',
        bgTint: '#cffafe',
        badge: '#0e7490',
        svgGlyph: `
          <g stroke="#0e7490" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" fill="none">
            <path d="M17 23s-4.5-4-4.5-7.2a4.5 4.5 0 0 1 9 0c0 3.2-4.5 7.2-4.5 7.2Z" fill="#0e7490" fill-opacity="0.2"/>
            <circle cx="17" cy="15.8" r="1.8" fill="#0e7490"/>
          </g>
        `,
      };
  }
}

function getMarkerIcon(category: string, isSelected: boolean): google.maps.Icon | string {
  const theme = getCategoryColorTheme(category);
  const size = isSelected ? 42 : 36;
  const height = isSelected ? 52 : 46;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${height}" viewBox="0 0 34 44">
    <defs>
      <filter id="pin-shadow" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="3" stdDeviation="2.5" flood-color="#0f172a" flood-opacity="0.32"/>
      </filter>
    </defs>
    <!-- Solid Modern White Teardrop Pin Body -->
    <path filter="url(#pin-shadow)" d="M17 1 C8.163 1 1 8.163 1 17 C1 27 14 39.5 17 43 C20 39.5 33 27 33 17 C33 8.163 25.837 1 17 1 Z" fill="#ffffff" stroke="${theme.border}" stroke-width="2.4"/>
    <!-- Subtle Inner Tint Circle -->
    <circle cx="17" cy="17" r="12" fill="${theme.bgTint}"/>
    <!-- Crisp Vector POI Glyph -->
    ${theme.svgGlyph}
  </svg>`;

  return {
    url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`,
    scaledSize: typeof google !== 'undefined' ? new google.maps.Size(size, height) : undefined,
    anchor: typeof google !== 'undefined' ? new google.maps.Point(size / 2, height) : undefined,
  };
}

export function App() {
  const [viewMode, setViewMode] = useState<'landing' | 'map'>('landing');
  const [spots, setSpots] = useState<CulturalSpot[]>([]);
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('all');
  const [selectedSpot, setSelectedSpot] = useState<CulturalSpot | null>(null);
  const [showCubbonTrail, setShowCubbonTrail] = useState(false);
  const [mapLayer, setMapLayer] = useState<'streets' | 'satellite'>('streets');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSidebarOpenMobile, setIsSidebarOpenMobile] = useState(false);

  const googleMapRef = useRef<google.maps.Map | null>(null);

  const googleMapsApiKey = (import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '').trim();
  const hasValidGoogleKey = Boolean(
    googleMapsApiKey &&
    !googleMapsApiKey.includes('placeholder') &&
    googleMapsApiKey.startsWith('AIza')
  );

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: hasValidGoogleKey ? googleMapsApiKey : '',
  });

  // Fetch spots on mount
  const loadSpots = useCallback(async () => {
    try {
      const res = await fetchSpots();
      setSpots(res.spots);
    } catch (err) {
      console.error('Failed to load spots', err);
    }
  }, []);

  useEffect(() => {
    loadSpots();
  }, [loadSpots]);

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const allCount = spots.length;
    let museum = 0;
    let gallery = 0;
    let library = 0;

    spots.forEach((s) => {
      if (s.category === 'museum') museum++;
      else if (s.category === 'gallery') gallery++;
      else if (s.category === 'library') library++;
    });

    return {
      all: allCount,
      museum,
      gallery,
      library,
    };
  }, [spots]);

  // Filtered spots for map pins
  const filteredSpots = useMemo(() => {
    if (activeCategory === 'all') return spots;
    return spots.filter((s) => s.category.toLowerCase() === activeCategory.toLowerCase());
  }, [spots, activeCategory]);

  // Pan map when spot is selected
  const [activeWaypointId, setActiveWaypointId] = useState<string | null>(null);

  const handleSpotSelect = useCallback((spot: CulturalSpot) => {
    setSelectedSpot(spot);
    if (googleMapRef.current) {
      googleMapRef.current.panTo({ lat: spot.lat, lng: spot.lng });
      googleMapRef.current.setZoom(15);
    }
  }, []);

  const handleSelectWaypoint = useCallback(
    (waypoint: TrailWaypoint) => {
      setActiveWaypointId(waypoint.id);

      // Check if spot already exists in the dataset
      const matched = spots.find(
        (s) =>
          s.id === waypoint.matchedSpotId ||
          s.name.toLowerCase().includes(waypoint.name.toLowerCase().slice(0, 10))
      );

      if (matched) {
        handleSpotSelect(matched);
      } else {
        // Virtual spot so inspection drawer opens with full heritage information
        const virtualSpot: CulturalSpot = {
          id: waypoint.id,
          name: waypoint.name,
          category: waypoint.category === 'landmark' ? 'museum' : waypoint.category,
          subType: waypoint.subType,
          lat: waypoint.lat,
          lng: waypoint.lng,
          tagline: waypoint.description,
          neighborhood: 'Cubbon Park, Bengaluru',
          nearestMetro: 'Cubbon Park Metro / Sir M. Visvesvaraya Metro',
          entryFee: 'Free Heritage Landmark',
          timings: '06:00 AM – 08:00 PM (Daily)',
          status: 'verified',
        };
        handleSpotSelect(virtualSpot);
      }
    },
    [spots, handleSpotSelect]
  );

  const handleRecenterTrail = useCallback(() => {
    setSelectedSpot(null);
    setActiveWaypointId(null);
    if (googleMapRef.current) {
      googleMapRef.current.panTo({ lat: 12.9754, lng: 77.5945 });
      googleMapRef.current.setZoom(16);
    }
  }, []);

  const handleToggleCubbonTrail = useCallback(() => {
    setShowCubbonTrail((prev) => {
      const next = !prev;
      if (next) {
        setSelectedSpot(null);
        setActiveWaypointId(null);
        if (googleMapRef.current) {
          googleMapRef.current.panTo({ lat: 12.9754, lng: 77.5945 });
          googleMapRef.current.setZoom(16);
        }
      } else {
        setActiveWaypointId(null);
      }
      return next;
    });
  }, []);

  const onGoogleMapLoad = useCallback((map: google.maps.Map) => {
    googleMapRef.current = map;
  }, []);

  const onGoogleMapUnmount = useCallback(() => {
    googleMapRef.current = null;
  }, []);

  const useGoogleMaps = hasValidGoogleKey && isLoaded && !loadError;

  const handleEnterMapFromLanding = useCallback(
    (target?: MapNavigationTarget) => {
      if (target?.cubbonTrail) {
        setShowCubbonTrail(true);
      }
      if (target?.category) {
        setActiveCategory(target.category);
      }
      if (target?.spotId) {
        const found = spots.find(
          (s) =>
            s.id === target.spotId ||
            s.name.toLowerCase().includes(target.spotId!.toLowerCase())
        );
        if (found) {
          handleSpotSelect(found);
        }
      } else if (target?.neighborhood) {
        const foundInNeighborhood = spots.find((s) =>
          (s.neighborhood || '').toLowerCase().includes(target.neighborhood!.toLowerCase())
        );
        if (foundInNeighborhood) {
          handleSpotSelect(foundInNeighborhood);
        }
      }
      setViewMode('map');
    },
    [spots, handleSpotSelect]
  );

  if (viewMode === 'landing') {
    return (
      <>
        <LandingPage
          onEnterMap={handleEnterMapFromLanding}
          onOpenAddSpot={() => setIsAddModalOpen(true)}
          spotsCount={spots.length}
        />
        <AddSpotModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSpotAdded={loadSpots}
        />
      </>
    );
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#f8fafc] text-slate-900 flex flex-col font-sans select-none">
      <AmbientGlow />

      {/* 1. SINGLE COHESIVE FLOATING GLASS HEADER ISLAND (z-30) */}
      <header className="fixed top-3 sm:top-4 inset-x-3 sm:inset-x-6 md:inset-x-8 z-30 max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-3 bg-white/75 backdrop-blur-2xl border border-white/90 shadow-[0_12px_40px_-10px_rgba(15,23,42,0.08)] ring-1 ring-slate-900/5 px-3 sm:px-4 py-2 rounded-2xl pointer-events-auto">
        {/* Left: Brand Badge & Mobile Sidebar Trigger */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={() => setIsSidebarOpenMobile(true)}
            className="md:hidden p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-600 cursor-pointer"
            title="Open Directory"
          >
            <Menu className="w-4 h-4" />
          </button>

          {/* Return to Home / Landing Page Button */}
          <button
            id="back-to-landing-btn"
            onClick={() => setViewMode('landing')}
            className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 hover:text-slate-950 transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-medium"
            title="Return to Landing Page"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-indigo-600" />
            <span className="hidden sm:inline">Home</span>
          </button>

          <div
            onClick={() => setViewMode('landing')}
            className="flex items-center gap-2 sm:gap-2.5 cursor-pointer hover:opacity-90 transition-opacity"
            title="Return to Landing Page"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-tr from-indigo-500 via-sky-500 to-teal-500 flex items-center justify-center shadow-md shadow-indigo-500/25 shrink-0">
              <Compass className="w-4 h-4 text-white" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-bold text-sm sm:text-base tracking-tight text-slate-900 whitespace-nowrap">
                ನಮ್ಮ Cultour
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-mono border border-indigo-200 font-semibold">
                BLR
              </span>
            </div>
          </div>
        </div>

        {/* Center: Category Filter Tabs */}
        <div className="hidden md:flex items-center justify-center flex-1 max-w-xl mx-2">
          <CategoryPills
            activeCategory={activeCategory}
            onSelectCategory={(cat) => {
              setActiveCategory(cat);
              setSelectedSpot(null);
            }}
            counts={categoryCounts}
          />
        </div>

        {/* Right: Actions Group (Trail Toggle, Map Layer Toggle, Add Spot) */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Vertical Divider */}
          <div className="h-5 w-px bg-slate-200 hidden sm:block mx-0.5" />

          {/* Cubbon Cultural Trail Toggle */}
          <button
            id="cubbon-trail-toggle-btn"
            onClick={handleToggleCubbonTrail}
            className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer border whitespace-nowrap active:scale-95 ${
              showCubbonTrail
                ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-800 shadow-sm ring-1 ring-emerald-400/40'
                : 'bg-slate-100 hover:bg-slate-200/80 border-slate-200 text-slate-700 hover:text-slate-950'
            }`}
            title="Toggle animated Cubbon Park pedestrian circuit"
          >
            <Route
              className={`w-3.5 h-3.5 ${
                showCubbonTrail ? 'text-emerald-600 animate-pulse' : 'text-slate-500'
              }`}
            />
            <span>Cubbon Trail</span>
            {showCubbonTrail && (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping ml-0.5" />
            )}
          </button>

          {/* Map Layer Toggle (Interactive Streets vs Satellite) */}
          <button
            onClick={() => setMapLayer(mapLayer === 'streets' ? 'satellite' : 'streets')}
            className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer border whitespace-nowrap ${
              mapLayer === 'satellite'
                ? 'bg-sky-500/15 border-sky-400/30 text-sky-800 shadow-sm'
                : 'bg-slate-100 hover:bg-slate-200/80 border-slate-200 text-slate-700 hover:text-slate-950'
            }`}
            title={`Switch map view (currently ${mapLayer === 'streets' ? 'Voyager Streets' : 'Satellite Imagery'})`}
          >
            <Layers className="w-3.5 h-3.5 text-indigo-600" />
            <span className="hidden lg:inline capitalize">{mapLayer}</span>
          </button>

          {/* Add Spot Button */}
          <button
            id="add-spot-btn"
            onClick={() => setIsAddModalOpen(true)}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-teal-500 hover:from-indigo-500 hover:to-teal-400 text-white font-display font-semibold text-xs transition-all shadow-md shadow-indigo-500/25 flex items-center gap-1.5 cursor-pointer active:scale-95 whitespace-nowrap"
          >
            <Plus className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden sm:inline">Add Spot</span>
          </button>
        </div>
      </header>

      {/* Mobile Secondary Category Bar */}
      <div className="md:hidden fixed top-16 left-0 right-0 z-30 px-3 py-1 flex justify-center pointer-events-auto">
        <CategoryPills
          activeCategory={activeCategory}
          onSelectCategory={(cat) => {
            setActiveCategory(cat);
            setSelectedSpot(null);
          }}
          counts={categoryCounts}
        />
      </div>

      {/* 2. FULL-BLEED REAL MAP CANVAS (100vw x 100vh) */}
      <main className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        {useGoogleMaps ? (
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '100%' }}
            center={MAP_CENTER}
            zoom={13}
            onLoad={onGoogleMapLoad}
            onUnmount={onGoogleMapUnmount}
            options={{
              styles: DAYLIGHT_MAP_STYLES,
              disableDefaultUI: true,
              zoomControl: true,
              zoomControlOptions: {
                position: typeof google !== 'undefined' ? google.maps.ControlPosition.RIGHT_BOTTOM : 9,
              },
              backgroundColor: '#f8fafc',
              clickableIcons: false,
              mapTypeId: mapLayer === 'satellite' ? 'hybrid' : 'roadmap',
            }}
          >
            {filteredSpots.map((spot) => {
              const isSelected = selectedSpot?.id === spot.id;
              return (
                <MarkerF
                  key={spot.id}
                  position={{ lat: spot.lat, lng: spot.lng }}
                  onClick={() => handleSpotSelect(spot)}
                  icon={getMarkerIcon(spot.category, isSelected)}
                  title={spot.name}
                  zIndex={isSelected ? 1000 : 1}
                />
              );
            })}

            {/* Cubbon Loop Polyline on Google Maps */}
            {showCubbonTrail && (
              <PolylineF
                path={CUBBON_LOOP_GOOGLE_COORDS}
                options={{
                  strokeColor: '#10b981',
                  strokeOpacity: 0.95,
                  strokeWeight: 4,
                }}
              />
            )}
          </GoogleMap>
        ) : (
          /* Leaflet with Dynamic Cartography & Modern Teardrop Pins */
          <LeafletMap
            spots={filteredSpots}
            selectedSpot={selectedSpot}
            onSelectSpot={handleSpotSelect}
            showCubbonTrail={showCubbonTrail}
            mapLayer={mapLayer}
          />
        )}
      </main>

      {/* 3. LEFT FLOATING DIRECTORY SIDEBAR (z-20, top-20, below navbar) */}
      <SpotSidebar
        spots={spots}
        selectedSpot={selectedSpot}
        activeCategory={activeCategory}
        onSelectSpot={handleSpotSelect}
        isOpenMobile={isSidebarOpenMobile}
        onCloseMobile={() => setIsSidebarOpenMobile(false)}
      />

      {/* 4. RIGHT FLOATING INSPECTION CARD (z-20, top-20, below navbar) */}
      <SpotDrawer
        spot={selectedSpot}
        onClose={() => setSelectedSpot(null)}
      />

      {/* 4.5. INTERACTIVE & CLICKABLE CUBBON TRAIL HUD */}
      <CubbonTrailHUD
        isVisible={showCubbonTrail}
        onClose={() => {
          setShowCubbonTrail(false);
          setActiveWaypointId(null);
        }}
        onSelectWaypoint={handleSelectWaypoint}
        onRecenterTrail={handleRecenterTrail}
        activeWaypointId={activeWaypointId}
      />

      {/* 5. ADD SPOT MODAL */}
      <AddSpotModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSpotAdded={loadSpots}
      />
    </div>
  );
}

export default App;
