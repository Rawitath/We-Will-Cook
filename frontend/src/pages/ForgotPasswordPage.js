import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Loader, ArrowLeft } from 'lucide-react';
import backgroundImage from '../assets/food-4k.jpg';
import AuthContext from '../context/AuthContext';
import axios from 'axios';

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { api_url } = useContext(AuthContext);

  const handleSendEmail = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      await axios.post(api_url + 'request-reset-password/', {
        email: email
      });
      
      setIsLoading('success');
      setSuccessMessage('Reset link sent! Please check your email.');
      
      // Reset and redirect after success
      // setTimeout(() => {
      //   navigate('/login');
      // }, 2000);
      
    } catch (error) {
      console.error(error);
      setError('Failed to send reset link. Please try again.');
      setIsLoading(false);
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
        <h1 className="text-4xl font-medium text-center mb-8">Reset Password</h1>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 rounded bg-red-500/20 text-red-200 text-sm text-center"
          >
            {error}
          </motion.div>
        )}

        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 rounded bg-green-500/20 text-green-200 text-sm text-center"
          >
            {successMessage}
          </motion.div>
        )}

        <form onSubmit={handleSendEmail}>
          <div className="mb-8">
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                disabled={isLoading}
                className="w-full h-[50px] bg-transparent border-2 border-white/20 
                  rounded-full px-5 pr-12 text-white placeholder-white outline-none 
                  focus:border-white/40 transition-colors disabled:opacity-50"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <Mail className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={!isLoading ? { scale: 1.02 } : {}}
            whileTap={!isLoading ? { scale: 0.98 } : {}}
            className={`w-full h-[45px] rounded-full bg-white text-gray-900 
              font-semibold text-lg mb-6 hover:shadow-lg transition-all 
              flex items-center justify-center gap-2
              ${isLoading === 'success' ? 'bg-green-500 text-white' : ''} 
              disabled:opacity-50`}
          >
            {isLoading === 'success' ? (
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="text-white"
              >
                ✓ Email Sent!
              </motion.div>
            ) : isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Loader className="w-5 h-5" />
              </motion.div>
            ) : (
              'Send Reset Link'
            )}
          </motion.button>
        </form>

        <div className="space-y-2">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center text-sm"
          >
            Remember your password?{' '}
            <Link 
              to="/login" 
              className="text-white font-semibold hover:underline"
              tabIndex={isLoading ? -1 : 0}
            >
              Login
            </Link>
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}