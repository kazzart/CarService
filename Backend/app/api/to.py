from fastapi import APIRouter, Depends, status
from models.manager import Manager
from models.to import To, ToCreate, ToUpdate
from services.manager import get_current_manager
from services.to import ToService

router = APIRouter(prefix='/to')


@router.post('/', response_model=To, status_code=status.HTTP_201_CREATED)
def create_to(to_data: ToCreate, service: ToService = Depends(),
              manager: Manager = Depends(get_current_manager)):
    return service.create_to(to_data)


@router.patch('/{to_id}/', response_model=To)
def change_status(to_id: int, toUpdate: ToUpdate,
                  service: ToService = Depends()):
    return service.change_status(to_id, toUpdate.status_id)


@router.get('/{to_id}/', response_model=To)
def get_to(to_id: int, service: ToService = Depends()):
    return service.get_to(to_id)


@router.get('/all', response_model=list[To])
def get_tos(service: ToService = Depends()):
    return service.get_tos()
