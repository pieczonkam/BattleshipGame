import React                       from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';

import { getRandomInt }            from './utils/utils';

import Home                        from './components/Home'
import NavigationBar               from './components/NavigationBar';
import Game                        from './components/game/Game';
import Login                       from './components/authentication/Login';
import Register                    from './components/authentication/Register';
import Profile                     from './components/profile/Profile';

function App() {  
    const notifications_count = getRandomInt(0, 12);

    return (
        <div className='App'>
            <NavigationBar notifications_count={notifications_count} />
            <Routes>
                <Route path='/'                element={<Home />} />
                <Route path='/game'            element={<Game />} />
                <Route path='/login'           element={<Login />} />
                <Route path='/register'        element={<Register />} />
                <Route path='/profile'         element={<Profile notifications_count={notifications_count} />} />
                <Route path='*'                element={<Navigate to='/' replace />} />
            </Routes>
        </div>
    );
}

export default App;
