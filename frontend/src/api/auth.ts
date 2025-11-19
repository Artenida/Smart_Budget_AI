import axios from "axios";

interface LoginResponse {
    access_token: string;
}

export async function login(username: string, password: string): Promise<string> {
    const res = await axios.post<LoginResponse>("http://localhost:8000/auth/login", {
        username,
        password,
    });

    return res.data.access_token;
}

export async function signup(username: string, password: string): Promise<void> {
    await axios.post("http://localhost:8000/auth/signup", {
        username,
        password,
    });
}
