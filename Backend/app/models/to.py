from .sts import Sts
from .status import Status
from datetime import datetime

from pydantic import BaseModel


class ToBase(BaseModel):
    pass


class To(ToBase):
    id: int
    sts: Sts
    status: Status
    date: datetime


class ToCreate(ToBase):
    sts_id: int
    status_id: int


class ToUpdate(ToBase):
    status_id: int


class ToQuery(ToBase):
    pass
