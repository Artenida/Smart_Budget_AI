import streamlit as st

st.set_page_config(
    page_title="Smart Budget AI",
    layout="centered"
)

st.title("Smart Budget AI")
st.write("Welcome to your personal AI-powered expense tracker!")

st.sidebar.title("Navigation")
page = st.sidebar.radio("Go to:", ["Home", "Sign Up", "Login"])

if page == "Home":
    st.subheader("📊 Manage your budget smarter with AI")
    st.write("""
        **Smart Budget AI** helps you track, categorize, and analyze your expenses 
        automatically using machine learning.

        **Features:**
        - 🧾 Add and track your daily expenses  
        - 🤖 Automatic AI-based categorization  
        - 📈 Visualize your spending habits  
        - 🔐 Secure login and user accounts
    """)

    st.info("👉 Use the sidebar to Sign Up or Login to your account.")

elif page == "Sign Up":
    st.switch_page("pages/signup.py")

elif page == "Login":
    st.switch_page("pages/login.py")