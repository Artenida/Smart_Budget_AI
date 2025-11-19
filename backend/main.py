from fastapi import FastAPI
from backend import models, database
from backend.routes import auth_routes
from backend.routes import expense_routes
from fastapi.middleware.cors import CORSMiddleware

models.Base.metadata.create_all(bind = database.engine)

app = FastAPI(
    title = "Personal Expense Planner API",
    description="API for managing users, expenses, and authentication",
    version="1.0.0"
)

origins = ["http://localhost:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers=["*"],
)

app.include_router(auth_routes.router)
app.include_router(expense_routes.router)

@app.get("/")
def root():
    return {"message": "Welcome to the Personal Expense Planner API!"}