import tables
from database import get_session
from fastapi import Depends, HTTPException, status
from models.to import To, ToCreate
from sqlalchemy.orm import Session

from services.sts import StsService


class ToService:
    def __init__(self, session: Session = Depends(get_session),
                 sts_service: StsService = Depends()):
        self.session = session
        self.sts_service = sts_service

    def repack(self, to_data: tables.To) -> To:
        sts = self.sts_service.get_sts(to_data.sts_id)
        status = self.session.query(tables.Status).filter_by(
            id=to_data.status_id).first()
        return To(
            id=to_data.id,
            sts=sts,
            date=to_data.date,
            status=status
        )

    def create_to(self, to_data: ToCreate) -> To:
        to = tables.To(
            sts_id=to_data.sts_id,
            status_id=to_data.status_id
        )
        self.session.add(to)
        self.session.commit()
        return self.repack(to)

    def get_to(self, to_id: int) -> To:
        to = self.session.query(
            tables.To).filter_by(id=to_id).first()
        if not to:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
        return self.repack(to)

    def get_tos(self) -> list[To]:
        tos = self.session.query(
            tables.To).order_by(tables.To.date.desc()).all()
        for i in range(len(tos)):
            tos[i] = self.repack(tos[i])
        return tos

    def change_status(self, to_id: int, status_id: int) -> To:
        to = self.session.query(tables.To).filter_by(id=to_id).first()
        to.status_id = status_id
        self.session.commit()
        return self.repack(to)
