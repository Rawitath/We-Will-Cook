import React, {useContext, useState} from "react";
import logo from '../logo.svg';
import '../App.css';
import AuthContext from "./context/AuthContext";
import { useNavigate } from "react-router-dom";


export default function Forget(){
    
    let navigate = useNavigate();
    let [email, setEmail] = useState([]);
    let {resetpassword} = useContext(AuthContext);
    return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
                Forgot password?
            </p>
            <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}></input>
            <button onClick={() => resetpassword(email)}>Send</button>
          </header>
        </div>
      );
}