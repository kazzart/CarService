from fastapi import Depends, HTTPException, status
from database import get_session
from sqlalchemy.orm import Session
from models.status import StatusCreate, Status
import tables


class StatusService:
    def __init__(self, session: Session = Depends(get_session)):
        self.session = session

    def create_status(self, status_data: StatusCreate) -> Status:
        status = tables.Status(
            name=status_data.name
        )
        self.session.add(status)
        self.session.commit()
        return status

    def get_status(self, status_id: int) -> Status:
        status = self.session.query(
            tables.Status).filter_by(id=status_id).first()
        if not status:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
        return status

    def get_status_by_name(self, name: int) -> Status:
        status = self.session.query(
            tables.Status).filter_by(name=name).first()
        if not status:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
        return status
