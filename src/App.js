import React                       from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';

import Home           from './components/Home'
import NavigationBar  from './components/NavigationBar';
import Game           from './components/game/Game';
import Login          from './components/authentication/Login';
import Register       from './components/authentication/Register';
import Profile        from './components/profile/Profile';
import ChangePassword from './components/authentication/ChangePassword';

function App() {  
    return (
        <div className='App'>
            <NavigationBar />
            <Routes>
                <Route path='/'                element={<Home />} />
                <Route path='/game'            element={<Game />} />
                <Route path='/login'           element={<Login />} />
                <Route path='/register'        element={<Register />} />
                <Route path='/profile'         element={<Profile />} />
                <Route path='/change_password' element={<ChangePassword />} />
                <Route path='*'                element={<Navigate to='/' replace />} />
            </Routes>
        </div>
    );
}

export default App;
