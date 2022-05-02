from pydantic import BaseModel

class ProductsBase(BaseModel):
    category:str
    name:str
    desc:str
    image:str
    amount:str
    user:str
    key1:str
    key2:str

class ProductsResponse(ProductsBase):
     id:int
     class Config:
        orm_mode = True

class CartBase(BaseModel):
    category:str
    name:str
    desc:str
    image:str
    amount:str
    user:str
    key1:str
    key2:str

class CartResponse(CartBase) :
   id:int
   class Config:
        orm_mode = True

class OrdersBase(BaseModel):
    category:str
    name:str
    desc:str
    image:str
    amount:str
    user:str
    key1:str
    key2:str

class OrderResponse(OrdersBase) :
   id:int
   class Config:
        orm_mode = True   