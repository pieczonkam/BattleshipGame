import { jwtValidRequest, userDataRequest } from "./requestsAPI";
import { clearGameData }                    from "./utils";

const setLoginData = async (jwt) => {
    localStorage.setItem('jwt', jwt);

    const [ response, status ] = await userDataRequest(jwt);

    if (status !== 200) {
        logOut();
    } else {
        localStorage.setItem('username', response.username);
    }
}

const logOut = (forced=false) => {
    if (!forced) {
        if (localStorage.getItem('game_started')) {
            localStorage.setItem('logout_during_game', 'true');
        } else if (localStorage.getItem('opponent')) {
            localStorage.setItem('logout_during_prep', 'true');
        } else {
            localStorage.removeItem('jwt');
            localStorage.removeItem('username');
            clearGameData();
        }
    } else {
        localStorage.removeItem('jwt');
        localStorage.removeItem('username');
        clearGameData();
    }

    window.location.reload(false);
}

const logOutCancel = () => {
    localStorage.setItem('logout_during_game', 'false');
    localStorage.setItem('logout_during_prep', 'false');
    window.location.reload(false);
}

const isLoggedIn = async () => {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
        const logged_in = await jwtValidRequest(jwt);
        
        if (!logged_in) {
            localStorage.removeItem('jwt');
            return false;
        }

        return true;
    }

    return false;
}

export { setLoginData, logOut, logOutCancel, isLoggedIn }