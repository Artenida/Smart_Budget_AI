from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

# Shared fields
class ExpenseBase(BaseModel):
    description: str
    amount: float
    category: Optional[str] = None

# Fields needed when creating
class ExpenseCreate(ExpenseBase):
    description: str
    amount: float

# What we return to frontend
class ExpenseResponse(ExpenseBase):
    id: int
    date: datetime

    class Config:
        orm_mode = True


class UserBase(BaseModel):
    username: str

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int
    expenses: List[ExpenseResponse] = []

    class Config:
        orm_mode = True
