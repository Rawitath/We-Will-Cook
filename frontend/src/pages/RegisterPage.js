// src/pages/RegisterPage.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock } from 'lucide-react';
import backgroundImage from '../assets/food-4k.jpg';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  
  // Separate error states to match original implementation
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passError, setPassError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    let hasError = false;
    
    // Reset all error messages first
    setNameError('');
    setEmailError('');
    setPassError('');

    // Username validation
    if (formData.username === '' || formData.username == null) {
      setNameError("Name is required");
      hasError = true;
    }

    // Email validation - using exact same regex from original
    const email_check = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (!formData.email.match(email_check)) {
      setEmailError("Valid Email is required");
      hasError = true;
    }

    // Password validation - same order as original script
    if (formData.password.length <= 5) {
      setPassError("Password must be more than 6 characters");
      hasError = true;
    }
    else if (formData.password.length >= 20) {
      setPassError("Password cannot be more than 20 characters");
      hasError = true;
    }
    else if (formData.password === 'password') {
      setPassError("Password cannot be password");
      hasError = true;
    }

    // If no errors, you can proceed (e.g., navigate to login)
    if (!hasError) {
      navigate('/login');
    }
  };

  return (
    <div 
      className="min-h-screen flex justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="w-[420px] bg-transparent border-2 border-white/20 backdrop-blur-xl rounded-lg p-8 text-white">
        <h1 className="text-4xl font-medium text-center mb-8">Register</h1>

        <form id="form" onSubmit={handleSubmit}>
          <div className="mb-8 relative">
            <input
              id="username"
              type="text"
              placeholder="Username"
              className="w-full h-[50px] bg-transparent border-2 border-white/20 rounded-full px-5 text-white placeholder-white outline-none"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
            />
            <User className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white" />
            {nameError && (
              <span id="name_error" className="text-red-500 text-sm block mt-1 ml-4">
                {nameError}
              </span>
            )}
          </div>

          <div className="mb-8 relative">
            <input
              id="email"
              type="email"
              placeholder="Email"
              className="w-full h-[50px] bg-transparent border-2 border-white/20 rounded-full px-5 text-white placeholder-white outline-none"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
            <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white" />
            {emailError && (
              <span id="email_error" className="text-red-500 text-sm block mt-1 ml-4">
                {emailError}
              </span>
            )}
          </div>

          <div className="mb-8 relative">
            <input
              id="password"
              type="password"
              placeholder="Password"
              className="w-full h-[50px] bg-transparent border-2 border-white/20 rounded-full px-5 text-white placeholder-white outline-none"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
            <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white" />
            {passError && (
              <span id="pass_error" className="text-red-500 text-sm block mt-1 ml-4">
                {passError}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="w-full h-[45px] rounded-full bg-white text-gray-900 font-semibold text-lg mb-6 hover:shadow-lg transition-shadow"
          >
            Register
          </button>
        </form>

        <p className="text-center text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-white font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}