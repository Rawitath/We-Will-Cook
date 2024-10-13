import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const api_url = 'http://127.0.0.1:8000/authentication/';

function App() {
  const [post, setPost] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  useEffect(() => {
    axios.get(api_url).then((response) =>{
      setPost(response.data);
    })
  }, []);

  function CreatePost(){
    
  }

  function Register(){
    axios.post(api_url,{
      'username': username,
      'email': email,
      'password': password
    }).then((response) =>{
      setPost(response.data);
    });
  }

  if (!post) return null;

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
        <button onClick={Register}>Create User</button>
        <input placeholder='username'></input>
        <input placeholder='password' type='password'></input>
        <button>Login</button>
      </header>
    </div>
  );
}

export default App;
