// src/pages/CalibrationPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, 
  Flame, 
  FishSymbol, 
  Soup,
  Coffee,
  Scale
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const questions = [
  {
    id: 1,
    question: "คุณชอบความเผ็ดระดับไหน?",
    icon: <Flame className="w-6 h-6 text-red-500" />,
    options: [
      { value: 1, label: "ไม่เผ็ดเลย" },
      { value: 2, label: "เผ็ดน้อย" },
      { value: 3, label: "เผ็ดปานกลาง" },
      { value: 4, label: "เผ็ดมาก" },
      { value: 5, label: "เผ็ดที่สุด" }
    ]
  },
  {
    id: 2,
    question: "คุณชอบน้ำซุปแบบไหน?",
    icon: <Soup className="w-6 h-6 text-blue-500" />,
    options: [
      { value: 'clear', label: "น้ำซุปใส" },
      { value: 'tomyum', label: "ต้มยำ" },
      { value: 'creamy', label: "น้ำข้น" },
      { value: 'spicy', label: "เผ็ด" }
    ]
  },
  {
    id: 3,
    question: "ระดับความเค็มที่คุณชอบ?",
    icon: <FishSymbol className="w-6 h-6 text-yellow-500" />,
    options: [
      { value: 1, label: "จืด" },
      { value: 2, label: "เค็มน้อย" },
      { value: 3, label: "เค็มกำลังดี" },
      { value: 4, label: "เค็มมาก" }
    ]
  },
  // Add more questions as needed
];

export default function CalibrationPage() {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});

  const handleAnswer = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => setCurrentQuestion(prev => prev + 1), 500);
    } else {
      // Save calibration data
      localStorage.setItem('userPreferences', JSON.stringify(answers));
      navigate('/customize');
    }
  };

  return (
    <div className={`min-h-screen ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100' 
        : 'bg-gradient-to-br from-orange-50 via-pink-50 to-orange-100 text-gray-800'
    }`}>
      <div className="max-w-4xl mx-auto p-6">
        <header className="flex items-center gap-4 mb-12">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate(-1)}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
            มาทำความรู้จักรสชาติที่คุณชอบกัน
          </h1>
        </header>

        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className={`${
            isDarkMode ? 'bg-gray-800/50' : 'bg-white/80'
          } backdrop-blur-sm rounded-xl p-8 shadow-xl`}
        >
          <div className="flex items-center gap-4 mb-8">
            {questions[currentQuestion].icon}
            <h2 className="text-xl font-semibold">
              {questions[currentQuestion].question}
            </h2>
          </div>

          <div className="grid gap-4">
            {questions[currentQuestion].options.map((option) => (
              <motion.button
                key={option.value}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAnswer(questions[currentQuestion].id, option.value)}
                className={`p-4 rounded-xl ${
                  isDarkMode 
                    ? 'bg-gray-700 hover:bg-gray-600' 
                    : 'bg-white hover:bg-gray-50'
                } text-left transition-all`}
              >
                {option.label}
              </motion.button>
            ))}
          </div>

          <div className="mt-8 flex justify-between items-center text-sm opacity-70">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-orange-500 rounded-full transition-all"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}