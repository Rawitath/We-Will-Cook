import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Lock, Loader, ArrowLeft } from 'lucide-react';
import axios from 'axios';
import backgroundImage from '../assets/food-4k.jpg';
import AuthContext from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const { api_url, token } = useContext(AuthContext);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (token) {
      axios.get(api_url, {
        headers: {
          Authorization: `Bearer ${token.access}`
        }
      }).then((response) => {
        if (response.status === 200) {
          navigate('/');
        }
      }).catch(console.error);
    }
  }, [token, api_url, navigate]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!username.trim()) {
      newErrors.username = "Username is required";
    }

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) {
      newErrors.email = "Valid email is required";
    }

    if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      newErrors.password = "Password must include uppercase, lowercase, and numbers";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      try {
        await axios.post(api_url + 'register/', {
          username,
          email,
          password
        });
        setIsLoading('success');
        setTimeout(() => navigate('/login'), 1000);
      } catch (err) {
        setErrors(prev => ({
          ...prev,
          general: err.response?.data?.message || 'Registration failed. Please try again.'
        }));
        setIsLoading(false);
      }
    }
  };

  return (
    <div 
      className="min-h-screen flex justify-center items-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all text-white"
      >
        <ArrowLeft className="w-6 h-6" />
      </motion.button>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-[420px] bg-transparent border-2 border-white/20 backdrop-blur-xl rounded-lg p-8 text-white"
      >
        <h1 className="text-4xl font-medium text-center mb-8">Create Account</h1>

        {errors.general && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 rounded bg-red-500/20 text-red-200 text-sm text-center"
          >
            {errors.general}
          </motion.div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`w-full h-[50px] bg-transparent border-2 
                  ${errors.username ? 'border-red-400' : 'border-white/20'}
                  rounded-full px-5 pr-12 text-white placeholder-white outline-none 
                  focus:border-white/40 transition-colors disabled:opacity-50`}
                disabled={isLoading}
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <User className={`w-5 h-5 ${errors.username ? 'text-red-400' : 'text-white'}`} />
              </div>
            </div>
            {errors.username && (
              <span className="text-red-400 text-sm block mt-2 ml-4">
                {errors.username}
              </span>
            )}
          </div>

          <div className="mb-8">
            <div className="relative">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full h-[50px] bg-transparent border-2 
                  ${errors.email ? 'border-red-400' : 'border-white/20'}
                  rounded-full px-5 pr-12 text-white placeholder-white outline-none 
                  focus:border-white/40 transition-colors disabled:opacity-50`}
                disabled={isLoading}
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <Mail className={`w-5 h-5 ${errors.email ? 'text-red-400' : 'text-white'}`} />
              </div>
            </div>
            {errors.email && (
              <span className="text-red-400 text-sm block mt-2 ml-4">
                {errors.email}
              </span>
            )}
          </div>

          <div className="mb-8">
            <div className="relative">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full h-[50px] bg-transparent border-2 
                  ${errors.password ? 'border-red-400' : 'border-white/20'}
                  rounded-full px-5 pr-12 text-white placeholder-white outline-none 
                  focus:border-white/40 transition-colors disabled:opacity-50`}
                disabled={isLoading}
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <Lock className={`w-5 h-5 ${errors.password ? 'text-red-400' : 'text-white'}`} />
              </div>
            </div>
            {errors.password && (
              <span className="text-red-400 text-sm block mt-2 ml-4">
                {errors.password}
              </span>
            )}
          </div>

          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={!isLoading ? { scale: 1.02 } : {}}
            whileTap={!isLoading ? { scale: 0.98 } : {}}
            className={`w-full h-[45px] rounded-full bg-white text-gray-900 font-semibold 
              text-lg mb-6 hover:shadow-lg transition-all flex items-center justify-center gap-2 
              ${isLoading === 'success' ? 'bg-green-500 text-white' : ''} 
              disabled:opacity-50`}
          >
            {isLoading === 'success' ? (
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="text-white"
              >
                ✓ Account Created!
              </motion.div>
            ) : isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Loader className="w-5 h-5" />
              </motion.div>
            ) : (
              'Create Account'
            )}
          </motion.button>
        </form>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center text-sm"
        >
          Already have an account?{' '}
          <Link 
            to="/login" 
            className="text-white font-semibold hover:underline"
            tabIndex={isLoading ? -1 : 0}
          >
            Login
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
}