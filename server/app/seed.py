"""
Database Seeder for Namma Cultour.
Populates the cultural_spots table with 35+ verified Bengaluru locations
defined in Section 05 (DATABASE.md) of docs/BLUEPRINT.md.
Idempotent: uses PostgreSQL ON CONFLICT DO UPDATE.
"""

import os
import re
import sys
from pathlib import Path

# Ensure server root is in sys.path when run directly
current_dir = Path(__file__).resolve().parent
server_root = current_dir.parent
if str(server_root) not in sys.path:
    sys.path.insert(0, str(server_root))

from app.database import SessionLocal, engine
from app.models import Spot
from sqlalchemy.dialects.postgresql import insert


def parse_spots_from_blueprint(blueprint_path: Path) -> list[dict]:
    """Parse the 35+ cultural spots from Section 05 of docs/BLUEPRINT.md."""
    if not blueprint_path.exists():
        raise FileNotFoundError(f"BLUEPRINT.md not found at {blueprint_path}")

    with open(blueprint_path, "r", encoding="utf-8") as f:
        text = f.read()

    start_idx = text.find("export const CULTURAL_SPOTS: CulturalSpot[] = [")
    if start_idx == -1:
        raise ValueError("Could not find CULTURAL_SPOTS block in BLUEPRINT.md")

    end_idx = text.find("];\n06 — API.md", start_idx)
    if end_idx == -1:
        end_idx = text.find("];", start_idx)

    block = text[start_idx : end_idx + 2]
    pattern = re.compile(r"\{([^{}]+)\}", re.DOTALL)
    matches = pattern.findall(block)

    spots = []
    for m in matches:
        spot = {}
        for line in m.strip().split("\n"):
            line = line.strip()
            if not line or line.startswith("//"):
                continue
            parts = line.split(":", 1)
            if len(parts) == 2:
                key = parts[0].strip()
                val = parts[1].strip().rstrip(",")
                if (val.startswith("'") or val.startswith('"')) and (
                    val.endswith("'") or val.endswith('"')
                ):
                    val = val[1:-1]
                elif val.replace(".", "", 1).isdigit():
                    val = float(val) if "." in val else int(val)
                spot[key] = val

        if "id" in spot:
            spots.append(
                {
                    "id": spot["id"],
                    "name": spot["name"],
                    "kannada_name": spot.get("kannadaName") or spot.get("kannada_name"),
                    "category": spot["category"].lower(),
                    "sub_type": spot.get("subType") or spot.get("sub_type", "Cultural Heritage"),
                    "lat": float(spot["lat"]),
                    "lng": float(spot["lng"]),
                    "tagline": spot.get("tagline"),
                    "neighborhood": spot.get("neighborhood"),
                    "nearest_metro": spot.get("nearestMetro") or spot.get("nearest_metro"),
                    "entry_fee": spot.get("entryFee") or spot.get("entry_fee"),
                    "timings": spot.get("timings"),
                    "status": spot.get("status", "verified"),
                }
            )

    return spots


def seed_database(blueprint_path: Path | None = None) -> int:
    """Seed the database with cultural spots."""
    if blueprint_path is None:
        # Check standard relative paths
        candidates = [
            server_root.parent / "docs" / "BLUEPRINT.md",
            server_root / "docs" / "BLUEPRINT.md",
            Path("docs/BLUEPRINT.md").resolve(),
        ]
        for c in candidates:
            if c.exists():
                blueprint_path = c
                break

    if not blueprint_path or not blueprint_path.exists():
        raise FileNotFoundError("Could not locate docs/BLUEPRINT.md for seeding data.")

    spots_data = parse_spots_from_blueprint(blueprint_path)
    print(f"Parsed {len(spots_data)} spots from {blueprint_path}")

    session = SessionLocal()
    try:
        inserted_or_updated = 0
        for spot_item in spots_data:
            stmt = insert(Spot).values(**spot_item)
            stmt = stmt.on_conflict_do_update(
                index_elements=["id"],
                set_={
                    "name": stmt.excluded.name,
                    "kannada_name": stmt.excluded.kannada_name,
                    "category": stmt.excluded.category,
                    "sub_type": stmt.excluded.sub_type,
                    "lat": stmt.excluded.lat,
                    "lng": stmt.excluded.lng,
                    "tagline": stmt.excluded.tagline,
                    "neighborhood": stmt.excluded.neighborhood,
                    "nearest_metro": stmt.excluded.nearest_metro,
                    "entry_fee": stmt.excluded.entry_fee,
                    "timings": stmt.excluded.timings,
                    "status": stmt.excluded.status,
                },
            )
            session.execute(stmt)
            inserted_or_updated += 1

        session.commit()
        print(f"Successfully upserted {inserted_or_updated} spots into 'cultural_spots' table.")
        return inserted_or_updated
    except Exception as e:
        session.rollback()
        print(f"Error seeding database: {e}")
        raise
    finally:
        session.close()


if __name__ == "__main__":
    count = seed_database()
    print(f"Seeding completed. Total records processed: {count}")
