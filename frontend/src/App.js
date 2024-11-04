import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './login_test/login';
import Home from './login_test/home';
import UserPage from './login_test/userpage';
import { AuthProvider } from './login_test/context/AuthContext';

function App() {
  return(
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/user' element={<UserPage/>}></Route>
          </Routes>
          </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App;
