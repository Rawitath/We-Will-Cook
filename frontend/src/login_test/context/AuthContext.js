import React, {useState, useEffect, useCallback} from "react";
import { createContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
export default AuthContext;

const api_url = 'http://127.0.0.1:8000/authentication/';

export const AuthProvider = ({children}) => {
    let [token, setToken] = useState(localStorage.getItem('auth_token') ? JSON.parse(localStorage.getItem('auth_token')) : null);
    const navigate = useNavigate();
    let jwtAccess = null;
    let jwtRefresh = null;
    let [loading, setLoading] = useState([]);
    
    function set_jwt(){
        jwtAccess = null;
        jwtRefresh = null;
        if(token != null){
            jwtAccess ={
                headers: {
                    Authorization: "Bearer " + token.access
                 }
            }
            jwtRefresh ={
                headers: {
                    Authorization: "Bearer " + token.refresh
                 }
            }
        }
    }
    set_jwt();

    let register = (username, email, password) =>{
        axios.post(api_url+'register/',{
            "username": username,
            "email": email,
            "password": password
          });
    }
    let login = (username, password) =>{
        axios.post(api_url+'login/',{
            "username": username,
            "password": password
          }).then((response)=>{
            if(response.status === 200){
                localStorage.setItem('auth_token', JSON.stringify(response.data));
                setToken(response.data);
                navigate('/user');
            }
          });
    }
    let logout = () =>{
            localStorage.removeItem('auth_token');
            setToken(null);
            navigate('/login');
    }
    let updatetoken = () =>{
        console.log('token updated');
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
            logout();
        }
        });
    }
    let contextData = {
        token:token,
        register:register,
        login:login,
        logout:logout,
        updatetoken:updatetoken
    }
    useEffect(() => {
        const refreshMinute = 4.5 * 60 * 1000;
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