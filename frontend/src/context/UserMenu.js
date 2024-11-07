import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UserCircle, 
  History, 
  LogOut, 
  Settings, 
  Moon, 
  Sun,
  Heart,
  Bookmark,
  ChefHat,
  Book,
  Share2,
  HelpCircle
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef();
  const { isDarkMode, toggleTheme } = useTheme();
  
  const user = JSON.parse(localStorage.getItem('user') || '{"name": "เชฟคนเก่ง", "email": "chef@email.com"}');

  const menuItems = [
    {
      category: "โปรไฟล์",
      items: [
        { icon: <Settings className="w-5 h-5" />, label: "Recalibrate รสชาติ", action: () => navigate('/calibrate') },
        { icon: <ChefHat className="w-5 h-5" />, label: "ระดับความชำนาญ", action: () => navigate('/skill-level') },
        { icon: isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />, label: "โหมดมืด", action: toggleTheme }
      ]
    },
    {
      category: "สูตรอาหาร",
      items: [
        { icon: <History className="w-5 h-5" />, label: "ประวัติการปรุง", action: () => navigate('/history') },
        { icon: <Heart className="w-5 h-5" />, label: "สูตรที่ชื่นชอบ", action: () => navigate('/favorites') },
        { icon: <Bookmark className="w-5 h-5" />, label: "สูตรที่บันทึก", action: () => navigate('/saved') },
        { icon: <Book className="w-5 h-5" />, label: "สูตรของฉัน", action: () => navigate('/my-recipes') }
      ]
    },
    {
      category: "อื่นๆ",
      items: [
        { icon: <Share2 className="w-5 h-5" />, label: "แชร์ให้เพื่อน", action: () => navigate('/share') },
        { icon: <HelpCircle className="w-5 h-5" />, label: "วิธีใช้งาน", action: () => navigate('/help') },
        { icon: <LogOut className="w-5 h-5" />, label: "ออกจากระบบ", action: () => {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          navigate('/login');
          setIsOpen(false);
        }, className: "text-red-400" }
      ]
    }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2 rounded-xl ${
          isDarkMode ? 'bg-gray-800' : 'bg-white/80'
        } backdrop-blur-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2`}
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 flex items-center justify-center">
          <span className="text-white font-semibold">
            {user.name.charAt(0)}
          </span>
        </div>
        <span className="font-medium">{user.name}</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`absolute right-0 top-full mt-2 w-72 rounded-xl ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            } shadow-xl ring-1 ring-black/5 z-[100]`}
            style={{ transformOrigin: 'top right' }}
          >
            <div className="p-4 border-b border-gray-700/50">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center">
                  <span className="text-xl font-bold text-white">
                    {user.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm opacity-60">{user.email}</p>
                </div>
              </div>
            </div>

            <div className="py-2">
              {menuItems.map((category, index) => (
                <div key={index} className="px-2">
                  <div className="px-3 py-2 text-sm opacity-50 font-medium">
                    {category.category}
                  </div>
                  {category.items.map((item, itemIndex) => (
                    <motion.button
                      key={itemIndex}
                      whileHover={{ x: 4 }}
                      onClick={item.action}
                      className={`w-full px-3 py-2 rounded-lg flex items-center gap-3 transition-colors ${
                        item.className || 'hover:bg-orange-500/10'
                      }`}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </motion.button>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}