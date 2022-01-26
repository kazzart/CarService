from fastapi import APIRouter, Depends, status
from fastapi.security import OAuth2PasswordRequestForm
from models.manager import (
    Manager,
    ManagerCreate,
    Token
)
from services.manager import ManagerService, get_current_manager


router = APIRouter(prefix='/manager')


@router.post('/sign_up/', response_model=Token,
             status_code=status.HTTP_201_CREATED)
def sign_up(
    manager_data: ManagerCreate,
    service: ManagerService = Depends()
):
    return service.register_new_manager(manager_data)


@router.post('/sign_in/', response_model=Token,
             status_code=status.HTTP_201_CREATED)
def sign_in(
    form_data: OAuth2PasswordRequestForm = Depends(),
    service: ManagerService = Depends()
):
    return service.authenticate_manager(
        form_data.username,
        form_data.password
    )


@router.get('/{manager_id}/', response_model=Manager)
def get_manager(
    manager_id: int,
    service: ManagerService = Depends()
):
    return service.get_manager(manager_id)


@router.get('/', response_model=Manager)
def get_manager_by_token(
    manager: Manager = Depends(get_current_manager)
):
    return manager
