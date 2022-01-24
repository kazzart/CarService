from fastapi import Depends, HTTPException, status
from database import get_session
from sqlalchemy.orm import Session
from models.sts import StsCreate, Sts
import tables


class StsService:
    def __init__(self, session: Session = Depends(get_session)):
        self.session = session

    def repack(self, sts_data: tables.Sts) -> Sts:
        client = self.session.query(tables.Client).filter_by(
            id=sts_data.client_id).first()
        return Sts(
            id=sts_data.id,
            ser=sts_data.ser,
            number=sts_data.number,
            client=client,
            car_plate=sts_data.car_plate,
            vin=sts_data.vin,
            model=sts_data.model
        )

    def create_sts(self, sts_data: StsCreate) -> Sts:
        sts = tables.Sts(
            ser=sts_data.ser,
            number=sts_data.number,
            client_id=sts_data.client_id,
            car_plate=sts_data.car_plate,
            vin=sts_data.vin,
            model=sts_data.model
        )
        self.session.add(sts)
        self.session.commit()
        return self.repack(sts)

    def get_sts(self, sts_id: int) -> Sts:
        sts = self.session.query(
            tables.Sts).filter_by(id=sts_id).first()
        if not sts:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
        return self.repack(sts)

    def get_sts_by_car_plate(self, car_plate: int) -> Sts:
        sts = self.session.query(
            tables.Sts).filter_by(car_plate=car_plate).first()
        if not sts:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
        return self.repack(sts)
