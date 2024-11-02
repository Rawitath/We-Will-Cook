import React, { useState, useEffect } from 'react';
import { ChefHat, Moon, Sun, ArrowRight, Heart, Clock, Bookmark, Star, User, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const features = [
  {
    icon: <Clock className="w-6 h-6 text-blue-500" />,
    title: "การค้นหาล่าสุด",
    description: "เข้าถึงประวัติการทำอาหารของคุณได้อย่างรวดเร็ว"
  },
  {
    icon: <Heart className="w-6 h-6 text-red-500" />,
    title: "สูตรอาหารโปรด",
    description: "บันทึกจานอาหารอันเป็นที่รักของคุณ"
  },
  {
    icon: <Star className="w-6 h-6 text-yellow-500" />,
    title: "คำแนะนำส่วนบุคคล",
    description: "ค้นพบสูตรอาหารที่คุณจะต้องชอบ"
  },
  {
    icon: <Bookmark className="w-6 h-6 text-green-500" />,
    title: "คอลเลคชั่น",
    description: "จัดระเบียบสูตรอาหารตามแบบของคุณ"
  }
];

const sampleRecipes = [
  {
    title: "Tom Yum Kung",
    image: "/api/placeholder/300/200",
    difficulty: "Medium",
    time: "45 mins",
    likes: 1234
  },
  {
    title: "Pad Thai",
    image: "/api/placeholder/300/200",
    difficulty: "Easy",
    time: "30 mins",
    likes: 2345
  },
  {
    title: "Green Curry",
    image: "/api/placeholder/300/200",
    difficulty: "Medium",
    time: "60 mins",
    likes: 1890
  },
  {
    title: "Mango Sticky Rice",
    image: "{foodplaceholder.jpg}",
    difficulty: "Easy",
    time: "25 mins",
    likes: 3456
  }
];

const RecipeCard = ({ recipe, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className={`relative group rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm`}
  >
    <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
      <h3 className="font-semibold text-lg mb-1">{recipe.title}</h3>
      <div className="flex items-center gap-3 text-sm">
        <span className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          {recipe.time}
        </span>
        <span className="flex items-center gap-1">
          <Heart className="w-4 h-4" />
          {recipe.likes}
        </span>
        <span className={`px-2 py-1 rounded-full text-xs ${
          recipe.difficulty === 'Easy' ? 'bg-green-500' : 'bg-orange-500'
        }`}>
          {recipe.difficulty}
        </span>
      </div>
    </div>
  </motion.div>
);

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeRecipeIndex, setActiveRecipeIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveRecipeIndex((prev) => (prev + 1) % sampleRecipes.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100' 
        : 'bg-gradient-to-br from-orange-50 via-pink-50 to-orange-100 text-gray-800'
    }`}>
      <div className="max-w-6xl mx-auto p-6">
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
          <motion.button 
            className={`p-3 rounded-xl transition-all duration-300 ${
              isDarkMode 
                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                : 'bg-white/80 text-gray-700 hover:bg-white'
            } backdrop-blur-sm shadow-md hover:shadow-lg`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsDarkMode(!isDarkMode)}
          >
            {isDarkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </motion.button>
        </motion.header>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="space-y-4">
              <h2 className="text-4xl font-bold">"วันนี้กินก๋วยเตี๋ยวอะไรดีน้า"</h2>
              <p className="text-xl opacity-80">
              สร้างบัญชีเพื่อปลดล็อคประสบการณ์การทำอาหารแบบส่วนตัว
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-xl ${
                    isDarkMode ? 'bg-gray-800' : 'bg-white/80'
                  } backdrop-blur-sm shadow-md`}
                >
                  <div className="mb-2">{feature.icon}</div>
                  <h3 className="font-semibold mb-1">{feature.title}</h3>
                  <p className="text-sm opacity-70">{feature.description}</p>
                </motion.div>
              ))}
            </div>

            <div className="space-y-4">
              <motion.button
                className="w-full px-6 py-4 rounded-xl font-medium bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <User className="w-5 h-5" />
                Create Free Account
              </motion.button>

              <motion.button
                className={`w-full px-6 py-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                  isDarkMode 
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                    : 'bg-white/80 hover:bg-white text-gray-700'
                } backdrop-blur-sm shadow-md hover:shadow-lg`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Continue as Guest
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className={`w-full h-full ${
              isDarkMode ? 'bg-gray-800' : 'bg-white/80'
            } backdrop-blur-sm p-6`}>
              <div className="space-y-6">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">โอ้ว! ยินดีต้อนรับกลับมาครับ/ค่ะ Chef!</h3>
                    <p className="text-sm opacity-70">พร้อมที่จะปรุงอาหารบางอย่างที่น่าทึ่งหรือยัง?</p>
                  </div>
                </div>

                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search your recent recipes..."
                    className={`w-full pl-12 pr-4 py-3 rounded-xl ${
                      isDarkMode ? 'bg-gray-700' : 'bg-white'
                    } border-2 border-transparent focus:border-orange-500 transition-all`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Recent Searches</h4>
                  <div className="grid gap-4">
                    {['เส้นเล็กน้ำใสแบบเปรี้ยวๆ', 'บะหมี่หมูกรอบต้มยำ', 'เย็นตะโฟ'].map((item, index) => (
                      <motion.div
                        key={item}
                        className={`p-4 rounded-xl ${
                          isDarkMode ? 'bg-gray-700' : 'bg-white'
                        } cursor-pointer hover:shadow-md transition-all duration-300`}
                        whileHover={{ scale: 1.02, x: 10 }}
                      >
                        <div className="flex items-center justify-between">
                          <span>{item}</span>
                          <Clock className="w-4 h-4 opacity-50" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12"
        >
          <h3 className="text-2xl font-semibold mb-6">Popular Recipes</h3>
          <div className="grid md:grid-cols-4 gap-6">
            {sampleRecipes.map((recipe, index) => (
              <RecipeCard key={recipe.title} recipe={recipe} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}