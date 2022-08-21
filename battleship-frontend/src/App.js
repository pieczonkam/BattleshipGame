import React, { useEffect, useState } from 'react';
import { Navigate, Routes, Route }    from 'react-router-dom';

import { getRandomInt }               from './utils/utils';
import { isLoggedIn }                 from './utils/utilsAPI';

import NavigationBar                  from './components/NavigationBar';
import Game                           from './components/game/Game';
import Login                          from './components/authentication/Login';
import Register                       from './components/authentication/Register';
import Profile                        from './components/profile/Profile';

function App() {  

    const [logged_in, setLoggedIn] = useState(null);
    const notifications_count = getRandomInt(0, 13);
    
    useEffect(() => {
        const checkLoggedIn = async () => {
            const is_logged_in = await isLoggedIn();
            setLoggedIn(is_logged_in);
        }

        checkLoggedIn();
    }, []);

    return (
        <div className='App'>
            {
                logged_in === null ? '' :
                <>
                     <NavigationBar logged_in={logged_in}/>            
                    <Routes>
                        <Route path='/'         element={logged_in ? <Navigate to='/profile' replace /> : <Navigate to='/login' replace />} />
                        <Route path='/game'     element={logged_in ? <Game /> : <Navigate to='/login' replace />} />
                        <Route path='/login'    element={!logged_in ? <Login /> : <Navigate to='/profile' replace />} />
                        <Route path='/register' element={!logged_in ? <Register /> : <Navigate to='/profile' replace />} />
                        <Route path='/profile'  element={logged_in ? <Profile notifications_count={notifications_count} /> : <Navigate to='/login' replace />} />
                        <Route path='*'         element={<Navigate to='/' replace />} />
                    </Routes>
                </>
            }
        </div>
    );
}

export default App;
