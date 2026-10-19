from typing import Optional, Literal
from pydantic import BaseModel, ConfigDict, Field, model_validator


CategoryType = Literal["museum", "gallery", "library"]
StatusType = Literal["verified", "pending"]


class SpotBase(BaseModel):
    name: str
    kannada_name: Optional[str] = None
    category: str
    sub_type: str
    lat: float
    lng: float
    tagline: Optional[str] = None
    neighborhood: Optional[str] = None
    nearest_metro: Optional[str] = None
    entry_fee: Optional[str] = None
    timings: Optional[str] = None
    status: Optional[str] = "verified"

    model_config = ConfigDict(
        from_attributes=True,
        populate_by_name=True,
    )


class SpotCreate(BaseModel):
    id: Optional[str] = None
    name: str
    kannada_name: Optional[str] = None
    kannadaName: Optional[str] = None
    category: str
    sub_type: Optional[str] = None
    subType: Optional[str] = None
    lat: float
    lng: float
    tagline: Optional[str] = None
    neighborhood: Optional[str] = None
    nearest_metro: Optional[str] = None
    nearestMetro: Optional[str] = None
    entry_fee: Optional[str] = None
    entryFee: Optional[str] = None
    timings: Optional[str] = None
    status: Optional[str] = "pending"

    model_config = ConfigDict(
        from_attributes=True,
        populate_by_name=True,
    )

    @model_validator(mode="after")
    def resolve_aliases(self):
        # Resolve sub_type / subType
        if not self.sub_type and self.subType:
            self.sub_type = self.subType
        elif not self.subType and self.sub_type:
            self.subType = self.sub_type
        if not self.sub_type:
            self.sub_type = "Cultural Space"

        # Resolve nearest_metro / nearestMetro
        if not self.nearest_metro and self.nearestMetro:
            self.nearest_metro = self.nearestMetro
        elif not self.nearestMetro and self.nearest_metro:
            self.nearestMetro = self.nearest_metro

        # Resolve entry_fee / entryFee
        if not self.entry_fee and self.entryFee:
            self.entry_fee = self.entryFee
        elif not self.entryFee and self.entry_fee:
            self.entryFee = self.entry_fee

        # Resolve kannada_name / kannadaName
        if not self.kannada_name and self.kannadaName:
            self.kannada_name = self.kannadaName
        elif not self.kannadaName and self.kannada_name:
            self.kannadaName = self.kannada_name

        return self


class SpotResponse(BaseModel):
    id: str
    name: str
    kannada_name: Optional[str] = None
    kannadaName: Optional[str] = None
    category: str
    sub_type: str
    subType: Optional[str] = None
    lat: float
    lng: float
    tagline: Optional[str] = None
    neighborhood: Optional[str] = None
    nearest_metro: Optional[str] = None
    nearestMetro: Optional[str] = None
    entry_fee: Optional[str] = None
    entryFee: Optional[str] = None
    timings: Optional[str] = None
    status: Optional[str] = "verified"

    model_config = ConfigDict(
        from_attributes=True,
        populate_by_name=True,
    )

    @model_validator(mode="after")
    def sync_camel_case(self):
        if self.subType is None:
            self.subType = self.sub_type
        if self.nearestMetro is None:
            self.nearestMetro = self.nearest_metro
        if self.entryFee is None:
            self.entryFee = self.entry_fee
        if self.kannadaName is None:
            self.kannadaName = self.kannada_name
        return self


class SpotSubmitResponse(BaseModel):
    status: str = "success"
    id: str
    message: Optional[str] = "Cultural spot submitted successfully"
    spot: Optional[SpotResponse] = None
