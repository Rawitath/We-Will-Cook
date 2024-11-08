// src/pages/CalibrationPage.js
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, 
  Flame, 
  FishSymbol, 
  Soup,
  Coffee,
  Scale,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import AuthContext from '../context/AuthContext';
import axios from 'axios';

const questions = [
  {
    id: 1,
    question: "คุณชอบความเผ็ดระดับไหน?",
    icon: <Flame className="w-6 h-6 text-red-500" />,
    options: [
      { value: 0, label: "ไม่เผ็ดเลย" },
      { value: 0.5, label: "เผ็ดน้อย" },
      { value: 1, label: "เผ็ดปานกลาง" },
      { value: 1.5, label: "เผ็ดมาก" },
      { value: 2, label: "เผ็ดที่สุด" }
    ]
  },
  {
    id: 2,
    question: "คุณชอบความหวานระดับไหน?",
    icon: <Soup className="w-6 h-6 text-blue-500" />,
    options: [
      { value: 0, label: "จืด" },
      { value: 0.5, label: "หวานเล็กน้อย" },
      { value: 1, label: "หวานปานกลาง" },
      { value: 1.5, label: "หวานมาก" },
      { value: 2, label: "หวานตัดขา" },
    ]
  },
  {
    id: 3,
    question: "ระดับความเค็มที่คุณชอบ?",
    icon: <FishSymbol className="w-6 h-6 text-yellow-500" />,
    options: [
      { value: 0, label: "จืด" },
      { value: 0.5, label: "เค็มน้อย" },
      { value: 1, label: "เค็มกำลังดี" },
      { value: 1.5, label: "เค็มมาก" },
      { value: 2, label: "ไตพัง" },
    ]
    },
    {
    id: 4,
    question: "ระดับความเปรี้ยวที่คุณชอบ?",
    icon: <FishSymbol className="w-6 h-6 text-yellow-500" />,
    options: [
      { value: 0, label: "จืด" },
      { value: 0.5, label: "เปรียวน้อย" },
      { value: 1, label: "เปรี้ยวกำลังดี" },
      { value: 1.5, label: "เปรี้ยวมาก" },
      { value: 2, label: "แซ่บอีหลี" }
    ]
},
{
  id: 5,
  question: "คุณเป็นโรคเบาหวานหรือโรคอ้วนหรือไม่?",
  icon: <FishSymbol className="w-6 h-6 text-yellow-500" />,
  options: [
    { value: "", label: "ไม่ ฉันไม่ได้เป็น" },
    { value: "โรคเบาหวาน", label: "ใช่ ฉันเป็นอยู่" },
  ]
  },
  {
    id: 6,
    question: "คุณเป็นโรคความดันโลหิตสูงหรือโรคไตหรือไม่?",
    icon: <FishSymbol className="w-6 h-6 text-yellow-500" />,
    options: [
      { value: "", label: "ไม่ ฉันไม่ได้เป็น" },
    { value: "โรคความดันโลหิตสูง", label: "ใช่ ฉันเป็นอยู่" },
    ]
    },
    {
      id: 7,
      question: "คุณเป็นโรคกรดไหลย้อนหรือไม่?",
      icon: <FishSymbol className="w-6 h-6 text-yellow-500" />,
      options: [
        { value: "", label: "ไม่ ฉันไม่ได้เป็น" },
    { value: "โรคกรดไหลย้อน", label: "ใช่ ฉันเป็นอยู่" },
      ]
      },
      {
        id: 8,
        question: "คุณเป็นโรคกระเพาะอาหารหรือไม่?",
        icon: <FishSymbol className="w-6 h-6 text-yellow-500" />,
        options: [
          { value: "", label: "ไม่ ฉันไม่ได้เป็น" },
    { value: "โรคกระเพาะอาหาร", label: "ใช่ ฉันเป็นอยู่" },
        ]
        },
]

export default function CalibrationPage() {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});

  let [user,setUser] = useState(0);
  const {api_url} = useContext(AuthContext);
  const {token} = useContext(AuthContext);
  useEffect(() => {
    axios.get(api_url, 
        {
            headers: 
            {
                Authorization: `Bearer ${token != null ? token.access : null}`
            }
        }).then((response) =>{
            if(response.status === 200){
                setUser(response.data);
            }
        }
        ).catch((response) =>{
            console.error(response.data);
            navigate('/login');
        }
        );
}, []);

  const handleAnswer = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => setCurrentQuestion(prev => prev + 1), 500);
    } else {
      setAnswers((prev) => {
        const finalAnswers = { ...prev, [questionId]: value };
        axios.put('http://127.0.0.1:8000/cooking/calibrate/', finalAnswers, 
          {
            headers: 
            {
                Authorization: `Bearer ${token != null ? token.access : null}`
            }
        }
        ).then((response) => {
          setTimeout(() => navigate('/customize'), 500);
        })
      });
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