import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Share2, 
  Save, 
  ArrowLeft, 
  Heart,
  Download,
  Coffee,
  UserCircle
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import UserMenu from '../context/UserMenu';

export default function NoodleSummary() {
    const navigate = useNavigate();
    const location = useLocation();
    const { isDarkMode } = useTheme();
    
    const customization = location.state?.customization || {
      // Default values if no data passed
      style: "น้ำ",
      noodleType: "เส้นเล็ก",
      soupType: "ต้มยำ",
      spiciness: 75,
      saltiness: 50,
      sourness: 75,
      sweetness: 25
    };

    const handleSave = () => {
      // Save to user's favorites/history
      alert("บันทึกสูตรเรียบร้อยแล้ว!");
    };

    const handleShare = () => {
      // Generate shareable link
      navigator.clipboard.writeText("https://example.com/shared-recipe/123");
      alert("คัดลอกลิงก์สำหรับแชร์แล้ว!");
    };

    const handleDownload = () => {
      // Generate PDF or image of recipe
      alert("กำลังดาวน์โหลดสูตรของคุณ...");
    };

    return (
        <div className={`min-h-screen ${
            isDarkMode 
                ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100' 
                : 'bg-gradient-to-br from-orange-50 via-pink-50 to-orange-100 text-gray-800'
        }`}>
            <div className="max-w-4xl mx-auto p-6">
                {/* Header */}
                <motion.header 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-between items-center mb-8"
                >
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        กลับไปแก้ไข
                    </button>
                    <UserMenu />
                </motion.header>

                {/* Summary Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`rounded-xl p-8 ${
                        isDarkMode ? 'bg-gray-800/50' : 'bg-white/80'
                    } backdrop-blur-sm shadow-xl mb-8`}
                >
                    <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                        สรุปสูตรก๋วยเตี๋ยวของคุณ
                    </h1>

                    <div className="grid grid-cols-2 gap-6 mb-8">
                        <div className={`p-4 rounded-lg ${
                            isDarkMode ? 'bg-gray-700/50' : 'bg-white/50'
                        }`}>
                            <h3 className="font-medium mb-2">สไตล์พื้นฐาน</h3>
                            <div className="space-y-2">
                                <p>ประเภท: {customization.style}</p>
                                <p>ชนิดเส้น: {customization.noodleType}</p>
                                <p>น้ำซุป: {customization.soupType}</p>
                            </div>
                        </div>
                        
                        <div className={`p-4 rounded-lg ${
                            isDarkMode ? 'bg-gray-700/50' : 'bg-white/50'
                        }`}>
                            <h3 className="font-medium mb-2">การปรุงรส</h3>
                            <div className="space-y-2">
                                {Object.entries({
                                    'ความเผ็ด': customization.spiciness,
                                    'ความเค็ม': customization.saltiness,
                                    'ความเปรี้ยว': customization.sourness,
                                    'ความหวาน': customization.sweetness
                                }).map(([taste, value]) => (
                                    <div key={taste} className="flex items-center gap-2">
                                        <span>{taste}:</span>
                                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                            <div 
                                                className="h-full bg-orange-500 rounded-full"
                                                style={{ width: `${value}%` }}
                                            />
                                        </div>
                                        <span className="text-sm">{value}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { icon: <Save className="w-5 h-5" />, label: 'บันทึก', action: handleSave },
                            { icon: <Share2 className="w-5 h-5" />, label: 'แชร์', action: handleShare },
                            { icon: <Heart className="w-5 h-5" />, label: 'ถูกใจ', action: handleSave },
                            { icon: <Download className="w-5 h-5" />, label: 'ดาวน์โหลด', action: handleDownload }
                        ].map((button) => (
                            <motion.button
                                key={button.label}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={button.action}
                                className={`p-4 rounded-lg ${
                                    isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-50'
                                } shadow-md hover:shadow-lg transition-all flex flex-col items-center gap-2`}
                            >
                                {button.icon}
                                <span className="text-sm font-medium">{button.label}</span>
                            </motion.button>
                        ))}
                    </div>
                </motion.div>

                {/* Recommendations */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className={`rounded-xl p-8 ${
                        isDarkMode ? 'bg-gray-800/50' : 'bg-white/80'
                    } backdrop-blur-sm shadow-xl`}
                >
                    <h2 className="text-xl font-semibold mb-4">คุณอาจจะชอบ</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                            'ต้มยำน้ำข้น',
                            'เย็นตาโฟ',
                            'ก๋วยเตี๋ยวต้มยำหมูสับ'
                        ].map((recipe) => (
                            <motion.div
                                key={recipe}
                                whileHover={{ scale: 1.02 }}
                                className={`p-4 rounded-lg ${
                                    isDarkMode ? 'bg-gray-700' : 'bg-white'
                                } cursor-pointer hover:shadow-lg transition-all`}
                            >
                                <Coffee className="w-6 h-6 mb-2 text-orange-500" />
                                <h3 className="font-medium">{recipe}</h3>
                                <p className="text-sm opacity-75">คล้ายกับสูตรของคุณ</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}