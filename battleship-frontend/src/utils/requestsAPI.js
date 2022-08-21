import axios       from 'axios';
import { API_URL } from "./constants";

const registerRequest = async (user_data) => {
    try {
        const response = await axios.post(API_URL + '/auth/register', user_data);
        return [ response.data, response.status ];
    } catch (error) {
        return [ error.response.data, error.response.status ];
    }
}

const loginRequest = async (user_data) => {
    try {
        const response = await axios.post(API_URL + '/auth/login', user_data);
        return [ response.data, response.status ];
    } catch (error) {
        return [ error.response.data, error.response.status ];
    }
}

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

export { registerRequest, loginRequest, jwtValidRequest, userDataRequest, userGamesRequest, 
        changeEmailRequest, changeUsernameRequest }