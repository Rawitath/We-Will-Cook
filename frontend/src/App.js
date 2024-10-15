import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const api_url = 'http://127.0.0.1:8000/authentication/';

function App() {
  const [currentUser, setCurrentUser] = useState();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loguser, setLoguser] = useState('');
  const [logpass, setLogpass] = useState('');
  useEffect(() => {
    axios.get(api_url).then((response) =>{
      setCurrentUser(response.data);
      console.log(response.data);
    });
  }, []);

  function Register(e){
    axios.post(api_url+'register/',{
      "username": username,
      "email": email,
      "password": password
    });
  }

  function Login(){
    axios.post(api_url+'login/',{
      "username": loguser,
      "password": logpass
    });
  }
  function Logout(){
    axios.post(api_url+'logout/',{});
  }

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
        <input placeholder='username' value={loguser} onChange={e => setLoguser(e.target.value)}></input>
        <input placeholder='password' type='password' value={logpass} onChange={e => setLogpass(e.target.value)}></input>
        <button onClick={Login}>Login</button>
        <button onClick={Logout}>Logout</button>
      </header>
    </div>
  );
}

export default App;
