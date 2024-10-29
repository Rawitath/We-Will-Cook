import React, { useState, useEffect } from 'react';
import { Search, X, Clock, Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const tastes = [
  { label: 'Spicy', emoji: '🌶️' },
  { label: 'Sour', emoji: '🍋' },
  { label: 'Sweet', emoji: '🍪' },
  { label: 'Salty', emoji: '🧂' },
  { label: 'Bitter', emoji: '☕' },
  { label: 'Umami', emoji: '🍜' },
  { label: 'Crispy', emoji: '🥨' },
  { label: 'Creamy', emoji: '🥛' }
];

const greetings = [
  { text: "สวัสดี User วันนี้คุณจะกินอะไร?", lang: "th" },
  { text: "Hello User, what would you like to eat today?", lang: "en" },
  { text: "こんにちは User, 今日は何を食べたいですか?", lang: "ja" },
  { text: "안녕하세요 User, 오늘은 뭐 드시겠어요?", lang: "ko" },
  { text: "Bonjour User, que voulez-vous manger aujourd'hui?", lang: "fr" }
];

const recentSearches = [
  { id: 1, title: "Tom Yum Kung" },
  { id: 2, title: "Green Curry" },
  { id: 3, title: "Pad Thai" },
  { id: 4, title: "Som Tum" }
];

const TasteButton = ({ label, emoji, active, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`flex items-center justify-center p-4 rounded-lg w-full transition-all duration-300 ease-in-out
    ${active ? 'bg-orange-500 text-white shadow-md' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
    layout
  >
    <motion.span 
      className="mr-2"
      animate={{ rotate: active ? 360 : 0 }}
      transition={{ duration: 0.5 }}
    >
      {emoji}
    </motion.span>
    <span>{label}</span>
  </motion.button>
);

const TypewriterText = ({ text }) => {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < text.length) {
          setDisplayText(text.slice(0, displayText.length + 1));
          setTypingSpeed(150);
        } else {
          setIsDeleting(true);
          setTypingSpeed(100);
          setTimeout(() => {}, 2000); // Pause before deleting
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(text.slice(0, displayText.length - 1));
          setTypingSpeed(100);
        } else {
          setIsDeleting(false);
          setLoopNum(loopNum + 1);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, text]);

  return (
    <span>{displayText}<span className="animate-pulse">|</span></span>
  );
};

const RecentSearchItem = ({ item, onClick }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="cursor-pointer group"
    onClick={onClick}
  >
    <div className="relative rounded-lg overflow-hidden">
      <img 
        src="/api/placeholder/400/320"
        alt={item.title}
        className="w-full h-32 object-cover group-hover:brightness-90 transition-all"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
        <p className="text-white text-sm font-medium truncate">{item.title}</p>
      </div>
    </div>
  </motion.div>
);

const App = () => {
  const [activeTastes, setActiveTastes] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [currentGreetingIndex, setCurrentGreetingIndex] = useState(0);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGreetingIndex((prev) => (prev + 1) % greetings.length);
    }, 8000); // Increased time to allow for typing animation
    return () => clearInterval(interval);
  }, []);

  const handleTasteClick = (taste) => {
    const newTastes = new Set(activeTastes);
    if (newTastes.has(taste)) {
      newTastes.delete(taste);
    } else {
      newTastes.add(taste);
    }
    setActiveTastes(newTastes);
  };

  const handleRecentSearchClick = (item) => {
    setSearchQuery(item.title);
  };

  const handleDarkModeToggle = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-gray-300' : 'bg-gradient-to-b from-orange-50 to-pink-100 text-gray-800'}`}>
      <div className="max-w-4xl mx-auto p-6">
        <motion.header 
          className="flex justify-between items-center mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <motion.h1 
            className="text-2xl font-bold"
            whileHover={{ scale: 1.05 }}
          >
            We Will Cook
          </motion.h1>
          <div className="flex gap-4">
            <motion.button 
              className={`px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors ${isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-700'}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDarkModeToggle}
            >
              {isDarkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </motion.button>
            <motion.button 
              className={`px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors ${isDarkMode ? 'bg-orange-500 text-gray-900' : 'bg-orange-500 text-white'}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign Up
            </motion.button>
          </div>
        </motion.header>

        <AnimatePresence mode="wait">
          <motion.h2
            key={currentGreetingIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-xl text-center mb-6 min-h-[2em]"
          >
            <TypewriterText text={greetings[currentGreetingIndex].text} />
          </motion.h2>
        </AnimatePresence>

        <div className="relative mb-6 flex justify-center">
          <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${isSearchFocused ? 'text-orange-500' : `${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`}`} />
          <input
            type="text"
            placeholder="Search recipes..."
            className={`w-full max-w-2xl pl-12 pr-4 py-3 rounded-lg border transition-all ${isDarkMode ? 'bg-gray-800 border-gray-700 focus:ring-orange-500' : 'bg-white border-gray-200 focus:ring-orange-200'}`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
          />
          {searchQuery && (
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2"
              onClick={() => setSearchQuery('')}
            >
              <X className={`transition-colors duration-300 ${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}`} size={18} />
            </motion.button>
          )}
        </div>

        <motion.div layout className="mb-6">
          <motion.div className="grid grid-cols-2 gap-4">
            {tastes.map((taste) => (
              <TasteButton
                key={taste.label}
                {...taste}
                active={activeTastes.has(taste.label)}
                onClick={() => handleTasteClick(taste.label)}
              />
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 mb-8"
        >
          <div className="flex items-center mb-4">
            <Clock className={`w-5 h-5 mr-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
            <h3 className="text-lg font-semibold">Recent Searches</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {recentSearches.map((item) => (
              <RecentSearchItem
                key={item.id}
                item={item}
                onClick={() => handleRecentSearchClick(item)}
              />
            ))}
          </div>
        </motion.div>

        <motion.div 
          className="flex justify-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.button
            className={`px-8 py-4 text-lg font-semibold rounded-lg shadow-lg transition-colors ${isDarkMode ? 'bg-orange-500 text-gray-900 hover:bg-orange-600' : 'bg-orange-500 text-white hover:bg-orange-600'}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Let's Start
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default App;