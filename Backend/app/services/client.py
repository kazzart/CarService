from fastapi import Depends, HTTPException, status
from database import get_session
from sqlalchemy.orm import Session
from models.client import ClientCreate, Client
import tables


class ClientService:
    def __init__(self, session: Session = Depends(get_session)):
        self.session = session

    def create_client(self, client_data: ClientCreate) -> Client:
        client = tables.Client(
            first_name=client_data.first_name,
            second_name=client_data.second_name,
            middle_name=client_data.middle_name,
            tel_number=client_data.tel_number
        )
        self.session.add(client)
        self.session.commit()
        return client

    def get_client(self, client_id: int) -> Client:
        client = self.session.query(
            tables.Client).filter_by(id=client_id).first()
        if not client:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
        return client

    def get_client_by_number(self, tel_number: int) -> Client:
        client = self.session.query(
            tables.Client).filter_by(tel_number=tel_number).first()
        if not client:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
        return client
