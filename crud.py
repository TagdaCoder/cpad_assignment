from sqlalchemy.orm import Session 

import models
import schemas


def get_products(db: Session):

    return db.query(models.Dbproducts).all()

def add_products(db: Session, productdata : schemas.ProductsBase):

    new_prod = models.Dbproducts(
    category = productdata.category,
    name = productdata.name,
    desc= productdata.desc,
    image= productdata.image,
    amount= productdata.amount,
    user= productdata.user,
    key1= productdata.key1,
    key2= productdata.key2 
  )
    db.add(new_prod)
    db.commit()
    db.refresh(new_prod)
    return new_prod   


def add_cart(db: Session, cartdata : schemas.CartBase):

    new_cart = models.Dbcarts(
    category = cartdata.category,
    name = cartdata.name,
    desc= cartdata.desc,
    image= cartdata.image,
    amount= cartdata.amount,
    user= cartdata.user,
    key1= cartdata.key1,
    key2= cartdata.key2 
  )
    db.add(new_cart)
    db.commit()
    db.refresh(new_cart)
    return new_cart

 

def get_cart(db: Session, user:str):

    return db.query(models.Dbcarts).filter(models.Dbcarts.user == user).all()  

def add_order(db: Session,  orderdata : schemas.OrdersBase):

    new_order = models.Dborder(
    category = orderdata.category,
    name = orderdata.name,
    desc= orderdata.desc,
    image= orderdata.image,
    amount= orderdata.amount,
    user= orderdata.user,
    key1= orderdata.key1,
    key2= orderdata.key2 
  )
    db.add(new_order)
    db.commit()
    db.refresh(new_order)
    return new_order


def get_order(db: Session, user_id:str):

    return db.query(models.Dborder).filter(models.Dborder.user == user_id).all()     




