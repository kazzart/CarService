from .client import Client

from pydantic import BaseModel


class StsBase(BaseModel):
    ser: str
    number: str
    car_plate: str
    vin: str
    model: str


class Sts(StsBase):
    id: int
    client: Client


class StsCreate(StsBase):
    client_id: int


class StsQuery(StsBase):
    pass
