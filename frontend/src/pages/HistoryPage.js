// src/pages/HistoryPage.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronLeft,
  Heart,
  Bookmark,
  Clock,
  Search,
  Filter
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

export default function HistoryPage() {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState('history'); // 'history', 'favorites', 'saved'
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data - in real app, this would come from API/database
  const recipes = [
    {
      id: 1,
      name: "เส้นเล็กต้มยำน้ำข้น",
      date: "2024-03-15",
      spiciness: 80,
      isFavorite: true,
      isSaved: true
    },
    {
      id: 2,
      name: "บะหมี่น้ำใสหมูกรอบ",
      date: "2024-03-14",
      spiciness: 40,
      isFavorite: false,
      isSaved: true
    },
    // Add more recipes
  ];

  return (
    <div className={`min-h-screen ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100' 
        : 'bg-gradient-to-br from-orange-50 via-pink-50 to-orange-100 text-gray-800'
    }`}>
      <div className="max-w-4xl mx-auto p-6">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate(-1)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              ประวัติการปรุงของคุณ
            </h1>
          </div>
        </header>

        {/* Search and Filter */}
        <div className="flex gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="ค้นหาสูตรของคุณ..."
              className={`w-full pl-12 pr-4 py-3 rounded-xl ${
                isDarkMode ? 'bg-gray-800' : 'bg-white/80'
              } backdrop-blur-sm`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`p-3 rounded-xl ${
              isDarkMode ? 'bg-gray-800' : 'bg-white/80'
            } backdrop-blur-sm`}
          >
            <Filter className="w-6 h-6" />
          </motion.button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          {[
            { id: 'history', icon: <Clock />, label: 'ประวัติ' },
            { id: 'favorites', icon: <Heart />, label: 'ถูกใจ' },
            { id: 'saved', icon: <Bookmark />, label: 'บันทึก' }
          ].map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl ${
                activeTab === tab.id
                  ? 'bg-orange-500 text-white'
                  : isDarkMode
                    ? 'bg-gray-800'
                    : 'bg-white/80'
              } backdrop-blur-sm transition-all`}
            >
              {tab.icon}
              {tab.label}
            </motion.button>
          ))}
        </div>

        {/* Recipe List */}
        <div className="grid gap-4">
          {recipes.map((recipe) => (
            <motion.div
              key={recipe.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              className={`p-6 rounded-xl ${
                isDarkMode ? 'bg-gray-800' : 'bg-white/80'
              } backdrop-blur-sm cursor-pointer`}
              onClick={() => navigate(`/summary/${recipe.id}`)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg mb-2">{recipe.name}</h3>
                  <p className="text-sm opacity-70">
                    {new Date(recipe.date).toLocaleDateString('th-TH', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  {recipe.isFavorite && (
                    <Heart className="w-5 h-5 text-red-500 fill-current" />
                  )}
                  {recipe.isSaved && (
                    <Bookmark className="w-5 h-5 text-blue-500 fill-current" />
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}