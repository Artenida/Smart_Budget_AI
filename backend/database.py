from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Points to SQLite file
DATABASE_URL =  "sqlite:///./spendwise.db"

# Creates a connection to the database
engine = create_engine(
    DATABASE_URL, connect_args={"check_same_thread": False}
)

# Used to interact with DB in routes
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Parent class all models inherit from
Base = declarative_base()