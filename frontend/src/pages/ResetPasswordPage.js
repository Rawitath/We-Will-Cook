// src/pages/ResetPasswordPage.js
import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import backgroundImage from '../assets/food-4k.jpg'; // Make sure to import your image
import axios from 'axios';
import AuthContext from '../context/AuthContext';

export default function ResetPasswordPage() {
  let {token} = useParams();
  let [user, setUser] = useState([]);
  let navigate = useNavigate();
  let {api_url} = useContext(AuthContext);
  let [pass, setPass] = useState('');
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/authentication/reset-password/', 
        {
            headers: 
            {
                Authorization: `Bearer ${token}`
            }
        }).then((response) =>{
            if(response.status === 200){
                setUser(response.data);
            }
        }
        ).catch(() =>{
            navigate('/');
        }
        );
}, []);
  let resetpassword = (resetToken, password) => {
    // setError('');
    // setIsLoading(true);
    axios.put(api_url+'reset-password/',{
      'password':password
  },{
      headers: 
      {
          Authorization: `Bearer ${resetToken}`
      }
  }).then((response) => {
      navigate('/login');
  })
  }
  return (
    <div 
      className="min-h-screen flex justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="w-[420px] bg-transparent border-2 border-white/20 backdrop-blur-xl rounded-lg p-8 text-white">
        <h1 className="text-4xl font-medium text-center mb-8">Reset Password</h1>

        <div className="mb-8 relative">
          <input
            type="password"
            placeholder="Enter your new password"
            value={pass}
            onChange={e => setPass(e.target.value)}
            className="w-full h-[50px] bg-transparent border-2 border-white/20 rounded-full px-5 text-white placeholder-white outline-none"
          />
          <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white" />
        </div>

        <button
          className="w-full h-[45px] rounded-full bg-white text-gray-900 font-semibold text-lg mb-6 hover:shadow-lg transition-shadow"
          onClick={() => resetpassword(token, pass)}
        >
          Reset Password
        </button>

        
      </div>
    </div>
  );
}