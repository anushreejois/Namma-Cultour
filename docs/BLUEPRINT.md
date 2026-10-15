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