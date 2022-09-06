import React, { useEffect, useState } from 'react';
import { Navigate, Routes, Route }    from 'react-router-dom';
import SockJS                         from 'sockjs-client';
import {over}                         from 'stompjs'

import { isLoggedIn, logOut }         from './utils/utilsAPI';
import { clearLocalStorage }          from './utils/utils';

import NavigationBar                  from './components/NavigationBar';
import Game                           from './components/game/Game';
import Login                          from './components/authentication/Login';
import Register                       from './components/authentication/Register';
import Profile                        from './components/profile/Profile';
import ChatRoom                       from './components/ChatRoom';

var stomp_client = null;

function App() {  
    const [logged_in, setLoggedIn] = useState(null);
    
    const sendPrivateMessage = (receiver, message) => {
        var username = localStorage.getItem('username');

        if (username && stomp_client && username !== receiver) {
            var private_message = {
                senderName: username,
                receiverName: receiver,
                message: message,
                status: 'MESSAGE'
            };
    
            stomp_client.send('/app/private-message', {}, JSON.stringify(private_message));
        } else {
            logOut();
        }
    }

    useEffect(() => {
        const wsConnect = () => {
            let sock = new SockJS('http://localhost:8080/ws');
            stomp_client = over(sock);
            // stomp_client.debug = null;
            stomp_client.connect({}, onConnect, onError);
        }
    
        const onConnect = () => {
            var username = localStorage.getItem('username');
    
            if (username && stomp_client) {
                stomp_client.subscribe('/user/' + username + '/private', onPrivateMessage);
            } else {
                logOut();
            }
        }
    
        const onError = (err) => {
            console.log('WebSocket error:');
            console.log(err);
        }

        const onPrivateMessage = (payload) => {
            console.log(payload);
        }

        const checkLoggedIn = async () => {
            const is_logged_in = await isLoggedIn();
            if (is_logged_in) {
                wsConnect();
            } else {
                localStorage.removeItem('username');
            }
            setLoggedIn(is_logged_in);
        }

        checkLoggedIn();
        clearLocalStorage();
    }, []);

    return (
        <div className='App'>
            {
                logged_in === null ? '' :
                <>
                    <NavigationBar logged_in={logged_in}/>            
                    <Routes>
                        <Route path='/'         element={logged_in  ? <Navigate to='/profile' replace /> : <Navigate to='/login' replace />} />
                        <Route path='/game'     element={logged_in  ? <Game sendPrivateMessage={sendPrivateMessage}/> : <Navigate to='/login' replace />} />
                        <Route path='/login'    element={!logged_in ? <Login /> : <Navigate to='/profile' replace />} />
                        <Route path='/register' element={!logged_in ? <Register /> : <Navigate to='/profile' replace />} />
                        <Route path='/profile'  element={logged_in  ? <Profile /> : <Navigate to='/login' replace />} />
                        <Route path='/chatRoom' element={logged_in  ? <ChatRoom /> : <Navigate to='/login' replace />} />
                        <Route path='*'         element={<Navigate to='/' replace />} />
                    </Routes>
                </>
            }
        </div>
    );
}

export default App;
