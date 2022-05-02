import string
from tkinter.tix import COLUMN

from pydantic import UrlError

from database import Base
from sqlalchemy.sql.sqltypes import Integer,String
from sqlalchemy import Column


class Dbproducts(Base):
    __tablename__='products'
    id = Column(Integer,primary_key=True,index=True)
    category = Column(String(50))
    name = Column(String(50))
    desc = Column(String(50))
    image = Column(String(200))
    amount = Column(Integer)
    user = Column(String(50))
    key1 = Column(String(50))
    key2 = Column(String(50))

class Dbcarts(Base):
    __tablename__='cart'
    id = Column(Integer,primary_key=True,index=True)
    category = Column(String(50))
    name = Column(String(50))
    desc = Column(String(50))
    image = Column(String(200))
    amount = Column(Integer)
    user = Column(String(50))
    key1 = Column(String(50))
    key2 = Column(String(50))

class Dborder(Base):
    __tablename__='orders'
    id = Column(Integer,primary_key=True,index=True)
    category = Column(String(50))
    name = Column(String(50))
    desc = Column(String(50))
    image = Column(String(200))
    amount = Column(Integer)
    user = Column(String(50))
    key1 = Column(String(50))
    key2 = Column(String(50))

