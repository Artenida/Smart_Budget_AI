import pandas as pd
import random

categories = {
    "Food": [
        "Grocery shopping", "Bought groceries", "Lunch at cafe", "Dinner at pizza place",
        "Coffee at Starbucks", "Supermarket purchase", "Food delivery", "Ice cream treat",
        "Bakery snacks", "Takeout meal"
    ],
    "Transport": [
        "Bus ticket", "Uber ride", "Taxi fare", "Train ticket", "Gas refill",
        "Car parking fee", "Flight booking", "Fuel station purchase", "Metro pass", "Car maintenance"
    ],
    "Entertainment": [
        "Movie ticket", "Concert pass", "Netflix subscription", "Spotify premium", "Video game purchase",
        "Cinema snacks", "Museum entry", "Theater play", "Online course", "Amusement park ticket"
    ],
    "Shopping": [
        "Clothes purchase", "Shoe store payment", "New phone", "Online shopping", "Electronics store",
        "Perfume buy", "Makeup items", "Amazon order", "New laptop", "Jewelry purchase"
    ],
    "Bills": [
        "Electricity bill", "Water bill", "Internet payment", "Phone recharge", "House rent",
        "Insurance premium", "Credit card payment", "Gas bill", "Loan installment", "TV subscription"
    ],
    "Health": [
        "Doctor visit", "Pharmacy purchase", "Gym membership", "Medical test", "Dental cleaning",
        "Vitamins buy", "Skin care products", "Hospital fee", "Massage therapy", "Eye checkup"
    ]
}

# Generate dataset with variations
rows = []
for category, descriptions in categories.items():
    for _ in range(50):  
        desc = random.choice(descriptions)
        if random.random() < 0.3:
            desc = f"{desc} - {random.choice(['monthly', 'weekly', 'annual', 'one-time'])}"
        if random.random() < 0.1:
            desc = desc.replace("e", "3").replace("a", "@")
        rows.append({"description": desc, "category": category})

df = pd.DataFrame(rows).sample(frac=1).reset_index(drop=True)

df.to_csv("expenses_data.csv", index=False)
print("✅ Dataset saved as expenses_data.csv with", len(df), "rows.")
print(df.head())
