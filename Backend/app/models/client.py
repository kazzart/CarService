from pydantic import BaseModel


class ClientBase(BaseModel):
    first_name: str
    second_name: str
    middle_name: str
    tel_number: int


class Client(ClientBase):
    id: int

    class Config:
        orm_mode = True


class ClientCreate(ClientBase):
    pass


class ClientQuery(ClientBase):
    pass
