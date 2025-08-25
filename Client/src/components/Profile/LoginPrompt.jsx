// components/LoginPrompt.js
import { Link } from "react-router-dom";

const LoginPrompt = () => {
  return (
    <div className="flex justify-center items-center h-screen px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md w-full">
        <h2 className="text-xl font-bold text-gray-800 mb-6">
          Please log in to view your profile
        </h2>
        <Link
          to="/login"
          className="inline-block w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition font-medium"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default LoginPrompt;