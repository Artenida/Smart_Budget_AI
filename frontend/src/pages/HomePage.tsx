import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome to SmartBudget AI</h1>
      <p className="text-gray-700 text-lg max-w-md text-center">
        Track your expenses, view analytics, and let AI help you manage your
        spending.
      </p>
      <div className="flex items-center justify-center p-4 gap-4">
        <Link to="/login" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Login</Link>
        <Link to="/signup" className="bg-green-500 text-white p-2 rounded hover:bg-green-600">Sign Up</Link>
      </div>
    </div>
  );
}
