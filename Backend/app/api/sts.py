from fastapi import APIRouter, Depends, status
from models.sts import (
    Sts,
    StsCreate
)
from services.sts import StsService
from services.manager import get_current_manager
from models.manager import Manager


router = APIRouter(prefix='/sts')


@router.post('/', response_model=Sts, status_code=status.HTTP_201_CREATED)
def create_sts(sts_data: StsCreate, service: StsService = Depends(),
               manager: Manager = Depends(get_current_manager)):
    return service.create_sts(sts_data)


@router.get('/by_car_plate', response_model=Sts)
def get_sts_by_car_plate(car_plate: str, service: StsService = Depends()):
    return service.get_sts_by_car_plate(car_plate)


@router.get('/{sts_id}/', response_model=Sts)
def get_sts(sts_id: int, service: StsService = Depends()):
    return service.get_sts(sts_id)
