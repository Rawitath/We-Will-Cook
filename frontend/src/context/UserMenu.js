import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { UserCircle, Clock, LogOut, HelpCircle, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef();
  const { isDarkMode, toggleTheme } = useTheme();
  
  const user = JSON.parse(localStorage.getItem('user') || '{"name": "เชฟคนเก่ง", "email": "chef@email.com"}');

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/home');
  };

  const handleRecalibrate = () => {
    navigate('/calibrate');
  };

  return (
    <div className="relative" ref={menuRef}>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
      >
        <UserCircle className="w-8 h-8" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed right-4 top-16 w-64 rounded-xl shadow-xl bg-gray-800/95 backdrop-blur-lg ring-1 ring-white/10 z-50"
            style={{ filter: 'drop-shadow(0 0 20px rgba(0,0,0,0.3))' }}
          >
            {/* User Profile Section */}
            <div className="px-4 py-3 border-b border-gray-700">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <span className="text-xl font-bold text-white">
                    {user.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-white">{user.name}</p>
                  <p className="text-gray-400 text-sm">{user.email}</p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="p-2">
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleTheme}
                className="w-full px-3 py-2 text-gray-300 hover:bg-gray-700/50 rounded-lg flex items-center gap-3 transition-colors"
              >
                <Moon className="w-5 h-5" />
                <span>Dark Mode</span>
              </button>

              {/* Recalibrate */}
              <button
                onClick={handleRecalibrate}
                className="w-full px-3 py-2 text-gray-300 hover:bg-gray-700/50 rounded-lg flex items-center gap-3 transition-colors"
              >
                <HelpCircle className="w-5 h-5" />
                <span>Recalibrate</span>
              </button>
              {/* History - Add this new button */}
                <button
                onClick={() => navigate('/history')}
                className="w-full px-3 py-2 text-gray-300 hover:bg-gray-700/50 rounded-lg flex items-center gap-3 transition-colors"
                >
                <Clock className="w-5 h-5" />
                <span>ประวัติการปรุง</span>
                </button>
              {/* Logout */}
              <button
                onClick={handleLogout}
                className="w-full px-3 py-2 text-red-400 hover:bg-gray-700/50 rounded-lg flex items-center gap-3 transition-colors mt-2"
              >
                <LogOut className="w-5 h-5" />
                <span>ออกจากระบบ</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}