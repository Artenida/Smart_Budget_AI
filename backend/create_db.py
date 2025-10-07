from database import Base, engine
from models import User, Expense

print("Creating database...")
Base.metadata.create_all(bind=engine)
print("Database created successfully!")
