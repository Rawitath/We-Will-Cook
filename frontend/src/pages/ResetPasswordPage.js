// src/pages/ResetPasswordPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import backgroundImage from '../assets/food-4k.jpg'; // Make sure to import your image

export default function ResetPasswordPage() {
  return (
    <div 
      className="min-h-screen flex justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="w-[420px] bg-transparent border-2 border-white/20 backdrop-blur-xl rounded-lg p-8 text-white">
        <h1 className="text-4xl font-medium text-center mb-8">Reset Password</h1>

        <div className="mb-8 relative">
          <input
            type="password"
            placeholder="Enter your new email"
            className="w-full h-[50px] bg-transparent border-2 border-white/20 rounded-full px-5 text-white placeholder-white outline-none"
          />
          <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white" />
        </div>

        <button
          className="w-full h-[45px] rounded-full bg-white text-gray-900 font-semibold text-lg mb-6 hover:shadow-lg transition-shadow"
        >
          Reset Password
        </button>

        
      </div>
    </div>
  );
}