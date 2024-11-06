// src/pages/LoginPage.js
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { User, Lock } from 'lucide-react';
import backgroundImage from '../assets/food-4k.jpg'; // Make sure to import your image

export default function LoginPage() {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  return (
    <div 
      className="min-h-screen flex justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="w-[420px] bg-transparent border-2 border-white/20 backdrop-blur-xl rounded-lg p-8 text-white">
        <h1 className="text-4xl font-medium text-center mb-8">Login</h1>

        <div className="mb-8 relative">
          <input
            type="text"
            placeholder="Email"
            className="w-full h-[50px] bg-transparent border-2 border-white/20 rounded-full px-5 text-white placeholder-white outline-none"
          />
          <User className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white" />
        </div>

        <div className="mb-8 relative">
          <input
            type="password"
            placeholder="Password"
            className="w-full h-[50px] bg-transparent border-2 border-white/20 rounded-full px-5 text-white placeholder-white outline-none"
          />
          <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white" />
        </div>

        <div className="flex justify-between items-center text-sm mb-8">
          <label className="flex items-center gap-2">
            <input 
              type="checkbox" 
              className="accent-white"
            />
            Remember me
          </label>
          <Link 
            to="/forgot-password" 
            className="text-white hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        <button
          className="w-full h-[45px] rounded-full bg-white text-gray-900 font-semibold text-lg mb-6 hover:shadow-lg transition-shadow"
        >
          Login
        </button>

        <p className="text-center text-sm">
          Don't have an account?{' '}
          <Link to="/register" className="text-white font-semibold hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}