from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime

from backend import models
from backend.models import Expense
from backend.schemas import ExpenseCreate, ExpenseResponse
from backend.utils import auth
from backend.utils import auth


router = APIRouter(
    prefix="/expenses",
    tags=["Expenses"]
)

# Create an expense
@router.post("/create", response_model=ExpenseResponse)
def create_expense(expense: ExpenseCreate, db: Session = Depends(auth.get_db), current_user: models.User = Depends(auth.get_current_user)):
    new_expense = Expense(
        description = expense.description,
        amount = expense.amount,
        category = expense.category if expense.category else "General",
        user_id = current_user.id
    )
    db.add(new_expense)
    db.commit()
    db.refresh(new_expense)
    return new_expense

# Get all expenses
@router.get("/", response_model=List[ExpenseResponse])
def get_expenses(
    db: Session = Depends(auth.get_db),
    current_user: models.User = Depends(auth.get_current_user),
    category: Optional[str] = None,
    start_date: Optional[datetime] = None,
    end_date: Optional[datetime] = None
):
    query = db.query(Expense).filter(Expense.user_id == current_user.id)

    if category:
        query = query.filter(Expense.category == category)
    if start_date:
        query = query.filter(Expense.date >= start_date)
    if end_date:
        query = query.filter(Expense.date <= end_date)

    return query.order_by(Expense.date.desc()).all()

# Get a single expense by ID
@router.get("/{expense_id}", response_model=ExpenseResponse)
def get_expense(expense_id: int, db: Session = Depends(auth.get_db), current_user: models.User = Depends(auth.get_current_user)):
    expense = db.query(Expense).filter(Expense.id == expense_id, Expense.user_id == current_user.id).first()
    if not expense:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Expense not found")
    return expense

# Update an expense
@router.put("/{expense_id}", response_model=ExpenseResponse)
def update_expense(expense_id: int, updated_expense: ExpenseCreate, db: Session = Depends(auth.get_db), current_user: models.User = Depends(auth.get_current_user)):
    expense = db.query(Expense).filter(Expense.id == expense_id, Expense.user_id == current_user.id).first()
    if not expense:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Expense not found!")
    
    expense.description = updated_expense.description
    expense.amount = updated_expense.amount
    expense.category = updated_expense.category if updated_expense.category else expense.category
    db.commit()
    db.refresh(expense)
    return expense

# Delete an expense
@router.delete("/{expense_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_expense(expense_id: int, db: Session = Depends(auth.get_db), current_user: models.User = Depends(auth.get_current_user)):
    expense = db.query(Expense).filter(Expense.id == expense_id, Expense.user_id == current_user.id).first()
    if not expense:
        return HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Expense not found!")
    
    db.delete((expense))
    db.commit()
    return None