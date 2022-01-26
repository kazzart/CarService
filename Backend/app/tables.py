from sqlalchemy import (Column, Integer, VARCHAR, Text,
                        Boolean, DateTime, ForeignKey)
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql import func


Base = declarative_base()


class Manager(Base):
    __tablename__ = 'manager'
    id = Column(Integer, primary_key=True)
    login = Column(VARCHAR(50), nullable=False, unique=True)
    password = Column(Text, nullable=False)
    is_admin = Column(Boolean, nullable=False)


class Client(Base):
    __tablename__ = 'client'
    id = Column(Integer, primary_key=True)
    first_name = Column(VARCHAR(30), nullable=False)
    second_name = Column(VARCHAR(30), nullable=False)
    middle_name = Column(VARCHAR(30))
    tel_number = Column(Integer, nullable=False)


class Sts(Base):
    __tablename__ = 'sts'
    id = Column(Integer, primary_key=True)
    ser = Column(VARCHAR(4), nullable=False)
    number = Column(VARCHAR(6), nullable=False)
    client_id = Column(Integer, ForeignKey('client.id'), nullable=False)
    car_plate = Column(VARCHAR(9), nullable=False)
    vin = Column(VARCHAR(17), nullable=False)
    model = Column(VARCHAR(30), nullable=False)


class To(Base):
    __tablename__ = 'to'
    id = Column(Integer, primary_key=True)
    sts_id = Column(Integer, ForeignKey('sts.id'), nullable=False)
    date = Column(DateTime(), server_default=func.now())
    status_id = Column(Integer(), ForeignKey('status.id'), nullable=False)


class Status(Base):
    __tablename__ = 'status'
    id = Column(Integer, primary_key=True)
    name = Column(VARCHAR(30), nullable=False)
