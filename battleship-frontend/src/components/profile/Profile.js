import { React, useEffect, useState }         from 'react';
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
import { friends_data, users_data }           from '../../utils/mockedData';
import { changeEmailRequest, changeUsernameRequest, userDataRequest, userGamesRequest }  from '../../utils/requestsAPI';
import { logOut }                             from '../../utils/utilsAPI';

function Profile(props) {
    const [user_data, setUserData] = useState('');
    const [user_games, setUserGames] = useState([]);

    const handleSubmitSearch = e => {
        e.preventDefault();

        // const { search } = document.forms[3];
    }

    const tables = {
        friends: (
            <>
                {
                    friends_data.length > 0 ?
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
                                {friends_data.map((friend, index) => {
                                    return (
                                        <tr key={'friend-' + (index + 1)}>
                                            <th scope='row'>{index + 1}</th>
                                            <td>{friend[0]}</td>
                                            <td>{friend[1]}</td>
                                            <td>                                            
                                                <Tooltip title='Zaproś do gry' placement='top'>
                                                    <IconButton aria-label='invite' size='small' color='success' className='p-0'>
                                                        <PlayArrow fontSize='small'/>
                                                    </IconButton>
                                                </Tooltip> 
                                            </td>
                                            <td>
                                                <Tooltip title='Usuń ze znajomych' placement='top'>
                                                    <IconButton aria-label='delete' size='small' color='error' className='p-0'>
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
        ),

        search: (
            <>
                {
                    users_data.length > 0 ?
                    <>
                        <form onSubmit={handleSubmitSearch}>
                            <div className='Profile-search-container d-flex flex-row px-2 py-3 border-bottom'>
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
                                    </tr>
                                </thead>
                                <tbody>
                                    {users_data.sort((a, b) => {
                                        return a[2] === b[2] ? 0 : a[2] ? -1 : 1;
                                    }).map((user, index) => {
                                        return (
                                            <tr key={'user-' + (index + 1)}>
                                                <th scope='row'>{index + 1}</th>
                                                <td>{user[0]}</td>
                                                <td>{user[1]}</td>    
                                                <td>
                                                    <Tooltip title='Zaproś do znajomych' placement='top'>
                                                        <IconButton aria-label='invite' size='small' color='success' className='p-0'>
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
                    <span className='text-center p-3 text-muted w-100'>Nie znaleziono żadnych osób</span>
                }
            </>
        ),

        history: (
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
                                            <td>{game.user1}</td>
                                            <td>
                                                {
                                                    game.gameDate.split('T')[0] + ' ' + game.gameDate.split('T')[1].split('.')[0]
                                                }
                                            </td>
                                            {
                                                game.winner === 'Wygrana' ?
                                                <td className='text-success Profile-game-result-text'>{game.winner}</td> :
                                                <td className='text-danger Profile-game-result-text'>{game.winner}</td>
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
        )
    };

    const [error_messages,      setErrorMessages     ] = useState([]);
    const [table_content,       setTableContent      ] = useState(tables.friends);
    const [notifications_count, setNotificationsCount] = useState(props.notifications_count);

    const getNotifications = () => {
        const notifications_types = ['invite-friend', 'invite-game', 'delete-friend', 'decline-game'];
        var notifications_arr     = [];

        for (let i = 0; i < notifications_count; ++i) {
            notifications_arr.push(<Notification type={notifications_types[Math.floor(Math.random() * notifications_types.length)]} key={'notification_' + (i + 1)} onClick={() => setNotificationsCount(notifications_count => notifications_count - 1)}/>);
        }

        return notifications_arr;
    }

    const database = [
        {
            email:    'user1@mail.com',
            uname:    'user1',
            password: '12345678'
        },
        {
            email:    'user2@mail.com',
            uname:    'user2',
            password: 'qwertyui'
        }
    ];

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
                var current_uname = 'user1';
                var current_email = 'user1@mail.com';

                var { pass_01, pass_02 } = document.forms[2];
                var pass_correct         = database.find(user => user.uname === current_uname && user.email === current_email && user.password === pass_01.value);
                var pass_valid           = true;

                if (pass_01.value.length === 0) {
                    pass_valid = false;
                    error_messages_arr.push({ name: 'pass_01_missing', message: errors.pass_01_missing });
                } else if (!pass_correct) {
                    pass_valid = false;
                    error_messages_arr.push({ name: 'wrong_pass', message: errors.wrong_pass });
                }

                if (pass_valid && pass_01.value === pass_02.value) {
                    pass_valid = false;
                    error_messages_arr.push({ name: 'pass_identical', message: errors.pass_idencital });
                }

                if (pass_02.value.length === 0) {
                    pass_valid = false;
                    error_messages_arr.push({ name: 'pass_02_missing', message: errors.pass_02_missing });
                } else if (pass_02.value.length < 8) {
                    pass_valid = false;
                    error_messages_arr.push({ name: 'pass_too_short', message: errors.pass_too_short });
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

    const switchTableContent = type => {
        switch (type) {
            case 'friends':
                setTableContent(tables.friends);
                break;

            case 'search':
                setTableContent(tables.search);
                break;

            case 'history':
                setTableContent(tables.history);
                break;

            default: 
                setTableContent(
                    <h3 className='text-danger text-center p-3'>
                        Coś poszło nie tak
                    </h3>
                );
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

        const getUserGames = async () => {
            const [ response, status ] = await userGamesRequest(localStorage.getItem('jwt'));

            if (status === 200) {
                setUserGames(response);
            } else {
                logOut();
            }
        }

        getUserData();
        getUserGames();

    }, [])

    return (
        <div className='Profile-container my-4 d-flex flex-column flex-md-row'>
            <div className='Profile-user-panel d-flex flex-column'>
                <div className='Profile-user-info d-flex flex-column p-3'>
                    { user_data }
                    { renderErrorMessage('server_error', 'error_main') }
                </div>
                <div className='p-3'>
                    <CollapseComponent aria_controls='notifications-collapse' button_text='Powiadomienia' notifications_count={notifications_count} button_className='w-100 mb-2 rounded-0' collapse_className='mb-3'>
                        {
                            notifications_count > 0 ?
                            <div className='Profile-notification-container mx-2'>
                                {
                                    getNotifications().map(notification => {
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
            <div className='Profile-table-container d-flex flex-column'>
                <div className='d-flex flex-row'>
                    <button className='btn btn-primary btn-lg Profile-table-button-01' onClick={() => switchTableContent('friends')}>Twoi znajomi </button>
                    <button className='btn btn-primary btn-lg Profile-table-button-02' onClick={() => switchTableContent('search')} >Szukaj osób  </button>
                    <button className='btn btn-primary btn-lg Profile-table-button-03' onClick={() => switchTableContent('history')}>Historia gier</button>
                </div>
                {table_content}
            </div>
        </div>
    );
}

export default Profile;