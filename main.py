from fastapi import FastAPI,Depends
from sqlalchemy.orm import Session 
import models
import schemas
import crud
from  database import engine , get_db
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message":"Hello World"}


models.Base.metadata.create_all(bind=engine)


@app.post("/products/create/" , response_model=schemas.ProductsResponse)
def create_products(productdata: schemas.ProductsBase,db: Session = Depends(get_db)):
   return crud.add_products(db=db,productdata=productdata)

@app.get("/products/view/" , response_model=list[schemas.ProductsResponse])
def view_products(db: Session = Depends(get_db)):
   return crud.get_products(db=db)
   
@app.post("/cart/create/" , response_model=schemas.CartResponse)
def create_cart(cartdata: schemas.CartBase,db: Session = Depends(get_db)):
   return crud.add_cart(db=db,cartdata=cartdata)

@app.get("/cart/view/{user}" , response_model=list[schemas.CartResponse])
def view_cart(user:str, db: Session = Depends(get_db)):
   return crud.get_cart(db=db, user=user)  


@app.post("/order/create/" , response_model=schemas.OrderResponse)
def create_orders(orderdata: schemas.OrdersBase,db: Session = Depends(get_db)):
   return crud.add_order(db=db,orderdata=orderdata)

@app.get("/order/view/{user_id}" , response_model=list[schemas.OrderResponse])
def view_order(user_id:str, db: Session = Depends(get_db)):
   return crud.get_order(db=db, user_id=user_id)     



