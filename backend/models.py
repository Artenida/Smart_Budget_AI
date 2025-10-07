from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime, func
from sqlalchemy.orm import relationship
from backend.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key = True, index = True)
    username = Column(String, unique = True, index = True, nullable = False)
    password_hash = Column(String, nullable = False)

    expenses = relationship("Expense", back_populates="user")


class Expense(Base):
    __tablename__ = "expenses"

    id = Column(Integer, primary_key = True, index = True)
    description = Column(String, nullable = False)
    amount = Column(Float, nullable=False)
    category = Column(String, nullable = False)
    date = Column(DateTime(timezone=True), server_default=func.now())

    user_id = Column(Integer, ForeignKey("users.id"))
    user = relationship("User", back_populates="expenses")