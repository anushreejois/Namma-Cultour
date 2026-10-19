export type Category = 'museum' | 'gallery' | 'library';

export type FilterCategory = 'all' | Category;

export interface CulturalSpot {
  id: string;
  name: string;
  kannadaName?: string | null;
  kannada_name?: string | null;
  category: Category;
  subType: string;
  sub_type?: string;
  lat: number;
  lng: number;
  tagline?: string | null;
  neighborhood?: string | null;
  nearestMetro?: string | null;
  nearest_metro?: string | null;
  entryFee?: string | null;
  entry_fee?: string | null;
  timings?: string | null;
  status?: 'verified' | 'pending';
}

export interface SpotSubmission {
  name: string;
  kannadaName?: string | null;
  category: Category;
  subType: string;
  lat: number;
  lng: number;
  tagline?: string | null;
  neighborhood?: string | null;
  nearestMetro?: string | null;
  entryFee?: string | null;
  timings?: string | null;
  status?: 'pending' | 'verified';
}

export interface SpotSubmitResponse {
  status: string;
  id: string;
  message?: string;
  spot?: CulturalSpot;
}
