from fastapi import APIRouter, Depends, status
from models.status import (
    Status,
    StatusCreate
)
from services.status import StatusService
from services.manager import get_current_manager
from models.manager import Manager


router = APIRouter(prefix='/status')


@router.post('/', response_model=Status, status_code=status.HTTP_201_CREATED)
def create_sts(status_data: StatusCreate, service: StatusService = Depends(),
               manager: Manager = Depends(get_current_manager)):
    return service.create_status(status_data)


@router.get('/{status_id}/', response_model=Status)
def get_status(status_id: int, service: StatusService = Depends()):
    return service.get_status(status_id)


@router.get('/by_name/', response_model=Status)
def get_status_by_name(name: str, service: StatusService = Depends()):
    return service.get_status_by_name(name)


@router.get('/all', response_model=list[Status])
def get_statuses(service: StatusService = Depends()):
    return service.get_statuses()
