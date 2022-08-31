import { React, useEffect, useState }         from 'react';
import { useNavigate }                        from 'react-router-dom'
import { Tooltip, IconButton }                from '@mui/material';
import ClearIcon                              from '@mui/icons-material/Clear'
import PlayArrow                              from '@mui/icons-material/PlayArrow';
import AddIcon                                from '@mui/icons-material/Add';
import { FontAwesomeIcon }                    from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, 
          faMagnifyingGlass}                  from '@fortawesome/free-solid-svg-icons';

import CollapseComponent                      from './CollapseComponent';      
import { validateEmail }                      from '../../utils/utils';
import Notification                           from './Notification';
import { addNotificationRequest, changeEmailRequest, 
        changePasswordRequest, 
        changeUsernameRequest, 
        checkPasswordRequest, 
        deleteFriendRequest, 
        getNotificationsRequest, 
        userDataRequest, 
        userFriendsRequest, 
        userGamesRequest, 
        userPotentialFriendsRequest}          from '../../utils/requestsAPI';
import { logOut }                             from '../../utils/utilsAPI';
import { clearLocalStorage }                  from '../../utils/utils';
import { switchNavLink }                      from '../../utils/utils';

function Profile() {
    const [user_data, setUserData] = useState('');
    const [user_friends, setUserFriends] = useState([]);
    const [user_potential_friends, setUserPotentialFriends] = useState([]);
    const [user_games, setUserGames] = useState([]);
    const [error_messages, setErrorMessages] = useState([]);    
    const [notifications, setNotifications] = useState([]);

    const navigate = useNavigate();

    const handleSubmitSearch = async (e) => {
        e.preventDefault();

        const { search } = document.forms[3];
        const [ response, status ] = await userPotentialFriendsRequest(localStorage.getItem('jwt'), search.value === '' ? '*' : search.value);
        if (status === 200) {
            setUserPotentialFriends(response);
        } else {
            logOut();
        }
    }

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

    const handleSubmit = async (e, type) => {
        e.preventDefault();

        var error_messages_arr = [];
        switch (type) {
            case 'uname':
                var { uname } = document.forms[0];

                if (uname.value.length === 0) {
                    error_messages_arr.push({ name: 'uname_missing', message: errors.uname_missing });
                } else {
                    const status = await changeUsernameRequest(localStorage.getItem('jwt'), {
                        username: uname.value
                    });

                    if (status === 401) {
                        logOut();
                    } else if (status === 409) {
                        error_messages_arr.push({ name: 'uname_taken', message: errors.uname_taken });
                    } else if (status === 200) {
                        window.location.reload(false);
                    } else {
                        error_messages_arr.push({ name: 'server_error', message: errors.server_error });
                    }
                }

                setErrorMessages(error_messages_arr);
                break;
            
            case 'email':
                var { email } = document.forms[1];

                if (email.value.length === 0) {
                    error_messages_arr.push({ name: 'email_missing', message: errors.email_missing });
                } else if (!validateEmail(email.value)) {
                    error_messages_arr.push({ name: 'wrong_email', message: errors.wrong_email });
                } else {
                    const status = await changeEmailRequest(localStorage.getItem('jwt'), {
                        email: email.value
                    });

                    if (status === 401) {
                        logOut();
                    } else if (status === 409) {
                        error_messages_arr.push({ name: 'email_taken', message: errors.email_taken });
                    } else if (status === 200) {
                        window.location.reload(false);
                    } else {
                        error_messages_arr.push({ name: 'server_error', message: errors.server_error });
                    }
                }

                setErrorMessages(error_messages_arr);
                break;

            case 'pass':
                var { pass_01, pass_02 } = document.forms[2];
                var pass_valid = true;
                
                if (pass_01.value.length === 0) {
                    pass_valid = false;
                    error_messages_arr.push({ name: 'pass_01_missing', message: errors.pass_01_missing });
                }
                if (pass_02.value.length === 0) {
                    pass_valid = false;
                    error_messages_arr.push({ name: 'pass_02_missing', message: errors.pass_02_missing });
                } else if (pass_02.value.length < 8) {
                    pass_valid = false;
                    error_messages_arr.push({ name: 'pass_too_short', message: errors.pass_too_short });
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
                                error_messages_arr.push({ name: 'pass_identical', message: errors.pass_idencital });
                            } else {
                                const status_02 = await changePasswordRequest(localStorage.getItem('jwt'), {
                                    password: pass_02.value
                                });
    
                                if (status_02 === 401) {
                                    logOut();
                                } else if (status_02 === 200) {
                                    window.location.reload(false);
                                } else {
                                    error_messages_arr.push({ name: 'server_error', message: errors.server_error });
                                }
                            }
                        } else {
                            error_messages_arr.push({ name: 'wrong_pass', message: errors.wrong_pass });
                        }
                    } else {
                        error_messages_arr.push({ name: 'server_error', message: errors.server_error });
                    }
                }
                
                setErrorMessages(error_messages_arr);
                break;

            default:
                break;
        }
    }

    const handleSubmitUname = e => {
        handleSubmit(e, 'uname');
    }

    const handleSubmitEmail = e => {
        handleSubmit(e, 'email');
    }

    const handleSubmitPass = e => {
        handleSubmit(e, 'pass');
    }

    const renderErrorMessage = (name, type = 'default') => {
        const error_message = error_messages.find(em => em.name === name);

        if (error_message) {
            if (type === 'error_main') {
                document.forms[0].reset();
                document.forms[1].reset();
                document.forms[2].reset();
            }

            return (
                type === 'default' ?
                <label className='px-2 Profile-change-data-error text-danger'>{error_message.message}</label> :
                <label className='px-2 pt-3 Profile-change-data-error-main text-danger'>{error_message.message}</label>
            );
        }
    };

    const handleGameInvite = async (user_id, username) => {
        const status = await addNotificationRequest(localStorage.getItem('jwt'), {
            userId: user_id,
            type: 'invite-game'
        });

        if (status !== 200) {
            logOut();
        } else {
            localStorage.setItem('opponent', username);
            navigate('/game');
        }
    }

    const handleFriendInvite = async (user_id) => {
        const status = await addNotificationRequest(localStorage.getItem('jwt'), {
            userId: user_id,
            type: 'invite-friend'
        });

        if (status !== 200) {
            logOut();
        }
    }

    const handleFriendDelete = async (user_id) => {
        const status = await deleteFriendRequest(localStorage.getItem('jwt'), user_id);

        if (status === 200) {
            window.location.reload(false);
        } else {
            logOut();
        }
    }

    useEffect(() => {
        const getUserData = async () => {
            const [ response, status ] = await userDataRequest(localStorage.getItem('jwt'));

            if (status === 200) {
                setUserData(
                    <>
                        <div>
                            <FontAwesomeIcon icon={faUser} fixedWidth/>
                            <span>&nbsp;&nbsp;{response.username}</span>
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faEnvelope} fixedWidth/>       
                            <span>&nbsp;&nbsp;{response.email}</span>
                        </div>
                    </>
                );
            } else {
                logOut();
            }
        }

        const getUserFriends = async () => {
            const [ response, status ] = await userFriendsRequest(localStorage.getItem('jwt'));

            if (status === 200) {
                setUserFriends(response);
            } else {
                logOut();
            }
        }

        const getUserPotentialFriends = async () => {
            const [ response, status ] = await userPotentialFriendsRequest(localStorage.getItem('jwt'), '*');

            if (status === 200) {
                setUserPotentialFriends(response);
            } else {
                logOut();
            }
        }

        const getUserGames = async () => {
            const [ response, status ] = await userGamesRequest(localStorage.getItem('jwt'));

            if (status === 200) {
                setUserGames(response);
            } else {
                logOut();
            }
        }

        const getNotifications = async () => {
            const [ response, status ] = await getNotificationsRequest(localStorage.getItem('jwt'));

            if (status === 200) {
                var notifications_arr = [];
                for (const i in response) {
                    notifications_arr.push(<Notification type={response[i].type} key={'notification_' + (i + 1)} date={response[i].notification_date.split('.')[0]} username={response[i].username} from_user={response[i].from_user} notification_id={response[i].notification_id}/>);
                }

                setNotifications(notifications_arr);
            } else {
                logOut();
            }
        }

        getUserData();
        getUserFriends();
        getUserPotentialFriends();
        getUserGames();
        getNotifications();
        clearLocalStorage();
        switchNavLink('navlink-2');
    }, []);

    return (
        <div className='Profile-container my-4 d-flex flex-column flex-lg-row'>
            <div className='Profile-user-panel d-flex flex-column'>
                <div className='Profile-user-info d-flex flex-column p-3'>
                    { user_data }
                    { renderErrorMessage('server_error', 'error_main') }
                </div>
                <div className='p-3'>
                    <CollapseComponent aria_controls='notifications-collapse' button_text='Powiadomienia' notifications_count={notifications.length} button_className='w-100 mb-2 rounded-0' collapse_className='mb-3'>
                        {
                            notifications.length > 0 ?
                            <div className='Profile-notification-container mx-2'>
                                {
                                    notifications.map(notification => {
                                        return (notification);
                                    })
                                }
                            </div> :
                            <span className='text-muted ps-2'>Brak powiadomień</span>
                        }
                    </CollapseComponent>
                    <CollapseComponent aria_controls='change-uname-collapse' button_text='Zmień nazwę użytkownika' button_className='w-100 mb-2 rounded-0' collapse_className='mb-3'>
                        <form onSubmit={handleSubmitUname}>
                            <div className='p-2 d-flex flex-row Profile-change-data-container'>
                                <input type='text' className='Profile-change-data-input px-2' placeholder='Wprowadź nową nazwę użytkownika' name='uname' />           
                                <button type='submit' className='Profile-change-data-button btn btn-outline-success btn-sm rounded-0'>Dalej</button>
                            </div>
                            { renderErrorMessage('uname_missing') }
                            { renderErrorMessage('uname_taken') }
                        </form>
                    </CollapseComponent>
                    <CollapseComponent aria_controls='change-email-collapse' button_text='Zmień adres e-mail' button_className='w-100 mb-2 rounded-0' collapse_className='mb-3'>
                        <form onSubmit={handleSubmitEmail}>
                            <div className='p-2 d-flex flex-row Profile-change-data-container'>
                                <input type='text' className='Profile-change-data-input px-2' placeholder='Wprowadź nowy adres e-mail' name='email' />           
                                <button type='submit' className='Profile-change-data-button btn btn-outline-success btn-sm rounded-0'>Dalej</button>
                            </div>
                            { renderErrorMessage('email_missing') }
                            { renderErrorMessage('email_taken') }
                            { renderErrorMessage('wrong_email') }
                        </form>
                    </CollapseComponent>
                    <CollapseComponent aria_controls='change-pass-collapse'  button_text='Zmień hasło' button_className='w-100 mb-2 rounded-0' collapse_className='mb-3'>
                        <form onSubmit={handleSubmitPass}>
                            <div className='d-flex flex-column'>
                                <div className='p-2 d-flex flex-row Profile-change-data-container'>
                                    <input type='password' className='Profile-change-data-input px-2' placeholder='Wprowadź obecne hasło' name='pass_01' />
                                    <button type='submit' className='Profile-change-data-button btn btn-outline-success btn-sm disabled invisible rounded-0'>Dalej</button>
                                </div>
                                { renderErrorMessage('pass_01_missing') }
                                { renderErrorMessage('wrong_pass') }
                                <div className='p-2 d-flex flex-row Profile-change-data-container'>
                                    <input type='password' className='Profile-change-data-input px-2' placeholder='Wprowadź nowe hasło' name='pass_02' />
                                    <button type='submit' className='Profile-change-data-button btn btn-outline-success btn-sm rounded-0'>Dalej</button>
                                </div>
                                { renderErrorMessage('pass_02_missing') }
                                { renderErrorMessage('pass_too_short') }
                                { renderErrorMessage('pass_identical') }
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
                    <>
                    {
                        user_potential_friends.length > 0 ?
                        <>
                            <form onSubmit={handleSubmitSearch}>
                                <div className='Profile-search-container d-flex flex-row p-3 border-bottom'>
                                    <input type='text' className='Profile-search-input px-2' placeholder='Szukaj osób' name='search' />
                                    <button type='submit' className='Profile-search-button btn btn-outline-success btn-sm rounded-0'>
                                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                                        {' '}Szukaj
                                    </button>
                                </div>
                            </form>
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
                                                            <IconButton aria-label='invite' size='small' color='success' className='p-0' onClick={() => handleFriendInvite(potential_friend.userId)}>
                                                                <AddIcon fontSize='small'/>
                                                            </IconButton>
                                                        </Tooltip>
                                                    </td>                    
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </> :
                        <>
                            <form onSubmit={handleSubmitSearch}>
                                <div className='Profile-search-container d-flex flex-row p-3 border-bottom'>
                                    <input type='text' name='search' className='Profile-search-input px-2' placeholder='Szukaj osób'/>
                                    <button type='submit' className='Profile-search-button btn btn-outline-success btn-sm rounded-0'>
                                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                                        {' '}Szukaj
                                    </button>
                                </div>
                            </form>
                            <span className='text-center p-3 text-muted w-100'>Nie znaleziono żadnych osób</span>
                        </>
                    }
                    </>
                </div>
            </div> 
        </div>
    );
}

export default Profile;