from datetime import datetime, timedelta
from fastapi import HTTPException, status, Depends
from fastapi.security import OAuth2PasswordBearer
from passlib.hash import bcrypt
from jose import JWTError, jwt
from sqlalchemy.orm import Session
from models.manager import Manager, ManagerCreate
from models.manager import Token
from settings import settings
from database import get_session
import tables


oauth2_scheme = OAuth2PasswordBearer(tokenUrl='/manager/sign_in/')


def get_current_manager(token: str = Depends(oauth2_scheme), session: Session = Depends(get_session)) -> Manager:
    return ManagerService.validate_token(token, session)


class ManagerService:
    @classmethod
    def verify_password(cls, plain_password: str, hashed_password: str) -> bool:
        return bcrypt.verify(plain_password, hashed_password)

    @classmethod
    def hash_password(cls, password: str) -> str:
        return bcrypt.hash(password)

    @classmethod
    def validate_token(cls, token: str, session: Session) -> Manager:
        try:
            payload = jwt.decode(
                token,
                settings.secret,
                algorithms=[settings.jwt_algorithm]
            )
        except JWTError:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail='Could not validate credentials',
                headers={'WWW-Authenticate': 'Bearer'}
            ) from None
        manager_id = payload.get('sub')
        manager = session.query(tables.Manager).filter_by(
            id=manager_id).first()
        if not manager:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail='Could not validate credentials',
                headers={'WWW-Authenticate': 'Bearer'}
            )
        return manager

    @classmethod
    def create_token(cls, manager: Manager) -> Token:
        now = datetime.utcnow()
        payload = {
            'iat': now,
            'nbf': now,
            'exp': now + timedelta(seconds=settings.jwt_lifetime),
            'sub': str(manager.id)
        }
        token = jwt.encode(
            payload,
            settings.secret,
            algorithm=settings.jwt_algorithm
        )
        return Token(access_token=token)

    def __init__(self, session: Session = Depends(get_session)):
        self.session = session

    def register_new_manager(self, manager_data: ManagerCreate) -> Token:
        manager = self.session.query(tables.Manager).filter(
            tables.Manager.login == manager_data.login).first()
        if manager:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT, detail='Login already taken')
        manager = tables.Manager(
            login=manager_data.login,
            password=self.hash_password(manager_data.password),
            is_admin=manager_data.is_admin
        )
        self.session.add(manager)
        self.session.commit()
        return self.create_token(manager)

    def authenticate_manager(self, login: str, password: str) -> Token:
        exception = HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Incorrect login or password',
            headers={'WWW-Authenticate': 'Bearer'}
        )

        manager = self.session.query(tables.Manager).filter(
            tables.Manager.login == login).first()
        if not manager:
            raise exception

        if not self.verify_password(password, manager.password):
            raise exception

        return self.create_token(manager)

    def get_manager(self, manager_id: int) -> Manager:
        manager = self.session.query(
            tables.Manager).filter_by(id=manager_id).first()
        if not manager:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
        return manager
