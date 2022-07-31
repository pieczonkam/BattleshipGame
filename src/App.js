import React from 'react';
import Home from './components/Home'
import Navbar from './components/Navbar';
import Game from './components/game/Game';
import Login from './components/authentication/Login';
import Register from './components/authentication/Register';
import { Route, Routes } from 'react-router-dom';

function App() {
  
  
  return (
    <>
      <Navbar />
      <div className='container'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/game' element={<Game />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
