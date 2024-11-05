// src/pages/NoodleCustomization.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Search, Soup, Utensils, Coffee, UserCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const noodleTypes = [
  { id: 'sen-lek', name: 'เส้นเล็ก', icon: '🍜' },
  { id: 'sen-yai', name: 'เส้นใหญ่', icon: '🍜' },
  { id: 'sen-mee', name: 'เส้นหมี่', icon: '🍜' },
  { id: 'woon-sen', name: 'วุ้นเส้น', icon: '🍜' }
];

const soupTypes = [
        { id: 'nam-sai', name: 'น้ำใส', icon: <Utensils /> },
        { id: 'tom-yum', name: 'ต้มยำ', icon: <Soup /> },
        { id: 'nam-tok', name: 'น้ำตก', icon: <Coffee /> }
      ];

const toppings = [
  { id: 'moo-daeng', name: 'หมูแดง', category: 'เนื้อสัตว์' },
  { id: 'moo-krob', name: 'หมูกรอบ', category: 'เนื้อสัตว์' },
  { id: 'look-chin', name: 'ลูกชิ้น', category: 'เนื้อสัตว์' },
  { id: 'pak-bung', name: 'ผักบุ้ง', category: 'ผัก' },
  { id: 'ton-hom', name: 'ต้นหอม', category: 'ผัก' },
  { id: 'kana', name: 'คะน้า', category: 'ผัก' }
];

const spiceLevels = [
  { id: 'none', name: 'ไม่เผ็ด', icon: '🌱' },
  { id: 'mild', name: 'เผ็ดน้อย', icon: '🌶️' },
  { id: 'medium', name: 'เผ็ดกลาง', icon: '🌶️🌶️' },
  { id: 'spicy', name: 'เผ็ดมาก', icon: '🌶️🌶️🌶️' }
];

export default function NoodleCustomization() {
  const navigate = useNavigate();
  const [selectedNoodle, setSelectedNoodle] = useState(null);
  const [selectedSoup, setSelectedSoup] = useState(null);
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [selectedSpice, setSelectedSpice] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleToppingToggle = (toppingId) => {
    setSelectedToppings(prev => 
      prev.includes(toppingId)
        ? prev.filter(id => id !== toppingId)
        : [...prev, toppingId]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-orange-100 p-6">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate('/')}
              className="p-2 rounded-full bg-white/80 shadow-md hover:shadow-lg transition-all"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </motion.button>
            <h1 className="text-3xl font-bold text-gray-800">สั่งก๋วยเตี๋ยวของคุณ</h1>
          </div>
          <UserCircle className="w-8 h-8 text-gray-600" />
        </header>

        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="ค้นหาเมนูที่คุณชอบ..."
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white shadow-lg border-2 border-transparent focus:border-orange-500 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="space-y-8">
          {/* Noodle Type Selection */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <h2 className="text-xl font-semibold mb-4">1. เลือกประเภทเส้น</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {noodleTypes.map((noodle) => (
                <motion.button
                  key={noodle.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-4 rounded-lg flex flex-col items-center justify-center gap-2 transition-all ${
                    selectedNoodle === noodle.id
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                  onClick={() => setSelectedNoodle(noodle.id)}
                >
                  <span className="text-2xl">{noodle.icon}</span>
                  <span>{noodle.name}</span>
                </motion.button>
              ))}
            </div>
          </motion.section>

          <AnimatePresence>
            {selectedNoodle && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-xl p-6 shadow-lg"
              >
                <h2 className="text-xl font-semibold mb-4">2. เลือกน้ำซุป</h2>
                <div className="grid grid-cols-3 gap-4">
                  {soupTypes.map((soup) => (
                    <motion.button
                      key={soup.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-4 rounded-lg flex items-center justify-center gap-2 transition-all ${
                        selectedSoup === soup.id
                          ? 'bg-orange-500 text-white'
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                      onClick={() => setSelectedSoup(soup.id)}
                    >
                      {soup.icon}
                      <span>{soup.name}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.section>
            )}

            {selectedSoup && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-xl p-6 shadow-lg"
              >
                <h2 className="text-xl font-semibold mb-4">3. เลือกเครื่อง</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {toppings.map((topping) => (
                    <motion.button
                      key={topping.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-4 rounded-lg flex items-center justify-between transition-all ${
                        selectedToppings.includes(topping.id)
                          ? 'bg-orange-500 text-white'
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                      onClick={() => handleToppingToggle(topping.id)}
                    >
                      <span>{topping.name}</span>
                      <span className="text-sm opacity-70">{topping.category}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.section>
            )}

            {selectedToppings.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-xl p-6 shadow-lg"
              >
                <h2 className="text-xl font-semibold mb-4">4. ระดับความเผ็ด</h2>
                <div className="grid grid-cols-4 gap-4">
                  {spiceLevels.map((level) => (
                    <motion.button
                      key={level.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-4 rounded-lg flex flex-col items-center justify-center gap-2 transition-all ${
                        selectedSpice === level.id
                          ? 'bg-orange-500 text-white'
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                      onClick={() => setSelectedSpice(level.id)}
                    >
                      <span className="text-2xl">{level.icon}</span>
                      <span className="text-sm">{level.name}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.section>
            )}

            {selectedSpice && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-end"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-orange-500 text-white rounded-xl font-semibold shadow-lg hover:bg-orange-600 transition-all flex items-center gap-2"
                >
                  สั่งเลย
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}