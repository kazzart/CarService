from pydantic import BaseModel


class StatusBase(BaseModel):
    name: str


class Status(StatusBase):
    id: int

    class Config:
        orm_mode = True


class StatusCreate(StatusBase):
    pass


class StatusQuery(StatusBase):
    pass
