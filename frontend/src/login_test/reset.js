import React, {useContext, useEffect, useState} from "react";
import logo from '../logo.svg';
import '../App.css';
import AuthContext from "./context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";


export default function ResetPassword(){
    
    let navigate = useNavigate();
    let [pass, setPass] = useState([]);
    let {token} = useParams();
    let [user,setUser] = useState([]);
    let {changepassword} = useContext(AuthContext);
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
    return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Hi {user.username}</h2>
            <p>
                Enter your new password
            </p>
            <input placeholder="New Password" value={pass} type="password" onChange={e => setPass(e.target.value)}></input>
            <button onClick={() => changepassword(pass, token)}>Set New Password</button>
          </header>
        </div>
      );
}