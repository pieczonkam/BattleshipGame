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

    const [logged_in, setLoggedIn]                      = useState(null);
    const [game_invite_declined, setGameInviteDeclined] = useState(false);
    const [game_cancel, setGameCancel]                  = useState(false);
    const [opponent_surrender, setOpponentSurrender]    = useState(false);
    const [connection_lost, setConnectionLost]          = useState(false);
    const [game_started, setGameStarted]                = useState(localStorage.getItem('game_started') === 'true' ? true : false);
    const [opponent_ready, setOpponentReady]            = useState(localStorage.getItem('opponent_ready') === 'true' ? true : false);
    const [current_time, setCurrentTime]                = useState(localStorage.getItem('current_time') ? localStorage.getItem('current_time') : (new Date()).getTime());
    const [your_move, setYourMove]                      = useState(localStorage.getItem('your_move') === 'true' ? true : false);

    const getWsMessage = (payload) => {
        const message  = JSON.parse(payload.body);
        const opponent = localStorage.getItem('opponent');

        console.log('Printing message');
        console.log(message.status);
        console.log(message.message);
        console.log(message.receiverName);
        console.log(message.senderName);

        switch (message.status) {
            case 'DECLINE':
                if (opponent) {
                    setGameInviteDeclined(true);
                }
                break;

            case 'CANCEL':
                if (opponent) {
                    setGameCancel(true);
                } else {
                    window.location.reload(false);
                }
                break;

            case 'SURRENDER':
                if (opponent) {
                    setOpponentSurrender(true);
                }
                else {
                    clearGameData();
                    navigate('/profile');
                }
                break;

            case 'ACCEPT':
                if (opponent !== message.senderName) {
                    sendWsMessage(message.senderName, '', 'CANCEL');
                }
                break;

            case 'READY':
                if (opponent) {
                    let move_order = parseInt(message.message);

                    setOpponentReady(true);
                    localStorage.setItem('opponent_ready', 'true');

                    if (!localStorage.getItem('your_move')) {
                        if (move_order === 1) {
                            localStorage.setItem('your_move', 'false');
                            setYourMove(false);
                        } else {
                            localStorage.setItem('your_move', 'true');
                            setYourMove(true);
                        }
                    }

                    if (localStorage.getItem('you_ready') === 'true' && localStorage.getItem('opponent_ready') === 'true') {
                        localStorage.setItem('game_started', 'true');
                        setGameStarted(true);
                    }
                } else {
                    clearGameData();
                    navigate('/profile');
                }
                break;
            
            case 'TIME':
                var ct = JSON.parse(message.message);
                setCurrentTime(ct);
                localStorage.setItem('current_time', String(ct));
                break;

            case 'HIT':
                if (opponent) {
                    let x      = parseInt(message.message.split(' ')[0]);
                    let y      = parseInt(message.message.split(' ')[1]);
                    let result = message.message.split(' ')[2];

                    var your_hits_map = JSON.parse(localStorage.getItem('your_hits_map'));
                    if (!your_hits_map) {
                        your_hits_map = prepareBoardMap(BOARD_SIZE);
                    }

                    if (result === 'true') {
                        your_hits_map[x][y] = 2;
                    } else {
                        your_hits_map[x][y] = 1;
                    }

                    localStorage.setItem('your_hits_map', JSON.stringify(your_hits_map));
                } else {
                    clearGameData();
                    navigate('/profile');
                }
                
                break;

            case 'COORDINATES':
                if (opponent) {
                    setYourMove(true);
                    localStorage.setItem('your_move', 'true');

                    let x = parseInt(message.message.split(' ')[0]);
                    let y = parseInt(message.message.split(' ')[1]);

                    var board_map         = JSON.parse(localStorage.getItem('board_map'));
                    var opponent_hits_map = JSON.parse(localStorage.getItem('opponent_hits_map')); 
                    if (!board_map) {
                        board_map = prepareBoardMap(BOARD_SIZE);
                    }
                    if (!opponent_hits_map) {
                        opponent_hits_map = prepareBoardMap(BOARD_SIZE);
                    }

                    if (board_map[x][y] === 2) {
                        opponent_hits_map[x][y] = 2;
                        sendWsMessage(opponent, String(x + ' ' + y + ' true'), 'HIT');
                    } else {
                        opponent_hits_map[x][y] = 1;
                        sendWsMessage(opponent, String(x + ' ' + y + ' false'), 'HIT');
                    }

                    localStorage.setItem('opponent_hits_map', JSON.stringify(opponent_hits_map));
                } else {
                    clearGameData();
                    navigate('/profile');
                }
                break;

            default:
                break;
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
            // stomp_client.debug = null;
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
            setTimeout(() => setConnectionLost(true), 200);
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
                        <Route path='/game'     element={logged_in  ? <Game sendWsMessage={sendWsMessage} game_started={game_started} setGameStarted={setGameStarted} game_invite_declined={game_invite_declined} setGameInviteDeclined={setGameInviteDeclined} game_cancel={game_cancel} setGameCancel={setGameCancel} opponent_surrender={opponent_surrender} setOpponentSurrender={setOpponentSurrender} opponent_ready={opponent_ready} current_time={current_time} setCurrentTime={setCurrentTime} connection_lost={connection_lost} setConnectionLost={setConnectionLost} your_move={your_move} setYourMove={setYourMove} /> : <Navigate to='/login' replace />} />
                        <Route path='/login'    element={!logged_in ? <Login /> : <Navigate to='/profile' replace />} />
                        <Route path='/register' element={!logged_in ? <Register /> : <Navigate to='/profile' replace />} />
                        <Route path='/profile'  element={logged_in  ? <Profile sendWsMessage={sendWsMessage} /> : <Navigate to='/login' replace />} />
                        <Route path='/chatRoom' element={logged_in  ? <ChatRoom /> : <Navigate to='/login' replace />} />
                        <Route path='*'         element={<Navigate to='/' replace />} />
                    </Routes>
                </>
            }
        </div>
    );
}

export default App;
