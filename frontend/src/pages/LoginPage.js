// src/pages/LoginPage.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { User, Lock, Loader } from 'lucide-react';
import { motion } from 'framer-motion';
import backgroundImage from '../assets/food-4k.jpg';

export default function LoginPage() {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Simulate API call with setTimeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful login
      localStorage.setItem('token', 'mock-token');
      localStorage.setItem('user', JSON.stringify({
        name: 'เชฟคนเก่ง',
        email: formData.email
      }));

      // Success animation before redirect
      setIsLoading('success');
      
      // Redirect after success animation
      setTimeout(() => {
        navigate('/customize', { replace: true });
      }, 1000);

    } catch (err) {
      setError('Login failed. Please try again.');
      setIsLoading(false);
    }
  };

  const LoadingButton = () => {
    if (isLoading === 'success') {
      return (
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="text-green-500"
        >
          ✓ Success!
        </motion.div>
      );
    }

    if (isLoading) {
      return (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Loader className="w-5 h-5" />
        </motion.div>
      );
    }

    return 'เข้าสู่ระบบ';
  };

  return (
    <div 
      className="min-h-screen flex justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-[420px] bg-transparent border-2 border-white/20 backdrop-blur-xl rounded-lg p-8 text-white"
      >
        <h1 className="text-4xl font-medium text-center mb-8">Login</h1>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 rounded bg-red-500/20 text-red-200 text-sm text-center"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-8 relative">
            <input
              type="username"
              placeholder="Username"
              className="w-full h-[50px] bg-transparent border-2 border-white/20 rounded-full px-5 text-white placeholder-white outline-none focus:border-white/40 transition-colors"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              disabled={isLoading}
            />
            <User className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white" />
          </div>

          <div className="mb-8 relative">
            <input
              type="password"
              placeholder="Password"
              className="w-full h-[50px] bg-transparent border-2 border-white/20 rounded-full px-5 text-white placeholder-white outline-none focus:border-white/40 transition-colors"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              disabled={isLoading}
            />
            <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white" />
          </div>

          <div className="flex justify-between items-center text-sm mb-8">
            <label className="flex items-center gap-2">
              <input 
                type="checkbox" 
                className="accent-white"
                disabled={isLoading}
              />
              Remember me
            </label>
            <Link 
              to="/forgot-password" 
              className="text-white hover:underline"
              tabIndex={isLoading ? -1 : 0}
            >
              Forget password?
            </Link>
          </div>

          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={!isLoading ? { scale: 1.02 } : {}}
            whileTap={!isLoading ? { scale: 0.98 } : {}}
            className={`w-full h-[45px] rounded-full bg-white text-gray-900 font-semibold text-lg mb-6 hover:shadow-lg transition-all flex items-center justify-center gap-2 ${
              isLoading === 'success' ? 'bg-green-500 text-white' : ''
            }`}
          >
            <LoadingButton />
          </motion.button>

          <p className="text-center text-sm">
            Don't have an account?{' '}
            <Link 
              to="/register" 
              className="text-white font-semibold hover:underline"
              tabIndex={isLoading ? -1 : 0}
            >
              Register here
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
}