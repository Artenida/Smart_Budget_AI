import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    
    return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-4 text-center"> Smart Budget Login</h1>
        <form className="flex flex-col gap-4">
          <input
            className="border p-2 rounded"
            placeholder="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="border p-2 rounded"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Login
          </button>
        </form>
        <p className="text-sm mt-4 text-center">
          Don't have an account?{" "}
          <Link className="text-blue-500" to="/signup">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
