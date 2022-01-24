from fastapi import APIRouter, Depends, status
from models.to import (
    To,
    ToCreate,
    ToQuery
)
from services.to import ToService
from services.manager import get_current_manager
from models.manager import Manager
from typing import List


router = APIRouter(prefix='/to')


@router.post('/', response_model=To, status_code=status.HTTP_201_CREATED)
def create_to(to_data: ToCreate, service: ToService = Depends(),
              manager: Manager = Depends(get_current_manager)):
    return service.create_to(to_data)


@router.get('/{to_id}/', response_model=To)
def get_to(to_id: int, service: ToService = Depends()):
    return service.get_to(to_id)


@router.get('/all', response_model=List[To])
def get_tos(service: ToService = Depends()):
    return service.get_tos()
