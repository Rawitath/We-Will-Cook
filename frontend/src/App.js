import React, { useState, useEffect } from 'react';
import { Search, X, Clock } from 'lucide-react';
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
    className={`flex items-center justify-center p-4 rounded-lg w-full 
    ${active ? 'bg-orange-100 shadow-md' : 'bg-white hover:bg-orange-50'} 
    transition-all duration-300 ease-in-out`}
    layout
  >
    <motion.span 
      className="mr-2"
      animate={{ rotate: active ? 360 : 0 }}
      transition={{ duration: 0.5 }}
    >
      {emoji}
    </motion.span>
    <span className="text-gray-700">{label}</span>
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-pink-100">
      <div className="max-w-4xl mx-auto p-6">
        <motion.header 
          className="flex justify-between items-center mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <motion.h1 
            className="text-2xl font-bold text-gray-800"
            whileHover={{ scale: 1.05 }}
          >
            We Will Cook
          </motion.h1>
          <div className="flex gap-4">
            <motion.button 
              className="px-4 py-2 rounded-lg bg-white text-gray-800 hover:bg-gray-50 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Login
            </motion.button>
            <motion.button 
              className="px-4 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition-colors"
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
            className="text-xl text-center mb-6 text-gray-700 min-h-[2em]"
          >
            <TypewriterText text={greetings[currentGreetingIndex].text} />
          </motion.h2>
        </AnimatePresence>

        <motion.div 
          className="relative mb-6"
          animate={{ scale: isSearchFocused ? 1.02 : 1 }}
        >
          <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${isSearchFocused ? 'text-orange-500' : 'text-gray-400'}`} />
          <input
            type="text"
            placeholder="Search recipes..."
            className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all"
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
              <X className="text-gray-400 hover:text-gray-600" size={18} />
            </motion.button>
          )}
        </motion.div>

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
            <Clock className="w-5 h-5 text-gray-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-800">Recent Searches</h3>
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
            className="px-8 py-4 bg-orange-500 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-orange-600 transition-colors"
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