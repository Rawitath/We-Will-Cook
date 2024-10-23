import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react'; // Removed unused Loader2
import { motion, AnimatePresence } from 'framer-motion';

// Define the tastes array that was missing
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

// Language animations and greetings
const greetings = [
  { text: "สวัสดี User วันนี้คุณจะกินอะไร?", lang: "th" },
  { text: "Hello User, what would you like to eat today?", lang: "en" },
  { text: "こんにちは User, 今日は何を食べたいですか?", lang: "ja" },
  { text: "안녕하세요 User, 오늘은 뭐 드시겠어요?", lang: "ko" },
  { text: "Bonjour User, que voulez-vous manger aujourd'hui?", lang: "fr" }
];

// Shimmer loading effect component
const ShimmerEffect = () => (
  <div className="animate-pulse">
    <div className="h-32 bg-gray-200 rounded-lg mb-4"></div>
  </div>
);

// Enhanced TasteButton with animations
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

// Enhanced Recipe Card with animations
const RecipeCard = ({ recipe, onClick }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    whileHover={{ scale: 1.03, y: -5 }}
    className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
    onClick={onClick}
  >
    {recipe.image && (
      <img 
        src={recipe.image} 
        alt={recipe.title} 
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
    )}
    <h3 className="text-lg font-medium text-gray-800">{recipe.title}</h3>
    <p className="text-sm text-gray-600 mt-2">{recipe.description}</p>
    <div className="flex flex-wrap gap-2 mt-3">
      {recipe.tags?.map((tag) => (
        <span key={tag} className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
          {tag}
        </span>
      ))}
    </div>
  </motion.div>
);

// Main App Component
const App = () => {
  const [activeTastes, setActiveTastes] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentGreetingIndex, setCurrentGreetingIndex] = useState(0);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Initialize with some sample recipes
  useEffect(() => {
    setRecipes([
      {
        id: 1,
        title: "Spicy Pad Thai",
        description: "Classic Thai stir-fried rice noodles",
        image: "/api/placeholder/400/300",
        tags: ["Spicy", "Thai"]
      },
      {
        id: 2,
        title: "Green Curry",
        description: "Creamy Thai green curry",
        image: "/api/placeholder/400/300",
        tags: ["Spicy", "Creamy"]
      },
      {
        id: 3,
        title: "Mango Sticky Rice",
        description: "Sweet coconut sticky rice with mango",
        image: "/api/placeholder/400/300",
        tags: ["Sweet", "Thai"]
      }
    ]);
  }, []);

  // Greetings Animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGreetingIndex((prev) => (prev + 1) % greetings.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Mock API call - Replace with your actual backend endpoint
  const searchRecipes = async (query, tastes) => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Filter recipes based on search query and tastes
      let filtered = [...recipes];
      
      if (query) {
        filtered = filtered.filter(recipe => 
          recipe.title.toLowerCase().includes(query.toLowerCase()) ||
          recipe.description.toLowerCase().includes(query.toLowerCase())
        );
      }
      
      if (tastes.size > 0) {
        filtered = filtered.filter(recipe =>
          recipe.tags.some(tag => tastes.has(tag))
        );
      }
      
      setRecipes(filtered);
    } catch (error) {
      console.error('Error searching recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchRecipes(searchQuery, activeTastes);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [searchQuery, activeTastes]);

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
          <motion.button 
            className="p-2 rounded-full hover:bg-white/50 transition-colors"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            👤
          </motion.button>
        </motion.header>

        <AnimatePresence mode="wait">
          <motion.h2
            key={currentGreetingIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-xl text-center mb-6 text-gray-700"
          >
            {greetings[currentGreetingIndex].text}
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
                onClick={() => {
                  const newTastes = new Set(activeTastes);
                  if (newTastes.has(taste.label)) {
                    newTastes.delete(taste.label);
                  } else {
                    newTastes.add(taste.label);
                  }
                  setActiveTastes(newTastes);
                }}
              />
            ))}
          </motion.div>
        </motion.div>

        <div className="mt-8">
          <AnimatePresence>
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((n) => (
                  <ShimmerEffect key={n} />
                ))}
              </div>
            ) : (
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
                layout
              >
                {recipes.map((recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    onClick={() => {/* Handle recipe click */}}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default App;