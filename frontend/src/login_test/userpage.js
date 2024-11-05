import React, { useEffect, useState } from "react";
import logo from '../logo.svg';
import '../App.css';
import { Navigate, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./context/AuthContext";
import axios from "axios";
export default function UserPage(){
    let {logout} = useContext(AuthContext);
    let {token} = useContext(AuthContext);
    let [user,setUser] = useState([]);
    let navigate = useNavigate();
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/authentication/', 
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
            ).catch(() =>{
                navigate('/login');
            }
            );
    }, []);
    return (user ?
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
                Welcome,
            </p>
                {user.username}
            <p>
                
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
            <button onClick={() => logout()}>Log out</button>
          </header>
        </div>
        :
        <Navigate to="/login"></Navigate>
      );
}