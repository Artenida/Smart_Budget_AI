import joblib

model = joblib.load("backend/ai/expense_model.pkl")

def predict_category(description: str):
    return model.predict([description])[0]
