import React             from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home           from './components/Home'
import NavigationBar  from './components/NavigationBar';
import Game           from './components/game/Game';
import Login          from './components/authentication/Login';
import Register       from './components/authentication/Register';
import ChangePassword from './components/authentication/ChangePassword';
import LoginNew       from './components/authentication/LoginNew';

function App() {  
  return (
    <div className='App'>
        <NavigationBar />
        <Routes>
            <Route path='/'                element={<Home />} />
            <Route path='/game'            element={<Game />} />
            <Route path='/login'           element={<LoginNew />} />
            <Route path='/register'        element={<Register />} />
            <Route path='/change_password' element={<ChangePassword />} />
        </Routes>
    </div>
  );
}

export default App;
