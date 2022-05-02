import urllib

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import urllib

# params = urllib.parse.quote_plus("'DRIVER={ODBC Driver 17 for SQL Server};SERVER='+server+';DATABASE='+database+';UID"
# "='+username+';PWD='+ password")
user_pass = "b6a=P+uckip;"
SQLALCHEMY_DATABASE_URL = 'mysql+pymysql://root:'+urllib.parse.quote_plus(user_pass)+'@0.0.0.0:3306/assignment'

#SQLALCHEMY_DATABASE_URL = "postgresql://user:password@postgresserver/db"


engine = create_engine(SQLALCHEMY_DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
  db = SessionLocal()
  try:
       yield db
  finally:
      db.close()
 
