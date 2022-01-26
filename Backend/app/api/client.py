from fastapi import APIRouter, Depends, status
from models.client import (
    Client,
    ClientCreate,
)
from services.client import ClientService
from services.manager import get_current_manager
from models.manager import Manager


router = APIRouter(prefix='/client')


@router.post('/', response_model=Client, status_code=status.HTTP_201_CREATED)
def create_client(client_data: ClientCreate,
                  service: ClientService = Depends(),
                  manager: Manager = Depends(get_current_manager)):
    return service.create_client(client_data)


@router.get('/{client_id}/', response_model=Client)
def get_client(client_id: int, service: ClientService = Depends()):
    return service.get_client(client_id)


@router.get('/by_number/', response_model=Client)
def get_client_by_number(tel_number: int, service: ClientService = Depends()):
    return service.get_client_by_number(tel_number)
