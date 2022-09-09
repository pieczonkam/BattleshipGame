import React, { useEffect, useState } from 'react';
import { Navigate, Routes, Route,
        useNavigate }                 from 'react-router-dom';
import SockJS                         from 'sockjs-client';
import {over}                         from 'stompjs';

import { isLoggedIn, logOut }         from './utils/utilsAPI';
import { clearGameData }              from './utils/utils';
import { API_URL,
        BOARD_SIZE }                  from './utils/constants';
import { prepareBoardMap }            from './utils/utils';

import NavigationBar                  from './components/NavigationBar';
import Game                           from './components/game/Game';
import Login                          from './components/authentication/Login';
import Register                       from './components/authentication/Register';
import Profile                        from './components/profile/Profile';
import ChatRoom                       from './components/ChatRoom';

var stomp_client = null;

function App() {  
    const navigate = useNavigate();

    const [logged_in, setLoggedIn]           = useState(null);
    const [message_status, setMessageStatus] = useState('')
    
    const getWsMessage = (payload) => {
        const opponent = localStorage.getItem('opponent');

        if (!opponent) {
            clearGameData();
            navigate('/profile');
        } else {
            const message = JSON.parse(payload.body);

            if (message.status === 'READY') {
                localStorage.setItem('opponent_ready', 'true');
            }

            if (localStorage.getItem('you_ready') === 'true' && localStorage.getItem('opponent_ready') === 'true') {
                console.log('Game started');
            }

            if (message.status === 'HIT') {
                var your_hits_map = JSON.parse(localStorage.getItem('your_hits_map'));
                if (!your_hits_map) {
                    your_hits_map = prepareBoardMap(BOARD_SIZE);
                }

                // coord_x coord_y true/false
                var x      = parseInt(message.message.split(' ')[0]);
                var y      = parseInt(message.message.split(' ')[1]);
                var result = message.message.split(' ')[2];

                if (result === 'true') {
                    your_hits_map[x][y] = 2;
                } else {
                    your_hits_map[x][y] = 1;
                }

                localStorage.setItem('your_hits_map', JSON.stringify(your_hits_map));
            }

            if (message.status === 'COORDINATES') {
                var x = parseInt(message.message.split(' ')[0]);
                var y = parseInt(message.message.split(' ')[1]);

                var board_map = JSON.parse(localStorage.getItem('board_map'));
                if (board_map) {
                    if (board_map[x][y] === 2) {
                        sendWsMessage(opponent, String(x + ' ' + y + ' true'), 'HIT');
                        setMessageStatus('HIT');
                    } else {
                        sendWsMessage(opponent, String(x + ' ' + y + ' false'), 'HIT');
                        setMessageStatus('MISS');
                    }
                }
            } else {
                setMessageStatus(message.status);
            }

            setTimeout(() => {
                setMessageStatus('')
            }, 1000);

            console.log(message.message);
        }
    }

    const sendWsMessage = (receiver, message, status) => {
        var username = localStorage.getItem('username');

        if (username && stomp_client && username !== receiver) {
            var message_to_send = {
                senderName: username,
                receiverName: receiver,
                message: message,
                status: status
            };
    
            stomp_client.send('/app/private-message', {}, JSON.stringify(message_to_send));
        } else {
            logOut();
        }
    }

    useEffect(() => {
        const wsConnect = () => {
            let sock = new SockJS(API_URL + '/ws');
            stomp_client = over(sock);
            stomp_client.debug = null;
            stomp_client.connect({}, onConnect, onError);
        }
    
        const onConnect = () => {
            var username = localStorage.getItem('username');
    
            if (username && stomp_client) {
                stomp_client.subscribe('/user/' + username + '/private', getWsMessage);
            } else {
                logOut();
            }
        }
    
        const onError = (err) => {
            console.log('WebSocket error:');
            console.log(err);
        }

        const checkLoggedIn = async () => {
            const is_logged_in = await isLoggedIn();
            if (is_logged_in) {
                wsConnect();
                if (!localStorage.getItem('board_map')) {
                    localStorage.setItem('board_map', JSON.stringify(prepareBoardMap(BOARD_SIZE)));
                }
                if (!localStorage.getItem('your_hits_map')) {
                    localStorage.setItem('your_hits_map', JSON.stringify(prepareBoardMap(BOARD_SIZE)));
                }
                if (!localStorage.getItem('opponent_hits_map')) {
                    localStorage.setItem('opponent_hits_map', JSON.stringify(prepareBoardMap(BOARD_SIZE)));
                }
            } else {
                localStorage.removeItem('username');
                clearGameData();
            }
            setLoggedIn(is_logged_in);
        }

        checkLoggedIn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className='App'>
            {
                logged_in === null ? '' :
                <>
                    <NavigationBar logged_in={logged_in}/>            
                    <Routes>
                        <Route path='/'         element={logged_in  ? <Navigate to='/profile' replace /> : <Navigate to='/login' replace />} />
                        <Route path='/game'     element={logged_in  ? <Game sendWsMessage={sendWsMessage} message_status={message_status} /> : <Navigate to='/login' replace />} />
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
