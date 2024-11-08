import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Share2, 
  Save, 
  ArrowLeft, 
  Heart,
  Download,
  Scale,
  Drumstick,
  Soup,
  ChefHat
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import UserMenu from '../context/UserMenu';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

export default function NoodleSummary() {
    const navigate = useNavigate();
    const location = useLocation();
    const { isDarkMode } = useTheme();
    
    const customization = location.state?.customization;
    const apidata = location.state?.apidata;
    const {token} = useContext(AuthContext);
    const [recipe, setRecipe] = useState([]);
    // Calculate recipe portions based on taste preferences
    // const calculateRecipe = () => {
    //   const basePortions = {
    //     noodles: "100 กรัม",
    //     soup_base: "500 มล.",
    //     protein: "80 กรัม",
    //     seasonings: {
    //       fish_sauce: `${Math.round(customization.saltiness * 0.15)} ช้อนชา`,
    //       lime_juice: `${Math.round(customization.sourness * 0.2)} ช้อนชา`,
    //       chili: `${Math.round(customization.spiciness * 0.1)} ช้อนชา`,
    //       sugar: `${Math.round(customization.sweetness * 0.1)} ช้อนชา`
    //     }
    //   };

    //   return basePortions;
    // };
    console.log(apidata);
    let header = {headers:{}}
    if(token != null){
        header = {
            headers: 
            {
                Authorization: `Bearer ${token.access}`
            }
        }
    }
    useEffect(() => {axios.post('https://we-will-cook.vercel.app/cooking/recipe/', apidata, header
    ).then((response) => {
        setRecipe(response.data);
    })},[]);

    const handleSave = () => {
      alert("บันทึกสูตรเรียบร้อยแล้ว!");
    };

    const handleShare = () => {
      navigator.clipboard.writeText("https://example.com/shared-recipe/123");
      alert("คัดลอกลิงก์สำหรับแชร์แล้ว!");
    };

    const handleDownload = () => {
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

                    <div className="grid md:grid-cols-2 gap-6 mb-8">
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

                {/* Recipe Results */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className={`rounded-xl p-8 ${
                        isDarkMode ? 'bg-gray-800/50' : 'bg-white/80'
                    } backdrop-blur-sm shadow-xl`}
                >
                    <h2 className="text-xl font-semibold mb-6">ผลลัพธ์</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className={`p-4 rounded-lg ${
                            isDarkMode ? 'bg-gray-700/50' : 'bg-white/50'
                        }`}>
                            <h3 className="font-medium mb-4 flex items-center gap-2">
                                <Scale className="w-5 h-5 text-orange-500" />
                                วัตถุดิบหลัก
                            </h3>
                            <div className="space-y-2">
                                <p>เส้น: 100 กรัม</p>
                                <p>น้ำซุป: 500 มล.</p>
                                <p>เนื้อสัตว์: 80 กรัม</p>
                            </div>
                        </div>

                        <div className={`p-4 rounded-lg ${
                            isDarkMode ? 'bg-gray-700/50' : 'bg-white/50'
                        }`}>
                            <h3 className="font-medium mb-4 flex items-center gap-2">
                                <ChefHat className="w-5 h-5 text-orange-500" />
                                เครื่องปรุง
                            </h3>
                            <div className="space-y-2">
                                <p>น้ำปลา: {recipe['Fish sauce']} ช้อนโต๊ะ</p>
                                <p>น้ำส้มสายชู: {recipe['Vinegar']} ช้อนโต๊ะ</p>
                                <p>พริก: {recipe['Chili flakes']} ช้อนโต๊ะ</p>
                                <p>น้ำตาล: {recipe['Sugar']} ช้อนโต๊ะ</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}