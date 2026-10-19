from sqlalchemy import Column, Float, String
from app.database import Base


class Spot(Base):
    __tablename__ = "cultural_spots"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    kannada_name = Column(String, nullable=True)
    category = Column(String, nullable=False)
    sub_type = Column(String, nullable=False)
    lat = Column(Float, nullable=False)
    lng = Column(Float, nullable=False)
    tagline = Column(String, nullable=True)
    neighborhood = Column(String, nullable=True)
    nearest_metro = Column(String, nullable=True)
    entry_fee = Column(String, nullable=True)
    timings = Column(String, nullable=True)
    status = Column(String, nullable=True, default="verified", server_default="verified")


CulturalSpot = Spot

target_metadata = Base.metadata
