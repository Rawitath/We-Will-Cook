import React, { useState, useContext } from 'react';
import logo from '../logo.svg';
import '../App.css';
import AuthContext from './context/AuthContext';

export default function Login(){
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loguser, setLoguser] = useState('');
  const [logpass, setLogpass] = useState('');

  const {register} = useContext(AuthContext);
  const {login} = useContext(AuthContext);
  const {logout} = useContext(AuthContext);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          We Will Cook stated here! (API Work in Progress)
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <input placeholder='username' value={username} onChange={e => setUsername(e.target.value)}></input>
        <input placeholder='email' value={email} onChange={e => setEmail(e.target.value)}></input>
        <input placeholder='password' type='password' value={password} onChange={e => setPassword(e.target.value)}></input>
        <button onClick={() => register(username, email, password)}>Create User</button>
        <input placeholder='username' name='username' value={loguser} onChange={e => setLoguser(e.target.value)}></input>
        <input placeholder='password' type='password' name='password' value={logpass} onChange={e => setLogpass(e.target.value)}></input>
        <a href='/forget'>Forgot Password?</a>
        <button onClick={() => login(loguser, logpass)}>Login</button>
        <button onClick={logout}>Logout</button>
      </header>
    </div>
  );
}