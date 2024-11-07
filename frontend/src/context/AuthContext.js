import React, {useState, useEffect, useCallback} from "react";
import { createContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = ({children}) => {
    const api_url = 'http://127.0.0.1:8000/authentication/';
    let [token, setToken] = useState(localStorage.getItem('auth_token') ? JSON.parse(localStorage.getItem('auth_token')) : null);
    const navigate = useNavigate();
    let [loading, setLoading] = useState([]);

    let register = (username, email, password) =>{
        axios.post(api_url+'register/',{
            "username": username,
            "email": email,
            "password": password
          }).then((response) =>{
            if(response.status === 201){
                //login(username, password);
            }
          }
          );
    }
    let updatetoken = () =>{
        axios.post(api_url+'token/refresh/',
            {
                'refresh':token.refresh
            }
        ).then((response)=>{
            if(response.status === 200){
            localStorage.setItem('auth_token', JSON.stringify(response.data));
            setToken(response.data);
        }
        else{
            axios.post(api_url+'logout/',{
                'refresh':token != null ? token.refresh : null,
                'access':token != null ? token.access : null
            },{
                headers: 
                {
                    Authorization: `Bearer ${token != null ? token.access : null}`
                }
            }
              ).finally((response)=>{
                    localStorage.removeItem('auth_token');
                    setToken(null);
              });
        }
        });
    }

    let resetpassword = (email) => {
        axios.post(api_url+'request-reset-password/', 
            {
                'email':email
            }
    ).then((response) =>{
        navigate('/');
    }
    );
    }
    let changepassword = (password, resetToken) => {
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
    let contextData = {
        api_url:api_url,
        token:token,
        setToken:setToken,
        register:register,
        updatetoken:updatetoken,
        resetpassword:resetpassword,
        changepassword:changepassword
    }
    useEffect(() => {
        const refreshMinute = 2 * 60 * 1000;
        let interval = setInterval(() => {
            if(token){
                updatetoken();
            }
        }, refreshMinute);
        return () => clearInterval(interval); 
    }, [token, loading]);
    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}