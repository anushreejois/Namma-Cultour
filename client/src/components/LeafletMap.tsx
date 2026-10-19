import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { CulturalSpot } from '../types/spot';

interface LeafletMapProps {
  spots: CulturalSpot[];
  selectedSpot: CulturalSpot | null;
  onSelectSpot: (spot: CulturalSpot) => void;
  showCubbonTrail: boolean;
  mapLayer?: 'streets' | 'satellite';
}

const BENGALURU_CENTER: [number, number] = [12.9716, 77.5946];

// Cubbon Cultural Loop coordinates (complete heritage pedestrian circuit)
const CUBBON_LOOP_COORDS: [number, number][] = [
  [12.9754, 77.5929], // State Central Library (Seshadri Iyer Memorial Hall)
  [12.9772, 77.5925], // High Court of Karnataka (Attara Kacheri)
  [12.9785, 77.5920], // Vidhana Soudha South Gate
  [12.9775, 77.5948], // Cubbon Park Bamboo Groves & Victoria Statue
  [12.9753, 77.5958], // Government Museum (1877)
  [12.9752, 77.5960], // Venkatappa Art Gallery
  [12.9752, 77.5963], // Visvesvaraya Industrial & Technological Museum (VITM)
  [12.9736, 77.5945], // Cubbon Park Bandstand & Walking Promenade
  [12.9744, 77.5930], // King Edward VII Statue
  [12.9754, 77.5929], // Loop returns to State Central Library
];

interface CategoryTheme {
  border: string;
  bgTint: string;
  badge: string;
  vectorSvg: string;
}

function getCategoryTheme(category: string): CategoryTheme {
  switch (category.toLowerCase()) {
    case 'museum':
      return {
        border: '#f59e0b', // Rich Amber
        bgTint: '#fef3c7', // Warm Creamy Amber Tint
        badge: '#b45309',
        // Crisp Classical Landmark / Museum Colonnade Vector (NOT an emoji)
        vectorSvg: `
          <g fill="#b45309" stroke="#b45309" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="18,10.5 11,14.5 25,14.5" stroke-width="1.2"/>
            <rect x="11.5" y="14.8" width="13" height="1.4" rx="0.5" stroke-width="0"/>
            <rect x="12.5" y="17" width="1.8" height="5.5" rx="0.5" stroke-width="0"/>
            <rect x="16" y="17" width="1.8" height="5.5" rx="0.5" stroke-width="0"/>
            <rect x="19.5" y="17" width="1.8" height="5.5" rx="0.5" stroke-width="0"/>
            <rect x="23" y="17" width="1.8" height="5.5" rx="0.5" stroke-width="0"/>
            <rect x="10.5" y="23" width="15" height="1.6" rx="0.5" stroke-width="0"/>
          </g>
        `,
      };
    case 'gallery':
      return {
        border: '#c2410c', // Warm Terracotta / Bronze - STRICTLY NO PINK!
        bgTint: '#ffedd5', // Warm Peach Tint
        badge: '#9a3412',
        // Crisp Artist Palette with Thumb Hole & 4 Pigment Dots (Vector, not cartoon emoji)
        vectorSvg: `
          <g>
            <path
              d="M18 10C13.6 10 10 13.5 10 17.8c0 3.3 2.1 5 4.5 5 1.1 0 1.9-.6 2.5-1.3.4-.5.7-.7 1.2-.7.8 0 1.5.7 1.5 1.5 0 .3-.1.6-.2.9-.4 1.2.5 2.1 1.7 2.1 3.8 0 6.8-3.5 6.8-7.5C28 13.5 23.5 10 18 10Z"
              fill="#9a3412"
              fill-opacity="0.18"
              stroke="#9a3412"
              stroke-width="1.7"
              stroke-linejoin="round"
            />
            <ellipse cx="19" cy="20.5" rx="1.3" ry="1.1" fill="#ffedd5" stroke="#9a3412" stroke-width="1"/>
            <circle cx="14" cy="14" r="1.25" fill="#ef4444" />
            <circle cx="17.8" cy="12.5" r="1.25" fill="#f59e0b" />
            <circle cx="21.8" cy="14" r="1.25" fill="#3b82f6" />
            <circle cx="23.5" cy="17.5" r="1.25" fill="#10b981" />
          </g>
        `,
      };
    case 'library':
      return {
        border: '#0284c7', // Electric Sky Blue / Ocean Cyan
        bgTint: '#e0f2fe', // Soft Sky Blue Tint
        badge: '#0369a1',
        // Crisp Open Book with Spine and Detail Lines (Vector, not cartoon emoji)
        vectorSvg: `
          <g stroke="#0369a1" stroke-linecap="round" stroke-linejoin="round">
            <path
              d="M18 13.5C16.2 12.2 13.8 11.8 11.5 11.8A1 1 0 0 0 10.5 12.8v8.6a.5.5 0 0 0 .6.5c2.1.2 4.4.8 6.4 2.1 2-1.3 4.3-1.9 6.4-2.1a.5.5 0 0 0 .6-.5v-8.6a1 1 0 0 0-1-1c-2.3 0-4.7.4-6.5 1.7Z"
              fill="#0369a1"
              fill-opacity="0.18"
              stroke-width="1.7"
            />
            <line x1="18" y1="13.5" x2="18" y2="23.5" stroke-width="1.7" />
            <line x1="13" y1="15.8" x2="16" y2="16.5" stroke-width="1.2" stroke-opacity="0.75" />
            <line x1="13" y1="18.5" x2="16" y2="19.2" stroke-width="1.2" stroke-opacity="0.75" />
            <line x1="20" y1="16.5" x2="23" y2="15.8" stroke-width="1.2" stroke-opacity="0.75" />
            <line x1="20" y1="19.2" x2="23" y2="18.5" stroke-width="1.2" stroke-opacity="0.75" />
          </g>
        `,
      };
    default:
      return {
        border: '#06b6d4',
        bgTint: '#cffafe',
        badge: '#0e7490',
        vectorSvg: `
          <g stroke="#0e7490" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none">
            <path d="M18 24s-5-4.5-5-8a5 5 0 0 1 10 0c0 3.5-5 8-5 8Z" fill="#0e7490" fill-opacity="0.2"/>
            <circle cx="18" cy="16" r="2" fill="#0e7490"/>
          </g>
        `,
      };
  }
}

/**
 * Creates authentic live-map teardrop pins matching the user reference image:
 * - Solid crisp white body (#ffffff)
 * - Distinct colored border (Amber, Terracotta, Sky Blue - strictly no pink!)
 * - Soft pastel inner circular medallion matching the category tint
 * - Authentic cartographic vector POI glyphs (No cartoon emojis!)
 * - Ground contact shadow & active radar pulse ring for selected spot
 * - Smooth hover lift and elevation
 */
function createMarkerIcon(category: string, isSelected: boolean): L.DivIcon {
  const theme = getCategoryTheme(category);
  const w = isSelected ? 42 : 36;
  const h = isSelected ? 52 : 46;
  const shadow = isSelected
    ? 'drop-shadow(0 8px 18px rgba(15, 23, 42, 0.45)) drop-shadow(0 2px 5px rgba(15, 23, 42, 0.25))'
    : 'drop-shadow(0 4px 10px rgba(15, 23, 42, 0.28)) drop-shadow(0 1px 3px rgba(15, 23, 42, 0.16))';

  const html = `
    <div class="cultour-teardrop-marker" style="
      width: ${w}px;
      height: ${h}px;
      position: relative;
      cursor: pointer;
      user-select: none;
      transform: ${isSelected ? 'scale(1.15) translateY(-5px)' : 'scale(1)'};
      transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
    ">
      <!-- Live Map Ground Anchor Radar Beacon (Active when selected) -->
      ${
        isSelected
          ? `
        <div class="cultour-beacon-ring" style="
          position: absolute;
          left: 50%;
          bottom: 0px;
          width: 28px;
          height: 28px;
          transform: translate(-50%, 50%);
          pointer-events: none;
        ">
          <div style="
            position: absolute;
            inset: 0;
            border-radius: 9999px;
            background-color: ${theme.border};
            opacity: 0.35;
            animation: cultour-beacon-ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite;
          "></div>
          <div style="
            position: absolute;
            inset: 6px;
            border-radius: 9999px;
            background-color: ${theme.border};
            opacity: 0.75;
          "></div>
        </div>
      `
          : ''
      }

      <svg width="${w}" height="${h}" viewBox="0 0 36 46" fill="none" xmlns="http://www.w3.org/2000/svg" style="
        filter: ${shadow};
      ">
        <!-- Ground Contact Shadow -->
        <ellipse cx="18" cy="44.5" rx="5.5" ry="1.8" fill="rgba(15, 23, 42, 0.35)" />

        <!-- Solid Modern White Teardrop Pin Body -->
        <path
          d="M18 1C8.611 1 1 8.611 1 18C1 28.5 15.5 42.5 18 45C20.5 42.5 35 28.5 35 18C35 8.611 27.389 1 18 1Z"
          fill="#ffffff"
          stroke="${theme.border}"
          stroke-width="2.5"
        />

        <!-- Subtle Inner Tint Circle (Matches Image Reference) -->
        <circle cx="18" cy="18" r="13" fill="${theme.bgTint}" />

        <!-- Crisp Professional Vector POI Icon (No cartoon emojis!) -->
        ${theme.vectorSvg}
      </svg>
    </div>
  `;

  return L.divIcon({
    html,
    className: 'cultour-modern-pin',
    iconSize: [w, h],
    iconAnchor: [w / 2, h],
  });
}

export const LeafletMap = ({
  spots,
  selectedSpot,
  onSelectSpot,
  showCubbonTrail,
  mapLayer = 'streets',
}: LeafletMapProps) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const trailLayerRef = useRef<L.LayerGroup | null>(null);

  // 1. Initialize Leaflet Map base instance
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: BENGALURU_CENTER,
      zoom: 13,
      zoomControl: false,
      attributionControl: false,
    });

    // Zoom controls at bottom-right
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Markers layer
    const markersLayer = L.layerGroup().addTo(map);
    markersLayerRef.current = markersLayer;

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // 2. Dynamic Tile Layer swapping (Streets vs. Satellite)
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
      tileLayerRef.current = null;
    }

    const cartoKey = (import.meta.env.VITE_CARTO_API_KEY || '').trim();

    let tileUrl = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
    let attribution = '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors';

    if (mapLayer === 'satellite') {
      tileUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
      attribution = '&copy; <a href="https://www.esri.com/" target="_blank" rel="noreferrer">Esri</a> World Imagery';
    } else if (cartoKey) {
      tileUrl = `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png?key=${cartoKey}`;
      attribution = '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions" target="_blank" rel="noreferrer">CARTO</a>';
    }

    const layer = L.tileLayer(tileUrl, {
      maxZoom: 19,
      attribution,
      keepBuffer: 6,
    }).addTo(map);

    tileLayerRef.current = layer;
  }, [mapLayer]);

  // 2. Render Markers with depth-sorted zIndex to avoid visual clumping
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersLayer = markersLayerRef.current;
    if (!map || !markersLayer) return;

    markersLayer.clearLayers();

    spots.forEach((spot) => {
      const isSelected = selectedSpot?.id === spot.id;
      const theme = getCategoryTheme(spot.category);
      const icon = createMarkerIcon(spot.category, isSelected);

      // Depth sort: lower latitude (closer to viewer) gets higher zIndex
      const zIndexOffset = isSelected ? 10000 : Math.round((90 - spot.lat) * 1000);

      const marker = L.marker([spot.lat, spot.lng], {
        icon,
        title: spot.name,
        zIndexOffset,
      });

      marker.on('click', () => {
        onSelectSpot(spot);
      });

      // Clean, elegant tooltip on hover
      marker.bindTooltip(
        `<div style="font-family:'Space Grotesk',sans-serif; font-size:12px; font-weight:600; color:#0f172a; background:#ffffff; border:1px solid rgba(0,0,0,0.12); padding:6px 11px; border-radius:8px; box-shadow:0 8px 24px rgba(0,0,0,0.18); display:flex; align-items:center; gap:6px;">
          <span style="display:inline-block; width:8px; height:8px; border-radius:9999px; background:${theme.border};"></span>
          <span>${spot.name}</span>
        </div>`,
        {
          direction: 'top',
          offset: [0, isSelected ? -52 : -46],
          opacity: 1,
          className: 'cultour-leaflet-tooltip',
        }
      );

      markersLayer.addLayer(marker);
    });
  }, [spots, selectedSpot, onSelectSpot]);

  // 3. Pan / Fly to selected spot
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !selectedSpot) return;

    map.flyTo([selectedSpot.lat, selectedSpot.lng], 15, {
      duration: 1.2,
      easeLinearity: 0.25,
    });
  }, [selectedSpot]);

  // 4. Toggle Cubbon Trail Loop Polyline (Emerald) & Auto-Fly to Cubbon Park
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (trailLayerRef.current) {
      map.removeLayer(trailLayerRef.current);
      trailLayerRef.current = null;
    }

    if (showCubbonTrail) {
      // Glow underlayer
      const glowLine = L.polyline(CUBBON_LOOP_COORDS, {
        color: '#10b981',
        weight: 12,
        opacity: 0.35,
        lineCap: 'round',
        lineJoin: 'round',
      });

      // Sharp animated dash line
      const trail = L.polyline(CUBBON_LOOP_COORDS, {
        color: '#10b981',
        weight: 5,
        opacity: 0.95,
        dashArray: '10, 8',
        className: 'cultour-trail-animated',
        lineCap: 'round',
        lineJoin: 'round',
      });

      const group = L.layerGroup([glowLine, trail]).addTo(map);
      trailLayerRef.current = group;

      // Automatically fly to Cubbon Park and zoom in so the trail is immediately visible
      map.fitBounds(trail.getBounds().pad(0.35), {
        animate: true,
        duration: 1.2,
      });
    }
  }, [showCubbonTrail]);

  return (
    <div
      ref={mapContainerRef}
      className="absolute inset-0 w-full h-full z-0"
      style={{ isolation: 'isolate' }}
    />
  );
};
