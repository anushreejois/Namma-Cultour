import re
import uuid
from typing import List, Optional

from fastapi import Depends, FastAPI, HTTPException, Query, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Spot
from app.schemas import SpotCreate, SpotResponse, SpotSubmitResponse

app = FastAPI(
    title="Namma Cultour API",
    description="Backend API for Bengaluru Cultural, Archive & Heritage Explorer",
    version="1.0.0",
)

# Configure CORS
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "project": "Namma Cultour API",
        "status": "online",
        "documentation": "/docs",
    }


@app.get("/api/health")
def health_check(db: Session = Depends(get_db)):
    try:
        spot_count = db.query(Spot).count()
        return {
            "status": "healthy",
            "database": "connected",
            "total_spots": spot_count,
        }
    except Exception as e:
        raise HTTPException(
            status_code=503,
            detail=f"Database connectivity error: {str(e)}",
        )


@app.get("/api/spots", response_model=List[SpotResponse])
@app.get("/api/v1/spots", response_model=List[SpotResponse], include_in_schema=False)
def get_spots(
    category: Optional[str] = Query(
        None,
        description="Filter by category: museum, gallery, or library",
    ),
    status: Optional[str] = Query(
        None,
        description="Filter by verification status: verified or pending",
    ),
    db: Session = Depends(get_db),
):
    query = db.query(Spot)

    if category:
        query = query.filter(Spot.category == category.lower().strip())

    if status:
        query = query.filter(Spot.status == status.lower().strip())

    spots = query.order_by(Spot.name.asc()).all()
    return spots


@app.get("/api/spots/{spot_id}", response_model=SpotResponse)
@app.get("/api/v1/spots/{spot_id}", response_model=SpotResponse, include_in_schema=False)
def get_spot(spot_id: str, db: Session = Depends(get_db)):
    spot = db.query(Spot).filter(Spot.id == spot_id.strip()).first()
    if not spot:
        raise HTTPException(
            status_code=404,
            detail=f"Spot with ID '{spot_id}' not found.",
        )
    return spot


@app.post(
    "/api/spots/submit",
    response_model=SpotSubmitResponse,
    status_code=status.HTTP_201_CREATED,
)
@app.post(
    "/api/v1/spots",
    response_model=SpotSubmitResponse,
    status_code=status.HTTP_201_CREATED,
    include_in_schema=False,
)
def submit_spot(spot_input: SpotCreate, db: Session = Depends(get_db)):
    # Determine or generate an ID
    spot_id = spot_input.id
    if not spot_id:
        slug = re.sub(r"[^a-zA-Z0-9]+", "-", spot_input.name.lower()).strip("-")
        spot_id = f"{slug}-{uuid.uuid4().hex[:6]}"

    # Check for duplicate ID
    existing = db.query(Spot).filter(Spot.id == spot_id).first()
    if existing:
        raise HTTPException(
            status_code=409,
            detail=f"A spot with ID '{spot_id}' already exists.",
        )

    # Community additions default to 'pending' unless explicitly set to 'verified'
    submission_status = spot_input.status or "pending"

    new_spot = Spot(
        id=spot_id,
        name=spot_input.name,
        kannada_name=spot_input.kannada_name,
        category=spot_input.category.lower().strip(),
        sub_type=spot_input.sub_type or "Cultural Heritage",
        lat=spot_input.lat,
        lng=spot_input.lng,
        tagline=spot_input.tagline,
        neighborhood=spot_input.neighborhood,
        nearest_metro=spot_input.nearest_metro,
        entry_fee=spot_input.entry_fee,
        timings=spot_input.timings,
        status=submission_status,
    )

    try:
        db.add(new_spot)
        db.commit()
        db.refresh(new_spot)
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail=f"Failed to save spot: {str(e)}",
        )

    return SpotSubmitResponse(
        status="success",
        id=new_spot.id,
        message="Cultural spot submitted successfully",
        spot=SpotResponse.model_validate(new_spot),
    )
