import { React, useEffect, useState }         from 'react';
import { useNavigate }                        from 'react-router-dom';
import { Tooltip, IconButton }                from '@mui/material';
import ClearIcon                              from '@mui/icons-material/Clear';
import PlayArrow                              from '@mui/icons-material/PlayArrow';
import AddIcon                                from '@mui/icons-material/Add';
import { FontAwesomeIcon }                    from '@fortawesome/react-fontawesome';
import { faUser, 
        faEnvelope, 
        faMagnifyingGlass,
        faRotateRight}                        from '@fortawesome/free-solid-svg-icons';

import CollapseComponent                      from './CollapseComponent';      
import { validateEmail }                      from '../../utils/utils';
import Notification                           from './Notification';
import { addNotificationRequest, 
        changeEmailRequest, 
        changePasswordRequest, 
        changeUsernameRequest, 
        checkPasswordRequest, 
        deleteFriendRequest, 
        getNotificationsRequest, 
        userDataRequest, 
        userFriendsRequest, 
        userGamesRequest, 
        userPotentialFriendsRequest,
        addGameRequest,
        deleteNotificationByUsersDataRequest} from '../../utils/requestsAPI';
import { logOut, logOutCancel }               from '../../utils/utilsAPI';
import { switchNavLink,
        clearGameData }                       from '../../utils/utils';

// Komponent panelu profilu
function Profile(props) {
    // Hook'i stanu
    const [user_data, setUserData] = useState({username: '', email: ''});
    const [user_friends, setUserFriends] = useState([]);
    const [user_potential_friends, setUserPotentialFriends] = useState([]);
    const [user_games, setUserGames] = useState([]);
    const [messages, setMessages] = useState([]);    
    const [notifications, setNotifications] = useState([]);
    
    // Hook nawigacji
    const navigate = useNavigate();

    // Funkcja obsługująca panel wyszukiwania użytkowników
    const handleSubmitSearch = async (e) => {
        e.preventDefault();

        const { search } = document.forms[3];
        const [ response, status ] = await userPotentialFriendsRequest(localStorage.getItem('jwt'), search.value === '' ? '*' : search.value);
        if (status === 200) {
            for (let i in response) {
                response[i].disabled = false;
            }

            setUserPotentialFriends(response);
            getUserFriends();
            getUserGames();
            getNotifications();
        } else {
            logOut();
        }
    }

    // Obiekt zawierający komunikaty błędów
    const errors = {
        email_missing:   'Proszę podać adres e-mail',
        uname_missing:   'Proszę podać nazwę użytkownika',
        pass_01_missing: 'Proszę podać obecne hasło',
        pass_02_missing: 'Proszę podać nowe hasło',
        email_taken:     'Podany adres e-mail jest już zajęty',
        uname_taken:     'Podana nazwa użytkownika jest już zajęta',
        wrong_email:     'Podano błędny adres e-mail',
        wrong_pass:      'Podano błędne hasło',
        pass_too_short:  'Podane hasło jest za krótkie (min. 8 znaków)',
        pass_idencital:  'Nowe hasło musi inne od obecnego',
        server_error:    'Coś poszło nie tak, spróbuj ponownie'
    };

    // Obiekt zawierający komunikaty powodzeń
    const successes = {
        change_uname_success:    'Nazwa użytkownika została zmieniona',
        change_email_success:    'Adres e-mail został zmieniony',
        change_password_success: 'Hasło zostało zmienione'
    }

    // Funkcja obsługująca panele zmiany danych użytkownika
    const handleSubmit = async (e, type) => {
        e.preventDefault();

        var messages_arr = [];
        switch (type) {
            case 'uname':
                var { uname } = document.forms[0];

                if (uname.value.length === 0) {
                    messages_arr.push({ name: 'uname_missing', message: errors.uname_missing });
                } else {
                    const status = await changeUsernameRequest(localStorage.getItem('jwt'), {
                        username: uname.value
                    });

                    if (status === 401) {
                        logOut();
                    } else if (status === 409) {
                        messages_arr.push({ name: 'uname_taken', message: errors.uname_taken });
                    } else if (status === 200) {
                        messages_arr.push({ name: 'change_uname_success', message: successes.change_uname_success });
                        setUserData({username: uname.value, email: user_data.email});
                        document.forms[0].reset();
                    } else {
                        messages_arr.push({ name: 'server_error', message: errors.server_error });
                    }
                }

                setMessages(messages_arr);
                break;
            
            case 'email':
                var { email } = document.forms[1];

                if (email.value.length === 0) {
                    messages_arr.push({ name: 'email_missing', message: errors.email_missing });
                } else if (!validateEmail(email.value)) {
                    messages_arr.push({ name: 'wrong_email', message: errors.wrong_email });
                } else {
                    const status = await changeEmailRequest(localStorage.getItem('jwt'), {
                        email: email.value
                    });

                    if (status === 401) {
                        logOut();
                    } else if (status === 409) {
                        messages_arr.push({ name: 'email_taken', message: errors.email_taken });
                    } else if (status === 200) {
                        messages_arr.push({ name: 'change_email_success', message: successes.change_email_success });
                        setUserData({username: user_data.username, email: email.value});
                        document.forms[1].reset();
                    } else {
                        messages_arr.push({ name: 'server_error', message: errors.server_error });
                    }
                }

                setMessages(messages_arr);
                break;

            case 'pass':
                var { pass_01, pass_02 } = document.forms[2];
                var pass_valid = true;
                
                if (pass_01.value.length === 0) {
                    pass_valid = false;
                    messages_arr.push({ name: 'pass_01_missing', message: errors.pass_01_missing });
                }
                if (pass_02.value.length === 0) {
                    pass_valid = false;
                    messages_arr.push({ name: 'pass_02_missing', message: errors.pass_02_missing });
                } else if (pass_02.value.length < 8) {
                    pass_valid = false;
                    messages_arr.push({ name: 'pass_too_short', message: errors.pass_too_short });
                }

                if (pass_valid) {
                    const [ response, status ] = await checkPasswordRequest(localStorage.getItem('jwt'), {
                        password: pass_01.value
                    });

                    if (status === 401) {
                        logOut();
                    } else if (status === 200) {
                        if (response === true) {
                            if (pass_01.value === pass_02.value) {
                                messages_arr.push({ name: 'pass_identical', message: errors.pass_idencital });
                            } else {
                                const status_02 = await changePasswordRequest(localStorage.getItem('jwt'), {
                                    password: pass_02.value
                                });
    
                                if (status_02 === 401) {
                                    logOut();
                                } else if (status_02 === 200) {
                                    messages_arr.push({ name: 'change_password_success', message: successes.change_password_success });
                                    document.forms[2].reset();
                                } else {
                                    messages_arr.push({ name: 'server_error', message: errors.server_error });
                                }
                            }
                        } else {
                            messages_arr.push({ name: 'wrong_pass', message: errors.wrong_pass });
                        }
                    } else {
                        messages_arr.push({ name: 'server_error', message: errors.server_error });
                    }
                }
                
                setMessages(messages_arr);
                break;

            default:
                break;
        }
    }

    // Funkcja obsługująca panel zmiany nazwy użytkownika
    const handleSubmitUname = e => {
        refreshContent();
        handleSubmit(e, 'uname');
    }

    // Funkcja obsługująca panel zmiany adresu e-mail użytkownika
    const handleSubmitEmail = e => {
        refreshContent();
        handleSubmit(e, 'email');
    }

    // Funkcja obsługująca panel zmiany hasła użytkownika
    const handleSubmitPass = e => {
        refreshContent();
        handleSubmit(e, 'pass');
    }

    // Funkcja wyświetlająca wiadomości o błędach / powodzeniach
    const renderMessage = (name, type = 'default') => {
        const message = messages.find(m => m.name === name);

        if (message) {
            if (type === 'error_main') {
                document.forms[0].reset();
                document.forms[1].reset();
                document.forms[2].reset();
            }

            return (
                type === 'default' ?
                <label className='px-2 Profile-change-data-error text-danger'>{message.message}</label> :
                type === 'error_main' ?
                <label className='px-2 pt-3 Profile-change-data-error-main text-danger'>{message.message}</label> :
                <label className='px-2 Profile-change-data-success text-success'>{message.message}</label>
            );
        }
    };

    // Funkcja obsługująca zdarzenie akceptacji gry
    const handleGameAccept = (username) => {
        props.sendWsMessage(username, '', 'ACCEPT');
        localStorage.setItem('opponent_joined', 'true');
        localStorage.setItem('opponent', username);
        navigate('/game');
    }

    // Funkcja obsługująca zdarzenie odrzucenia gry
    const handleGameDecline = (username) => {
        props.sendWsMessage(username, '', 'DECLINE');
        refreshContent();
    }

    // Funkcja obsługująca zdarzenie zaproszenia do gry
    const handleGameInvite = async (user_id, username) => {
        const status = await addNotificationRequest(localStorage.getItem('jwt'), {
            userId: user_id,
            type: 'invite-game'
        });

        if (status === 200) {
            localStorage.setItem('opponent', username);
            navigate('/game');
        } else if (status === 204) {
            window.location.reload(false);
        } else {
            logOut();
        }
    }

    // Funkcja obsługująca zdarzenie zaproszenia do znajomych
    const handleFriendInvite = async (index, user_id) => {
        var user_potential_friends_arr             = structuredClone(user_potential_friends);
        user_potential_friends_arr[index].disabled = true;
        
        setUserPotentialFriends(user_potential_friends_arr);

        const status = await addNotificationRequest(localStorage.getItem('jwt'), {
            userId: user_id,
            type: 'invite-friend'
        });

        if (status !== 200) {
            logOut();
        }
    }

    // Funkcja obsługująca zdarzenie usunięcia znajomego
    const handleFriendDelete = async (user_id) => {
        const status = await deleteFriendRequest(localStorage.getItem('jwt'), user_id);

        if (status === 200) {
            refreshContent();
        } else {
            logOut();
        }
    }

    // Funkcja pobierająca listę znajomych
    const getUserFriends = async () => {
        const [ response, status ] = await userFriendsRequest(localStorage.getItem('jwt'));

        if (status === 200) {
            setUserFriends(response);
        } else {
            logOut();
        }
    }

    // Funkcja pobierająca listę użytkowników, którzy nie są jeszcze znajomymi
    const getUserPotentialFriends = async () => {
        const [ response, status ] = await userPotentialFriendsRequest(localStorage.getItem('jwt'), '*');

        if (status === 200) {
            for (let i in response) {
                response[i].disabled = false;
            }
            setUserPotentialFriends(response);
        } else {
            logOut();
        }
    }

    // Funkcja pobierająca listę gier
    const getUserGames = async () => {
        const [ response, status ] = await userGamesRequest(localStorage.getItem('jwt'));

        if (status === 200) {
            setUserGames(response);
        } else {
            logOut();
        }
    }

    // Funkcja pobierająca listę powiadomień
    const getNotifications = async () => {
        const [ response, status ] = await getNotificationsRequest(localStorage.getItem('jwt'));

        if (status === 200) {
            var notifications_arr = [];
            for (const i in response) {
                if (response[i].type === 'invite-game') {
                    notifications_arr.push(<Notification type={response[i].type} key={'notification_' + (i + 1)} date={response[i].notification_date.split('.')[0]} username={response[i].username} from_user={response[i].from_user} notification_id={response[i].notification_id} onClickAccept={() => handleGameAccept(response[i].username)} onClickDecline={() => handleGameDecline(response[i].username)}/>);
                } else {
                    notifications_arr.push(<Notification type={response[i].type} key={'notification_' + (i + 1)} date={response[i].notification_date.split('.')[0]} username={response[i].username} from_user={response[i].from_user} notification_id={response[i].notification_id} onClickAccept={refreshContent} onClickDecline={refreshContent}/>);
                }
            }
            setNotifications(notifications_arr);
        } else {
            logOut();
        }
    }

    // Funkcja odświeżająca zawartość strony
    const refreshContent = () => {
        getUserFriends();
        getUserPotentialFriends();
        getUserGames();
        getNotifications();

        document.forms[3].reset();
    }

    // Funkcja obsługująca zdarzenie odrzucenia gry przez przeciwnika
    const handleGameInviteDeclined = () => {
        props.setOpponentReady(false);
        props.setGameInviteDeclined(false);
        clearGameData();
        navigate('/profile');
    }

    // Funkcja obsługująca zdarzenie opuszczenia gry przez przeciwnika
    const cancelGame = () => {
        props.setOpponentReady(false);
        props.setGameCancel(false);
        clearGameData();
        navigate('/profile');
    }

    // Funkcja obsługująca zdarzenie poddania się przeciwnika
    const handleOpponentSurrender = () => {
        props.setOpponentReady(false);
        props.setOpponentSurrender(false);
        props.setGameStarted(false);
        clearGameData();
        navigate('/profile');
    }

    // Funkcja obsługująca zdarzenie utraty połączenia z przeciwnikiem
    const handleConnectionLost = () => {
        props.setOpponentReady(false);
        props.setGameStarted(false);
        props.setConnectionLost(false);
        clearGameData();
        navigate('/profile');
    }

    // Funkcja obsługująca zdarzenie końca gry
    const handleGameOver = async (save_result) => {
        var opponent = localStorage.getItem('opponent');
        var username = localStorage.getItem('username');

        if (save_result && opponent && username) {
            await addGameRequest(localStorage.getItem('jwt'), {
                username1: username, 
                username2: opponent 
            });
        }
    
        props.setGameOver(false);
        props.setOpponentReady(false);
        props.setGameStarted(false);
        clearGameData();
        navigate('/profile');
    }

    // Funkcja obsługująca zdarzenie wylogowania się podczas trwającej gry
    const handleLogoutDuringGame = async () => {
        var opponent = localStorage.getItem('opponent');
        var username = localStorage.getItem('username');

        if (opponent) {
            props.sendWsMessage(opponent, '', 'SURRENDER');

            if (username) {
                await addGameRequest(localStorage.getItem('jwt'), {
                    username1: opponent, 
                    username2: username 
                });
            }
        }
        
        logOut(true);
    }

    // Funkcja obsługująca zdarzenie wylogowania się podczas przygotowania do gry
    const handleLogoutDuringPrep = async () => {
        var opponent = localStorage.getItem('opponent');
        if (opponent) {
            await deleteNotificationByUsersDataRequest(localStorage.getItem('jwt'), opponent);
            
            if (localStorage.getItem('opponent_joined')) {
                props.sendWsMessage(opponent, '', 'CANCEL');
            } else {
                props.sendWsMessage(opponent, 'refresh', 'CANCEL');
            }
        }
        
        logOut(true);
    }

    // Hook efektu
    useEffect(() => {
        const handleGameAcceptUE = (username) => {
            props.sendWsMessage(username, '', 'ACCEPT');
            localStorage.setItem('opponent_joined', 'true');
            localStorage.setItem('opponent', username);
            navigate('/game');
        }

        const handleGameDeclineUE = (username) => {
            props.sendWsMessage(username, '', 'DECLINE');
            notificationOnClickUE();
        }

        const getUserDataUE = async () => {
            const [ response, status ] = await userDataRequest(localStorage.getItem('jwt'));

            if (status === 200) {
                setUserData({username: response.username, email: response.email});
            } else {
                logOut();
            }
        }

        const getUserFriendsUE = async () => {
            const [ response, status ] = await userFriendsRequest(localStorage.getItem('jwt'));

            if (status === 200) {
                setUserFriends(response);
            } else {
                logOut();
            }
        }

        const getUserPotentialFriendsUE = async () => {
            const [ response, status ] = await userPotentialFriendsRequest(localStorage.getItem('jwt'), '*');

            if (status === 200) {
                for (let i in response) {
                    response[i].disabled = false;
                }
                setUserPotentialFriends(response);
            } else {
                logOut();
            }
        }

        const getUserGamesUE = async () => {
            const [ response, status ] = await userGamesRequest(localStorage.getItem('jwt'));

            if (status === 200) {
                setUserGames(response);
            } else {
                logOut();
            }
        }

        const getNotificationsUE = async () => {
            const [ response, status ] = await getNotificationsRequest(localStorage.getItem('jwt'));

            if (status === 200) {
                var notifications_arr = [];
                for (const i in response) {
                    if (response[i].type === 'invite-game') {
                        notifications_arr.push(<Notification type={response[i].type} key={'notification_' + (i + 1)} date={response[i].notification_date.split('.')[0]} username={response[i].username} from_user={response[i].from_user} notification_id={response[i].notification_id} onClickAccept={() => handleGameAcceptUE(response[i].username)} onClickDecline={() => handleGameDeclineUE(response[i].username)}/>);
                    } else {
                        notifications_arr.push(<Notification type={response[i].type} key={'notification_' + (i + 1)} date={response[i].notification_date.split('.')[0]} username={response[i].username} from_user={response[i].from_user} notification_id={response[i].notification_id} onClickAccept={notificationOnClickUE} onClickDecline={notificationOnClickUE}/>);
                    }
                }
                setNotifications(notifications_arr);
            } else {
                logOut();
            }
        }

        const notificationOnClickUE = () => {
            getUserFriendsUE();
            getUserPotentialFriendsUE();
            getUserGames();
            getNotificationsUE();
        }

        getUserDataUE();
        getUserFriendsUE();
        getUserPotentialFriendsUE();
        getUserGamesUE();
        getNotificationsUE();
        switchNavLink('navlink-2');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className='Profile-layers-container'>
            <div className='Profile-content-layer'>
                <div className='Profile-container my-4 d-flex flex-column flex-lg-row'>
                    <div className='Profile-user-panel d-flex flex-column'>
                        <div className='Profile-user-info d-flex flex-column p-3'>
                            <div>
                                <FontAwesomeIcon icon={faUser} fixedWidth/>
                                <span>&nbsp;&nbsp;{user_data.username}</span>
                            </div>
                            <div>
                                <FontAwesomeIcon icon={faEnvelope} fixedWidth/>       
                                <span>&nbsp;&nbsp;{user_data.email}</span>
                            </div>
                            { renderMessage('server_error', 'error_main') }
                        </div>
                        <div className='p-3'>
                            <CollapseComponent aria_controls='notifications-collapse' button_text='Powiadomienia' notifications_count={notifications.length} button_className='w-100 mb-2 rounded-0' collapse_className='mb-3'>
                                <div className='d-flex flex-row justify-content-center mx-1 p-2'>
                                    <button className='btn btn-outline-secondary btn-sm rounded-0 w-100' onClick={refreshContent}>
                                        <FontAwesomeIcon icon={faRotateRight} />
                                        {' '}Odśwież
                                    </button>
                                </div>
                                {
                                    notifications.length > 0 ?
                                    <div className='Profile-notification-container mx-2'>
                                        {
                                            notifications.map(notification => {
                                                return (notification);
                                            })
                                        }
                                    </div> :
                                    <div className='text-muted text-center'>Brak powiadomień</div>
                                }
                            </CollapseComponent>
                            <CollapseComponent aria_controls='change-uname-collapse' button_text='Zmień nazwę użytkownika' button_className='w-100 mb-2 rounded-0' collapse_className='mb-3'>
                                <form onSubmit={handleSubmitUname}>
                                    <div className='p-2 d-flex flex-row Profile-change-data-container'>
                                        <input type='text' className='Profile-change-data-input px-2' placeholder='Wprowadź nową nazwę użytkownika' name='uname' />           
                                        <button type='submit' className='Profile-change-data-button btn btn-outline-success btn-sm rounded-0'>Dalej</button>
                                    </div>
                                    { renderMessage('uname_missing') }
                                    { renderMessage('uname_taken') }
                                    { renderMessage('change_uname_success', 'success') }
                                </form>
                            </CollapseComponent>
                            <CollapseComponent aria_controls='change-email-collapse' button_text='Zmień adres e-mail' button_className='w-100 mb-2 rounded-0' collapse_className='mb-3'>
                                <form onSubmit={handleSubmitEmail}>
                                    <div className='p-2 d-flex flex-row Profile-change-data-container'>
                                        <input type='text' className='Profile-change-data-input px-2' placeholder='Wprowadź nowy adres e-mail' name='email' />           
                                        <button type='submit' className='Profile-change-data-button btn btn-outline-success btn-sm rounded-0'>Dalej</button>
                                    </div>
                                    { renderMessage('email_missing') }
                                    { renderMessage('email_taken') }
                                    { renderMessage('wrong_email') }
                                    { renderMessage('change_email_success', 'success') }
                                </form>
                            </CollapseComponent>
                            <CollapseComponent aria_controls='change-pass-collapse'  button_text='Zmień hasło' button_className='w-100 mb-2 rounded-0' collapse_className='mb-3'>
                                <form onSubmit={handleSubmitPass}>
                                    <div className='d-flex flex-column'>
                                        <div className='p-2 d-flex flex-row Profile-change-data-container'>
                                            <input type='password' className='Profile-change-data-input px-2' placeholder='Wprowadź obecne hasło' name='pass_01' />
                                            <button type='submit' className='Profile-change-data-button btn btn-outline-success btn-sm disabled invisible rounded-0'>Dalej</button>
                                        </div>
                                        { renderMessage('pass_01_missing') }
                                        { renderMessage('wrong_pass') }
                                        <div className='p-2 d-flex flex-row Profile-change-data-container'>
                                            <input type='password' className='Profile-change-data-input px-2' placeholder='Wprowadź nowe hasło' name='pass_02' />
                                            <button type='submit' className='Profile-change-data-button btn btn-outline-success btn-sm rounded-0'>Dalej</button>
                                        </div>
                                        { renderMessage('pass_02_missing') }
                                        { renderMessage('pass_too_short') }
                                        { renderMessage('pass_identical') }
                                        { renderMessage('change_password_success', 'success') }
                                    </div>
                                </form>
                            </CollapseComponent>
                        </div>
                    </div>           
                    <div className='d-flex flex-column Profile-tables-container'>
                        <div className='Profile-table-container d-flex flex-column mb-4'>
                            <span className='bg-primary p-1 Profile-table-title'>Twoi znajomi</span>
                            <>
                            {
                                user_friends.length > 0 ?
                                <div className='my-2 Profile-table'>
                                    <table className='table table-striped table-hover'>
                                        <thead>
                                            <tr>
                                                <th scope='col'></th>
                                                <th scope='col'>Nazwa użytkownika</th>
                                                <th scope='col'>Adres e-mail</th>
                                                <th scope='col' colSpan='2'></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {user_friends.map((friend, index) => {
                                                return (
                                                    <tr key={'friend-' + (index + 1)}>
                                                        <th scope='row'>{index + 1}</th>
                                                        <td>{friend.username}</td>
                                                        <td>{friend.email}</td>
                                                        <td>                                            
                                                            <Tooltip title='Zaproś do gry' placement='top'>
                                                                <IconButton aria-label='invite' size='small' color='success' className='p-0' onClick={() => handleGameInvite(friend.userId, friend.username)}>
                                                                    <PlayArrow fontSize='small'/>
                                                                </IconButton>
                                                            </Tooltip> 
                                                        </td>
                                                        <td>
                                                            <Tooltip title='Usuń ze znajomych' placement='top'>
                                                                <IconButton aria-label='delete' size='small' color='error' className='p-0' onClick={() => handleFriendDelete(friend.userId)}>
                                                                    <ClearIcon fontSize='small'/>
                                                                </IconButton>
                                                            </Tooltip>                                    
                                                        </td>
                                                    </tr>

                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                                : <span className='text-center p-3 text-muted w-100'>Nie masz jeszcze żadnych znajomych</span>
                            }
                            </>            
                        </div>
                        <div className='Profile-table-container d-flex flex-column mb-4'>
                            <span className='bg-primary p-1 Profile-table-title'>Historia gier</span>
                            <>
                            {
                                user_games.length > 0 ?
                                <div className='my-2 Profile-table'>
                                    <table className='table table-striped table-hover'>
                                        <thead>
                                            <tr>
                                                <th scope='col'></th>
                                                <th scope='col'>Przeciwnik</th>
                                                <th scope='col'>Data</th>
                                                <th scope='col'>Wynik</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {user_games.map((game, index) => {
                                                return (
                                                    <tr key={'game-' + (index + 1)}>
                                                        <th scope='row'>{index + 1}</th>
                                                        <td>{game.opponent}</td>
                                                        <td>
                                                            {
                                                                game.game_date.split('.')[0]
                                                            }
                                                        </td>
                                                        {
                                                            game.result === 'Wygrana' ?
                                                            <td className='text-success Profile-game-result-text'>{game.result}</td> :
                                                            <td className='text-danger Profile-game-result-text'>{game.result}</td>
                                                        }
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div> :
                                <span className='text-center p-3 text-muted w-100'>Brak gier w historii</span>
                            }
                            </>
                        </div>
                        <div className='Profile-table-container d-flex flex-column'>
                            <span className='bg-primary p-1 Profile-table-title'>Szukaj osób</span>
                            <form onSubmit={handleSubmitSearch}>
                                <div className='Profile-search-container d-flex flex-row p-3 border-bottom'>
                                    <input type='text' className='Profile-search-input px-2' placeholder='Szukaj osób' name='search' />
                                    <button type='submit' className='Profile-search-button btn btn-outline-success btn-sm rounded-0'>
                                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                                        {' '}Szukaj
                                    </button>
                                </div>
                            </form>
                            {
                                user_potential_friends.length > 0 ?
                                <div className='my-2 Profile-table'>
                                    <table className='table table-striped table-hover'>
                                        <thead>
                                            <tr>
                                                <th scope='col'></th>
                                                <th scope='col'>Nazwa użytkownika</th>
                                                <th scope='col'>Adres e-mail</th>
                                                <th scope='col'></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {user_potential_friends.sort((a, b) => {
                                                return a[2] === b[2] ? 0 : a[2] ? -1 : 1;
                                            }).map((potential_friend, index) => {
                                                return (
                                                    <tr key={'potential-friend-' + (index + 1)}>
                                                        <th scope='row'>{index + 1}</th>
                                                        <td>{potential_friend.username}</td>
                                                        <td>{potential_friend.email}</td>    
                                                        <td>
                                                            <Tooltip title='Zaproś do znajomych' placement='top'>        
                                                                <span>
                                                                    <IconButton aria-label='invite' size='small' color='success' className='p-0' onClick={() => handleFriendInvite(index, potential_friend.userId)} disabled={potential_friend.disabled}>
                                                                        <AddIcon fontSize='small'/>
                                                                    </IconButton>
                                                                </span>
                                                            </Tooltip>
                                                        </td>                    
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div> : 
                                <span className='text-center p-3 text-muted w-100'>Nie znaleziono żadnych osób</span>
                            }
                        </div>
                    </div> 
                </div>
            </div>
            { 
                localStorage.getItem('logout_during_game') === 'true' ?
                <div className='Profile-info-layer'>
                    <div className='Profile-info text-center'>
                        <p>
                            Wylogowanie się podczas trwającej gry spowoduje jej zakończenie i uznanie za przegraną.
                            Czy chcesz kontynuować?
                        </p>
                        <div className='d-flex flex-row justify-content-center'>
                            <button className='btn btn-success rounded-0 px-3 mb-2 mx-2' onClick={handleLogoutDuringGame}>
                                Tak
                            </button>
                            <button className='btn btn-danger rounded-0 px-3 mb-2 mx-2' onClick={() => logOutCancel()}>
                                Nie
                            </button>
                        </div>
                    </div>    
                </div> 
                :
                localStorage.getItem('logout_during_prep') === 'true' ?
                <div className='Profile-info-layer'>
                    <div className='Profile-info text-center'>
                        <p>
                            Wylogowanie się podczas przygotowania do gry spowoduje jej anulowanie.
                            Czy chcesz kontynuować?
                        </p>
                        <div className='d-flex flex-row justify-content-center'>
                            <button className='btn btn-success rounded-0 px-3 mb-2 mx-2' onClick={handleLogoutDuringPrep}>
                                Tak
                            </button>
                            <button className='btn btn-danger rounded-0 px-3 mb-2 mx-2' onClick={() => logOutCancel()}>
                                Nie
                            </button>
                        </div>
                    </div>    
                </div>
                :
                localStorage.getItem('opponent') && props.connection_lost ? 
                <div className='Profile-info-layer'>
                    <div className='Profile-info text-center'>
                        <p>
                            Połączenie z drugim graczem zostało zerwane.
                        </p>
                        <div className='d-flex flex-row justify-content-center'>
                            <button className='btn btn-success rounded-0 px-3 mb-2 mx-2' onClick={handleConnectionLost}>
                                OK
                            </button>
                        </div>
                    </div>    
                </div> 
                :
                localStorage.getItem('opponent') && props.game_invite_declined ?
                <div className='Profile-info-layer'>
                    <div className='Profile-info text-center'>
                        <p>
                            Gracz <i>{localStorage.getItem('opponent')}</i> odrzucił zaproszenie do gry.
                        </p>
                        <div className='d-flex flex-row justify-content-center'>
                            <button className='btn btn-success rounded-0 px-3 mb-2' onClick={handleGameInviteDeclined}>
                                OK
                            </button>
                        </div>
                    </div>
                </div>
                :
                localStorage.getItem('opponent') && props.game_cancel ?
                <div className='Profile-info-layer'>
                    <div className='Profile-info text-center'>
                        <p>
                            Gracz <i>{localStorage.getItem('opponent')}</i> opuścił grę, zostanie ona anulowana.
                        </p>
                        <div className='d-flex flex-row justify-content-center'>
                            <button className='btn btn-success rounded-0 px-3 mb-2' onClick={cancelGame}>
                                OK
                            </button>
                        </div>
                    </div>
                </div>
                :
                localStorage.getItem('opponent') && props.opponent_surrender ? 
                <div className='Profile-info-layer'>
                    <div className='Profile-info text-center px-5'>
                        <p>
                            Gracz <i>{localStorage.getItem('opponent')}</i> poddał się.
                            <br/>
                            <span className='text-success'>Wygrałeś</span>
                        </p>
                        <div className='d-flex flex-row justify-content-center'>
                            <button className='btn btn-success rounded-0 px-3 mb-2' onClick={handleOpponentSurrender}>
                                OK
                            </button>
                        </div>
                    </div>
                </div>
                :
                localStorage.getItem('opponent') && props.game_over ?
                <div className='Profile-info-layer'>
                    <div className='Profile-info text-center px-5'>
                        <p>
                            Koniec gry.
                            <br/>
                            {
                                props.winner === 1 ? 
                                <span className='text-success'>Wygrałeś</span> : 
                                <span className='text-danger'>Przegrałeś</span>
                            }
                        </p>
                        <div className='d-flex flex-row justify-content-center'>
                            <button className='btn btn-success rounded-0 px-3 mb-2' onClick={() => handleGameOver(props.winner === 1 ? true : false)}>
                                OK
                            </button>
                        </div>
                    </div>
                </div> 
                : 
                localStorage.getItem('opponent') ?
                <div className='Profile-info-layer'>
                    <div className='Profile-info'>
                        <p>
                            Jesteś obecnie w trakcie gry z użytkownikiem <i>{localStorage.getItem('opponent')}</i>.
                        </p>
                        <p>
                            <a href='/game'>Przejdź do gry</a>
                        </p>
                    </div>
                </div> 
                : ''
            }
        </div>
    );
}

export default Profile;