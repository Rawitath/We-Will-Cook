import React, { useState, useEffect } from 'react';
import { Search, X,Moon, Sun, ChefHat, Bookmark, TrendingUp, Heart } from 'lucide-react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import foodPlaceholder from './foodplaceholder.jpg';

const tastes = [
  { label: 'Spicy', emoji: '🌶️', description: 'Hot and fiery dishes' },
  { label: 'Sour', emoji: '🍋', description: 'Tangy and zesty flavors' },
  { label: 'Sweet', emoji: '🍪', description: 'Sugary and delightful' },
  { label: 'Salty', emoji: '🧂', description: 'Savory goodness' },
  { label: 'Bitter', emoji: '☕', description: 'Complex and bold' },
  { label: 'Umami', emoji: '🍜', description: 'Rich and savory' },
  { label: 'Crispy', emoji: '🥨', description: 'Crunchy textures' },
  { label: 'Creamy', emoji: '🥛', description: 'Smooth and velvety' }
];

const greetings = [
  { text: "สวัสดี Chef, วันนี้คุณจะกินอะไร?", lang: "th" },
  { text: "Hello Chef, ready to create something amazing?", lang: "en" },
  { text: "こんにちは Chef, 今日は何を作りましょうか?", lang: "ja" },
  { text: "안녕하세요 Chef, 오늘은 무엇을 요리하시겠어요?", ko: "ko" },
  { text: "Bonjour Chef, prêt à créer un chef-d'œuvre?", lang: "fr" }
];

const trendingRecipes = [
  { id: 1, title: "Tom Yum Kung", likes: 1234, bookmarks: 567, difficulty: "Medium" },
  { id: 2, title: "Green Curry", likes: 890, bookmarks: 234, difficulty: "Easy" },
  { id: 3, title: "Pad Thai", likes: 2345, bookmarks: 890, difficulty: "Easy" },
  { id: 4, title: "Som Tum", likes: 567, bookmarks: 123, difficulty: "Medium" }
];

const TasteButton = ({ label, emoji, description, active, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.02, y: -2 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`group flex flex-col items-center justify-center p-4 rounded-xl w-full transition-all duration-300 ease-in-out
    ${active 
      ? 'bg-gradient-to-br from-orange-400 to-orange-600 text-white shadow-lg' 
      : 'bg-white/80 hover:bg-white text-gray-700 hover:shadow-md backdrop-blur-sm'}`}
    layout
  >
    <motion.span 
      className="text-2xl mb-2"
      animate={{ rotate: active ? 360 : 0, scale: active ? 1.2 : 1 }}
      transition={{ duration: 0.5 }}
    >
      {emoji}
    </motion.span>
    <span className="font-medium">{label}</span>
    <span className="text-xs mt-1 opacity-70">{description}</span>
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
          setTimeout(() => setIsDeleting(true), 2000);
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
    <span className="relative">
      {displayText}
      <span className="absolute -right-1 top-0 animate-pulse text-orange-500">|</span>
    </span>
  );
};

const RecipeCard = ({ item, onClick }) => (
  <motion.div
    whileHover={{ scale: 1.03, y: -5 }}
    whileTap={{ scale: 0.98 }}
    className="cursor-pointer group"
    onClick={onClick}
  >
    <div className="relative rounded-xl overflow-hidden bg-white/80 backdrop-blur-sm shadow-md transition-all duration-300 group-hover:shadow-xl">
      <img 
        src={foodPlaceholder}
        alt={item.title}
        className="w-full h-40 object-cover transition-all duration-500 group-hover:brightness-110"
      />
      <div className="p-4">
        <h3 className="font-semibold mb-2 group-hover:text-orange-500 transition-colors">{item.title}</h3>
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Heart size={14} className="text-red-400" />
              {item.likes}
            </span>
            <span className="flex items-center gap-1">
              <Bookmark size={14} className="text-blue-400" />
              {item.bookmarks}
            </span>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs ${
            item.difficulty === 'Easy' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
          }`}>
            {item.difficulty}
          </span>
        </div>
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
    }, 8000);
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
    <LayoutGroup>
      <div className={`min-h-screen transition-all duration-500 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100' 
          : 'bg-gradient-to-br from-orange-50 via-pink-50 to-orange-100 text-gray-800'
      }`}>
        <div className="max-w-5xl mx-auto p-6">
          <motion.header 
            className="flex justify-between items-center mb-12"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <motion.div 
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <ChefHat className="w-8 h-8 text-orange-500" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                We Will Cook
              </h1>
            </motion.div>
            <div className="flex gap-4">
              <motion.button 
                className={`p-3 rounded-xl transition-all duration-300 ${
                  isDarkMode 
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                    : 'bg-white/80 text-gray-700 hover:bg-white'
                } backdrop-blur-sm shadow-md hover:shadow-lg`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDarkModeToggle}
              >
                {isDarkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </motion.button>
              <motion.button 
                className="px-6 py-3 rounded-xl font-medium bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-md hover:shadow-lg transition-all duration-300"
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-2xl text-center mb-8 min-h-[2em] font-medium"
            >
              <TypewriterText text={greetings[currentGreetingIndex].text} />
            </motion.h2>
          </AnimatePresence>

          <div className="relative mb-8 flex justify-center">
            <motion.div 
              className="w-full max-w-2xl relative"
              whileHover={{ scale: 1.01 }}
            >
              <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
                isSearchFocused ? 'text-orange-500' : 'text-gray-400'
              }`} />
              <input
                type="text"
                placeholder="Search recipes..."
                className={`w-full pl-12 pr-4 py-4 rounded-xl border-2 transition-all duration-300 ${
                  isDarkMode 
                    ? 'bg-gray-800/50 border-gray-700 focus:border-orange-500' 
                    : 'bg-white/80 border-gray-200 focus:border-orange-300'
                } backdrop-blur-sm focus:ring-4 ${
                  isDarkMode ? 'focus:ring-orange-500/20' : 'focus:ring-orange-200'
                }`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
              <AnimatePresence>
                {searchQuery && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2"
                    onClick={() => setSearchQuery('')}
                  >
                    <X className="text-gray-400 hover:text-gray-600 transition-colors" size={18} />
                  </motion.button>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          <motion.div layout className="mb-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {tastes.map((taste) => (
                <TasteButton
                  key={taste.label}
                  {...taste}
                  active={activeTastes.has(taste.label)}
                  onClick={() => handleTasteClick(taste.label)}
                />
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 mb-8"
          >
            <div className="flex items-center mb-6">
              <TrendingUp className="w-6 h-6 mr-2 text-orange-500" />
              <h3 className="text-xl font-semibold">Trending Recipes</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {trendingRecipes.map((item) => (
                <RecipeCard
                  key={item.id}
                  item={item}
                  onClick={() => handleRecentSearchClick(item)}
                />
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="flex justify-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.button
              className={`px-12 py-4 text-lg font-medium rounded-xl shadow-lg transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white' 
                  : 'bg-gradient-to-r from-orange-500 to-pink-500 text-white'
              } hover:shadow-xl hover:scale-105`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Let's Start Cooking
            </motion.button>
          </motion.div>
        </div>
      </div>
    </LayoutGroup>
  );
};

export default App;