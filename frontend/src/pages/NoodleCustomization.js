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
import { useTheme } from '../context/ThemeContext';
import UserMenu from '../context/UserMenu';

// Constants for noodle styles
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

// Constants for noodle types
const noodleTypes = [
  { id: 'sen-lek', name: 'เส้นเล็ก', icon: '🍜', description: 'เส้นเล็กนุ่ม ทานง่าย' },
  { id: 'sen-yai', name: 'เส้นใหญ่', icon: '🍜', description: 'เส้นใหญ่เหนียวนุ่ม' },
  { id: 'sen-mee', name: 'เส้นหมี่', icon: '🍜', description: 'เส้นหมี่เหนียว' },
  { id: 'woon-sen', name: 'วุ้นเส้น', icon: '🍜', description: 'วุ้นเส้นใส นุ่มลื่น' },
  { id: 'bamee', name: 'บะหมี่', icon: '🍜', description: 'บะหมี่เหนียวนุ่ม หอมไข่' },
  { id: 'bamee-yok', name: 'บะหมี่หยก', icon: '🍜', description: 'บะหมี่หยกเขียว เหนียวนุ่มพิเศษ' }
];

// Constants for soup types
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

// Constants for taste preferences
const tastePreferences = [
  { id: 'spicy', name: 'ความเผ็ด', icon: '🌶️', description: 'ระดับความเผ็ดร้อน' },
  { id: 'salty', name: 'ความเค็ม', icon: '🧂', description: 'ระดับความเค็มกำลังดี' },
  { id: 'sour', name: 'ความเปรี้ยว', icon: '🍋', description: 'ระดับความเปรี้ยว' },
  { id: 'sweet', name: 'ความหวาน', icon: '🍯', description: 'ระดับความหวาน' }
];
// Helper function to prepare API data
const prepareApiData = (noodleStyle, selectedNoodle, selectedSoup, bowlSize, tasteValues, noodleTypes, soupTypes) => {
  const selectedNoodleType = noodleTypes.find(n => n.id === selectedNoodle);
  const selectedSoupType = soupTypes.find(s => s.id === selectedSoup);
  let noodle_style = "แห้ง";
    if (noodleStyle != "dry"){
        noodle_style = selectedSoupType ? selectedSoupType.name : '';
    }
    const size_dict = {
      "small":0.5,
      "medium":1,
      "large":1.5
    };
  return {
    "noodle_style":noodle_style,
    "noodle_type":selectedNoodleType ? selectedNoodleType.name : '',
    "noodle_size":size_dict[bowlSize],
    "flavors":
    {
    "Sweetness Level": tasteValues.sweet,
    "Sourness Level": tasteValues.sour,
    "Saltiness Level": tasteValues.salty,
    "Spiciness Level": tasteValues.spicy
    }
    };
};

const prepareRawData = (noodleStyle, selectedNoodle, selectedSoup, tasteValues, noodleTypes, soupTypes) => {
  const selectedNoodleType = noodleTypes.find(n => n.id === selectedNoodle);
  const selectedSoupType = soupTypes.find(s => s.id === selectedSoup);

  return {
    style: noodleStyle === 'soup' ? 'น้ำ' : 'แห้ง',
    noodleType: selectedNoodleType ? selectedNoodleType.name : '',
    soupType: selectedSoupType ? selectedSoupType.name : '',
    spiciness: tasteValues.spicy,
    saltiness: tasteValues.salty,
    sourness: tasteValues.sour,
    sweetness: tasteValues.sweet
  };
};
const bowlSizes = [
  { 
    id: 'small', 
    name: 'ธรรมดา', 
    icon: '🥣',
    description: 'พอดีทาน เส้น 80-100 กรัม',
    calories: '350-400 แคลอรี่'
  },
  { 
    id: 'medium', 
    name: 'พิเศษ', 
    icon: '🍜',
    description: 'อิ่มกำลังดี เส้น 120-150 กรัม',
    calories: '500-600 แคลอรี่'
  },
  { 
    id: 'large', 
    name: 'จัมโบ้', 
    icon: '🥘',
    description: 'สำหรับคนหิวมาก เส้น 180-200 กรัม',
    calories: '700-800 แคลอรี่'
  }
];
// Main component
export default function NoodleCustomization() {
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();
  
  // State management
  const bowlSizeRef = useRef(null);
  const [selectedBowlSize, setSelectedBowlSize] = useState(null);
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

  // Helper function for theme classes
  const getThemeClasses = (selected) => {
    const baseClasses = "p-4 rounded-lg flex flex-col items-center justify-center gap-2 transition-all";
    if (selected) {
      return `${baseClasses} ${isDarkMode ? 'bg-orange-500' : 'bg-orange-500'} text-white`;
    }
    return `${baseClasses} ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-50 hover:bg-gray-100'}`;
  };

  // Navigation handler
  const handleNavigateToSummary = () => {
    const rawData = prepareRawData(
      noodleStyle,
      selectedNoodle,
      selectedSoup,
      tasteValues,
      noodleTypes,
      soupTypes
    );
    const data = prepareApiData(
      noodleStyle,
      selectedNoodle,
      selectedSoup,
      selectedBowlSize,
      tasteValues,
      noodleTypes,
      soupTypes
    );
    navigate('/summary', { 
      state: { 
        customization: rawData ,
        apidata: data
      }
    });
  };

  // Enhanced Magic Menu Generator
  const generateMagicPreferences = () => {
    const timeOfDay = new Date().getHours();
    let preferences;
    
    // Randomly select noodle style
    const randomStyle = noodleStyles[Math.floor(Math.random() * noodleStyles.length)].id;
    setTimeout(() => setNoodleStyle(randomStyle), 300);

    // Randomly select noodle type
    const randomNoodle = noodleTypes[Math.floor(Math.random() * noodleTypes.length)].id;
    setTimeout(() => setSelectedNoodle(randomNoodle), 600);

    // Randomly select soup type if noodle style is soup
    if (randomStyle === 'soup') {
      const randomSoup = soupTypes[Math.floor(Math.random() * soupTypes.length)].id;
      setTimeout(() => setSelectedSoup(randomSoup), 900);
    }

    const randomBowl = bowlSizes[Math.floor(Math.random() * bowlSizes.length)].id;
    setTimeout(() => setSelectedBowlSize(randomBowl), 1200);

    // Generate time-based taste preferences
    if (timeOfDay < 11) {
      preferences = {
        spicy: 25,
        salty: 50,
        sour: 25,
        sweet: 25,
        message: "🌅 เมนูเช้าแบบกลมกล่อม ทานง่าย เพิ่มพลังให้วันนี้!"
      };
    } else if (timeOfDay < 15) {
      preferences = {
        spicy: 75,
        salty: 50,
        sour: 50,
        sweet: 0,
        message: "🌞 เมนูกลางวันจัดจ้าน เผ็ดร้อนสะใจ แก้ง่วงยามบ่าย!"
      };
    } else {
      preferences = {
        spicy: 50,
        salty: 50,
        sour: 25,
        sweet: 25,
        message: "🌙 เมนูเย็นรสกลมกล่อม อร่อยสบายท้อง พร้อมพักผ่อน"
      };
    }

    // Apply the preferences
    setTimeout(() => setTasteValues(preferences), 1500);

    // Show recommendation message
    const messageElement = document.createElement('div');
    messageElement.className = 'fixed top-4 right-4 bg-white/90 text-gray-800 p-4 rounded-lg shadow-lg z-50 animate-fade-in';
    messageElement.innerHTML = `
      <div class="flex items-center gap-2">
        <span class="animate-bounce">✨</span>
        ${preferences.message}
        <span class="animate-bounce">✨</span>
      </div>
    `;
    document.body.appendChild(messageElement);
    setTimeout(() => messageElement.remove(), 3000);
  };
// Effect hooks
useEffect(() => {
  const handleScroll = () => {
    setShowBackToTop(window.scrollY > 400);
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

// Auto-scroll effect when noodleStyle changes
useEffect(() => {
  if (noodleStyle) {
    setTimeout(() => scrollToRef(noodleRef), 300);
  }
}, [noodleStyle]);

// Auto-scroll effect when selectedNoodle changes
useEffect(() => {
  if (selectedNoodle && noodleStyle === 'soup') {
    setTimeout(() => scrollToRef(soupRef), 300);
  }
}, [selectedNoodle, noodleStyle]);

// Auto-scroll effect when selectedSoup changes
useEffect(() => {
  if ((selectedSoup && noodleStyle === 'soup') || (selectedNoodle && noodleStyle === 'dry')) {
    setTimeout(() => scrollToRef(tasteRef), 300);
  }
}, [selectedSoup, selectedNoodle, noodleStyle]);

// Scroll helper function
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
            onClick={toggleTheme}
            className={`p-2 rounded-full ${
              isDarkMode ? 'bg-gray-800 text-yellow-500' : 'bg-white/80 text-gray-600'
            } shadow-md hover:shadow-lg transition-all`}
          >
            {isDarkMode ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
          </motion.button>
          <UserMenu />
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
        } text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group`}
      >
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <Sparkles className="w-5 h-5" />
        </motion.div>
        <span className="relative">
          ✨ ให้เราแนะนำเมนูที่ใช่สำหรับคุณ
        </span>
        <motion.div
          animate={{
            rotate: [0, -360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <Sparkles className="w-5 h-5" />
        </motion.div>
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
                <motion.span 
                  className="text-2xl"
                  animate={noodleStyle === style.id ? {
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  } : {}}
                  transition={{ duration: 0.5 }}
                >
                  {style.icon}
                </motion.span>
                <span className="font-semibold">{style.name}</span>
                <span className={`text-sm ${
                  noodleStyle === style.id ? 'text-white' : 'opacity-75'
                }`}>{style.description}</span>
              </motion.button>
            ))}
          </div>
        </motion.section>

        {/* Noodle Type Selection */}
        <AnimatePresence>
          {noodleStyle && (
            <motion.section
              ref={noodleRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`${
                isDarkMode ? 'bg-gray-800/50' : 'bg-white/80'
              } backdrop-blur-sm rounded-xl p-6 shadow-lg mb-6`}
            >
              <h2 className="text-xl font-semibold mb-4">2. เลือกชนิดเส้น</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {noodleTypes.map((noodle, index) => (
                  <motion.button
                    key={noodle.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      transition: { delay: index * 0.1 }
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={getThemeClasses(selectedNoodle === noodle.id)}
                    onClick={() => setSelectedNoodle(noodle.id)}
                  >
                    <motion.span 
                      className="text-2xl"
                      animate={selectedNoodle === noodle.id ? {
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, -10, 0]
                      } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      {noodle.icon}
                    </motion.span>
                    <span className="font-semibold">{noodle.name}</span>
                    <span className={`text-sm ${
                      selectedNoodle === noodle.id ? 'text-white' : 'opacity-75'
                    }`}>{noodle.description}</span>
                  </motion.button>
                ))}
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Soup Type Selection */}
        <AnimatePresence>
          {noodleStyle === 'soup' && selectedNoodle && (
            <motion.section
              ref={soupRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`${
                isDarkMode ? 'bg-gray-800/50' : 'bg-white/80'
              } backdrop-blur-sm rounded-xl p-6 shadow-lg mb-6`}
            >
              <h2 className="text-xl font-semibold mb-4">3. เลือกน้ำซุป</h2>
              <div className="grid grid-cols-2 gap-4">
                {soupTypes.map((soup, index) => (
                  <motion.button
                    key={soup.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      transition: { delay: index * 0.1 }
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={getThemeClasses(selectedSoup === soup.id)}
                    onClick={() => setSelectedSoup(soup.id)}
                  >
                    <motion.div 
                      className={`p-2 rounded-full ${
                        selectedSoup === soup.id ? 'bg-white/20' : ''
                      }`}
                    >
                      {soup.icon}
                    </motion.div>
                    <span className="font-semibold">{soup.name}</span>
                    <span className={`text-sm ${
                      selectedSoup === soup.id ? 'text-white' : 'opacity-75'
                    }`}>{soup.description}</span>
                  </motion.button>
                ))}
              </div>
            </motion.section>
          )}
        </AnimatePresence>
        <AnimatePresence>
  {selectedNoodle && (
    <motion.section
      ref={bowlSizeRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`${
        isDarkMode ? 'bg-gray-800/50' : 'bg-white/80'
      } backdrop-blur-sm rounded-xl p-6 shadow-lg mb-6`}
    >
      <h2 className="text-xl font-semibold mb-4">4. เลือกขนาดชาม</h2>
      <div className="grid grid-cols-3 gap-4">
        {bowlSizes.map((size) => (
          <motion.button
            key={size.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedBowlSize(size.id)}
            className={`flex flex-col items-center p-6 rounded-xl transition-all ${
              selectedBowlSize === size.id
                ? 'bg-orange-500 text-white'
                : isDarkMode
                  ? 'bg-gray-700 hover:bg-gray-600'
                  : 'bg-white hover:bg-gray-50'
            }`}
          >
            <span className="text-3xl mb-2">{size.icon}</span>
            <h3 className="font-semibold mb-1">{size.name}</h3>
            <p className={`text-sm text-center ${
              selectedBowlSize === size.id ? 'text-white/90' : 'opacity-75'
            }`}>
              {size.description}
            </p>
            <span className={`text-xs mt-2 ${
              selectedBowlSize === size.id ? 'text-white/80' : 'opacity-60'
            }`}>
              {size.calories}
            </span>
          </motion.button>
        ))}
      </div>
    </motion.section>
  )}
</AnimatePresence>
        {/* Taste Preferences */}
        <AnimatePresence>
          {selectedNoodle && (noodleStyle === 'dry' || selectedSoup) && (
            <motion.section
              ref={tasteRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`${
                isDarkMode ? 'bg-gray-800/50' : 'bg-white/80'
              } backdrop-blur-sm rounded-xl p-6 shadow-lg mb-6`}
            >
              <h2 className="text-xl font-semibold mb-4">
                {noodleStyle === 'dry' ? '3.' : '5.'} ปรับแต่งรสชาติ
              </h2>
              <div className="space-y-8">
                {tastePreferences.map((taste, index) => (
                  <motion.div
                    key={taste.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ 
                      opacity: 1, 
                      x: 0,
                      transition: { delay: index * 0.1 }
                    }}
                    className="space-y-3"
                  >
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
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Summary Navigation Button */}
        {selectedNoodle && (noodleStyle === 'dry' || selectedSoup) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-end"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNavigateToSummary}
              className={`px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2`}
            >
              ดูสรุปสูตรของคุณ
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
