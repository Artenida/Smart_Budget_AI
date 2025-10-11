import streamlit as st
import requests

BASE_URL = "http://127.0.0.1:8000"

st.title("Sign Up")

username = st.text_input("Username")
password = st.text_input("Password", type="password")

if st.button("Register"):
    if username and password:
        payload = {"username": username, "password": password}
        response = requests.post(f"{BASE_URL}/auth/register", json=payload)
        
        if response.status_code == 200:
            st.success("Registration successful! You can now log in.")
        else:
            st.error(f"Error: {response.json().get('detail', 'Something went wrong')}")
    else:
        st.warning("Please fill in all fields.")
