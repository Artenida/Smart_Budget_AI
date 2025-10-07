from fastapi import FastAPI
from backend import models, database
from backend.routes import auth_routes

models.Base.metadata.create_all(bind = database.engine)

app = FastAPI(
    title = "Personal Expense Planner API",
    description="API for managing users, expenses, and authentication",
    version="1.0.0"
)

app.include_router(auth_routes.router)

@app.get("/")
def root():
    return {"message": "Welcome to the Personal Expense Planner API!"}