// src/pages/RegisterPage.js
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { User, Mail, Lock } from 'lucide-react';
import axios from 'axios';
import backgroundImage from '../assets/food-4k.jpg';
import AuthContext from '../context/AuthContext';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  let [user,setUser] = useState(0);
  const {api_url} = useContext(AuthContext);
  const {token} = useContext(AuthContext);
  const {setToken} = useContext(AuthContext);
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
        }
        );
}, []);
  if(user != 0){
    navigate('/');
  }

  // State สำหรับเก็บข้อมูลฟอร์ม
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  // State สำหรับเก็บ error แยกแต่ละฟิลด์
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: ''
  });

  // State สำหรับ loading
  const [isLoading, setIsLoading] = useState(false);

  // ฟังก์ชันตรวจสอบความถูกต้อง
  const validateForm = () => {
    const newErrors = {};
    
    // ตรวจสอบ username
    if (formData.username === '' || formData.username == null) {
      newErrors.username = "Name is required";
    }

    // ตรวจสอบ email
    const email_check = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (!formData.email.match(email_check)) {
      newErrors.email = "Valid Email is required";
    }

    function containsNumber(str) {
      // Check if the string contains any digit between 0 and 9
      return /\d/.test(str);
    }
    // ตรวจสอบ password
    if (formData.password.length <= 7) {
      newErrors.password = "Password must be more than 8 characters";
    } else if (formData.password.length >= 128) {
      newErrors.password = "Password cannot be more than 128 characters";
    } else if (formData.password == formData.password.toUpperCase ||
       formData.password == formData.password.toLowerCase() || !containsNumber(formData.password)){
        newErrors.password = "The password requires at least 8 characters long with at least 1 lowercase and uppercase and number.";
       }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ฟังก์ชันส่งข้อมูล
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      axios.post(api_url+'register/', formData).then((response) => {
        navigate('/login');
      }).catch((response, err) =>{
        console.error(response);
        setErrors({
          ...errors,
          general: err.response?.data?.message || 'Registration failed. Please try again.'
        });
      }).finally(() => {
        setIsLoading(false);
      });
    }
  };

  return (
    <div 
      className="min-h-screen flex justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="w-[420px] bg-transparent border-2 border-white/20 backdrop-blur-xl rounded-lg p-8 text-white">
        <h1 className="text-4xl font-medium text-center mb-8">Register</h1>

        {errors.general && (
          <div className="mb-4 p-3 rounded bg-red-500/20 text-red-200 text-sm">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-8 relative">
            <input
              type="text"
              placeholder="Username"
              className="w-full h-[50px] bg-transparent border-2 border-white/20 rounded-full px-5 text-white placeholder-white outline-none"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
            />
            <User className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white" />
            {errors.username && (
              <span className="text-red-500 text-sm block mt-1 ml-4">
                {errors.username}
              </span>
            )}
          </div>

          <div className="mb-8 relative">
            <input
              type="email"
              placeholder="Email"
              className="w-full h-[50px] bg-transparent border-2 border-white/20 rounded-full px-5 text-white placeholder-white outline-none"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
            <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white" />
            {errors.email && (
              <span className="text-red-500 text-sm block mt-1 ml-4">
                {errors.email}
              </span>
            )}
          </div>

          <div className="mb-8 relative">
            <input
              type="password"
              placeholder="Password"
              className="w-full h-[50px] bg-transparent border-2 border-white/20 rounded-full px-5 text-white placeholder-white outline-none"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
            <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white" />
            {errors.password && (
              <span className="text-red-500 text-sm block mt-1 ml-4">
                {errors.password}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-[45px] rounded-full bg-white text-gray-900 font-semibold text-lg mb-6 hover:shadow-lg transition-shadow disabled:opacity-50"
          >
            {isLoading ? 'Creating Account...' : 'Register'}
          </button>
        </form>

        <p className="text-center text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-white font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}