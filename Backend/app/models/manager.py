from pydantic import BaseModel


class ManagerBase(BaseModel):
    login: str
    is_admin: bool


class Manager(ManagerBase):
    id: int

    class Config:
        orm_mode = True


class ManagerCreate(ManagerBase):
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str = 'bearer'
