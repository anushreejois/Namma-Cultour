# **THE VIBE CODING BLUEPRINT: NAMMA CULTOUR**
# **Complete Project Documentation & Technical Specification**

| Property | Value |
| :--- | :--- |
| **Project** | Namma Cultour (ನಮ್ಮ Cultour) — Bengaluru Cultural, Archive & Heritage Explorer |
| **System Standard** | The Vibe Coding Blueprint Framework |
| **Target Completion** | 6 to 8 Hour Sprint |

# **Table of Contents**
1. 01 — PRD.md (Product Requirements Document)
2. 02 — UX_FLOWS.md (User Experience & Journeys)
3. 03 — DESIGN_SYSTEM.md (Visual Language & Motion)
4. 04 — ARCHITECTURE.md (Technical Topology & Patterns)
5. 05 — DATABASE.md (Master Typed Data Store: 35+ Spots)
6. 06 — API.md (External & Routing Contracts)
7. 07 — SECURITY.md (Keys & Referrer Restrictions)
8. 08 — CODE_STYLE.md (Conventions & Pattern Rules)
9. 09 — TESTING.md (Verification Matrix & Definition of Done)
10. 10 — AGENTS.md (Operational Rules for AI Coding Agents)
11. GIT_WORKFLOW.md (Git Conventions & PR Guidelines)

---

# **01 — PRD.md**
# **Product Requirements Document**

## **1. Product Overview**
  - **Product Name:** Namma Cultour (ನಮ್ಮ Cultour)
  - **One-Line Description:** An ambient, dark-mode geospatial discovery and heritage navigation web application mapping 35+ museums, public libraries, and hidden-gem art studios across Bengaluru with interactive walking loops and tactile glassmorphism UI.
  - **Product Type:** Geospatial Discovery Web App / Interactive City Guide
  - **Primary Platform:** Web (Desktop, Tablet, and Mobile Responsive)
  - **Primary Region:** Bengaluru (Bangalore), Karnataka, India

## **2. Problem Statement**
Discovering Bengaluru’s deep cultural, literary, and artistic institutions—ranging from century-old public reading archives in Cubbon Park to hidden courtyard studios in Shanthi Nagar—is fragmented across outdated government portals, commercial search spam, and static blogs. Existing map apps present excessive road noise, lack cultural categorization, and fail to provide specialized pedestrian circuits for heritage exploration.

## **3. Goals & Success Criteria**
  - **Primary Goal:** Provide a fluid, zero-clutter map explorer indexing curated museums, reading rooms, and hidden art studios in Bengaluru, ready for immediate exploration and route planning.
  - **Secondary Goals:**
      - Implement an interactive "Cubbon Cultural Loop" pedestrian route with live animated polyline flow and travel estimates.
      - Allow granular filtering across 4 categories: *All*, *Museums*, *Art Galleries & Hidden Studios*, and *Libraries & Archives*.
      - Provide instant context for every spot: transit/metro proximity, operational hours, entry guidelines, and one-click navigation launch.
  - **Sprint Timeline:** 6 to 8 hours implementation and deployment.

## **4. Target User Personas**
1. **The Urban Walker & Heritage Explorer:** Wants self-guided walking routes with real pedestrian distances and turn-by-turn navigation access.
2. **The Student, Researcher & Reader:** Looks for quiet public archives, indological collections, and membership-based reading rooms (e.g., State Central Library, Mythic Society, IIWC).
3. **The Contemporary Art Enthusiast:** Searches for hidden-gem galleries, residency studios, and offbeat cultural centers outside commercial circuits.

## **5. User Stories**
  - **As an explorer**, I want to filter locations by category so that I can discover only art galleries or quiet libraries according to my plan.
  - **As a pedestrian**, I want to toggle the "Cubbon Cultural Loop" to see the exact walking route connecting historic institutions inside and around Cubbon Park.
  - **As a commuter**, I want to see the nearest Namma Metro station for every venue so that I can easily plan my transit.
  - **As a mobile user**, I want to swipe through a bottom horizontal card dock synced with map pins without obscuring the canvas.

## **6. Scope & Non-Goals**
  - **In Scope (MVP):**
      - Vector dark map canvas centered at `12.9716, 77.5946`.
      - 35+ curated, verified spots across Bengaluru with geocoordinates, metro proximity, and taglines.
      - Motion Primitives sliding pill filter with spring physics.
      - Google DirectionsService integration for the animated Cubbon pedestrian route.
      - Tactile glassmorphism detail drawer and bottom preview carousel.
      - Direct deep-link launching Google Maps turn-by-turn navigation.
  - **Community Curation ("Add a Cultural Spot"):**
      - Guest-friendly ("Simple As You Go") flow with zero mandatory login barrier.
      - Floating HUD button opening a glassmorphic modal form to submit new spots.
      - Submissions saved with status `pending` for moderation.
  - **Out of Scope (Non-Goals):**
      - User authentication, user profiles, or cloud favorites.
      - Ticketing checkout or booking payment gateways.
      - Crowdsourced reviews or public commentary features.

## **7. Definition of Done**
  - Map renders centered on Bengaluru with dark vector styling and without watermark errors.
  - All 35+ markers are plotted with distinct category-based color-coding and icons.
  - Category switching animates smoothly and filters both map pins and bottom carousel cards.
  - Walking polyline renders real walking footpaths via DirectionsService with a 60fps moving SVG dash.
  - Drawer inspection modal functions smoothly across mobile touch and desktop click events.
  - Production build succeeds (`npm run build`) with zero TypeScript diagnostic errors.

---

# **02 — UX_FLOWS.md**
# **User Experience & Flows**

## **Flow 1: Category Filtering & Discovery**
```text
Landing View (All 35+ Pins displayed)
  │
  ▼
User clicks "🎨 Art & Studios" in Header Pill
  │
  ▼
Motion Primitives Pill glides to active tab with spring transition
  │
  ▼
Map removes non-gallery pins; re-renders 13 curated galleries & hidden studios
  │
  ▼
Bottom carousel filters to match active gallery cards
Flow 2: Cubbon Cultural Loop Route Activation
User clicks floating "Cubbon Cultural Loop" HUD button
  │
  ▼
Button switches to active state with pulse indicator
  │
  ▼
App calls DirectionsService (WALKING mode) across 4 key landmarks:
  • State Central Library
  • Government Museum
  • Venkatappa Art Gallery
  • Visvesvaraya Industrial and Technological Museum (VITM)
  │
  ▼
Two-layer neon polyline renders on map; animated SVG dash begins flowing
  │
  ▼
Metrics chip animates in displaying calculated distance (e.g., "1.4 km • 18 mins walk")
Flow 3: Spot Inspection & Navigation Launch
User clicks map pin or card from bottom dock
  │
  ▼
Map camera smoothly pans to spot coordinates (map.panTo)
  │
  ▼
Glassmorphic Detail Drawer slides in from right (Desktop) or bottom (Mobile)
  │
  ▼
User reviews: Category, SubType, Nearest Metro, Timings, Entry rules, Tagline
  │
  ▼
User clicks "Navigate via Google Maps"
  │
  ▼
External tab opens Google Maps with destination pre-filled
03 — DESIGN_SYSTEM.mdVisual Language & Design System1. Style & Visual Direction
Style & Atmosphere: Tactile Glassmorphism meets Ambient Cyber-Cartography. Deep slate canvas (#020617), luminous neon accents, generous backdrop blurs, and organic ambient lighting.
Philosophy: Clean vector map geometry where cultural institutions stand out as radiant nodes.
2. Design Tokens
/* Core Canvas & Surfaces */
--bg-canvas: #020617; /* slate-950 */
--surface-glass: rgba(15, 23, 42, 0.75); /* slate-900 at 75% opacity */
--surface-card: rgba(30, 41, 59, 0.60); /* slate-800 at 60% opacity */
--border-glass: rgba(255, 255, 255, 0.12);
--border-highlight: rgba(56, 189, 248, 0.40);

/* Category Color Tokens */
--color-museum: #f59e0b; /* Amber / Gold */
--color-gallery: #ec4899; /* Fuchsia / Rose */
--color-library: #38bdf8; /* Sky Blue */
--color-trail: #06b6d4; /* Neon Cyan */

/* Typography */
--text-primary: #f8fafc; /* Slate 50 */
--text-secondary: #94a3b8; /* Slate 400 */
--text-accent: #38bdf8; /* Sky 400 */
3. Typography & Fonts
Primary Display Font: Space Grotesk (Titles, section headers, card names, navigation metrics)
Body & UI Font: Inter (Descriptions, operational details, badges, button labels)
Code & Data Font: Roboto Mono (Coordinates, timestamps, route distances)
4. Motion & Micro-Interactions
Tab Indicator: Framer Motion layoutId="activeFilterPill" with spring parameters: { type: "spring", stiffness: 400, damping: 30 }.
Card Hover Physics: whileHover={{ y: -6, scale: 1.02 }} and whileTap={{ scale: 0.98 }}.
Trail Animation: requestAnimationFrame continuously updating the SVG stroke-dash offset for smooth 60fps path flow without re-rendering React trees.
Drawer Modal: Smooth glide transition with backdrop blur overlay.
04 — ARCHITECTURE.mdTechnical Architecture & System Topology1. System Topology

Client-side Single Page Application (SPA) built with Vite, React 18, and TypeScript. All cartographic queries and route calculations are executed directly through the Google Maps JavaScript API SDK.
[ Client Browser ]
  ├── React 18 + TypeScript Application
  │    ├── State Store (Selected Spot, Active Category, Trail Visibility)
  │    ├── Tailwind CSS (Backdrop Blurs, Grid layouts, Ambient Orbs)
  │    └── Framer Motion (Morphing Pills, Drawer transitions)
  ├── Google Maps JS SDK Loader (@react-google-maps/api)
  │    ├── Map Canvas (Dark JSON theme stylers)
  │    ├── MarkerF Layers (SVG icons colored by category)
  │    ├── DirectionsService (Pedestrian route generation)
  │    └── PolylineF (Neon glow track + animated SVG dash)
  └── Local Data Engine (src/data/culturalSpots.ts - 35+ verified entries)
2. Directory Structure
src/
├── components/
│   ├── AmbientGlow.tsx        # Blurred mesh gradient background
│   ├── CategoryPills.tsx      # Motion Primitives animated filter bar
│   ├── CubbonTrail.tsx        # DirectionsService pedestrian polyline & animation
│   ├── SpotCard.tsx           # Horizontal dock place preview card
│   ├── SpotDrawer.tsx         # Detailed inspection modal with external link
│   └── AddSpotModal.tsx       # Glassmorphism community place submission form
├── data/
│   └── culturalSpots.ts       # 35+ Curated Bengaluru institutions
├── types/
│   └── spot.ts                # TypeScript interfaces
├── App.tsx                    # Root layout & GoogleMap orchestrator
├── main.tsx                   # App mounting entrypoint
└── index.css                  # Tailwind directives & glassmorphic utility rules
3. Cloud Architecture & Services
Frontend Hosting: Vercel / Cloudflare Pages
Backend API: FastAPI (Python) hosted on Render / Railway or Serverless endpoints
Dev Database: Supabase / Neon (Managed Serverless PostgreSQL)
Geospatial & Maps: Google Cloud Platform (Maps JavaScript API & Directions API)
05 — DATABASE.mdMaster Typed Data Store & Multi-Environment Postgres1. Schema Definition (src/types/spot.ts)
export type Category = 'museum' | 'gallery' | 'library';

export interface CulturalSpot {
  id: string;
  name: string;
  kannadaName?: string;
  category: Category;
  subType: string;
  lat: number;
  lng: number;
  tagline: string;
  neighborhood: string;
  nearestMetro: string;
  entryFee: string;
  timings: string;
  status?: 'verified' | 'pending';
}
2. Database Environments
Local Database: PostgreSQL running locally via Docker container (postgresql+psycopg2://postgres:postgres@localhost:5432/nammacultour_local)
Dev Database: Cloud PostgreSQL on Supabase or Neon (postgresql+psycopg2://<user>:<password>@<cloud-host>:5432/nammacultour_dev)
Environment selection controlled via DATABASE_URL in .env.
3. Migration Protocol via Alembic
Direct SQL mutations are strictly forbidden.
Schema changes managed via Alembic inside alembic/versions/.
Migration commands:
Auto-generate: alembic revision --autogenerate -m "description"
Local migration: alembic upgrade head
Dev Cloud DB migration: DATABASE_URL=<dev-url> alembic upgrade head
4. Database Schema: cultural_spots Table
Python
from alembic import op
import sqlalchemy as sa

def upgrade():
    op.create_table(
        'cultural_spots',
        sa.Column('id', sa.String(), primary_key=True),
        sa.Column('name', sa.String(), nullable=False),
        sa.Column('kannada_name', sa.String(), nullable=True),
        sa.Column('category', sa.String(), nullable=False),
        sa.Column('sub_type', sa.String(), nullable=False),
        sa.Column('lat', sa.Float(), nullable=False),
        sa.Column('lng', sa.Float(), nullable=False),
        sa.Column('tagline', sa.String(), nullable=True),
        sa.Column('neighborhood', sa.String(), nullable=True),
        sa.Column('nearest_metro', sa.String(), nullable=True),
        sa.Column('entry_fee', sa.String(), nullable=True),
        sa.Column('timings', sa.String(), nullable=True),
        sa.Column('status', sa.String(), default='verified')
    ) 
    # 05 — DATABASE.md
## Master Cultural Data Store (35 Curated Bengaluru Locations)

### Schema Definition (`src/types/spot.ts`)
```typescript
export type Category = 'museum' | 'gallery' | 'library';

export interface CulturalSpot {
  id: string;
  name: string;
  category: Category;
  subType: string;
  lat: number;
  lng: number;
  tagline: string;
  neighborhood: string;
  nearestMetro: string;
  entryFee: string;
  timings: string;
}
export const CULTURAL_SPOTS: CulturalSpot[] = [
  // ==========================================
  // 1. MUSEUMS (11 SPOTS)
  // ==========================================
  {
    id: 'vitm',
    name: 'Visvesvaraya Industrial & Tech Museum',
    category: 'museum',
    subType: 'Science & Engineering',
    lat: 12.9752,
    lng: 77.5963,
    tagline: 'Interactive mechanics, aerospace replicas, dynamic STEM exhibits and engine models.',
    neighborhood: 'Kasturba Road',
    nearestMetro: 'Cubbon Park Metro (550m)',
    entryFee: '₹85',
    timings: '09:30 AM – 06:00 PM'
  },
  {
    id: 'hal-museum',
    name: 'HAL Heritage Centre & Aerospace Museum',
    category: 'museum',
    subType: 'Aviation History',
    lat: 12.9554,
    lng: 77.6744,
    tagline: 'Static aircraft yard featuring Marut, Kiran, MiG-21 fighters, and flight simulators.',
    neighborhood: 'Old Airport Road',
    nearestMetro: 'Indiranagar Metro (6 km)',
    entryFee: '₹50',
    timings: '09:00 AM – 05:00 PM'
  },
  {
    id: 'gov-museum',
    name: 'Government Museum',
    category: 'museum',
    subType: 'Archaeology & Antiquity',
    lat: 12.9753,
    lng: 77.5958,
    tagline: 'One of India’s oldest museums, preserving historic sculpture and the ancient Halmidi inscription.',
    neighborhood: 'Kasturba Road',
    nearestMetro: 'Cubbon Park Metro (600m)',
    entryFee: '₹20',
    timings: '10:00 AM – 05:00 PM (Closed Mon)'
  },
  {
    id: 'brain-museum',
    name: 'NIMHANS Brain Museum',
    category: 'museum',
    subType: 'Neuroanatomy & Science',
    lat: 12.9379,
    lng: 77.5962,
    tagline: 'Rare educational museum showcasing actual human brain specimens and neurological science.',
    neighborhood: 'Hosur Road / Wilson Garden',
    nearestMetro: 'South End Circle (2.2 km)',
    entryFee: 'Free (Guided tours)',
    timings: 'Guided sessions Wed (2-3pm) & Sat (10am-12pm)'
  },
  {
    id: 'map-blr',
    name: 'Museum of Art & Photography (MAP)',
    category: 'museum',
    subType: 'Modern Art & Heritage',
    lat: 12.9734,
    lng: 77.5971,
    tagline: 'Modern five-story private museum housing classical art, textiles, and interactive galleries.',
    neighborhood: 'Kasturba Road',
    nearestMetro: 'Cubbon Park Metro (700m)',
    entryFee: '₹150 (Galleries)',
    timings: '10:00 AM – 06:30 PM (Closed Mon)'
  },
  {
    id: 'ime-museum',
    name: 'Indian Music Experience Museum (IME)',
    category: 'museum',
    subType: 'Music Heritage',
    lat: 12.8931,
    lng: 77.5852,
    tagline: 'Interactive music museum featuring outdoor sound gardens, instrument displays, and indie history.',
    neighborhood: 'JP Nagar 7th Phase',
    nearestMetro: 'Yelachenahalli Metro (2.5 km)',
    entryFee: '₹150',
    timings: '10:00 AM – 06:00 PM (Closed Mon)'
  },
  {
    id: 'planetarium',
    name: 'Jawaharlal Nehru Planetarium',
    category: 'museum',
    subType: 'Space & Astronomy',
    lat: 12.9849,
    lng: 77.5896,
    tagline: 'Sky theater with dome projections, solar observatories, and an interactive science playground.',
    neighborhood: 'High Grounds',
    nearestMetro: 'Vidhana Soudha Metro (1.2 km)',
    entryFee: '₹75',
    timings: '10:00 AM – 05:30 PM (Closed Mon)'
  },
  {
    id: 'kempegowda-museum',
    name: 'Kempegowda Museum',
    category: 'museum',
    subType: 'Civic History',
    lat: 12.9739,
    lng: 77.6094,
    tagline: 'Historic collection celebrating Bengaluru’s founder inside the heritage Mayo Hall.',
    neighborhood: 'MG Road',
    nearestMetro: 'MG Road Metro (250m)',
    entryFee: 'Free',
    timings: '09:00 AM – 05:00 PM (Closed Sun)'
  },
  {
    id: 'gandhi-bhavan',
    name: 'Gandhi Bhavan Museum',
    category: 'museum',
    subType: 'National History',
    lat: 12.9902,
    lng: 77.5818,
    tagline: 'Preserves rare photo archives, letters, and literature from Mahatma Gandhi’s Karnataka visits.',
    neighborhood: 'Kumara Park East',
    nearestMetro: 'Sampige Road Metro (1.5 km)',
    entryFee: 'Free',
    timings: '10:30 AM – 05:00 PM (Closed Sun)'
  },
  {
    id: 'meg-museum',
    name: 'Madras Sappers Military Heritage Museum',
    category: 'museum',
    subType: 'Military History',
    lat: 12.9818,
    lng: 77.6241,
    tagline: 'Centuries of military history, weapons, and medals of the Madras Engineer Group.',
    neighborhood: 'Ulsoor / MEG Centre',
    nearestMetro: 'Halasuru Metro (1.1 km)',
    entryFee: 'Free (Prior permission req.)',
    timings: '10:00 AM – 04:00 PM'
  },
  {
    id: 'janapada-hub',
    name: 'Karnataka Folk Art Archive Hub',
    category: 'museum',
    subType: 'Folk Heritage',
    lat: 12.9885,
    lng: 77.5841,
    tagline: 'Display of traditional Yakshagana headgear, folk musical instruments, and village masks.',
    neighborhood: 'Kumara Krupa',
    nearestMetro: 'Vidhana Soudha Metro (1.8 km)',
    entryFee: 'Free',
    timings: '10:00 AM – 05:00 PM'
  },

  // ==========================================
  // 2. ART GALLERIES & HIDDEN STUDIOS (13 SPOTS)
  // ==========================================
  {
    id: 'ngma',
    name: 'National Gallery of Modern Art (NGMA)',
    category: 'gallery',
    subType: 'Modern & Contemporary Art',
    lat: 12.9897,
    lng: 77.5878,
    tagline: 'Heritage Manikyavelu Mansion surrounded by serene sculpture gardens and master Indian canvases.',
    neighborhood: 'Palace Road',
    nearestMetro: 'Vidhana Soudha Metro (1.4 km)',
    entryFee: '₹20',
    timings: '10:00 AM – 06:00 PM (Closed Mon)'
  },
  {
    id: 'venkatappa',
    name: 'Venkatappa Art Gallery',
    category: 'gallery',
    subType: 'Fine Art & Modernist Works',
    lat: 12.9752,
    lng: 77.5960,
    tagline: 'Celebrated public gallery preserving painter K. Venkatappa and K.K. Hebbar’s visual archives.',
    neighborhood: 'Kasturba Road',
    nearestMetro: 'Cubbon Park Metro (600m)',
    entryFee: '₹20',
    timings: '10:00 AM – 05:00 PM (Closed Mon)'
  },
  {
    id: 'ckp',
    name: 'Karnataka Chitrakala Parishath',
    category: 'gallery',
    subType: 'Fine Arts Complex',
    lat: 12.9904,
    lng: 77.5824,
    tagline: 'Sprawling cultural center with 13 permanent galleries, Mysore paintings, and Roerich works.',
    neighborhood: 'Kumara Krupa Road',
    nearestMetro: 'Sampige Road Metro (1.6 km)',
    entryFee: '₹50',
    timings: '10:00 AM – 05:30 PM'
  },
  {
    id: 'shanthiroad',
    name: '1 Shanthiroad Studio Gallery',
    category: 'gallery',
    subType: 'Hidden Courtyard Studio',
    lat: 12.9602,
    lng: 77.5954,
    tagline: 'Artist-run residency and open-courtyard gallery supporting experimental visual artwork.',
    neighborhood: 'Shanthi Nagar',
    nearestMetro: 'Lalbagh Metro (1.8 km)',
    entryFee: 'Free',
    timings: '11:00 AM – 07:00 PM'
  },
  {
    id: 'the-courtyard',
    name: 'The Courtyard Studio & Gallery',
    category: 'gallery',
    subType: 'Adaptive-Reuse Art Hub',
    lat: 12.9578,
    lng: 77.5941,
    tagline: 'Intimate brick courtyard hosting indie photography retrospectives, installations, and cafe culture.',
    neighborhood: 'Shanthi Nagar',
    nearestMetro: 'Lalbagh Metro (1.2 km)',
    entryFee: 'Free',
    timings: '11:00 AM – 10:00 PM'
  },
  {
    id: 'crimson-gallery',
    name: 'Crimson Art Gallery',
    category: 'gallery',
    subType: 'Heritage Mansion Gallery',
    lat: 12.9863,
    lng: 77.5979,
    tagline: 'Concealed inside the 120-year-old Hatworks Boulevard estate, curating fine lithographs and paintings.',
    neighborhood: 'Cunningham Road',
    nearestMetro: 'Cubbon Park Metro (1.3 km)',
    entryFee: 'Free',
    timings: '11:00 AM – 07:00 PM'
  },
  {
    id: 'sublime-galleria',
    name: 'Sublime Galleria',
    category: 'gallery',
    subType: 'Sky Bridge Gallery',
    lat: 12.9719,
    lng: 77.5958,
    tagline: 'Suspended sky gallery on the 8th floor bridge of UB City, promoting contemporary artists.',
    neighborhood: 'Vittal Mallya Road',
    nearestMetro: 'Cubbon Park Metro (950m)',
    entryFee: 'Free',
    timings: '11:00 AM – 08:00 PM'
  },
  {
    id: 'gallery-time-space',
    name: 'Gallery Time & Space',
    category: 'gallery',
    subType: 'Townhouse Contemporary Art',
    lat: 12.9712,
    lng: 77.6001,
    tagline: 'Tucked away along quiet Lavelle Road, exhibiting modern Indian bronze sculptures and paintings.',
    neighborhood: 'Lavelle Road',
    nearestMetro: 'MG Road Metro (900m)',
    entryFee: 'Free',
    timings: '11:00 AM – 07:00 PM'
  },
  {
    id: 'kynkyny',
    name: 'Kynkyny Art Gallery',
    category: 'gallery',
    subType: 'Second-Floor Art Den',
    lat: 12.9827,
    lng: 77.5998,
    tagline: 'Upper-floor retreat above bustling Infantry Road highlighting emerging Indian painters.',
    neighborhood: 'Infantry Road',
    nearestMetro: 'Cubbon Park Metro (1 km)',
    entryFee: 'Free',
    timings: '10:00 AM – 07:00 PM'
  },
  {
    id: 'galerie-de-arts',
    name: 'Galerie De’Arts',
    category: 'gallery',
    subType: 'Heritage Art House',
    lat: 13.0031,
    lng: 77.5702,
    tagline: 'Quiet Malleshwaram gallery spotlighting classical South Indian canvases and Tanjore revival works.',
    neighborhood: 'Malleshwaram (11th Cross)',
    nearestMetro: 'Sampige Road Metro (900m)',
    entryFee: 'Free',
    timings: '11:00 AM – 06:30 PM (Closed Sun)'
  },
  {
    id: 'rangoli-metro',
    name: 'Rangoli Metro Art Center',
    category: 'gallery',
    subType: 'Public Visual Promenade',
    lat: 12.9744,
    lng: 77.6083,
    tagline: 'Vibrant urban cultural deck with three galleries (Vismaya, Chaya, Belaku) alongside MG Road.',
    neighborhood: 'MG Road Boulevard',
    nearestMetro: 'MG Road Metro (Direct Access)',
    entryFee: 'Free',
    timings: '10:00 AM – 07:30 PM'
  },
  {
    id: 'tasveer',
    name: 'Tasveer Gallery',
    category: 'gallery',
    subType: 'Photography Gallery',
    lat: 12.9730,
    lng: 77.5992,
    tagline: 'Intimate visual space committed to fine-art photography and classic photojournalism portfolios.',
    neighborhood: 'Kasturba Cross Road',
    nearestMetro: 'Cubbon Park Metro (800m)',
    entryFee: 'Free',
    timings: '11:00 AM – 06:00 PM'
  },
  {
    id: 'sphoorthi-studio',
    name: 'Sphoorthi Theatre & Art Studio',
    category: 'gallery',
    subType: 'Grassroots Folk Studio',
    lat: 12.9124,
    lng: 77.5898,
    tagline: 'Hidden South Bangalore creative enclave blending visual folklore, puppetry archives, and workshops.',
    neighborhood: 'JP Nagar 2nd Phase',
    nearestMetro: 'Banashankari Metro (1.4 km)',
    entryFee: 'Free (Workshops ticketed)',
    timings: '10:00 AM – 06:00 PM'
  },

  // ==========================================
  // 3. LIBRARIES & ARCHIVES (11 SPOTS)
  // ==========================================
  {
    id: 'scl',
    name: 'State Central Library (Seshadri Iyer Memorial)',
    category: 'library',
    subType: 'Historic Flagship Archive',
    lat: 12.9754,
    lng: 77.5929,
    tagline: 'Iconic crimson heritage landmark inside Cubbon Park with over 300,000 reference volumes.',
    neighborhood: 'Cubbon Park',
    nearestMetro: 'Cubbon Park Metro (400m)',
    entryFee: 'Free',
    timings: '08:30 AM – 07:30 PM (Closed Mon)'
  },
  {
    id: 'iiwc',
    name: 'Indian Institute of World Culture (IIWC)',
    category: 'library',
    subType: 'Public Reading Room & Culture',
    lat: 12.9438,
    lng: 77.5739,
    tagline: 'Revered Basavanagudi cultural institution with a quiet sanctum for philosophy and world literature.',
    neighborhood: 'Basavanagudi',
    nearestMetro: 'National College Metro (850m)',
    entryFee: 'Free (Membership for borrow)',
    timings: '09:00 AM – 07:00 PM (Closed Mon)'
  },
  {
    id: 'mythic-society',
    name: 'The Mythic Society Library',
    category: 'library',
    subType: 'Indological & Historical Research',
    lat: 12.9731,
    lng: 77.5872,
    tagline: 'Founded in 1909; holds over 40,000 rare books, palm-leaf manuscripts, and historical journals.',
    neighborhood: 'Nrupathunga Road',
    nearestMetro: 'Sir M. Visvesvaraya Metro (650m)',
    entryFee: 'Free (Research access)',
    timings: '10:00 AM – 05:00 PM (Closed Mon)'
  },
  {
    id: 'ccl-jayanagar',
    name: 'City Central Library (South Zone)',
    category: 'library',
    subType: 'Public Lending Library',
    lat: 12.9304,
    lng: 77.5819,
    tagline: 'Thriving public reading room and regional literature repository serving South Bangalore.',
    neighborhood: 'Jayanagar 3rd Block',
    nearestMetro: 'Jayanagar Metro (450m)',
    entryFee: 'Free',
    timings: '08:30 AM – 07:30 PM (Closed Mon)'
  },
  {
    id: 'ccl-malleshwaram',
    name: 'City Central Library (West Zone)',
    category: 'library',
    subType: 'Neighborhood Public Library',
    lat: 12.9996,
    lng: 77.5714,
    tagline: 'Historic public reading room with extensive Kannada language periodicals and classical collections.',
    neighborhood: 'Malleshwaram',
    nearestMetro: 'Srirampura Metro (1.1 km)',
    entryFee: 'Free',
    timings: '08:30 AM – 07:30 PM (Closed Mon)'
  },
  {
    id: 'eloor-library',
    name: 'Eloor Lending Library',
    category: 'library',
    subType: 'Heritage Lending Library',
    lat: 12.9814,
    lng: 77.6015,
    tagline: 'Legendary multi-decade commercial lending library renowned for its curated fiction catalog.',
    neighborhood: 'Infantry Road',
    nearestMetro: 'Cubbon Park Metro (750m)',
    entryFee: 'Refundable Deposit',
    timings: '10:00 AM – 06:30 PM'
  },
  {
    id: 'goethe-library',
    name: 'Goethe-Institut / Max Mueller Bhavan Library',
    category: 'library',
    subType: 'International Cultural Archive',
    lat: 12.9791,
    lng: 77.6412,
    tagline: 'Contemporary cultural library holding German literature, translated volumes, and modern media.',
    neighborhood: 'Indiranagar',
    nearestMetro: 'Indiranagar Metro (400m)',
    entryFee: 'Free Entry',
    timings: '09:30 AM – 06:00 PM (Closed Sun)'
  },
  {
    id: 'alliance-francaise',
    name: 'Alliance Française de Bangalore Library',
    category: 'library',
    subType: 'French Cultural Library',
    lat: 12.9928,
    lng: 77.5948,
    tagline: 'French language novels, graphic novels, periodicals, and rich audiovisual collection.',
    neighborhood: 'Vasanth Nagar',
    nearestMetro: 'Cantonment / Vidhana Soudha (1.8 km)',
    entryFee: 'Free Access / Membership',
    timings: '09:00 AM – 06:00 PM (Closed Sun)'
  },
  {
    id: 'bu-library',
    name: 'Bangalore University Central Library',
    category: 'library',
    subType: 'Academic Research Archive',
    lat: 12.9461,
    lng: 77.5089,
    tagline: 'University repository preserving scholarly doctoral dissertations, research papers, and journals.',
    neighborhood: 'Jnana Bharathi Campus',
    nearestMetro: 'Jnana Bharati Metro (500m)',
    entryFee: 'Student ID / Permission',
    timings: '09:00 AM – 06:00 PM'
  },
  {
    id: 'atta-galatta',
    name: 'Atta Galatta Literary Space',
    category: 'library',
    subType: 'Bookstore & Cultural Salon',
    lat: 12.9749,
    lng: 77.6433,
    tagline: 'Independent bookstore and cultural salon celebrating regional Indian writing and poetry readings.',
    neighborhood: 'Indiranagar',
    nearestMetro: 'Indiranagar Metro (600m)',
    entryFee: 'Free',
    timings: '11:00 AM – 08:00 PM (Closed Mon)'
  },
  {
    id: 'champaca',
    name: 'Champaca Bookstore & Reading Cafe',
    category: 'library',
    subType: 'Independent Reading Room',
    lat: 12.9908,
    lng: 77.5937,
    tagline: 'Canopy-sheltered quiet reading room curating feminist literature, translated memoirs, and indie presses.',
    neighborhood: 'Vasanth Nagar',
    nearestMetro: 'Vidhana Soudha Metro (1.7 km)',
    entryFee: 'Free Entry',
    timings: '10:30 AM – 07:00 PM (Closed Mon)'
  }
];
06 — API.mdExternal & Routing Contracts1. Google Directions Service Call
Function: google.maps.DirectionsService.route()
Mode: google.maps.TravelMode.WALKING
Waypoints for Cubbon Cultural Loop:
Origin: State Central Library (12.9754, 77.5929)
Waypoint 1: Government Museum (12.9753, 77.5958)
Waypoint 2: Venkatappa Art Gallery (12.9752, 77.5960)
Destination: Visvesvaraya Industrial & Tech Museum (12.9752, 77.5963)
Expected Response Parsing:
Extract overview_path coordinates for SVG polyline rendering.
Sum all leg distances: legs.reduce((acc, leg) => acc + leg.distance.value, 0).
2. External Navigation Deep-Link Format
URL: https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}
Target: _blank with rel="noreferrer noopener"
3. Place Submission Endpoint
POST /api/v1/spots
Payload: Spot object with status: 'pending'
Response: { "status": "success", "id": "<generated-id>" }
07 — SECURITY.mdKeys & Referrer Restrictions1. Environment Secrets
Store key in .env.local: VITE_GOOGLE_MAPS_API_KEY=AIzaSy...
Never commit .env or .env.local to git version control.
2. Google Cloud Console Restrictions
Application Restriction: Set to HTTP Referrers (web sites)
Development: http://localhost:5173/*
Production: https://namma-cultour.vercel.app/*
API Scope Restrictions:
Maps JavaScript API
Directions API
08 — CODE_STYLE.mdConventions & Pattern Rules
TypeScript Hygiene: No any. Explicitly type all Google Maps event handlers, Spot entities, and Polyline options.
Glassmorphic Component Patterns: Combine Tailwind backdrop-blur utilities consistently: backdrop-blur-2xl bg-slate-900/80 border border-white/10 shadow-2xl.
Motion Isolation: Keep spring animation definitions declarative using Framer Motion primitives (motion.div, AnimatePresence).
Animation Performance: Never run UI-blocking re-renders inside requestAnimationFrame. Mutate SVG symbol properties directly.
09 — TESTING.mdVerification Matrix & Definition of Done
Area	Interaction / Action	Expected Result	Status
Map Engine	Page initialization	Loads dark vector canvas centered at Cubbon Park without API watermark errors	[ ]
Pill Filter	Click "🏛️ Museums"	Smooth spring glide; renders exactly 11 museum pins and 11 dock cards	[ ]
Pill Filter	Click "🎨 Art & Studios"	Renders 13 art gallery and hidden studio pins with fuchsia markers	[ ]
Pill Filter	Click "📚 Libraries"	Renders 11 library and archive pins with sky blue markers	[ ]
Trail HUD	Toggle "Cubbon Cultural Loop"	DirectionsService returns walking path; animated neon pulse runs along Kasturba Road	[ ]
Place Card	Click any dock card	Map smoothly pans to spot (map.panTo); detail drawer slides in	[ ]
Navigation	Click "Navigate" button	Launches Google Maps in new tab with pre-filled destination coordinates	[ ]
Add Spot	Submit place form	Form validates, sends POST request, and displays success notification	[ ]
Build	Run npm run build	Clean TypeScript compilation; Vite produces optimized static bundle	[ ]
10 — AGENTS.mdOperational Rules for AI Coding Agents1. Source of Truth
Treat this document and /docs as the absolute specification.
Do not invent new database fields or alter spot IDs.
Maintain the tactile glassmorphism theme (slate-950 canvas, backdrop-blur-2xl, luminous borders). Do not switch to flat opaque styles.
2. Step-by-Step Implementation Flow
Initialize: Bootstrap React 18 + Vite + TypeScript.
Dependencies: Install @react-google-maps/api, framer-motion, lucide-react, clsx, tailwind-merge.
Tailwind Config: Add breathing animation keyframes and glass backdrop utilities.
Data: Seed src/data/culturalSpots.ts with the 35 verified locations.
Components: Build AmbientGlow, CategoryPills, CubbonTrail, SpotCard, SpotDrawer, and AddSpotModal.
Integrate: Wire state in App.tsx and verify with npm run build.
GIT_WORKFLOW.mdGit Workflow & PR Standards1. Branch Naming Conventions
Feature branches: feat/feature-name
Bugfixes: fix/issue-description
Refactoring: refactor/scope
2. Back-Merge Requirement
Always merge dev back into your feature branch to resolve conflicts before opening a Pull Request.
3. Commit Message Format
Structure: <type>(<scope>): <short summary>
Allowed types: feat, fix, refactor, style, docs, chore
Examples:
feat(map): add custom animated SVG markers for galleries and libraries
fix(directions): correct waypoint coordinates for Kasturba road polyline
feat(places): implement add place modal form with coordinate input
4. Pull Request Requirements
Target Branch: Raise PRs strictly against dev (never directly against main or master).
PR Title Format: `[#<issue-number>] feat: <short title>`
PR Verification: Requires passing TypeScript checks (tsc --noEmit) and clean build (npm run build).