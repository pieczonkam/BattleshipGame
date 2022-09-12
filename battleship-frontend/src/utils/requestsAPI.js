import axios       from 'axios';
import { API_URL } from "./constants";

// Funkcja wysyłająca żądanie rejestracji
const registerRequest = async (user_data) => {
    try {
        const response = await axios.post(API_URL + '/auth/register', user_data);
        return [ response.data, response.status ];
    } catch (error) {
        return [ error.response.data, error.response.status ];
    }
}

// Funkcja wysyłająca żądanie logowania
const loginRequest = async (user_data) => {
    try {
        const response = await axios.post(API_URL + '/auth/login', user_data);
        return [ response.data, response.status ];
    } catch (error) {
        return [ error.response.data, error.response.status ];
    }
}

// Funkcja wysyłająca żądanie sprawdzenia poprawności tokenu JWT
const jwtValidRequest = async (jwt) => {
    try {
        const response = await axios.get(API_URL + '/auth/jwtValidation', {
            headers: {
                'Authorization': 'Bearer ' + jwt
            }
        });

        return response.status === 200 ? response.data : false;
    } catch (error) {
        return false;
    }
}

// Funkcja wysyłająca żądanie zwrócenia danych użytkownika
const userDataRequest = async (jwt) => {
    try {
        const response = await axios.get(API_URL + '/users/getUser', {
            headers: {
                'Authorization': 'Bearer ' + jwt
            }
        });

        return [ response.data, response.status ];
    } catch (error) {
        return [ error.response.data, error.response.status ];
    }
}

// Funkcja wysyłająca żądanie zwrócenia listy znajomych danego użytkownika
const userFriendsRequest = async (jwt) => {
    try {
        const response = await axios.get(API_URL + '/users/getFriends', {
            headers: {
                'Authorization': 'Bearer ' + jwt
            }
        });

        return [ response.data, response.status ]; 
    } catch (error) {
        return [ error.response.data, error.response.status ];
    }
}

// Funkcja wysyłająca żądanie zwrócenia listy użytkowników, którzy nie są jeszcze znajomymi danego użytkownika
const userPotentialFriendsRequest = async (jwt, pattern) => {
    try {
        const response = await axios.get(API_URL + '/users/getPotentialFriends/' + pattern, {
            headers: {
                'Authorization': 'Bearer ' + jwt
            }
        });

        return [ response.data, response.status ];
    } catch (error) {
        return [ error.response.data, error.response.status ];
    }
}

// Funkcja wysyłająca żądanie zwrócenia gier danego użytkownika
const userGamesRequest = async (jwt) => {
    try {
        const response = await axios.get(API_URL + '/games/getGames', {
            headers: {
                'Authorization': 'Bearer ' + jwt
            }
        });

        return [ response.data, response.status ];
    } catch (error) {
        return [ error.response.data, error.response.status ];
    }
}

// Funkcja wysyłająca żądanie zmiany adresu e-mail użytkownika
const changeEmailRequest = async (jwt, user_data) => {
    try {
        const response = await axios.put(API_URL + '/users/changeEmail', 
            user_data,
            { headers: {
                'Authorization': 'Bearer ' + jwt
            }}
        );

        return response.status;
    } catch (error) {
        return error.response.status;
    }
}

// Funkcja wysyłająca żądanie zmiany nazwy użytkownika
const changeUsernameRequest = async (jwt, user_data) => {
    try {
        const response = await axios.put(API_URL + '/users/changeUsername', 
            user_data,
            { headers: {
                'Authorization': 'Bearer ' + jwt
            }}
        );

        return response.status;
    } catch (error) {
        return error.response.status;
    }
}

// Funkcja wysyłająca żądanie sprawdzenia poprawności hasła użytkownika
const checkPasswordRequest = async (jwt, user_data) => {
    try {
        const response = await axios.post(API_URL + '/users/passwordCorrect',
            user_data,
            { headers: {
                'Authorization': 'Bearer ' + jwt
            }}
        );

        return [ response.data, response.status ];
    } catch (error) {
        return [ error.response.data, error.response.status ];
    }
}

// Funkcja wysyłająca żądanie zmiany hasła użytkownika
const changePasswordRequest = async (jwt, user_data) => {
    try {
        const response = await axios.put(API_URL + '/users/changePassword',
            user_data,
            { headers: {
                'Authorization': 'Bearer ' + jwt
            }}
        );

        return response.status;
    } catch (error) {
        return error.response.status;
    }
}

// Funkcja wysyłająca żądanie dodania nowego powiadomienia
const addNotificationRequest = async (jwt, notification_data) => {
    try {
        const response = await axios.post(API_URL + '/users/addNotification',
            notification_data,
            { headers: {
                'Authorization': 'Bearer ' + jwt
            }}
        );

        return response.status;
    } catch (error) {
        return error.response.status;
    }
}

// Funkcja wysyłająca żądanie zwrócenia listy powiadomień użytkownika
const getNotificationsRequest = async (jwt) => {
    try {
        const response = await axios.get(API_URL + '/users/getNotifications', {
            headers: {
                'Authorization': 'Bearer ' + jwt
            }
        });
        
        return [ response.data, response.status ];
    } catch (error) {
        return [ error.response.data, error.response.status ];
    }
}

// Funkcja wysyłająca żądanie usunięcia danego powiadomienia
const deleteNotificationRequest = async (jwt, notification_id) => {
    try {
        const response = await axios.delete(API_URL + '/users/deleteNotification/' + notification_id, {
            headers: {
                'Authorization': 'Bearer ' + jwt
            }
        });

        return response.status;
    } catch (error) {
        return error.response.status;
    }
}

// Funkcja wysyłająca żądanie usunięcia danego powiadomienia
const deleteNotificationByUsersDataRequest = async (jwt, username) => {
    try {
        const response = await axios.delete(API_URL + '/users/deleteNotificationByUsersData/' + username, {
            headers: {
                'Authorization': 'Bearer ' + jwt
            }
        });

        return response.status;
    } catch (error) {
        return error.response.status
    }
}

// Funkcja wysyłająca żądanie dodania nowego znajomego
const addFriendRequest = async (jwt, user_relation_data) => {
    try {
        const response = await axios.post(API_URL + '/users/addFriend',
            user_relation_data,
            { headers: {
                'Authorization': 'Bearer ' + jwt
            }}
        );

        return response.status;
    } catch (error) {
        return error.response.status;
    }
}

// Funkcja wysyłająca żądanie usunięcia znajomego
const deleteFriendRequest = async (jwt, friend_id) => {
    try {
        const response = await axios.delete(API_URL + '/users/deleteFriend/' + friend_id, {
            headers: {
                'Authorization': 'Bearer ' + jwt
            }
        });

        return response.status;
    } catch (error) {
        return error.response.status;
    }
}

// Funkcja wysyłająca żądanie dodania nowej gry
const addGameRequest = async (jwt, game_data) => {
    try {
        const response = await axios.post(API_URL + '/games/saveGame',
            game_data,
            { headers: {
                'Authorization': 'Bearer ' + jwt
            }}
        );

        return response.status;
    } catch (error) {
        return error.response.status;
    }
}

export { registerRequest, loginRequest, jwtValidRequest, userDataRequest, userFriendsRequest, 
        userPotentialFriendsRequest, userGamesRequest, changeEmailRequest, changeUsernameRequest, 
        checkPasswordRequest, changePasswordRequest, addNotificationRequest, getNotificationsRequest,
        deleteNotificationRequest, deleteNotificationByUsersDataRequest, addFriendRequest, 
        deleteFriendRequest, addGameRequest }