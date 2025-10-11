import streamlit as st
import requests

BASE_URL = "http://127.0.0.1:8000"

st.title("Login")

username = st.text_input("Username")
password = st.text_input("Password", type="password")

if st.button("Login"):
    if username and password:
        payload = {"username": username, "password": password}
        response = requests.post(f"{BASE_URL}/auth/login", json=payload)

        if response.status_code == 200:
            token = response.json()["access_token"]
            st.session_state["token"] = token
            st.success("Login successful!")
            st.info("You are now authenticated!")
        else:
            st.error("Invalid username or password")

    else:
        st.error("Please fill in both fields!")