import React, {useContext} from "react";
import logo from '../logo.svg';
import '../App.css';
import AuthContext from "./context/AuthContext";
import { useNavigate } from "react-router-dom";


export default function Home(){
    
    let navigate = useNavigate();
    
    return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
                Welcome to WeWillCook!
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
            <button onClick={() => navigate("/login")}>Signup / Login</button>
          </header>
        </div>
      );
}