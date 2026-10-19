import type { CulturalSpot, SpotSubmission, SpotSubmitResponse } from '../types/spot';
import { CULTURAL_SPOTS } from '../data/culturalSpots';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

/**
 * Normalizes spot object so both camelCase and snake_case properties are consistently populated.
 */
function normalizeSpot(spot: CulturalSpot): CulturalSpot {
  return {
    ...spot,
    subType: spot.subType || spot.sub_type || 'Cultural Heritage',
    sub_type: spot.sub_type || spot.subType || 'Cultural Heritage',
    nearestMetro: spot.nearestMetro || spot.nearest_metro || 'Namma Metro',
    nearest_metro: spot.nearest_metro || spot.nearestMetro || 'Namma Metro',
    entryFee: spot.entryFee || spot.entry_fee || 'Free',
    entry_fee: spot.entry_fee || spot.entryFee || 'Free',
    kannadaName: spot.kannadaName || spot.kannada_name || undefined,
    kannada_name: spot.kannada_name || spot.kannadaName || undefined,
  };
}

/**
 * Fetches all cultural spots, with optional category filter.
 * Falls back to static CULTURAL_SPOTS if API server is offline.
 */
export async function fetchSpots(category?: string): Promise<{ spots: CulturalSpot[]; isLive: boolean }> {
  const queryParam = category && category !== 'all' ? `?category=${encodeURIComponent(category)}` : '';
  const url = `${API_BASE_URL}/api/spots${queryParam}`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
      },
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`Server responded with ${res.status}: ${res.statusText}`);
    }

    const data: CulturalSpot[] = await res.json();
    if (Array.isArray(data) && data.length > 0) {
      return {
        spots: data.map(normalizeSpot),
        isLive: true,
      };
    }

    throw new Error('Empty response from API');
  } catch (err) {
    console.warn(`[Namma Cultour API] Unable to connect to ${url}. Falling back to static curated dataset.`, err);
    let filtered = CULTURAL_SPOTS.map(normalizeSpot);
    if (category && category !== 'all') {
      filtered = filtered.filter((s) => s.category.toLowerCase() === category.toLowerCase());
    }
    return {
      spots: filtered,
      isLive: false,
    };
  }
}

/**
 * Fetches single spot by ID with fallback.
 */
export async function fetchSpotById(id: string): Promise<CulturalSpot | null> {
  const url = `${API_BASE_URL}/api/spots/${encodeURIComponent(id)}`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data: CulturalSpot = await res.json();
      return normalizeSpot(data);
    }
  } catch {
    // fallback to static
  }

  const fallback = CULTURAL_SPOTS.find((s) => s.id === id);
  return fallback ? normalizeSpot(fallback) : null;
}

/**
 * Submits community curated spot to the API.
 */
export async function submitSpot(spotData: SpotSubmission): Promise<SpotSubmitResponse> {
  const url = `${API_BASE_URL}/api/spots/submit`;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(spotData),
    });

    if (res.ok) {
      return await res.json();
    }
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.detail || 'Failed to submit spot');
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Network error';
    throw new Error(msg);
  }
}
