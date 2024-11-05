// src/pages/NoodleCustomization.js
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight, 
  Search, 
  Sparkles, 
  Soup, 
  Utensils, 
  Coffee,
  UserCircle,
  Moon,
  Sun,
  Droplets,
  ChevronUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const noodleStyles = [
  { 
    id: 'soup', 
    name: 'แบบน้ำ', 
    description: 'น้ำซุปร้อนๆ กลมกล่อม',
    icon: '🍜'
  },
  { 
    id: 'dry', 
    name: 'แบบแห้ง', 
    description: 'เส้นเหนียวนุ่ม คลุกเคล้ากับซอส',
    icon: '🥢'
  }
];

const noodleTypes = [
  { id: 'sen-lek', name: 'เส้นเล็ก', icon: '🍜', description: 'เส้นเล็กนุ่ม ทานง่าย' },
  { id: 'sen-yai', name: 'เส้นใหญ่', icon: '🍜', description: 'เส้นใหญ่เหนียวนุ่ม' },
  { id: 'sen-mee', name: 'เส้นหมี่', icon: '🍜', description: 'เส้นหมี่เหนียว' },
  { id: 'woon-sen', name: 'วุ้นเส้น', icon: '🍜', description: 'วุ้นเส้นใส นุ่มลื่น' },
  { id: 'bamee', name: 'บะหมี่', icon: '🍜', description: 'บะหมี่เหนียวนุ่ม หอมไข่' },
  { id: 'bamee-yok', name: 'บะหมี่หยก', icon: '🍜', description: 'บะหมี่หยกเขียว เหนียวนุ่มพิเศษ' }
];

const tastePreferences = [
  { id: 'spicy', name: 'ความเผ็ด', icon: '🌶️', description: 'ระดับความเผ็ดร้อน' },
  { id: 'salty', name: 'ความเค็ม', icon: '🧂', description: 'ระดับความเค็มกำลังดี' },
  { id: 'sour', name: 'ความเปรี้ยว', icon: '🍋', description: 'ระดับความเปรี้ยว' },
  { id: 'sweet', name: 'ความหวาน', icon: '🍯', description: 'ระดับความหวาน' },
];

const soupTypes = [
  { 
    id: 'nam-sai', 
    name: 'น้ำใส', 
    icon: <Utensils />, 
    description: 'น้ำซุปใสๆ หอมกระดูกหมู'
  },
  { 
    id: 'tom-yum', 
    name: 'ต้มยำ', 
    icon: <Soup />,
    description: 'ต้มยำรสจัดจ้าน เผ็ดเปรี้ยว' 
  },
  { 
    id: 'nam-tok', 
    name: 'น้ำตก', 
    icon: <Coffee />,
    description: 'น้ำซุปรสเผ็ด กลมกล่อม' 
  },
  { 
    id: 'nam-kon', 
    name: 'น้ำข้น', 
    icon: <Droplets />,
    description: 'น้ำซุปเข้มข้น กลมกล่อม' 
  }
];

export default function NoodleCustomization() {
  const navigate = useNavigate();
  
  // State management
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [noodleStyle, setNoodleStyle] = useState(null);
  const [selectedNoodle, setSelectedNoodle] = useState(null);
  const [selectedSoup, setSelectedSoup] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [tasteValues, setTasteValues] = useState({
    spicy: 50,
    salty: 50,
    sour: 50,
    sweet: 50
  });

  // Refs for scrolling
  const styleRef = useRef(null);
  const noodleRef = useRef(null);
  const soupRef = useRef(null);
  const tasteRef = useRef(null);

  // Scroll functions
  const scrollToRef = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-scroll effects
  useEffect(() => {
    if (noodleStyle) {
      setTimeout(() => scrollToRef(noodleRef), 300);
    }
  }, [noodleStyle]);

  useEffect(() => {
    if (selectedNoodle && noodleStyle === 'soup') {
      setTimeout(() => scrollToRef(soupRef), 300);
    }
  }, [selectedNoodle, noodleStyle]);

  useEffect(() => {
    if ((selectedSoup && noodleStyle === 'soup') || (selectedNoodle && noodleStyle === 'dry')) {
      setTimeout(() => scrollToRef(tasteRef), 300);
    }
  }, [selectedSoup, selectedNoodle, noodleStyle]);

  // Magic preferences generator
  const generateMagicPreferences = () => {
    const timeOfDay = new Date().getHours();
    let preferences;

    if (timeOfDay < 11) {
      preferences = {
        spicy: 25,
        salty: 75,
        sour: 25,
        sweet: 50,
        message: "🌅 เมนูเช้าแบบกลางๆ ทานง่าย เค็มนำหน้านิดๆ"
      };
    } else if (timeOfDay < 15) {
      preferences = {
        spicy: 75,
        salty: 50,
        sour: 75,
        sweet: 25,
        message: "☀️ เมนูกลางวันจัดจ้าน เผ็ดเปรี้ยวสะใจ"
      };
    } else {
      preferences = {
        spicy: 50,
        salty: 50,
        sour: 50,
        sweet: 50,
        message: "🌙 เมนูเย็นกลมกล่อม ทานง่าย"
      };
    }

    setTasteValues(preferences);
    alert(preferences.message);
  };

  // Theme class helper
  const getThemeClasses = (selected) => {
    const baseClasses = "p-4 rounded-lg flex flex-col items-center justify-center gap-2 transition-all";
    if (selected) {
      return `${baseClasses} ${isDarkMode ? 'bg-orange-500' : 'bg-orange-500'} text-white`;
    }
    return `${baseClasses} ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-50 hover:bg-gray-100'}`;
  };

  // API data preparation
  const prepareApiData = () => ({
    noodleStyle,
    noodleType: selectedNoodle,
    soupType: selectedSoup,
    tastePreferences: tasteValues,
  });
  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100' 
        : 'bg-gradient-to-br from-orange-50 via-pink-50 to-orange-100 text-gray-800'
    }`}>
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate('/')}
              className={`p-2 rounded-full ${
                isDarkMode ? 'bg-gray-800' : 'bg-white/80'
              } shadow-md hover:shadow-lg transition-all`}
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </motion.button>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              ปรุงก๋วยเตี๋ยวในแบบของคุณ
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-full ${
                isDarkMode ? 'bg-gray-800 text-yellow-500' : 'bg-white/80 text-gray-600'
              } shadow-md hover:shadow-lg transition-all`}
            >
              {isDarkMode ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
            </motion.button>
            <UserCircle className={`w-8 h-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
          </div>
        </header>

        {/* Magic Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={generateMagicPreferences}
          className={`w-full mb-6 px-6 py-4 bg-gradient-to-r ${
            isDarkMode
              ? 'from-purple-600 to-pink-600'
              : 'from-purple-500 to-pink-500'
          } text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2`}
        >
          <Sparkles className="w-5 h-5" />
          ✨ ให้เราแนะนำรสชาติที่ใช่สำหรับคุณ
        </motion.button>

        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-400'
          }`} />
          <input
            type="text"
            placeholder="ค้นหาเมนูที่คุณชอบ..."
            className={`w-full pl-12 pr-4 py-3 rounded-xl ${
              isDarkMode 
                ? 'bg-gray-800/50 text-white'
                : 'bg-white/80'
            } backdrop-blur-sm shadow-lg border-2 border-transparent focus:border-orange-500 transition-all`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Noodle Style Selection */}
        <motion.section
          ref={styleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`${
            isDarkMode ? 'bg-gray-800/50' : 'bg-white/80'
          } backdrop-blur-sm rounded-xl p-6 shadow-lg mb-6`}
        >
          <h2 className="text-xl font-semibold mb-4">1. เลือกสไตล์ก๋วยเตี๋ยว</h2>
          <div className="grid grid-cols-2 gap-4">
            {noodleStyles.map((style) => (
              <motion.button
                key={style.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={getThemeClasses(noodleStyle === style.id)}
                onClick={() => setNoodleStyle(style.id)}
              >
                <span className="text-2xl">{style.icon}</span>
                <span className="font-semibold">{style.name}</span>
                <span className={`text-sm ${
                  noodleStyle === style.id ? 'text-white' : 'opacity-75'
                }`}>{style.description}</span>
              </motion.button>
            ))}
          </div>
        </motion.section>

        {/* Noodle Type Selection */}
        {noodleStyle && (
          <motion.section
            ref={noodleRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`${
              isDarkMode ? 'bg-gray-800/50' : 'bg-white/80'
            } backdrop-blur-sm rounded-xl p-6 shadow-lg mb-6`}
          >
            <h2 className="text-xl font-semibold mb-4">2. เลือกชนิดเส้น</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {noodleTypes.map((noodle) => (
                <motion.button
                  key={noodle.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={getThemeClasses(selectedNoodle === noodle.id)}
                  onClick={() => setSelectedNoodle(noodle.id)}
                >
                  <span className="text-2xl">{noodle.icon}</span>
                  <span className="font-semibold">{noodle.name}</span>
                  <span className={`text-sm ${
                    selectedNoodle === noodle.id ? 'text-white' : 'opacity-75'
                  }`}>{noodle.description}</span>
                </motion.button>
              ))}
            </div>
          </motion.section>
        )}

        {/* Soup Type Selection */}
        {noodleStyle === 'soup' && selectedNoodle && (
          <motion.section
            ref={soupRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`${
              isDarkMode ? 'bg-gray-800/50' : 'bg-white/80'
            } backdrop-blur-sm rounded-xl p-6 shadow-lg mb-6`}
          >
            <h2 className="text-xl font-semibold mb-4">3. เลือกน้ำซุป</h2>
            <div className="grid grid-cols-2 gap-4">
              {soupTypes.map((soup) => (
                <motion.button
                  key={soup.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={getThemeClasses(selectedSoup === soup.id)}
                  onClick={() => setSelectedSoup(soup.id)}
                >
                  <div className={`p-2 rounded-full ${
                    selectedSoup === soup.id ? 'bg-white/20' : ''
                  }`}>
                    {soup.icon}
                  </div>
                  <span className="font-semibold">{soup.name}</span>
                  <span className={`text-sm ${
                    selectedSoup === soup.id ? 'text-white' : 'opacity-75'
                  }`}>{soup.description}</span>
                </motion.button>
              ))}
            </div>
          </motion.section>
        )}

        {/* Taste Preferences */}
        {selectedNoodle && (noodleStyle === 'dry' || selectedSoup) && (
          <motion.section
            ref={tasteRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`${
              isDarkMode ? 'bg-gray-800/50' : 'bg-white/80'
            } backdrop-blur-sm rounded-xl p-6 shadow-lg mb-6`}
          >
            <h2 className="text-xl font-semibold mb-4">
              {noodleStyle === 'dry' ? '3.' : '4.'} ปรับแต่งรสชาติ
            </h2>
            <div className="space-y-8">
              {tastePreferences.map((taste) => (
                <div key={taste.id} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{taste.icon}</span>
                      <div>
                        <span className="font-medium">{taste.name}</span>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {taste.description}
                        </p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                    }`}>
                      {tasteValues[taste.id]}%
                    </span>
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {[0, 25, 50, 75, 100].map((value) => (
                      <motion.button
                        key={value}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`py-2 rounded-lg transition-all ${
                          tasteValues[taste.id] === value
                            ? 'bg-orange-500 text-white'
                            : isDarkMode
                              ? 'bg-gray-700 hover:bg-gray-600'
                              : 'bg-gray-50 hover:bg-gray-100'
                        }`}
                        onClick={() => setTasteValues(prev => ({
                          ...prev,
                          [taste.id]: value
                        }))}
                      >
                        {value}
                      </motion.button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Submit Button */}
        {selectedNoodle && (noodleStyle === 'dry' || selectedSoup) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-end"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const data = prepareApiData();
                console.log('Sending to API:', data);
                alert('บันทึกความชอบของคุณแล้ว! 🎉');
              }}
              className={`px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2`}
            >
              บันทึกรสชาติที่ชอบ
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        )}

        {/* Back to Top Button */}
        <AnimatePresence>
          {showBackToTop && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              onClick={scrollToTop}
              className={`fixed bottom-8 right-8 p-4 rounded-full shadow-lg transition-all ${
                isDarkMode 
                  ? 'bg-gray-800 text-white hover:bg-gray-700' 
                  : 'bg-white text-gray-800 hover:bg-gray-50'
              }`}
            >
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ChevronUp className="w-6 h-6" />
              </motion.div>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}