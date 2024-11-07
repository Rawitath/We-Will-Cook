import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ChefHat, 
  Timer, 
  Mail, 
  ArrowLeft,
  Sparkles,
  Coffee,
  Soup,
  Utensils
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const features = [
  {
    icon: <Coffee className="w-6 h-6 text-orange-500" />,
    title: "สูตรแนะนำอัจฉริยะ",
    description: "ระบบ AI ที่จะแนะนำสูตรที่เหมาะกับคุณ"
  },
  {
    icon: <Soup className="w-6 h-6 text-orange-500" />,
    title: "ชุมชนเชฟก๋วยเตี๋ยว",
    description: "แบ่งปันและแลกเปลี่ยนสูตรกับคนอื่นๆ"
  },
  {
    icon: <Utensils className="w-6 h-6 text-orange-500" />,
    title: "วิดีโอสอนทำ",
    description: "เรียนรู้เทคนิคจากเชฟมืออาชีพ"
  }
];

export default function ComingSoonPage() {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [countdown, setCountdown] = useState({
    days: 365,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => ({
        ...prev,
        seconds: (prev.seconds - 1 + 60) % 60,
        minutes: prev.seconds === 0 
          ? (prev.minutes - 1 + 60) % 60 
          : prev.minutes,
        hours: prev.minutes === 0 && prev.seconds === 0
          ? (prev.hours - 1 + 24) % 24
          : prev.hours,
        days: prev.hours === 0 && prev.minutes === 0 && prev.seconds === 0
          ? prev.days - 1
          : prev.days
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Here you would typically send the email to your backend
    setIsSubscribed(true);
    setTimeout(() => setIsSubscribed(false), 3000);
  };

  return (
    <div className={`min-h-screen ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100' 
        : 'bg-gradient-to-br from-orange-50 via-pink-50 to-orange-100 text-gray-800'
    }`}>
      <div className="max-w-4xl mx-auto p-6">
        <header className="flex items-center justify-between mb-12">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate(-1)}
            className={`p-2 rounded-full ${
              isDarkMode ? 'bg-gray-800' : 'bg-white/80'
            } shadow-md hover:shadow-lg transition-all`}
          >
            <ArrowLeft className="w-6 h-6" />
          </motion.button>
          
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className={`p-2 rounded-xl ${
              isDarkMode 
                ? 'bg-gray-800/50' 
                : 'bg-white/80'
            } backdrop-blur-sm`}>
              <ChefHat className="w-8 h-8 text-orange-500" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              We Will Cook
            </h1>
          </motion.div>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">
            กำลังพัฒนาฟีเจอร์ใหม่ๆ เพื่อคุณ
          </h2>
          <p className="text-xl opacity-80">
            เราจะเปิดให้ใช้งานเร็วๆ นี้
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-4 gap-4 mb-12"
        >
          {Object.entries(countdown).map(([unit, value]) => (
            <motion.div
              key={unit}
              whileHover={{ scale: 1.05 }}
              className={`p-6 rounded-xl ${
                isDarkMode ? 'bg-gray-800' : 'bg-white/80'
              } backdrop-blur-sm shadow-lg text-center`}
            >
              <div className="text-3xl font-bold mb-2">{value}</div>
              <div className="text-sm opacity-70">
                {unit.charAt(0).toUpperCase() + unit.slice(1)}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid md:grid-cols-3 gap-6 mb-12"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className={`p-6 rounded-xl ${
                isDarkMode ? 'bg-gray-800' : 'bg-white/80'
              } backdrop-blur-sm shadow-lg`}
            >
              <div className="flex items-center gap-3 mb-4">
                {feature.icon}
                <h3 className="font-semibold">{feature.title}</h3>
              </div>
              <p className="opacity-70">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          onSubmit={handleSubscribe}
          className="max-w-md mx-auto text-center"
        >
          <h3 className="text-xl font-semibold mb-4">
            รับแจ้งเตือนเมื่อเปิดให้บริการ
          </h3>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="กรอกอีเมลของคุณ"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`flex-1 px-4 py-2 rounded-lg ${
                isDarkMode ? 'bg-gray-800' : 'bg-white/80'
              } backdrop-blur-sm`}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg"
            >
              {isSubscribed ? 'ลงทะเบียนแล้ว!' : 'ลงทะเบียน'}
            </motion.button>
          </div>
        </motion.form>
      </div>
    </div>
  );
}